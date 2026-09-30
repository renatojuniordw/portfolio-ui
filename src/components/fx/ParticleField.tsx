"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const DESKTOP_COUNT = 55;
const MOBILE_COUNT = 20;
const LINK_DISTANCE = 90;
const CURSOR_RADIUS = 110;

export function ParticleField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isInteractive = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const interactive = isInteractive && !prefersReducedMotion;

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-ia")
        .trim() || "#6D28D9";

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let pageVisible = document.visibilityState === "visible";
    let inViewport = true;

    function seedParticles(count: number) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function resize() {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      seedParticles(interactive ? DESKTOP_COUNT : MOBILE_COUNT);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = accent;
            ctx.globalAlpha = 1 - dist / LINK_DISTANCE;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.8;
      ctx.fillStyle = accent;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_RADIUS) {
          const force = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
          p.x += (dx / (dist || 1)) * force * 4;
          p.y += (dy / (dist || 1)) * force * 4;
        }
      }
      draw();
      rafId = requestAnimationFrame(tick);
    }

    // Um único loop por vez: para ao sair da viewport ou com a aba oculta.
    function start() {
      if (!interactive || rafId || !pageVisible || !inViewport) return;
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function handleVisibilityChange() {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    }

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!interactive) draw();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) start();
      else stop();
    });

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver.observe(container);
      start();
    } else {
      draw();
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stop();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
