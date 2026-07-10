"use client";

import { useMemo, useState } from "react";
import { GLOSSARY } from "@/lib/glossary";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Search, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Fragrance glossary — definitions for terms used across the site, grouped
 * by theme (pyramid, performance, concentration, methodology, market, families).
 * Live search filters across terms + definitions. Route: #/glossary
 */
export function GlossaryView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return GLOSSARY;
    return GLOSSARY.map((g) => ({
      ...g,
      entries: g.entries.filter(
        (e) =>
          e.term.toLowerCase().includes(query) ||
          e.definition.toLowerCase().includes(query)
      ),
    })).filter((g) => g.entries.length > 0);
  }, [q]);

  const totalEntries = GLOSSARY.reduce((n, g) => n + g.entries.length, 0);
  const matchCount = filtered.reduce((n, g) => n + g.entries.length, 0);

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Glossary", url: "https://scentduel.com/#/glossary" },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-3xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>Reference</Eyebrow>
      <div className="mt-2 flex items-center gap-2">
        <BookOpen className="h-7 w-7 text-gold" />
        <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Fragrance glossary
        </h1>
      </div>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Every term we use across the duels, the comparator, and the methodology
        guide — defined for a beginner or intermediate collector. {totalEntries}{" "}
        terms across {GLOSSARY.length} themes.
      </p>

      {/* Search */}
      <div className="mt-6 flex items-center gap-2 rounded-md border border-border bg-surface px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms or definitions…"
          className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          aria-label="Search glossary"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {q && (
        <p className="mt-2 text-xs text-muted-foreground">
          {matchCount} match{matchCount === 1 ? "" : "es"} for “{q}”.
        </p>
      )}

      {/* Groups */}
      <div className="mt-8 space-y-10">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface-elevated/40 p-8 text-center text-sm text-muted-foreground">
            No glossary entries match “{q}”.
          </div>
        ) : (
          filtered.map((group) => (
            <section key={group.id}>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {group.title}
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">{group.blurb}</p>
              <Accordion type="single" collapsible className="w-full">
                {group.entries.map((entry, i) => (
                  <AccordionItem
                    key={entry.term}
                    value={`${group.id}-${i}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline">
                      {entry.term}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {entry.definition}
                      {entry.see && entry.see.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[0.65rem] uppercase tracking-wider text-gold">
                            See also
                          </span>
                          {entry.see.map((s) => (
                            <span
                              key={s}
                              className={cn(
                                "rounded-sm border border-border bg-surface-elevated px-1.5 py-0.5 text-[0.7rem] text-foreground/80",
                              )}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
