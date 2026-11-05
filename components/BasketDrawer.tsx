"use client";

import { useEffect, useRef, useState } from "react";
import { DELIVERY_AREAS, rwf } from "@/lib/data";
import { useBasket } from "@/lib/basket";
import { waLink } from "@/lib/time";
import { Art } from "./Art";
import { Stepper } from "./Menu";
import { WhatsAppIcon } from "./CakeDesigner";

export function BasketDrawer() {
  const { lines, subtotal, setQty, open, setOpen, clear } = useBasket();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [area, setArea] = useState(DELIVERY_AREAS[0].id);
  const [name, setName] = useState("");
  const [when, setWhen] = useState("As soon as it's ready");
  const panel = useRef<HTMLDivElement>(null);
  const fee = mode === "delivery" ? DELIVERY_AREAS.find((a) => a.id === area)!.fee : 0;
  const total = subtotal + fee;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, setOpen]);

  function send() {
    const areaLabel = DELIVERY_AREAS.find((a) => a.id === area)!.label;
    const text = [
      `Hi Ifu Bakehouse! New order${name ? ` from ${name}` : ""}:`,
      ``,
      ...lines.map((l) => `${l.qty} × ${l.item.name} — ${rwf(l.qty * l.item.price)}`),
      ``,
      mode === "delivery" ? `Delivery to ${areaLabel} (${rwf(fee)})` : `Pickup at the bakery`,
      `When: ${when}`,
      `Total: ${rwf(total)}`,
    ].join("\n");
    window.open(waLink(text), "_blank", "noopener");
  }

  return (
    <div className={`fixed inset-0 z-50 transition-[visibility] ${open ? "visible" : "invisible pointer-events-none delay-300"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-cocoa/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Your basket"
        className={`absolute bottom-0 right-0 flex max-h-[90dvh] w-full flex-col rounded-t-[2rem] border-3 border-cocoa bg-paper outline-none transition-transform duration-300 ease-out
          sm:top-0 sm:max-h-none sm:max-w-md sm:rounded-none sm:rounded-l-[2rem]
          ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}>
        <div className="flex items-center border-b-3 border-cocoa bg-butter px-5 py-4 rounded-t-[1.8rem] sm:rounded-tr-none">
          <h2 className="font-display text-3xl">Your basket</h2>
          <button onClick={() => setOpen(false)} className="ml-auto grid size-10 place-items-center rounded-full border-3 border-cocoa bg-paper text-xl font-bold" aria-label="Close basket">×</button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <Art name="croissant" className="mx-auto size-28 opacity-80" />
              <p className="mt-4 font-semibold">Nothing in here yet.</p>
              <p className="text-cocoa-soft">Add a few things from the menu and they&apos;ll show up here.</p>
              <a href="#menu" onClick={() => setOpen(false)} className="btn mt-6 bg-butter">Browse the menu</a>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.item.id} className="flex items-center gap-3 border-b-2 border-dashed border-cocoa/25 py-3">
                  <Art name={l.item.art} className="size-11 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{l.item.name}</p>
                    <p className="text-sm text-cocoa-soft tabular-nums">{rwf(l.item.price * l.qty)}</p>
                  </div>
                  <Stepper value={l.qty} onChange={(n) => setQty(l.item.id, n)} label={l.item.name} />
                </li>
              ))}
              <li className="py-3 text-right">
                <button onClick={clear} className="text-sm font-semibold underline underline-offset-4">Empty basket</button>
              </li>
            </ul>

            <div className="space-y-4 border-t-3 border-cocoa bg-butter-soft px-5 py-5">
              <div className="grid grid-cols-2 gap-2 rounded-full border-3 border-cocoa bg-paper p-1" role="radiogroup" aria-label="Pickup or delivery">
                {(["pickup", "delivery"] as const).map((m) => (
                  <button key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)}
                    className={`rounded-full py-2 font-bold capitalize transition-colors ${mode === m ? "bg-cocoa text-butter" : ""}`}>
                    {m}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mode === "delivery" && (
                  <label className="col-span-2 block text-sm font-semibold">
                    Deliver to
                    <select value={area} onChange={(e) => setArea(e.target.value)} className="mt-1 w-full rounded-xl border-3 border-cocoa bg-paper px-3 py-2">
                      {DELIVERY_AREAS.map((a) => <option key={a.id} value={a.id}>{a.label} (+{rwf(a.fee)})</option>)}
                    </select>
                  </label>
                )}
                <label className="col-span-2 block text-sm font-semibold sm:col-span-1">
                  Your name
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-1 w-full rounded-xl border-3 border-cocoa bg-paper px-3 py-2" />
                </label>
                <label className="col-span-2 block text-sm font-semibold sm:col-span-1">
                  When
                  <select value={when} onChange={(e) => setWhen(e.target.value)} className="mt-1 w-full rounded-xl border-3 border-cocoa bg-paper px-3 py-2">
                    {["As soon as it's ready", "In about 1 hour", "This afternoon", "Tomorrow morning"].map((w) => <option key={w}>{w}</option>)}
                  </select>
                </label>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-sm">
                  <p>Subtotal {rwf(subtotal)}</p>
                  {fee > 0 && <p>Delivery {rwf(fee)}</p>}
                </div>
                <p className="font-display text-3xl tabular-nums">{rwf(total)}</p>
              </div>
              <button onClick={send} className="btn w-full bg-cocoa text-butter"><WhatsAppIcon /> Send order on WhatsApp</button>
              <p className="text-center text-xs text-cocoa-soft">Pay with MoMo or cash when you collect.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
