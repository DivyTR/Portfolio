import { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates a numeric value up from 0 the first time it scrolls into view,
 * preserving any prefix/suffix (e.g. "100+", "3×", "46.7%"). Falls back to
 * the final value immediately when reduced-motion is requested or the value
 * has no number to count.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [text, setText] = useState(() =>
    match && !reduced() ? `${match[1]}0${match[3]}` : value,
  );

  useEffect(() => {
    if (!match || reduced()) {
      setText(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setText(`${prefix}${(eased * target).toFixed(decimals)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
          else setText(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
