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
    <section id="about" className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-24">
        {/* Ferrari-style eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-heading text-xs tracking-[0.4em] text-accent">01 / OVER MIJ</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          {/* Image column with overlapping editorial title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={contentImage(a.action)}
                alt="Jeavy Reppel in his racing helmet"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 font-heading text-[10px] tracking-[0.3em] text-foreground/90">
                <span className="inline-block h-px w-6 bg-accent" /> #236
              </span>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-4 display-italic text-outline text-[10rem] sm:text-[14rem] leading-none select-none"
            >
              JR
            </span>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="display-italic text-[3.2rem] sm:text-[4.5rem] text-foreground">
              {a.name.split(" ")[0]}{" "}
              <span className="text-primary">{a.name.split(" ").slice(1).join(" ")}</span>
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
              {a.body}
            </div>

            <AnimatePresence initial={false}>
              {expanded && a.fullStory && (
                <motion.div
                  key="full-story"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
                    {a.fullStory}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spec grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-t border-border">
              {details.map((d) => (
                <div key={d.label} className="border-b sm:border-b-0 border-border [&:not(:last-child)]:sm:border-r py-5 px-2 relative">
                  <span className="absolute top-0 left-0 h-[2px] w-6 bg-accent" />
                  <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">
                    {d.label}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {d.flag && <Flag country={d.flag} />}
                    <p className="font-heading text-base font-semibold text-foreground">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {a.fullStory && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="group mt-8 inline-flex items-center gap-2 border border-accent text-accent font-heading font-semibold tracking-[0.25em] px-6 py-3 hover:bg-accent hover:text-accent-foreground transition"
              >
                {expanded ? "TOON MINDER" : "LEES MIJN VOLLEDIGE VERHAAL"}
                <ChevronDown
                  size={18}
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
