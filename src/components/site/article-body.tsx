import { cn, slugify } from "@/lib/utils";
import type { BodyBlock } from "@/lib/types";
import { GlossaryText } from "./glossary-text";

/**
 * Renders the typed body-block stream for an article.
 * Heading blocks receive a stable `id` (slug) so the TableOfContents and
 * ReadingProgress can anchor/observe them.
 *
 * When `onNavigate` is supplied, prose blocks (paragraph, callout, quote, list
 * items) auto-link recognised glossary terms to #/glossary with a hover
 * tooltip definition. Headings are left plain for visual cleanliness.
 */
export function ArticleBody({
  blocks,
  headingIdMap,
  onNavigate,
}: {
  blocks: BodyBlock[];
  /** Optional map from heading text → resolved unique id (provided by parent). */
  headingIdMap?: Map<string, string>;
  /** When provided, glossary terms in prose blocks become hover-tooltip links. */
  onNavigate?: (hash: string) => void;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "heading": {
            const id = headingIdMap?.get(block.text) ?? slugify(block.text);
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-24 font-display text-2xl font-semibold leading-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[1.0625rem] leading-relaxed text-foreground/85"
              >
                <GlossaryText text={block.text} onNavigate={onNavigate} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[1.0625rem] leading-relaxed text-foreground/85"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>
                      <GlossaryText text={it} onNavigate={onNavigate} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={i}
                className={cn(
                  "rounded-r-md border-l-4 p-4 pl-5 text-[1rem] leading-relaxed",
                  block.tone === "wine" &&
                    "border-l-wine bg-wine/[0.04] text-foreground/85",
                  block.tone === "gold" &&
                    "border-l-gold bg-surface-elevated text-foreground/85",
                  block.tone === "neutral" &&
                    "border-l-border bg-surface-elevated text-foreground/85"
                )}
              >
                <GlossaryText text={block.text} onNavigate={onNavigate} />
              </aside>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-l-gold pl-4 font-display text-xl italic text-foreground/80"
              >
                <GlossaryText text={block.text} onNavigate={onNavigate} />
                {block.cite && (
                  <footer className="mt-1 text-sm not-italic text-muted-foreground">
                    — {block.cite}
                  </footer>
                )}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
