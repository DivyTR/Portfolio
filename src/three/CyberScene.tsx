import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { MatrixRain } from "./MatrixRain";
import { FloatingGeometry } from "./FloatingGeometry";
import { Trench } from "./Trench";
import { palette } from "./palette";

/**
 * The persistent WebGL world that sits fixed behind every section.
 * Lazy-loaded from App so the heavy 3D bundle is split out of the
 * initial paint.
 */
export default function CyberScene() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      camera={{ fov: 72, near: 0.1, far: 140, position: [0, 1.2, 16] }}
    >
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 14, 78]} />
      <ambientLight intensity={0.7} />

      <Suspense fallback={null}>
        <CameraRig />
        <Trench />
        <FloatingGeometry />
        <MatrixRain count={1400} />
      </Suspense>
    </Canvas>
  );
}
