import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { careerStages, profile } from '../../data/portfolioData';

const STAGE_DEEP_DIVES = [
  {
    stageIndex: 0,
    scope: 'FIRST-LINE SLA TRIAGE & TICKET ISOLATION',
    severityHandling: 'P3 / P4 User Incidents & Alert Ingestion',
    keyTools: ['Ping / Traceroute', 'ServiceNow', 'Cisco CLI', 'Syslog Ingestion'],
    responsibilities: [
      'Monitored 24/7 network telemetry across infrastructure estate.',
      'Triaged customer-impacting network alarms and isolated Layer 1-3 faults.',
      'Documented diagnostic steps and managed SLA escalation workflows.'
    ],
    uptimeImpact: 'Consistent first-touch SLA response and ticket lifecycle discipline.'
  },
  {
    stageIndex: 1,
    scope: 'ENTERPRISE ROUTING, SWITCHING & MULTI-VENDOR FIREWALLS',
    severityHandling: 'P2 Intermediate Outages & Change Requests',
    keyTools: ['Palo Alto PA-3220', 'FortiGate', 'Sophos XG', 'Cisco Catalyst STP', 'Aruba WLAN', 'Nessus'],
    responsibilities: [
      'Configured 802.1Q VLAN trunks, RSTP root bridges, and L3 EtherChannels.',
      'Managed perimeter security policies, IPsec site-to-site VPNs, and Nessus vulnerability scans.',
      'Executed scheduled maintenance window firmware upgrades with documented rollback plans.'
    ],
    uptimeImpact: 'Disciplined operational reliability and configuration audit compliance across multi-vendor infrastructure.'
  },
  {
    stageIndex: 2,
    scope: 'SENIOR NOC ESCALATION, P1/P2 INCIDENT BRIDGES & CAPA',
    severityHandling: 'P1 Mission-Critical Outages & Core Network Escalation',
    keyTools: ['Wireshark Deep PCAP', 'BGP Routing', 'SolarWinds NPM', 'Dell PowerVault SAN', 'VMware vDS', 'CAPA RCA'],
    responsibilities: [
      'Lead live high-priority P1/P2 technical incident bridges with cross-functional teams.',
      'Perform deep packet inspection (TCP window sizing, SYN floods, retransmissions) to isolate root causes.',
      'Author formal Corrective and Preventive Action (CAPA) reports and Post-Incident Reviews (PIR).'
    ],
    uptimeImpact: 'Systematic root-cause isolation and permanent CAPA remediation on mission-critical escalations.'
  }
];

