export type CakeDesign = {
  tiers: 1 | 2 | 3;
  sponge: string; // hex
  frosting: string; // hex
  finish: "smooth" | "naked";
  drip: "none" | "chocolate" | "caramel";
  toppings: { berries: boolean; sprinkles: boolean; candles: boolean; flowers: boolean };
  message: string;
};

const TIERS = [
  { w: 300, h: 100 },
  { w: 220, h: 86 },
  { w: 150, h: 74 },
];
const BASE_Y = 344;
const INK = "#3a1e14";

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (amt < 0 ? c * amt : (255 - c) * amt))));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 140;
}
// deterministic pseudo-random so sprinkles don't jump around on every render
function rand(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

const DRIP = { chocolate: "#4a2414", caramel: "#c9802f" };
const SPRINKLE = ["#ff9ec4", "#ffd84d", "#9ed8a6", "#7cc4f0", "#fffdf7"];

export function CakeSVG({ d }: { d: CakeDesign }) {
  const tiers = TIERS.slice(0, d.tiers).map((t, i, arr) => {
    const below = arr.slice(0, i).reduce((s, x) => s + x.h, 0);
    return { ...t, x: 200 - t.w / 2, y: BASE_Y - below - t.h, i };
  });
  const top = tiers[tiers.length - 1];
  const bottom = tiers[0];
  const body = d.finish === "naked" ? d.sponge : d.frosting;
  const pipe = shade(d.frosting, isDark(d.frosting) ? 0.25 : -0.18);
  const msg = d.message.trim();
  const msgSize = Math.min(20, (bottom.w - 70) / Math.max(1, msg.length * 0.56));
  const plaqueW = Math.min(bottom.w - 30, msg.length * msgSize * 0.56 + 36);

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={describe(d)}>
      {/* stand */}
      <path d={`M150 ${BASE_Y + 14} h100 l14 36 h-128z`} fill="#fffdf7" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="200" cy={BASE_Y + 8} rx="176" ry="14" fill="#fffdf7" stroke={INK} strokeWidth="3" />

      {tiers.map((t) => (
        <g key={`tier-${t.i}`} className="tier-in" style={{ animationDelay: `${t.i * 0.05}s` }}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="16" fill={body} className="cake-fill" stroke={INK} strokeWidth="3" />
          {d.finish === "naked" ? (
            // filling layers peeking through
            [0.3, 0.62].map((p) => (
              <rect key={p} x={t.x + 2} y={t.y + t.h * p} width={t.w - 4} height="9" fill={d.frosting} className="cake-fill" />
            ))
          ) : (
            <rect x={t.x + 14} y={t.y + 10} width="10" height={t.h - 30} rx="5" fill="#fff" opacity=".35" />
          )}
          {/* top frosting band */}
          <rect x={t.x} y={t.y} width={t.w} height="14" rx="7" fill={d.frosting} className="cake-fill" stroke={INK} strokeWidth="3" />
          {d.drip !== "none" && (
            <g fill={DRIP[d.drip]} className="cake-fill">
              <rect x={t.x + 1.5} y={t.y + 1.5} width={t.w - 3} height="15" rx="7" />
              {Array.from({ length: Math.floor(t.w / 26) }, (_, k) => {
                const len = 12 + rand(k + t.i * 7) * (t.h * 0.45);
                return <rect key={k} x={t.x + 14 + k * 26} y={t.y + 8} width="13" height={len} rx="6.5" />;
              })}
            </g>
          )}
          {/* bead piping along the base */}
          {Array.from({ length: Math.floor(t.w / 16) }, (_, k) => (
            <circle key={k} cx={t.x + 10 + k * 16} cy={t.y + t.h - 2} r="7" fill={pipe} stroke={INK} strokeWidth="2" className="cake-fill" />
          ))}
          {d.toppings.sprinkles &&
            Array.from({ length: Math.floor(t.w / 14) }, (_, k) => {
              const sx = t.x + 16 + rand(k * 3 + t.i) * (t.w - 32);
              const sy = t.y + 24 + rand(k * 5 + t.i * 11) * (t.h - 44);
              
              return (
                <rect key={k} x={sx} y={sy} width="9" height="3.5" rx="1.75" fill={SPRINKLE[k % SPRINKLE.length]}
                  transform={`rotate(${rand(k + 40) * 180} ${sx + 4.5} ${sy + 1.75})`} />
              );
            })}
          {d.toppings.flowers && (
            <>
              <Flower cx={t.x + 18} cy={t.y + 6} />
              <Flower cx={t.x + t.w - 18} cy={t.y + 6} color="#fffdf7" />
            </>
          )}
        </g>
      ))}

      {msg && (
        // a sugar plaque keeps the message readable on any frosting or drip
        <g>
          <rect x={200 - plaqueW / 2} y={bottom.y + bottom.h * 0.42} width={plaqueW} height="36" rx="18"
            fill="#fffdf7" stroke={INK} strokeWidth="3" />
          <text x="200" y={bottom.y + bottom.h * 0.42 + 19} textAnchor="middle" dominantBaseline="middle"
            fontFamily="Bagel Fat One, system-ui" fontSize={msgSize} fill={INK}>
            {msg}
          </text>
        </g>
      )}

      {d.toppings.berries && (
        <g stroke={INK} strokeWidth="2.5">
          {[-48, -24, 0, 24, 48].map((dx, k) => (
            <circle key={dx} cx={200 + dx} cy={top.y - 6} r={k % 2 ? 9 : 11} fill={k % 2 ? "#4253a8" : "#d6304f"} />
          ))}
          <path d={`M${200 - 2} ${top.y - 16} q2 -6 6 -6`} fill="none" stroke="#2f7a3d" />
        </g>
      )}
      {d.toppings.candles &&
        [-36, 0, 36].map((dx) => (
          <g key={dx}>
            <rect x={200 + dx - 5} y={top.y - 46} width="10" height="40" rx="3" fill="#fffdf7" stroke={INK} strokeWidth="2.5" />
            <path d={`M${200 + dx - 5} ${top.y - 34} l10 -6 M${200 + dx - 5} ${top.y - 20} l10 -6`} stroke="#ff9ec4" strokeWidth="3" />
            <path className="flame" d={`M${200 + dx} ${top.y - 64} c7 8 7 14 0 16 c-7 -2 -7 -8 0 -16z`} fill="#ffb627" stroke={INK} strokeWidth="2" />
          </g>
        ))}
    </svg>
  );
}

function Flower({ cx, cy, color = "#ff9ec4" }: { cx: number; cy: number; color?: string }) {
  return (
    <g stroke={INK} strokeWidth="2">
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={cx + 8 * Math.cos((a * Math.PI) / 180)} cy={cy + 8 * Math.sin((a * Math.PI) / 180)} r="6" fill={color} />
      ))}
      <circle cx={cx} cy={cy} r="4.5" fill="#ffd84d" />
    </g>
  );
}

function describe(d: CakeDesign) {
  const t = Object.entries(d.toppings).filter(([, v]) => v).map(([k]) => k);
  return `Preview: ${d.tiers}-tier ${d.finish} cake${d.drip !== "none" ? ` with ${d.drip} drip` : ""}${t.length ? `, topped with ${t.join(", ")}` : ""}${d.message ? `, reading "${d.message}"` : ""}.`;
}
