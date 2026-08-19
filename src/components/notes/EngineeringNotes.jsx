import React, { useState } from 'react';
import { engineeringNotes, featuredProjects } from '../../data/portfolioData';

export default function EngineeringNotes() {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'projects'

  return (
    <section id="notes" className="py-24 md:py-36 border-b border-[#121212]/10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
              <span>05 / CASE STUDIES & NOTES</span>
              <span>·</span>
              <span>DOCUMENTATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212]">
              ENGINEERING NOTES.
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 border border-[#121212]/20 p-1 bg-[#F4F1EA]">
            <button
              onClick={() => setActiveTab('notes')}
              data-cursor="SELECT"
              className={`px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'notes' ? 'bg-[#121212] text-[#FAF8F5]' : 'text-[#5A5A57] hover:text-[#121212]'
              }`}
            >
              OPERATIONAL NOTES ({engineeringNotes.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              data-cursor="SELECT"
              className={`px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'projects' ? 'bg-[#121212] text-[#FAF8F5]' : 'text-[#5A5A57] hover:text-[#121212]'
              }`}
            >
              INDEPENDENT PROJECTS ({featuredProjects.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Operational Engineering Notes (Magazine Editorial Layout) */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringNotes.map((note) => (
              <div
                key={note.id}
                className="border border-[#121212]/15 bg-[#FAF8F5] p-8 flex flex-col justify-between hover:border-[#121212] transition-all duration-300 group"
              >
                <div className="flex flex-col gap-6">
                  {/* Top Note Metadata */}
                  <div className="flex justify-between items-baseline font-mono text-xs border-b border-[#121212]/10 pb-4">
                    <span className="font-bold text-[#0052FF] text-base">{note.index}</span>
                    <span className="text-[#8E8E8A] uppercase tracking-wider">{note.category}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-[#121212] group-hover:text-[#0052FF] transition-colors">
                    {note.title}
                  </h3>

                  {/* Problem & Approach */}
                  <div className="flex flex-col gap-4 font-body text-sm text-[#5A5A57]">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#121212] block mb-1">
                        PROBLEM
                      </span>
                      <p>{note.problem}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#121212] block mb-1">
                        APPROACH & METHOD
                      </span>
                      <p>{note.approach}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Tools & Outcome */}
                <div className="pt-6 mt-6 border-t border-[#121212]/10 flex flex-col gap-3 font-mono text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {note.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] px-2 py-0.5 bg-[#F4F1EA] text-[#121212] border border-[#121212]/10 uppercase"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#0052FF] font-semibold">
                    OUTCOME: {note.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Independent Projects (PlantRx AI App) */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="border border-[#121212]/20 bg-[#F4F1EA] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="px-3 py-1 bg-[#0052FF] text-[#FAF8F5] font-semibold uppercase">
                      {proj.label}
                    </span>
                    <span className="text-[#5A5A57] uppercase">{proj.category}</span>
                  </div>

                  <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight uppercase text-[#121212]">
                    {proj.name}
                  </h3>

                  <p className="font-body text-base text-[#5A5A57] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-[#FAF8F5] text-[#121212] border border-[#121212]/15 uppercase font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="font-mono text-xs text-[#8E8E8A] italic">
                    Note: {proj.note}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="w-full font-mono text-xs font-semibold tracking-wider uppercase px-6 py-4 bg-[#121212] text-[#FAF8F5] hover:bg-[#0052FF] transition-colors flex items-center justify-between"
                  >
                    <span>LAUNCH APPLICATION</span>
                    <span>↗</span>
                  </a>

                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="w-full font-mono text-xs font-semibold tracking-wider uppercase px-6 py-4 border border-[#121212]/30 hover:border-[#121212] text-[#121212] transition-colors flex items-center justify-between"
                  >
                    <span>VIEW REPOSITORY</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
