import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import CinematicCursor from "./components/CinematicCursor";
import Scanlines from "./components/Scanlines";
import DataStream from "./components/DataStream";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MissionControl from "./components/MissionControl";
import ProjectsSection from "./components/ProjectsSection";
import ResearchSection from "./components/ResearchSection";
import TechArsenal from "./components/TechArsenal";
import Timeline from "./components/Timeline";
import ContactSection from "./components/ContactSection";
import AIChatbot from "./components/AIChatbot";
import AICommandTerminal from "./components/AICommandTerminal";
import EasterEgg from "./components/EasterEgg";
import MusicToggle from "./components/MusicToggle";
import Footer from "./components/Footer";
import { useDeviceProfile } from "./hooks/useDeviceProfile";

const CinematicBackdrop = lazy(() => import("./components/CinematicBackdrop"));

function VisitorCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const stored = localStorage.getItem("haswin_visits");
    const visits = stored ? parseInt(stored, 10) + 1 : 1;
    localStorage.setItem("haswin_visits", visits.toString());
    setCount(visits);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 glass-panel px-3 py-2 rounded-lg hidden md:flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-[10px] font-mono text-white/40">
        VISITORS: {count.toString().padStart(4, "0")}
      </span>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const deviceProfile = useDeviceProfile();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Removed global `c` key toggle to avoid accidental chatbot toggles.
    // If you want a keyboard shortcut later, re-enable with a different key.
    return;
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Global effects */}
          {!deviceProfile.isMobile && !deviceProfile.isReducedMotion && (
            <Suspense fallback={null}>
              <CinematicBackdrop
                enabled={!deviceProfile.isLowPower}
                mobile={deviceProfile.isMobile}
                reducedMotion={deviceProfile.isReducedMotion}
              />
            </Suspense>
          )}
          <ParticleBackground
            dense={!deviceProfile.isMobile && !deviceProfile.isLowPower}
            reducedMotion={deviceProfile.isReducedMotion}
          />
          {!deviceProfile.isMobile && !deviceProfile.isReducedMotion && <CinematicCursor />}
          {!deviceProfile.isReducedMotion && <Scanlines />}
          {!deviceProfile.isMobile && !deviceProfile.isReducedMotion && <DataStream />}

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main>
            <HeroSection />
            <AboutSection />
            <MissionControl />
            <ResearchSection />
            <ProjectsSection />
            <TechArsenal />
            <Timeline />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Extra features */}
          <AIChatbot />
          <AICommandTerminal />
          <EasterEgg />
          <MusicToggle />
          <VisitorCounter />
        </motion.div>
      )}
    </div>
  );
}
