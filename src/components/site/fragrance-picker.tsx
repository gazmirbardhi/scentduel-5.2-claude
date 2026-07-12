"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { FRAGRANCES } from "@/lib/fragrance-data";
import type { Fragrance } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Searchable fragrance picker (combobox) grouped by house. */
export function FragrancePicker({
  value,
  onChange,
  excludeId,
  sideLabel,
}: {
  value: string | null;
  onChange: (id: string) => void;
  excludeId?: string;
  sideLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = FRAGRANCES.find((f) => f.id === value) ?? null;

  // Group by house
  const houses = Array.from(new Set(FRAGRANCES.map((f) => f.house))).sort();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 text-left text-sm transition-colors hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            !selected && "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            <span className="rounded-sm bg-wine/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-wine">
              {sideLabel}
            </span>
            {selected ? (
              <span className="font-medium text-foreground">
                {selected.name}
              </span>
            ) : (
              "Pick a fragrance…"
            )}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[280px] max-w-[calc(100vw-2rem)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search name, house, note…" />
          <CommandList className="sd-scroll max-h-72">
            <CommandEmpty>No fragrance found.</CommandEmpty>
            {houses.map((house) => {
              const items = FRAGRANCES.filter(
                (f) => f.house === house && f.id !== excludeId
              );
              if (items.length === 0) return null;
              return (
                <CommandGroup key={house} heading={house}>
                  {items.map((f: Fragrance) => (
                    <CommandItem
                      key={f.id}
                      value={`${f.name} ${f.house} ${f.family} ${f.notes.top.join(" ")} ${f.notes.heart.join(" ")} ${f.notes.base.join(" ")}`}
                      onSelect={() => {
                        onChange(f.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === f.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="flex-1">
                        <span className="font-medium text-foreground">{f.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {f.family} · {f.concentration}
                        </span>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
