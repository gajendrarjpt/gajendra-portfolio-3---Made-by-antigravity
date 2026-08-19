import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import BrandedLoader from './components/loader/BrandedLoader';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import FilmGrainOverlay from './components/ui/FilmGrainOverlay';
import SlyNav from './components/navigation/SlyNav';
import SlyHero from './components/hero/SlyHero';
import CareerStory from './components/about/CareerStory';
import IntelligenceEngine from './components/lab/IntelligenceEngine';
import ScreeningRoom from './components/notes/ScreeningRoom';
import CapabilitiesIndex from './components/expertise/CapabilitiesIndex';
import CareerLog from './components/experience/CareerLog';
import ContactBridge from './components/contact/ContactBridge';
import SlyFooter from './components/footer/SlyFooter';
import NocTerminalDrawer from './components/terminal/NocTerminalDrawer';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenBridge = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <BrandedLoader onComplete={() => setLoadingComplete(true)} />

      <FilmGrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      
      <SlyNav 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenBridge={handleOpenBridge}
      />
      
      <NocTerminalDrawer 
        externalOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      <main className={`transition-opacity duration-700 ${loadingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <SlyHero onOpenBridge={handleOpenBridge} />
        
        <div id="about">
          <CareerStory />
        </div>

        <IntelligenceEngine />
        <ScreeningRoom />
        <CapabilitiesIndex />
        <CareerLog />
        <ContactBridge onOpenBridge={handleOpenBridge} />
      </main>

      <SlyFooter />
    </ThemeProvider>
  );
}
