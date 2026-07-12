"use client";

import { fragrancesByValue } from "@/lib/content";
import { Eyebrow } from "./eyebrow";
import { Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Best value in the dataset" leaderboard — top 5 fragrances by value score
 * (performance-per-dollar). Shown on the home page. Each row links to the
 * fragrance profile. The #1 gets a wine/gold trophy treatment.
 */
export function TopValueLeaderboard({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const ranked = fragrancesByValue().slice(0, 5);

  if (ranked.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <Eyebrow>Performance per dollar</Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Best value in the dataset
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Longevity × sillage ÷ price, normalised to 100. The bargains that
            punch above their price — and the pricier scents they out-point.
          </p>
        </div>
      </div>

      <ol className="space-y-2">
        {ranked.map((item, i) => {
          const isTop = i === 0;
          return (
            <li key={item.fragrance.id}>
              <button
                onClick={() => onNavigate(`#/fragrance/${item.fragrance.id}`)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all",
                  isTop
                    ? "border-wine/40 bg-linear-to-r from-wine/[0.06] to-gold/[0.04] hover:from-wine/[0.1] hover:to-gold/[0.06]"
                    : "border-border bg-surface hover:border-gold/50 hover:bg-surface-elevated"
                )}
              >
                {/* Rank / trophy */}
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold",
                    isTop
                      ? "bg-linear-to-br from-wine to-gold text-wine-foreground"
                      : "bg-surface-elevated text-muted-foreground"
                  )}
                  aria-hidden
                >
                  {isTop ? (
                    <Trophy className="h-5 w-5" />
                  ) : (
                    i + 1
                  )}
                </span>

                {/* Name + meta */}
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="truncate font-display text-base font-semibold text-foreground group-hover:text-wine">
                      {item.fragrance.name}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {item.fragrance.house}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                    {item.fragrance.family} · {item.fragrance.longevityHours}h · sillage {item.fragrance.sillage}/5 · ${item.fragrance.typicalPriceUSD}/100ml
                  </span>
                </span>

                {/* Score bar */}
                <span className="hidden w-32 shrink-0 sm:block">
                  <span className="block h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                    <span
                      className={cn(
                        "block h-full rounded-full transition-all duration-700",
                        isTop
                          ? "bg-linear-to-r from-wine to-gold"
                          : "bg-linear-to-r from-muted-foreground/60 to-muted-foreground/80"
                      )}
                      style={{ width: `${item.score}%` }}
                    />
                  </span>
                  <span className="mt-1 block text-right text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                    {item.band.label}
                  </span>
                </span>

                {/* Score number */}
                <span className="shrink-0 text-right">
                  <span className="block font-display text-2xl font-semibold text-foreground">
                    {item.score}
                  </span>
                  <span className="block text-[0.55rem] uppercase tracking-wider text-muted-foreground">
                    /100
                  </span>
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
