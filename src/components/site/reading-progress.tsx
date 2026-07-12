"use client";

import { useEffect, useState } from "react";

/**
 * A thin wine→gold gradient progress bar that sits at the very top of the
 * header (top-0) and fills as the reader scrolls through the target element.
 * Tracks the target element's scroll progress.
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
      className="reading-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-linear-to-r from-wine via-wine to-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
