import { cn } from "@/lib/utils";
import type { MetricRow } from "@/lib/types";

/**
 * Spec / comparison table. Header columns are the two duel sides (or
 * "Alone vs Layered" labels); each row is a metric.
 */
export function MetricsTable({
  rows,
  sideLabels,
  className,
}: {
  rows: MetricRow[];
  sideLabels: [string, string] | string[];
  className?: string;
}) {
  const [a, b] = sideLabels;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-surface",
        className
      )}
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-surface-elevated">
            <th className="w-2/5 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Metric
            </th>
            <th className="px-4 py-3 font-display text-base font-semibold text-foreground">
              {a}
            </th>
            <th className="px-4 py-3 font-display text-base font-semibold text-foreground">
              {b}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn(
                "align-top",
                i !== rows.length - 1 && "border-b border-border"
              )}
            >
              <td className="px-4 py-3 text-muted-foreground">{row.label}</td>
              <td className="px-4 py-3 font-medium text-foreground">
                {row.values[0]}
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {row.values[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.some((r) => r.note) && (
        <ul className="space-y-1 border-t border-border bg-surface-elevated/50 px-4 py-3 text-xs text-muted-foreground">
          {rows
            .filter((r) => r.note)
            .map((r) => (
              <li key={r.label} className="flex gap-2">
                <span className="text-gold">·</span>
                <span>
                  <span className="font-medium text-foreground/70">{r.label}:</span>{" "}
                  {r.note}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
