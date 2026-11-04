/**
 * Front-page sections. Every itinerary and guide sits in one, by its country.
 * A country missing here lands in "Elsewhere" rather than vanishing, so a new
 * trip added in Lovable still shows up; add its country below to file it.
 */
export const REGIONS = [
  "Europe",
  "The Americas",
  "Asia",
  "Middle East and North Africa",
  "Africa",
  "Elsewhere",
] as const;

export type Region = (typeof REGIONS)[number];

const BY_COUNTRY: Record<string, Region> = {
  // Europe
  Austria: "Europe",
  Belgium: "Europe",
  Denmark: "Europe",
  England: "Europe",
  Estonia: "Europe",
  Finland: "Europe",
  France: "Europe",
  Germany: "Europe",
  Hungary: "Europe",
  Iceland: "Europe",
  Ireland: "Europe",
  Italy: "Europe",
  Malta: "Europe",
  Netherlands: "Europe",
  Norway: "Europe",
  Poland: "Europe",
  Portugal: "Europe",
  Romania: "Europe",
  Scotland: "Europe",
  Slovenia: "Europe",
  Spain: "Europe",
  Sweden: "Europe",
  Switzerland: "Europe",
  Turkey: "Europe",
  "United Kingdom": "Europe",
  Wales: "Europe",
  // The Americas
  Ecuador: "The Americas",
  Mexico: "The Americas",
  Peru: "The Americas",
  "United States": "The Americas",
  // Asia
  Cambodia: "Asia",
  Japan: "Asia",
  Singapore: "Asia",
  "South Korea": "Asia",
  Taiwan: "Asia",
  Thailand: "Asia",
  Vietnam: "Asia",
  // Middle East and North Africa
  Egypt: "Middle East and North Africa",
  Morocco: "Middle East and North Africa",
  "Saudi Arabia": "Middle East and North Africa",
  Tunisia: "Middle East and North Africa",
  // Africa
  "South Africa": "Africa",
  Tanzania: "Africa",
  "Zimbabwe and Zambia": "Africa",
};

export function regionOf(country: string): Region {
  return BY_COUNTRY[country] ?? "Elsewhere";
}

/** Anchor id for a section, e.g. "the-americas". */
export function regionId(region: Region): string {
  return region.toLowerCase().replace(/[^a-z]+/g, "-");
}
