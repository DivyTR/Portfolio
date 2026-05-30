import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "./palette";

/**
 * Thousands of falling green particles ("matrix rain") rendered as a single
 * THREE.Points. Positions are mutated in place each frame and wrapped to the
 * top when they fall below the floor — cheap and GPU-friendly.
 */
export function MatrixRain({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = Math.random() * 46 - 10;
      positions[i * 3 + 2] = -72 + Math.random() * 92;
      speeds[i] = 2.5 + Math.random() * 7;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * dt; // fall
      arr[i * 3 + 2] -= speeds[i] * dt * 0.32; // drift into the screen (tilt toward vanishing point)
      if (arr[i * 3 + 1] < -12) arr[i * 3 + 1] = 36;
      if (arr[i * 3 + 2] < -76) arr[i * 3 + 2] = 18;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color={palette.rain}
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
