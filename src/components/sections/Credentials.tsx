import { certs, education } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

export function Credentials() {
  return (
    <Section id="certifications">
      <SectionHeading label="credentials" title="Certifications & Education" />

      <div className="reveal-up mt-10 flex flex-wrap gap-5">
        {certs.map((c) => (
          <Panel
            key={c.title}
            hover
            className="flex flex-1 items-center gap-4 p-5 sm:min-w-[280px]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-deep/60 text-lg">
              {c.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium">{c.title}</h4>
              <span className="text-xs text-text-muted">{c.issuer}</span>
            </div>
          </Panel>
        ))}
      </div>

      <Panel hover className="reveal-up mt-6 flex flex-col items-start gap-6 p-8 sm:flex-row">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bg-deep/60 text-2xl">
          {education.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{education.degree}</h3>
          <div className="mt-1 text-sm text-primary">{education.school}</div>
          <div className="mt-1 font-mono text-xs text-text-muted">{education.period}</div>
          <p className="mt-3 text-sm font-light leading-relaxed text-text-dim">{education.body}</p>
        </div>
      </Panel>
    </Section>
  );
}
