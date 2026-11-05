"use client";

import { useMemo, useState } from "react";
import { rwf } from "@/lib/data";
import { waLink } from "@/lib/time";
import { CakeSVG, type CakeDesign } from "./CakeSVG";
import { useNow } from "./useNow";

const SIZES = [
  { v: 1, label: "1 tier", serves: 10, price: 25000 },
  { v: 2, label: "2 tiers", serves: 25, price: 55000 },
  { v: 3, label: "3 tiers", serves: 45, price: 95000 },
] as const;
const SPONGES = [
  { name: "Vanilla", hex: "#f6d98b", extra: 0 },
  { name: "Chocolate", hex: "#5a2e1c", extra: 0 },
  { name: "Lemon", hex: "#f7e26b", extra: 0 },
  { name: "Red velvet", hex: "#b3263a", extra: 3000 },
  { name: "Carrot", hex: "#d98b3a", extra: 3000 },
];
const FROSTINGS = [
  { name: "Vanilla cream", hex: "#fff6e5" },
  { name: "Strawberry", hex: "#ffb3cf" },
  { name: "Salted caramel", hex: "#c99a6b" },
  { name: "Mocha", hex: "#a67b5b" },
  { name: "Coffee", hex: "#8a5a3c" },
  { name: "Chocolate", hex: "#6b3b26" },
];
const TOPPINGS = [
  { k: "berries", label: "Fresh berries", price: 5000 },
  { k: "sprinkles", label: "Sprinkles", price: 1500 },
  { k: "candles", label: "Candles", price: 1000 },
  { k: "flowers", label: "Sugar flowers", price: 6000 },
] as const;
const DRIPS = [
  { v: "none", label: "No drip", price: 0 },
  { v: "chocolate", label: "Chocolate", price: 4000 },
  { v: "caramel", label: "Caramel", price: 4000 },
] as const;

function isoDate(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kigali" }).format(d); // YYYY-MM-DD
}

