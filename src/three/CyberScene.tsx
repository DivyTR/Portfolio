import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { MatrixRain } from "./MatrixRain";
import { FloatingGeometry } from "./FloatingGeometry";
import { Trench } from "./Trench";
import { palette } from "./palette";
import type { Tier } from "../lib/deviceTier";

/**
 * The persistent WebGL world that sits fixed behind every section.
 * Lazy-loaded from SceneBackground so the heavy 3D bundle is split out of
 * the initial paint. Quality scales with the device tier, the render loop
 * pauses when the tab is hidden, and DPR adapts down if the frame rate drops.
 */
export default function CyberScene({ tier }: { tier: Exclude<Tier, "off"> }) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  // Stop rendering entirely while the tab is in the background.
  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const high = tier === "high";
  const dpr: [number, number] = high ? [1, 1.5] : [1, 1];
  const rainCount = high ? 1400 : 650;

  return (
    <Canvas
      frameloop={frameloop}
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
      gl={{ antialias: high, alpha: false, powerPreference: "high-performance" }}
      dpr={dpr}
      camera={{ fov: 72, near: 0.1, far: 140, position: [0, 1.2, 16] }}
    >
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 14, 78]} />
      <ambientLight intensity={0.7} />

      <Suspense fallback={null}>
        {/* Auto-reduce resolution if the GPU can't keep up. */}
        <PerformanceMonitor factor={1}>
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>

        <CameraRig />
        <Trench />
        <FloatingGeometry />
        <MatrixRain count={rainCount} />
      </Suspense>
    </Canvas>
  );
}
