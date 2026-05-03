"use client";

import { useEffect, useState } from "react";

export function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-cl-red px-8 py-6 text-center shadow-2xl">
        <p className="text-2xl font-bold text-white">
          presiona Caos Cultural para deprimirte de Chile
        </p>
        <p className="mt-1 text-sm text-white/70">este mensaje se autodestruye en 5 segundos</p>
      </div>
    </div>
  );
}
