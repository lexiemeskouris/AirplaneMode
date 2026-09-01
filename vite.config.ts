// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static build for GitHub Pages, switched on only by .github/workflows/deploy.yml.
// Lovable's own builds leave GITHUB_PAGES unset and are completely unaffected by
// this block, so the Lovable preview and the two-way sync keep working as before.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

// Project Pages are served from https://<user>.github.io/<repo>/, so every asset
// and route URL needs the repo name prefix. A user/org site would use "/".
const basePath = process.env.PAGES_BASE ?? "/AirplaneMode/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this. Skipped for the static build: the wrapper is an
    // SSR-runtime error handler and the prerenderer cannot route through it.
    ...(isGitHubPages ? {} : { server: { entry: "server" } }),
    ...(isGitHubPages
      ? {
          // No server functions in this app and all itinerary data is a static
          // array in src/data/itineraries.ts, so every route can be prerendered
          // to plain HTML at build time.
          spa: { enabled: true },
        }
      : {}),
  },
  ...(isGitHubPages ? { nitro: false as const } : {}),
  vite: isGitHubPages ? { base: basePath } : {},
});
