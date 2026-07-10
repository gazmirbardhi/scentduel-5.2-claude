"use client";

import { useCallback, useMemo, useState } from "react";
import { FRAGRANCES, fragranceById, noteOverlap, suggestLayering } from "@/lib/fragrance-data";
import { randomDuelPair, valueScore } from "@/lib/content";
import type { Fragrance } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { FragrancePicker } from "./fragrance-picker";
import { DuelLayout } from "./duel-layout";
import { ComparatorRadar } from "./comparator-radar";
import { Eyebrow } from "./eyebrow";
import { JsonLd } from "./json-ld";
import { Sparkles, Repeat2, Layers, ArrowRightLeft, Wand2, Link2, Check, Dices } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_A = "bleu-de-chanel-edp";
const DEFAULT_B = "le-labo-santal-33";

/**
 * Scent Duel Comparator — the flagship client-side tool.
 * Fully static-export compatible (no server). Picks two fragrances and
 * renders the same two-card VS layout used in articles, plus a generated
 * analysis of overlapping / contrasting notes.
 *
 * Selections are synced to the URL hash (`#/comparator?a=<id>&b=<id>`) so
 * every configured duel is shareable/bookmarkable. The parent passes a
 * `key` derived from the URL params so the component remounts only when the
 * URL changes — manual picker changes update the URL without remounting.
 */
export function Comparator({
  initialA,
  initialB,
  onNavigate,
}: {
  initialA?: string | null;
  initialB?: string | null;
  onNavigate: (hash: string) => void;
}) {
  const { toast } = useToast();
  const [aId, setAId] = useState<string | null>(initialA ?? DEFAULT_A);
  const [bId, setBId] = useState<string | null>(initialB ?? DEFAULT_B);
  const [copied, setCopied] = useState(false);

  const a = aId ? fragranceById(aId) ?? null : null;
  const b = bId ? fragranceById(bId) ?? null : null;

  const overlap = useMemo(
    () => (a && b ? noteOverlap(a, b) : null),
    [a, b]
  );

  // Sync the current selection to the URL so it's shareable. Uses
  // replaceState to avoid polluting browser history on every picker change.
  const syncUrl = useCallback(
    (nextA: string | null, nextB: string | null) => {
      const params = new URLSearchParams();
      if (nextA) params.set("a", nextA);
      if (nextB) params.set("b", nextB);
      const hash = `#/comparator?${params.toString()}`;
      // replaceState so back-button doesn't step through every selection.
      window.history.replaceState(null, "", hash);
    },
    []
  );

  const handleSetA = useCallback(
    (id: string) => {
      setAId(id);
      syncUrl(id, bId);
    },
    [bId, syncUrl]
  );
  const handleSetB = useCallback(
    (id: string) => {
      setBId(id);
      syncUrl(aId, id);
    },
    [aId, syncUrl]
  );

  const swap = () => {
    const nextA = bId;
    const nextB = aId;
    setAId(nextA);
    setBId(nextB);
    syncUrl(nextA, nextB);
  };

  const surprise = () => {
    const { a: ra, b: rb } = randomDuelPair(aId, bId);
    setAId(ra);
    setBId(rb);
    syncUrl(ra, rb);
  };

  const shareLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Share this duel — it opens with your exact two fragrances.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (permissions); fall back to selecting the URL
      toast({
        title: "Copy failed",
        description: "Copy the URL from your address bar to share this duel.",
      });
    }
  };

  const toolLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scent Duel Comparator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    url: "https://scentduel.com/#/comparator",
    description:
      "Pick two fragrances and see their note overlap, contrasting notes, and side-by-side specs in the ScentDuel two-card VS layout.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="sd-fade-up mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={toolLd} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Eyebrow>Interactive Tool</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
            Scent Duel Comparator
          </h1>
        </div>
        <button
          onClick={shareLink}
          className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-gold hover:text-wine"
          aria-label="Copy a shareable link to this duel"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-gold" /> Copied
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" /> Copy link
            </>
          )}
        </button>
      </div>
      <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
        Pick any two fragrances and see them face off in the same VS layout we
        use in our articles — with a generated note-overlap analysis so you can
        see exactly where they agree and where they diverge. Your selection is
        saved to the URL, so you can share any duel.
      </p>

      {/* Pickers */}
      <div className="mt-8 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <FragrancePicker
          sideLabel="Side A"
          value={aId}
          onChange={handleSetA}
          excludeId={bId ?? undefined}
        />
        <button
          onClick={swap}
          aria-label="Swap sides"
          className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:rotate-180 hover:border-gold hover:text-wine"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <FragrancePicker
          sideLabel="Side B"
          value={bId}
          onChange={handleSetB}
          excludeId={aId ?? undefined}
        />
      </div>

      {/* Duel layout */}
      {a && b && (
        <section className="mt-10">
          <DuelLayout
            sides={[
              { fragranceId: a.id, label: "Side A" },
              { fragranceId: b.id, label: "Side B" },
            ]}
            fragranceA={a}
            fragranceB={b}
            onOpenFragrance={(id) => onNavigate(`#/fragrance/${id}`)}
          />
        </section>
      )}

      {/* Analysis */}
      {a && b && overlap && (
        <Analysis a={a} b={b} overlap={overlap} />
      )}

      {/* Quick picks */}
      <section className="mt-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Or try a preset duel
          </h2>
          <button
            onClick={surprise}
            className="group inline-flex items-center gap-1.5 rounded-full border border-wine/40 bg-wine/[0.06] px-3 py-1.5 text-xs font-semibold text-wine transition-all hover:bg-wine hover:text-wine-foreground"
            aria-label="Pick two random fragrances"
          >
            <Dices className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            Surprise me
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setAId(p.a);
                setBId(p.b);
                syncUrl(p.a, p.b);
              }}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-gold hover:text-wine"
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* Secondary: Layering Combo Finder */}
      <LayeringFinder />

      <p className="mt-10 text-xs text-muted-foreground">
        Note data is editor-curated and simplified for comparison. Real-world
        performance varies with skin chemistry, batch and climate.
      </p>
    </div>
  );
}

