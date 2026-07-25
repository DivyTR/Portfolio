import { about, stats } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";
import { CountUp } from "../ui/CountUp";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        label="about me"
        title={about.heading}
        desc="Building secure systems, breaking insecure ones, and bridging the gap between compliance and real-world threats."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Panel className="reveal-up relative overflow-hidden p-8" hover>
          <span className="border-beam" />
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-[0.95rem] font-light leading-relaxed text-text-dim">
                {p}
              </p>
            ))}
          </div>
        </Panel>

        <div className="reveal-up grid grid-cols-2 gap-5">
          {stats.map((stat) => (
            <Panel
              key={stat.label}
              hover
              className="flex flex-col items-center justify-center p-6 text-center"
            >
              <CountUp
                value={stat.value}
                className="font-mono text-3xl font-bold text-primary crt-glow sm:text-4xl"
              />
              <div className="mt-2 text-xs uppercase tracking-wider text-text-muted">
                {stat.label}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Section>
  );
}
