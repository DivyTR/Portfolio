import { useEffect } from "react";
import Lenis from "lenis";
import { getTier } from "../lib/deviceTier";

/**
 * Momentum / smooth scrolling via Lenis — amplifies the scroll-driven 3D
 * camera. Skipped on the "off" tier (software-GL / reduced-motion / weak
 * devices) so it never adds overhead where we're already degrading.
 *
 * Lenis drives the real scroll position, so existing window "scroll"
 * listeners (camera rig, progress bar) keep working unchanged.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (getTier() === "off") return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // Route in-page anchor clicks (nav, hero buttons, scroll cue) through Lenis.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}
