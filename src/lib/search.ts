import { itineraries, placeName } from "@/data/itineraries";
import { guides } from "@/data/guides";
import { deals } from "@/data/deals";
import { roasts } from "@/data/roasts";
import { spotsFor } from "@/data/savedSpots";
import { regionOf } from "@/data/regions";
import { guideTargets, itineraryTargets, type Target } from "@/lib/anchors";

/**
 * Site search. Every page is one result, matched on everything it says: its
 * city and country, its continent, the plan, the recs lists, the saved spots
 * on its map, the roasts in its spreadsheet and the tours that sit on it. A
 * hit inside the page links straight to that part of it.
 *
 * Built once, in the browser, from the same data the pages render from, so a
 * new itinerary is searchable the moment it exists.
 */

export type SearchHit = {
  kind: "itinerary" | "recommendation" | "deal";
  slug: string;
  title: string;
  /** "Slovenia · Itinerary" */
  meta: string;
  cover?: string | undefined;
  /** Parts of the page the words were found in, each with its anchor. */
  inside: { label: string; id: string }[];
};

type Doc = {
  kind: SearchHit["kind"];
  slug: string;
  title: string;
  meta: string;
  cover?: string | undefined;
  /** Weighted fields, already folded into words. */
  fields: { weight: number; words: string[] }[];
  targets: (Target & { words: string[] })[];
};

/** What people type for a country that the data spells another way. */
const COUNTRY_ALIASES: Record<string, string> = {
  "United Kingdom": "uk britain great britain england gb",
  England: "uk britain great britain gb",
  Scotland: "uk britain great britain gb",
  "United States": "usa us america states",
  "United Arab Emirates": "uae emirates",
  Netherlands: "holland",
  "Czech Republic": "czechia",
  Turkey: "turkiye",
};

export function fold(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ø/g, "o")
    .replace(/æ/g, "ae")
    .replace(/ß/g, "ss")
    .toLowerCase();
}

const toWords = (s: string) => fold(s).split(/[^a-z0-9]+/).filter(Boolean);

/** Every string in a value, skipping links, images and map pins. */
function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v))
      if (!/^(url|cover|tiktok|bmcUrl|cid|coords|slug|kind|photoKey|src)$/.test(k)) strings(x, out);
  return out;
}

function headWords(destination: string, country: string, title: string) {
  return toWords(
    `${title} ${destination} ${country} ${COUNTRY_ALIASES[country] ?? ""} ${regionOf(country)}`,
  );
}

function pageDeals(kind: "itinerary" | "recommendation", slug: string) {
  return deals.filter((d) => d.page?.kind === kind && d.page.slug === slug);
}

let cache: Doc[] | undefined;

