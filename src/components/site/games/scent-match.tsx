"use client";

import { useState, useCallback } from "react";
import { FRAGRANCES, fragranceById } from "@/lib/fragrance-data";
import { Eyebrow } from "@/components/site/eyebrow";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Question = {
  a: string;
  b: string;
  pick: "a" | "b" | null;
};

function pickQuestion(exclude: Set<string>): Question {
  const pool = FRAGRANCES.filter((f) => !exclude.has(f.id));
  if (pool.length < 2) {
    // fallback — use all
    const shuffled = [...FRAGRANCES].sort(() => Math.random() - 0.5);
    return { a: shuffled[0].id, b: shuffled[1].id, pick: null };
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return { a: shuffled[0].id, b: shuffled[1].id, pick: null };
}

export function ScentMatch({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [phase, setPhase] = useState<"play" | "result">("play");
  const [questions, setQuestions] = useState<Question[]>([pickQuestion(new Set())]);
  const [currentQ, setCurrentQ] = useState(0);
  const [preferences, setPreferences] = useState<Map<string, number>>(new Map());

  const q = questions[currentQ];
  const fragA = fragranceById(q.a);
  const fragB = fragranceById(q.b);

  const finish = () => {
    setPhase("result");
  };

  const pick = useCallback((side: "a" | "b") => {
    const id = side === "a" ? q.a : q.b;
    const skipped = side === "a" ? q.b : q.a;

    // Update preferences: +1 for chosen, -0.5 for skipped
    setPreferences((prev) => {
      const next = new Map(prev);
      next.set(id, (next.get(id) ?? 0) + 1);
      next.set(skipped, (next.get(skipped) ?? 0) - 0.5);
      return next;
    });

    const updated = [...questions];
    updated[currentQ] = { ...updated[currentQ], pick: side };

    if (currentQ + 1 >= questions.length) {
      // Add next question
      const excluded = new Set([q.a, q.b]);
      updated.push(pickQuestion(excluded));
    }
    setQuestions(updated);
    setCurrentQ(currentQ + 1);

    // After 8 picks, show results
    if (currentQ + 1 >= 7) {
      finish();
    }
  }, [currentQ, q, questions]);

  const reset = () => {
    setPhase("play");
    setQuestions([pickQuestion(new Set())]);
    setCurrentQ(0);
    setPreferences(new Map());
  };

  // Results
  if (phase === "result") {
    const scores = new Map<string, number>();
    for (const q of questions) {
      if (q.pick === "a") scores.set(q.a, (scores.get(q.a) ?? 0) + 1);
      else if (q.pick === "b") scores.set(q.b, (scores.get(q.b) ?? 0) + 1);
    }
    for (const [id, score] of preferences) {
      scores.set(id, (scores.get(id) ?? 0) + score);
    }

    const sorted = [...scores.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return (
      <div className="sd-fade-up mx-auto max-w-2xl px-4 pb-20 pt-8 sm:pt-12">
        <div className="accent-bar" aria-hidden />
        <Eyebrow>Your Scent Profile</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
          Your top matches
        </h1>
        <p className="mt-3 text-muted-foreground">
          Based on {currentQ + 1} quick picks, here are the fragrances you might love.
        </p>

        <div className="mt-8 space-y-3">
          {sorted.map(([id, score], i) => {
            const f = fragranceById(id);
            if (!f) return null;
            const pct = Math.round((score / sorted[0][1]) * 100);
            return (
              <button
                key={id}
                onClick={() => onNavigate(`#/fragrance/${id}`)}
                className="group w-full rounded-lg border border-border bg-surface-elevated p-4 text-left transition-all hover:-translate-y-0.5 hover:border-gold/50"
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    i === 0 ? "bg-gold text-gold-foreground" :
                    i === 1 ? "bg-wine text-wine-foreground" :
                    "bg-surface text-muted-foreground border border-border"
                  )}>
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-display text-base font-semibold text-foreground group-hover:text-wine">
                        {f.name}
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-gold">{score.toFixed(0)}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{f.house} · {f.family}</span>
                    {/* Mini bar */}
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-wine to-gold transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90"
          >
            <RefreshCw className="h-4 w-4" /> Play again
          </button>
          <button
            onClick={() => onNavigate("#/comparator")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/60"
          >
            Try the Comparator <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!fragA || !fragB) {
    return <div className="p-8 text-center text-muted-foreground">Loading…</div>;
  }

  const progress = Math.round((currentQ / 7) * 100);

  return (
    <div className="sd-fade-up mx-auto max-w-2xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-gold" />
        <Eyebrow>Scent Match</Eyebrow>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
        This or that?
      </h1>
      <p className="mt-3 text-muted-foreground">
        Quick! Pick the scent you prefer. We'll match you after 8 rounds.
      </p>

      {/* Progress bar */}
      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-linear-to-r from-wine to-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-muted-foreground">
        Round {currentQ + 1} of 8
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => pick("a")}
          className="group rounded-xl border-2 border-border bg-surface-elevated p-6 text-left transition-all hover:-translate-y-1 hover:border-wine hover:shadow-[0_12px_24px_-12px_rgba(122,35,49,0.3)]"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold">Side A</span>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground group-hover:text-wine">
            {fragA.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{fragA.house} · {fragA.family}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75 line-clamp-2">{fragA.blurb}</p>
        </button>

        <button
          onClick={() => pick("b")}
          className="group rounded-xl border-2 border-border bg-surface-elevated p-6 text-left transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_24px_-12px_rgba(184,134,59,0.3)]"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold">Side B</span>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground group-hover:text-gold">
            {fragB.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{fragB.house} · {fragB.family}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75 line-clamp-2">{fragB.blurb}</p>
        </button>
      </div>
    </div>
  );
}