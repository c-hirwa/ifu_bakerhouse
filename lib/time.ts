import { BAKERY, HOURS } from "./data";

/** Current Kigali day/minutes, whatever the visitor's own timezone is. */
export function kigaliNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BAKERY.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function openStatus(d = new Date()) {
  const { day, minutes } = kigaliNow(d);
  const h = HOURS[day];
  const open = minutes >= toMin(h.open) && minutes < toMin(h.close);
  if (open) return { open, label: `Open until ${h.close}` };
  const next = minutes < toMin(h.open) ? h : HOURS[(day + 1) % 7];
  const when = minutes < toMin(h.open) ? "today" : next.day === HOURS[(day + 1) % 7].day ? "tomorrow" : next.day;
  return { open, label: `Opens ${when} at ${next.open}` };
}

export function waLink(text: string) {
  return `https://wa.me/${BAKERY.whatsapp}?text=${encodeURIComponent(text)}`;
}
