import { Cipher } from "./Cipher";

type SectionHeadingProps = {
  label: string;
  title: string;
  desc?: string;
  center?: boolean;
};

export function SectionHeading({ label, title, desc, center = false }: SectionHeadingProps) {
  return (
    <div className={`reveal-up ${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      <div className="section-label mb-3">// {label}</div>
      <Cipher
        as="h2"
        text={title}
        className="heading-shimmer crt-glow text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-tight cursor-crosshair"
      />
      {desc && (
        <p className={`mt-4 text-text-dim font-light leading-relaxed ${center ? "mx-auto" : ""}`}>
          {desc}
        </p>
      )}
    </div>
  );
}