/* ── Analysis panel ─────────────────────────────────────────────────────── */

function Analysis({
  a,
  b,
  overlap,
}: {
  a: Fragrance;
  b: Fragrance;
  overlap: ReturnType<typeof noteOverlap>;
}) {
  const aOnlyTop = a.notes.top.filter(
    (n) => !overlap.sharedTop.includes(n)
  );
  const bOnlyTop = b.notes.top.filter(
    (n) => !overlap.sharedTop.includes(n)
  );

  const specRows: { label: string; a: string; b: string }[] = [
    { label: "House", a: a.house, b: b.house },
    { label: "Concentration", a: a.concentration, b: b.concentration },
    { label: "Family", a: a.family, b: b.family },
    { label: "Longevity", a: `${a.longevityHours}h`, b: `${b.longevityHours}h` },
    {
      label: "Sillage",
      a: `${a.sillage}/5`,
      b: `${b.sillage}/5`,
    },
    {
      label: "Price (100ml)",
      a: `$${a.typicalPriceUSD}`,
      b: `$${b.typicalPriceUSD}`,
    },
    { label: "Release year", a: `${a.releaseYear}`, b: `${b.releaseYear}` },
    {
      label: "Marketed as",
      a: a.genderMarketing,
      b: b.genderMarketing,
    },
  ];

  const verdict = overlap.similarity >= 60
    ? "These two share a lot of DNA — layering risks muddying them; wear them on different days."
    : overlap.similarity >= 30
    ? "Partial overlap. They'll agree on some notes and contrast on others — a workable layer if the families differ."
    : "Very little overlap. Strong contrast — good layering candidates if one is light (citrus/fresh) and the other heavy (woody/oriental).";

  return (
    <section className="mt-10 space-y-8">
      {/* Similarity meter */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Eyebrow>Note overlap</Eyebrow>
            <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
              {overlap.similarity}% similar
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {overlap.sharedAll.length} shared note{overlap.sharedAll.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
          <div
            className="h-full rounded-full bg-gradient-to-r from-wine to-gold transition-all duration-500"
            style={{ width: `${overlap.similarity}%` }}
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {verdict}
        </p>

        {/* Shared notes by tier */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <TierBlock
            tier="Shared top"
            notes={overlap.sharedTop}
            emptyText="No shared top notes"
          />
          <TierBlock
            tier="Shared heart"
            notes={overlap.sharedHeart}
            emptyText="No shared heart notes"
          />
          <TierBlock
            tier="Shared base"
            notes={overlap.sharedBase}
            emptyText="No shared base notes"
          />
        </div>

        {/* Contrasting tops */}
        {(aOnlyTop.length > 0 || bOnlyTop.length > 0) && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ContrastBlock
              title={`${a.name} — top only`}
              notes={aOnlyTop}
              accent="wine"
            />
            <ContrastBlock
              title={`${b.name} — top only`}
              notes={bOnlyTop}
              accent="gold"
            />
          </div>
        )}
      </div>

      {/* Five-axis radar */}
      <ComparatorRadar a={a} b={b} />

      {/* Spec comparison */}
      <div>
        <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
          Spec comparison
        </h3>
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface-elevated">
                <th className="w-2/5 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Spec
                </th>
                <th className="px-4 py-3 font-display text-sm font-semibold text-foreground">
                  {a.name}
                </th>
                <th className="px-4 py-3 font-display text-sm font-semibold text-foreground">
                  {b.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, i) => {
                const differs = row.a !== row.b;
                return (
                  <tr
                    key={row.label}
                    className={cn(
                      "align-top",
                      i !== specRows.length - 1 && "border-b border-border"
                    )}
                  >
                    <td className="px-4 py-2.5 text-muted-foreground">{row.label}</td>
                    <td className={cn("px-4 py-2.5 font-medium", differs ? "text-foreground" : "text-muted-foreground")}>
                      {row.a}
                    </td>
                    <td className={cn("px-4 py-2.5 font-medium", differs ? "text-foreground" : "text-muted-foreground")}>
                      {row.b}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Value score */}
      <ValueScorePanel a={a} b={b} />

      {/* Occasion fit */}
      <OccasionFit a={a} b={b} />
    </section>
  );
}

/* ── Value score panel ──────────────────────────────────────────────────── */

function ValueScorePanel({ a, b }: { a: Fragrance; b: Fragrance }) {
  const aScore = valueScore(a);
  const bScore = valueScore(b);
  const winner = aScore > bScore ? a : aScore < bScore ? b : null;
  const gap = Math.abs(aScore - bScore);

  return (
    <div>
      <h3 className="mb-1 font-display text-xl font-semibold text-foreground">
        Value score
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Performance-per-dollar — longevity × sillage ÷ price, normalised across the dataset. Higher = better value.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <ValueBar fragrance={a} score={aScore} highlight={winner?.id === a.id} />
        <ValueBar fragrance={b} score={bScore} highlight={winner?.id === b.id} />
      </div>
      {winner && gap >= 5 && (
        <p className="mt-4 rounded-md border border-gold/40 bg-gold/[0.06] px-4 py-2.5 text-sm text-foreground/85">
          <span className="font-semibold text-wine">{winner.name}</span> offers
          clearly better value per dollar — {gap} points ahead on the value score.
          {winner.typicalPriceUSD < Math.min(
            a.typicalPriceUSD,
            b.typicalPriceUSD
          ) + 1 && winner.id !== (aScore > bScore ? b.id : a.id)
            ? " The cheaper scent out-points the pricier one here."
            : ""}
        </p>
      )}
    </div>
  );
}

function ValueBar({
  fragrance,
  score,
  highlight,
}: {
  fragrance: Fragrance;
  score: number;
  highlight: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface p-4 transition-colors",
        highlight ? "border-wine/50 bg-wine/[0.03]" : "border-border"
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate font-display text-sm font-semibold text-foreground">
          {fragrance.name}
        </span>
        <span className="font-display text-2xl font-semibold text-foreground">
          {score}
          <span className="text-xs font-normal text-muted-foreground">/100</span>
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            highlight
              ? "bg-gradient-to-r from-wine to-gold"
              : "bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/80"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[0.65rem] text-muted-foreground">
        <span>${fragrance.typicalPriceUSD} / 100ml</span>
        <span>
          {fragrance.longevityHours}h · sillage {fragrance.sillage}/5
        </span>
      </div>
    </div>
  );
}

/* ── Occasion fit panel ─────────────────────────────────────────────────── */

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

function OccasionFit({ a, b }: { a: Fragrance; b: Fragrance }) {
  const aSet = new Set(a.occasions);
  const bSet = new Set(b.occasions);
  const allOccasions = Array.from(new Set([...a.occasions, ...b.occasions]));
  // Stable ordering by the OCCASION_LABELS key order is fine; sort alphabetically by label.
  allOccasions.sort((x, y) => (OCCASION_LABELS[x] ?? x).localeCompare(OCCASION_LABELS[y] ?? y));

  if (allOccasions.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
        Occasion fit
      </h3>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-elevated">
              <th className="w-2/5 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Occasion
              </th>
              <th className="px-4 py-3 font-display text-sm font-semibold text-foreground">
                {a.name}
              </th>
              <th className="px-4 py-3 font-display text-sm font-semibold text-foreground">
                {b.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {allOccasions.map((occ, i) => {
              const aFit = aSet.has(occ);
              const bFit = bSet.has(occ);
              const bothFit = aFit && bFit;
              return (
                <tr
                  key={occ}
                  className={cn(
                    "align-middle",
                    i !== allOccasions.length - 1 && "border-b border-border",
                    bothFit && "bg-gold/[0.06]"
                  )}
                >
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {OCCASION_LABELS[occ] ?? occ}
                  </td>
                  <td className="px-4 py-2.5">
                    <FitMark fit={aFit} />
                  </td>
                  <td className="px-4 py-2.5">
                    <FitMark fit={bFit} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {aSet.size > 0 && bSet.size > 0 && (
          <p className="border-t border-border bg-surface-elevated/50 px-4 py-2.5 text-xs text-muted-foreground">
            {(() => {
              const shared = a.occasions.filter((o) => bSet.has(o));
              if (shared.length === 0) {
                return `No shared occasions — these two suit different settings.`;
              }
              return `Both suit: ${shared.map((o) => OCCASION_LABELS[o] ?? o).join(", ")}.`;
            })()}
          </p>
        )}
      </div>
    </div>
  );
}

function FitMark({ fit }: { fit: boolean }) {
  return fit ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
      Fits
    </span>
  ) : (
    <span className="text-xs text-muted-foreground/50">—</span>
  );
}

function TierBlock({
  tier,
  notes,
  emptyText,
}: {
  tier: string;
  notes: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-elevated/50 p-3">
      <div className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
        {tier}
      </div>
      {notes.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {notes.map((n) => (
            <span
              key={n}
              className="rounded-sm bg-surface px-1.5 py-0.5 text-xs font-medium text-foreground"
            >
              {n}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs italic text-muted-foreground">{emptyText}</p>
      )}
    </div>
  );
}

function ContrastBlock({
  title,
  notes,
  accent,
}: {
  title: string;
  notes: string[];
  accent: "wine" | "gold";
}) {
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <div
        className={cn(
          "mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider",
          accent === "wine" ? "text-wine" : "text-gold"
        )}
      >
        {title}
      </div>
      {notes.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {notes.map((n) => (
            <span
              key={n}
              className="rounded-sm bg-surface-elevated px-1.5 py-0.5 text-xs text-foreground/80"
            >
              {n}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs italic text-muted-foreground">—</p>
      )}
    </div>
  );
}

/* ── Secondary: Layering Combo Finder ───────────────────────────────────── */

function LayeringFinder() {
  const [baseId, setBaseId] = useState<string | null>("le-labo-santal-33");
  const base = baseId ? fragranceById(baseId) ?? null : null;
  const suggestions = base ? suggestLayering(base) : [];

  return (
    <section className="mt-16 rounded-lg border border-border bg-surface-elevated/40 p-6">
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-gold" />
        <h2 className="font-display text-xl font-semibold text-foreground">
          Layering Combo Finder
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick a fragrance you own and get contrast-rule pairing directions —
        a light top to lift a heavy base, or a heavy base to anchor a fleeting
        fresh scent.
      </p>

      <div className="mt-4 max-w-md">
        <FragrancePicker
          sideLabel="Your fragrance"
          value={baseId}
          onChange={setBaseId}
        />
      </div>

      {base && suggestions.length > 0 && (
        <ul className="mt-5 space-y-2">
          {suggestions.map((s) => (
            <li
              key={s.fragrance.id}
              className="flex items-start gap-3 rounded-md border border-border bg-surface p-3"
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-6 items-center rounded-sm px-1.5 text-[0.6rem] font-semibold uppercase tracking-wider",
                  s.role === "top"
                    ? "bg-gold/15 text-gold"
                    : "bg-wine/10 text-wine"
                )}
              >
                {s.role === "top" ? (
                  <span className="inline-flex items-center gap-1">
                    <Wand2 className="h-3 w-3" /> Lifts top
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Repeat2 className="h-3 w-3" /> Anchors base
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-semibold text-foreground">
                  {s.fragrance.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {s.fragrance.house} · {s.fragrance.family}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {s.reason}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {base && suggestions.length === 0 && (
        <p className="mt-5 text-sm text-muted-foreground">
          No strong contrast pairings in the current dataset for {base.name}.
          Try a fragrance from a different family.
        </p>
      )}
    </section>
  );
}

const PRESETS: { label: string; a: string; b: string }[] = [
  { label: "Khamrah vs Angels' Share", a: "lattafa-khamrah", b: "kilian-angels-share" },
  { label: "Supremacy vs Aventus", a: "afnan-supremacy-not-only-intense", b: "creed-aventus" },
  { label: "Terre EDT vs EDP", a: "terre-dhermes-edt", b: "terre-dhermes-edp" },
  { label: "Dior Homme vs Prada Iris", a: "dior-homme-intense", b: "prada-infusion-diris" },
  { label: "Sauvage Elixir vs Asad", a: "dior-sauvage-elixir", b: "lattafa-asad" },
  { label: "Bleu de Chanel vs Santal 33", a: "bleu-de-chanel-edp", b: "le-labo-santal-33" },
];
