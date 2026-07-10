"use client";

import { useState, useMemo } from "react";
import { GLOSSARY } from "@/lib/glossary";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

/**
 * Flat index of glossary terms → definition, built once.
 * Terms are stored with their original casing for display; matching is
 * case-insensitive and word-boundary anchored to avoid linking substrings
 * (e.g. "leather" inside "Leather" the family, but not "leather" inside
 * "unsweetened").
 */
interface TermEntry {
  term: string;
  termLower: string;
  definition: string;
}

const TERM_ENTRIES: TermEntry[] = GLOSSARY.flatMap((g) =>
  g.entries.map((e) => ({
    term: e.term,
    termLower: e.term.toLowerCase(),
    definition: e.definition,
  }))
).sort((a, b) => b.termLower.length - a.termLower.length); // longest first

/**
 * Tokenises a string into alternating plain-text + term segments. Longest
 * terms win, so "Eau de Parfum" matches before "Parfum". Each term is
 * matched at most once per string to avoid spammy repeated links.
 */
export function tokenizeGlossary(text: string): Array<{ type: "text" | "term"; value: string; term?: string; definition?: string }> {
  if (!text) return [{ type: "text", value: "" }];
  const used = new Set<string>();
  const segments: Array<{ type: "text" | "term"; value: string; term?: string; definition?: string }> = [];

  let i = 0;
  let buf = "";
  const flushBuf = () => {
    if (buf) {
      segments.push({ type: "text", value: buf });
      buf = "";
    }
  };

  const lower = text.toLowerCase();
  while (i < text.length) {
    let matched: TermEntry | null = null;
    for (const e of TERM_ENTRIES) {
      if (used.has(e.termLower)) continue;
      const needle = e.termLower;
      // Match at word boundary on the left.
      const startIdx = lower.indexOf(needle, i);
      if (startIdx !== i) continue;
      // Word boundary on the right: next char is non-letter or end.
      const after = startIdx + needle.length;
      const nextChar = text[after];
      if (nextChar && /[a-zA-Z]/.test(nextChar)) continue;
      // Word boundary on the left: previous char is non-letter or start.
      if (startIdx > 0) {
        const prevChar = text[startIdx - 1];
        if (/[a-zA-Z]/.test(prevChar)) continue;
      }
      matched = e;
      break;
    }
    if (matched) {
      flushBuf();
      segments.push({
        type: "term",
        value: text.slice(i, i + matched.termLower.length),
        term: matched.term,
        definition: matched.definition,
      });
      used.add(matched.termLower);
      i += matched.termLower.length;
    } else {
      buf += text[i];
      i++;
    }
  }
  flushBuf();
  return segments;
}

/** Renders text with glossary terms as hover-tooltip links to #/glossary. */
export function GlossaryText({
  text,
  onNavigate,
  className,
}: {
  text: string;
  onNavigate?: (hash: string) => void;
  className?: string;
}) {
  const segments = useMemo(() => tokenizeGlossary(text), [text]);
  const [clicked, setClicked] = useState<string | null>(null);

  if (!onNavigate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === "text") {
          return <span key={idx}>{seg.value}</span>;
        }
        return (
          <HoverCard key={idx} openDelay={150} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                onClick={() => onNavigate("#/glossary")}
                className={cn(
                  "cursor-help border-b border-dotted border-gold/60 font-medium text-foreground underline-offset-2 transition-colors hover:border-gold hover:text-wine",
                  clicked === seg.term && "text-wine"
                )}
                onMouseEnter={() => setClicked(null)}
              >
                {seg.value}
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              align="start"
              className="w-80 rounded-md border border-border bg-surface p-3 text-xs shadow-lg"
            >
              <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                {seg.term} · glossary
              </div>
              <p className="leading-relaxed text-foreground/85">{seg.definition}</p>
              <div className="mt-2 text-[0.6rem] text-muted-foreground">
                Click to open the full glossary →
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </span>
  );
}
