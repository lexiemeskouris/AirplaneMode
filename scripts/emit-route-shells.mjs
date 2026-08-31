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

// Dynamic routes, one page per entry. Slugs are read from the data rather than
// listed here, so adding an itinerary or a city needs no change to this script.
function slugsIn(file, indent) {
  const src = readFileSync(join(root, "src", "data", file), "utf8");
  const found = [...src.matchAll(new RegExp(`^\\s{${indent}}slug:\\s*"([^"]+)"`, "gm"))].map(
    (m) => m[1],
  );
  if (found.length === 0) {
    throw new Error(
      `No slugs found in src/data/${file} — the shape of that file changed and ` +
        "this script needs updating.",
    );
  }
  return found;
}

// src/routes/itineraries.$slug.tsx
for (const slug of slugsIn("itineraries.ts", 4)) routes.push(`/itineraries/${slug}`);
// src/routes/recommendations.$slug.tsx
for (const slug of slugsIn("guides.ts", 4)) routes.push(`/recommendations/${slug}`);

for (const route of routes) {
  const dir = join(clientDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shell);
}

console.log(`Wrote ${routes.length} route shells:`);
for (const route of routes) console.log(`  ${route}`);
