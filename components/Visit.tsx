"use client";

import { BAKERY, HOURS } from "@/lib/data";
import { kigaliNow, openStatus, waLink } from "@/lib/time";
import { useNow } from "./useNow";
import { WhatsAppIcon } from "./CakeDesigner";

export function Visit() {
  const now = useNow();
  const today = now ? kigaliNow(now).day : -1;
  const status = now ? openStatus(now) : null;
  // Show the week starting Monday
  const week = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section id="visit" aria-labelledby="visit-h" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 id="visit-h" className="font-display text-5xl leading-none sm:text-6xl">Come by.</h2>
          <p className="mt-4 text-lg">{BAKERY.address}</p>
          <p className="text-cocoa-soft">Across from the petrol station, look for the yellow door.</p>
          {status && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border-3 border-cocoa bg-sand px-4 py-2 font-bold">
              <span className={`size-2.5 rounded-full ${status.open ? "bg-green-600" : "bg-cocoa-soft"}`} />
              {status.open ? "Open now. " : "Closed now. "}{status.label}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink("Hi Ifu Bakehouse!")} target="_blank" rel="noopener" className="btn bg-cocoa text-sand"><WhatsAppIcon /> Message us</a>
            <a href="https://maps.google.com/?q=Kimihurura,Kigali" target="_blank" rel="noopener" className="btn bg-paper">Get directions</a>
          </div>
        </div>

        <table className="w-full self-start text-left">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {week.map((d) => {
              const h = HOURS[d];
              const isToday = d === today;
              return (
                <tr key={h.day} className={`border-b-2 border-dashed border-cocoa/25 ${isToday ? "font-bold" : ""}`}>
                  <th scope="row" className="py-3 font-[inherit]">
                    {h.day}
                    {isToday && <span className="ml-2 rounded-full bg-caramel px-2 py-0.5 text-xs">Today</span>}
                  </th>
                  <td className="py-3 text-right tabular-nums">{h.open} – {h.close}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
