import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";

export function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <img
        src={asset("images/paddock.jpg")}
        alt="Jeavy Reppel in the paddock"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      {/* Top wash that overlaps the previous section */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 py-28 md:py-36">
        <div className="mb-14 flex items-center gap-4 border-x border-primary/25 px-4 py-2">
          <span className="font-tech text-[10px] tracking-[0.2em] text-accent">05 / CONTACT</span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden font-tech text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">PARTNERSHIP_REQUEST</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="display-italic text-[3rem] sm:text-[5.5rem] text-foreground">
            LATEN WE DE
            <br />
            TOEKOMST{" "}
            <span className="text-primary">SAMEN BOUWEN.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
            Interesse in een partnership met Jeavy Reppel? Neem contact op en word onderdeel van het avontuur.
          </p>
          <a
            href="mailto:info@jeavyreppel.com"
            className="group mt-8 inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-heading font-semibold tracking-[0.25em] text-primary-foreground transition hover:brightness-110"
          >
            NEEM CONTACT OP
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <ul className="mt-10 space-y-3">
            <li className="flex items-center gap-3 font-tech text-xs tracking-[0.1em] text-muted-foreground">
              <Instagram size={18} className="text-accent" />
              <span>@jeavy_reppel.karting</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Youtube size={18} className="text-accent" />
              <span>Jeavy Reppel Karting</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail size={18} className="text-accent" />
              <span>info@jeavyreppel.com</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
