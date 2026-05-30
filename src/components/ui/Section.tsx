import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** Standard section shell: max width, vertical rhythm, scroll-reveal scope. */
export function Section({ id, children, className = "" }: SectionProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
