"use client";
import { useEffect, useState } from "react";

/** Returns the current Date after mount (null during prerender), ticking every 30s. */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0);
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => { clearTimeout(first); clearInterval(t); };
  }, [intervalMs]);
  return now;
}
