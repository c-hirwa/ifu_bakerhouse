"use client";

import { useEffect, useState } from "react";
import { useBasket } from "@/lib/basket";

export function Toast() {
  const { lastAdded, setOpen, open } = useBasket();
  const [hiddenKey, setHiddenKey] = useState<number | null>(null);
  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setHiddenKey(lastAdded.key), 2600);
    return () => clearTimeout(t);
  }, [lastAdded]);
  const show = !!lastAdded && hiddenKey !== lastAdded.key;

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      {show && !open && lastAdded && (
        <div key={lastAdded.key} className="drop-in pointer-events-auto flex items-center gap-4 rounded-full border-3 border-cocoa bg-paper py-2 pl-5 pr-2 shadow-[4px_4px_0_#3a1e14]">
          <p className="text-sm font-semibold">Added {lastAdded.name}</p>
          <button onClick={() => setOpen(true)} className="rounded-full bg-cocoa px-4 py-2 text-sm font-bold text-sand">View basket</button>
        </div>
      )}
    </div>
  );
}
