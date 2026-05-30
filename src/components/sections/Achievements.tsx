import { achievements } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        label="recognition"
        title="Achievements"
        desc="Hackathon wins, published research, and academic recognition."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <Panel key={a.title} hover className="reveal-up flex flex-col items-center p-7 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-deep/60 text-2xl">
              {a.icon}
            </div>
            <h3 className="text-base font-semibold tracking-tight">{a.title}</h3>
            <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-text-dim">{a.body}</p>
            {a.prize && (
              <span className="mt-3 rounded-md bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                {a.prize}
              </span>
            )}
            {a.link && (
              <a
                href={a.link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 rounded-md bg-primary/10 px-3 py-1 font-mono text-[0.7rem] text-primary hover:bg-primary hover:text-bg-deep"
              >
                {a.link.label}
              </a>
            )}
          </Panel>
        ))}
      </div>
    </Section>
  );
}
