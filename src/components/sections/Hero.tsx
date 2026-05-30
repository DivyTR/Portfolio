import { profile } from "../../data/content";
import { Typewriter } from "../ui/Typewriter";

export function Hero() {
  const roleSlug = profile.role.toLowerCase().replace(/\s+/g, "_");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center"
    >
      <div className="max-w-5xl">
        {profile.available && (
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-full glass-panel px-6 py-2.5 font-mono text-sm uppercase tracking-widest text-primary">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
            Available for opportunities
          </div>
        )}

        <h1 className="crt-flicker text-6xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-[5.5rem]">
          <span className="glitch crt-glow-strong block">
            {profile.firstName} <span className="text-primary">{profile.lastName}</span>
          </span>
          <Typewriter
            text={roleSlug}
            className="mt-6 block font-mono text-2xl text-primary crt-glow sm:text-3xl md:text-[2.6rem]"
          />
        </h1>

        <p className="mx-auto mt-9 max-w-2xl text-lg font-normal leading-relaxed text-text sm:text-xl">
          {profile.tagline}
        </p>

        <div className="mt-11 flex flex-wrap justify-center gap-5">
          <a
            href="#contact"
            className="rounded-xl bg-primary px-10 py-4 text-base font-medium text-bg-deep transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 28px var(--glow-soft)" }}
          >
            Get in Touch
          </a>
          <a
            href="#experience"
            className="rounded-xl glass-panel glass-panel-hover px-10 py-4 text-base font-medium text-text"
          >
            View Experience
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-primary to-transparent" />
      </a>
    </section>
  );
}
