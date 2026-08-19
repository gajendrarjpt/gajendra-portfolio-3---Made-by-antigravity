import React, { useState, useEffect, useRef } from 'react';
import { networkLabDomains } from '../../data/portfolioData';

export default function NetworkLab() {
  const [activeDomainId, setActiveDomainId] = useState('routing');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const canvasRef = useRef(null);

  const activeDomain = networkLabDomains.find((d) => d.id === activeDomainId) || networkLabDomains[0];

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
      progress += 0.01;
      if (progress > 1) progress = 0;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineActive = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(18, 18, 18, 0.25)';
      const lineInactive = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(18, 18, 18, 0.08)';
      const nodeBg = isDark ? '#080808' : '#FAF8F5';
      const nodeStroke = isDark ? '#FFFFFF' : '#121212';

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
          ctx.strokeStyle = conn.signal ? lineActive : lineInactive;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (conn.signal) {
            const sx = x1 + (x2 - x1) * progress;
            const sy = y1 + (y2 - y1) * progress;

            ctx.beginPath();
            ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#00FF66' : '#0052FF';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sx, sy, 7, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(0, 255, 102, 0.4)' : 'rgba(0, 82, 255, 0.4)';
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
        ctx.fillStyle = nodeBg;
        ctx.fill();
        ctx.strokeStyle = isNodeHovered ? (isDark ? '#00FF66' : '#0052FF') : nodeStroke;
        ctx.lineWidth = isNodeHovered ? 2 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = isNodeHovered ? (isDark ? '#00FF66' : '#0052FF') : nodeStroke;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeDomain, hoveredNodeId]);

  return (
    <section id="lab" className="py-24 md:py-36 border-b border-[#121212]/10 dark:border-[#222222] bg-[#FAF8F5] dark:bg-[#000000] transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>04 / EXPERIMENTAL LABORATORY</span>
            <span>·</span>
            <span>NETWORK LAB</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
            INTERACTIVE SYSTEM INSTRUMENT.
          </h2>
          <p className="font-body text-lg text-[#5A5A57] dark:text-[#A0A09C] max-w-2xl font-normal">
            An engineering instrument mapping system topologies, packet paths, and domain connections. Select an operational domain to trace network flows.
          </p>
        </div>

        {/* Top Domain Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {networkLabDomains.map((dom) => {
            const isActive = activeDomainId === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => setActiveDomainId(dom.id)}
                data-cursor="TRACE"
                className={`py-3 px-4 font-mono text-xs font-semibold tracking-wider uppercase border transition-all duration-300 flex items-center justify-between text-left ${
                  isActive
                    ? 'bg-[#121212] dark:bg-white text-[#FAF8F5] dark:text-[#121212] border-[#121212] dark:border-white'
                    : 'bg-[#F4F1EA] dark:bg-[#080808] text-[#5A5A57] dark:text-[#A0A09C] border-[#121212]/15 dark:border-[#222] hover:text-[#121212] dark:hover:text-white'
                }`}
              >
                <span>{dom.id}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0052FF] dark:bg-[#00FF66]' : 'bg-transparent'}`} />
              </button>
            );
          })}
        </div>

        {/* RIGID FIXED GEOMETRY CONTAINER */}
        <div className="w-full h-[540px] sm:h-[580px] border border-[#121212]/20 dark:border-[#222222] bg-[#F4F1EA] dark:bg-[#080808] relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden shadow-xs">
          {/* Top Panel Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] border-b border-[#121212]/10 dark:border-[#222] pb-4 z-10 bg-[#F4F1EA]/90 dark:bg-[#080808]/90">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
              <span className="font-bold text-[#121212] dark:text-white uppercase">{activeDomain.label}</span>
              <span>·</span>
              <span className="text-[#0052FF] dark:text-[#00FF66]">{activeDomain.status}</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-[#8E8E8A] dark:text-[#60605C] uppercase">
              <span>FREQUENCY: REALTIME TELEMETRY</span>
              <span>GEOMETRY: LOCKED</span>
            </div>
          </div>

          {/* Canvas Topology Graph Area */}
          <div className="relative w-full h-[320px] sm:h-[360px] my-auto">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* DOM Overlay Node Labels */}
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
                  <div className={`mt-6 font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-wider transition-all duration-200 shadow-2xs whitespace-nowrap ${
                    isHovered
                      ? 'bg-[#121212] dark:bg-white text-[#FAF8F5] dark:text-[#121212] scale-110'
                      : 'bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/20 dark:border-[#333]'
                  }`}>
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Panel Description & Tools Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-[#121212]/10 dark:border-[#222] pt-4 z-10 bg-[#F4F1EA]/90 dark:bg-[#080808]/90">
            <div className="md:col-span-8 flex flex-col gap-1">
              <h4 className="font-display text-lg font-bold text-[#121212] dark:text-white uppercase tracking-tight">
                {activeDomain.title}
              </h4>
              <p className="font-body text-xs sm:text-sm text-[#5A5A57] dark:text-[#A0A09C] line-clamp-2">
                {activeDomain.summary}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-wrap justify-start md:justify-end gap-1.5">
              {activeDomain.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] px-2.5 py-1 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/15 dark:border-[#333] uppercase font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
