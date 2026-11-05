"use client";

import { useState } from "react";
import { MENU, rwf } from "@/lib/data";
import { useBasket } from "@/lib/basket";
import { Art } from "./Art";

export function Menu() {
  const [tab, setTab] = useState(MENU[0].id);
  const { qtyOf, setQty } = useBasket();
  const cat = MENU.find((c) => c.id === tab)!;

  return (
    <section id="menu" aria-labelledby="menu-h" className="border-y-3 border-cocoa bg-pistachio/35">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="menu-h" className="font-display text-5xl leading-none sm:text-6xl">The menu</h2>
          <p className="max-w-xs text-cocoa-soft">Add what you want, then send the order to us on WhatsApp. Pay with MoMo or cash at pickup.</p>
        </div>

        <div role="tablist" aria-label="Menu sections" className="mt-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {MENU.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={tab === c.id}
              aria-controls="menu-panel"
              onClick={() => setTab(c.id)}
              className={`shrink-0 rounded-full border-3 border-cocoa px-4 py-2 font-semibold transition-colors
                ${tab === c.id ? "bg-cocoa text-butter" : "bg-paper hover:bg-butter-soft"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ul id="menu-panel" role="tabpanel" key={tab} className="mt-6 grid gap-x-10 md:grid-cols-2">
          {cat.items.map((item) => {
            const q = qtyOf(item.id);
            return (
              <li key={item.id} className="flex items-center gap-4 border-b-2 border-dashed border-cocoa/30 py-4">
                <div className="grid size-18 shrink-0 place-items-center rounded-full bg-paper border-3 border-cocoa">
                  <Art name={item.art} className="size-14" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <span className="ml-auto shrink-0 font-bold tabular-nums">{rwf(item.price)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <p className="text-sm text-cocoa-soft">{item.note}</p>
                    <div className="ml-auto shrink-0">
                      {q === 0 ? (
                        <button
                          onClick={() => setQty(item.id, 1)}
                          className="rounded-full border-2 border-cocoa bg-butter px-3 py-1 text-sm font-bold hover:bg-icing transition-colors"
                          aria-label={`Add ${item.name}`}
                        >
                          Add
                        </button>
                      ) : (
                        <Stepper value={q} onChange={(n) => setQty(item.id, n)} label={item.name} />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Stepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="flex items-center rounded-full border-2 border-cocoa bg-paper text-sm font-bold">
      <button onClick={() => onChange(value - 1)} className="grid size-7 place-items-center rounded-full hover:bg-butter-soft" aria-label={`One less ${label}`}>−</button>
      <span className="w-6 text-center tabular-nums" aria-live="polite">{value}</span>
      <button onClick={() => onChange(value + 1)} className="grid size-7 place-items-center rounded-full hover:bg-butter-soft" aria-label={`One more ${label}`}>+</button>
    </div>
  );
}
