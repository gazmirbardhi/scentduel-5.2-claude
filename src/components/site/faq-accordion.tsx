"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/types";
import { JsonLd } from "./json-ld";

/**
 * FAQ accordion. Emits both the visible accordion AND a FAQPage JSON-LD
 * block so the same content is machine-readable for rich results / AI.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem
            key={item.question}
            value={`item-${i}`}
            className="border-border"
          >
            <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
