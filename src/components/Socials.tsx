import { Instagram, Youtube, Heart } from "lucide-react";
import { asset } from "@/lib/asset";

type Post = {
  platform: "instagram" | "youtube";
  handle: string;
  caption: string;
  image: string;
  meta: string;
};

const posts: Post[] = [
  { platform: "instagram", handle: "@jeavy_reppel.karting", caption: "P1 in Valencia! Wat een weekend op de baan 🏆", image: "images/hero.jpg", meta: "2 dagen geleden" },
  { platform: "youtube", handle: "Jeavy Reppel Karting", caption: "Onboard ronde — voorbereiding circuit Genk", image: "images/helmet.jpg", meta: "5 dagen geleden" },
  { platform: "instagram", handle: "@jeavy_reppel.karting", caption: "Paddock klaar met de #236 — Junior Rotax", image: "images/paddock.jpg", meta: "1 week geleden" },
  { platform: "instagram", handle: "@jeavy_reppel.karting", caption: "Nieuw seizoen, nieuwe doelen. CS55 Racing 🔴", image: "images/profile.png", meta: "2 weken geleden" },
];

function PostCard({ post }: { post: Post }) {
  const Icon = post.platform === "instagram" ? Instagram : Youtube;
  return (
    <a
      href={post.platform === "instagram" ? "https://instagram.com" : "https://youtube.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-[280px] sm:w-[320px] shrink-0 overflow-hidden rounded-lg border border-border bg-background"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={asset(post.image)}
          alt={post.caption}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
          <Icon size={16} />
        </span>
      </div>
      <div className="p-4">
        <p className="font-heading text-sm font-semibold tracking-wider text-foreground">{post.handle}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.caption}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{post.meta}</span>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Heart size={13} /> Nieuwste
          </span>
        </div>
      </div>
    </a>
  );
}

export function Socials() {
  return (
    <section id="socials" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            LAATSTE <span className="text-primary">SOCIALS</span>
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <Instagram size={16} className="text-primary" />
            VOLG @JEAVY_REPPEL.KARTING
          </a>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-6">
            {[...posts, ...posts].map((p, i) => (
              <PostCard key={`${p.handle}-${i}`} post={p} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  );
}
