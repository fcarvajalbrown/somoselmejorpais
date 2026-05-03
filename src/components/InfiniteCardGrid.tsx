"use client";

import { useEffect, useRef, useState } from "react";
import type { RankingCard } from "@/types/ranking";
import { RankingCard as RankingCardComponent } from "./RankingCard";
import { ScrollReveal } from "./ScrollReveal";

const BATCH = 9;

function shuffle(arr: RankingCard[]): RankingCard[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function InfiniteCardGrid({ cards }: { cards: RankingCard[] }) {
  const [deck, setDeck] = useState(cards);
  const [visible, setVisible] = useState(BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setDeck(shuffle(cards)); }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible((v) => Math.min(v + BATCH, deck.length));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [deck.length]);

  const done = visible >= deck.length;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deck.slice(0, visible).map((card, i) => (
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
