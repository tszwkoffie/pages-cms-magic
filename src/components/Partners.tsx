import { getSponsors, contentImage } from "@/lib/content";

export function Partners() {
  const sponsors = getSponsors();
  const loop = [...sponsors, ...sponsors];
  return (
    <section id="partners" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
          ONZE <span className="text-primary">PARTNERS</span>
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 items-center">
            {loop.map((s, i) => {
              const inner = s.logo ? (
                <img
                  src={contentImage(s.logo)}
                  alt={s.name}
                  className="h-14 sm:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                  {s.name}
                </span>
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  );
}