function docs(): Doc[] {
  if (cache) return cache;
  const out: Doc[] = [];

  for (const it of itineraries) {
    const title = placeName(it.title);
    out.push({
      kind: "itinerary",
      slug: it.slug,
      title,
      meta: `${it.country} · ${it.duration} itinerary`,
      cover: it.cover,
      fields: [
        { weight: 10, words: headWords(it.destination, it.country, it.title) },
        { weight: 5, words: toWords([...it.highlights, ...it.tags].join(" ")) },
        { weight: 3, words: toWords(`${it.summary} ${it.teaser}`) },
        {
          weight: 1,
          words: toWords(
            [
              ...strings(it.days),
              ...strings(it.extras),
              ...strings(it.notes),
              ...spotsFor(it.slug).map((s) => `${s.name} ${s.note ?? ""}`),
              ...pageDeals("itinerary", it.slug).map((d) => `${d.operator} ${d.tour} ${d.city}`),
            ].join(" "),
          ),
        },
      ],
      targets: itineraryTargets(it).map((t) => ({ ...t, words: toWords(t.text) })),
    });
  }

  for (const g of guides) {
    out.push({
      kind: "recommendation",
      slug: g.slug,
      title: placeName(g.title),
      meta: `${g.country} · ${g.label ? g.label.toLowerCase().replace(/^./, (c) => c.toUpperCase()) : "Recommendations"}`,
      cover: g.cover,
      fields: [
        { weight: 10, words: headWords(g.destination, g.country, g.title) },
        { weight: 5, words: toWords(g.tags.join(" ")) },
        { weight: 3, words: toWords(`${g.summary} ${g.teaser}`) },
        {
          weight: 1,
          words: toWords(
            [
              ...strings(g.sections),
              ...strings(g.notes),
              ...spotsFor(g.slug).map((s) => `${s.name} ${s.note ?? ""}`),
              ...(g.roastTable ? roasts.map((r) => `${r.pub} ${r.area} ${r.comment}`) : []),
              ...pageDeals("recommendation", g.slug).map((d) => `${d.operator} ${d.tour} ${d.city}`),
            ].join(" "),
          ),
        },
      ],
      targets: guideTargets(g).map((t) => ({ ...t, words: toWords(t.text) })),
    });
  }

  // Tours in places with no trip page yet still deserve to be found: Vienna
  // has a food tour before it has an itinerary.
  for (const d of deals.filter((x) => !x.page)) {
    out.push({
      kind: "deal",
      slug: `${d.city}-${d.operator}`,
      title: `${d.tour}`,
      meta: `${d.city}, ${d.country} · Tour deal`,
      fields: [
        { weight: 10, words: headWords(d.city, d.country, d.city) },
        { weight: 3, words: toWords(`${d.operator} ${d.tour} ${d.discount ?? ""}`) },
      ],
      targets: [],
    });
  }

  cache = out;
  return out;
}

/**
 * Strict: the word itself, or it with a short ending ("opera" finds "operas",
 * not "operators"). Loose, tried only when strict finds nothing: any word it
 * starts, so a half-typed "ljubl" still finds Ljubljana.
 */
let loose = false;
function matches(q: string, w: string) {
  if (q.length < 3) return w === q;
  // "operas" finds "opera", "pintxo" finds "pintxos".
  if (q.length > 3 && q.endsWith("s") && w === q.slice(0, -1)) return true;
  return w.startsWith(q) && (loose || q.length < 5 || w.length - q.length <= 2);
}

export function search(query: string, limit = 12): SearchHit[] {
  loose = false;
  const strict = run(query, limit);
  if (strict.length) return strict;
  loose = true;
  return run(query, limit);
}

function run(query: string, limit: number): SearchHit[] {
  const q = [...new Set(toWords(query))];
  if (!q.length) return [];
  const scored: { doc: Doc; score: number }[] = [];
  for (const doc of docs()) {
    let score = 0;
    let all = true;
    for (const term of q) {
      let best = 0;
      for (const f of doc.fields) {
        if (f.weight > best && f.words.some((w) => matches(term, w)))
          best = f.weight * (f.words.includes(term) ? 1.5 : 1);
      }
      if (!best) {
        all = false;
        break;
      }
      score += best;
    }
    if (all) scored.push({ doc, score });
  }
  scored.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));

  return scored.slice(0, limit).map(({ doc }) => {
    // Only point inside the page when the words are about a part of it, not
    // when the page as a whole is the match ("vienna" on the Vienna page).
    const head = new Set(doc.fields[0]!.words);
    const deep = q.filter((t) => ![...head].some((w) => matches(t, w)));
    const inside = deep.length
      ? doc.targets
          .filter((t) => deep.every((term) => t.words.some((w) => matches(term, w))))
          // The specific stop beats the whole day it sits in.
          .sort((a, b) => Number(b.specific) - Number(a.specific))
          .filter((t, i, arr) => arr.findIndex((x) => label(x) === label(t)) === i)
          .slice(0, 3)
          .map((t) => ({ label: label(t), id: t.id }))
      : [];
    return { kind: doc.kind, slug: doc.slug, title: doc.title, meta: doc.meta, cover: doc.cover, inside };
  });
}

function label(t: Target) {
  const s = (t.title?.trim() || t.text).replace(/\s+/g, " ").trim();
  return s.length > 70 ? `${s.slice(0, 67).trimEnd()}…` : s;
}
