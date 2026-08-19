import React, { useState, useEffect, useRef } from 'react';
import { profile, highlights } from '../../data/portfolioData';

// Packet Tracer / GNS3 Topology Node Definitions
const LAB_NODES = [
  { id: 'cloud', label: 'INTERNET_WAN', type: 'cloud', ip: '203.0.113.1', model: 'BGP Cloud Provider', protocol: 'AS65001 WAN', x: 50, y: 12, status: 'CONNECTED' },
  { id: 'router', label: 'R1_EDGE_ROUTER', type: 'router', ip: '192.168.1.1', model: 'Cisco ISR 4451 Router', protocol: 'OSPF / BGP Gateway', x: 50, y: 30, status: 'ONLINE' },
  { id: 'firewall', label: 'FW1_PALO_ALTO', type: 'firewall', ip: '10.0.1.1', model: 'Palo Alto PA-3220 FW', protocol: 'IPsec / Threat Prevention', x: 50, y: 48, status: 'PROTECTED' },
  { id: 'switch', label: 'SW1_CORE_STACK', type: 'switch', ip: '10.0.2.1', model: 'Cisco Cat 9300 L3 Stack', protocol: 'VLAN 10/20 / Spanning Tree', x: 50, y: 68, status: 'FORWARDING' },
  { id: 'wifi', label: 'AP1_WIFI_WLAN', type: 'wifi', ip: '10.0.5.10', model: 'Aruba / Cisco AP', protocol: 'SSID: CORP-SECURE 802.1X', x: 18, y: 84, status: 'BROADCASTING' },
  { id: 'server', label: 'SRV1_DATA_CENTER', type: 'server', ip: '10.0.10.50', model: 'Dell R750 Enterprise Svr', protocol: 'SAN / RADIUS / Wireshark', x: 50, y: 86, status: 'ACTIVE' },
  { id: 'pc', label: 'PC1_WORKSTATION', type: 'pc', ip: '10.0.20.105', model: 'Corporate User PC', protocol: 'DHCP Lease / VLAN 20', x: 82, y: 84, status: 'CONNECTED' },
];

const LAB_LINKS = [
  { from: 'cloud', to: 'router', label: 'WAN Link', speed: '1 Gbps Fiber' },
  { from: 'router', to: 'firewall', label: 'Gi0/0/1', speed: '1 Gbps Copper' },
  { from: 'firewall', to: 'switch', label: 'eth1/1 Trunk', speed: '10 Gbps SFP+' },
  { from: 'switch', to: 'wifi', label: 'Fa0/1 PoE+', speed: '1000 Mbps' },
  { from: 'switch', to: 'server', label: 'Gi1/0/24 SPAN', speed: '10 Gbps SFP+' },
  { from: 'switch', to: 'pc', label: 'Fa0/2 Access', speed: '1000 Mbps' },
];

