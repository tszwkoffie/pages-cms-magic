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
      <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/80 to-background" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl md:mr-auto"
        >
          <h2 className="font-heading text-4xl sm:text-6xl font-bold leading-[0.95] text-foreground text-balance">
            LATEN WE
            <br />
            DE TOEKOMST <span className="text-primary">SAMEN BOUWEN.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Interesse in een partnership met Jeavy Reppel? Neem contact op en word onderdeel van het avontuur.
          </p>
          <a
            href="mailto:info@jeavyreppel.com"
            className="group mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold tracking-wider px-7 py-3.5 rounded hover:brightness-110 transition"
          >
            NEEM CONTACT OP
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Instagram size={18} className="text-primary" />
              <span>@jeavy_reppel.karting</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Youtube size={18} className="text-primary" />
              <span>Jeavy Reppel Karting</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail size={18} className="text-primary" />
              <span>info@jeavyreppel.com</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
