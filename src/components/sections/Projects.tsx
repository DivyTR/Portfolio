import { featuredProject, projects } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-md bg-bg-deep/60 px-2.5 py-1 font-mono text-[0.68rem] text-primary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        label="selected work"
        title="Projects"
        desc="Applied security, ML, and full-stack engineering to solve real-world problems."
      />

      {/* Featured */}
      <Panel
        hover
        className="reveal-up relative mt-12 overflow-hidden p-8 md:p-10"
      >
        <span className="border-beam" />
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
          {featuredProject.number}
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
          {featuredProject.title}
        </h3>
        <div className="mt-4 space-y-3">
          {featuredProject.body.map((p, i) => (
            <p key={i} className="text-sm font-light leading-relaxed text-text-dim">
              {p}
            </p>
          ))}
        </div>

        <div className="my-6 grid grid-cols-2 gap-4 rounded-xl bg-bg-deep/50 p-5 sm:grid-cols-5">
          {featuredProject.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-xl font-bold text-primary crt-glow">{s.value}</div>
              <div className="mt-1 text-[0.62rem] uppercase tracking-wide text-text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <TechTags tech={featuredProject.tech} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={featuredProject.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-bg-deep/60 px-5 py-2.5 font-mono text-sm text-primary transition-colors hover:bg-primary hover:text-bg-deep"
          >
            &lt;/&gt; View on GitHub
          </a>
          <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 font-mono text-xs text-primary">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
            {featuredProject.status}
          </span>
        </div>
      </Panel>

      {/* Secondary grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((proj) => (
          <Panel key={proj.title} hover className="reveal-up flex flex-col p-7">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">
              {proj.number}
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{proj.title}</h3>
            <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-text-dim">
              {proj.body}
            </p>
            <div className="mt-5">
              <TechTags tech={proj.tech} />
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
