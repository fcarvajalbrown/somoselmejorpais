"use client";

import { useEffect, useRef, useState } from "react";
import type { RankingCard } from "@/types/ranking";
import { RankingCard as RankingCardComponent } from "./RankingCard";
import { ScrollReveal } from "./ScrollReveal";

const BATCH = 9;

export function InfiniteCardGrid({ cards }: { cards: RankingCard[] }) {
  const [visible, setVisible] = useState(BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible((v) => Math.min(v + BATCH, cards.length));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cards.length]);

  const done = visible >= cards.length;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.slice(0, visible).map((card, i) => (
          <ScrollReveal key={card.id} delay={(i % 3) * 80}>
            <RankingCardComponent card={card} />
          </ScrollReveal>
        ))}
      </div>
      <div ref={sentinelRef} className="mt-10 flex justify-center h-12">
        {done ? (
          <p className="text-sm text-text-muted">Ya llegaste al final. Chile sigue siendo el mejor.</p>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-cl-blue border-t-transparent animate-spin" />
        )}
      </div>
    </div>
  );
}
