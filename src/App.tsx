import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Season } from "@/components/Season";
import { Partners } from "@/components/Partners";
import { Socials } from "@/components/Socials";
import { ContactCta } from "@/components/ContactCta";

export default function App() {
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
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jeavy Reppel. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
