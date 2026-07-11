"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { Fragrance } from "@/lib/types";
import { noteOverlap } from "@/lib/fragrance-data";
import { valueScore } from "@/lib/content";
import { Eyebrow } from "./eyebrow";

/**
 * Five-axis radar comparing the two duelling fragrances across:
 *   Longevity (0-12h → 0-100), Sillage (1-5 → 0-100), Value (0-100),
 *   Price-inverted (cheaper = bigger, 0-100), Note-overlap (0-100).
 *
 * Each axis is normalised to 0-100 so the two polygons are directly
 * comparable. The overlap axis is shared (same for both) but included so the
 * shape communicates "how similar" at a glance.
 */

interface RadarPoint {
  axis: string;
  a: number;
  b: number;
}

function normalise(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

export function ComparatorRadar({ a, b }: { a: Fragrance; b: Fragrance }) {
  // valueScore is already normalised against the dataset (0-100); longevity
  // and sillage use fixed sensible ranges; price-inverted is normalised
  // against just the two fragrances being compared.
  const overlap = noteOverlap(a, b).similarity;

  const data: RadarPoint[] = [
    {
      axis: "Longevity",
      a: normalise(a.longevityHours, 0, 12),
      b: normalise(b.longevityHours, 0, 12),
    },
    {
      axis: "Sillage",
      a: normalise(a.sillage, 0, 5),
      b: normalise(b.sillage, 0, 5),
    },
    {
      axis: "Value",
      a: valueScore(a),
      b: valueScore(b),
    },
    {
      axis: "Price-inv.",
      // Price inverted: cheaper = higher score. Normalise against the two.
      a: normalise(-a.typicalPriceUSD, -Math.max(a.typicalPriceUSD, b.typicalPriceUSD), 0),
      b: normalise(-b.typicalPriceUSD, -Math.max(a.typicalPriceUSD, b.typicalPriceUSD), 0),
    },
    {
      axis: "Overlap",
      a: overlap,
      b: overlap,
    },
  ];

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <div>
          <Eyebrow>At a glance</Eyebrow>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
            Five-axis comparison
          </h3>
        </div>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Longevity, sillage, value, price-inverted (cheaper = bigger) and the
        two scents&apos; note overlap — each normalised 0-100 so the shapes are
        directly comparable.
      </p>

      <div className="rounded-lg border border-border bg-surface p-4">
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  fontFamily: "var(--font-public-sans)",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                stroke="var(--border)"
                tickCount={3}
              />
              <Radar
                name={a.name}
                dataKey="a"
                stroke="var(--wine)"
                fill="var(--wine)"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Radar
                name={b.name}
                dataKey="b"
                stroke="var(--gold)"
                fill="var(--gold)"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
                formatter={(value: number, name: string) => [`${value}/100`, name]}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  fontFamily: "var(--font-public-sans)",
                  paddingTop: "8px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-[0.7rem] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--wine)" }} />
            {a.name}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--gold)" }} />
            {b.name}
          </span>
        </div>
      </div>
    </div>
  );
}
