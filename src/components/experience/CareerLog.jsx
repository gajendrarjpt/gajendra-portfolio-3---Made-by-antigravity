import React, { useState } from 'react';
import { experience } from '../../data/portfolioData';

export default function CareerLog() {
  const [expandedId, setExpandedId] = useState('senior-network-engineer');

  return (
    <section id="log" className="pt-8 pb-20 md:pt-10 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>05 / CAREER LOG</span>
            <span>·</span>
            <span>ENGAGEMENTS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
            CAREER LOG.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl">
            Operational timeline spanning first-line SLA triage to senior Tier 2/3 engineering leadership.
          </p>
        </div>

        {/* Experience Blocks */}
        <div className="flex flex-col divide-y divide-[#121212]/10 dark:divide-[#1F1F1F] border-y border-[#121212]/10 dark:border-[#1F1F1F]">
          {experience.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="py-10 md:py-14 transition-colors group">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline cursor-pointer"
                >
                  <div className="lg:col-span-3 flex flex-col font-mono text-xs text-[#5A5A57] dark:text-[#888888]">
                    <span className="text-sm font-semibold text-[#0052FF] dark:text-[#00FF66] tracking-wider uppercase">
                      {item.period}
                    </span>
                    <span className="text-[10px] uppercase text-[#8E8E8A] dark:text-[#555555] mt-0.5">
                      {item.level}
                    </span>
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-1">
                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#121212] dark:text-white tracking-tight uppercase group-hover:text-[#0052FF] transition-colors">
                      {item.role}
                    </h3>
                    <span className="font-mono text-sm text-[#5A5A57] dark:text-[#888888] uppercase tracking-wider">
                      {item.company}
                    </span>
                  </div>

                  <div className="lg:col-span-2 flex justify-start lg:justify-end">
                    <button className="font-mono text-xs font-semibold tracking-wider uppercase px-4 py-2 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white flex items-center gap-2 bg-[#F4F1EA] dark:bg-[#0A0A0A]">
                      <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
                      <span className="text-[#0052FF] dark:text-[#00FF66] font-bold">{isExpanded ? '−' : '+'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                  <div className="lg:col-start-4 lg:col-span-8">
                    <p className="font-body text-base text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-[#121212]/10 dark:border-[#1F1F1F]">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      <span className="font-mono text-xs font-semibold text-[#121212] dark:text-white uppercase tracking-wider">
                        // HIGHLIGHTS
                      </span>
                      <div className="flex flex-col gap-4">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="p-4 bg-[#F4F1EA] dark:bg-[#0A0A0A] border-l-2 border-[#0052FF] flex flex-col gap-1 font-mono text-xs">
                            <span className="font-bold text-[#121212] dark:text-white uppercase">{h.action}</span>
                            <span className="text-[#0052FF] dark:text-[#00FF66] text-[10px] uppercase">{h.tech}</span>
                            <span className="font-body text-xs text-[#5A5A57] dark:text-[#AAAAAA]">{h.outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-4">
                      <span className="font-mono text-xs font-semibold text-[#121212] dark:text-white uppercase tracking-wider">
                        // RESPONSIBILITIES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body text-sm text-[#5A5A57] dark:text-[#AAAAAA]">
                        {item.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#0052FF] dark:text-[#00FF66] font-mono text-xs mt-0.5">→</span>
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
