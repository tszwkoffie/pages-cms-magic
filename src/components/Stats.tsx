import { motion } from "framer-motion";

const stats = [
  { label: "RACES", value: "14", sub: "2024 — 2026", meter: 70, tone: "primary" as const },
  { label: "PODIUMS", value: "6", sub: "TOP 3 FINISHES", meter: 43, tone: "accent" as const },
  { label: "SNELSTE RONDE", value: "48.781", sub: "GENK 2026", meter: 88, tone: "primary" as const },
  { label: "DOEL 2026", value: "KAMPIOEN", sub: "JUNIOR ROTAX", meter: 100, tone: "accent" as const },
];

export function Stats() {
  return (
    <section className="relative z-20 mx-4 -mt-10 sm:mx-6 lg:mx-10 xl:mx-16">
      <div className="border border-border/60 bg-card/90 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-2 font-tech text-[10px] tracking-[0.2em] text-muted-foreground">
          <span className="text-accent">// SEIZOENSTELEMETRIE</span>
          <span className="hidden sm:inline">LOG_0236 · LIVE</span>
        </div>
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col px-6 py-8 transition-colors hover:bg-primary/5 border-border [&:not(:nth-child(2n))]:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
            >
              <span className={`tech-label mb-3 ${s.tone === "accent" ? "text-accent" : ""}`}>
                [ {s.label} ]
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading italic text-3xl font-bold text-foreground sm:text-4xl">
                  {s.value}
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {s.sub}
                </span>
              </div>
              <div className="data-meter mt-5">
                <span
                  style={{
                    width: `${s.meter}%`,
                    background: s.tone === "accent" ? "var(--accent)" : "var(--primary)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
