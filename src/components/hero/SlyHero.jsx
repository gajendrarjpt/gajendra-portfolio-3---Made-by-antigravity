import React, { useState, useEffect, useRef } from 'react';
import { profile, highlights, heroSimulations } from '../../data/portfolioData';
import MagneticButton from '../ui/MagneticButton';

// Enterprise Packet Tracer / GNS3 Topology Node Definitions
const LAB_NODES = [
  { id: 'cloud', label: 'INTERNET_WAN', type: 'cloud', ip: '203.0.113.1', model: 'BGP AS65001 Cloud', protocol: 'eBGP / 10G Fiber', x: 22, y: 16, status: 'ESTABLISHED' },
  { id: 'router', label: 'R1_EDGE_ROUTER', type: 'router', ip: '192.168.1.1', model: 'Cisco ISR 4451-X', protocol: 'OSPFv2 / BGP Gateway', x: 78, y: 16, status: 'ONLINE' },
  { id: 'firewall', label: 'FW1_PALO_ALTO', type: 'firewall', ip: '10.0.1.1', model: 'Palo Alto PA-3220', protocol: 'App-ID / Zone Security', x: 50, y: 46, status: 'PROTECTED' },
  { id: 'wifi', label: 'AP1_WIFI_WLAN', type: 'wifi', ip: '10.0.5.10', model: 'Aruba / Cisco AP', protocol: '802.1X WPA3 Enterprise', x: 18, y: 80, status: 'BROADCASTING' },
  { id: 'switch', label: 'SW1_CORE_STACK', type: 'switch', ip: '10.0.2.1', model: 'Cisco Cat 9300 L3 Stack', protocol: 'VLAN 10/20 / RSTP Root', x: 50, y: 80, status: 'FORWARDING' },
  { id: 'server', label: 'SRV1_DATA_CENTER', type: 'server', ip: '10.0.10.50', model: 'Dell R750 Enterprise Svr', protocol: 'SAN / RADIUS / Wireshark', x: 82, y: 80, status: 'ACTIVE' },
];

const LAB_LINKS = [
  { id: 'wan-link', from: 'cloud', to: 'router', label: 'WAN Link (BGP)', speed: '10 Gbps Fiber', isPrimary: true },
  { id: 'r1-fw1', from: 'router', to: 'firewall', label: 'Gi0/0/1', speed: '1 Gbps Copper', isPrimary: true },
  { id: 'cloud-fw1-backup', from: 'cloud', to: 'firewall', label: 'Gi0/0/2 Backup', speed: '1 Gbps Copper', isPrimary: false },
  { id: 'fw1-sw1', from: 'firewall', to: 'switch', label: 'eth1/1 Trunk', speed: '10 Gbps SFP+', isPrimary: true },
  { id: 'sw1-wifi', from: 'switch', to: 'wifi', label: 'Fa0/1 PoE+', speed: '1000 Mbps', isPrimary: true },
  { id: 'sw1-srv', from: 'switch', to: 'server', label: 'Gi1/0/24 SPAN', speed: '10 Gbps SFP+', isPrimary: true },
];

