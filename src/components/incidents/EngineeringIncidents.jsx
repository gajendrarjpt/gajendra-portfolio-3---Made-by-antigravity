import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { incidentCaseStudies } from '../../data/portfolioData';

export default function EngineeringIncidents() {
  const [selectedIncidentId, setSelectedIncidentId] = useState(incidentCaseStudies[0].id);
  const [showFullEvidence, setShowFullEvidence] = useState(false);
  const activeIncident = incidentCaseStudies.find((inc) => inc.id === selectedIncidentId) || incidentCaseStudies[0];

  return (
    <section id="incidents" className="pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase">
            <span>03 / ENGINEERING PLAYBOOKS</span>
            <span>·</span>
            <span>SIMULATED POST-MORTEMS & RCA</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white max-w-4xl leading-[0.92]">
            INCIDENT PLAYBOOKS.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal leading-relaxed">
            These reference scenarios demonstrate how I approach diagnosis, evidence correlation, root-cause isolation and recovery across complex network failure modes.
          </p>
        </div>

        {/* Incident Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 font-mono text-xs">
          {incidentCaseStudies.map((inc) => {
            const isSelected = selectedIncidentId === inc.id;
            return (
              <button
                key={inc.id}
                onClick={() => {
                  setSelectedIncidentId(inc.id);
                  setShowFullEvidence(false);
                }}
                className={`p-4 text-left border transition-all rounded-xs flex flex-col justify-between h-[115px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#0052FF] text-white border-[#0052FF] shadow-lg shadow-[#0052FF]/20 scale-102'
                    : 'bg-[#F4F1EA] dark:bg-[#0A0A0A] text-[#121212] dark:text-[#CCCCCC] border-[#121212]/15 dark:border-[#1F1F1F] hover:border-[#0052FF]'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-xs ${
                    inc.severity.includes('P1')
                      ? isSelected ? 'bg-white text-[#FF3344]' : 'bg-[#FF3344]/20 text-[#FF3344] border border-[#FF3344]/30'
                      : isSelected ? 'bg-white text-[#0052FF]' : 'bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00E5FF] border border-[#0052FF]/30'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="opacity-70 text-[10px]">CASE {inc.index}</span>
                </div>
                <div className="font-display font-bold text-xs uppercase line-clamp-2 leading-snug">
                  {inc.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Incident Dossier Investigation Deck */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIncident.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-6 sm:p-10 rounded-xs shadow-2xl"
          >
            {/* Header: Title & Environment */}
            <div className="flex flex-col gap-2 border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[#0052FF] dark:text-[#00FF66] font-bold uppercase tracking-wider">
                  CASE {activeIncident.index} // {activeIncident.category}
                </span>
                <span className="text-[#5A5A57] dark:text-[#888888] uppercase text-[11px]">
                  {activeIncident.environment}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#121212] dark:text-white tracking-tight">
                {activeIncident.title}
              </h3>
            </div>

            {/* Primary Triad: Problem → Root Cause → Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-sm mb-6">
              
              {/* 1. Problem */}
              <div className="p-5 bg-[#FAF8F5] dark:bg-[#111111] border-l-2 border-l-[#FF3344] border-y border-r border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-[#FF3344] uppercase tracking-wider flex items-center gap-1.5">
                  <span>● 01</span>
                  <span>THE PROBLEM</span>
                </span>
                <p className="text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed text-[13.5px]">
                  {activeIncident.problem}
                </p>
              </div>

              {/* 2. Root Cause */}
              <div className="p-5 bg-[#FAF8F5] dark:bg-[#111111] border-l-2 border-l-[#0052FF] dark:border-l-[#00E5FF] border-y border-r border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-[#0052FF] dark:text-[#00E5FF] uppercase tracking-wider flex items-center gap-1.5">
                  <span>● 02</span>
                  <span>ROOT CAUSE ISOLATION</span>
                </span>
                <p className="text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed text-[13.5px]">
                  {activeIncident.diagnosis}
                </p>
              </div>

              {/* 3. Resolution */}
              <div className="p-5 bg-[#FAF8F5] dark:bg-[#111111] border-l-2 border-l-[#008833] dark:border-l-[#00FF66] border-y border-r border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-[#008833] dark:text-[#00FF66] uppercase tracking-wider flex items-center gap-1.5">
                  <span>● 03</span>
                  <span>RESOLUTION & CAPA</span>
                </span>
                <p className="text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed text-[13.5px]">
                  {activeIncident.resolution}
                </p>
              </div>
            </div>

            {/* Progressive Disclosure Toggle for Deep Evidence */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setShowFullEvidence(!showFullEvidence)}
                className="font-mono text-xs text-[#0052FF] dark:text-[#00FF66] hover:underline font-semibold uppercase flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>{showFullEvidence ? '▾ HIDE DIAGNOSTIC EVIDENCE' : '▸ INSPECT FULL EVIDENCE & TELEMETRY'}</span>
              </button>
            </div>

            {/* Expanded Deep Diagnostic Evidence */}
            {showFullEvidence && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-sm pt-6 mt-4 border-t border-[#121212]/10 dark:border-[#1F1F1F]"
              >
                {/* Impact */}
                <div className="p-4 bg-[#FAF8F5] dark:bg-[#111111] border border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] font-bold text-[#FF9900] uppercase tracking-wider">
                    OPERATIONAL IMPACT
                  </span>
                  <p className="text-[#5A5A57] dark:text-[#AAAAAA] text-xs leading-relaxed">
                    {activeIncident.impact}
                  </p>
                </div>

                {/* Telemetry Detection */}
                <div className="p-4 bg-[#FAF8F5] dark:bg-[#111111] border border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] font-bold text-[#0052FF] dark:text-[#00E5FF] uppercase tracking-wider">
                    TELEMETRY DETECTION
                  </span>
                  <p className="text-[#5A5A57] dark:text-[#AAAAAA] text-xs leading-relaxed">
                    {activeIncident.detection}
                  </p>
                </div>

                {/* Verification */}
                <div className="p-4 bg-[#FAF8F5] dark:bg-[#111111] border border-[#121212]/10 dark:border-[#222222] rounded-xs flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] font-bold text-[#008833] dark:text-[#00FF66] uppercase tracking-wider">
                    POST-FIX VERIFICATION
                  </span>
                  <p className="text-[#5A5A57] dark:text-[#AAAAAA] text-xs leading-relaxed">
                    {activeIncident.verification}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Permanent Outcome */}
            <div className="mt-6 pt-5 border-t border-[#121212]/10 dark:border-[#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#0052FF] dark:text-[#00FF66] font-bold uppercase">CAPA OUTCOME:</span>
                <span className="text-[#5A5A57] dark:text-[#AAAAAA]">{activeIncident.outcome}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
