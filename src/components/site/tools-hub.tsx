"use client";

import { Eyebrow } from "./eyebrow";
import { ArrowRight, FlaskConical, Gamepad2, Sparkles, Dices, Layers, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_TOOLS = [
  {
    label: "Scent Duel Comparator",
    hash: "#/comparator",
    icon: FlaskConical,
    desc: "Pick any two fragrances and compare them side by side with note overlap analysis.",
    accent: "wine" as const,
  },
  {
    label: "Scent Match",
    hash: "#/scent-match",
    icon: Sparkles,
    desc: "A fun this-or-that game that finds your perfect fragrance match in 8 rounds.",
    accent: "gold" as const,
  },
  {
    label: "Scent Dice",
    hash: "#/scent-dice",
    icon: Dices,
    desc: "Roll the dice and let fate pick a random fragrance for you to discover.",
    accent: "gold" as const,
  },
  {
    label: "Occasion Finder",
    hash: "#/find",
    icon: Gamepad2,
    desc: "Not sure what to wear? Find the perfect scent for tonight's occasion.",
    accent: "wine" as const,
  },
  {
    label: "Family Explorer",
    hash: "#/families",
    icon: Layers,
    desc: "Browse all fragrances by their olfactory family — woody, fresh, oriental, and more.",
    accent: "wine" as const,
  },
  {
    label: "Glossary",
    hash: "#/glossary",
    icon: BookOpen,
    desc: "Look up fragrance terms, note definitions, and industry jargon explained simply.",
    accent: "gold" as const,
  },
];

export function ToolsHub({ onNavigate }: { onNavigate: (hash: string) => void }) {
  return (
    <div className="sd-fade-up mx-auto max-w-4xl px-4 pb-20 pt-8 sm:pt-12">
      <div className="accent-bar" aria-hidden />
      <Eyebrow>All Tools</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-[2.6rem]">
        Tools & Games
      </h1>
      <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
        Everything you can do on ScentDuel beyond reading duels — compare, discover, play, and explore.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {ALL_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.hash}
              onClick={() => onNavigate(tool.hash)}
              className={cn(
                "group flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all hover:-translate-y-0.5",
                tool.accent === "wine"
                  ? "border-border hover:border-wine/50 hover:shadow-[0_8px_20px_-12px_rgba(122,35,49,0.3)]"
                  : "border-border hover:border-gold/50 hover:shadow-[0_8px_20px_-12px_rgba(184,134,59,0.3)]"
              )}
            >
              <span className={cn(
                "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                tool.accent === "wine"
                  ? "bg-wine/8 text-wine group-hover:bg-wine/12"
                  : "bg-gold/8 text-gold group-hover:bg-gold/12"
              )}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold text-foreground group-hover:text-wine">
                    {tool.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {tool.desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick stats row */}
      <div className="mt-12 rounded-lg border border-border bg-surface-elevated/40 p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-wine">6</div>
            <div className="mt-1 text-xs text-muted-foreground">Interactive tools</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-gold">2</div>
            <div className="mt-1 text-xs text-muted-foreground">Games to play</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-foreground">∞</div>
            <div className="mt-1 text-xs text-muted-foreground">Combinations to explore</div>
          </div>
        </div>
      </div>
    </div>
  );
}