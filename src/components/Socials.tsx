import { Instagram, ExternalLink } from "lucide-react";
import instagramFeed from "@content/instagram.json";

type IgPost = {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  image: string;
  permalink: string;
  timestamp: string;
};

type Feed = {
  fetched_at: string | null;
  note?: string;
  posts: IgPost[];
};

const feed = instagramFeed as Feed;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "vandaag";
  if (days === 1) return "1 dag geleden";
  if (days < 7) return `${days} dagen geleden`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week geleden";
  if (weeks < 5) return `${weeks} weken geleden`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1 maand geleden" : `${months} maanden geleden`;
}

function PostCard({ post }: { post: IgPost }) {
  const caption = post.caption?.split("\n")[0] ?? "";
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-[280px] sm:w-[320px] shrink-0 overflow-hidden rounded-lg border border-border bg-background"
    >
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={caption || "Instagram post"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
          <Instagram size={16} />
        </span>
      </div>
      <div className="p-4">
        <p className="font-heading text-sm font-semibold tracking-wider text-foreground">
          @jeavy_reppel.karting
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {caption || "Bekijk op Instagram"}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{timeAgo(post.timestamp)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <ExternalLink size={12} /> BEKIJK
          </span>
        </div>
      </div>
    </a>
  );
}

export function Socials() {
  const posts = feed.posts ?? [];
  const hasPosts = posts.length > 0;
  // Duplicate the array for a seamless marquee loop.
  const loop = hasPosts ? [...posts, ...posts] : [];

  return (
    <section id="socials" className="border-t border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-heading text-xs tracking-[0.4em] text-accent">04 / SOCIALS</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <h2 className="display-italic text-[2.5rem] sm:text-[4rem] text-foreground">
            LAATSTE <span className="text-primary">SOCIALS</span>
          </h2>
          <a
            href="https://instagram.com/jeavy_reppel.karting"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-xs font-semibold tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <Instagram size={16} className="text-accent" />
            VOLG @JEAVY_REPPEL.KARTING
          </a>
        </div>

        {hasPosts ? (
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-6">
              {loop.map((p, i) => (
                <PostCard key={`${p.id}-${i}`} post={p} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent" />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-background/40 p-10 text-center">
            <Instagram size={32} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-sm tracking-wider text-foreground">
              INSTAGRAM-FEED LAADT BIJ DE EERSTE DEPLOY
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Stel het <code>IG_TOKEN</code> repo-secret in en push naar <code>main</code> — zie README.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
