import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  prefix?: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
};

/**
 * Types `text` out character-by-character behind a `prefix`, leaving a
 * blinking underscore cursor — the terminal-prompt effect.
 * Honors prefers-reduced-motion by rendering the full string immediately.
 */
export function Typewriter({
  text,
  prefix = "> ",
  className = "",
  speed = 85,
  startDelay = 450,
}: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let tick: ReturnType<typeof setTimeout>;
    const start = setTimeout(function step() {
      i += 1;
      setCount(i);
      if (i < text.length) tick = setTimeout(step, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(tick);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      <span className="text-text-muted">{prefix}</span>
      {text.slice(0, count)}
      <span className="term-cursor">_</span>
    </span>
  );
}
