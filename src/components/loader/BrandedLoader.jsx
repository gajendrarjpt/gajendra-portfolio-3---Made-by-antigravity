import React, { useEffect, useState } from 'react';

export default function BrandedLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 750; // Fast sub-second load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 150);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] text-[#121212] flex flex-col justify-between p-8 md:p-12 transition-opacity duration-500 ease-out">
      {/* Header Info */}
      <div className="flex justify-between items-center font-mono text-xs text-[#5A5A57] tracking-widest uppercase">
        <span>GAJENDRA RAJPUT</span>
        <span>SYSTEM // INITIALIZING</span>
      </div>

      {/* Center Signal Reveal */}
      <div className="max-w-4xl mx-auto w-full my-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase">
              GAJENDRA<span className="text-[#0052FF]">.</span>
            </h1>
            <span className="font-mono text-3xl sm:text-5xl md:text-7xl font-light text-[#121212]">
              {progress.toString().padStart(3, '0')}
            </span>
          </div>

          {/* Progress Signal Bar */}
          <div className="w-full h-[2px] bg-[#121212]/10 relative overflow-hidden">
            <div
              className="h-full bg-[#0052FF] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[10px] text-[#5A5A57] tracking-widest uppercase">
            <span>NETWORK ENGINEER // NOC TIER 2/3</span>
            <span>ENTERPRISE INFRASTRUCTURE</span>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="flex justify-between items-center font-mono text-[10px] text-[#8E8E8A] tracking-wider uppercase">
        <span>© {new Date().getFullYear()} GAJENDRA RAJPUT</span>
        <span>SIGNAL ACTIVE</span>
      </div>
    </div>
  );
}
