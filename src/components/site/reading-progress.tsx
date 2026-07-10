"use client";

import { useEffect, useState } from "react";

/**
 * A thin wine→gold gradient progress bar fixed under the header that fills
 * as the reader scrolls through the article. Tracks the <article> element's
 * scroll progress. Hidden until the user scrolls past the top of the article.
 */
export function ReadingProgress({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const onScroll = () => {
      const rect = target.getBoundingClientRect();
      const elTop = rect.top;
      const elHeight = rect.height;
      const viewportH = window.innerHeight;
      // Distance scrolled into the article (negative while above it).
      const scrolled = Math.max(0, -elTop);
      // Total scrollable distance for the article.
      const scrollable = Math.max(1, elHeight - viewportH);
      const pct = Math.min(100, Math.max(0, (scrolled / scrollable) * 100));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div
      className="fixed inset-x-0 top-16 z-30 h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-wine via-wine to-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
