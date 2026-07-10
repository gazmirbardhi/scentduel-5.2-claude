"use client";

import { useEffect, useState } from "react";
import type { BodyBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Sticky table of contents for articles. Generated from the article's
 * `heading` body blocks. Uses an IntersectionObserver to highlight the
 * section currently in view (scroll-spy). Hidden on small screens.
 */
export function TableOfContents({
  headings,
  contentRef,
}: {
  headings: { id: string; text: string }[];
  contentRef: React.RefObject<HTMLElement | null>;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null
  );

  useEffect(() => {
    if (headings.length === 0) return;
    const root = contentRef.current;
    if (!root) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that's currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a heading is in the top ~25% of the viewport.
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings, contentRef]);

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block"
    >
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
        On this page
      </div>
      <ul className="mt-3 space-y-1.5 border-l border-border">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    // Offset for the sticky header (64px) + a little breathing room.
                    const y =
                      el.getBoundingClientRect().top +
                      window.scrollY -
                      80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    setActiveId(h.id);
                  }
                }}
                className={cn(
                  "-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm leading-snug transition-colors",
                  active
                    ? "border-l-wine font-medium text-wine"
                    : "text-muted-foreground hover:border-l-gold/50 hover:text-foreground"
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
