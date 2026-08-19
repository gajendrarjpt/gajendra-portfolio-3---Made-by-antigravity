import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CelestialThemeToggle
 * Art-directed signature Solar System ↔ Eclipse morphing control.
 * Light: Active Sun Core · 8 Geometric Rays · Outer Orbital Ring · Orbiting Particle
 * Dark:  Astronomical Crescent · Celestial Ring · 2 Star Dust Particles · Orbital Sparkle
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
      aria-label={isDark ? 'Switch to light mode (Solar System)' : 'Switch to dark mode (Eclipse)'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative group font-mono text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 flex items-center justify-center gap-2 select-none ${
        compact
          ? 'w-10 h-10 p-0 rounded-xs'
          : 'px-3 py-2 rounded-xs'
      } ${
        isDark
          ? 'bg-[#0A0A0A] hover:bg-[#141414] text-white border-[#2A2A2A] hover:border-[#00FF66]/50 shadow-xs'
          : 'bg-[#F4F1EA] hover:bg-[#EAE6DC] text-[#121212] border-[#121212]/20 hover:border-[#0052FF]/50 shadow-xs'
      } ${
        isSwitching ? 'pointer-events-none opacity-80' : 'cursor-pointer pointer-events-auto'
      } ${className}`}
    >
      {/* Visual Glyph Canvas Container */}
      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. OUTER ORBITAL RING (Both modes, distinct orbital angles) */}
          <motion.ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.2"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2.5 3.5"
            animate={{
              rotate: isDark ? -25 : isHovered ? 45 : 15,
              opacity: isDark ? 0.35 : 0.45,
              scale: isHovered ? 1.06 : 1
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={isDark ? 'text-[#00FF66]' : 'text-[#0052FF]'}
          />

          {/* 2. CELESTIAL ORBITING PARTICLE */}
          <motion.circle
            r="1.2"
            fill="currentColor"
            animate={{
              cx: isDark ? (isHovered ? 19 : 17.5) : (isHovered ? 19.5 : 18),
              cy: isDark ? (isHovered ? 7.5 : 8.5) : (isHovered ? 13.5 : 12),
              opacity: isHovered ? 1 : 0.75,
              scale: isHovered ? 1.3 : 1
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={isDark ? 'text-[#00FF66]' : 'text-[#0052FF]'}
          />

          {/* 3. LIGHT MODE: SOLAR SYSTEM & RADIATING RAYS */}
          <AnimatePresence mode="wait">
            {!isDark && (
              <motion.g
                key="solar-system"
                initial={{ opacity: 0, scale: 0.65, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* 8 Precision Geometric Solar Rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <motion.line
                    key={angle}
                    x1="12"
                    y1="3.2"
                    x2="12"
                    y2="1.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    transform={`rotate(${angle} 12 12)`}
                    animate={{
                      y2: isHovered ? 0.6 : 1.4,
                      opacity: isHovered ? 1 : idx % 2 === 0 ? 0.9 : 0.6
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[#0052FF]"
                  />
                ))}

                {/* Central Sun Core */}
                <motion.circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  fill="#0052FF"
                  animate={{
                    scale: isHovered ? 1.08 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <circle cx="12" cy="12" r="2.2" fill="#FAF8F5" fillOpacity="0.3" />
              </motion.g>
            )}

            {/* 4. DARK MODE: ECLIPSED CRESCENT & CELESTIAL STARS */}
            {isDark && (
              <motion.g
                key="eclipse-moon"
                initial={{ opacity: 0, scale: 0.65, rotate: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: -30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Astronomical Crescent */}
                <motion.path
                  d="M12.5 4.5A7.5 7.5 0 0 0 19.5 12a7.5 7.5 0 0 1-7-7.5c0-.68.08-1.34.23-1.97A7.5 7.5 0 1 0 12.5 4.5Z"
                  fill="#00FF66"
                  animate={{
                    rotate: isHovered ? -10 : 0,
                    scale: isHovered ? 1.05 : 1
                  }}
                  style={{ originX: '12px', originY: '12px' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Celestial Star Sparkle (Top Right) */}
                <motion.path
                  d="M18.5 3.5V6.5M17 5H20"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  animate={{
                    scale: isHovered ? 1.25 : 0.85,
                    opacity: isHovered ? 1 : 0.6
                  }}
                  style={{ originX: '18.5px', originY: '5px' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Subtle Dust Particle (Bottom Left) */}
                <motion.circle
                  cx="5"
                  cy="17"
                  r="0.9"
                  fill="#FFFFFF"
                  animate={{
                    opacity: isHovered ? 0.9 : 0.4,
                    scale: isHovered ? 1.2 : 0.9
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Text Mode Label (Hidden in compact mode) */}
      {!compact && (
        <span className="font-mono text-[10.5px] font-bold tracking-wider">
          {isDark ? 'LIGHT' : 'DARK'}
        </span>
      )}
    </button>
  );
}
