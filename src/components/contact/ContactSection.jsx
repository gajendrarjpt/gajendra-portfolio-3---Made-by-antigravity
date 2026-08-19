import React from 'react';
import { profile, socials, certifications, education } from '../../data/portfolioData';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Metadata */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase mb-8">
          <span>06 / DIRECT ENGAGEMENT</span>
          <span>·</span>
          <span>CONNECT</span>
        </div>

        {/* Oversized Statement Headline */}
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white">
            HAVE A NETWORK
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white flex items-baseline gap-4">
            <span>PROBLEM TO SOLVE?</span>
            <span className="w-5 h-5 sm:w-8 sm:h-8 bg-[#0052FF] inline-block" />
          </h2>
        </div>

        {/* Contact Links & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#121212]/15 dark:border-[#222222]">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="font-body text-xl text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed max-w-2xl font-normal">
              Available for Senior Network Engineer roles, Tier 2/3 NOC operations, network security audits, and enterprise infrastructure reliability contracts.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="group font-mono text-xs font-semibold tracking-wider uppercase px-8 py-5 bg-[#121212] dark:bg-white text-[#FAF8F5] dark:text-[#121212] hover:bg-[#0052FF] dark:hover:bg-[#0052FF] dark:hover:text-white transition-colors flex items-center justify-between gap-6"
              >
                <span>CONNECT ON LINKEDIN</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              <a
                href={socials.email.url}
                data-cursor="EMAIL"
                className="group font-mono text-xs font-semibold tracking-wider uppercase px-8 py-5 border border-[#121212]/30 dark:border-[#333] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white transition-colors flex items-center justify-between gap-6"
              >
                <span>SEND DIRECT EMAIL</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] flex flex-col gap-1 pt-4">
              <span>EMAIL ADDRESS: {profile.email}</span>
              <span>LOCATION: {profile.location}</span>
            </div>
          </div>

          {/* Right Column: Certifications & Academic Credentials */}
          <div className="lg:col-span-5 border-l border-[#121212]/15 dark:border-[#222222] pl-0 lg:pl-12 flex flex-col gap-8">
            {/* Certifications */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // VERIFIED CERTIFICATIONS
              </span>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-[#F4F1EA] dark:bg-[#080808] border border-[#121212]/10 dark:border-[#222] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-lg text-[#121212] dark:text-white uppercase">
                        {cert.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#5A5A57] dark:text-[#A0A09C]">
                        {cert.fullName}
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-1 uppercase ${
                      cert.id === 'ccna' ? 'bg-[#0052FF] text-[#FAF8F5]' : 'bg-[#121212]/10 dark:bg-white/10 text-[#5A5A57] dark:text-[#A0A09C]'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Education */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                // EDUCATION & DEGREES
              </span>
              <div className="flex flex-col gap-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline font-mono text-xs border-b border-[#121212]/10 dark:border-[#222] pb-2">
                    <div>
                      <div className="font-semibold text-[#121212] dark:text-white uppercase">{edu.degree}</div>
                      <div className="text-[10px] text-[#5A5A57] dark:text-[#A0A09C]">{edu.institution}</div>
                    </div>
                    <span className="text-[#0052FF] font-semibold">{edu.year}</span>
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
