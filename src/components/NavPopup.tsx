"use client";

import { useEffect, useState } from "react";

const btnBase =
  "rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold text-white transition-all hover:bg-white/25 hover:border-white/60 hover:shadow-md active:scale-95";

export function NavPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav className="flex items-center gap-4">
      <a href="/" className={btnBase}>
        Rankings
      </a>
      <div className="relative">
        <a href="/feed" className={btnBase}>
          Caos Cultural
        </a>
        <div
          className={`absolute top-full right-0 mt-1 z-50 w-72 transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          {/* Arrow points up toward button center */}
          <div className="flex justify-end pr-14">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid #D52B1E",
              }}
            />
          </div>
          <div className="bg-cl-red rounded-xl px-5 py-4 shadow-2xl text-center">
            <p className="text-base font-bold text-white leading-snug">
              presiona para deprimirte de Chile
            </p>
            <p className="mt-1 text-xs text-white/70">se autodestruye en 5 segundos</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
