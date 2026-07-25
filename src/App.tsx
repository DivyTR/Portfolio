import { useEffect } from "react";
import { useGlobalScrollSignal } from "./hooks/useScrollProgress";
import { getTier } from "./lib/deviceTier";
import { SceneBackground } from "./components/SceneBackground";
import { BootScreen } from "./components/BootScreen";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { TerminalHUD } from "./components/TerminalHUD";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Achievements } from "./components/sections/Achievements";
import { Credentials } from "./components/sections/Credentials";
import { Contact } from "./components/sections/Contact";
import { profile } from "./data/content";

export default function App() {
  // Feeds the module-level scroll signal that drives the 3D camera rig.
  useGlobalScrollSignal();

  // Expose the device tier to CSS (drops backdrop blur on weak/GPU-less devices).
  useEffect(() => {
    document.documentElement.dataset.perf = getTier();
  }, []);

  return (
    <>
      {/* z-[-10] WebGL world */}
      <SceneBackground />
      {/* z-[-5] grid depth overlay */}
      <div className="grid-bg pointer-events-none fixed inset-0 -z-[5]" />

      {/* Overlays */}
      <BootScreen />
      <ScrollProgressBar />
      <CustomCursor />
      <div className="scanlines" />

      {/* Chrome + content */}
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Credentials />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-primary/10 py-10 text-center font-mono text-xs text-text-muted">
        © 2026 {profile.firstName} {profile.lastName} · Built with React + Three.js · {profile.location}
      </footer>

      <TerminalHUD />
    </>
  );
}
