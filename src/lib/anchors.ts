import type { Activity, Itinerary, Place } from "@/data/itineraries";
import type { Guide } from "@/data/guides";

/**
 * In-page links from a page's hashtags and highlights to the part of the plan
 * they are about. Every day, activity, recs group and place gets a stable id;
 * a tag or highlight is matched to the one whose words it shares most.
 */

export type Target = { id: string; text: string; specific: boolean; /** Names and headings: a match here counts for more. */ title?: string; /** A recs list rather than the plan: the plan wins a close call. */ rec?: boolean };

export function slugId(s: string) {
  return fold(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function fold(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ø/g, "o").replace(/æ/g, "ae").replace(/ð/g, "d").replace(/þ/g, "th").toLowerCase();
}

const STOP = new Set(
  "the and with for from then that this into over your you are was were our out off its it's day days one two three four five six seven eight nine ten first last next back via all any per own not but just also very more most some what when where which who here there have has had get got one's".split(
    " ",
  ),
);

function words(s: string) {
  return fold(s)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/** "markets" finds "market", "snorkelling" finds "snorkel"; "champagne" does not find "champs". */
function stemMatch(a: string, b: string) {
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  const diff = long.length - short.length;
  return (diff <= 2 || (diff <= 4 && short.length >= 7)) && long.startsWith(short.slice(0, -1));
}

/** "#BoatDay" -> "boat day", "#SouthCoast2026" -> "south coast 2026". */
const spacedWords = (q: string) =>
  words(q.replace(/^#/, "").replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2"));

function queryWords(q: string) {
  const joined = q.startsWith("#") ? words(q.slice(1).toLowerCase()) : [];
  return [...new Set([...spacedWords(q), ...joined])];
}

const names = (ps?: Place[]) => (ps ?? []).map((p) => p.name).join(" ");
const placeText = (p: Place) => `${p.name} ${p.note ?? ""}`;
const activityText = (a: Activity) => `${a.description} ${(a.places ?? []).map(placeText).join(" ")}`;

export const dayId = (di: number) => `day-${di + 1}`;
export const activityId = (prefix: string, ai: number) => `${prefix}-${ai + 1}`;
export const groupId = (title: string) => `recs-${slugId(title)}`;
export const placeId = (prefix: string, pi: number) => `${prefix}-p${pi + 1}`;

export function itineraryTargets(it: Itinerary): Target[] {
  const t: Target[] = [];
  if (!it.comingSoon)
    (it.days ?? []).forEach((d, di) => {
      t.push({ id: dayId(di), text: `${d.title} ${d.activities.map(activityText).join(" ")}`, specific: false, title: d.title });
      d.activities.forEach((a, ai) => t.push({ id: activityId(dayId(di), ai), text: activityText(a), specific: true, title: names(a.places) }));
    });
  (it.extras ?? []).forEach((g) => {
    const gid = groupId(g.title);
    t.push({
      id: gid,
      text: `${g.title} ${g.note ?? ""} ${(g.items ?? []).join(" ")} ${(g.places ?? []).map(placeText).join(" ")}`,
      specific: false,
      title: g.title,
      rec: true,
    });
    (g.places ?? []).forEach((p, pi) => t.push({ id: placeId(gid, pi), text: placeText(p), specific: true, title: p.name, rec: true }));
  });
  return t;
}

export const sectionId = (title: string) => slugId(title);

export function guideTargets(g: Guide): Target[] {
  const t: Target[] = [];
  g.sections.forEach((s) => {
    const sid = sectionId(s.title);
    t.push({
      id: sid,
      text: `${s.title} ${s.note ?? ""} ${(s.items ?? []).join(" ")} ${(s.activities ?? []).map(activityText).join(" ")} ${(s.places ?? []).map(placeText).join(" ")}`,
      specific: false,
      title: s.title,
    });
    (s.activities ?? []).forEach((a, ai) => t.push({ id: activityId(sid, ai), text: activityText(a), specific: true, title: names(a.places) }));
    (s.places ?? []).forEach((p, pi) => t.push({ id: placeId(sid, pi), text: placeText(p), specific: true, title: p.name }));
  });
  return t;
}

/**
 * The target a tag or highlight is about, or undefined when nothing on the
 * page shares a telling word with it. Rare words count for more than common
 * ones; on a tie the more specific target wins, then the earlier one.
 */
export function findTarget(query: string, targets: Target[]): string | undefined {
  const q = queryWords(query);
  if (!q.length || !targets.length) return undefined;
  const sets = targets.map((t) => new Set(words(t.text)));
  // The words in the query's own order, e.g. "street food": a target that has
  // the phrase beats one that has both words apart.
  const split = spacedWords(query);
  const phrase = split.length > 1 ? split.join(" ") : "";
  const flat = targets.map((t) => fold(t.text).replace(/[^a-z0-9]+/g, " "));
  const titles = targets.map((t) => new Set(words(t.title ?? "")));
  const has = (set: Set<string>, w: string) => {
    if (set.has(w)) return true;
    // Light stemming: "pintxos" finds "pintxo", "markets" finds "market".
    if (w.length > 4) for (const x of set) if (x.length > 4 && stemMatch(w, x)) return true;
    return false;
  };
  const coarse = targets.filter((t) => !t.specific).length || 1;
  const idf = new Map(
    q.map((w) => {
      const df = targets.filter((t, i) => !t.specific && has(sets[i]!, w)).length;
      return [w, df === 0 ? 0 : Math.log(1 + coarse / df)];
    }),
  );
  let best: { i: number; score: number } | undefined;
  targets.forEach((t, i) => {
    const score = (t.rec ? 0.8 : 1) * (phrase && flat[i]!.includes(phrase) ? 1.2 : 1) * q.reduce(
      (s, w) => s + (has(sets[i]!, w) ? idf.get(w)! * (has(titles[i]!, w) ? 1.5 : 1) : 0),
      0,
    );
    if (score <= 0) return;
    if (
      !best ||
      score > best.score + 1e-9 ||
      (Math.abs(score - best.score) < 1e-9 && t.specific && !targets[best.i]!.specific)
    )
      best = { i, score };
  });
  if (!best) return undefined;
  // Words that turn up nearly everywhere ("dinner", a city's own name) do not
  // point anywhere in particular.
  if (best.score < Math.log(1 + coarse / Math.max(1, coarse * 0.6))) return undefined;
  return targets[best.i]!.id;
}

/** Scroll to an anchor and flash it, without a router navigation. */
export function jumpTo(e: { preventDefault(): void }, id: string) {
  const el = typeof document !== "undefined" ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  history.replaceState(null, "", `#${id}`);
  el.classList.remove("anchor-flash");
  void el.offsetWidth;
  el.classList.add("anchor-flash");
}
