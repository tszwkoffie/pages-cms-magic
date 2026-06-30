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
      <div className="mx-auto max-w-[88rem] px-5 py-20">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-heading text-xs tracking-[0.4em] text-accent">02 / KALENDER</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="display-italic text-[3.2rem] sm:text-[5rem] text-foreground">
            SEIZOEN <span className="text-primary">2026</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-2 font-heading text-xs tracking-[0.3em] text-muted-foreground hover:text-foreground transition"
          >
            {open ? "VERBERG VOLLEDIGE KALENDER" : "BEKIJK VOLLEDIGE KALENDER"}
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {rounds.map((r, i) => (
            <motion.div
              key={`${r.round}-${r.track}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`relative bg-card p-6 border-t-2 transition-colors ${
                r.upcoming ? "border-t-primary" : "border-t-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">
                  {r.round}
                </span>
                <Flag country={r.country} />
              </div>
              <h3 className="mt-6 font-heading italic text-2xl font-bold text-foreground leading-tight">
                {r.track}
              </h3>
              <p className="mt-1 font-heading text-[11px] tracking-[0.25em] text-muted-foreground">
                {formatRaceDate(r.date)}
              </p>
              <div className="mt-8 pt-4 border-t border-border">
                {r.upcoming ? (
                  <span className="font-heading text-sm tracking-[0.25em] text-primary">BINNENKORT</span>
                ) : (
                  <span className="font-heading italic text-3xl font-bold text-primary">{r.result}</span>
                )}
              </div>
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
              <div className="mt-14 border-t border-border pt-10">
                <h3 className="display-italic text-3xl text-foreground mb-8">
                  VOLLEDIGE <span className="text-primary">KALENDER</span>
                </h3>
                <div className="divide-y divide-border border-y border-border">
                  {rounds.map((r) => (
                    <div
                      key={`full-${r.round}-${r.track}`}
                      className="relative grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center py-5 px-2 sm:px-4"
                    >
                      <span
                        className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                          r.upcoming ? "bg-primary" : "bg-accent"
                        }`}
                      />
                      <div className="flex items-center gap-4 pl-3">
                        <Flag country={r.country} />
                        <div>
                          <span className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">
                            {r.round}
                          </span>
                          <h4 className="font-heading italic text-xl font-bold text-foreground leading-tight">
                            {r.track}
                          </h4>
                        </div>
                      </div>

                      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-accent" />
                          <span className="font-heading tracking-wider">{formatRaceDate(r.date)}</span>
                        </div>
                        {r.time && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-accent" />
                            <span className="font-heading tracking-wider">{r.time}</span>
                          </div>
                        )}
                        {r.address && (
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-accent shrink-0" />
                            <span>{r.address}</span>
                          </div>
                        )}
                      </div>

                      <div className="sm:text-right">
                        {r.upcoming ? (
                          <span className="font-heading text-sm tracking-[0.25em] text-primary">BINNENKORT</span>
                        ) : (
                          <span className="font-heading italic text-2xl font-bold text-primary">{r.result}</span>
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
