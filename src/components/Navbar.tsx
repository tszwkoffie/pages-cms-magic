import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "HOME", href: "#home" },
  { label: "OVER MIJ", href: "#about" },
  { label: "SEIZOEN", href: "#season" },
  { label: "SPONSORS", href: "#partners" },
  { label: "SOCIALS", href: "#socials" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-background/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      {/* CS55-style top racing stripe */}
      <div className="h-[2px] section-divider" />

      <nav className="mx-auto max-w-[88rem] flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
        >
          <span className="font-heading text-xl sm:text-2xl font-bold leading-none tracking-tight">
            <span className="text-foreground">J</span>
            <span className="text-primary">R</span>
            <span className="text-primary">.</span>
          </span>
          <span className="hidden md:flex items-center gap-2 font-heading text-[11px] font-semibold tracking-[0.35em] text-muted-foreground truncate">
            <span className="inline-block h-1 w-6 bg-primary shrink-0" />
            #236 · JUNIOR ROTAX
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-heading text-[13px] font-medium tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 border border-accent text-accent font-heading text-[12px] font-semibold tracking-[0.25em] px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition shrink-0"
        >
          WORD PARTNER
          <span className="inline-block w-2 h-2 bg-accent" />
        </a>

        <button
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-4 sm:px-6 py-2">
          {links.map((l) => (
            <li key={`m-${l.label}`} className="border-b border-border/60 last:border-b-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 font-heading text-sm tracking-[0.2em] text-muted-foreground hover:text-foreground py-4"
              >
                <span className="inline-block h-px w-4 bg-primary" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 sm:px-6 pb-5 pt-3">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 border border-accent text-accent font-heading text-[12px] font-semibold tracking-[0.25em] px-4 py-3 hover:bg-accent hover:text-accent-foreground transition"
          >
            WORD PARTNER
            <span className="inline-block w-2 h-2 bg-accent" />
          </a>
        </div>
      </div>
    </header>
  );
}
