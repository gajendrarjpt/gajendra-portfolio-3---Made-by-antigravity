import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal Kinetic Theme Toggle Glyph
 * Restrained, linear/precision-instrument inspired transformation:
 * Light: Geometric Orb + Fine Orbital Arc
 * Dark:  Geometric Eclipsed Crescent + Shifted Orbital Arc
 */
export default function CelestialThemeToggle({
  theme,
  isSwitching,
  onToggle,
  id = 'theme-toggle-btn',
  compact = false,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      id={id}
      data-theme-toggle="true"
      disabled={isSwitching}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative group font-mono text-[10.5px] font-bold tracking-wider uppercase border transition-colors duration-300 flex items-center justify-center gap-2 select-none ${
        compact
          ? 'w-10 h-10 p-0 rounded-xs'
          : 'px-2.5 py-1.5 rounded-xs'
      } ${
        isDark
          ? 'bg-[#0A0A0A] hover:bg-[#141414] text-white border-[#2A2A2A] hover:border-[#00FF66]/50'
          : 'bg-[#F4F1EA] hover:bg-[#EAE6DC] text-[#121212] border-[#121212]/15 hover:border-[#0052FF]/50'
      } ${
        isSwitching ? 'pointer-events-none opacity-80' : 'cursor-pointer pointer-events-auto'
      } ${className}`}
    >
      {/* 16px Minimal Kinetic Glyph */}
      <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 18 18"
          className="w-4 h-4 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Orbital Arc */}
          <motion.circle
            cx="9"
            cy="9"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="14 18"
            strokeLinecap="round"
            animate={{
              rotate: isDark ? (isHovered ? 215 : 195) : (isHovered ? 45 : 15),
              opacity: isDark ? (isHovered ? 0.8 : 0.45) : (isHovered ? 0.8 : 0.4)
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={isDark ? 'text-[#00FF66]' : 'text-[#0052FF]'}
          />

          {/* Central Celestial Core: Orb (Light) ↔ Eclipsed Crescent (Dark) */}
          <motion.g
            animate={{
              scale: isHovered ? (isDark ? 1.06 : 1.08) : 1,
              rotate: isDark ? (isHovered ? -10 : 0) : (isHovered ? 15 : 0)
            }}
            style={{ originX: '9px', originY: '9px' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Base Full Orb */}
            <motion.circle
              cx="9"
              cy="9"
              r="3.6"
              animate={{
                fill: isDark ? '#00FF66' : '#0052FF',
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0.7 : 1
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Eclipsed Crescent Path (Smooth geometric sweep) */}
            <motion.path
              d="M9.5 4.5A4.5 4.5 0 0 0 14 9a4.5 4.5 0 0 1-5-4.5c0-.44.06-.86.17-1.26A4.5 4.5 0 1 0 9.5 4.5Z"
              animate={{
                fill: '#00FF66',
                opacity: isDark ? 1 : 0,
                scale: isDark ? 0.95 : 0.6
              }}
              style={{ originX: '9px', originY: '9px' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Understated Typography Label */}
      {!compact && (
        <span className="font-mono text-[10px] font-bold tracking-widest text-[#5A5A57] dark:text-[#AAAAAA] group-hover:text-[#121212] dark:group-hover:text-white transition-colors">
          {isDark ? 'LIGHT' : 'DARK'}
        </span>
      )}
    </button>
  );
}
