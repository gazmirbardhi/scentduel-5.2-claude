import { cn } from "@/lib/utils";

/**
 * Verdict callout: gold-accented panel, labeled "VERDICT".
 * Used after every duel to state the conclusion plainly.
 */
export function VerdictCallout({
  title,
  text,
  confidence,
  className,
}: {
  title: string;
  text: string;
  confidence?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "verdict-callout",
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
          Verdict
        </span>
        {confidence !== undefined && <ConfidenceMeter value={confidence} />}
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{text}</p>
    </aside>
  );
}

function ConfidenceMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
        Confidence
      </span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 w-2 rounded-full",
              i < value ? "bg-wine" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
