import { useScrollProgress } from "../hooks/useScrollProgress";

export function ScrollProgressBar() {
  const { progress } = useScrollProgress();
  return (
    <div
      className="scroll-progress fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
