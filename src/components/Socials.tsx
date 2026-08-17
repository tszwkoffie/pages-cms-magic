import { Instagram, Linkedin } from "lucide-react";

export function Socials() {
  return (
    <section id="socials" className="relative overflow-hidden bg-card">
      {/* Oversized social watermark bleeding into adjacent sections */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 display-italic text-outline-strong text-[8rem] sm:text-[14rem] lg:text-[18rem] leading-none select-none opacity-[0.03]"
      >
        SOCIALS
      </span>
      <div className="relative mx-auto max-w-[88rem] px-5 py-28 md:py-32">
        <div className="flex items-center gap-4 mb-14">
          <span className="font-heading text-xs tracking-[0.4em] text-accent">04 / SOCIALS</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="display-italic text-[2.5rem] sm:text-[4rem] text-foreground">
            LAATSTE <span className="text-primary">SOCIALS</span>
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="https://instagram.com/jeavy_reppel.karting"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs font-semibold tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Instagram size={16} className="text-accent" />
              @JEAVY_REPPEL.KARTING
            </a>
            <a
              href="https://www.linkedin.com/in/jeavy-reppel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs font-semibold tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Linkedin size={16} className="text-accent" />
              LINKEDIN
            </a>
          </div>
        </div>

        <div
          className="elfsight-app-a12fc2e2-f479-4a27-898c-88921cf435d4"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}
