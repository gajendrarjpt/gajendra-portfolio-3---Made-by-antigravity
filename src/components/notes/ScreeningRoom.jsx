import React, { useState, useEffect, useRef } from 'react';
import { engineeringNotes, featuredProjects } from '../../data/portfolioData';

// Reusable 3D Tilt Card Wrapper Component
function TiltCard({ className, children }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    shadowX: 0,
    shadowY: 0,
    sheenX: 50,
    sheenY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x - rect.width / 2) / (rect.width / 2); // -1 to +1
    const normY = (y - rect.height / 2) / (rect.height / 2); // -1 to +1

    const rotateX = -normY * 5; // Max 5 deg
    const rotateY = normX * 5;

    const shadowX = -normX * 10;
    const shadowY = -normY * 10;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      shadowX,
      shadowY,
      sheenX,
      sheenY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      shadowX: 0,
      shadowY: 0,
      isHovered: false,
    }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTilt((prev) => ({ ...prev, isHovered: true }))}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg)',
        boxShadow: tilt.isHovered
          ? `${tilt.shadowX}px ${tilt.shadowY + 8}px 24px rgba(0, 0, 0, 0.12)`
          : 'none',
        transition: tilt.isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.1s ease-out'
          : 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
      }}
      className={`relative ${className}`}
    >
      {children}
      {/* Specular Light Sheen Overlay */}
      <div
        style={{
          background: `radial-gradient(circle 260px at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
          opacity: tilt.isHovered ? 1 : 0,
        }}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
      />
    </div>
  );
}

export default function ScreeningRoom() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const singleSetRef = useRef(null);

  const offsetRef = useRef(0);
  const speedRef = useRef(0.8);
  const targetSpeedRef = useRef(0.8);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(Date.now());
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Animation Loop (requestAnimationFrame)
  useEffect(() => {
    let animationFrameId;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const singleSetWidth = singleSetRef.current ? singleSetRef.current.offsetWidth : 0;

      if (singleSetWidth > 0 && !prefersReduced) {
        if (!isDraggingRef.current) {
          // Decay inertia velocity if released from drag
          if (Math.abs(velocityRef.current) > 0.05) {
            speedRef.current = velocityRef.current;
            velocityRef.current *= 0.92;
          } else {
            // Smoothly lerp current speed to target speed
            speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
          }

          offsetRef.current += speedRef.current;

          // Seamless infinite wrap around singleSetWidth
          if (offsetRef.current >= singleSetWidth) {
            offsetRef.current %= singleSetWidth;
          } else if (offsetRef.current < 0) {
            offsetRef.current = (offsetRef.current % singleSetWidth) + singleSetWidth;
          }

          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Hover speed control based on cursor position
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    targetSpeedRef.current = 0.8;
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || isDraggingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5

    // Center cursor pauses (0), right speeds up, left reverses
    targetSpeedRef.current = normX * 3.0;
  };

  // Click-and-Drag scrubbing
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = Date.now();
    hasDraggedRef.current = false;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;

    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }

    const singleSetWidth = singleSetRef.current ? singleSetRef.current.offsetWidth : 0;
    let newOffset = dragStartOffsetRef.current - deltaX;

    if (singleSetWidth > 0) {
      if (newOffset >= singleSetWidth) newOffset %= singleSetWidth;
      else if (newOffset < 0) newOffset = (newOffset % singleSetWidth) + singleSetWidth;
    }

    offsetRef.current = newOffset;

    const now = Date.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    velocityRef.current = -((e.clientX - lastPointerXRef.current) / dt) * 16;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleLinkClick = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderCards = () => (
    <>
      {/* Featured Project PlantRx */}
      {featuredProjects.map((proj) => (
        <TiltCard
          key={proj.id}
          className="shrink-0 w-[290px] sm:w-[440px] md:w-[540px] max-w-[85vw] border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#0052FF] transition-all group select-none"
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="px-3 py-1 bg-[#0052FF] text-white font-bold uppercase text-[10px]">
                FEATURED PROJECT
              </span>
              <span className="text-[#5A5A57] dark:text-[#888888] uppercase text-[10px]">
                {proj.category}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase text-[#121212] dark:text-white group-hover:text-[#0052FF] dark:group-hover:text-[#00FF66] transition-colors">
              {proj.name}
            </h3>

            <p className="font-body text-sm text-[#5A5A57] dark:text-[#AAAAAA] leading-relaxed">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-white border border-[#121212]/15 dark:border-[#222222] uppercase font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#121212]/10 dark:border-[#1F1F1F] flex items-center justify-between font-mono text-xs">
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="text-[#0052FF] font-bold uppercase hover:underline z-30"
            >
              LAUNCH APP ↗
            </a>
            <a
              href={proj.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="text-[#5A5A57] dark:text-[#888888] uppercase hover:text-[#121212] dark:hover:text-white z-30"
            >
              GITHUB ↗
            </a>
          </div>
        </TiltCard>
      ))}

      {/* Operational Engineering Case Studies */}
      {engineeringNotes.map((note) => (
        <TiltCard
          key={note.id}
          className="shrink-0 w-[280px] sm:w-[380px] md:w-[450px] max-w-[85vw] border border-[#121212]/15 dark:border-[#1F1F1F] bg-[#F4F1EA] dark:bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-between hover:border-[#121212] dark:hover:border-white transition-all group select-none"
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-baseline font-mono text-xs border-b border-[#121212]/10 dark:border-[#1F1F1F] pb-4">
              <span className="font-bold text-[#0052FF] dark:text-[#00FF66] text-base">{note.index}</span>
              <span className="text-[#5A5A57] dark:text-[#888888] uppercase text-[10px] tracking-wider">{note.category}</span>
            </div>

            <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-[#121212] dark:text-white group-hover:text-[#0052FF] transition-colors">
              {note.title}
            </h3>

            <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-[#5A5A57] dark:text-[#AAAAAA]">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase text-[#121212] dark:text-white block mb-0.5">
                  PROBLEM
                </span>
                <p>{note.problem}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold uppercase text-[#121212] dark:text-white block mb-0.5">
                  APPROACH
                </span>
                <p className="line-clamp-3">{note.approach}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#121212]/10 dark:border-[#1F1F1F] flex flex-col gap-2 font-mono text-xs">
            <div className="flex flex-wrap gap-1">
              {note.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#111111] text-[#121212] dark:text-[#E0E0E0] border border-[#121212]/15 dark:border-[#222222] uppercase"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="text-[10px] text-[#0052FF] dark:text-[#00FF66] font-semibold mt-1">
              OUTCOME: {note.outcome}
            </div>
          </div>
        </TiltCard>
      ))}
    </>
  );

  return (
    <section id="screening-room" className="pt-8 pb-20 md:pt-10 md:pb-28 border-b border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000] text-[#121212] dark:text-white relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#0052FF] tracking-widest uppercase">
            <span>03 / SCREENING ROOM</span>
            <span>·</span>
            <span>CASE REEL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-[#121212] dark:text-white">
            THE SCREENING ROOM.
          </h2>
        </div>
      </div>

      {/* Interactive Continuous Auto-Scrolling Marquee Ticker */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-4 border-y border-[#121212]/10 dark:border-[#1F1F1F] bg-[#FAF8F5] dark:bg-[#000000]"
      >
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {/* First Full Set */}
          <div ref={singleSetRef} className="flex gap-6 shrink-0">
            {renderCards()}
          </div>
          {/* Duplicated Second Set for Seamless Infinite Loop */}
          <div className="flex gap-6 shrink-0">
            {renderCards()}
          </div>
        </div>
      </div>
    </section>
  );
}
