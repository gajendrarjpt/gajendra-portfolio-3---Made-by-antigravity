import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packetJourneyStages } from '../../data/portfolioData';

export default function PacketJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = packetJourneyStages[activeStepIndex] || packetJourneyStages[0];

  return (
    <section id="journey" className="pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors overflow-hidden">
      
      {/* Background Subtitle Coordinate Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase">
            <span>01.5 / ARCHITECTURAL WALKTHROUGH</span>
            <span>·</span>
            <span>PACKET LIFECYCLE SIMULATION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white max-w-4xl leading-[0.92]">
            THE ANATOMY OF A PACKET.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal leading-relaxed">
            A reference walkthrough tracing a single 1500-byte data stream as it traverses transit routing, perimeter inspection, and core switching fabrics — demonstrating failover behavior during link degradation.
          </p>
        </div>

        {/* Interactive Step-Through Track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 font-mono text-[10px] sm:text-xs">
          {packetJourneyStages.map((stage, idx) => {
            const isActive = activeStepIndex === idx;
            const isPassed = activeStepIndex > idx;
            const isIncident = stage.id === 'the-incident';

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`py-3 px-2.5 font-bold uppercase border transition-all text-left flex flex-col justify-between h-[80px] rounded-xs cursor-pointer ${
                  isActive
                    ? isIncident
                      ? 'bg-[#FF3344] text-white border-[#FF3344] shadow-lg shadow-[#FF3344]/20 scale-102'
                      : 'bg-[#0052FF] text-white border-[#0052FF] shadow-lg shadow-[#0052FF]/20 scale-102'
                    : isPassed
                    ? 'bg-[#F4F1EA] dark:bg-[#111111] text-[#121212] dark:text-white border-[#0052FF]/40 dark:border-[#00FF66]/40'
                    : 'bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#5A5A57] dark:text-[#888888] border-[#121212]/15 dark:border-[#1F1F1F] hover:border-[#0052FF]'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="opacity-75">{stage.step}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white animate-ping' : isPassed ? 'bg-[#0052FF] dark:bg-[#00FF66]' : 'bg-transparent'
                  }`} />
                </div>
                <div className="truncate font-display text-[10.5px] leading-tight">
                  {stage.nodeName.split('//')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Cinematic Interactive Deck */}
        <div className="border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-6 sm:p-10 rounded-xs shadow-2xl relative overflow-hidden">
          
          {/* Deck Header: Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                activeStage.statusTone === 'rose' ? 'bg-[#FF3344]' :
                activeStage.statusTone === 'emerald' ? 'bg-[#00FF66]' : 'bg-[#0052FF]'
              }`} />
              <span className="font-bold text-[#121212] dark:text-white uppercase">
                NODE {activeStage.step}: {activeStage.device}
              </span>
              <span className="text-[#5A5A57] dark:text-[#888888] hidden sm:inline">|</span>
              <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold hidden sm:inline">
                {activeStage.layer}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 font-bold text-[10px] uppercase rounded-xs ${
                activeStage.statusTone === 'rose'
                  ? 'bg-[#FF3344] text-white'
                  : activeStage.statusTone === 'emerald'
                  ? 'bg-[#00FF66]/20 text-[#008833] dark:text-[#00FF66] border border-[#00FF66]/30'
                  : 'bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00E5FF] border border-[#0052FF]/30'
              }`}>
                {activeStage.status}
              </span>
            </div>
          </div>

          {/* Stage Core Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative Block */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="font-mono text-xs text-[#0052FF] dark:text-[#00FF66] font-bold uppercase tracking-wider">
                {activeStage.nodeName}
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight uppercase text-[#121212] dark:text-white leading-tight">
                {activeStage.description}
              </h3>

              <div className="p-3 bg-[#FAF8F5] dark:bg-[#121212] border border-[#121212]/10 dark:border-[#222222] rounded-xs font-mono text-xs text-[#5A5A57] dark:text-[#AAAAAA]">
                <span className="text-[10px] font-bold text-[#121212] dark:text-white block uppercase mb-1">
                  LIVE PACKET HEADER DECODE
                </span>
                <p className="text-[11px] font-semibold text-[#121212] dark:text-[#CCCCCC]">
                  {activeStage.telemetry}
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 pt-4 font-mono text-xs">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  className="px-5 py-2.5 border border-[#121212]/20 dark:border-[#333] font-bold uppercase disabled:opacity-30 hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  ← PREVIOUS HOP
                </button>

                <button
                  type="button"
                  disabled={activeStepIndex === packetJourneyStages.length - 1}
                  onClick={() => setActiveStepIndex(Math.min(packetJourneyStages.length - 1, activeStepIndex + 1))}
                  className={`px-6 py-2.5 font-bold uppercase text-white transition-all shadow-md cursor-pointer ${
                    activeStage.id === 'the-incident' ? 'bg-[#FF3344] hover:bg-[#DD2233]' : 'bg-[#0052FF] hover:bg-[#0042D0]'
                  }`}
                >
                  {activeStepIndex === packetJourneyStages.length - 2 ? 'RESOLVE INCIDENT →' : 'NEXT HOP →'}
                </button>
              </div>
            </div>

            {/* Right Real CLI / Wireshark Console */}
            <div className="lg:col-span-6 bg-[#000000] text-[#00FF66] font-mono text-xs p-5 rounded-xs border border-[#222222] shadow-2xl overflow-x-auto max-h-[340px]">
              <div className="text-[10px] text-[#888888] border-b border-[#222] pb-2 mb-3 flex justify-between uppercase">
                <span>TERMINAL LOG DISSECTION // {activeStage.device}</span>
                <span>PCAP BUFFER: CAPTURED</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11.5px] text-[#00FF66]">
                {activeStage.cliSnippet}
              </pre>
            </div>
          </div>

          {/* Bottom Statement: "This is what I do." */}
          {activeStepIndex === packetJourneyStages.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 pt-6 border-t border-[#121212]/10 dark:border-[#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00FF66] inline-block" />
                <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#121212] dark:text-white">
                  THIS IS WHAT I DO.
                </span>
              </div>
              <a
                href="#incidents"
                className="px-6 py-2.5 bg-[#0052FF] text-white font-bold uppercase tracking-wider text-center"
              >
                EXPLORE INCIDENT PLAYBOOKS ↓
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
