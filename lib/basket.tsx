"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ALL_ITEMS, type MenuItem } from "./data";

type Line = { item: MenuItem; qty: number };
type Ctx = {
  lines: Line[];
  count: number;
  subtotal: number;
  qtyOf: (id: string) => number;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  lastAdded: { name: string; key: number } | null;
};

const BasketCtx = createContext<Ctx | null>(null);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [qty, setQtyMap] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Ctx["lastAdded"]>(null);

  const setQty = useCallback(
    (id: string, n: number) => {
      if (n > (qty[id] ?? 0)) {
        const item = ALL_ITEMS.find((i) => i.id === id);
        if (item) setLastAdded({ name: item.name, key: Date.now() });
      }
      setQtyMap((prev) => {
        const next = { ...prev };
        if (n <= 0) delete next[id];
        else next[id] = Math.min(n, 50);
        return next;
      });
    },
    [qty],
  );

  const value = useMemo<Ctx>(() => {
    const lines = ALL_ITEMS.filter((i) => qty[i.id]).map((item) => ({ item, qty: qty[item.id] }));
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.item.price, 0),
      qtyOf: (id) => qty[id] ?? 0,
      setQty,
      clear: () => setQtyMap({}),
      open,
      setOpen,
      lastAdded,
    };
  }, [qty, open, lastAdded, setQty]);

  return <BasketCtx.Provider value={value}>{children}</BasketCtx.Provider>;
}

export function useBasket() {
  const c = useContext(BasketCtx);
  if (!c) throw new Error("useBasket must be used inside BasketProvider");
  return c;
}
