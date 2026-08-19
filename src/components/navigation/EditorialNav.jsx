import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { socials } from '../../data/portfolioData';

export default function EditorialNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'STORY', href: '#story' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'NETWORK LAB', href: '#lab' },
    { label: 'NOTES', href: '#notes' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-[#FAF8F5]/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-[#121212]/10 dark:border-[#222222] shadow-xs'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <a
            href="#"
            data-cursor="HOME"
            className="group flex items-center gap-3 text-left"
          >
            <div className="w-2.5 h-2.5 bg-[#0052FF] transition-transform duration-300 group-hover:scale-125" />
            <div>
              <span className="font-display font-bold text-sm md:text-base tracking-tight uppercase block leading-none text-[#121212] dark:text-[#F4F4F0]">
                GAJENDRA RAJPUT
              </span>
              <span className="font-mono text-[9px] text-[#5A5A57] dark:text-[#A0A09C] tracking-wider uppercase block mt-0.5">
                SENIOR NETWORK ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 font-mono text-xs font-medium tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor="GOTO"
                className="relative py-1 text-[#5A5A57] dark:text-[#A0A09C] hover:text-[#121212] dark:hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0052FF] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Controls: Theme Switcher & LinkedIn */}
          <div className="hidden md:flex items-center gap-3">
            {/* Stealth Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              data-cursor="THEME"
              className="font-mono text-[10px] font-semibold tracking-wider uppercase px-3 py-2 border border-[#121212]/20 dark:border-[#333] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white transition-colors flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-[#00FF66]' : 'bg-[#0052FF]'}`} />
              <span>{theme === 'dark' ? 'STEALTH [DARK]' : 'PAPER [LIGHT]'}</span>
            </button>

            {/* LinkedIn Connect */}
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LINKEDIN"
              className="font-mono text-xs font-semibold tracking-wider uppercase px-4 py-2 bg-[#121212] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#121212] hover:bg-[#0052FF] dark:hover:bg-[#0052FF] dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>LINKEDIN</span>
              <span className="text-[10px] text-[#0052FF] dark:text-[#0052FF] group-hover:text-white">↗</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="font-mono text-[10px] px-2 py-1 border border-[#121212]/20 dark:border-[#333] text-[#121212] dark:text-white uppercase"
            >
              {theme === 'dark' ? 'DARK' : 'LIGHT'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-cursor="MENU"
              className="flex flex-col items-end gap-1.5 p-2 focus:outline-none"
            >
              <div
                className={`h-[2px] bg-[#121212] dark:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
                }`}
              />
              <div
                className={`h-[2px] bg-[#121212] dark:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 w-6' : 'w-4'
                }`}
              />
              <div
                className={`h-[2px] bg-[#121212] dark:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#FAF8F5] dark:bg-[#000000] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="pt-20 flex flex-col gap-6 font-display">
          <span className="font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] tracking-widest uppercase mb-2">
            // INDEX MENU
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold uppercase tracking-tight text-[#121212] dark:text-white hover:text-[#0052FF] transition-colors flex items-baseline justify-between border-b border-[#121212]/10 dark:border-[#222] pb-3"
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-[#8E8E8A]">0{idx + 1}</span>
            </a>
          ))}
        </div>

        {/* Mobile Overlay Footer */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[#121212]/10 dark:border-[#222] font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C]">
          <div className="flex justify-between items-center">
            <span>DIRECT CONNECT</span>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0052FF] font-semibold uppercase underline"
            >
              LINKEDIN ↗
            </a>
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#8E8E8A] uppercase">
            <span>GAJENDRA RAJPUT</span>
            <span>NOC TIER 2/3</span>
          </div>
        </div>
      </div>
    </>
  );
}
