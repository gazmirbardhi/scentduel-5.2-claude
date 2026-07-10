import { Logo } from "./logo";

/**
 * Site footer. Sticks to the bottom (parent layout uses min-h-screen flex
 * flex-col + mt-auto on the footer).
 */
export function Footer({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-surface-elevated/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-3">
              <Logo onClick={() => onNavigate("#/")} />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Head-to-head fragrance duels, verified smells-like claims, and
              tested layering combinations. Specific, less-obvious pairs you
              can&apos;t find a clean answer to elsewhere.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-gold">
              Read
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Comparisons", hash: "#/category/comparisons" },
                { label: "Layering", hash: "#/category/layering" },
                { label: "Guides", hash: "#/category/guides" },
              ].map((l) => (
                <li key={l.hash}>
                  <button
                    onClick={() => onNavigate(l.hash)}
                    className="text-muted-foreground transition-colors hover:text-wine"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-gold">
              Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("#/comparator")}
                  className="text-muted-foreground transition-colors hover:text-wine"
                >
                  Scent Duel Comparator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("#/find")}
                  className="text-muted-foreground transition-colors hover:text-wine"
                >
                  Wear Tonight Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("#/about")}
                  className="text-muted-foreground transition-colors hover:text-wine"
                >
                  About ScentDuel
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} ScentDuel. Editorial fragrance content. No sponsored verdicts.</p>
          <p>Longevity &amp; sillage ratings are editor-tested, not manufacturer claims.</p>
        </div>
      </div>
    </footer>
  );
}
