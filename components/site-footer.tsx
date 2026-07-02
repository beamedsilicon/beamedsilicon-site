import Link from "next/link"

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <span className="logo-name">
              BEAMED<span className="dot">·</span>SILICON
            </span>
            <p>
              The world&apos;s most complete semiconductor intelligence — 350 companies, 7 tiers, from rare earth mines
              to finished silicon.
            </p>
          </div>
          <div>
            <div className="ft-col-h">COVERAGE</div>
            <ul className="ft-links">
              <li>
                <Link href="/#tier-1">Fabless &amp; Design</Link>
              </li>
              <li>
                <Link href="/#tier-2">Foundries &amp; OSATs</Link>
              </li>
              <li>
                <Link href="/#tier-3">Equipment (SME)</Link>
              </li>
              <li>
                <Link href="/#tier-6">Materials &amp; Gases</Link>
              </li>
              <li>
                <Link href="/#tier-7">Mining &amp; Extraction</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="ft-col-h">REGIONS</div>
            <ul className="ft-links">
              <li>
                <Link href="/?region=east-asia#sc-map">East Asia</Link>
              </li>
              <li>
                <Link href="/?region=united-states#sc-map">United States</Link>
              </li>
              <li>
                <Link href="/?region=europe#sc-map">Europe</Link>
              </li>
              <li>
                <Link href="/?region=southeast-asia#sc-map">Southeast Asia</Link>
              </li>
              <li>
                <Link href="/?region=rest-of-world#sc-map">Rest of World</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="ft-col-h">COMPANY</div>
            <ul className="ft-links">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Analysts</a>
              </li>
              <li>
                <a href="#">Advertise</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <Link href="/#newsletter">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">© 2026 Beamed Silicon Intelligence. All rights reserved.</div>
          <div className="ft-soc">
            <a href="#" className="soc-btn" aria-label="X (Twitter)">
              𝕏
            </a>
            <a href="#" className="soc-btn" aria-label="LinkedIn">
              in
            </a>
            <a href="/feed.xml" className="soc-btn" aria-label="RSS feed">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}