import React, { useState } from 'react';
import { profile, socials, certifications, education } from '../../data/portfolioData';
import MagneticButton from '../ui/MagneticButton';

export default function ContactBridge({ onOpenBridge }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] dark:text-[#00FF66] tracking-widest uppercase mb-8">
          <span>06 / DIRECT CONNECT</span>
          <span>·</span>
          <span>NOC INCIDENT COMMAND BRIDGE</span>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white">
            INITIATE
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white flex items-baseline gap-4">
            <span>DISPATCH.</span>
            <span className="w-5 h-5 sm:w-8 sm:h-8 bg-[#0052FF] dark:bg-[#00FF66] inline-block animate-pulse" />
          </h2>
        </div>

        {/* Live NOC Status Banner */}
        <div className="p-4 rounded-md border border-[#121212]/15 dark:border-[#222222] bg-[#F4F1EA] dark:bg-[#0A0A0A] font-mono text-xs mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-ping" />
            <span className="font-bold text-[#121212] dark:text-white uppercase">ENGINEER ON-CALL: GAJENDRA RAJPUT</span>
            <span className="text-[#5A5A57] dark:text-[#888888] hidden sm:inline">|</span>
            <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold hidden sm:inline">STATUS: NOC TIER 2/3 READY</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#5A5A57] dark:text-[#888888]">
            <span>LATENCY: <strong className="text-[#121212] dark:text-white">0.84 ms</strong></span>
            <span>BACKBONE: <strong className="text-[#008833] dark:text-[#00FF66]">NOMINAL</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#121212]/10 dark:border-[#1F1F1F]">
          
          {/* Left Action Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="font-body text-xl text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed max-w-2xl font-normal">
              Available for Senior Network Engineer roles, Tier 2/3 NOC operations, enterprise network architecture, multi-vendor firewall hardening, and mission-critical reliability engagements.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <MagneticButton>
                <a
                  href={socials.email.url}
                  className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 bg-[#0052FF] hover:bg-[#0042D0] text-white transition-all shadow-lg shadow-[#0052FF]/25 flex items-center justify-between gap-6"
                >
                  <span>EMAIL ME DIRECT</span>
                  <span>→</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#F4F1EA] dark:bg-[#0A0A0A] hover:bg-[#FAF8F5] dark:hover:bg-[#111111] transition-all flex items-center justify-between gap-6"
                >
                  <span>LINKEDIN DIRECT</span>
                  <span>↗</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={profile.resume.url}
                  download="Gajendra_Rajput_Resume.pdf"
                  className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#F4F1EA] dark:bg-[#0A0A0A] hover:bg-[#FAF8F5] dark:hover:bg-[#111111] transition-all flex items-center justify-between gap-6"
                >
                  <span>DOWNLOAD RESUME</span>
                  <span>↓</span>
                </a>
              </MagneticButton>
            </div>

            <div className="font-mono text-xs text-[#5A5A57] dark:text-[#888888] flex flex-col gap-2 pt-4">
              <div className="flex items-center gap-3">
                <span>EMAIL: <strong className="text-[#121212] dark:text-white">{profile.email}</strong></span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-0.5 border border-[#121212]/20 dark:border-[#333] text-[10px] uppercase font-bold hover:bg-[#0052FF] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? '✓ COPIED' : 'COPY EMAIL'}
                </button>
              </div>
              <span>LOCATION: <strong className="text-[#121212] dark:text-white">{profile.location} (OPEN TO GLOBAL / REMOTE)</strong></span>
            </div>
          </div>

          {/* Right Credentials Column */}
          <div className="lg:col-span-5 border-l border-[#121212]/10 dark:border-[#1F1F1F] pl-0 lg:pl-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // CERTIFICATIONS & SECURITY CREDENTIALS
              </span>
              <div className="flex flex-col gap-3 font-mono text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-4 bg-[#F4F1EA] dark:bg-[#0A0A0A] border border-[#121212]/10 dark:border-[#1F1F1F] flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-base text-[#121212] dark:text-white uppercase">{cert.name}</div>
                      <div className="text-[10px] text-[#5A5A57] dark:text-[#888888]">{cert.fullName} · {cert.issuer}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-[#0052FF] text-white uppercase rounded-xs">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // ACADEMIC FOUNDATION
              </span>
              <div className="flex flex-col gap-3 font-mono text-xs">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-2 text-[#5A5A57] dark:text-[#AAAAAA]">
                    <div>
                      <div className="font-semibold text-[#121212] dark:text-white uppercase">{edu.degree}</div>
                      <div className="text-[10px] text-[#5A5A57] dark:text-[#888888]">{edu.institution}</div>
                    </div>
                    <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
