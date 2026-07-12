import { cn } from "@/lib/utils";
import type { Fragrance } from "@/lib/types";

/** A badge showing concentration + family. */
export function FragranceMeta({ fragrance }: { fragrance: Fragrance }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
        {fragrance.concentration}
      </span>
      <span className="rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
        {fragrance.family}
      </span>
      <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        {fragrance.genderMarketing}
      </span>
    </div>
  );
}

function NoteTier({
  tier,
  notes,
}: {
  tier: string;
  notes: string[];
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-10 shrink-0 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
        {tier}
      </span>
      <span className="text-sm text-foreground/80">{notes.join(", ")}</span>
    </div>
  );
}

/** Vertical stat strip: longevity / sillage / price. */
function StatStrip({ fragrance }: { fragrance: Fragrance }) {
  return (
    <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
      <div>
        <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          Longevity
        </div>
        <div className="font-display text-lg font-semibold text-foreground">
          {fragrance.longevityHours}
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">h</span>
        </div>
      </div>
      <div>
        <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          Sillage
        </div>
        <div className="flex items-center gap-0.5 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i < fragrance.sillage ? "bg-gold" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          ~Price
        </div>
        <div className="font-display text-lg font-semibold text-foreground">
          ${fragrance.typicalPriceUSD}
        </div>
      </div>
    </div>
  );
}

/**
 * A single fragrance card: house label, name, note pyramid, stat strip.
 * Used inside the DuelLayout and the Comparator. When `onOpenFragrance` is
 * provided, the fragrance name becomes a link to its profile page.
 */
export function FragranceCard({
  fragrance,
  label,
  className,
  compact = false,
  onOpenFragrance,
}: {
  fragrance: Fragrance;
  label?: string;
  className?: string;
  compact?: boolean;
  onOpenFragrance?: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-lg border border-border bg-surface-elevated p-5 card-hover",
        className
      )}
    >
      {label && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-wine px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-wine-foreground">
          {label}
        </span>
      )}
      <div className="mb-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
        {fragrance.house} · {fragrance.releaseYear}
      </div>
      {onOpenFragrance ? (
        <button
          type="button"
          onClick={() => onOpenFragrance(fragrance.id)}
          className="text-left transition-colors hover:text-wine"
        >
          <h3 className="font-display text-xl font-semibold leading-tight text-foreground hover:text-wine">
            {fragrance.name}
          </h3>
        </button>
      ) : (
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
          {fragrance.name}
        </h3>
      )}
      <div className="mt-2">
        <FragranceMeta fragrance={fragrance} />
      </div>

      {!compact && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {fragrance.blurb}
        </p>
      )}

      <div className={cn("mt-4 space-y-1.5", compact && "mt-3")}>
        <NoteTier tier="Top" notes={fragrance.notes.top} />
        <NoteTier tier="Heart" notes={fragrance.notes.heart} />
        <NoteTier tier="Base" notes={fragrance.notes.base} />
      </div>

      <div className="mt-auto">
        <StatStrip fragrance={fragrance} />
      </div>
    </article>
  );
}
