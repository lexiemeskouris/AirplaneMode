import { ROAST_WEIGHTS, roasts, type Roast } from "@/data/roasts";
import { mapsSearch } from "@/data/itineraries";
import { placeLinkClass } from "@/lib/places";

/** Green for a 5, red for a 1, nothing shouty in between. */
function scoreClass(value: number) {
  if (value === 0) return "text-muted-foreground/50";
  if (value >= 5) return "bg-brand-yellow/50 font-extrabold text-foreground";
  if (value >= 4) return "bg-brand-yellow/20 font-bold text-foreground";
  if (value <= 2) return "text-muted-foreground";
  return "text-foreground/80";
}

function Cell({ value }: { value: number }) {
  return (
    <td className={`px-2 py-3 text-center tabular-nums ${scoreClass(value)}`}>
      {value === 0 ? "n/a" : value}
    </td>
  );
}

export function RoastTable() {
  const ranked = [...roasts].sort((a, b) => b.score - a.score);

  return (
    <div>
      {/* The table is wide on purpose: every column from the spreadsheet is
          here. It scrolls inside its own box rather than the page. */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[64rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left">
              <th className="px-3 py-3 font-extrabold text-foreground">#</th>
              <th className="px-3 py-3 font-extrabold text-foreground">Pub</th>
              <th className="px-3 py-3 font-extrabold text-foreground">Area</th>
              {ROAST_WEIGHTS.map((c) => (
                <th
                  key={c.key}
                  className="px-2 py-3 text-center text-xs font-extrabold leading-tight text-foreground"
                >
                  {c.label}
                  <span className="block font-semibold text-muted-foreground">
                    {c.weight}%
                  </span>
                </th>
              ))}
              <th className="px-3 py-3 text-center font-extrabold text-foreground">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((roast: Roast, i) => (
              <tr key={roast.pub} className="border-b border-border last:border-0">
                <td className="px-3 py-3 font-bold tabular-nums text-muted-foreground">
                  {i + 1}
                </td>
                <td className="px-3 py-3">
                  <a
                    href={mapsSearch(roast.pub, `${roast.area}, England`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${placeLinkClass} whitespace-nowrap`}
                  >
                    {roast.pub}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                  {roast.area}
                </td>
                {ROAST_WEIGHTS.map((c) => (
                  <Cell key={c.key} value={roast.scores[c.key]} />
                ))}
                <td className="px-3 py-3 text-center font-extrabold tabular-nums text-primary">
                  {roast.score.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-12 font-display text-2xl font-extrabold tracking-tight text-foreground">
        What I actually thought
      </h3>
      <ol className="mt-5 space-y-4">
        {ranked.map((roast, i) => (
          <li
            key={roast.pub}
            className="flex gap-4 rounded-2xl border border-border bg-card px-5 py-4"
          >
            <span className="w-8 shrink-0 pt-0.5 font-display text-lg font-extrabold tabular-nums text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-bold text-foreground">
                <a
                  href={mapsSearch(roast.pub, `${roast.area}, England`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={placeLinkClass}
                >
                  {roast.pub}
                </a>
                <span className="font-semibold text-muted-foreground">
                  {" "}
                  {roast.area} &middot; {roast.score.toFixed(2)}
                </span>
              </p>
              <p className="mt-1 leading-relaxed text-foreground/90">{roast.comment}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
