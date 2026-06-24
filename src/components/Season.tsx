import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Clock, Calendar } from "lucide-react";
import { Flag } from "@/components/Flag";
import { getRaces, formatRaceDate } from "@/lib/content";

export function Season() {
  const rounds = getRaces();
  const [open, setOpen] = useState(false);

  return (
    <section id="season" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            SEIZOEN <span className="text-primary">2026</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-2 font-heading text-sm tracking-wider text-muted-foreground hover:text-foreground transition"
          >
            {open ? "VERBERG VOLLEDIGE KALENDER" : "BEKIJK VOLLEDIGE KALENDER"}
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
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

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="full-calendar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-12 border-t border-border pt-10">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  VOLLEDIGE <span className="text-primary">KALENDER</span>
                </h3>
                <div className="space-y-4">
                  {rounds.map((r) => (
                    <div
                      key={`full-${r.round}-${r.track}`}
                      className={`rounded-lg border bg-card p-5 sm:p-6 grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                        r.upcoming ? "border-primary" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Flag country={r.country} />
                        <div>
                          <span className="font-heading text-xs tracking-widest text-muted-foreground">
                            {r.round}
                          </span>
                          <h4 className="font-heading text-xl font-bold text-foreground leading-tight">
                            {r.track}
                          </h4>
                        </div>
                      </div>

                      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          <span className="font-heading tracking-wider">
                            {formatRaceDate(r.date)}
                          </span>
                        </div>
                        {r.time && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-primary" />
                            <span className="font-heading tracking-wider">{r.time}</span>
                          </div>
                        )}
                        {r.address && (
                          <div className="flex items-center gap-2 sm:col-span-1">
                            <MapPin size={14} className="text-primary shrink-0" />
                            <span>{r.address}</span>
                          </div>
                        )}
                      </div>

                      <div className="sm:text-right">
                        {r.upcoming ? (
                          <span className="font-heading text-sm tracking-wider text-primary">
                            BINNENKORT
                          </span>
                        ) : (
                          <span className="font-heading text-2xl font-bold text-primary">
                            {r.result}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
