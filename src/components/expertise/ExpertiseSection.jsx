import React, { useState } from 'react';
import { expertiseCategories } from '../../data/portfolioData';

export default function ExpertiseSection() {
  const [activeId, setActiveId] = useState('routing-switching');

  const activeCategory = expertiseCategories.find((cat) => cat.id === activeId) || expertiseCategories[0];

  return (
    <section id="expertise" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>03 / TECHNICAL EXPERTISE</span>
            <span>·</span>
            <span>CAPABILITIES</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
            EDITORIAL INDEX OF SKILLS.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#A0A09C] max-w-2xl font-normal">
            Hover or select an engineering domain to inspect detailed technological stacks, protocol standards, and operational scope.
          </p>
        </div>

        {/* Fixed Geometry Editorial Index Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[480px]">
          {/* Left Column: 01 to 06 List */}
          <div className="lg:col-span-6 flex flex-col justify-between border-y border-[#121212]/15 dark:border-[#222222] divide-y divide-[#121212]/15 dark:divide-[#222222]">
            {expertiseCategories.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  data-cursor="FOCUS"
                  className={`py-5 px-4 transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#121212] dark:bg-white text-[#FAF8F5] dark:text-[#121212]'
                      : 'bg-transparent text-[#121212] dark:text-white hover:bg-[#F4F1EA] dark:hover:bg-[#080808]'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? 'text-[#0052FF] dark:text-[#0052FF]'
                          : 'text-[#8E8E8A] dark:text-[#60605C] group-hover:text-[#121212] dark:group-hover:text-white'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#0052FF] scale-125' : 'bg-transparent border border-[#121212]/30 dark:border-white/30'
                      }`}
                    />
                    <span
                      className={`font-mono text-xs transition-transform duration-300 ${
                        isActive ? 'translate-x-1 text-[#0052FF]' : 'text-[#8E8E8A] dark:text-[#60605C]'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Fixed Reserved Geometry Detail Container */}
          <div className="lg:col-span-6 relative border border-[#121212]/15 dark:border-[#222222] bg-[#F4F1EA] dark:bg-[#080808] p-8 md:p-10 flex flex-col justify-between h-[480px] overflow-hidden">
            {/* Top Fixed Metadata */}
            <div className="flex justify-between items-center font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-wider border-b border-[#121212]/10 dark:border-[#222] pb-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0052FF]" />
                DOMAIN // {activeCategory.number}
              </span>
              <span className="text-[#0052FF] font-semibold">
                {activeCategory.shortName}
              </span>
            </div>

            {/* Middle Fixed Geometry Content Area with Crossfade Animation */}
            <div className="my-auto flex flex-col gap-6 transition-opacity duration-300 ease-in-out">
              <h4 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#121212] dark:text-white">
                {activeCategory.title}
              </h4>

              <p className="font-body text-base text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed font-normal">
                {activeCategory.description}
              </p>

              {/* Protocol / Tool Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeCategory.items.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/15 dark:border-[#333] uppercase font-medium shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Fixed Metadata */}
            <div className="flex justify-between items-center font-mono text-[10px] text-[#8E8E8A] dark:text-[#60605C] uppercase tracking-widest border-t border-[#121212]/10 dark:border-[#222] pt-4">
              <span>SCOPE: {activeCategory.metrics}</span>
              <span>VERIFIED EXPERTISE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
