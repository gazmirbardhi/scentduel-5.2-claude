"use client";

import { useMemo, useState } from "react";
import { fragrancesForOccasion, occasionCounts } from "@/lib/content";
import type { Occasion } from "@/lib/types";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, Sparkles, ArrowRight, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const OCCASIONS: { id: Occasion; label: string; blurb: string; icon: string }[] = [
  { id: "date-night", label: "Date night", blurb: "Close, warm, memorable.", icon: "♥" },
  { id: "office", label: "Office", blurb: "Polite, inoffensive, present.", icon: "▢" },
  { id: "summer", label: "Summer", blurb: "Bright, fresh, heatproof.", icon: "☼" },
  { id: "winter", label: "Winter", blurb: "Deep, sweet, projecting.", icon: "❄" },
  { id: "spring", label: "Spring", blurb: "Floral, green, optimistic.", icon: "✿" },
  { id: "autumn", label: "Autumn", blurb: "Woody, spicy, cosy.", icon: "🍂" },
  { id: "formal", label: "Formal", blurb: "Refined, expensive, restrained.", icon: "◆" },
  { id: "casual", label: "Casual", blurb: "Easy, versatile, low-stakes.", icon: "○" },
  { id: "beast-mode", label: "Beast mode", blurb: "Loud, long, antisocial.", icon: "⚡" },
];

/**
 * "Wear tonight" occasion finder — pick an occasion, get ranked matching
 * fragrances from the dataset. Leverages the per-fragrance `occasions` tags.
 * Route: #/find
 */
export function OccasionFinderView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const [selected, setSelected] = useState<Occasion | null>(null);
  const counts = useMemo(() => occasionCounts(), []);
  const results = useMemo(
    () => (selected ? fragrancesForOccasion(selected) : []),
    [selected]
  );

  const selectedMeta = OCCASIONS.find((o) => o.id === selected);

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Wear Tonight Finder", url: "https://scentduel.com/#/find" },
  ]);

  const toolLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wear Tonight — Fragrance Occasion Finder",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    url: "https://scentduel.com/#/find",
    description:
      "Pick an occasion — date night, office, summer, beast mode — and get editor-ranked matching fragrances from the ScentDuel dataset.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="sd-fade-up mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={[toolLd, crumbs]} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>Interactive Tool</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
        What should I wear tonight?
      </h1>
      <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
        Pick the occasion and we&apos;ll rank fragrances from the dataset that
        suit it — favouring specialists (scents built for this) over
        generalists, weighted by longevity and sillage.
      </p>

      {/* Occasion picker grid */}
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {OCCASIONS.map((o) => {
          const active = selected === o.id;
          const count = counts[o.id] ?? 0;
          return (
            <button
              key={o.id}
              onClick={() => setSelected(active ? null : o.id)}
              aria-pressed={active}
              className={cn(
                "group relative flex flex-col items-start rounded-lg border p-3 text-left transition-all",
                active
                  ? "border-wine bg-wine text-wine-foreground shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
                  : "border-border bg-surface hover:-translate-y-0.5 hover:border-gold/60"
              )}
            >
              <span
                className={cn(
                  "mb-1 text-lg",
                  active ? "text-wine-foreground" : "text-gold"
                )}
                aria-hidden
              >
                {o.icon}
              </span>
              <span className="font-display text-sm font-semibold">
                {o.label}
              </span>
              <span
                className={cn(
                  "mt-0.5 text-[0.7rem] leading-snug",
                  active ? "text-wine-foreground/80" : "text-muted-foreground"
                )}
              >
                {o.blurb}
              </span>
              <span
                className={cn(
                  "mt-1.5 text-[0.6rem] font-medium uppercase tracking-wider",
                  active ? "text-wine-foreground/70" : "text-muted-foreground/70"
                )}
              >
                {count} scent{count === 1 ? "" : "s"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {selected && selectedMeta && (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Best for {selectedMeta.label.toLowerCase()}
            </h2>
            <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-xs text-muted-foreground">
              {results.length} match{results.length === 1 ? "" : "es"}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-surface-elevated/40 p-8 text-center text-sm text-muted-foreground">
              No fragrances in the dataset are tagged for {selectedMeta.label.toLowerCase()} yet.
            </div>
          ) : (
            <ol className="space-y-2">
              {results.map((f, i) => (
                <li key={f.id}>
                  <button
                    onClick={() => onNavigate(`#/fragrance/${f.id}`)}
                    className="group flex w-full items-center gap-4 rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
                  >
                    <span className="font-display text-2xl font-semibold text-gold/70">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-base font-semibold text-foreground">
                          {f.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {f.house}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {f.family} · {f.concentration} · {f.longevityHours}h longevity · sillage {f.sillage}/5
                      </span>
                    </span>
                    <span className="hidden text-right sm:block">
                      <span className="block text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                        ~Price
                      </span>
                      <span className="font-display text-sm font-semibold text-foreground">
                        ${f.typicalPriceUSD}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
                  </button>
                </li>
              ))}
            </ol>
          )}

          {/* CTA: open top match in comparator */}
          {results.length > 0 && (
            <div className="mt-6 rounded-lg border border-border bg-surface-elevated/50 p-5 text-center">
              <FlaskConical className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-sm text-muted-foreground">
                Put the top match in a head-to-head duel.
              </p>
              <button
                onClick={() => onNavigate(`#/comparator?a=${results[0].id}`)}
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-wine px-4 py-2 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
              >
                <FlaskConical className="h-4 w-4" />
                Duel {results[0].name}
              </button>
            </div>
          )}
        </section>
      )}

      {!selected && (
        <p className="mt-10 text-sm text-muted-foreground">
          Pick an occasion above to see your ranked matches.
        </p>
      )}
    </div>
  );
}
