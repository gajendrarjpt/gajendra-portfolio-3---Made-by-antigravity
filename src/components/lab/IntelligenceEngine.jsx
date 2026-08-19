import React, { useState, useEffect, useRef } from 'react';
import { networkLabDomains } from '../../data/portfolioData';

export default function IntelligenceEngine() {
  const [activeDomainId, setActiveDomainId] = useState('routing');
  const [viewMode, setViewMode] = useState('schematic'); // 'schematic' (MNC Diagram) | 'mesh' (Interactive Nodes)
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const canvasRef = useRef(null);

  const activeDomain = networkLabDomains.find((d) => d.id === activeDomainId) || networkLabDomains[0];

  // Canvas mesh render for interactive mode
  useEffect(() => {
    if (viewMode !== 'mesh') return;
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
      progress += 0.01;
      if (progress > 1) progress = 0;
      ctx.clearRect(0, 0, width, height);

      activeDomain.connections.forEach((conn) => {
        const sourceNode = activeDomain.nodes.find((n) => n.id === conn.from);
        const targetNode = activeDomain.nodes.find((n) => n.id === conn.to);

        if (sourceNode && targetNode) {
          const x1 = (sourceNode.x / 100) * width;
          const y1 = (sourceNode.y / 100) * height;
          const x2 = (targetNode.x / 100) * width;
          const y2 = (targetNode.y / 100) * height;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = conn.signal ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (conn.signal) {
            const sx = x1 + (x2 - x1) * progress;
            const sy = y1 + (y2 - y1) * progress;

            ctx.beginPath();
            ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#00FF66';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sx, sy, 7, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      activeDomain.nodes.forEach((node) => {
        const nx = (node.x / 100) * width;
        const ny = (node.y / 100) * height;
        const isNodeHovered = hoveredNodeId === node.id;

        ctx.beginPath();
        ctx.arc(nx, ny, isNodeHovered ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0A0A0A';
        ctx.fill();
        ctx.strokeStyle = isNodeHovered ? '#00FF66' : '#FFFFFF';
        ctx.lineWidth = isNodeHovered ? 2 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = isNodeHovered ? '#00FF66' : '#FFFFFF';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeDomain, viewMode, hoveredNodeId]);

  return (
    <section id="engine" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
              <span>02 / INTELLIGENCE ENGINE</span>
              <span>·</span>
              <span>ENTERPRISE NETWORK INSTRUMENT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
              NETWORK ARCHITECTURE & DIAGRAMS.
            </h2>
            <p className="font-body text-lg text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal">
              Enterprise MNC network topology schematics & NOC telemetry dashboards across core routing, switching stacks, multi-vendor firewalls, WLAN, infrastructure, and monitoring.
            </p>
          </div>

          {/* View Mode Switcher (Schematic Diagram vs Interactive Mesh) */}
          <div className="flex items-center gap-2 p-1 bg-[#F4F1EA] dark:bg-[#0A0A0A] border border-[#121212]/15 dark:border-[#1F1F1F]">
            <button
              onClick={() => setViewMode('schematic')}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'schematic'
                  ? 'bg-[#0052FF] text-white shadow-lg'
                  : 'text-[#5A5A57] dark:text-[#888888] hover:text-[#121212] dark:hover:text-white'
              }`}
            >
              [+] MNC SCHEMATIC DIAGRAM
            </button>
            <button
              onClick={() => setViewMode('mesh')}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'mesh'
                  ? 'bg-[#0052FF] text-white shadow-lg'
                  : 'text-[#5A5A57] dark:text-[#888888] hover:text-[#121212] dark:hover:text-white'
              }`}
            >
              [+] INTERACTIVE MESH
            </button>
          </div>
        </div>

        {/* Domain Selector Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 font-mono text-[11px] sm:text-xs">
          {networkLabDomains.map((dom) => {
            const isActive = activeDomainId === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => setActiveDomainId(dom.id)}
                className={`py-3 px-3.5 font-semibold tracking-wider uppercase border transition-all flex items-center justify-between text-left truncate ${
                  isActive
                    ? 'bg-[#F4F1EA] dark:bg-[#111111] text-[#121212] dark:text-white border-[#0052FF]'
                    : 'bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#5A5A57] dark:text-[#888888] border-[#121212]/15 dark:border-[#1F1F1F] hover:text-[#121212] dark:hover:text-white hover:border-[#121212]/30 dark:hover:border-[#2A2A2A]'
                }`}
              >
                <span className="truncate">{dom.id}</span>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1 ${isActive ? 'bg-[#0052FF] dark:bg-[#00FF66]' : 'bg-transparent'}`} />
              </button>
            );
          })}
        </div>

        {/* Responsive Geometry Box */}
        <div className="w-full min-h-[540px] sm:min-h-[580px] border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] relative flex flex-col justify-between p-5 sm:p-8 overflow-hidden shadow-2xl">
          {/* Top Panel Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5A5A57] dark:text-[#888888] border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-4 z-10 bg-[#F4F1EA]/90 dark:bg-[#0A0A0A]/90">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
              <span className="font-bold text-[#121212] dark:text-white uppercase">{activeDomain.label}</span>
              <span>·</span>
              <span className="text-[#0052FF] dark:text-[#00FF66]">{activeDomain.status}</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-[#5A5A57] dark:text-[#60605C] uppercase">
              <span>FORMAT: MNC ENTERPRISE SPEC</span>
              {activeDomain.diagramImage && viewMode === 'schematic' && (
                <button
                  onClick={() => setFullscreenImage(activeDomain.diagramImage)}
                  className="text-[#0052FF] hover:underline font-bold uppercase"
                >
                  EXPAND FULLSCREEN ↗
                </button>
              )}
            </div>
          </div>

          {/* View Mode 1: MNC Professional Network Architecture Diagram */}
          {viewMode === 'schematic' && activeDomain.diagramImage && (
            <div
              onClick={() => setFullscreenImage(activeDomain.diagramImage)}
              className="relative w-full h-[320px] sm:h-[360px] my-auto overflow-hidden border border-[#121212]/15 dark:border-[#1F1F1F] rounded-xs cursor-pointer group bg-[#FAF8F5] dark:bg-[#000000] flex items-center justify-center"
            >
              <img
                src={activeDomain.diagramImage}
                alt={`${activeDomain.title} Diagram`}
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-[#0052FF] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                  CLICK TO VIEW FULL RESOLUTION SCHEMATIC 🔍
                </span>
              </div>
            </div>
          )}

          {/* View Mode 2: Interactive Topology Canvas Mesh */}
          {viewMode === 'mesh' && (
            <div className="relative w-full h-[320px] sm:h-[360px] my-auto">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

              {activeDomain.nodes.map((node) => {
                const isHovered = hoveredNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  >
                    <div className={`mt-6 font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider transition-all shadow-lg whitespace-nowrap ${
                      isHovered
                        ? 'bg-[#0052FF] text-white scale-110'
                        : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-[#E0E0E0] border border-[#121212]/15 dark:border-[#222222]'
                    }`}>
                      {node.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Panel Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-[#121212]/10 dark:border-[#1F1F1F] pt-4 z-10 bg-[#F4F1EA]/90 dark:bg-[#0A0A0A]/90">
            <div className="md:col-span-8 flex flex-col gap-1">
              <h4 className="font-display text-lg font-bold text-[#121212] dark:text-white uppercase tracking-tight">
                {activeDomain.title}
              </h4>
              <p className="font-body text-xs sm:text-sm text-[#5A5A57] dark:text-[#AAAAAA] line-clamp-2">
                {activeDomain.summary}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-wrap justify-start md:justify-end gap-1.5 font-mono text-[10px]">
              {activeDomain.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/15 dark:border-[#222222] uppercase font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex flex-col justify-between items-center cursor-pointer"
        >
          <div className="w-full flex justify-between items-center text-white font-mono text-xs border-b border-[#222] pb-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
              MNC ENTERPRISE NETWORK ARCHITECTURE SCHEMATIC — {activeDomain.title}
            </span>
            <span className="px-3 py-1 bg-[#0052FF] text-white font-bold uppercase">
              CLICK ANYWHERE TO CLOSE (ESC)
            </span>
          </div>

          <div className="max-w-6xl max-h-[82vh] my-auto overflow-auto flex items-center justify-center p-2">
            <img
              src={fullscreenImage}
              alt="MNC Enterprise Network Diagram Fullscreen"
              className="max-w-full max-h-full object-contain shadow-2xl border border-[#333]"
            />
          </div>

          <div className="font-mono text-[11px] text-[#888888] uppercase tracking-wider">
            CISCO / PALO ALTO / FORTINET / VMWARE ENTERPRISE SPECIFICATION SCHEMATIC
          </div>
        </div>
      )}
    </section>
  );
}
