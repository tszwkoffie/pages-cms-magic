import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Flag } from "@/components/Flag";
import { contentImage } from "@/lib/content";
import { useAbout } from "@/lib/site-data";

export function About() {
  const a = useAbout();
  const [expanded, setExpanded] = useState(false);
  const details = [
    { label: "LEEFTIJD", value: a.age },
    { label: "KLASSE", value: a.className },
    { label: "NATIONALITEIT", value: a.nationality, flag: "nl" as const },
    { label: "TEAM", value: a.team },
  ];

  return (
    <section id="about" className="dot-grid relative overflow-hidden">
      <div className="relative mx-auto max-w-[88rem] px-5 pt-28 pb-32 md:pt-36 md:pb-40">
        {/* Data-stream eyebrow */}
        <div className="mb-14 flex items-center gap-4 border-x border-primary/25 px-4 py-2">
          <span className="font-tech text-[10px] tracking-[0.2em] text-accent">01 / OVER MIJ</span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden font-tech text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">
            DRIVER_PROFILE.LOG
          </span>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          {/* HUD-framed portrait panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="hud-frame scanlines img-zoom relative aspect-[4/5] overflow-hidden border border-border bg-card p-2">
              <img
                src={contentImage(a.action)}
                alt="Jeavy Reppel met zijn racehelm"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <span className="absolute right-6 top-6 z-10 font-tech text-[10px] tracking-[0.2em] text-accent">
                ID · #236
              </span>
              <span className="absolute bottom-6 left-6 z-10 font-tech text-[10px] leading-relaxed tracking-[0.12em] text-foreground/70">
                HELMET_CAM · FRAME 0412
              </span>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-6 select-none display-italic text-outline text-[9rem] leading-none sm:text-[14rem]"
            >
              JR
            </span>
          </motion.div>

          {/* Text + data column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="display-italic text-[3.2rem] text-foreground sm:text-[4.5rem]">
              {a.name.split(" ")[0]}{" "}
              <span className="text-primary">{a.name.split(" ").slice(1).join(" ")}</span>
            </h2>

            <div className="mt-6 space-y-4 whitespace-pre-line border-l-2 border-primary pl-5 text-[15px] leading-relaxed text-muted-foreground">
              {a.body}
            </div>

            <AnimatePresence initial={false}>
              {expanded && a.fullStory && (
                <motion.div
                  key="full-story"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4 whitespace-pre-line border-l-2 border-border pl-5 text-[15px] leading-relaxed text-muted-foreground">
                    {a.fullStory}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Telemetry spec panels */}
            <div className="mt-12 grid grid-cols-2 border border-border sm:grid-cols-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="relative border-border px-4 py-5 transition-colors hover:bg-primary/5 [&:not(:nth-child(2n))]:border-r sm:border-r sm:last:border-r-0 [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0"
                >
                  <span className="tech-label block whitespace-nowrap text-[9px] tracking-[0.12em]">[ {d.label} ]</span>
                  <div className="mt-2 flex items-center gap-2">
                    {d.flag && <Flag country={d.flag} />}
                    <p className="font-heading italic text-lg font-bold text-foreground">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {a.fullStory && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="group mt-8 inline-flex items-center gap-3 border border-accent px-6 py-3 font-tech text-[11px] font-bold uppercase tracking-[0.2em] text-accent transition hover:bg-accent hover:text-accent-foreground"
              >
                {expanded ? "Verberg logboek" : "Lees mijn volledige verhaal"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
