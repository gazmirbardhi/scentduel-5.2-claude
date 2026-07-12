"use client";

import { useMemo } from "react";
import {
  articlesForFragrance,
  fragrancesPairedWith,
  fragranceById,
  valueScore,
  valueBand,
} from "@/lib/content";
import { Eyebrow } from "./eyebrow";
import { FragranceMeta } from "./fragrance-card";
import { ArticleCard } from "./article-card";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, FlaskConical, Swords, Layers, Clock, Wind, DollarSign, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Human-readable labels for the Occasion enum, shared with the comparator. */
const OCCASION_LABELS: Record<string, string> = {
  summer: "Summer",
  winter: "Winter",
  spring: "Spring",
  autumn: "Autumn",
  office: "Office",
  "date-night": "Date night",
  casual: "Casual",
  formal: "Formal",
  "beast-mode": "Beast mode",
};

/**
 * Dedicated profile page for a single fragrance: full data, note pyramid,
 * stats, every duel it appears in, and the other fragrances it's been
 * paired with. Linked from fragrance cards and search results.
 *
 * Route: #/fragrance/<id>
 */
export function FragranceProfileView({
  fragranceId,
  onNavigate,
  onOpenArticle,
}: {
  fragranceId: string;
  onNavigate: (hash: string) => void;
  onOpenArticle: (slug: string) => void;
}) {
  const fragrance = fragranceById(fragranceId);

  const { duels, paired } = useMemo(() => {
    if (!fragrance) return { duels: [], paired: [] };
    return {
      duels: articlesForFragrance(fragrance.id),
      paired: fragrancesPairedWith(fragrance.id),
    };
  }, [fragrance]);

  if (!fragrance) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="font-display text-6xl font-semibold text-wine">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Fragrance not found.
        </h1>
        <button
          onClick={() => onNavigate("#/")}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground hover:bg-wine/90"
        >
          Back to home
        </button>
      </div>
    );
  }

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fragrance.name,
    brand: { "@type": "Brand", name: fragrance.house },
    description: fragrance.blurb,
    releaseDate: `${fragrance.releaseYear}`,
    category: "Fragrance",
    offers: {
      "@type": "Offer",
      price: fragrance.typicalPriceUSD,
      priceCurrency: "USD",
    },
  };

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Fragrances", url: "https://scentduel.com/#/comparator" },
    {
      name: fragrance.name,
      url: `https://scentduel.com/#/fragrance/${fragrance.id}`,
    },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-4xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={[profileLd, crumbs]} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {/* Header */}
      <Eyebrow>Fragrance Profile</Eyebrow>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {fragrance.name}
        </h1>
        <span className="text-sm text-muted-foreground">
          {fragrance.house} · est. {fragrance.releaseYear}
        </span>
      </div>
      <div className="mt-3">
        <FragranceMeta fragrance={fragrance} />
      </div>
      <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-foreground/80">
        {fragrance.blurb}
      </p>

      {/* Stats strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          icon={<Clock className="h-4 w-4" />}
          label="Longevity"
          value={`${fragrance.longevityHours}h`}
        />
        <StatTile
          icon={<Wind className="h-4 w-4" />}
          label="Sillage"
          value={
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    i < fragrance.sillage ? "bg-gold" : "bg-border"
                  )}
                />
              ))}
            </span>
          }
        />
        <StatTile
          icon={<DollarSign className="h-4 w-4" />}
          label="~Price"
          value={`$${fragrance.typicalPriceUSD}`}
        />
        <StatTile
          icon={<Sparkles className="h-4 w-4" />}
          label="Family"
          value={fragrance.family}
        />
      </div>

      {/* Value score */}
      {(() => {
        const score = valueScore(fragrance);
        const band = valueBand(score);
        return (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
            <div className="shrink-0">
              <div className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                Value score
              </div>
              <div className="font-display text-3xl font-semibold text-foreground">
                {score}
                <span className="text-sm font-normal text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full rounded-full bg-linear-to-r from-wine to-gold transition-all duration-700"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "font-semibold",
                    band.tone === "wine" && "text-wine",
                    band.tone === "gold" && "text-gold",
                    band.tone === "neutral" && "text-foreground/80"
                  )}
                >
                  {band.label}.
                </span>{" "}
                Performance-per-dollar across the dataset.
              </p>
            </div>
          </div>
        );
      })()}

      {/* Occasions */}
      {fragrance.occasions.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
            Best for
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {fragrance.occasions.map((occ) => (
              <span
                key={occ}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground/80"
              >
                <span className="h-1 w-1 rounded-full bg-gold" />
                {OCCASION_LABELS[occ] ?? occ}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Note pyramid */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
          Note pyramid
        </h2>
        <div className="space-y-2">
          <PyramidTier tier="Top" notes={fragrance.notes.top} accent="gold" />
          <PyramidTier tier="Heart" notes={fragrance.notes.heart} accent="wine" />
          <PyramidTier tier="Base" notes={fragrance.notes.base} accent="ink" />
        </div>
      </section>

      {/* Duels this fragrance appears in */}
      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Swords className="h-5 w-5 text-wine" />
          <h2 className="font-display text-xl font-semibold text-foreground">
            Duels featuring {fragrance.name}
          </h2>
          <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-xs text-muted-foreground">
            {duels.length}
          </span>
        </div>
        {duels.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {duels.map((a) => (
              <ArticleCard
                key={a.slug}
                article={a}
                onOpen={onOpenArticle}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-surface-elevated/40 p-6 text-center text-sm text-muted-foreground">
            {fragrance.name} hasn&apos;t appeared in a published duel yet. Try it
            in the comparator.
          </div>
        )}
      </section>

      {/* Paired fragrances */}
      {paired.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Paired with
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {paired.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(`#/fragrance/${p.id}`)}
                className="group flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
              >
                <span className="min-w-0">
                  <span className="block text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                    {p.house}
                  </span>
                  <span className="block text-sm font-medium text-foreground">
                    {p.name}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* CTA: open in comparator */}
      <section className="mt-12 rounded-lg border border-border bg-surface-elevated/50 p-6 text-center">
        <FlaskConical className="mx-auto h-6 w-6 text-gold" />
        <h2 className="mt-2 font-display text-lg font-semibold text-foreground">
          Put {fragrance.name} in a duel
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Load it as Side A in the Scent Duel Comparator and pick an opponent.
        </p>
        <button
          onClick={() => onNavigate(`#/comparator?a=${fragrance.id}`)}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
        >
          <Swords className="h-4 w-4" />
          Open in Comparator
        </button>
      </section>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-1.5 text-gold">
        {icon}
        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-1.5 font-display text-lg font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}

function PyramidTier({
  tier,
  notes,
  accent,
}: {
  tier: string;
  notes: string[];
  accent: "gold" | "wine" | "ink";
}) {
  const accentClass =
    accent === "gold"
      ? "bg-gold/15 text-gold border-gold/30"
      : accent === "wine"
      ? "bg-wine/10 text-wine border-wine/30"
      : "bg-surface-elevated text-foreground border-border";
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-surface p-3">
      <span
        className={cn(
          "mt-0.5 inline-flex h-6 shrink-0 items-center rounded-sm border px-1.5 text-[0.6rem] font-semibold uppercase tracking-wider",
          accentClass
        )}
      >
        {tier}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {notes.map((n) => (
          <span
            key={n}
            className="rounded-sm bg-surface-elevated px-2 py-0.5 text-sm text-foreground/85"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
