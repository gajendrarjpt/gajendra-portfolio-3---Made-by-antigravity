import React, { useEffect, useRef, useState } from 'react';
import { profile, highlights } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const [signalTrigger, setSignalTrigger] = useState(0);
  const { theme } = useTheme();

  // Hook animation: trigger signal flow across hero lines on load
  useEffect(() => {
    const timer = setInterval(() => {
      setSignalTrigger((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Procedural Interactive Signal Mesh Canvas Effect
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

    const cols = 5;
    const rows = 5;
    const nodes = [];
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          baseX: spacingX * (i + 1),
          baseY: spacingY * (j + 1),
          x: spacingX * (i + 1),
          y: spacingY * (j + 1),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    const signals = [
      { from: 0, to: 6, progress: 0, speed: 0.008 },
      { from: 6, to: 12, progress: 0.3, speed: 0.006 },
      { from: 12, to: 18, progress: 0.6, speed: 0.007 },
      { from: 18, to: 24, progress: 0.1, speed: 0.005 },
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(18, 18, 18, 0.14)';
      const nodeColor = isDark ? '#FFFFFF' : '#121212';

      nodes.forEach((node) => {
        node.pulse += 0.02;
        node.x = node.baseX + Math.sin(node.pulse) * 4;
        node.y = node.baseY + Math.cos(node.pulse) * 4;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          node.x -= (dx / dist) * force * 15;
          node.y -= (dy / dist) * force * 15;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacingX * 1.4) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

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
          ctx.fillStyle = '#0052FF';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 82, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.5;
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
  }, [theme]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[92vh] flex flex-col justify-between border-b border-[#121212]/10 dark:border-[#222222] overflow-hidden bg-grid-pattern transition-colors">
      {/* Top Metadata Signal Line */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#5A5A57] dark:text-[#A0A09C] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span>NETWORK ENGINEER // NOC TIER 2/3</span>
        </div>
        <div className="flex items-center gap-6">
          <span>INFRASTRUCTURE</span>
          <span>·</span>
          <span>SECURITY</span>
          <span>·</span>
          <span>RELIABILITY</span>
        </div>
      </div>

      {/* Hero Editorial Main Section */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        {/* Left Column: Asymmetric Typography & Statement */}
        <div className="lg:col-span-8 flex flex-col gap-8 z-10">
          {/* Signal travel line marker ("The Hook") */}
          <div className="w-full relative py-2">
            <div className="w-full h-[1px] bg-[#121212]/15 dark:bg-[#333] relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#0052FF] transition-all duration-1000 ease-in-out"
                style={{
                  left: `${signalTrigger * 25}%`,
                  width: '20%',
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-[#8E8E8A] dark:text-[#60605C] tracking-widest uppercase pt-2">
              <span>SYS.LOC // NOC_ENTERPRISE</span>
              <span className="text-[#00FF66]">SIGNAL_FLOW // ONLINE</span>
            </div>
          </div>

          {/* Oversized Editorial Name */}
          <div className="flex flex-col">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white">
              GAJENDRA
            </h1>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.88] text-[#121212] dark:text-white flex items-baseline gap-2">
              <span>RAJPUT</span>
              <span className="w-4 h-4 sm:w-6 sm:h-6 bg-[#0052FF] inline-block" />
            </h1>
          </div>

          {/* Role Statement & Subtitle */}
          <div className="max-w-2xl flex flex-col gap-4 border-l-2 border-[#121212] dark:border-white pl-6 py-1">
            <h2 className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#121212] dark:text-white uppercase">
              SENIOR NETWORK ENGINEER — NOC TIER 2/3
            </h2>
            <p className="font-body text-lg sm:text-xl text-[#5A5A57] dark:text-[#A0A09C] leading-relaxed font-normal">
              {profile.tagline}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#lab"
              data-cursor="EXPLORE"
              className="group font-mono text-xs font-semibold tracking-wider uppercase px-6 py-3.5 bg-[#121212] dark:bg-white text-[#FAF8F5] dark:text-[#121212] hover:bg-[#0052FF] dark:hover:bg-[#0052FF] dark:hover:text-white transition-colors duration-300 flex items-center gap-3"
            >
              <span>ENTER NETWORK LAB</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href="#experience"
              data-cursor="VIEW"
              className="font-mono text-xs font-semibold tracking-wider uppercase px-6 py-3.5 border border-[#121212]/30 dark:border-[#333] hover:border-[#121212] dark:hover:border-white text-[#121212] dark:text-white transition-colors duration-300"
            >
              VIEW CAREER HISTORY
            </a>
          </div>
        </div>

        {/* Right Column: Procedural Signal Canvas Object */}
        <div className="lg:col-span-4 relative h-[320px] sm:h-[420px] w-full border border-[#121212]/15 dark:border-[#222222] bg-[#FAF8F5]/80 dark:bg-[#080808]/80 backdrop-blur-xs flex flex-col justify-between p-4 group">
          {/* Top Canvas Label */}
          <div className="flex justify-between items-center font-mono text-[10px] text-[#5A5A57] dark:text-[#A0A09C] uppercase tracking-wider border-b border-[#121212]/10 dark:border-[#222] pb-2 z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              NETWORK_TOPOLOGY // LIVE
            </span>
            <span>01 / INSTRUMENT</span>
          </div>

          {/* Canvas Element */}
          <div className="absolute inset-0 z-0">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Bottom Canvas Overlay Metadata */}
          <div className="flex justify-between items-end font-mono text-[9px] text-[#8E8E8A] dark:text-[#60605C] uppercase tracking-widest border-t border-[#121212]/10 dark:border-[#222] pt-2 z-10 bg-[#FAF8F5]/80 dark:bg-[#080808]/80">
            <span>NODES: 25 // SIGNALS: 04</span>
            <span className="text-[#0052FF] font-semibold">INTERACTIVE MESH</span>
          </div>
        </div>
      </div>

      {/* Bottom Proof Metrics Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-8 border-t border-[#121212]/10 dark:border-[#222222] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] dark:text-white">
              {item.value}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5A5A57] dark:text-[#A0A09C] tracking-wider uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
