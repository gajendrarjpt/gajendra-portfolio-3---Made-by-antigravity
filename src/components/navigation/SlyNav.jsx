import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { socials } from '../../data/portfolioData';
import LiveClock from '../ui/LiveClock';
import MagneticButton from '../ui/MagneticButton';

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

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'ENGINE', href: '#engine' },
    { label: 'SCREENING ROOM', href: '#screening-room' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'CAREER LOG', href: '#log' },
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

          {/* Action Controls: Live Clock + Theme Switcher + Terminal + Bridge */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            <LiveClock showStatus={false} className="hidden lg:flex mr-2" />

            {/* Prominent Dark/Light Theme Button with Trending SVG Icons */}
            <button
              type="button"
              id="theme-toggle-desktop-btn"
              data-theme-toggle="true"
              disabled={isSwitching}
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                toggleTheme(e, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              }}
              className={`font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase w-[86px] sm:w-[94px] justify-center py-2 border border-[#121212]/30 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white bg-[#F4F1EA] dark:bg-[#111111] text-[#121212] dark:text-white transition-all flex items-center gap-2 shrink-0 group ${
                isSwitching ? 'pointer-events-none opacity-80' : 'cursor-pointer pointer-events-auto'
              }`}
              title="Toggle Dark / Light Theme"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#00FF66] transition-transform duration-300 group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#0052FF] transition-transform duration-300 group-hover:-rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span>DARK</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenTerminal}
              className="font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 bg-[#121212] dark:bg-[#111111] hover:bg-[#0052FF] text-white border border-[#121212] dark:border-[#2A2A2A] uppercase tracking-wider transition-all cursor-pointer pointer-events-auto shrink-0"
            >
              CTRL+K TERMINAL
            </button>

            <MagneticButton>
              <button
                type="button"
                onClick={onOpenBridge}
                className="font-mono text-[11px] sm:text-xs font-bold px-3.5 sm:px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#0052FF]/20 cursor-pointer pointer-events-auto shrink-0 whitespace-nowrap"
              >
                <span>INITIATE BRIDGE</span>
                <span>→</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile/Tablet Menu Toggle & Theme Switcher */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              type="button"
              id="theme-toggle-mobile-btn"
              data-theme-toggle="true"
              disabled={isSwitching}
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                toggleTheme(e, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              }}
              className={`font-mono text-[10px] font-bold w-[78px] justify-center py-1.5 border border-[#121212]/30 dark:border-[#333] text-[#121212] dark:text-white uppercase bg-[#F4F1EA] dark:bg-[#111111] flex items-center gap-1.5 ${
                isSwitching ? 'pointer-events-none opacity-80' : 'cursor-pointer pointer-events-auto'
              }`}
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-3 h-3 text-[#00FF66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
                  </svg>
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span>DARK</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-end gap-1.5 p-2 focus:outline-none cursor-pointer pointer-events-auto"
              aria-label="Toggle Navigation Menu"
            >
              <div className={`h-[2px] bg-[#121212] dark:bg-white transition-all ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <div className={`h-[2px] bg-[#121212] dark:bg-white transition-all ${mobileMenuOpen ? 'opacity-0 w-6' : 'w-4'}`} />
              <div className={`h-[2px] bg-[#121212] dark:bg-white transition-all ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
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
          <button
            type="button"
            id="theme-toggle-drawer-btn"
            data-theme-toggle="true"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              toggleTheme(e, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            className="w-full py-3 border border-[#121212]/30 dark:border-[#333] text-[#121212] dark:text-white font-bold uppercase tracking-wider text-center cursor-pointer pointer-events-auto flex items-center justify-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <svg className="w-4 h-4 text-[#00FF66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
                </svg>
                <span>SWITCH TO LIGHT MODE</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
                <span>SWITCH TO DARK MODE</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBridge();
            }}
            className="w-full py-3 bg-[#0052FF] text-white font-bold uppercase tracking-wider text-center cursor-pointer pointer-events-auto"
          >
            INITIATE BRIDGE →
          </button>
        </div>
      </div>
    </>
  );
}
