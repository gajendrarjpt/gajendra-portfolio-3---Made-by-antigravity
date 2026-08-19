import React, { useEffect, useRef } from 'react';
import { profile, highlights } from '../../data/portfolioData';

export default function SlyHero({ onOpenBridge }) {
  const canvasRef = useRef(null);

  // High-performance procedural canvas mesh effect
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

    const cols = 6;
    const rows = 5;
    const nodes = [];
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: spacingX * (i + 1),
          y: spacingY * (j + 1),
          baseX: spacingX * (i + 1),
          baseY: spacingY * (j + 1),
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    const signals = [
      { from: 0, to: 7, progress: 0, speed: 0.009 },
      { from: 7, to: 14, progress: 0.2, speed: 0.007 },
      { from: 14, to: 21, progress: 0.5, speed: 0.008 },
      { from: 21, to: 28, progress: 0.1, speed: 0.006 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(18, 18, 18, 0.12)';
      const nodeColor = isDark ? '#FFFFFF' : '#121212';
      const signalDot = isDark ? '#00FF66' : '#0052FF';

      nodes.forEach((node) => {
        node.pulse += 0.02;
        node.x = node.baseX + Math.sin(node.pulse) * 4;
        node.y = node.baseY + Math.cos(node.pulse) * 4;
      });

      // Grid connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacingX * 1.3) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Signal pulses
      signals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) sig.progress = 0;

        const n1 = nodes[sig.from];
        const n2 = nodes[sig.to];
        if (n1 && n2) {
          const sx = n1.x + (n2.x - n1.x) * sig.progress;
          const sy = n1.y + (n2.y - n1.y) * sig.progress;

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = 'rgba(0, 82, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = signalDot;
          ctx.fill();
        }
      });

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <span className="text-[#0052FF] font-semibold">NOC TIER 2/3</span>
        </div>
      </div>

      {/* Hero Headline & Intro */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 z-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F4F1EA] dark:bg-[#111111] border border-[#121212]/15 dark:border-[#2A2A2A] rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
            <span className="font-mono text-[10px] text-[#121212] dark:text-[#AAAAAA] uppercase tracking-wider font-semibold">
              SENIOR NETWORK ENGINEER // NOC OPERATIONS
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] text-[#121212] dark:text-white">
              NETWORKS THAT SCALE.
            </h1>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] text-[#5A5A57] dark:text-[#888888]">
              ENTERPRISE INFRASTRUCTURE.
            </h1>
          </div>

          <p className="font-body text-lg sm:text-xl text-[#5A5A57] dark:text-[#AAAAAA] max-w-2xl font-normal leading-relaxed">
            I design, troubleshoot, and operate high-availability enterprise networks where uptime matters — spanning Cisco routing/switching, multi-vendor firewalls, and NOC operations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenBridge}
              className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 bg-[#0052FF] hover:bg-[#0042D0] text-white transition-all shadow-lg shadow-[#0052FF]/25 flex items-center gap-3"
            >
              <span>INITIATE BRIDGE</span>
              <span>→</span>
            </button>

            <a
              href="#engine"
              className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 border border-[#121212]/20 dark:border-[#2A2A2A] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white bg-[#FAF8F5] dark:bg-[#0A0A0A] hover:bg-[#F4F1EA] dark:hover:bg-[#111111] transition-all"
            >
              EXPLORE NETWORK ENGINE
            </a>
          </div>
        </div>

        {/* Right Procedural Mesh Canvas Object */}
        <div className="lg:col-span-4 relative h-[360px] w-full border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-4 flex flex-col justify-between shadow-2xl">
          <div className="flex justify-between items-center font-mono text-[10px] text-[#5A5A57] dark:text-[#888888] uppercase border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-2 z-10">
            <span className="flex items-center gap-1.5 text-[#121212] dark:text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] dark:bg-[#00FF66]" />
              TOPOLOGY_MESH // LIVE
            </span>
            <span className="text-[#0052FF]">01 / ENGINE</span>
          </div>

          <div className="absolute inset-0 z-0">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          <div className="flex justify-between items-end font-mono text-[9px] text-[#5A5A57] dark:text-[#888888] uppercase border-t border-[#121212]/10 dark:border-[#1F1F1F] pt-2 z-10 bg-[#F4F1EA]/90 dark:bg-[#0A0A0A]/90">
            <span>NODES: 30 // SIGNALS: 04</span>
            <span className="text-[#0052FF] dark:text-[#00FF66] font-semibold">ALL NODES ONLINE</span>
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
