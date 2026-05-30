import { profile } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Panel } from "../ui/Panel";

const channels = [
  { icon: "✉", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "📱", label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: "in", label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
  { icon: "</>", label: "GitHub", value: profile.githubHandle, href: profile.github },
];

export function Contact() {
  return (
    <Section id="contact" className="text-center">
      <SectionHeading
        center
        label="let's connect"
        title="Establish Secure Connection"
        desc="Open to cyber risk, GRC, and VAPT-focused roles. Let's talk."
      />

      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="reveal-up min-w-[160px] flex-1 sm:max-w-[220px]"
          >
            <Panel hover className="flex h-full flex-col items-center gap-3 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-deep/60 font-mono text-lg text-primary">
                {c.icon}
              </div>
              <div className="text-xs uppercase tracking-wider text-text-muted">{c.label}</div>
              <div className="break-all text-sm text-text-dim">{c.value}</div>
            </Panel>
          </a>
        ))}
      </div>
    </Section>
  );
}
