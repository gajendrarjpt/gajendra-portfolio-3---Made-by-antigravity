import React, { useState } from 'react';
import { careerStages, profile } from '../../data/portfolioData';

export default function CareerStory() {
  const [activeStage, setActiveStage] = useState(2);

  return (
    <section id="story" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>01 / CAREER STORY</span>
            <span>·</span>
            <span>EVOLUTION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-[#F4F4F0] max-w-4xl leading-tight">
            FROM L1 NOC SUPPORT TO TIER 2/3 NETWORK OPERATIONS.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#A0A09C] max-w-2xl font-normal">
            A career built around uptime, deep packet troubleshooting, security controls, and enterprise network reliability.
          </p>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Block */}
          <div className="lg:col-span-5 flex flex-col gap-6 font-body text-base text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed">
            <p>
              Starting in first-line NOC support, I built a foundation on immediate SLA-driven incident response, ticket triage, and clear stakeholder escalation paths.
            </p>
            <p>
              Advancing to Tier 2 Network Administration, I took ownership of multi-vendor firewall policies (Palo Alto, Fortinet, Sophos), Cisco VLAN/STP topologies, and enterprise WLAN deployments across Aruba and Cisco platforms.
            </p>
            <p>
              Today as a Senior Network Engineer (NOC Tier 2/3) at PHN Technology, I lead P1/P2 incident bridges, deep packet analysis using Wireshark and telemetry, firmware upgrade lifecycles, and CAPA documentation.
            </p>

            <div className="pt-4 flex flex-col gap-2 font-mono text-xs text-[#121212] dark:text-white">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0052FF]" />
                <span className="font-semibold uppercase">FOCUS:</span>
                <span className="text-[#5A5A57] dark:text-[#A0A09C]">ENTERPRISE ROUTING, SWITCHING & SECURITY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0052FF]" />
                <span className="font-semibold uppercase">CURRENT ROLE:</span>
                <span className="text-[#5A5A57] dark:text-[#A0A09C]">PHN TECHNOLOGY PVT LTD</span>
              </div>
            </div>
          </div>

          {/* Right Timeline Signal Path */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative pl-4 md:pl-8 border-l border-[#121212]/15 dark:border-[#222222]">
            {careerStages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.label}
                  onClick={() => setActiveStage(idx)}
                  data-cursor="SELECT"
                  className={`group relative pl-6 transition-all duration-300 cursor-pointer ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Timeline Active Marker */}
                  <div
                    className={`absolute -left-[21px] top-1.5 w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'border-[#0052FF] bg-[#FAF8F5] dark:bg-[#000000] scale-110'
                        : 'border-[#121212]/30 dark:border-[#444] bg-[#FAF8F5] dark:bg-[#000000]'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#0052FF]' : 'bg-[#121212]/30 dark:bg-[#444]'
                      }`}
                    />
                  </div>

                  {/* Stage Card */}
                  <div className="flex flex-col gap-2 border-b border-[#121212]/10 dark:border-[#222222] pb-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                      <span className="text-[#0052FF] font-semibold tracking-wider">
                        {stage.period}
                      </span>
                      <span className="text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-widest text-[10px]">
                        STAGE {stage.index} // {stage.label}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#121212] dark:text-white tracking-tight uppercase group-hover:text-[#0052FF] transition-colors">
                      {stage.title}
                    </h3>

                    <div className="font-mono text-xs font-medium text-[#121212]/70 dark:text-white/70 uppercase">
                      {stage.company}
                    </div>

                    <p className="font-body text-sm text-[#5A5A57] dark:text-[#A0A09C] mt-1 font-normal leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
