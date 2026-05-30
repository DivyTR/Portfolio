import { useEffect, useState } from "react";
import { bootLines, bootAscii } from "../data/content";

const toneClass: Record<string, string> = {
  ok: "text-primary",
  warn: "text-warn",
  err: "text-alert",
  white: "text-text",
  dim: "text-text-muted",
};

/**
 * The DivyOS boot sequence. Streams lines, fills a progress bar, then fades
 * out and unmounts. Honors prefers-reduced-motion by skipping fast.
 */
export function BootScreen() {
  const [visible, setVisible] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? 20 : 150;

    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), step * (i + 1)));
    });
    const total = step * (bootLines.length + 1);
    timers.push(setTimeout(() => setDone(true), total));
    timers.push(setTimeout(() => setGone(true), total + 700));

    document.body.style.overflow = "hidden";
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (gone) return null;

  const progress = (visible / bootLines.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-deep transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[90%] max-w-xl font-mono text-[0.8rem] text-text-muted">
        <pre className="mb-6 whitespace-pre text-center text-[0.55rem] leading-tight text-primary crt-glow sm:text-[0.7rem]">
          {bootAscii}
        </pre>

        <div className="min-h-[230px]">
          {bootLines.slice(0, visible).map((line, i) => (
            <div key={i} className={`mb-1 leading-relaxed ${line.tone ? toneClass[line.tone] : ""}`}>
              {line.text || " "}
            </div>
          ))}
        </div>

        <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px var(--glow-mid)" }}
          />
        </div>
      </div>
    </div>
  );
}