export default function SlyHero({ onOpenBridge }) {
  const canvasRef = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState('firewall');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [pingActive, setPingActive] = useState(true);

  const activeNode = LAB_NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || LAB_NODES[2];

  // Canvas loop for packet traffic animation on GNS3 cables
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let progress = 0;

    const render = () => {
      progress += pingActive ? 0.012 : 0.004;
      if (progress > 1) progress = 0;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const linkColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(18, 18, 18, 0.25)';
      const packetColor = isDark ? '#00FF66' : '#0052FF';

      // Draw GNS3 topology link cables
      LAB_LINKS.forEach((link) => {
        const n1 = LAB_NODES.find((n) => n.id === link.from);
        const n2 = LAB_NODES.find((n) => n.id === link.to);

        if (n1 && n2) {
          const x1 = (n1.x / 100) * width;
          const y1 = (n1.y / 100) * height;
          const x2 = (n2.x / 100) * width;
          const y2 = (n2.y / 100) * height;

          // Cable line
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = linkColor;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated packet signals along cables
          const px = x1 + (x2 - x1) * progress;
          const py = y1 + (y2 - y1) * progress;

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = packetColor;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(0, 255, 102, 0.4)' : 'rgba(0, 82, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pingActive]);

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 min-h-[90vh] flex flex-col justify-between border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] bg-sly-grid overflow-hidden transition-colors">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-glow pointer-events-none" />

      {/* Top Telemetry Status Ticker */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5A5A57] dark:text-[#888888] tracking-widest uppercase border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-4 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
          <span className="text-[#121212] dark:text-white font-semibold">LIVE STATUS: ALL SYSTEMS OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-6 text-[11px]">
          <span>LATENCY: 1.12ms</span>
          <span>·</span>
          <span>PACKET LOSS: 0.00%</span>
          <span>·</span>
          <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold">NOC TIER 2/3</span>
        </div>
      </div>

      {/* Hero Headline & Intro */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 lg:py-12 z-10">
        {/* Left Headline Column (No text overflow) */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F4F1EA] dark:bg-[#111111] border border-[#121212]/15 dark:border-[#2A2A2A] rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
            <span className="font-mono text-[10px] text-[#121212] dark:text-[#AAAAAA] uppercase tracking-wider font-semibold">
              SENIOR NETWORK ENGINEER // NOC OPERATIONS
            </span>
          </div>

          <div className="flex flex-col gap-2 max-w-full">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-5xl xl:text-7xl font-bold tracking-tight uppercase leading-[0.92] text-[#121212] dark:text-white break-words">
              NETWORKS THAT SCALE.
            </h1>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-5xl xl:text-7xl font-bold tracking-tight uppercase leading-[0.92] text-[#5A5A57] dark:text-[#888888] break-words">
              ENTERPRISE INFRASTRUCTURE.
            </h1>
          </div>

          <p className="font-body text-base sm:text-lg lg:text-xl text-[#5A5A57] dark:text-[#AAAAAA] max-w-xl font-normal leading-relaxed">
            I design, troubleshoot, and operate high-availability enterprise networks where uptime matters — spanning Cisco routing/switching, multi-vendor firewalls, and NOC operations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenBridge}
              className="font-mono text-xs font-bold uppercase tracking-wider px-7 py-4 bg-[#0052FF] hover:bg-[#0042D0] text-white transition-all shadow-lg shadow-[#0052FF]/25 flex items-center gap-3 cursor-pointer"
            >
              <span>INITIATE BRIDGE</span>
              <span>→</span>
            </button>

            <a
              href="#engine"
              className="font-mono text-xs font-bold uppercase tracking-wider px-7 py-4 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#FAF8F5] dark:bg-[#0A0A0A] hover:bg-[#F4F1EA] dark:hover:bg-[#111111] transition-all"
            >
              EXPLORE NETWORK ENGINE
            </a>
          </div>
        </div>

        {/* Right Interactive GNS3 / Packet Tracer Lab Canvas Object */}
        <div className="lg:col-span-5 relative h-[450px] w-full border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-4 flex flex-col justify-between shadow-2xl overflow-hidden shrink-0">
          {/* GNS3 Header Controls */}
          <div className="flex justify-between items-center font-mono text-[10px] text-[#5A5A57] dark:text-[#888888] uppercase border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-2 z-10 bg-[#F4F1EA]/90 dark:bg-[#0A0A0A]/90">
            <span className="flex items-center gap-1.5 text-[#121212] dark:text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
              PACKET_TRACER // LAB TOPOLOGY
            </span>
            <button
              onClick={() => setPingActive(!pingActive)}
              className="px-2.5 py-0.5 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold rounded-xs transition-colors cursor-pointer"
            >
              {pingActive ? '⚡ ICMP TRAFFIC' : '▶ RESUME PING'}
            </button>
          </div>

          {/* Topology Canvas & Interactive Packet Tracer Nodes */}
          <div className="relative w-full h-[300px] my-auto">
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
                  {/* Micro Cisco / Packet Tracer Device Icon Badge */}
                  <div className={`p-2 rounded-md border flex items-center justify-center transition-all duration-300 shadow-md ${
                    activeState
                      ? 'bg-[#0052FF] text-white border-[#0052FF] scale-110 shadow-lg shadow-[#0052FF]/30'
                      : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border-[#121212]/20 dark:border-[#222222] group-hover:border-[#0052FF]'
                  }`}>
                    {/* WAN Cloud Icon */}
                    {node.type === 'cloud' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                      </svg>
                    )}

                    {/* Router Icon (Cisco Circular 4-Arrow Symbol) */}
                    {node.type === 'router' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v10M7 12h10M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
                      </svg>
                    )}

                    {/* Firewall Icon (Palo Alto Shield / Brick Wall) */}
                    {node.type === 'firewall' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M8 10h8M8 14h8M12 6v12" strokeWidth="1.5" />
                      </svg>
                    )}

                    {/* Switch Icon (Cisco Layer 3 Multi-Layer Switch) */}
                    {node.type === 'switch' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <path d="M7 10l3-2M7 14l3 2M17 10l-3-2M17 14l-3 2" strokeLinecap="round" />
                      </svg>
                    )}

                    {/* WiFi Access Point Icon */}
                    {node.type === 'wifi' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12.55a11 11 0 0114 0M8.5 16.1a7 7 0 017 0M12 20h.01" />
                      </svg>
                    )}

                    {/* Server Rack Icon */}
                    {node.type === 'server' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="6" rx="1" />
                        <rect x="4" y="14" width="16" height="6" rx="1" />
                        <circle cx="7" cy="7" r="1" fill="currentColor" />
                        <circle cx="7" cy="17" r="1" fill="currentColor" />
                      </svg>
                    )}

                    {/* Workstation PC / LAN Client Icon */}
                    {node.type === 'pc' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="12" rx="1" />
                        <path d="M8 20h8M12 16v4" />
                      </svg>
                    )}
                  </div>

                  {/* Device Label Tag */}
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

          {/* GNS3 / Packet Tracer Bottom Terminal Inspector Panel */}
          <div className="border-t border-[#121212]/10 dark:border-[#1F1F1F] pt-2 z-10 bg-[#F4F1EA]/95 dark:bg-[#0A0A0A]/95 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[#121212] dark:text-white font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-[#0052FF] dark:text-[#00FF66]">$</span>
                <span>{activeNode.label} ({activeNode.model})</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#0052FF] text-white uppercase rounded-xs">
                {activeNode.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[#5A5A57] dark:text-[#AAAAAA] text-[9.5px]">
              <div>IP: <span className="text-[#121212] dark:text-white font-semibold">{activeNode.ip}</span></div>
              <div>PROTOCOL: <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold">{activeNode.protocol}</span></div>
            </div>
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
