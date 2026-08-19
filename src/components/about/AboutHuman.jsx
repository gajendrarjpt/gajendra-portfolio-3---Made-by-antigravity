import React from 'react';
import { mechanicalToNetworkStory, profile } from '../../data/portfolioData';

export default function AboutHuman() {
  return (
    <section id="philosophy" className="pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase">
            <span>04 / ENGINEERING THINKING</span>
            <span>·</span>
            <span>THE HUMAN BEHIND THE NETWORK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white max-w-4xl leading-[0.92]">
            THE ENGINEERING MINDSET.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal leading-relaxed">
            {mechanicalToNetworkStory.subtitle}
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 font-body text-base text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed">
            {mechanicalToNetworkStory.narrative.map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-[#121212]/10 dark:border-[#222222] font-mono text-xs text-[#121212] dark:text-white flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0052FF] dark:bg-[#00FF66]" />
                <span className="font-bold uppercase">ACADEMIC FOUNDATION:</span>
                <span className="text-[#5A5A57] dark:text-[#888888]">B.E. MECHANICAL ENGINEERING (2022)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0052FF] dark:bg-[#00FF66]" />
                <span className="font-bold uppercase">CURRENT SPECIALIZATION:</span>
                <span className="text-[#5A5A57] dark:text-[#888888]">SENIOR NOC OPERATIONS & INCIDENT COMMAND</span>
              </div>
            </div>
          </div>

          {/* Right Comparison Matrix Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="font-mono text-xs text-[#121212] dark:text-white font-bold uppercase tracking-wider mb-2">
              // FIRST-PRINCIPLE SYSTEMS MAPPING
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              {mechanicalToNetworkStory.comparisons.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#5A5A57] dark:text-[#888888] uppercase">PHYSICAL MECHANICS</span>
                    <span className="text-xs font-semibold text-[#121212] dark:text-white">{item.physical}</span>
                  </div>

                  <span className="text-[#0052FF] dark:text-[#00FF66] font-bold text-sm hidden sm:inline">↔</span>

                  <div className="flex flex-col gap-0.5 sm:text-right">
                    <span className="text-[9px] text-[#5A5A57] dark:text-[#888888] uppercase">NETWORK ARCHITECTURE</span>
                    <span className="text-xs font-semibold text-[#0052FF] dark:text-[#00FF66]">{item.network}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 mt-2 bg-[#FAF8F5] dark:bg-[#111111] border border-[#121212]/10 dark:border-[#222222] rounded-xs font-mono text-xs text-[#5A5A57] dark:text-[#AAAAAA]">
              <span className="text-[10px] font-bold text-[#121212] dark:text-white uppercase block mb-1">
                ENGINEERING MOTTO
              </span>
              <p className="italic text-[#121212] dark:text-[#E0E0E0]">
                "Systems fail when assumptions go unverified. True reliability is engineered by validating every layer through telemetry."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
