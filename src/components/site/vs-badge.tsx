import { cn } from "@/lib/utils";

/** Circular wine-colored "VS" badge with cream text. */
export function VsBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
        "bg-wine text-wine-foreground shadow-[0_4px_14px_-4px_rgba(122,35,49,0.5)]",
        "ring-4 ring-background",
        className
      )}
      aria-hidden
    >
      <span className="font-display text-lg font-semibold tracking-wider">
        VS
      </span>
      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold/30" />
    </div>
  );
}
