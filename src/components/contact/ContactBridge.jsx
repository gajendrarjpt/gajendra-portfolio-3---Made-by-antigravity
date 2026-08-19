import React from 'react';
import { profile, socials, certifications, education } from '../../data/portfolioData';

export default function ContactBridge({ onOpenBridge }) {
  return (
    <section id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase mb-8">
          <span>06 / DIRECT CONNECT</span>
          <span>·</span>
          <span>INCIDENT BRIDGE</span>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white">
            INITIATE
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white flex items-baseline gap-4">
            <span>ENGAGEMENT.</span>
            <span className="w-5 h-5 sm:w-8 sm:h-8 bg-[#0052FF] dark:bg-[#00FF66] inline-block" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#121212]/10 dark:border-[#1F1F1F]">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="font-body text-xl text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed max-w-2xl font-normal">
              Available for Senior Network Engineer roles, Tier 2/3 NOC operations, network security audits, and enterprise infrastructure reliability contracts.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href={socials.email.url}
                className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 bg-[#0052FF] hover:bg-[#0042D0] text-white transition-all shadow-lg shadow-[#0052FF]/25 flex items-center justify-between gap-6"
              >
                <span>EMAIL ME DIRECT</span>
                <span>→</span>
              </a>

              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#F4F1EA] dark:bg-[#0A0A0A] hover:bg-[#FAF8F5] dark:hover:bg-[#111111] transition-all flex items-center justify-between gap-6"
              >
                <span>LINKEDIN DIRECT</span>
                <span>↗</span>
              </a>

              <a
                href={profile.resume.url}
                download="Gajendra_Rajput_Resume.pdf"
                className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-5 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#F4F1EA] dark:bg-[#0A0A0A] hover:bg-[#FAF8F5] dark:hover:bg-[#111111] transition-all flex items-center justify-between gap-6"
              >
                <span>DOWNLOAD RESUME</span>
                <span>↓</span>
              </a>
            </div>

            <div className="font-mono text-xs text-[#5A5A57] dark:text-[#888888] flex flex-col gap-1 pt-4">
              <span>
                EMAIL ADDRESS:{' '}
                <a
                  href={socials.email.url}
                  className="text-[#121212] dark:text-white font-semibold underline hover:text-[#0052FF] dark:hover:text-[#00FF66] transition-colors"
                >
                  {profile.email}
                </a>
              </span>
              <span>LOCATION: {profile.location}</span>
            </div>
          </div>

          <div className="lg:col-span-5 border-l border-[#121212]/10 dark:border-[#1F1F1F] pl-0 lg:pl-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // CERTIFICATIONS
              </span>
              <div className="flex flex-col gap-3 font-mono text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-4 bg-[#F4F1EA] dark:bg-[#0A0A0A] border border-[#121212]/10 dark:border-[#1F1F1F] flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-base text-[#121212] dark:text-white uppercase">{cert.name}</div>
                      <div className="text-[10px] text-[#5A5A57] dark:text-[#888888]">{cert.fullName}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-[#0052FF] text-white uppercase">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // EDUCATION
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
