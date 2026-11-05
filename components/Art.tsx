import type { Illustration } from "@/lib/data";

// Original flat illustrations. One outline weight everywhere so they read as a set.
const S = { stroke: "#3a1e14", strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function Art({ name, className = "" }: { name: Illustration; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {ART[name]}
    </svg>
  );
}

const ART: Record<Illustration, React.ReactNode> = {
  sourdough: (
    <g {...S}>
      <ellipse cx="50" cy="60" rx="38" ry="26" fill="#d9893b" />
      <path d="M30 52c6-6 14-8 20-8M44 46c6-4 14-4 20 0M56 52c6-2 12 0 16 4" fill="none" stroke="#fff3c2" />
      <path d="M14 66c10 10 62 10 72 0" fill="none" />
    </g>
  ),
  brioche: (
    <g {...S}>
      <rect x="16" y="50" width="68" height="32" rx="6" fill="#c46f22" />
      <circle cx="32" cy="46" r="15" fill="#e09a45" />
      <circle cx="50" cy="42" r="16" fill="#e09a45" />
      <circle cx="68" cy="46" r="15" fill="#e09a45" />
      <path d="M44 36c3-2 7-2 10 0M26 40c3-2 6-2 9 0M62 40c3-2 6-2 9 0" fill="none" stroke="#fff3c2" />
    </g>
  ),
  sandwich: (
    <g {...S}>
      <path d="M22 84V44c0-16 12-24 28-24s28 8 28 24v40z" fill="#a8652e" />
      <path d="M30 80V46c0-10 8-16 20-16s20 6 20 16v34z" fill="#fff3c2" />
      <circle cx="42" cy="52" r="1.5" fill="#3a1e14" />
      <circle cx="56" cy="62" r="1.5" fill="#3a1e14" />
      <circle cx="46" cy="70" r="1.5" fill="#3a1e14" />
    </g>
  ),
  baguette: (
    <g {...S}>
      <rect x="8" y="40" width="84" height="22" rx="11" fill="#d9893b" transform="rotate(-18 50 51)" />
      <path d="M26 58l8-10M42 52l8-10M58 46l8-10" fill="none" stroke="#fff3c2" />
    </g>
  ),
  croissant: (
    <g {...S}>
      <path d="M10 66c4-18 18-30 40-30s36 12 40 30c-6 6-14 4-18-2-6 8-16 10-22 10s-16-2-22-10c-4 6-12 8-18 2z" fill="#e8a24c" />
      <path d="M38 40c-2 10 0 22 4 32M62 40c2 10 0 22-4 32" fill="none" />
    </g>
  ),
  cinnamon: (
    <g {...S}>
      <circle cx="50" cy="54" r="34" fill="#d08a4a" />
      <path d="M50 54c0-4 6-4 6 0 0 8-12 8-12 0 0-12 18-12 18 0 0 16-24 16-24 0 0-20 30-20 30 0" fill="none" stroke="#7a3f1c" />
      <path d="M24 38c8-6 16 2 24-4s18 4 26-2" fill="none" stroke="#fffdf7" strokeWidth="5" />
    </g>
  ),
  mandazi: (
    <g {...S}>
      <path d="M14 76L34 40l20 36z" fill="#e8a24c" />
      <path d="M46 76l20-36 20 36z" fill="#d9893b" />
      <path d="M30 60l18-32 18 32z" fill="#f0b865" />
    </g>
  ),
  banana: (
    <g {...S}>
      <rect x="16" y="44" width="68" height="38" rx="8" fill="#a8652e" />
      <path d="M22 46c8 8 48 8 56 0" fill="none" stroke="#7a3f1c" />
      <path d="M26 40c10 8 38 8 48-2-2 10-14 16-24 16s-22-6-24-14z" fill="#ffd84d" />
      <path d="M74 38l4-4" fill="none" />
      <circle cx="34" cy="66" r="2" fill="#3a1e14" />
      <circle cx="62" cy="70" r="2" fill="#3a1e14" />
    </g>
  ),
  muffin: (
    <g {...S}>
      <path d="M26 56h48l-6 30H32z" fill="#ff9ec4" />
      <path d="M38 58l2 26M50 58v26M62 58l-2 26" fill="none" />
      <path d="M20 58c0-20 14-30 30-30s30 10 30 30z" fill="#e8a24c" />
      <circle cx="50" cy="40" r="7" fill="#ffd84d" />
    </g>
  ),
  cookie: (
    <g {...S}>
      <circle cx="50" cy="52" r="34" fill="#e0a35a" />
      <circle cx="38" cy="42" r="4" fill="#3a1e14" />
      <circle cx="60" cy="38" r="3.5" fill="#3a1e14" />
      <circle cx="62" cy="62" r="4" fill="#3a1e14" />
      <circle cx="40" cy="64" r="3" fill="#3a1e14" />
      <circle cx="52" cy="52" r="2.5" fill="#3a1e14" />
    </g>
  ),
  coffee: (
    <g {...S}>
      <path d="M22 40h48l-6 42H28z" fill="#fffdf7" />
      <path d="M70 48h6a8 8 0 010 16h-8" fill="none" />
      <ellipse cx="46" cy="42" rx="22" ry="4" fill="#6b4636" />
      <path d="M38 30c-4-6 4-8 0-14M52 30c-4-6 4-8 0-14" fill="none" />
    </g>
  ),
  tea: (
    <g {...S}>
      <path d="M18 46h56c0 22-12 34-28 34S18 68 18 46z" fill="#9ed8a6" />
      <path d="M74 52h4a7 7 0 010 14h-8" fill="none" />
      <ellipse cx="46" cy="46" rx="28" ry="5" fill="#d9a877" />
      <path d="M40 34c-4-6 4-8 0-14" fill="none" />
    </g>
  ),
  juice: (
    <g {...S}>
      <path d="M30 26h40l-6 58H36z" fill="#ffd84d" />
      <path d="M30 26h40l-2 14H32z" fill="#fffdf7" />
      <path d="M56 26l10-14" fill="none" />
      <circle cx="44" cy="60" r="2" fill="#3a1e14" />
      <circle cx="54" cy="70" r="2" fill="#3a1e14" />
    </g>
  ),
  slice: (
    <g {...S}>
      <path d="M14 70l66-34v40H14z" fill="#e8a24c" />
      <path d="M14 58l66-34v12L14 70z" fill="#fffdf7" />
      <path d="M14 76h66" fill="none" />
      <path d="M14 82h66v-6H14z" fill="#fffdf7" />
      <circle cx="60" cy="26" r="5" fill="#d9893b" />
    </g>
  ),
  chocoslice: (
    <g {...S}>
      <path d="M14 70l66-34v46H14z" fill="#6b4636" />
      <path d="M14 58l66-34v12L14 70z" fill="#3a1e14" />
      <path d="M30 76h50M46 66h34" fill="none" stroke="#fff3c2" />
      <circle cx="66" cy="22" r="5" fill="#ff9ec4" />
    </g>
  ),
};
