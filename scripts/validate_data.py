#!/usr/bin/env python3
"""
scripts/validate_data.py — data-integrity checks for the Beamed Silicon
dataset.

This is a heuristic, regex-based linter over the raw TypeScript source
files, NOT a real TS/AST parser (no npm install required — stdlib only,
so it's cheap to run in CI on every PR). It targets one specific class of
bug that's easy to introduce and easy to miss by eye: hand-maintained
files that reference each other by string key (a company name, an
article slug) silently drifting apart.

Checks performed:
  1. Every ticker in lib/tickers.ts maps to a company that actually
     exists in lib/tiers.ts.
  2. No company name is duplicated across tiers in lib/tiers.ts.
  3. Every company URL in lib/tiers.ts looks like a URL.
  4. Every /analysis/<slug> URL in app/sitemap.ts corresponds to a real
     article in lib/full-articles.ts (catches dead/404 sitemap entries)
     — and, the other way round, flags real articles missing from the
     sitemap.
  5. Every /analysis/<slug> link in components/topics.tsx corresponds to
     a real article.
  6. (if lib/products.ts is present) every `company:` entry matches a
     real company name in lib/tiers.ts, since app/products/page.tsx
     depends on an exact string match to decide whether a company shows
     its catalogued products or a "not yet catalogued" fallback.

Usage:
    python3 scripts/validate_data.py [path-to-repo-root]

Exit code is 0 if there are no errors (warnings are still printed but
don't fail the run) — safe to wire into CI as a required check.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent

RED, YELLOW, GREEN, DIM, END = "\033[91m", "\033[93m", "\033[92m", "\033[2m", "\033[0m"

errors: list[str] = []
warnings: list[str] = []
notes: list[str] = []


def read(rel_path: str) -> str | None:
    p = ROOT / rel_path
    if not p.exists():
        notes.append(f"skipped {rel_path} (not found under {ROOT})")
        return None
    return p.read_text(encoding="utf-8")


# ── Extractors ─────────────────────────────────────────────────────────────
COMPANY_TUPLE_RE = re.compile(
    r'\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"([A-Z]{2})"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]'
)
TIER_BLOCK_RE = re.compile(r'name:\s*"([^"]+)".*?cos:\s*\[(.*?)\n\s*\],\n\s*\},', re.S)
TICKER_KEY_RE = re.compile(r'^\s*"((?:[^"\\]|\\.)+)":\s*"', re.M)
ARTICLE_RE = re.compile(r'slug:\s*"([^"]+)".*?date:\s*"([^"]+)"', re.S)
PRODUCT_COMPANY_RE = re.compile(r'company:\s*"([^"]+)"')


def extract_tiers(text: str) -> dict[str, list[tuple[str, str, str]]]:
    return {name: COMPANY_TUPLE_RE.findall(body) for name, body in TIER_BLOCK_RE.findall(text)}


def extract_sitemap_paths(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf'\$\{{base\}}/{prefix}/([a-z0-9-]+)', text))


def extract_topic_hrefs(text: str) -> set[str]:
    return set(re.findall(r'href:\s*"/analysis/([a-z0-9-]+)"', text))


# ── Checks ───────────────────────────────────────────────────────────────
def main() -> int:
    tiers_src = read("lib/tiers.ts")
    tickers_src = read("lib/tickers.ts")
    articles_src = read("lib/full-articles.ts")
    sitemap_src = read("app/sitemap.ts")
    topics_src = read("components/topics.tsx")
    products_src = read("lib/products.ts")

    tiers = extract_tiers(tiers_src) if tiers_src else {}
    all_companies = {name for cos in tiers.values() for name, _, _ in cos}
    if tiers_src:
        print(f"lib/tiers.ts        — parsed {len(tiers)} tier(s), {len(all_companies)} compan{'y' if len(all_companies)==1 else 'ies'}")
        if len(tiers) != 7:
            warnings.append(f"expected 7 tiers in lib/tiers.ts, parser found {len(tiers)} — the tier-block regex may need updating if the file's formatting changed")

    # 1+2+3 — tiers.ts internal consistency
    seen: dict[str, str] = {}
    for tier_name, cos in tiers.items():
        for name, cc, url in cos:
            if name in seen and seen[name] != tier_name:
                warnings.append(f'"{name}" appears in both "{seen[name]}" and "{tier_name}" in lib/tiers.ts')
            seen[name] = tier_name
            if not url.startswith("http"):
                errors.append(f'lib/tiers.ts: "{name}" ({tier_name}) has a non-URL value: {url!r}')

    # 4 — orphaned tickers
    if tickers_src:
        ticker_keys = set(TICKER_KEY_RE.findall(tickers_src))
        print(f"lib/tickers.ts      — {len(ticker_keys)} ticker(s)")
        orphans = sorted(k for k in ticker_keys if k not in all_companies)
        if orphans:
            errors.append(
                f"lib/tickers.ts has {len(orphans)} ticker(s) keyed to a company name not "
                f"found in lib/tiers.ts: " + ", ".join(orphans[:12]) + (" …" if len(orphans) > 12 else "")
            )

    # 5 — sitemap vs real articles
    real_articles: dict[str, str] = {}
    if articles_src:
        real_articles = dict(ARTICLE_RE.findall(articles_src))
        print(f"lib/full-articles.ts — {len(real_articles)} article(s)")

    if sitemap_src and real_articles:
        # If the sitemap builds its /analysis/ entries from FULL_ARTICLES at
        # runtime (`FULL_ARTICLES.map(...)`) instead of hand-typed strings,
        # it can't drift by construction — the static regex below only sees
        # literal "${base}/analysis/<slug>" text, so it can't follow a
        # .map() into the data it derives from. Skip the comparison in that
        # case rather than raise a false "missing from sitemap" warning.
        dynamically_generated = bool(re.search(r'FULL_ARTICLES\s*\.\s*map', sitemap_src))
        sitemap_analysis = extract_sitemap_paths(sitemap_src, "analysis")
        phantom = sorted(sitemap_analysis - real_articles.keys())
        missing = sorted(real_articles.keys() - sitemap_analysis) if not dynamically_generated else []
        if dynamically_generated:
            print(f"app/sitemap.ts      — /analysis/ URLs are generated from FULL_ARTICLES.map(...); skipping static drift check ({len(real_articles)} article(s) covered by construction)")
        else:
            print(f"app/sitemap.ts      — {len(sitemap_analysis)} /analysis/ url(s) listed")
        if phantom:
            errors.append(
                f"app/sitemap.ts lists {len(phantom)} /analysis/<slug> URL(s) with no matching "
                f"article in lib/full-articles.ts — these will 404 for search engines:\n         "
                + "\n         ".join(f"/analysis/{s}" for s in phantom)
            )
        if missing:
            warnings.append(
                f"{len(missing)} real article(s) in lib/full-articles.ts are missing from "
                f"app/sitemap.ts (still reachable via internal links, just not sitemap-listed):\n         "
                + "\n         ".join(f"/analysis/{s}" for s in missing)
            )

    # 6 — topics.tsx vs real articles
    if topics_src and real_articles:
        topic_slugs = extract_topic_hrefs(topics_src)
        dangling = sorted(topic_slugs - real_articles.keys())
        if dangling:
            errors.append(
                "components/topics.tsx links to slug(s) with no matching article: "
                + ", ".join(dangling)
            )

    # 7 — products.ts vs tiers.ts (optional — only if the file is present)
    if products_src and all_companies:
        product_companies = set(PRODUCT_COMPANY_RE.findall(products_src))
        print(f"lib/products.ts     — {len(product_companies)} distinct compan{'y' if len(product_companies)==1 else 'ies'} referenced")
        orphan_products = sorted(c for c in product_companies if c not in all_companies)
        if orphan_products:
            errors.append(
                f"lib/products.ts has {len(orphan_products)} company entr{'y' if len(orphan_products)==1 else 'ies'} whose "
                f"name doesn't exactly match lib/tiers.ts. app/products/page.tsx keys off an exact "
                f"string match, so these will silently render as 'not yet catalogued' even though "
                f"they have a real product list:\n         "
                + "\n         ".join(orphan_products[:15]) + (" …" if len(orphan_products) > 15 else "")
            )

    # ── report ──────────────────────────────────────────────────────────
    print()
    for n in notes:
        print(f"{DIM}note{END}  {n}")
    for w in warnings:
        print(f"{YELLOW}warn{END}  {w}")
    for e in errors:
        print(f"{RED}fail{END}  {e}")
    if not errors and not warnings:
        print(f"{GREEN}all checks passed{END}")

    print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())