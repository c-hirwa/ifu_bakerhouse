# Ifu Bakehouse — concept bakery site

A portfolio demo for a made-up Kigali bakery. No backend: orders and custom cakes are sent as pre-filled WhatsApp messages.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Fonts are self-hosted via Fontsource (Bagel Fat One + Figtree).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Reusing it for a real client

Almost everything lives in `lib/data.ts`:

- `BAKERY` — name, WhatsApp number (country code, no `+`), address
- `MENU` — categories, items and prices (RWF)
- `BAKES` — today's bake schedule
- `HOURS` — opening hours (open/closed status is calculated in Kigali time)
- `DELIVERY_AREAS` — neighbourhoods and delivery fees

Cake sizes, sponges, frostings and topping prices are at the top of `components/CakeDesigner.tsx`.
Illustrations are hand-drawn SVGs in `components/Art.tsx`. Swap them for real product photos when you have them.

## What's in it

- Live "next batch out of the oven" countdown
- Menu with tabs and a basket (pickup or delivery, delivery fee per area)
- Custom cake designer with a live preview and price
- Opening hours with today highlighted and open/closed status
- Fully responsive, keyboard accessible, respects reduced-motion
