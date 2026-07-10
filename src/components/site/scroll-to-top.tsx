"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" button. Appears after the user scrolls past ~600px,
 * fades out near the top. Fixed bottom-right, above the footer. Hidden on
 * print via the .sd-pop-in class (caught by the print stylesheet).
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className={cn(
        "sd-pop-in fixed bottom-6 right-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-border bg-surface text-foreground/70 shadow-[0_8px_24px_-8px_rgba(36,31,26,0.3)]",
        "transition-colors hover:border-gold hover:text-wine",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
