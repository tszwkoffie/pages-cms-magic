import { Instagram, Linkedin } from "lucide-react";
import { contentImage, formatRaceDate } from "@/lib/content";
import { useSocials } from "@/lib/site-data";

export function Socials() {
  const posts = useSocials();

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
        <div className="mb-14 flex items-center gap-4 border-x border-primary/25 px-4 py-2">
          <span className="font-tech text-[10px] tracking-[0.2em] text-accent">04 / SOCIALS</span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden font-tech text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">FEED_STREAM.LIVE</span>
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
              className="inline-flex items-center gap-2 border border-border px-3 py-2 font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-foreground"
            >
              <Instagram size={16} className="text-accent" />
              @JEAVY_REPPEL.KARTING
            </a>
            <a
              href="https://www.linkedin.com/in/jeavy-reppel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-3 py-2 font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent hover:text-foreground"
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