export default function SlyHero({ onOpenBridge }) {
  const canvasRef = useRef(null);
  const [activeSimMode, setActiveSimMode] = useState('normal'); // 'normal' | 'failover' | 'threat' | 'wireshark'
  const [selectedNodeId, setSelectedNodeId] = useState('firewall');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const activeNode = LAB_NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || LAB_NODES[2];
  const sim = heroSimulations[activeSimMode] || heroSimulations.normal;

  // Real-time Canvas Packet Simulation Engine with IntersectionObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let progress = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      progress += sim.packetSpeed;
      if (progress > 1) progress = 0;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const baseLinkColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(18, 18, 18, 0.2)';
      const activeLinkColor = isDark ? 'rgba(0, 255, 102, 0.6)' : 'rgba(0, 82, 255, 0.6)';
      const severedLinkColor = 'rgba(255, 59, 48, 0.85)';

      // 1. Draw Topology Links
      LAB_LINKS.forEach((link) => {
        const isSevered = activeSimMode === 'failover' && link.id === 'r1-fw1';
        const isBackupActive = activeSimMode === 'failover' && link.id === 'cloud-fw1-backup';
        const isBackupInactive = activeSimMode !== 'failover' && !link.isPrimary;

        if (isBackupInactive) return;

        const n1 = LAB_NODES.find((n) => n.id === link.from);
        const n2 = LAB_NODES.find((n) => n.id === link.to);

        if (n1 && n2) {
          const x1 = (n1.x / 100) * width;
          const y1 = (n1.y / 100) * height;
          const x2 = (n2.x / 100) * width;
          const y2 = (n2.y / 100) * height;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);

          if (isSevered) {
            ctx.strokeStyle = severedLinkColor;
            ctx.lineWidth = 2.2;
            ctx.setLineDash([6, 6]);
            ctx.stroke();
            ctx.setLineDash([]);

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            ctx.fillStyle = '#FF3B30';
            ctx.font = 'bold 9px monospace';
            ctx.fillText('⚡ LINK CUT', midX - 25, midY - 6);
          } else if (isBackupActive) {
            ctx.strokeStyle = '#FF9900';
            ctx.lineWidth = 2.2;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = baseLinkColor;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }

          // 2. Animated Flowing Data Packets
          if (!isSevered) {
            const px = x1 + (x2 - x1) * progress;
            const py = y1 + (y2 - y1) * progress;

            if (activeSimMode === 'threat' && (link.id === 'wan-link' || link.id === 'r1-fw1')) {
              ctx.beginPath();
              ctx.arc(px, py, 4, 0, Math.PI * 2);
              ctx.fillStyle = '#FF3344';
              ctx.fill();

              ctx.beginPath();
              ctx.arc(px, py, 8, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(255, 51, 68, 0.4)';
              ctx.lineWidth = 1.2;
              ctx.stroke();
            } else {
              const packetColor = isDark ? '#00FF66' : '#0052FF';
              ctx.beginPath();
              ctx.arc(px, py, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = packetColor;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(px, py, 7, 0, Math.PI * 2);
              ctx.strokeStyle = isDark ? 'rgba(0, 255, 102, 0.35)' : 'rgba(0, 82, 255, 0.35)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSimMode, sim.packetSpeed]);

  return (
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 flex flex-col justify-between border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] bg-sly-grid overflow-hidden transition-colors">

      {/* Hero Headline & Intro */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 pb-8 lg:pt-4 lg:pb-12 z-10">
        
        {/* Left Headline Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F4F1EA] dark:bg-[#111111] border border-[#121212]/15 dark:border-[#2A2A2A] rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
            <span className="font-mono text-[10px] text-[#121212] dark:text-[#AAAAAA] uppercase tracking-wider font-semibold">
              SENIOR NETWORK ENGINEER // NOC OPERATIONS
            </span>
          </div>

          <div className="flex flex-col gap-2 max-w-full">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-5xl xl:text-7xl font-bold tracking-tight uppercase leading-[0.92] text-[#121212] dark:text-white break-words">
              GAJENDRA RAJPUT.
            </h1>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-4xl xl:text-6xl font-bold tracking-tight uppercase leading-[0.94] text-[#5A5A57] dark:text-[#888888] break-words">
              ENGINEERING THE INVISIBLE.
            </h1>
          </div>

          <p className="font-body text-base sm:text-lg lg:text-xl text-[#5A5A57] dark:text-[#AAAAAA] max-w-xl font-normal leading-relaxed">
            I design, troubleshoot, and operate the enterprise infrastructure people rarely see, but depend on every second — spanning Cisco routing & switching, multi-vendor firewalls, deep Wireshark telemetry, and mission-critical NOC incident command.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton>
              <button
                onClick={onOpenBridge}
                className="font-mono text-xs font-bold uppercase tracking-wider px-7 py-4 bg-[#0052FF] hover:bg-[#0042D0] text-white transition-all shadow-lg shadow-[#0052FF]/25 flex items-center gap-3 cursor-pointer"
              >
                <span>INITIATE BRIDGE</span>
                <span>→</span>
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#journey"
                className="font-mono text-xs font-bold uppercase tracking-wider px-7 py-4 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#FAF8F5] dark:bg-[#0A0A0A] hover:bg-[#F4F1EA] dark:hover:bg-[#111111] transition-all inline-block"
              >
                FOLLOW THE PACKET ↓
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Interactive Packet Tracer / Network Lab Simulation Deck */}
        <div className="lg:col-span-5 relative w-full border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-4 flex flex-col justify-between shadow-2xl overflow-hidden shrink-0">
          
          {/* Deck Header: Simulation Mode Controls */}
          <div className="flex flex-col gap-2.5 border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-3 z-10">
            <div className="flex justify-between items-center font-mono text-[10px] text-[#5A5A57] dark:text-[#888888] uppercase">
              <span className="flex items-center gap-1.5 text-[#121212] dark:text-white font-bold">
                <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
                GNS3 // LIVE TELEMETRY LAB
              </span>
              <span className={`px-2 py-0.5 font-bold uppercase text-[9px] rounded-xs ${
                sim.badgeTone === 'emerald' ? 'bg-[#00FF66]/20 text-[#008833] dark:text-[#00FF66] border border-[#00FF66]/30' :
                sim.badgeTone === 'amber' ? 'bg-[#FF9900]/20 text-[#CC7A00] dark:text-[#FF9900] border border-[#FF9900]/30' :
                sim.badgeTone === 'rose' ? 'bg-[#FF3344]/20 text-[#CC2233] dark:text-[#FF3344] border border-[#FF3344]/30' :
                'bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00E5FF] border border-[#0052FF]/30'
              }`}>
                {sim.badge}
              </span>
            </div>

            {/* Interactive Simulation Preset Buttons */}
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px] font-bold">
              <button
                type="button"
                onClick={() => setActiveSimMode('normal')}
                className={`py-1.5 px-2 rounded-xs border transition-all text-left truncate cursor-pointer ${
                  activeSimMode === 'normal'
                    ? 'bg-[#0052FF] text-white border-[#0052FF]'
                    : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#5A5A57] dark:text-[#AAAAAA] border-[#121212]/10 dark:border-[#222222] hover:border-[#0052FF]'
                }`}
              >
                ● 01: NORMAL L2/L3
              </button>

              <button
                type="button"
                onClick={() => setActiveSimMode('failover')}
                className={`py-1.5 px-2 rounded-xs border transition-all text-left truncate cursor-pointer ${
                  activeSimMode === 'failover'
                    ? 'bg-[#FF9900] text-black font-extrabold border-[#FF9900]'
                    : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#5A5A57] dark:text-[#AAAAAA] border-[#121212]/10 dark:border-[#222222] hover:border-[#FF9900]'
                }`}
              >
                ⚡ 02: FIBER CUT HA
              </button>

              <button
                type="button"
                onClick={() => setActiveSimMode('threat')}
                className={`py-1.5 px-2 rounded-xs border transition-all text-left truncate cursor-pointer ${
                  activeSimMode === 'threat'
                    ? 'bg-[#FF3344] text-white border-[#FF3344]'
                    : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#5A5A57] dark:text-[#AAAAAA] border-[#121212]/10 dark:border-[#222222] hover:border-[#FF3344]'
                }`}
              >
                🛡️ 03: DDoS SCRUBBING
              </button>

              <button
                type="button"
                onClick={() => setActiveSimMode('wireshark')}
                className={`py-1.5 px-2 rounded-xs border transition-all text-left truncate cursor-pointer ${
                  activeSimMode === 'wireshark'
                    ? 'bg-[#0052FF] text-white border-[#0052FF]'
                    : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#5A5A57] dark:text-[#AAAAAA] border-[#121212]/10 dark:border-[#222222] hover:border-[#0052FF]'
                }`}
              >
                🔍 04: PCAP SPAN
              </button>
            </div>
          </div>

          {/* Topology Canvas & Interactive Nodes */}
          <div className="relative w-full h-[280px] my-auto">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

            {/* Interactive Nodes with Authentic Network Device Icons */}
            {LAB_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const activeState = isSelected || isHovered;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                >
                  <div className={`p-2 rounded-md border flex items-center justify-center transition-all duration-300 shadow-md ${
                    activeState
                      ? 'bg-[#0052FF] text-white border-[#0052FF] scale-110 shadow-lg shadow-[#0052FF]/30'
                      : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border-[#121212]/20 dark:border-[#222222] group-hover:border-[#0052FF]'
                  }`}>
                    {node.type === 'cloud' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                      </svg>
                    )}
                    {node.type === 'router' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="10" width="18" height="8" rx="1.5" />
                        <path d="M8 10V6a1 1 0 011-1h6a1 1 0 011 1v4" />
                        <path d="M7 14h.01M11 14h.01M15 14h.01" strokeWidth="2.6" strokeLinecap="round" />
                        <path d="M9 5l-1-2M15 5l1-2" strokeLinecap="round" />
                      </svg>
                    )}
                    {node.type === 'firewall' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21c4.5-2 7-5.5 7-10V6l-7-3-7 3v5c0 4.5 2.5 8 7 10z" />
                        <path d="M8 10h3M13 10h3M8 13.5h4.5M14.5 13.5h1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {node.type === 'switch' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2.5" y="7" width="19" height="10" rx="1" />
                        <path d="M5.5 10.5v3M8.5 10.5v3M11.5 10.5v3M14.5 10.5v3M17.5 10.5v3" strokeLinecap="round" />
                      </svg>
                    )}
                    {node.type === 'wifi' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="8" y="15" width="8" height="4" rx="1" />
                        <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
                        <path d="M9 12a4 4 0 016 0M6.5 9.5a8 8 0 0111 0" strokeLinecap="round" />
                      </svg>
                    )}
                    {node.type === 'server' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3.5" y="4" width="17" height="6" rx="1" />
                        <rect x="3.5" y="14" width="17" height="6" rx="1" />
                        <circle cx="7" cy="7" r="0.6" fill="currentColor" stroke="none" />
                        <circle cx="7" cy="17" r="0.6" fill="currentColor" stroke="none" />
                        <path d="M11 7h6M11 17h6" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <div className={`mt-1 font-mono text-[8.5px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider transition-all text-center whitespace-nowrap ${
                    activeState
                      ? 'bg-[#0052FF] text-white'
                      : 'bg-[#FAF8F5]/90 dark:bg-[#111111]/90 text-[#121212] dark:text-[#CCCCCC] border border-[#121212]/10 dark:border-[#222]'
                  }`}>
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Telemetry HUD & Selected Node Breakdown */}
          <div className="border-t border-[#121212]/10 dark:border-[#1F1F1F] pt-2.5 z-10 bg-[#F4F1EA]/95 dark:bg-[#0A0A0A]/95 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[#121212] dark:text-white font-bold mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="text-[#0052FF] dark:text-[#00FF66]">$</span>
                <span>{activeNode.label} ({activeNode.model})</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#0052FF] text-white uppercase rounded-xs">
                {activeNode.status}
              </span>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-4 gap-1.5 text-center p-1.5 bg-[#FAF8F5] dark:bg-[#121212] border border-[#121212]/10 dark:border-[#222222] rounded-xs mb-1.5">
              <div>
                <span className="text-[8px] text-[#5A5A57] dark:text-[#888888] block">LATENCY</span>
                <span className="text-[9.5px] font-bold text-[#121212] dark:text-white">{sim.metrics.latency}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#5A5A57] dark:text-[#888888] block">PKT LOSS</span>
                <span className="text-[9.5px] font-bold text-[#008833] dark:text-[#00FF66]">{sim.metrics.loss}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#5A5A57] dark:text-[#888888] block">RATE</span>
                <span className="text-[9.5px] font-bold text-[#121212] dark:text-white">{sim.metrics.throughput}</span>
              </div>
              <div>
                <span className="text-[8px] text-[#5A5A57] dark:text-[#888888] block">STATE</span>
                <span className="text-[9.5px] font-bold text-[#0052FF] dark:text-[#00E5FF] truncate block">{sim.metrics.linkStatus}</span>
              </div>
            </div>

            <p className="text-[9px] text-[#5A5A57] dark:text-[#999999] leading-tight">
              {sim.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Proof Metrics Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-8 border-t border-[#121212]/10 dark:border-[#1F1F1F] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono z-10">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] dark:text-white">
              {item.value}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5A5A57] dark:text-[#888888] tracking-wider uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