export default function CareerStory() {
  const [activeStage, setActiveStage] = useState(2);
  const activeDetails = STAGE_DEEP_DIVES[activeStage];

  return (
    <section id="story" className="pt-8 pb-20 md:pt-10 md:pb-28 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase">
            <span>01 / CAREER STORY</span>
            <span>·</span>
            <span>NOC COMMAND PROGRESSION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-[#F4F4F0] max-w-4xl leading-tight">
            FROM L1 NOC SUPPORT TO TIER 2/3 INCIDENT COMMAND.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#A0A09C] max-w-2xl font-normal">
            A deliberate engineering journey built around high-availability routing, multi-vendor firewall control, deep packet diagnostics, and mission-critical uptime.
          </p>
        </motion.div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Narrative Block */}
          <div className="lg:col-span-5 flex flex-col gap-6 font-body text-base text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed">
            <p>
              Holding a degree in Mechanical Engineering, I made a disciplined pivot into Network Engineering — applying systems mechanics and empirical troubleshooting to enterprise routing stacks, packet telemetry, and network security.
            </p>
            <p>
              Starting in first-line NOC operations at Mannschaft IT, I mastered fast SLA triage, incident isolation, and rapid alert escalation under high-pressure shift environments.
            </p>
            <p>
              Advancing to Tier 2 Network Administration at Semantic Technologies, I took full operational ownership of multi-vendor firewall policies (Palo Alto, Fortinet, Sophos), Cisco Catalyst switching fabrics, and enterprise Aruba WLAN deployments.
            </p>
            <p>
              Today as a Senior Network Engineer (NOC Tier 2/3) at PHN Technology, I direct P1/P2 technical incident bridges, conduct deep packet captures in Wireshark, engineer firmware rollback lifecycles, and author CAPA root-cause post-mortems.
            </p>

            {/* Interactive Stage Deep Dive Card */}
            <div className="mt-4 p-5 rounded-md border border-[#121212]/15 dark:border-[#222222] bg-[#F4F1EA] dark:bg-[#0A0A0A] font-mono text-xs flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#121212]/10 dark:border-[#222222] pb-2">
                <span className="text-[#121212] dark:text-white font-bold uppercase">
                  {careerStages[activeStage].label} // CAPABILITY PROFILE
                </span>
                <span className="text-[10px] text-[#0052FF] dark:text-[#00FF66] font-bold">
                  {careerStages[activeStage].period}
                </span>
              </div>

              <div>
                <span className="text-[#5A5A57] dark:text-[#888888] text-[10px] block uppercase">SEVERITY SCOPE</span>
                <span className="text-[#121212] dark:text-white font-semibold text-xs">{activeDetails.severityHandling}</span>
              </div>

              <div>
                <span className="text-[#5A5A57] dark:text-[#888888] text-[10px] block uppercase">TOOL ARSENAL</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeDetails.keyTools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#151515] border border-[#121212]/10 dark:border-[#2A2A2A] rounded-xs text-[10px] text-[#121212] dark:text-[#CCCCCC]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-1 border-t border-[#121212]/10 dark:border-[#222222]">
                <span className="text-[#5A5A57] dark:text-[#888888] text-[10px] block uppercase">MEASURED OUTCOME</span>
                <span className="text-[#008833] dark:text-[#00FF66] font-semibold text-[11px]">{activeDetails.uptimeImpact}</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Timeline Path */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative pl-4 md:pl-8 border-l border-[#121212]/15 dark:border-[#222222]">
            {careerStages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.label}
                  onClick={() => setActiveStage(idx)}
                  className={`group relative pl-6 transition-all duration-300 cursor-pointer ${
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-90'
                  }`}
                >
                  {/* Timeline Active Marker */}
                  <div
                    className={`absolute -left-[21px] top-1.5 w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'border-[#0052FF] bg-[#FAF8F5] dark:bg-[#000000] scale-125 ring-4 ring-[#0052FF]/20'
                        : 'border-[#121212]/30 dark:border-[#444] bg-[#FAF8F5] dark:bg-[#000000]'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#0052FF] dark:bg-[#00FF66]' : 'bg-[#121212]/30 dark:bg-[#444]'
                      }`}
                    />
                  </div>

                  {/* Stage Card */}
                  <div className={`flex flex-col gap-2.5 border-b border-[#121212]/10 dark:border-[#222222] pb-8 p-4 rounded-md transition-all ${
                    isActive ? 'bg-[#F4F1EA]/50 dark:bg-[#111111]/50 border-l-2 border-l-[#0052FF]' : ''
                  }`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                      <span className="text-[#0052FF] dark:text-[#00FF66] font-bold tracking-wider">
                        {stage.period}
                      </span>
                      <span className="text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-widest text-[10px]">
                        STAGE {stage.index} // {stage.label}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#121212] dark:text-white tracking-tight uppercase group-hover:text-[#0052FF] dark:group-hover:text-[#00FF66] transition-colors">
                      {stage.title}
                    </h3>

                    <div className="font-mono text-xs font-semibold text-[#121212]/80 dark:text-white/80 uppercase flex items-center gap-2">
                      <span>{stage.company}</span>
                      {stage.status === 'current' && (
                        <span className="px-2 py-0.5 text-[9px] bg-[#00FF66]/20 text-[#008833] dark:text-[#00FF66] border border-[#00FF66]/30 font-bold rounded-xs">
                          CURRENT
                        </span>
                      )}
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
