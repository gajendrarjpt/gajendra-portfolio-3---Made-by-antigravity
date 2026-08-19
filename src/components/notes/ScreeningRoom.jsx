import React from 'react';
import { engineeringNotes, featuredProjects } from '../../data/portfolioData';

export default function ScreeningRoom() {
  return (
    <section id="screening-room" className="py-24 md:py-36 border-b border-[#1F1F1F] bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
              <span>03 / SCREENING ROOM</span>
              <span>·</span>
              <span>CASE REEL</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-white">
              THE SCREENING ROOM.
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888888] uppercase tracking-wider flex items-center gap-2">
            <span>SWIPE / SLIDE REEL</span>
            <span className="text-[#00FF66]">→</span>
          </div>
        </div>

        {/* Horizontal Filmstrip Reel */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory">
          {/* Card 1: Featured Project PlantRx */}
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="snap-start shrink-0 w-[290px] sm:w-[440px] md:w-[540px] max-w-[85vw] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#0052FF] transition-all group"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="px-3 py-1 bg-[#0052FF] text-white font-bold uppercase text-[10px]">
                    FEATURED PROJECT
                  </span>
                  <span className="text-[#888888] uppercase text-[10px]">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase text-white group-hover:text-[#00FF66] transition-colors">
                  {proj.name}
                </h3>

                <p className="font-body text-sm text-[#AAAAAA] leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#111111] text-white border border-[#222222] uppercase font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-xs">
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
                  className="text-[#888888] uppercase hover:text-white"
                >
                  GITHUB ↗
                </a>
              </div>
            </div>
          ))}

          {/* Cards 2-6: Operational Engineering Case Studies */}
          {engineeringNotes.map((note) => (
            <div
              key={note.id}
              className="snap-start shrink-0 w-[280px] sm:w-[380px] md:w-[450px] max-w-[85vw] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-between hover:border-white transition-all group"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-baseline font-mono text-xs border-b border-[#1F1F1F] pb-4">
                  <span className="font-bold text-[#00FF66] text-base">{note.index}</span>
                  <span className="text-[#888888] uppercase text-[10px] tracking-wider">{note.category}</span>
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-white group-hover:text-[#0052FF] transition-colors">
                  {note.title}
                </h3>

                <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-[#AAAAAA]">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-white block mb-0.5">
                      PROBLEM
                    </span>
                    <p>{note.problem}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-white block mb-0.5">
                      APPROACH
                    </span>
                    <p className="line-clamp-3">{note.approach}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1F1F1F] flex flex-col gap-2 font-mono text-xs">
                <div className="flex flex-wrap gap-1">
                  {note.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] px-2 py-0.5 bg-[#111111] text-[#E0E0E0] border border-[#222222] uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-[#00FF66] font-semibold mt-1">
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
