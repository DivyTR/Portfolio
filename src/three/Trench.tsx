import * as THREE from "three";
import { Grid } from "@react-three/drei";
import { palette } from "./palette";

/** Angular wireframe walls flanking the camera path — the "trench" feel. */
function Wall({ side }: { side: 1 | -1 }) {
  return (
    <mesh
      position={[10 * side, 3, -24]}
      rotation={[0, (-side * Math.PI) / 2.3, 0]}
    >
      <planeGeometry args={[100, 28, 40, 11]} />
      <meshBasicMaterial
        color={palette.gridCell}
        wireframe
        transparent
        opacity={0.14}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function Trench() {
  return (
    <group>
      <Wall side={1} />
      <Wall side={-1} />

      {/* Toned-down Tron floor */}
      <Grid
        position={[0, -3.6, -24]}
        args={[140, 140]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        cellColor={palette.gridCell}
        sectionSize={5}
        sectionThickness={1}
        sectionColor={palette.grid}
        fadeDistance={62}
        fadeStrength={3}
      />

      {/* Faint ceiling grid for enclosure */}
      <Grid
        position={[0, 17, -24]}
        args={[140, 140]}
        infiniteGrid
        cellSize={2}
        cellThickness={0.4}
        cellColor={palette.gridCell}
        sectionSize={10}
        sectionThickness={0.8}
        sectionColor={palette.ceiling}
        fadeDistance={50}
        fadeStrength={3.5}
      />
    </group>
  );
}
