import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Season } from "@/components/Season";
import { Partners } from "@/components/Partners";
import { Socials } from "@/components/Socials";
import { ContactCta } from "@/components/ContactCta";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Season />
      <Partners />
      <Socials />
      <ContactCta />
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-heading text-sm tracking-widest text-muted-foreground">
            <span className="text-primary">JEAVY</span> REPPEL · #236
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/jeavy_reppel.karting"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.linkedin.com/in/jeavy-reppel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              LINKEDIN
            </a>
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Jeavy Reppel
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
