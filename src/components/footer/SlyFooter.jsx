import React from 'react';
import { socials } from '../../data/portfolioData';

export default function SlyFooter() {
  return (
    <footer className="py-12 bg-[#000000] text-white border-t border-[#1F1F1F] font-mono text-xs no-theme-transition">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight uppercase text-white">
              GAJENDRA RAJPUT
            </span>
            <span className="text-[10px] text-[#888888] tracking-wider uppercase">
              SENIOR NETWORK ENGINEER // NOC TIER 2/3
            </span>
          </div>
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
          <span className="text-[#0052FF] font-semibold">SLY NETWORK SYSTEM</span>
        </div>
      </div>
    </footer>
  );
}
