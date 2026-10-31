import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import EntryModal from "./components/audio/EntryModal";
import SoundToggle from "./components/audio/SoundToggle";
import { useAudioStore } from "./store/useAudioStore";
import { playSound } from "./lib/sounds";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Gallery from "./pages/Gallery";
import Lab from "./pages/Lab";
import WorkWithMe from "./pages/WorkWithMe";

export default function App() {
  const location = useLocation();
  const hasEntered = useAudioStore((s) => s.hasEntered);

  useEffect(() => {
    if (hasEntered) playSound("transition");
  }, [location.pathname]);

  return (
    <>
      <EntryModal />
      <SoundToggle />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}