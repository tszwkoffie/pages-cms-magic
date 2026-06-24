import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Flag } from "@/components/Flag";
import { getRaces, formatRaceDate } from "@/lib/content";

export function Season() {
  const rounds = getRaces();
  return (
    <section id="season" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            SEIZOEN <span className="text-primary">2026</span>
          </h2>
          <a
            href="#season"
            className="group inline-flex items-center gap-2 font-heading text-sm tracking-wider text-muted-foreground hover:text-foreground transition"
          >
            BEKIJK VOLLEDIGE KALENDER
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {rounds.map((r, i) => (
            <motion.div
              key={`${r.round}-${r.track}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`rounded-lg border bg-card p-5 transition-colors ${
                r.upcoming ? "border-primary" : "border-border hover:border-muted-foreground/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs tracking-widest text-muted-foreground">
                  {r.round}
                </span>
                <Flag country={r.country} />
              </div>
              <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">{r.track}</h3>
              <p className="font-heading text-xs tracking-wider text-muted-foreground">
                {formatRaceDate(r.date)}
              </p>
              <p className={`mt-6 font-heading text-2xl font-bold ${r.upcoming ? "text-primary" : "text-foreground"}`}>
                {r.upcoming ? (
                  <span className="text-lg tracking-wider text-primary">BINNENKORT</span>
                ) : (
                  <span className="text-primary">{r.result}</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
