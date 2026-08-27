import { useEffect, useRef } from 'react';

export default function PlanetCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const radius = 1.3;
    const latLines = 14;
    const lonLines = 20;
    const points = [];

    for (let i = 0; i <= latLines; i++) {
      const theta = (i / latLines) * Math.PI;
      for (let j = 0; j <= lonLines; j++) {
        const phi = (j / lonLines) * Math.PI * 2;
        points.push({
          x: radius * Math.sin(theta) * Math.cos(phi),
          y: radius * Math.cos(theta),
          z: radius * Math.sin(theta) * Math.sin(phi),
        });
      }
    }

    const rings = [
      { r: 2.1, rx: 0.4, ry: 0.6, speed: 0.25, color: 'rgba(99,102,241,0.35)', width: 1.5 },
      { r: 2.6, rx: 0.9, ry: 0.3, speed: -0.18, color: 'rgba(139,92,246,0.25)', width: 1 },
      { r: 1.8, rx: 1.3, ry: 0.8, speed: 0.35, color: 'rgba(168,85,247,0.3)', width: 1.2 },
    ];

    const project = (x, y, z, rx, ry, cx, cy, sc) => {
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      const s = sc / (z2 + 5);
      return { x: cx + x1 * s, y: cy + y2 * s, z: z2, s };
    };

    const draw = () => {
      time += 0.006;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const sc = Math.min(w, h) * 0.32;

      // Ambient glow
      const glow = ctx.createRadialGradient(cx, cy, sc * 0.3, cx, cy, sc * 2.5);
      glow.addColorStop(0, 'rgba(99,102,241,0.06)');
      glow.addColorStop(0.5, 'rgba(139,92,246,0.03)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Rings
      rings.forEach(ring => {
        ctx.beginPath();
        const ry = time * ring.speed + ring.ry;
        const rx = ring.rx + time * 0.08;
        for (let i = 0; i <= 120; i++) {
          const a = (i / 120) * Math.PI * 2;
          const p = project(ring.r * Math.cos(a), 0, ring.r * Math.sin(a), rx, ry, cx, cy, sc);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        ctx.stroke();
      });

      const rotY = time * 0.15;
      const rotX = 0.35 + Math.sin(time * 0.08) * 0.08;

      // Latitude
      for (let i = 0; i <= latLines; i++) {
        ctx.beginPath();
        for (let j = 0; j <= lonLines; j++) {
          const idx = i * (lonLines + 1) + j;
          const pt = points[idx];
          const p = project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, sc);
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(99,102,241,0.12)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitude
      for (let j = 0; j <= lonLines; j++) {
        ctx.beginPath();
        for (let i = 0; i <= latLines; i++) {
          const idx = i * (lonLines + 1) + j;
          const pt = points[idx];
          const p = project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, sc);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(139,92,246,0.1)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Points
      points.forEach(pt => {
        const p = project(pt.x, pt.y, pt.z, rotX, rotY, cx, cy, sc);
        if (p.z > -2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, 2 * p.s), 0, Math.PI * 2);
          ctx.fillStyle = p.z > 0 ? 'rgba(165,180,252,0.7)' : 'rgba(165,180,252,0.25)';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
