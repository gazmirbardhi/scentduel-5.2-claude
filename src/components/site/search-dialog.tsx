"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/articles";
import { FRAGRANCES } from "@/lib/fragrance-data";
import { Eyebrow } from "./eyebrow";

interface SearchHit {
  kind: "article" | "fragrance";
  id: string;
  title: string;
  subtitle: string;
  hash: string;
  label: string;
}

/** Client-side static search — no server. Searches articles + fragrances. */
export function SearchDialog({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onNavigate: (hash: string) => void;
}) {
  const [q, setQ] = useState("");

  // Reset the query whenever the dialog closes so reopening starts fresh.
  const handleOpenChange = (v: boolean) => {
    if (!v) setQ("");
    onOpenChange(v);
  };

  const hits = useMemo<SearchHit[]>(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const articleHits: SearchHit[] = ARTICLES.filter((a) => {
      const hay = `${a.title} ${a.description} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
      return hay.includes(query);
    }).map((a) => ({
      kind: "article",
      id: a.slug,
      title: a.title,
      subtitle: a.description,
      hash: `#/article/${a.slug}`,
      label: a.label,
    }));

    const fragranceHits: SearchHit[] = FRAGRANCES.filter((f) => {
      const hay = `${f.name} ${f.house} ${f.family} ${f.concentration} ${f.notes.top.join(" ")} ${f.notes.heart.join(" ")} ${f.notes.base.join(" ")}`.toLowerCase();
      return hay.includes(query);
    }).map((f) => ({
      kind: "fragrance",
      id: f.id,
      title: f.name,
      subtitle: `${f.house} · ${f.family} · ${f.concentration}`,
      hash: `#/fragrance/${f.id}`,
      label: "FRAGRANCE",
    }));

    return [...articleHits, ...fragranceHits].slice(0, 12);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search ScentDuel</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search duels, fragrances, houses, notes…"
            className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            aria-label="Search query"
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

        <div className="sd-scroll max-h-96 overflow-y-auto p-2">
          {q.trim() === "" ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              Type to search across all duels, fragrances, houses and notes.
            </div>
          ) : hits.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No matches for “{q}”.
            </div>
          ) : (
            <ul className="space-y-1" role="listbox" aria-label="Search results">
              {hits.map((hit) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <button
                    onClick={() => {
                      onNavigate(hit.hash);
                      handleOpenChange(false);
                    }}
                    className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-surface-elevated"
                    role="option"
                    aria-selected="false"
                  >
                    <div className="min-w-0 flex-1">
                      <Eyebrow className="mb-0.5">{hit.label}</Eyebrow>
                      <div className="truncate font-display text-sm font-semibold text-foreground">
                        {hit.title}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {hit.subtitle}
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
