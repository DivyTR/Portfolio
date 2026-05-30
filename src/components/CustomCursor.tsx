import { useEffect, useRef, useState } from "react";

/**
 * Dual-ring custom cursor with smooth trailing ring. Disabled on touch /
 * coarse-pointer devices where a custom cursor only gets in the way.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    setEnabled(true);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${mx}px`;
        dot.current.style.top = `${my}px`;
      }
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, .glass-panel-hover");
      ring.current?.classList.toggle("cursor-ring-hover", !!interactive);
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ boxShadow: "0 0 8px var(--glow)" }}
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed z-[80] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 transition-[width,height,background-color] duration-200"
      />
    </>
  );
}
