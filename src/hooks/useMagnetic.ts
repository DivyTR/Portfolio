import { useEffect, useRef } from "react";

/**
 * Makes an element gently pull toward the cursor while hovered, springing
 * back on leave. Only active on fine-pointer, non-reduced-motion devices —
 * touch and reduced-motion users get a plain button.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => {
      el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return ref;
}
