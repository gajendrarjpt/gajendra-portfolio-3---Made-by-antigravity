import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packetJourneyStages } from '../../data/portfolioData';

const STAGE_LABELS = [
  { short: 'INGRESS', title: 'WAN Ingress' },
  { short: 'ROUTE', title: 'Edge Routing' },
  { short: 'INSPECT', title: 'Perimeter Security' },
  { short: 'SWITCH', title: 'Core Switching' },
  { short: 'DELIVER', title: 'Destination' },
  { short: 'INCIDENT', title: 'Link Cut' },
  { short: 'RESOLVE', title: 'Convergence' },
];

export default function PacketJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [inspectLogs, setInspectLogs] = useState(false);
  const activeStage = packetJourneyStages[activeStepIndex] || packetJourneyStages[0];

  return (
    <section id="journey" className="pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with Editorial Rhythm */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase">
            <span>01.5 / ARCHITECTURAL WALKTHROUGH</span>
            <span>·</span>
            <span>FOLLOW THE PACKET</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white max-w-4xl leading-[0.92]">
            THE ANATOMY OF A PACKET.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal leading-relaxed">
            A continuous architectural sequence tracing an inbound 1500-byte data stream as it traverses untrusted transit, perimeter security, and core switching fabrics — demonstrating deterministic failover during an unexpected link cut.
          </p>
        </div>

        {/* Continuous Pipeline Navigation Track */}
        <div className="relative mb-12">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#121212]/15 dark:bg-[#222222] -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
            {STAGE_LABELS.map((stage, idx) => {
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;
              const isIncident = idx === 5;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xs border transition-all text-left flex flex-col justify-between h-[76px] cursor-pointer group ${
                    isActive
                      ? isIncident
                        ? 'bg-[#FF3344] text-white border-[#FF3344] shadow-lg shadow-[#FF3344]/25 scale-102'
                        : 'bg-[#0052FF] text-white border-[#0052FF] shadow-lg shadow-[#0052FF]/25 scale-102'
                      : isPassed
                      ? 'bg-[#F4F1EA] dark:bg-[#111111] text-[#121212] dark:text-white border-[#0052FF]/30 dark:border-[#00FF66]/30'
                      : 'bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#5A5A57] dark:text-[#888888] border-[#121212]/15 dark:border-[#1F1F1F] hover:border-[#0052FF]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] w-full">
                    <span className="opacity-75 font-semibold">0{idx + 1}</span>
                    <span className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                      isActive ? 'bg-white scale-125' : isPassed ? 'bg-[#0052FF] dark:bg-[#00FF66]' : 'bg-[#121212]/20 dark:bg-[#333]'
                    }`} />
                  </div>
                  <div className="font-display font-bold text-xs uppercase tracking-tight truncate">
                    {stage.short}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continuous System Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-6 sm:p-10 rounded-xs shadow-2xl"
          >
            {/* Top Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  activeStage.statusTone === 'rose' ? 'bg-[#FF3344] animate-pulse' :
                  activeStage.statusTone === 'emerald' ? 'bg-[#00FF66]' : 'bg-[#0052FF]'
                }`} />
                <span className="font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                  {activeStage.nodeName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5A5A57] dark:text-[#888888] hidden sm:inline text-[11px]">
                  {activeStage.device}
                </span>
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

            {/* Narrative & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Editorial Narrative */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="font-mono text-xs text-[#0052FF] dark:text-[#00FF66] font-bold uppercase tracking-wider">
                  {activeStage.layer}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#121212] dark:text-white leading-tight">
                  {activeStage.description}
                </h3>

                <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#111111] border border-[#121212]/10 dark:border-[#222222] rounded-xs font-mono text-xs">
                  <span className="text-[10px] text-[#5A5A57] dark:text-[#888888] block uppercase mb-1 font-semibold">
                    LIVE TELEMETRY
                  </span>
                  <p className="text-[11.5px] font-semibold text-[#121212] dark:text-[#CCCCCC]">
                    {activeStage.telemetry}
                  </p>
                </div>

                {/* Navigation & Progressive Disclosure Toggle */}
                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                  <button
                    type="button"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    className="px-4 py-2 border border-[#121212]/20 dark:border-[#333] font-bold uppercase disabled:opacity-30 hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    ← PREV
                  </button>

                  <button
                    type="button"
                    disabled={activeStepIndex === packetJourneyStages.length - 1}
                    onClick={() => setActiveStepIndex(Math.min(packetJourneyStages.length - 1, activeStepIndex + 1))}
                    className={`px-5 py-2 font-bold uppercase text-white transition-all shadow-md cursor-pointer ${
                      activeStage.id === 'the-incident' ? 'bg-[#FF3344] hover:bg-[#DD2233]' : 'bg-[#0052FF] hover:bg-[#0042D0]'
                    }`}
                  >
                    {activeStepIndex === packetJourneyStages.length - 2 ? 'RESOLVE FAILOVER →' : 'NEXT HOP →'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectLogs(!inspectLogs)}
                    className="px-3.5 py-2 border border-[#121212]/20 dark:border-[#333] text-[#5A5A57] dark:text-[#AAAAAA] hover:text-[#121212] dark:hover:text-white font-semibold text-[11px] uppercase transition-colors cursor-pointer ml-auto"
                  >
                    {inspectLogs ? 'HIDE LOGS' : 'INSPECT LOGS ▾'}
                  </button>
                </div>
              </div>

              {/* Right Decoded CLI Console with Progressive Disclosure */}
              <div className="lg:col-span-6 bg-[#000000] text-[#00FF66] font-mono text-xs p-5 rounded-xs border border-[#222222] shadow-2xl overflow-x-auto">
                <div className="text-[10px] text-[#888888] border-b border-[#222] pb-2 mb-3 flex justify-between uppercase">
                  <span>TERMINAL LOG DISSECTION // {activeStage.device}</span>
                  <span className="text-[#00FF66]">LIVE BUFFER</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11px] sm:text-[11.5px] text-[#00FF66] max-h-[220px] overflow-y-auto">
                  {activeStage.cliSnippet}
                </pre>
              </div>
            </div>

            {/* Concluding Thesis Statement */}
            {activeStepIndex === packetJourneyStages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
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
                  className="px-6 py-2.5 bg-[#0052FF] text-white font-bold uppercase tracking-wider text-center cursor-pointer"
                >
                  EXPLORE INCIDENT PLAYBOOKS ↓
                </a>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
