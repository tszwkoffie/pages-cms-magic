import { motion } from "framer-motion";
import { Flag as FlagIcon, Trophy, Timer, Target } from "lucide-react";

const stats = [
  { Icon: FlagIcon, label: "RACES", value: "14", sub: "2024 - 2026" },
  { Icon: Trophy, label: "PODIUMS", value: "6", sub: "TOP 3 FINISHES" },
  { Icon: Timer, label: "SNELSTE RONDE", value: "48.781", sub: "GENK 2026" },
  { Icon: Target, label: "DOEL 2026", value: "KAMPIOEN", sub: "JUNIOR ROTAX" },
];

export function Stats() {
  return (
    <section className="border-y-2 border-primary bg-card">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-4 px-5 py-7 border-border [&:not(:nth-child(2n))]:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
          >
            <s.Icon className="text-primary shrink-0" size={34} strokeWidth={1.5} />
            <div className="min-w-0">
              <p className="font-heading text-xs tracking-widest text-muted-foreground">{s.label}</p>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground truncate">{s.value}</p>
              <p className="font-heading text-[11px] tracking-wider text-muted-foreground">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
