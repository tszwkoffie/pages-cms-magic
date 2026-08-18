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

        {posts.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <a
                key={`${post.image}-${i}`}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden border border-border bg-background"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={contentImage(post.image)}
                    alt={post.caption || "Instagram post van Jeavy Reppel"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-4 pt-10">
                  <div className="mb-2 flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.2em] text-accent">
                    <Instagram size={12} />
                    {post.date ? formatRaceDate(post.date) : "INSTAGRAM"}
                  </div>
                  {post.caption && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">{post.caption}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <a
            href="https://instagram.com/jeavy_reppel.karting"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-dashed border-border p-10 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:border-accent hover:text-foreground"
          >
            Bekijk de laatste posts op Instagram
          </a>
        )}
      </div>
    </section>
  );
}

      </div>
    </section>
  );
}
