/**
 * lib/regions.ts
 *
 * Groups the country codes already present on every company in lib/tiers.ts
 * into the 5 broad regions shown in the site footer. Backs the Supply Chain
 * Explorer's region filter (?region=… on the homepage).
 */

export interface Region {
  key: string
  label: string
}

export const REGIONS: Region[] = [
  { key: "east-asia", label: "East Asia" },
  { key: "united-states", label: "United States" },
  { key: "europe", label: "Europe" },
  { key: "southeast-asia", label: "Southeast Asia" },
  { key: "rest-of-world", label: "Rest of World" },
]

const COUNTRY_TO_REGION: Record<string, string> = {
  // East Asia
  TW: "east-asia", CN: "east-asia", KR: "east-asia", JP: "east-asia",
  // United States
  US: "united-states",
  // Europe
  NO: "europe", UK: "europe", CH: "europe", DE: "europe", NL: "europe",
  AT: "europe", IT: "europe", SE: "europe", FR: "europe", BE: "europe",
  // Southeast Asia
  SG: "southeast-asia",
  // Rest of World
  CA: "rest-of-world", IL: "rest-of-world", AU: "rest-of-world",
  CL: "rest-of-world", RU: "rest-of-world", BR: "rest-of-world", SA: "rest-of-world",
}

/** Returns the region key for a company's country code, defaulting to "rest-of-world". */
export function regionOf(countryCode: string): string {
  return COUNTRY_TO_REGION[countryCode] ?? "rest-of-world"
}

export function regionLabel(key: string): string {
  return REGIONS.find((r) => r.key === key)?.label ?? key
}