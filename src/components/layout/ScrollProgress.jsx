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
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none">
      {/* Top Technical Metadata */}
      <span className="font-mono text-[9px] text-[#5A5A57] tracking-widest uppercase writing-mode-vertical rotate-180">
        SIG // {Math.round(scrollPercentage).toString().padStart(3, '0')}%
      </span>

      {/* Track Line */}
      <div className="w-[1px] h-32 bg-[#121212]/15 relative overflow-hidden">
        <div
          className="w-full bg-[#0052FF] transition-all duration-150 ease-out"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      {/* Signal Node Dot */}
      <div className="w-2 h-2 rounded-full border border-[#121212] bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-[#0052FF]" />
      </div>
    </div>
  );
}
