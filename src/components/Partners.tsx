import { getSponsors, contentImage } from "@/lib/content";

export function Partners() {
  const sponsors = getSponsors();
  // With only a handful of partners a scrolling marquee looks empty —
  // show them as a calm, centered row instead.
  const isStatic = sponsors.length <= 4;
  const loop = isStatic ? sponsors : [...sponsors, ...sponsors];
  return (
    <section id="partners" className="border-t border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-heading text-xs tracking-[0.4em] text-accent">03 / PARTNERS</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h2 className="display-italic text-[2.5rem] sm:text-[4rem] text-foreground mb-10">
          ONZE <span className="text-primary">PARTNERS</span>
        </h2>
        <div className="relative overflow-hidden">
          <div
            className={
              isStatic
                ? "flex flex-wrap justify-center gap-10 sm:gap-16 items-center"
                : "flex w-max animate-marquee gap-14 items-center"
            }
          >
            {loop.map((s, i) => {
              const inner = s.logo ? (
                <div className="flex items-center justify-center h-20 w-40 sm:h-24 sm:w-48">
                  <img
                    src={contentImage(s.logo)}
                    alt={s.name}
                    className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 w-40 sm:h-24 sm:w-48">
                  <span className="font-heading italic text-xl sm:text-2xl font-bold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors whitespace-nowrap text-center">
                    {s.name}
                  </span>
                </div>
              );
              return s.url ? (
                <a
                  key={`${s.name}-${i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  {inner}
                </a>
              ) : (
                <span key={`${s.name}-${i}`} className="shrink-0">
                  {inner}
                </span>
              );
            })}
          </div>
          {!isStatic && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
