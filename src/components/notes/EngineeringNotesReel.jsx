import React, { useRef } from 'react';
import { engineeringNotes, featuredProjects } from '../../data/portfolioData';

export default function EngineeringNotesReel() {
  const scrollContainerRef = useRef(null);

  return (
    <section id="notes" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
              <span>05 / CASE REEL & NOTES</span>
              <span>·</span>
              <span>DOCUMENTATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-[#F4F4F0]">
              ENGINEERING NOTES.
            </h2>
          </div>

          <div className="font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-wider flex items-center gap-2">
            <span>SCROLL / SLIDE HORIZONTALLY</span>
            <span className="text-[#0052FF]">→</span>
          </div>
        </div>

        {/* Horizontal Sliding Reel Filmstrip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1: Featured Project PlantRx */}
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="snap-start shrink-0 w-[340px] sm:w-[460px] md:w-[560px] border border-[#121212]/20 dark:border-[#222222] bg-[#F4F1EA] dark:bg-[#080808] p-8 md:p-10 flex flex-col justify-between hover:border-[#0052FF] transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="px-3 py-1 bg-[#0052FF] text-white font-semibold uppercase text-[10px]">
                    FEATURED PROJECT
                  </span>
                  <span className="text-[#5A5A57] dark:text-[#A0A09C] uppercase text-[10px]">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold tracking-tight uppercase text-[#121212] dark:text-white group-hover:text-[#0052FF] transition-colors">
                  {proj.name}
                </h3>

                <p className="font-body text-sm text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed">
                  {proj.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/15 dark:border-[#333] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#121212]/10 dark:border-[#222] flex items-center justify-between font-mono text-xs">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0052FF] font-bold uppercase hover:underline"
                >
                  LAUNCH APP ↗
                </a>
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A5A57] dark:text-[#A0A09C] uppercase hover:text-[#121212] dark:hover:text-white"
                >
                  GITHUB ↗
                </a>
              </div>
            </div>
          ))}

          {/* Cards 2-6: Operational Engineering Notes */}
          {engineeringNotes.map((note) => (
            <div
              key={note.id}
              className="snap-start shrink-0 w-[320px] sm:w-[420px] md:w-[480px] border border-[#121212]/15 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#0A0A0A] p-8 flex flex-col justify-between hover:border-[#121212] dark:hover:border-white transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-baseline font-mono text-xs border-b border-[#121212]/10 dark:border-[#222] pb-4">
                  <span className="font-bold text-[#0052FF] text-base">{note.index}</span>
                  <span className="text-[#8E8E8A] uppercase text-[10px] tracking-wider">{note.category}</span>
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-[#121212] dark:text-white group-hover:text-[#0052FF] transition-colors">
                  {note.title}
                </h3>

                <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-[#5A5A57] dark:text-[#A0A09C]">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-[#121212] dark:text-white block mb-0.5">
                      PROBLEM
                    </span>
                    <p>{note.problem}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-[#121212] dark:text-white block mb-0.5">
                      APPROACH
                    </span>
                    <p className="line-clamp-3">{note.approach}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#121212]/10 dark:border-[#222] flex flex-col gap-2 font-mono text-xs">
                <div className="flex flex-wrap gap-1">
                  {note.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] px-2 py-0.5 bg-[#F4F1EA] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/10 dark:border-[#333] uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-[#0052FF] font-semibold mt-1">
                  OUTCOME: {note.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
