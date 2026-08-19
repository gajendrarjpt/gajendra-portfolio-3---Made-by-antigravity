import React from 'react';
import { socials } from '../../data/portfolioData';
import LiveClock from '../ui/LiveClock';

export default function SlyFooter() {
  return (
    <footer className="py-12 bg-[#000000] text-white border-t border-[#1F1F1F] font-mono text-xs no-theme-transition">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 select-none">
            <span className="font-display font-black text-lg tracking-tighter uppercase text-white">
              GAJENDRA<span className="text-[#00FF66] font-mono font-medium ml-1">//</span>
            </span>
            <span className="font-mono text-xs text-[#888888] tracking-widest uppercase">
              RAJPUT
            </span>
          </div>
          <LiveClock showStatus={true} />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
          <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF66] transition-colors">
            LINKEDIN ↗
          </a>
          <a href={socials.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF66] transition-colors">
            GITHUB ↗
          </a>
          <a href={socials.email.url} className="hover:text-[#00FF66] transition-colors">
            EMAIL ↗
          </a>
        </div>

        <div className="flex flex-col items-start md:items-end text-[10px] text-[#60605C] uppercase">
          <span>© {new Date().getFullYear()} GAJENDRA RAJPUT</span>
          <span className="text-[#00FF66] font-semibold">SLY NETWORK SYSTEM</span>
        </div>
      </div>
    </footer>
  );
}
