import { cn } from "@/lib/utils";

/** Small gold letter-spaced label, e.g. "LAYERING DUEL" or "COMPARISON". */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("eyebrow inline-block", className)}>{children}</span>;
}
