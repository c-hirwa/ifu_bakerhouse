"use client";

import { useBasket } from "@/lib/basket";
import { openStatus } from "@/lib/time";
import { useNow } from "./useNow";

export function Header() {
  const { count, setOpen } = useBasket();
  const now = useNow();
  const status = now ? openStatus(now) : null;

  return (
    <header className="sticky top-0 z-30 border-b-3 border-cocoa bg-sand">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-baseline gap-1.5" aria-label="Ifu Bakehouse home">
          <span className="font-display text-3xl leading-none">ifu</span>
          <span className="text-sm font-semibold">bakehouse</span>
        </a>
        {status && (
          <span className="hidden items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-semibold sm:inline-flex border-2 border-cocoa">
            <span className={`size-2 rounded-full ${status.open ? "bg-green-600" : "bg-cocoa-soft"}`} />
            {status.label}
          </span>
        )}
        <nav className="ml-auto hidden items-center gap-6 font-semibold md:flex">
          <a href="#menu" className="hover:underline underline-offset-4 decoration-2">Menu</a>
          <a href="#cakes" className="hover:underline underline-offset-4 decoration-2">Custom cakes</a>
          <a href="#visit" className="hover:underline underline-offset-4 decoration-2">Visit</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="btn ml-auto bg-paper py-2! px-4! text-sm md:ml-0"
          aria-label={`Open basket, ${count} items`}
        >
          <BasketIcon />
          <span>Basket</span>
          <span key={count} className={`grid min-w-6 place-items-center rounded-full bg-cocoa px-1.5 text-xs text-sand ${count ? "bump" : ""}`}>
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}

function BasketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9h18l-2 11H5z" /><path d="M8 9l4-6 4 6" /><path d="M9 13v3M15 13v3" />
    </svg>
  );
}
