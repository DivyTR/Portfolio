import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 transition-all duration-300 md:px-10 ${
        scrolled
          ? "bg-bg-deep/85 py-3 backdrop-blur-xl border-b border-primary/10"
          : "py-5"
      }`}
    >
      <a href="#hero" className="font-mono text-lg font-medium text-primary crt-glow">
        {profile.firstName.toLowerCase()}
        <span className="text-text-dim">.sec</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative text-xs uppercase tracking-widest text-text-dim transition-colors hover:text-primary"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <span
          className="pulse-dot h-2.5 w-2.5 rounded-full bg-primary"
          title="Systems nominal"
        />
      </nav>

      {/* Mobile toggle */}
      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex flex-col gap-1.5 md:hidden"
      >
        <span className="h-0.5 w-6 bg-text-dim" />
        <span className="h-0.5 w-6 bg-text-dim" />
        <span className="h-0.5 w-6 bg-text-dim" />
      </button>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-5 border-b border-primary/10 bg-bg-deep/95 p-7 backdrop-blur-xl md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-text-dim hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
