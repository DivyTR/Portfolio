import { Component, lazy, Suspense, type ReactNode } from "react";

const CyberScene = lazy(() => import("../three/CyberScene"));

/** Static CSS fallback shown if WebGL fails or is disabled. */
function StaticBackdrop() {
  return (
    <div
      className="grid-bg fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(18% 0.05 155) 0%, oklch(10% 0.025 155) 70%)",
      }}
    />
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <StaticBackdrop />;
    return this.props.children;
  }
}

/** The fixed 3D world behind all content, with graceful degradation. */
export function SceneBackground() {
  return (
    <WebGLBoundary>
      <Suspense fallback={<StaticBackdrop />}>
        <CyberScene />
      </Suspense>
    </WebGLBoundary>
  );
}
