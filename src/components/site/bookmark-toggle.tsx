"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { useToast } from "@/hooks/use-toast";
import { Bookmark, Check } from "lucide-react";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Bookmark toggle button for an article. Persists to localStorage via the
 * useBookmarks hook. Shows a toast on toggle and swaps icon/state.
 */
export function BookmarkToggle({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const { isSaved, toggle } = useBookmarks();
  const { toast } = useToast();
  const saved = isSaved(article.slug);

  const handleToggle = () => {
    toggle({
      slug: article.slug,
      title: article.title,
      label: article.label,
      category: article.category,
    });
    toast({
      title: saved ? "Removed from saved" : "Saved",
      description: saved
        ? `"${article.title}" removed from your saved duels.`
        : `"${article.title}" saved to your duels.`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved duels" : "Save this duel"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        saved
          ? "border-gold bg-gold/10 text-gold"
          : "border-border bg-surface text-foreground/70 hover:border-gold/60 hover:text-wine",
        className
      )}
    >
      {saved ? (
        <>
          <Check className="h-3.5 w-3.5" /> Saved
        </>
      ) : (
        <>
          <Bookmark className="h-3.5 w-3.5" /> Save
        </>
      )}
    </button>
  );
}
