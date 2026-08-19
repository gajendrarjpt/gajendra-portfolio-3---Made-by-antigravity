import React, { useState } from 'react';
import { experience } from '../../data/portfolioData';

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState('senior-network-engineer');

  return (
    <section id="experience" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>02 / PROFESSIONAL EXPERIENCE</span>
            <span>·</span>
            <span>ENGAGEMENTS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
            RESPONSIBILITY & EXECUTION.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#A0A09C] max-w-2xl">
            Detailed breakdown of tier 1 through tier 3 engineering roles, platform responsibilities, and operational scope.
          </p>
        </div>

        {/* Horizontal Experience Blocks */}
        <div className="flex flex-col divide-y divide-[#121212]/15 dark:divide-[#222222] border-y border-[#121212]/15 dark:border-[#222222]">
          {experience.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="py-10 md:py-14 transition-colors duration-300 group"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  data-cursor={isExpanded ? 'COLLAPSE' : 'EXPAND'}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline cursor-pointer"
                >
                  {/* Period & Level */}
                  <div className="lg:col-span-3 flex flex-col font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C]">
                    <span className="text-sm font-semibold text-[#0052FF] tracking-wider uppercase">
                      {item.period}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-[#8E8E8A] dark:text-[#60605C] mt-0.5">
                      {item.level}
                    </span>
                  </div>

                  {/* Role Title & Company */}
                  <div className="lg:col-span-7 flex flex-col gap-1">
                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#121212] dark:text-white tracking-tight uppercase group-hover:text-[#0052FF] transition-colors">
                      {item.role}
                    </h3>
                    <span className="font-mono text-sm font-medium text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-wider">
                      {item.company}
                    </span>
                  </div>

                  {/* Expand Toggle Marker */}
                  <div className="lg:col-span-2 flex justify-start lg:justify-end items-center">
                    <button className="font-mono text-xs font-semibold tracking-wider uppercase px-4 py-2 border border-[#121212]/20 dark:border-[#333] group-hover:border-[#121212] dark:group-hover:border-white text-[#121212] dark:text-white flex items-center gap-2">
                      <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
                      <span className="text-[#0052FF] font-bold">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Summary Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                  <div className="lg:col-start-4 lg:col-span-8">
                    <p className="font-body text-base text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Expandable Responsibility & Technical Details */}
                {isExpanded && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-[#121212]/10 dark:border-[#222222] transition-all duration-300">
                    {/* Key Highlights */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      <span className="font-mono text-xs font-semibold text-[#121212] dark:text-white uppercase tracking-wider">
                        // OPERATIONAL HIGHLIGHTS
                      </span>
                      <div className="flex flex-col gap-4">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="p-4 bg-[#F4F1EA] dark:bg-[#080808] border-l-2 border-[#0052FF] flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase">
                              {h.action}
                            </span>
                            <span className="font-mono text-[10px] text-[#0052FF] uppercase tracking-wider">
                              {h.tech}
                            </span>
                            <span className="font-body text-xs text-[#5A5A57] dark:text-[#A0A09C]">
                              {h.outcome}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Responsibility List */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                      <span className="font-mono text-xs font-semibold text-[#121212] dark:text-white uppercase tracking-wider">
                        // VERIFIED RESPONSIBILITIES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 font-body text-sm text-[#5A5A57] dark:text-[#A0A09C]">
                            <span className="text-[#0052FF] font-mono text-xs mt-0.5">→</span>
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
