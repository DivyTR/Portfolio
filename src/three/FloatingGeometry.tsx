import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "./palette";

type Item = {
  pos: [number, number, number];
  scale: number;
  kind: 0 | 1 | 2;
  speed: number;
};

/**
 * Scattered wireframe solids (icosahedron / torus-knot / octahedron) that
 * rotate slowly through the trench — purely decorative depth cues.
 * Uses a tiny seeded RNG so the layout is stable across reloads.
 */
export function FloatingGeometry() {
  const group = useRef<THREE.Group>(null);

  const items = useMemo<Item[]>(() => {
    let seed = 9173;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 18 }, (_, i) => {
      const depth = -3 - i * 4.2 - rand() * 3;
      // The nearest shapes (small i) are pushed toward the edges so the
      // opening view frames the title instead of clustering in the centre.
      const edgeBias = i < 6 ? 1.5 : 1;
      const x = (rand() - 0.5) * 24 * edgeBias;
      const y = rand() * 15 - 4;
      return {
        pos: [x, y, depth] as [number, number, number],
        scale: 0.55 + rand() * 1.5,
        kind: Math.floor(rand() * 3) as 0 | 1 | 2,
        speed: 0.08 + rand() * 0.4,
      };
    });
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.children.forEach((child, i) => {
      child.rotation.x += dt * items[i].speed;
      child.rotation.y += dt * items[i].speed * 0.7;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale}>
          {it.kind === 0 && <icosahedronGeometry args={[1, 0]} />}
          {it.kind === 1 && <torusKnotGeometry args={[0.7, 0.22, 80, 10]} />}
          {it.kind === 2 && <octahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial
            color={i % 3 === 0 ? palette.wireAlt : palette.wire}
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
      ))}
    </group>
  );
}
