import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden bg-background"
    >
      {/* Full-bleed cinematic kart image */}
      <img
        src={asset("images/hero.jpg")}
        alt="Jeavy Reppel racing kart number 236"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "55% center" }}
      />
      {/* Cinematic gradient overlays — stronger bottom wash so next section flows in */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/50" />

      {/* Side ticker — Ferrari-style vertical label */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 items-center gap-3 rotate-[-90deg] origin-left">
        <span className="inline-block h-px w-10 bg-accent" />
        <span className="font-heading text-[11px] tracking-[0.45em] text-muted-foreground">
          SEIZOEN · 2026 / 2027
        </span>
      </div>

      {/* Big background number — CS55-style */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-24 right-4 sm:right-10 font-heading italic font-bold leading-none text-outline select-none text-[18rem] sm:text-[26rem] lg:text-[34rem]"
      >
        236
      </span>

      {/* Editorial content block, bottom-left */}
      <div className="relative z-10 mx-auto max-w-[88rem] w-full px-5 pb-28 pt-32 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block h-px w-12 bg-accent" />
            <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.4em] text-accent">
              JUNIOR ROTAX · #236
            </p>
          </div>

          <h1 className="display-italic text-foreground text-[18vw] sm:text-[14vw] lg:text-[11rem] xl:text-[14rem]">
            JEAVY
            <br />
            <span className="text-primary">REPPEL</span>
          </h1>

          <div className="mt-8 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
            <p className="font-heading text-lg sm:text-xl tracking-wide text-muted-foreground max-w-xl">
              Snelheid. Toewijding. Vooruitgang.<br />
              <span className="text-foreground/80">
                Een nieuwe generatie achter het stuur.
              </span>
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#season"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold tracking-[0.2em] px-7 py-3.5 hover:brightness-110 transition"
              >
                VOLG MIJN SEIZOEN
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center border border-foreground/30 text-foreground font-heading font-semibold tracking-[0.2em] px-7 py-3.5 hover:bg-foreground hover:text-background transition"
              >
                WORD PARTNER
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="hidden lg:block absolute bottom-10 right-8 z-10 scroll-hint text-[10px] tracking-[0.4em] text-muted-foreground font-heading">
        SCROLL
      </div>
    </section>
  );
}
