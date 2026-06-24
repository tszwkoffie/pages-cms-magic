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
        scrolled ? "bg-background/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <span className="font-heading text-2xl font-bold leading-none">
            <span className="text-primary">J</span>
            <span className="text-foreground">R</span>
          </span>
          <span className="hidden sm:block font-heading text-sm font-semibold tracking-[0.25em] text-foreground">
            JEAVY REPPEL
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-heading text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-wider px-5 py-2.5 rounded hover:brightness-110 transition"
        >
          WORD PARTNER
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
