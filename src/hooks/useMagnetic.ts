import { useEffect, useRef } from "react";

/**
 * Magnetic hover: the element leans toward the cursor as it *approaches*
 * (from up to `radius` px outside the element's edges) and springs back once
 * the cursor leaves that zone. Fine-pointer, non-reduced-motion devices only.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.4, radius = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    let active = false;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const inZone =
        Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;

      if (inZone) {
        active = true;
        el.style.transition = "transform 0.18s ease-out";
        el.style.transform = `translate(${clamp(dx * strength, 36)}px, ${clamp(
          dy * strength,
          24,
        )}px)`;
      } else if (active) {
        active = false;
        el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform = "";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, radius]);

  return ref;
}
