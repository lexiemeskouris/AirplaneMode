// GitHub Pages has no server, so an unknown path falls through to 404.html.
// That renders the app correctly (the client router takes over) but responds
// with HTTP 404, which is wrong for a real page and hurts link sharing and
// crawling. Every route in this app is known at build time, so write the SPA
// shell to each route's own path and let Pages answer them with a 200.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "dist", "client");
const shell = readFileSync(join(clientDir, "_shell.html"), "utf8");

// Static routes, mirroring src/routes/*.tsx (index is already dist/client/index.html).
const routes = ["/about"];

// Dynamic route: src/routes/itineraries.$slug.tsx, one page per itinerary.
const data = readFileSync(join(root, "src", "data", "itineraries.ts"), "utf8");
const slugs = [...data.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

if (slugs.length === 0) {
  throw new Error(
    "No itinerary slugs found in src/data/itineraries.ts — the shape of that " +
      "file changed and this script needs updating.",
  );
}

for (const slug of slugs) routes.push(`/itineraries/${slug}`);

for (const route of routes) {
  const dir = join(clientDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shell);
}

console.log(`Wrote ${routes.length} route shells:`);
for (const route of routes) console.log(`  ${route}`);
