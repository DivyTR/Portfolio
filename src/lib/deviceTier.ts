/**
 * Picks a rendering tier for the current device so the 3D scene never tanks
 * performance on weak / GPU-less environments (e.g. Azure Virtual Desktop,
 * remote desktops, low-end laptops).
 *
 *  - "high" : real GPU, plenty of cores -> full-quality scene
 *  - "low"  : mobile / few cores -> reduced scene (dpr 1, fewer particles)
 *  - "off"  : software WebGL / reduced-motion / tiny RAM -> no WebGL at all,
 *             falls back to the static CSS backdrop
 */
export type Tier = "high" | "low" | "off";

let cached: Tier | null = null;

/** True when WebGL is missing or backed by a CPU software rasterizer. */
function isSoftwareRenderer(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    // SwiftShader = Chrome software GL (AVD/headless); llvmpipe/mesa = Linux software;
    // "Basic Render" = Windows fallback driver; virgl = virtualized GPU.
    return /swiftshader|llvmpipe|software|basic render|mesa offscreen|virgl|paravirtual/i.test(
      renderer,
    );
  } catch {
    return true;
  }
}

function computeTier(): Tier {
  if (typeof window === "undefined") return "high";

  // Manual override for testing / debugging, e.g. ?perf=off or ?perf=high
  const forced = new URLSearchParams(window.location.search).get("perf");
  if (forced === "high" || forced === "low" || forced === "off") return forced;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (isSoftwareRenderer()) return "off";

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem <= 2) return "off";

  const cores = navigator.hardwareConcurrency || 8;
  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (coarse || cores <= 4 || (mem !== undefined && mem <= 4)) return "low";

  return "high";
}

/** Cached so every caller (App, SceneBackground) agrees on one tier. */
export function getTier(): Tier {
  if (cached === null) cached = computeTier();
  return cached;
}
