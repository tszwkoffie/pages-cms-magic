import { contentImage } from "@/lib/content";
import { useSponsors, useTexts } from "@/lib/site-data";

export function Partners() {
  const sponsors = useSponsors();
  const t = useTexts();
  const title = t("partners_title");
  const [first, ...rest] = title.split(" ");

  return (
    <section id="partners" className="relative overflow-hidden bg-card">
      {/* Oversized outlined watermark that bleeds into adjacent sections */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 left-0 display-italic text-outline-strong text-[10rem] sm:text-[16rem] lg:text-[22rem] leading-none select-none opacity-[0.03]"
      >
        PARTNERS
      </span>
      <div className="relative mx-auto max-w-[88rem] px-5 py-28 md:py-32">
        <div className="mb-14 flex items-center gap-4 border-x border-primary/25 px-4 py-2">
          <span className="font-tech text-[10px] tracking-[0.2em] text-accent">03 / PARTNERS</span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden font-tech text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">
            SUPPORT_NETWORK.LOG
          </span>
        </div>
        <h2 className="display-italic text-[2.5rem] sm:text-[4rem] text-foreground mb-14">
          {first} <span className="text-primary">{rest.join(" ")}</span>
        </h2>

        {/* Every partner sits in an identically sized cell so logos never look
            oversized or tiny next to each other. */}
        <div
          className="mx-auto grid w-full gap-px border border-border bg-border"
          style={{
            gridTemplateColumns: `repeat(${Math.min(Math.max(sponsors.length, 1), 4)}, minmax(0, 1fr))`,
            maxWidth: sponsors.length < 4 ? `${Math.max(sponsors.length, 1) * 22}rem` : undefined,
          }}
        >
          {sponsors.map((s, i) => {
            const inner = (
              <div className="flex h-32 w-full items-center justify-center bg-card px-6 py-6 transition-colors group-hover:bg-primary/5">
                {s.logo ? (
                  <img
                    src={contentImage(s.logo)}
                    alt={s.name}
                    loading="lazy"
                    className="max-h-16 max-w-[80%] object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  />
                ) : (
                  <span className="font-heading italic text-lg sm:text-xl font-bold tracking-wider text-muted-foreground/80 transition-colors group-hover:text-foreground text-center leading-tight">
                    {s.name}
                  </span>
                )}
              </div>
            );
            return s.url ? (
              <a
                key={`${s.name}-${i}`}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.name} — website openen`}
                className="group block"
              >
                {inner}
              </a>
            ) : (
              <span key={`${s.name}-${i}`} className="group block">
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
