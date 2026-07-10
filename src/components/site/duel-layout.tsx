import { cn } from "@/lib/utils";
import type { DuelSide, Fragrance } from "@/lib/types";
import { FragranceCard } from "./fragrance-card";
import { VsBadge } from "./vs-badge";

/**
 * The core ScentDuel layout: two fragrance cards side by side with a circular
 * VS badge between them. On mobile the cards stack vertically and the VS badge
 * sits centered between them (never squeezed side by side).
 */
export function DuelLayout({
  sides,
  fragranceA,
  fragranceB,
  className,
  compact = false,
}: {
  sides: [DuelSide, DuelSide] | DuelSide[];
  fragranceA: Fragrance;
  fragranceB: Fragrance;
  className?: string;
  compact?: boolean;
}) {
  const [a, b] = sides;
  return (
    <div
      className={cn(
        "relative grid items-stretch gap-4",
        "grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-2",
        className
      )}
    >
      <FragranceCard
        fragrance={fragranceA}
        label={a.label}
        compact={compact}
      />

      {/* Desktop: VS badge centered in the middle column. */}
      <div className="hidden items-center justify-center sm:flex">
        <VsBadge />
      </div>

      {/* Mobile: VS badge centered on a horizontal rule between stacked cards. */}
      <div className="relative flex items-center justify-center sm:hidden">
        <div className="sd-rule absolute inset-x-0" />
        <VsBadge />
      </div>

      <FragranceCard
        fragrance={fragranceB}
        label={b.label}
        compact={compact}
      />
    </div>
  );
}
