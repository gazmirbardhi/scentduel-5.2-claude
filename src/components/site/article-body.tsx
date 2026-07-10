import { cn } from "@/lib/utils";
import type { BodyBlock } from "@/lib/types";

/** Renders the typed body-block stream for an article. */
export function ArticleBody({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2
                key={i}
                className="font-display text-2xl font-semibold leading-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[1.0625rem] leading-relaxed text-foreground/85"
              >
                {block.text}
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
                    <span>{it}</span>
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
                {block.text}
              </aside>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-l-gold pl-4 font-display text-xl italic text-foreground/80"
              >
                “{block.text}”
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
