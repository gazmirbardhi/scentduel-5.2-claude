import { cn } from "@/lib/utils";

/** ScentDuel wordmark — "Scent" in ink, "Duel" in wine. */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-baseline gap-0 select-none cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm",
        className
      )}
      aria-label="ScentDuel home"
    >
      <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
        Scent
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight text-wine">
        Duel
      </span>
      <span
        aria-hidden
        className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-gold transition-transform duration-300 group-hover:scale-125"
      />
    </button>
  );
}
