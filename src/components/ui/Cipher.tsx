import { createElement, useRef, useState, type ElementType } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

type CipherProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Decrypts text on hover with a scrambling animation — the signature
 * "cipher" effect from the legacy site, reimplemented as a component.
 */
export function Cipher({ text, as, className = "" }: CipherProps) {
  const Tag = (as ?? "span") as ElementType;
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    if (interval.current) clearInterval(interval.current);
    frame.current = 0;
    interval.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < frame.current) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (frame.current >= text.length && interval.current) {
        clearInterval(interval.current);
        setDisplay(text);
      }
      frame.current += 1 / 3;
    }, 30);
  };

  return createElement(Tag, { className, onMouseEnter: scramble }, display);
}
