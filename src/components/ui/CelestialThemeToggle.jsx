import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Recognizable Interactive Sun + Moon Theme Toggle
 * Light: Classic 8-Ray Sun in Electric Blue (#0052FF) with ray expansion & subtle rotation on hover.
 * Dark:  Classic Crescent Moon in Emerald (#00FF66) with subtle tilt & star twinkle on hover.
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
      className={`relative group font-mono text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 flex items-center justify-center gap-2 select-none ${
        compact
          ? 'w-10 h-10 p-0 rounded-xs'
          : 'px-3 py-2 rounded-xs w-[92px]'
      } ${
        isDark
          ? 'bg-[#0A0A0A] hover:bg-[#141414] text-white border-[#2A2A2A] hover:border-[#00FF66]/50 shadow-xs'
          : 'bg-[#F4F1EA] hover:bg-[#EAE6DC] text-[#121212] border-[#121212]/20 hover:border-[#0052FF]/50 shadow-xs'
      } ${
        isSwitching ? 'pointer-events-none opacity-80' : 'cursor-pointer pointer-events-auto'
      } ${className}`}
    >
      {/* 18px Recognizable Sun / Moon SVG Icon Container */}
      <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          {!isDark ? (
            /* =========================================================================
             * LIGHT MODE: RECOGNIZABLE SUN
             * ========================================================================= */
            <motion.svg
              key="sun-icon"
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#0052FF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.08 : 1,
                rotate: isHovered ? 25 : 0
              }}
              exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Central Sun Disk */}
              <motion.circle
                cx="12"
                cy="12"
                r="4.2"
                fill="currentColor"
                fillOpacity="0.15"
                animate={{
                  r: isHovered ? 4.6 : 4.2
                }}
                transition={{ duration: 0.3 }}
              />

              {/* 8 Distinct Evenly-Spaced Radial Sun Rays */}
              <motion.g
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                style={{ originX: '12px', originY: '12px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* 12 o'clock */}
                <line x1="12" y1="2" x2="12" y2="4.5" />
                {/* 6 o'clock */}
                <line x1="12" y1="19.5" x2="12" y2="22" />
                {/* 9 o'clock */}
                <line x1="2" y1="12" x2="4.5" y2="12" />
                {/* 3 o'clock */}
                <line x1="19.5" y1="12" x2="22" y2="12" />
                {/* 1:30 */}
                <line x1="19.07" y1="4.93" x2="17.3" y2="6.7" />
                {/* 7:30 */}
                <line x1="6.7" y1="17.3" x2="4.93" y2="19.07" />
                {/* 10:30 */}
                <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
                {/* 4:30 */}
                <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
              </motion.g>
            </motion.svg>
          ) : (
            /* =========================================================================
             * DARK MODE: RECOGNIZABLE CRESCENT MOON
             * ========================================================================= */
            <motion.svg
              key="moon-icon"
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#00FF66]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.7, rotate: 45 }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.06 : 1,
                rotate: isHovered ? -10 : 0
              }}
              exit={{ opacity: 0, scale: 0.7, rotate: -45 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Classic Clean Crescent Moon */}
              <path
                d="M12 3a6.8 6.8 0 0 0 9 9 9 9 0 1 1-9-9Z"
                fill="currentColor"
                fillOpacity="0.2"
              />

              {/* Delicate Accent Twinkle Star */}
              <motion.path
                d="M19 3.5v3M17.5 5h3"
                strokeWidth="1.6"
                animate={{
                  scale: isHovered ? 1.25 : 0.85,
                  opacity: isHovered ? 1 : 0.6
                }}
                style={{ originX: '19px', originY: '5px' }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Button Label */}
      {!compact && (
        <span className="font-mono text-[10.5px] font-bold tracking-wider text-[#121212] dark:text-white">
          {isDark ? 'LIGHT' : 'DARK'}
        </span>
      )}
    </button>
  );
}
