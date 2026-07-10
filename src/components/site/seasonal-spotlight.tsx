"use client";

import { seasonalSpotlight } from "@/lib/content";
import type { Occasion } from "@/lib/types";
import { Eyebrow } from "./eyebrow";
import { ArrowRight, Sparkles, Snowflake, Sun, Cloud, Leaf } from "lucide-react";

const SEASON_META: Record<Occasion, { label: string; icon: typeof Sun; greeting: string }> = {
  winter: { label: "Winter", icon: Snowflake, greeting: "Cold outside? Reach for" },
  spring: { label: "Spring", icon: Leaf, greeting: "Spring in the air — try" },
  summer: { label: "Summer", icon: Sun, greeting: "Heatwave ahead — go" },
  autumn: { label: "Autumn", icon: Cloud, greeting: "Crisp days call for" },
  "date-night": { label: "Date night", icon: Sparkles, greeting: "Tonight, try" },
  office: { label: "Office", icon: Sparkles, greeting: "For the desk, try" },
  casual: { label: "Casual", icon: Sparkles, greeting: "An easy reach:" },
  formal: { label: "Formal", icon: Sparkles, greeting: "For the occasion:" },
  "beast-mode": { label: "Beast mode", icon: Sparkles, greeting: "Loud and long:" },
};

/**
 * "Scent for the season" spotlight — auto-picks the top-ranked fragrance for
 * the current meteorological season. Shown on the home page. Refreshes
 * automatically as the months turn.
 */
export function SeasonalSpotlight({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  // Compute on mount client-side to avoid SSR/CSR drift on the month.
  const { fragrance, season } = seasonalSpotlight();
  const meta = SEASON_META[season] ?? SEASON_META.summer;
  const Icon = meta.icon;

  return (
    <section className="paper-grain border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-surface-elevated">
          <div className="grid items-center gap-5 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto]">
            {/* Icon badge */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-wine to-gold text-wine-foreground shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]">
              <Icon className="h-7 w-7" aria-hidden />
            </div>

            {/* Copy */}
            <div className="min-w-0">
              <Eyebrow>Scent for the season · {meta.label}</Eyebrow>
              <h2 className="mt-2 font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                {meta.greeting}{" "}
                <button
                  onClick={() => onNavigate(`#/fragrance/${fragrance.id}`)}
                  className="text-wine underline-offset-4 transition-colors hover:underline"
                >
                  {fragrance.name}
                </button>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {fragrance.blurb}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              <button
                onClick={() => onNavigate(`#/fragrance/${fragrance.id}`)}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-wine px-4 py-2 text-xs font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
              >
                View profile
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => onNavigate(`#/comparator?a=${fragrance.id}`)}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-gold/60 hover:text-wine"
              >
                Duel it
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
