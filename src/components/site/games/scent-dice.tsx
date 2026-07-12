"use client";

import { useState } from "react";
import { FRAGRANCES } from "@/lib/fragrance-data";
import type { Fragrance } from "@/lib/types";
import { Eyebrow } from "@/components/site/eyebrow";
import { Dices, RefreshCw, ArrowRight, Sparkles, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Scent Dice — roll a random fragrance with style.
 * Animates through a few frames before landing on a result.
 */
export function ScentDice({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<Fragrance | null>(null);
  const [frames, setFrames] = useState<Fragrance[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    setResult(null);

    // Generate random frames to flick through
    const shuffled = [...FRAGRANCES].sort(() => Math.random() - 0.5).slice(0, 8);
    setFrames(shuffled);
    setFrameIndex(0);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setFrameIndex(i);
      if (i >= shuffled.length - 1) {
        clearInterval(interval);
        // Final result
        const final = FRAGRANCES[Math.floor(Math.random() * FRAGRANCES.length)];
        setResult(final);
        setRolling(false);
      }
    }, 120);
  };

  const current = rolling ? frames[frameIndex] ?? null : result;
  const isFinal = !rolling && result !== null;

  return (
    <div className="sd-fade-up mx-auto max-w-2xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="flex items-center gap-2">
        <Dices className="h-5 w-5 text-gold" />
        <Eyebrow>Game</Eyebrow>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
        Scent Dice
      </h1>
      <p className="mt-3 text-muted-foreground">
        Roll the dice and let fate decide your next scent discovery.
      </p>

      {/* Dice area */}
      <div className="mt-10 flex flex-col items-center">
        <button
          onClick={roll}
          disabled={rolling}
          className={cn(
            "relative inline-flex h-40 w-40 items-center justify-center rounded-2xl border-2 transition-all duration-300",
            rolling
              ? "border-gold/50 bg-surface-elevated scale-105"
              : isFinal
              ? "border-gold bg-gold/5"
              : "border-border bg-surface hover:border-gold/50 hover:shadow-[0_12px_28px_-16px_rgba(184,134,59,0.3)]"
          )}
          aria-label="Roll scent dice"
        >
          {rolling ? (
            <div className="text-center">
              <Dices className="mx-auto h-12 w-12 text-gold animate-bounce" />
              <p className="mt-2 text-xs text-muted-foreground">Rolling…</p>
            </div>
          ) : current ? (
            <div className="text-center p-4">
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                {current.house}
              </span>
              <p className="mt-1 font-display text-lg font-semibold text-foreground leading-tight">
                {current.name}
              </p>
              <span className="mt-1 inline-block rounded-sm border border-border px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wider text-muted-foreground">
                {current.family}
              </span>
            </div>
          ) : (
            <div className="text-center">
              <Dices className="mx-auto h-14 w-14 text-muted-foreground/40" />
              <p className="mt-2 text-xs text-muted-foreground">Tap to roll</p>
            </div>
          )}
        </button>

        {!rolling && (
          <button
            onClick={roll}
            disabled={rolling}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-wine px-6 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
          >
            <RefreshCw className="h-4 w-4" />
            {result ? "Roll again" : "Roll the dice"}
          </button>
        )}
      </div>

      {/* Result actions */}
      {isFinal && result && (
        <div className="mt-10 sd-fade-up">
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                  {result.house} · {result.releaseYear}
                </span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {result.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
                    {result.concentration}
                  </span>
                  <span className="rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
                    {result.family}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {result.blurb}
                </p>
              </div>
            </div>

            {/* Notes mini-preview */}
            <div className="mt-4 space-y-1">
              <NoteLine tier="Top" notes={result.notes.top} />
              <NoteLine tier="Heart" notes={result.notes.heart} />
              <NoteLine tier="Base" notes={result.notes.base} />
            </div>

            {/* Stats */}
            <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <span>💰 ${result.typicalPriceUSD} / 100ml</span>
              <span>⏱ {result.longevityHours}h</span>
              <span>💨 {result.sillage}/5 sillage</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate(`#/fragrance/${result.id}`)}
              className="inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90"
            >
              <Sparkles className="h-4 w-4" /> View profile
            </button>
            <button
              onClick={() => onNavigate(`#/comparator?a=${result.id}`)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/60"
            >
              <FlaskConical className="h-4 w-4" /> Compare with…
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Spinning animation for the dice */}
      <style>{`
        @keyframes scent-dice-spin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(15deg) scale(1.05); }
          50% { transform: rotate(-10deg) scale(1.08); }
          75% { transform: rotate(8deg) scale(1.03); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .animate-bounce {
          animation: scent-dice-spin 0.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function NoteLine({ tier, notes }: { tier: string; notes: string[] }) {
  return (
    <div className="flex items-baseline gap-2 text-sm">
      <span className="w-12 shrink-0 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">{tier}</span>
      <span className="text-foreground/80">{notes.join(", ")}</span>
    </div>
  );
}