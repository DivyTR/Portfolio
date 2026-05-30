import { experience } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        label="career path"
        title="Experience & Operations"
        desc="From security internships to enterprise SOC operations — building depth at every stage."
      />

      <div className="relative mt-12 pl-8 md:pl-10">
        {/* Vertical timeline spine */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <div key={job.company} className="reveal-up relative">
              {/* Glowing dot */}
              <span
                className={`absolute -left-[39px] top-2 h-4 w-4 rounded-full border-2 border-primary md:-left-[49px] ${
                  i === 0 ? "bg-primary" : "bg-bg-deep"
                }`}
                style={{ boxShadow: "0 0 12px var(--glow-soft)" }}
              />
              <Panel hover className="p-7">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                    <div className="text-sm text-primary">{job.company}</div>
                  </div>
                  <span className="whitespace-nowrap rounded-md bg-bg-deep/60 px-3 py-1 font-mono text-xs text-text-muted">
                    {job.date}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="relative pl-4 text-sm font-light leading-relaxed text-text-dim before:absolute before:left-0 before:text-primary before:content-['›']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
