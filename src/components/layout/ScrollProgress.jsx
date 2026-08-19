import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none select-none">
      {/* Network Stream Buffer Label */}
      <span className="font-mono text-[9.5px] font-bold text-[#5A5A57] dark:text-[#888888] tracking-widest uppercase [writing-mode:vertical-rl]">
        STREAM // {Math.round(scrollPercentage)}%
      </span>

      {/* Track Line Gauge */}
      <div className="w-[1.5px] h-36 bg-[#121212]/15 dark:bg-[#222222] relative overflow-hidden rounded-full">
        <div
          className="w-full bg-[#0052FF] dark:bg-[#00FF66] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,82,255,0.6)] dark:shadow-[0_0_8px_rgba(0,255,102,0.8)]"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      {/* Live NOC Signal Node Indicator */}
      <div className="w-2.5 h-2.5 rounded-full border border-[#121212]/30 dark:border-white/30 bg-[#FAF8F5] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
      </div>
    </div>
  );
}
