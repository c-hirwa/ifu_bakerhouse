"use client";

import { BAKES } from "@/lib/data";
import { kigaliNow, toMin } from "@/lib/time";
import { useNow } from "./useNow";

function inWords(mins: number) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function BakeSchedule() {
  const now = useNow();
  const minutes = now ? kigaliNow(now).minutes : null;
  const nextIdx = minutes === null ? -1 : BAKES.findIndex((b) => toMin(b.time) > minutes);

  let headline = "Today's bakes";
  if (minutes !== null) {
    if (nextIdx === -1) headline = "Every batch is out for today. Come early tomorrow for the first loaves.";
    else headline = `Next out of the oven in ${inWords(toMin(BAKES[nextIdx].time) - minutes)}: ${BAKES[nextIdx].what.toLowerCase()}.`;
  }

  return (
    <section aria-labelledby="bakes-h" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 id="bakes-h" className="max-w-2xl text-xl font-bold sm:text-2xl" aria-live="polite">{headline}</h2>
      <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-0">
        {BAKES.map((b, i) => {
          const state = minutes === null ? "later" : toMin(b.time) <= minutes ? "out" : i === nextIdx ? "next" : "later";
          return (
            <li key={b.time} className="relative flex items-center gap-3 sm:block">
              {/* connector line between stops (desktop) */}
              {i < BAKES.length - 1 && (
                <span className={`absolute top-4 left-8 hidden h-[3px] w-full sm:block ${state === "out" ? "bg-cocoa" : "bg-cocoa/20"}`} aria-hidden="true" />
              )}
              <span
                className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-3 border-cocoa text-xs font-bold
                  ${state === "out" ? "bg-cocoa text-sand" : state === "next" ? "bg-caramel" : "bg-paper"}`}
                aria-hidden="true"
              >
                {state === "out" ? "✓" : ""}
              </span>
              <div className="sm:mt-3 sm:pr-4">
                <p className="font-display text-2xl leading-none">{b.time}</p>
                <p className={`mt-1 text-sm ${state === "later" ? "text-cocoa-soft" : "font-semibold"}`}>
                  {b.what}
                  <span className="sr-only">{state === "out" ? " (out now)" : state === "next" ? " (next)" : ""}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
