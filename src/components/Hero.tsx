import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={asset("images/hero.jpg")}
        alt="Jeavy Reppel racing kart number 236 on track"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "62% center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl w-full px-5 pt-28 pb-16"
      >
        <p className="font-heading text-sm sm:text-base font-semibold tracking-[0.3em] text-primary mb-4">
          JUNIOR ROTAX DRIVER
        </p>
        <h1 className="font-heading font-bold leading-[0.85] tracking-tight text-balance">
          <span className="block text-6xl sm:text-7xl md:text-8xl text-foreground">JEAVY</span>
          <span className="block text-6xl sm:text-7xl md:text-8xl text-primary italic">REPPEL</span>
        </h1>
        <p className="mt-6 font-heading text-xl sm:text-2xl tracking-wide text-muted-foreground">
          Speed. Dedication. Progress.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#season"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold tracking-wider px-7 py-3.5 rounded hover:brightness-110 transition"
          >
            FOLLOW MY SEASON
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border border-border text-foreground font-heading font-semibold tracking-wider px-7 py-3.5 rounded hover:bg-foreground hover:text-background transition"
          >
            BECOME A PARTNER
          </a>
        </div>
        <div className="mt-9 flex items-center gap-3">
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: Youtube, label: "YouTube" },
            { Icon: Mail, label: "Email" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#contact"
              aria-label={label}
              className="inline-flex items-center justify-center h-11 w-11 rounded bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
