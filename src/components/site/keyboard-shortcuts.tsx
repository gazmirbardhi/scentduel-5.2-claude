"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface Shortcut {
  keys: string[];
  label: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ["Ctrl", "K"], label: "Open search" },
  { keys: ["?"], label: "Show this shortcuts panel" },
  { keys: ["Esc"], label: "Close dialog / panel" },
  { keys: ["G", "H"], label: "Go home" },
  { keys: ["G", "C"], label: "Go to Comparisons" },
  { keys: ["G", "L"], label: "Go to Layering" },
  { keys: ["G", "G"], label: "Go to Guides" },
  { keys: ["G", "D"], label: "Open the Duel Comparator" },
];

/** Keyboard-shortcuts overlay, opened with the `?` key. */
export function KeyboardShortcuts({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onNavigate: (hash: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Keyboard className="h-4 w-4 text-gold" />
            Keyboard shortcuts
          </DialogTitle>
        </DialogHeader>
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between gap-4 py-2.5 text-sm"
            >
              <span className="text-foreground/80">{s.label}</span>
              <span className="flex shrink-0 items-center gap-1">
                {s.keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && (
                      <span className="text-xs text-muted-foreground">then</span>
                    )}
                    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-surface-elevated px-1.5 font-sans text-xs font-semibold text-foreground">
                      {k}
                    </kbd>
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="pt-2 text-xs text-muted-foreground">
          The <kbd className="rounded border border-border bg-surface-elevated px-1 text-[0.6rem] font-semibold">G</kbd>{" "}
          shortcuts are sequence keys — press G, then the second key.
        </p>
        <button
          onClick={() => onNavigate("#/")}
          className="sr-only"
          aria-hidden
          tabIndex={-1}
        />
      </DialogContent>
    </Dialog>
  );
}
