import { useEffect, useRef, useState } from "react";

/**
 * Tracks page scroll as a 0..1 progress value.
 * Uses a ref for high-frequency reads (e.g. the 3D camera rig in useFrame)
 * and React state for UI that needs to re-render (the progress bar).
 */
export function useScrollProgress() {
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressRef.current = p;
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { progress, progressRef };
}

/**
 * Module-level scroll signal shared between the DOM and the WebGL canvas
 * without prop-drilling through the R3F tree. Read in useFrame for smooth,
 * render-loop-driven camera motion.
 */
export const scrollSignal = { current: 0 };

export function useGlobalScrollSignal() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollSignal.current = max > 0 ? window.scrollY / max : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
}
