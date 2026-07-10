"use client";

import { useMemo, useState } from "react";
import { fragrancesByFamily } from "@/lib/content";
import type { Fragrance } from "@/lib/types";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const FAMILY_COLOR: Record<Fragrance["family"], string> = {
  Citrus: "bg-gold/15 text-gold border-gold/40",
  Woody: "bg-[#5B6B52]/15 text-[#5B6B52] border-[#5B6B52]/40 dark:text-[#9bb594] dark:border-[#9bb594]/40",
  Floral: "bg-wine/10 text-wine border-wine/40",
  Oriental: "bg-wine/15 text-wine border-wine/40",
  Fresh: "bg-gold/10 text-gold border-gold/40",
  Aromatic: "bg-[#5B6B52]/10 text-[#5B6B52] border-[#5B6B52]/40 dark:text-[#9bb594] dark:border-[#9bb594]/40",
  Gourmand: "bg-[#8A5A2B]/10 text-[#8A5A2B] border-[#8A5A2B]/40 dark:text-[#c89668] dark:border-[#c89668]/40",
  Leather: "bg-foreground/10 text-foreground/70 border-border",
  Chypre: "bg-[#5B6B52]/15 text-[#5B6B52] border-[#5B6B52]/40 dark:text-[#9bb594] dark:border-[#9bb594]/40",
  Fougere: "bg-[#5B6B52]/10 text-[#5B6B52] border-[#5B6B52]/40 dark:text-[#9bb594] dark:border-[#9bb594]/40",
};

const FAMILY_BLURB: Record<Fragrance["family"], string> = {
  Citrus: "Bright, volatile, summery top notes — lemon, bergamot, neroli.",
  Woody: "Dry sandalwood, cedar, vetiver, incense. The backbone of most cold-weather scents.",
  Floral: "Iris, rose, jasmine — the heart of most classical perfumery.",
  Oriental: "Amber, vanilla, spice, resin. Heavy, sweet, warm.",
  Fresh: "Aquatic, fruity or clean — the modern crowd-pleaser family.",
  Aromatic: "Lavender, herbs, spices — the barbershop and fougère lineage.",
  Gourmand: "Edible — vanilla, tonka, chocolate, booze. Sweet and dessert-like.",
  Leather: "Smoky, tannic, animalic. The old-leather-jacket family.",
  Chypre: "Bergamot-oakmoss-patchouli structure. The classic complex backbone.",
  Fougere: "Lavender-coumarin-oakmoss. The traditional 'men's cologne' arc.",
};

/**
 * Fragrance family explorer — browse the full dataset grouped by family.
 * Each family is a collapsible card showing its fragrances. Route: #/families
 */
export function FamilyExplorerView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const groups = useMemo(() => fragrancesByFamily(), []);
  const [openFamily, setOpenFamily] = useState<Fragrance["family"] | null>(
    groups[0]?.family ?? null
  );

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Families", url: "https://scentduel.com/#/families" },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>Browse the dataset</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
        Fragrance families
      </h1>
      <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
        Every fragrance in the ScentDuel dataset grouped by its primary accord
        family. Click a family to see its members — then open any fragrance in
        a duel or its profile.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
        <Filter className="h-3 w-3" />
        {groups.length} families · {groups.reduce((n, g) => n + g.frags.length, 0)} fragrances
      </div>

      {/* Family grid overview */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {groups.map((g) => {
          const active = openFamily === g.family;
          return (
            <button
              key={g.family}
              onClick={() => setOpenFamily(active ? null : g.family)}
              className={cn(
                "flex flex-col items-start rounded-lg border p-3 text-left transition-all",
                active
                  ? "border-wine bg-wine text-wine-foreground shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
                  : "border-border bg-surface hover:-translate-y-0.5 hover:border-gold/60"
              )}
            >
              <span
                className={cn(
                  "mb-1 inline-block rounded-sm border px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider",
                  active ? "border-wine-foreground/30 bg-wine-foreground/10 text-wine-foreground" : FAMILY_COLOR[g.family]
                )}
              >
                {g.family}
              </span>
              <span className="font-display text-2xl font-semibold">
                {g.frags.length}
              </span>
              <span className={cn("text-[0.65rem]", active ? "text-wine-foreground/70" : "text-muted-foreground")}>
                scent{g.frags.length === 1 ? "" : "s"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected family detail */}
      {openFamily && (() => {
        const g = groups.find((x) => x.family === openFamily);
        if (!g) return null;
        return (
          <section className="mt-10">
            <div className="mb-1 flex items-center gap-2">
              <span className={cn("inline-block rounded-sm border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider", FAMILY_COLOR[g.family])}>
                {g.family}
              </span>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {g.frags.length} fragrance{g.frags.length === 1 ? "" : "s"}
              </h2>
            </div>
            <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {FAMILY_BLURB[g.family]}
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {g.frags.map((f) => (
                <li key={f.id}>
                  <div className="group flex items-center justify-between gap-3 rounded-md border border-border bg-surface p-3 transition-colors hover:border-gold/50">
                    <button
                      onClick={() => onNavigate(`#/fragrance/${f.id}`)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="block text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                        {f.house}
                      </span>
                      <span className="block truncate font-display text-sm font-semibold text-foreground group-hover:text-wine">
                        {f.name}
                      </span>
                      <span className="mt-0.5 block text-[0.65rem] text-muted-foreground">
                        {f.concentration} · {f.longevityHours}h · sillage {f.sillage}/5 · ${f.typicalPriceUSD}
                      </span>
                    </button>
                    <button
                      onClick={() => onNavigate(`#/comparator?a=${f.id}`)}
                      aria-label={`Duel ${f.name} in the comparator`}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-surface-elevated px-2 py-1.5 text-[0.65rem] font-semibold text-foreground/70 transition-colors hover:border-gold hover:text-wine"
                    >
                      Duel
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}
    </div>
  );
}