export function CakeDesigner() {
  const [d, setD] = useState<CakeDesign>({
    tiers: 2,
    sponge: SPONGES[0].hex,
    frosting: FROSTINGS[0].hex,
    finish: "smooth",
    drip: "chocolate",
    toppings: { berries: true, sprinkles: false, candles: true, flowers: false },
    message: "Happy birthday Aline",
  });
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [tried, setTried] = useState(false);
  const now = useNow(60_000);
  const minDate = now ? isoDate(new Date(now.getTime() + 2 * 86400000)) : undefined;

  const set = <K extends keyof CakeDesign>(k: K, v: CakeDesign[K]) => setD((p) => ({ ...p, [k]: v }));
  const size = SIZES.find((s) => s.v === d.tiers)!;
  const sponge = SPONGES.find((s) => s.hex === d.sponge)!;
  const frosting = FROSTINGS.find((f) => f.hex === d.frosting)!;
  const drip = DRIPS.find((x) => x.v === d.drip)!;

  const total = useMemo(
    () =>
      size.price +
      sponge.extra * d.tiers +
      drip.price +
      TOPPINGS.reduce((s, t) => s + (d.toppings[t.k] ? t.price : 0), 0),
    [size, sponge, drip, d],
  );

  const dateError = tried && (!date || (minDate && date < minDate))
    ? "Pick a date at least two days from today, so we have time to bake it."
    : "";

  function send() {
    setTried(true);
    if (!date || (minDate && date < minDate)) return;
    const tops = TOPPINGS.filter((t) => d.toppings[t.k]).map((t) => t.label).join(", ") || "None";
    const text = [
      `Hi Ifu Bakehouse! I'd like to order a custom cake${name ? ` (name: ${name})` : ""}.`,
      ``,
      `Size: ${size.label} (serves about ${size.serves})`,
      `Sponge: ${sponge.name}`,
      `Frosting: ${frosting.name}, ${d.finish === "naked" ? "naked finish" : "smooth finish"}`,
      `Drip: ${drip.label}`,
      `Toppings: ${tops}`,
      `Message on cake: ${d.message.trim() || "None"}`,
      `Pickup date: ${date}`,
      ``,
      `Estimated price: ${rwf(total)}`,
    ].join("\n");
    window.open(waLink(text), "_blank", "noopener");
  }

  return (
    <section id="cakes" aria-labelledby="cakes-h" className="bg-cocoa text-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 id="cakes-h" className="font-display text-5xl leading-none text-sand sm:text-7xl">Design your cake.</h2>
        <p className="mt-4 max-w-lg text-lg text-paper/80">
          Build it here, see it as you go, then send the design to us on WhatsApp. We confirm the price and you pay a 50% MoMo deposit.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          {/* preview */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="relative aspect-square rounded-[2.5rem] border-3 border-paper bg-sand p-4 shadow-[6px_6px_0_#b9814f]">
              <CakeSVG d={d} />
              <div className="absolute bottom-4 right-4 -rotate-6 rounded-2xl border-3 border-cocoa bg-paper px-3 py-2 text-cocoa shadow-[3px_3px_0_#3a1e14]">
                <p className="text-xs font-semibold">Serves {size.serves}</p>
                <p className="font-display text-xl leading-none tabular-nums" aria-live="polite">{rwf(total)}</p>
              </div>
            </div>
          </div>

          {/* controls: the order is a real sequence, so the steps are numbered */}
          <div className="space-y-8">
            <Step n={1} title="Size">
              <Chips name="size" value={String(d.tiers)} onChange={(v) => set("tiers", Number(v) as 1 | 2 | 3)}
                options={SIZES.map((s) => ({ v: String(s.v), label: s.label, sub: `Serves ${s.serves}` }))} />
            </Step>

            <Step n={2} title="Sponge">
              <Swatches name="sponge" value={d.sponge} onChange={(v) => set("sponge", v)}
                options={SPONGES.map((s) => ({ v: s.hex, label: s.name + (s.extra ? ` (+${rwf(s.extra)} per tier)` : "") }))} />
              <p className="mt-2 text-sm text-paper/70">{sponge.name}{sponge.extra ? `, adds ${rwf(sponge.extra)} per tier` : ""}</p>
            </Step>

            <Step n={3} title="Frosting">
              <Swatches name="frosting" value={d.frosting} onChange={(v) => set("frosting", v)}
                options={FROSTINGS.map((f) => ({ v: f.hex, label: f.name }))} />
              <p className="mt-2 text-sm text-paper/70">{frosting.name}</p>
              <div className="mt-4 flex flex-wrap gap-6">
                <Chips name="finish" value={d.finish} onChange={(v) => set("finish", v as CakeDesign["finish"])}
                  options={[{ v: "smooth", label: "Smooth" }, { v: "naked", label: "Naked", sub: "Sponge shows" }]} />
                <Chips name="drip" value={d.drip} onChange={(v) => set("drip", v as CakeDesign["drip"])}
                  options={DRIPS.map((x) => ({ v: x.v, label: x.label }))} />
              </div>
            </Step>

            <Step n={4} title="Toppings">
              <div className="flex flex-wrap gap-2">
                {TOPPINGS.map((t) => {
                  const on = d.toppings[t.k];
                  return (
                    <button key={t.k} type="button" aria-pressed={on}
                      onClick={() => set("toppings", { ...d.toppings, [t.k]: !on })}
                      className={`rounded-full border-3 px-4 py-2 text-left font-semibold transition-colors
                        ${on ? "border-caramel bg-caramel text-cocoa" : "border-paper/40 hover:border-paper"}`}>
                      {t.label} <span className="font-normal opacity-75">+{rwf(t.price)}</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={5} title="Message and pickup">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Message on the cake" hint={`${d.message.length}/24`}>
                  <input value={d.message} maxLength={24} onChange={(e) => set("message", e.target.value)}
                    className="w-full rounded-xl border-3 border-paper/40 bg-transparent px-3 py-2.5 focus:border-sand outline-none" placeholder="Leave blank for none" />
                </Field>
                <Field label="Your name">
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
                    className="w-full rounded-xl border-3 border-paper/40 bg-transparent px-3 py-2.5 focus:border-sand outline-none" />
                </Field>
                <Field label="Pickup date" error={dateError}>
                  <input type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value)}
                    aria-invalid={!!dateError}
                    className="w-full rounded-xl border-3 border-paper/40 bg-transparent px-3 py-2.5 focus:border-sand outline-none [color-scheme:dark]" />
                </Field>
              </div>
            </Step>

            <div className="flex flex-wrap items-center gap-4 border-t-2 border-dashed border-paper/30 pt-6">
              <div>
                <p className="text-sm text-paper/70">Estimated total</p>
                <p className="font-display text-3xl text-sand tabular-nums">{rwf(total)}</p>
              </div>
              <button onClick={send} className="btn ml-auto bg-sand text-cocoa">
                <WhatsAppIcon /> Send cake order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-3 text-lg font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-paper font-display text-cocoa">{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Chips({ name, value, onChange, options }: {
  name: string; value: string; onChange: (v: string) => void; options: { v: string; label: string; sub?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <label key={o.v} className={`cursor-pointer rounded-2xl border-3 px-4 py-2 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sand has-[:focus-visible]:outline-offset-2
            ${on ? "border-sand bg-sand text-cocoa" : "border-paper/40 hover:border-paper"}`}>
            <input type="radio" name={name} value={o.v} checked={on} onChange={() => onChange(o.v)} className="sr-only" />
            <span className="block font-semibold leading-tight">{o.label}</span>
            {o.sub && <span className="block text-xs opacity-75">{o.sub}</span>}
          </label>
        );
      })}
    </div>
  );
}

function Swatches({ name, value, onChange, options }: {
  name: string; value: string; onChange: (v: string) => void; options: { v: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={name}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <label key={o.v} title={o.label}
            className={`relative size-12 cursor-pointer rounded-full border-3 transition-transform has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sand has-[:focus-visible]:outline-offset-3
              ${on ? "scale-110 border-sand ring-3 ring-sand ring-offset-3 ring-offset-cocoa" : "border-paper/50 hover:scale-105"}`}
            style={{ background: o.v }}>
            <input type="radio" name={name} value={o.v} checked={on} onChange={() => onChange(o.v)} className="sr-only" aria-label={o.label} />
          </label>
        );
      })}
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex text-sm font-semibold">
        {label}
        {hint && <span className="ml-auto font-normal text-paper/60">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm font-semibold text-caramel" role="alert">{error}</span>}
    </label>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 000-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.4-.3z" />
    </svg>
  );
}
