import { motion } from "framer-motion";
import { User, Flame, MapPin, Users, ArrowRight } from "lucide-react";
import { Flag } from "@/components/Flag";
import { getAbout, contentImage } from "@/lib/content";

export function About() {
  const a = getAbout();
  const details = [
    { Icon: User, label: "LEEFTIJD", value: a.age },
    { Icon: Flame, label: "KLASSE", value: a.className },
    { Icon: MapPin, label: "NATIONALITEIT", value: a.nationality, flag: "nl" as const },
    { Icon: Users, label: "TEAM", value: a.team },
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.1fr_0.9fr] gap-8 px-5 py-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[440px] sm:h-[560px]"
        >
          <img
            src={contentImage(a.action)}
            alt="Jeavy Reppel in his racing helmet"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-heading text-sm font-semibold tracking-[0.3em] text-primary">
            {a.subtitle}
          </p>
          <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {a.name}
          </h2>

          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
            {a.body}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-5">
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                {d.flag ? <Flag country={d.flag} /> : <d.Icon className="text-primary shrink-0" size={22} />}
                <div>
                  <p className="font-heading text-[11px] tracking-widest text-muted-foreground">
                    {d.label}
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#season"
            className="group mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold tracking-wider px-6 py-3 rounded hover:brightness-110 transition"
          >
            LEES MIJN VOLLEDIGE VERHAAL
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[440px] sm:h-[560px] hidden md:block"
        >
          <span className="pointer-events-none absolute -right-2 top-2 font-heading text-[9rem] font-bold leading-none text-border/50 select-none">
            236
          </span>
          <img
            src={contentImage(a.portrait)}
            alt="Studio portrait of Jeavy Reppel"
            className="relative h-full w-full object-cover object-top"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
