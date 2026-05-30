import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollSignal } from "../hooks/useScrollProgress";

/**
 * Flies the camera along a curved trench path as the user scrolls.
 * Scroll 0..1 maps to arc-length position along a Catmull-Rom curve;
 * the look-at target is a point slightly further along the same curve,
 * so the camera always faces "into" the tunnel. Pointer adds parallax.
 */
export function CameraRig() {
  const smoothed = useRef(0);

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        // Straight, centered launch -> symmetric grid convergence at the top.
        new THREE.Vector3(0, 1.3, 18),
        new THREE.Vector3(0, 1.2, 9),
        new THREE.Vector3(0, 1.1, 0),
        // Bank into the weave once the user starts scrolling.
        new THREE.Vector3(3.2, 0.5, -14),
        new THREE.Vector3(-3.2, 1.5, -27),
        new THREE.Vector3(1.5, 2.2, -41),
        new THREE.Vector3(-1, 0.8, -55),
        new THREE.Vector3(0, 1.5, -70),
      ]),
    [],
  );

  const pos = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    // Ease toward the scroll position for smooth, inertial motion.
    const k = 1 - Math.pow(0.0001, delta); // frame-rate independent damping
    smoothed.current += (scrollSignal.current - smoothed.current) * k;
    const t = THREE.MathUtils.clamp(smoothed.current, 0, 1);

    path.getPointAt(t, pos);
    pos.x += state.pointer.x * 0.9;
    pos.y += state.pointer.y * 0.45;
    state.camera.position.lerp(pos, 0.12);

    path.getPointAt(Math.min(t + 0.045, 1), target);
    state.camera.lookAt(target);
  });

  return null;
}
