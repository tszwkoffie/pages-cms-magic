import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section
      id="home"
      className="dot-grid relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-28 pb-16"
    >
      {/* Oversized telemetry number */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none display-italic leading-none text-foreground/[0.035] text-[52vw]"
      >
        236
      </span>

      {/* Top data bar */}
      <div className="relative mx-auto max-w-[88rem] px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-x border-primary/30 px-4 py-2 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
          <div className="flex gap-4">
            <span>LAT: 51.4416° N</span>
            <span className="hidden sm:inline">LON: 5.4697° E</span>
          </div>
          <div className="flex gap-4">
            <span className="text-accent">STATUS: RACE READY</span>
            <span className="hidden sm:inline">CIRCUIT: GENK</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-10 px-5 pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-20">
        {/* Left: identity block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="mb-7 inline-flex items-center gap-3 border border-primary bg-primary/10 px-3 py-1.5">
            <span className="live-dot" />
            <span className="font-tech text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              Junior Rotax · Seizoen 2026 / 2027
            </span>
          </div>

          <h1 className="display-italic text-foreground text-[17vw] sm:text-[12vw] lg:text-[8.5rem] xl:text-[10rem]">
            JEAVY
            <br />
            <span className="text-primary">REPPEL</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-end gap-8">
            <div className="flex flex-col">
              <span className="tech-label mb-1 underline decoration-accent decoration-2 underline-offset-4">
                Pilot ID
              </span>
              <span className="font-heading italic text-4xl font-bold text-foreground">#236</span>
            </div>
            <p className="max-w-xs border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
              Snelheid. Toewijding. Vooruitgang.
              <br />
              Een nieuwe generatie achter het stuur — elke ronde scherper.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#season"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-heading font-semibold tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
            >
              VOLG MIJN SEIZOEN
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-foreground/30 px-7 py-3.5 font-heading font-semibold tracking-[0.2em] text-foreground transition hover:bg-foreground hover:text-background"
            >
              WORD PARTNER
            </a>
          </div>
        </motion.div>

        {/* Right: HUD-framed kart photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="hud-frame scanlines img-zoom group relative aspect-[4/5] overflow-hidden border border-border bg-card p-2">
            <img
              src={asset("images/hero.jpg")}
              alt="Jeavy Reppel in zijn kart met startnummer 236"
              className="h-full w-full object-cover"
              style={{ objectPosition: "55% center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 font-tech text-[10px] leading-relaxed tracking-[0.12em] text-foreground/70">
              V_MAX: 114 KM/H
              <br />
              RPM: 13.850
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[88rem] px-5 text-right font-tech text-[10px] tracking-[0.2em] text-muted-foreground/70">
        [ TELEMETRY_STREAM · JR236 ]
      </div>
    </section>
  );
}
