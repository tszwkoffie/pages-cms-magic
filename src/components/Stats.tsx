import { motion } from "framer-motion";
import { Flag as FlagIcon, Trophy, Timer, Target } from "lucide-react";

const stats = [
  { Icon: FlagIcon, label: "RACES", value: "14", sub: "2024 — 2026" },
  { Icon: Trophy, label: "PODIUMS", value: "6", sub: "TOP 3 FINISHES" },
  { Icon: Timer, label: "SNELSTE RONDE", value: "48.781", sub: "GENK 2026" },
  { Icon: Target, label: "DOEL 2026", value: "KAMPIOEN", sub: "JUNIOR ROTAX" },
];

export function Stats() {
  return (
    <section className="bg-card relative">
      <div className="section-divider" />
      <div className="mx-auto max-w-[88rem] grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex items-center gap-4 px-6 py-8 border-border [&:not(:nth-child(2n))]:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
          >
            <span className="absolute top-0 left-0 h-[2px] w-8 bg-accent" />
            <s.Icon className="text-primary shrink-0" size={32} strokeWidth={1.5} />
            <div className="min-w-0">
              <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">{s.label}</p>
              <p className="font-heading italic text-2xl sm:text-3xl font-bold text-foreground truncate">{s.value}</p>
              <p className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="section-divider" />
    </section>
  );
}
