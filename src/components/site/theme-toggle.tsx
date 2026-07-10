"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark theme toggle.
 *
 * To avoid a hydration mismatch (theme is only known client-side) we render
 * both icons and toggle visibility with CSS based on the `.dark` class on
 * <html> — no `mounted` state / setState-in-effect needed. The button is
 * still fully functional via the next-themes `setTheme` call.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      {/* Sun: visible only in dark mode (click → go light) */}
      <Sun className="hidden h-4.5 w-4.5 dark:block" />
      {/* Moon: visible only in light mode (click → go dark) */}
      <Moon className="block h-4.5 w-4.5 dark:hidden" />
    </button>
  );
}
