// src/components/ParticlesBackground.jsx
import { useEffect, useRef } from "react";

/**
 * Background partikel ringan (tanpa library):
 * - Titik bergerak perlahan dan saling terhubung bila berdekatan
 * - Responsif terhadap resize
 * - Ada repulsion lembut saat mouse mendekat
 * - Nonaktif otomatis saat user set "prefers-reduced-motion"
 */
export default function ParticlesBackground({
  color = "#94a3b8",      // slate-400
  lineColor = "rgba(148,163,184,0.35)",
  density = 0.08,         // semakin besar => semakin banyak partikel (per 10,000px²)
  maxSpeed = 0.35,        // px/frame
  connectDist = 120,      // jarak maksimal garis penghubung
  height = "38vh",        // tinggi area (pakai "100vh" jika ingin satu layar penuh)
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    // wrapper = parent element tempat canvas ditempel (absolute)
    const wrapper = canvas.parentElement;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * devicePixelRatio);
      canvas.height = Math.floor(rect.height * devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      // hitung jumlah partikel berdasar luas
      const area = rect.width * rect.height;
      const count = Math.max(16, Math.floor((area / 10000) * density)); // min 16
      initParticles(count, rect.width, rect.height);
    }

    function rnd(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles(count, w, h) {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: rnd(0, w),
        y: rnd(0, h),
        vx: rnd(-maxSpeed, maxSpeed),
        vy: rnd(-maxSpeed, maxSpeed),
        r: rnd(1.2, 2.2),
      }));
    }

    function step() {
      const { width: w, height: h } = canvas;
      // karena context sudah di-scale, width/height dalam CSS:
      const cssW = w / devicePixelRatio;
      const cssH = h / devicePixelRatio;

      ctx.clearRect(0, 0, cssW, cssH);

      const pts = particlesRef.current;

      // Gerakkan dan pantulkan di tepi
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= cssW) p.vx *= -1;
        if (p.y <= 0 || p.y >= cssH) p.vy *= -1;

        // repulsion lembut dari pointer
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          const force = (140 - d) / 140; // 0..1
          p.vx += (dx / d) * force * 0.06;
          p.vy += (dy / d) * force * 0.06;
        }
      }

      // Garis koneksi
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist <= connectDist) {
            ctx.globalAlpha = 1 - dist / connectDist;
            ctx.strokeStyle = lineColor;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
          }
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Titik
      ctx.fillStyle = color;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    // set tinggi wrapper via inline style agar mudah diatur dari prop
    wrapper.style.position = "relative";
    wrapper.style.height = typeof height === "number" ? `${height}px` : height;

    resize();
    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color, lineColor, density, maxSpeed, connectDist, height]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 -z-10"
      // posisi: taruh tepat di bawah hero, tapi tetap global bisa kamu ubah ke fixed inset-0 jika mau full-page
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
