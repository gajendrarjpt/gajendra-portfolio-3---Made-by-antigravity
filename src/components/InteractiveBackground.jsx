import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const TAU = Math.PI * 2;
const random = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

export default function InteractiveBackground({ theme }) {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let w = 0, h = 0, frame = 0, previous = 0, time = 0;
    let x = .72, y = .35, targetX = .72, targetY = .35, scroll = 0;
    const still = paused || reduced || media.matches;
    const resize = () => {
      w = innerWidth; h = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (still) draw();
    };
    const pointer = e => { targetX = e.clientX / w; targetY = e.clientY / h; };
    const touch = e => pointer(e);
    const onScroll = () => { scroll = window.scrollY * .00015; };
    const leave = () => { targetX = .72; targetY = .35; };
    const line = (ax, ay, bx, by, color, width = 1) => {
      ctx.strokeStyle = color; ctx.lineWidth = width;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    };

    function signals() {
      const count = w < 760 ? 30 : 62;
      const points = Array.from({ length: count }, (_, i) => ({
        x: random(i + 1) * w + Math.sin(time * .18 + i) * 22,
        y: random(i + 200) * h + Math.cos(time * .13 + i) * 18,
      }));
      const radius = Math.min(w * .24, 230);
      points.forEach((p, i) => {
        const near = Math.max(0, 1 - Math.hypot(p.x - x * w, p.y - y * h) / radius);
        points.slice(i + 1).forEach((q, j) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d > 155) return;
          line(p.x, p.y, q.x, q.y, `rgba(110,168,226,${(1 - d / 155) * (.14 + near * .5)})`);
          if ((i + j) % 5 === 0) {
            const t = (time * .12 + random(i + j + 8)) % 1;
            ctx.fillStyle = `rgba(165,219,255,${.22 + near * .5})`;
            ctx.beginPath(); ctx.arc(p.x + (q.x - p.x) * t, p.y + (q.y - p.y) * t, 1.8, 0, TAU); ctx.fill();
          }
        });
        ctx.fillStyle = `rgba(150,209,255,${.2 + near * .6})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 + near * 2, 0, TAU); ctx.fill();
        if (near > .2) line(p.x, p.y, x * w, y * h, `rgba(148,210,255,${near * .22})`);
      });
      const glow = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, radius);
      glow.addColorStop(0, '#6baeff13'); glow.addColorStop(1, '#6baeff00');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
    }

    function ink() {
      // Long engraved ink contours bend like silk around the pointer.
      for (let i = 0; i < 24; i++) {
        const base = w * (.53 + i * .024);
        ctx.beginPath(); ctx.moveTo(base - w * .14, -60);
        ctx.bezierCurveTo(base + Math.sin(time * .16 + i * .08) * 34 + (x - .5) * 105,
          h * (.2 + y * .2), base - w * .28 + (x - .5) * 150,
          h * .72, base + w * .05, h + 60);
        ctx.strokeStyle = i % 6 === 0 ? '#485b8770' : '#66779324';
        ctx.lineWidth = i % 6 === 0 ? 1.3 : .7; ctx.stroke();
      }
      for (let i = 0; i < 7; i++) {
        const py = ((random(i + 90) + time * .012) % 1) * h;
        const px = w * (.74 + Math.sin(py / h * 5 + time * .16) * .13);
        ctx.beginPath(); ctx.ellipse(px, py, 3, 5, -.5, 0, TAU);
        ctx.fillStyle = '#485b8750'; ctx.fill();
      }
    }

    function canopy() {
      const leaf = (px, py, size, angle, alpha) => {
        ctx.save(); ctx.translate(px, py); ctx.rotate(angle);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-size * .3, -size * .65, size * .45, -size, size, -size * .4);
        ctx.bezierCurveTo(size * .75, size * .12, size * .2, size * .2, 0, 0);
        ctx.fillStyle = `rgba(111,167,109,${alpha})`; ctx.fill();
        line(0, 0, size * .78, -size * .34, `rgba(175,210,143,${alpha * .9})`);
        ctx.restore();
      };
      for (let side = 0; side < 2; side++) {
        const edge = side ? w + 25 : -25;
        for (let i = 0; i < 11; i++) {
          const py = (i / 10) * h;
          const sway = Math.sin(time * .55 + i * .5) * .09 + (x - .5) * .2 + Math.sin(scroll) * .08;
          const size = Math.min(w * .14, 175) + random(i + side * 20) * 45;
          const angle = (side ? Math.PI : 0) + sway + (y - py / h) * .28;
          leaf(edge, py, size, angle, .11 + random(i + 4) * .15);
          leaf(edge + (side ? -25 : 25), py + 50, size * .65, angle + .45, .10);
        }
      }
      for (let i = 0; i < 18; i++) {
        const px = ((random(i + 60) + Math.sin(time * .15 + i) * .025 + 1) % 1) * w;
        const py = (((random(i + 80) - time * .006) % 1 + 1) % 1) * h;
        ctx.fillStyle = `rgba(213,224,140,${.08 + (Math.sin(time + i) + 1) * .09})`;
        ctx.beginPath(); ctx.arc(px, py, 1.5, 0, TAU); ctx.fill();
      }
    }

    function architecture() {
      // Physical-looking fins cast long shadows toward the moving light source.
      const scale = Math.min(w * .23, 260);
      const offset = (x - .5) * 75;
      ctx.save(); ctx.translate(w * .86, h * .48); ctx.rotate(-.28);
      for (let i = 5; i >= 0; i--) {
        const px = (i - 2.5) * scale * .25;
        const py = Math.sin(i * .5) * 35;
        ctx.fillStyle = '#9c482416';
        ctx.beginPath(); ctx.moveTo(px, py - h * .65); ctx.lineTo(px + 12, py - h * .65);
        ctx.lineTo(px + offset + 90, py + h * .75); ctx.lineTo(px + offset + 65, py + h * .75); ctx.fill();
        const material = ctx.createLinearGradient(px, 0, px + 22, 0);
        material.addColorStop(0, '#ab68463b'); material.addColorStop(.5, '#fdf3dd80'); material.addColorStop(1, '#bb764b38');
        ctx.fillStyle = material; ctx.fillRect(px, -h, 16 + i * 2, h * 2);
      }
      ctx.restore();
      const sun = ctx.createRadialGradient(w * x, h * y, 0, w * x, h * y, w * .55);
      sun.addColorStop(0, '#fff8d840'); sun.addColorStop(1, '#fff8d800');
      ctx.fillStyle = sun; ctx.fillRect(0, 0, w, h);
    }

    function aurora() {
      ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (let band = 0; band < 3; band++) {
        for (let i = 0; i < 17; i++) {
          ctx.beginPath();
          for (let step = 0; step <= 40; step++) {
            const px = step / 40 * w;
            const wave = Math.sin(step * .10 + time * .18 + band * 1.5 + x * 2);
            const py = h * (.14 + band * .31) + wave * (65 + y * 65) + i * 3 + Math.sin(step * .23 - time * .12) * 20;
            if (!step) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = ['rgba(155,102,217,.045)', 'rgba(86,151,203,.038)', 'rgba(218,114,166,.035)'][band];
          ctx.lineWidth = 10; ctx.stroke();
        }
      }
      ctx.restore();
      for (let i = 0; i < 42; i++) {
        ctx.fillStyle = `rgba(234,218,255,${.15 + Math.sin(time * .6 + i) * .1})`;
        ctx.beginPath(); ctx.arc(random(i + 1) * w, random(i + 70) * h, i % 8 ? .8 : 1.5, 0, TAU); ctx.fill();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ({ dark: signals, light: ink, forest: canopy, sunset: architecture, plum: aurora }[theme] || signals)();
    }
    function tick(now) {
      frame = requestAnimationFrame(tick);
      if (now - previous < 33) return;
      time += Math.min((now - (previous || now)) / 1000, .05); previous = now;
      x += (targetX - x) * .065; y += (targetY - y) * .065;
      draw();
    }
    function visibility() {
      cancelAnimationFrame(frame); previous = 0;
      if (!document.hidden && !still) frame = requestAnimationFrame(tick);
    }
    resize(); draw();
    if (!still && !document.hidden) frame = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerdown', touch, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerdown', touch); window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', visibility);
    };
  }, [theme, paused, reduced]);

  return <>
    <div className="interactive-environment" aria-hidden="true"><canvas ref={canvasRef}/><div className="environment-scrim"/></div>
    {!reduced && <button type="button" className="background-motion" onClick={() => setPaused(p => !p)} aria-pressed={paused} aria-label={paused ? 'Resume background animation' : 'Pause background animation'}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'Resume ambience' : 'Pause ambience'}</span></button>}
  </>;
}
