import React from 'react';
import { socials } from '../../data/portfolioData';

export default function EditorialFooter() {
  return (
    <footer className="py-12 bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white border-t border-[#121212]/15 dark:border-[#222222] font-mono text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Brand Metadata */}
        <div className="flex flex-col gap-1">
          <span className="font-display text-sm font-bold tracking-tight uppercase">
            GAJENDRA RAJPUT
          </span>
          <span className="text-[10px] text-[#5A5A57] dark:text-[#A0A09C] tracking-wider uppercase">
            SENIOR NETWORK ENGINEER // NOC TIER 2/3
          </span>
        </div>

        {/* Center Social Links */}
        <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium uppercase tracking-wider text-[#5A5A57] dark:text-[#A0A09C]">
          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LINKEDIN"
            className="hover:text-[#0052FF] dark:hover:text-[#00FF66] transition-colors"
          >
            LINKEDIN ↗
          </a>
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="hover:text-[#0052FF] dark:hover:text-[#00FF66] transition-colors"
          >
            GITHUB ↗
          </a>
          <a
            href={socials.email.url}
            data-cursor="EMAIL"
            className="hover:text-[#0052FF] dark:hover:text-[#00FF66] transition-colors"
          >
            EMAIL ↗
          </a>
        </div>

        {/* Right Copyright & Technical Note */}
        <div className="flex flex-col items-start md:items-end text-[10px] text-[#8E8E8A] dark:text-[#60605C] uppercase">
          <span>© {new Date().getFullYear()} GAJENDRA RAJPUT</span>
          <span>STEALTH NETWORK EXHIBITION</span>
        </div>
      </div>
    </footer>
  );
}
