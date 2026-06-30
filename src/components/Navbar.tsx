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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      {/* CS55-style top racing stripe */}
      <div className="h-[2px] section-divider" />

      <nav className="mx-auto max-w-[88rem] flex items-center justify-between px-5 py-4">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <span className="font-heading text-2xl font-bold leading-none tracking-tight">
            <span className="text-foreground">J</span>
            <span className="text-primary">R</span>
            <span className="text-primary">.</span>
          </span>
          <span className="hidden sm:flex items-center gap-2 font-heading text-[11px] font-semibold tracking-[0.35em] text-muted-foreground">
            <span className="inline-block h-1 w-6 bg-primary" />
            #236 · JUNIOR ROTAX
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-heading text-[13px] font-medium tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 border border-accent text-accent font-heading text-[12px] font-semibold tracking-[0.25em] px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition"
        >
          WORD PARTNER
          <span className="inline-block w-2 h-2 bg-accent group-hover:bg-accent-foreground" />
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-foreground p-1"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur px-5 py-4">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={`m-${l.label}`}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-heading text-base tracking-wider text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
