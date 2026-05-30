import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to the element (and any descendants marked `.reveal-up`)
 * the first time it scrolls into view. Pair with the `.reveal-up` utility.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = [el, ...Array.from(el.querySelectorAll<HTMLElement>(".reveal-up"))];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((t) => {
      if (t.classList.contains("reveal-up")) observer.observe(t);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
