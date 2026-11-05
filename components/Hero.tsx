import { Art } from "./Art";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16 md:pb-24">
        <div>
          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] tracking-tight">
            Baked at dawn in Kimihurura.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-soft">
            Sourdough, croissants and mandazi every morning from 6. Cakes designed by you, ready in two days.
            Order everything on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="btn bg-cocoa text-sand">See today&apos;s menu</a>
            <a href="#cakes" className="btn bg-caramel">Design a cake</a>
          </div>
        </div>

        {/* The one page-load moment: the morning's bake tumbles onto the counter. */}
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
          <div className="absolute inset-[6%] rounded-[46%_54%_40%_60%/55%_45%_55%_45%] bg-paper sticker" />
          <Art name="sourdough" className="drop-in absolute left-[8%] top-[38%] w-[52%] [animation-delay:.05s]" />
          <Art name="croissant" className="drop-in absolute right-[4%] top-[14%] w-[46%] rotate-12 [animation-delay:.25s]" />
          <Art name="cinnamon" className="drop-in absolute left-[14%] top-[8%] w-[34%] [animation-delay:.45s]" />
          <Art name="muffin" className="drop-in absolute right-[10%] bottom-[8%] w-[36%] [animation-delay:.65s]" />
          <Art name="mandazi" className="drop-in absolute left-[40%] bottom-[2%] w-[26%] -rotate-6 [animation-delay:.85s]" />
        </div>
      </div>
      <Scallop />
    </section>
  );
}

/** Scalloped edge, like a cake board doily, closing the hero. */
function Scallop() {
  return (
    <svg className="absolute bottom-0 left-0 block h-5 w-full text-paper" preserveAspectRatio="none" viewBox="0 0 120 10" aria-hidden="true">
      <path d="M0 10V5" fill="none" />
      <path
        fill="currentColor"
        d={"M0 10 " + Array.from({ length: 12 }, (_, i) => `Q${i * 10 + 5} 0 ${(i + 1) * 10} 10`).join(" ") + " Z"}
      />
    </svg>
  );
}
