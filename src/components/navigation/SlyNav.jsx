import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { socials } from '../../data/portfolioData';
import LiveClock from '../ui/LiveClock';
import MagneticButton from '../ui/MagneticButton';
import CelestialThemeToggle from '../ui/CelestialThemeToggle';

export default function SlyNav({ onOpenTerminal, onOpenBridge }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isSwitching } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggleClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(e, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const navLinks = [
    { label: 'JOURNEY', href: '#journey' },
    { label: 'STORY', href: '#story' },
    { label: 'LAB', href: '#engine' },
    { label: 'INCIDENTS', href: '#incidents' },
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'EXPERIENCE', href: '#log' },
    { label: 'CONNECT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-[#FAF8F5]/95 dark:bg-[#000000]/95 backdrop-blur-md border-b border-[#121212]/10 dark:border-[#1F1F1F] shadow-xs'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4 relative">
          {/* Stark Typography-Only Logo Mark */}
          <a href="#" className="flex items-center gap-2 group shrink-0 select-none">
            <span className="font-display font-black text-lg sm:text-xl tracking-tighter uppercase text-[#121212] dark:text-white group-hover:text-[#0052FF] dark:group-hover:text-[#00FF66] transition-colors">
              GAJENDRA<span className="text-[#0052FF] dark:text-[#00FF66] font-mono font-medium ml-1">//</span>
            </span>
            <span className="font-mono text-[9px] text-[#5A5A57] dark:text-[#888888] tracking-widest uppercase hidden sm:inline-block">
              RAJPUT
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 xl:gap-7 font-mono text-xs font-semibold tracking-widest uppercase shrink">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#5A5A57] dark:text-[#888888] hover:text-[#121212] dark:hover:text-white transition-colors duration-200 relative py-1 whitespace-nowrap group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0052FF] dark:bg-[#00FF66] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Controls: Live Clock + Celestial Theme Switcher + Resume + Terminal + Bridge */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5 shrink-0">
            <LiveClock showStatus={false} className="hidden xl:flex mr-1" />

            {/* Custom Signature Celestial Solar ↔ Eclipse Toggle */}
            <CelestialThemeToggle
              id="theme-toggle-desktop-btn"
              theme={theme}
              isSwitching={isSwitching}
              onToggle={handleThemeToggleClick}
            />

            {/* Direct 1-Click Recruiter Resume Button */}
            <a
              href="/resume/Gajendra_Rajput_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10.5px] sm:text-xs font-bold px-3 py-2 border border-[#0052FF] text-[#0052FF] dark:text-[#00E5FF] hover:bg-[#0052FF] hover:text-white uppercase tracking-wider transition-all shrink-0 cursor-pointer pointer-events-auto"
            >
              RESUME ↓
            </a>

            <button
              type="button"
              onClick={onOpenTerminal}
              className="font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 bg-[#121212] dark:bg-[#111111] hover:bg-[#0052FF] text-white border border-[#121212] dark:border-[#2A2A2A] uppercase tracking-wider transition-all cursor-pointer pointer-events-auto shrink-0 hidden lg:block"
            >
              CLI
            </button>

            <MagneticButton>
              <button
                type="button"
                onClick={onOpenBridge}
                className="font-mono text-[11px] sm:text-xs font-bold px-3.5 sm:px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#0052FF]/20 cursor-pointer pointer-events-auto shrink-0 whitespace-nowrap"
              >
                <span>CONNECT</span>
                <span>→</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile/Tablet Menu Toggle & Theme Switcher */}
          <div className="xl:hidden flex items-center gap-2">
            <CelestialThemeToggle
              id="theme-toggle-mobile-btn"
              theme={theme}
              isSwitching={isSwitching}
              onToggle={handleThemeToggleClick}
              compact
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#121212]/20 dark:border-[#333] text-[#121212] dark:text-white cursor-pointer pointer-events-auto"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#FAF8F5] dark:bg-[#000000] flex flex-col justify-between p-8 xl:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="pt-20 flex flex-col gap-6 font-display">
          <span className="font-mono text-xs text-[#5A5A57] dark:text-[#888888] tracking-widest uppercase mb-2">// SLY NETWORK NAVIGATION</span>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold uppercase tracking-tight text-[#121212] dark:text-white hover:text-[#0052FF] dark:hover:text-[#00FF66] transition-colors flex items-center justify-between border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-3"
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-[#8E8E8A]">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-[#121212]/10 dark:border-[#1F1F1F] font-mono text-xs text-[#5A5A57] dark:text-[#888888]">
          <CelestialThemeToggle
            id="theme-toggle-drawer-btn"
            theme={theme}
            isSwitching={isSwitching}
            onToggle={handleThemeToggleClick}
            className="w-full py-3"
          />

          <a
            href="/resume/Gajendra_Rajput_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-[#0052FF] text-white font-bold uppercase tracking-wider text-center cursor-pointer pointer-events-auto shadow-md"
          >
            VIEW RESUME (PDF) ↓
          </a>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBridge();
            }}
            className="w-full py-3 border border-[#121212]/30 dark:border-[#333] text-[#121212] dark:text-white font-bold uppercase tracking-wider text-center cursor-pointer pointer-events-auto"
          >
            CONTACT ME →
          </button>
        </div>
      </div>
    </>
  );
}
