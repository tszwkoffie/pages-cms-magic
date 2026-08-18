import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { useTexts } from "@/lib/site-data";

export function Hero() {
  const t = useTexts();
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
      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5">
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

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] items-center gap-10 px-5 pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-20">
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
              {t("hero_badge")}
            </span>
          </div>

          <h1 className="display-italic text-foreground text-[17vw] sm:text-[12vw] lg:text-[8.5rem] xl:text-[10rem]">
            {t("hero_title_first")}
            <br />
            <span className="text-primary">{t("hero_title_last")}</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-end gap-8">
            <div className="flex flex-col">
              <span className="tech-label mb-1 underline decoration-accent decoration-2 underline-offset-4">
                Pilot ID
              </span>
              <span className="font-heading italic text-4xl font-bold text-foreground">
                {t("hero_number")}
              </span>
            </div>
            <p className="max-w-xs border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
              {t("hero_tagline")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#season"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-heading font-semibold tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
            >
              {t("hero_cta_primary")}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-foreground/30 px-7 py-3.5 font-heading font-semibold tracking-[0.2em] text-foreground transition hover:bg-foreground hover:text-background"
            >
              {t("hero_cta_secondary")}
            </a>
          </div>
        </motion.div>

        {/* Right column keeps layout space for the blended photo on desktop */}
        <div className="lg:col-span-5 lg:h-[1px]" />
      </div>

      {/* Blended kart photo — covers the whole hero so there are no visible edges */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hero-photo pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[64%] lg:block"
        style={{ backgroundImage: `url(${asset("images/hero.jpg")})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[70%] bg-gradient-to-r from-background via-background/85 to-transparent lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-1/3 bg-gradient-to-t from-background to-transparent lg:block"
      />

      {/* Blended kart photo — mobile / tablet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1 }}
        className="relative -mt-6 w-full lg:hidden"
      >
        <div
          className="hero-photo-mobile h-[46vh] w-full"
          style={{ backgroundImage: `url(${asset("images/hero.jpg")})` }}
          role="img"
          aria-label="Jeavy Reppel in zijn kart met startnummer 236"
        />
        <span className="absolute bottom-4 left-8 font-tech text-[10px] leading-relaxed tracking-[0.12em] text-foreground/70">
          V_MAX: 114 KM/H
          <br />
          RPM: 13.850
        </span>
      </motion.div>




      <div className="relative z-10 mx-auto mt-10 w-full max-w-[88rem] px-5 text-right font-tech text-[10px] tracking-[0.2em] text-muted-foreground/70">
        [ TELEMETRY_STREAM · JR236 ]
      </div>
    </section>
  );
}
