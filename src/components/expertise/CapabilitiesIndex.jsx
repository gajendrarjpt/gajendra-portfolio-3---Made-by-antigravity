import React, { useState } from 'react';
import { expertiseCategories } from '../../data/portfolioData';

export default function CapabilitiesIndex() {
  const [activeId, setActiveId] = useState('routing-switching');

  const activeCategory = expertiseCategories.find((cat) => cat.id === activeId) || expertiseCategories[0];

  return (
    <section id="capabilities" className="py-24 md:py-36 border-b border-[#1F1F1F] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>04 / CAPABILITIES & ARCHITECTURE</span>
            <span>·</span>
            <span>DOMAINS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-white">
            CAPABILITY INDEX.
          </h2>
          <p className="font-body text-lg text-[#AAAAAA] max-w-2xl font-normal">
            Hover or select an engineering domain to inspect detailed technological stacks, protocol standards, and operational metrics.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[480px]">
          {/* Left Index List */}
          <div className="lg:col-span-6 flex flex-col justify-between border-y border-[#1F1F1F] divide-y divide-[#1F1F1F]">
            {expertiseCategories.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  className={`py-5 px-4 transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#111111] text-white border-l-4 border-l-[#0052FF]'
                      : 'bg-transparent text-[#888888] hover:text-white hover:bg-[#0A0A0A]'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive ? 'text-[#00FF66]' : 'text-[#555555]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-xs transition-transform ${
                      isActive ? 'translate-x-1 text-[#00FF66]' : 'text-[#555555]'
                    }`}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Detail Box */}
          <div className="lg:col-span-6 relative border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[480px] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center font-mono text-xs text-[#888888] uppercase border-b border-[#1F1F1F] pb-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
                DOMAIN // {activeCategory.number}
              </span>
              <span className="text-[#0052FF] font-semibold">
                {activeCategory.shortName}
              </span>
            </div>

            <div className="my-auto flex flex-col gap-6">
              <h4 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase text-white">
                {activeCategory.title}
              </h4>

              <p className="font-body text-base text-[#AAAAAA] leading-relaxed font-normal">
                {activeCategory.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {activeCategory.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[#111111] text-white border border-[#222222] uppercase font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center font-mono text-[10px] text-[#60605C] uppercase border-t border-[#1F1F1F] pt-4">
              <span>SCOPE: {activeCategory.metrics}</span>
              <span>VERIFIED EXPERTISE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
