import { useState } from "react";
import { skills, skillFilters } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

export function Skills() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <Section id="skills">
      <SectionHeading
        label="capabilities"
        title="Tactical Matrix"
        desc="Filter by domain to explore my technical arsenal through a MITRE-inspired lens."
      />

      <div className="reveal-up mt-8 flex flex-wrap gap-3">
        {skillFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wide transition-all ${
              filter === f.value
                ? "bg-primary text-bg-deep"
                : "glass-panel text-text-dim hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="reveal-up mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((card) => {
          const active = filter === "all" || card.category === filter;
          return (
            <Panel
              key={card.title}
              hover
              className={`p-7 transition-all duration-300 ${
                active ? "opacity-100" : "scale-[0.97] opacity-25"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-deep/60 text-xl">
                {card.icon}
              </div>
              <h3 className="mb-3 text-lg font-semibold tracking-tight">{card.title}</h3>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => {
                  const highlight = filter !== "all" && card.category === filter;
                  return (
                    <span
                      key={tag}
                      className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                        highlight
                          ? "bg-primary font-medium text-bg-deep"
                          : "bg-bg-deep/60 text-text-dim"
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </Panel>
          );
        })}
      </div>
    </Section>
  );
}
