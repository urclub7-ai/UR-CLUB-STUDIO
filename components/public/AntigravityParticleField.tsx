"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialRadius: number;
  initialTheta: number;
  baseAngle: number;
  currentAngle: number;
  angularVelocity: number;
  length: number;
  width: number;
  baseAlpha: number;
  isDot: boolean;
  baseRgb: [number, number, number];
  excitation: number;
}

function angleDiff(target: number, current: number): number {
  let diff = (target - current) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return diff;
}

export default function AntigravityParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles: Particle[] = [];
    let ambientAngle = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    };

    const initParticles = (w: number, h: number) => {
      particles = [];
      const cx = w * 0.5;
      const cy = h * 0.48;

      const isMobile = w < 768;
      const maxDim = Math.hypot(w, h) * (isMobile ? 0.52 : 0.56);
      const minRadius = isMobile ? 32 : 36;

      // Reduced density by ~35-40%
      const baseRings = isMobile ? 7 : Math.floor(Math.min(11, Math.max(8, (maxDim - minRadius) / 46)));
      const ringCount = Math.max(5, baseRings);

      for (let ring = 0; ring < ringCount; ring++) {
        const ringT = ring / Math.max(1, ringCount - 1);
        const rBase = minRadius + Math.pow(ringT, 1.1) * (maxDim - minRadius);

        const circumference = 2 * Math.PI * rBase;
        // Wider spacing between particles
        const spacing = isMobile ? (85 + ringT * 16) : (72 + ringT * 18);
        const count = Math.max(5, Math.floor(circumference / spacing));

        const phaseOffset = ring * 0.22;

        for (let i = 0; i < count; i++) {
          const theta = phaseOffset + (i / count) * Math.PI * 2;

          // Architectural ellipse ratio
          const bx = cx + Math.cos(theta) * rBase * 1.22;
          const by = cy + Math.sin(theta) * rBase * 0.88;

          // Restrained monochromatic architectural palette: Cool-neutral off-whites
          // Subtle gradient across depth (inner rings slightly darker, outer rings crisp)
          const neutralTone = Math.round(208 + ringT * 18); // 208 -> 226
          const baseRgb: [number, number, number] = [
            neutralTone,
            neutralTone + 2,
            neutralTone + 6,
          ];

          const isDot = ring > 1 && (i % 8 === 0);

          // Calm, restrained opacity curve
          const edgeFade = Math.max(0.12, 1.0 - Math.pow(ringT, 1.8) * 0.52);
          const baseAlpha = (isDot ? 0.05 : 0.09) * edgeFade;

          // Fine architectural micro-marks (short and crisp)
          const baseLength = isDot ? 1.1 : 1.8 + ringT * 1.8; // 1.8px - 3.6px
          const baseAngle = theta + 0.08;

          particles.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            initialRadius: rBase,
            initialTheta: theta,
            baseAngle,
            currentAngle: baseAngle,
            angularVelocity: 0,
            length: baseLength,
            width: isDot ? 1.0 : 0.85,
            baseAlpha,
            isDot,
            baseRgb,
            excitation: 0,
          });
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles(width, height);

      // If user prefers reduced motion, render one static frame
      if (prefersReducedMotion) {
        renderStatic();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();

    // Mouse tracking (only if pointer is fine and not reduced motion)
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDevice) return;

      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const curX = e.clientX - rect.left;
        const curY = e.clientY - rect.top;

        if (!mouse.active) {
          mouse.active = true;
          mouse.x = curX;
          mouse.y = curY;
          mouse.targetX = curX;
          mouse.targetY = curY;
          mouse.prevX = curX;
          mouse.prevY = curY;
        } else {
          mouse.targetX = curX;
          mouse.targetY = curY;
        }
      } else {
        mouse.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Tuned physics: subtle, controlled, no bounce
    const REPEL_RADIUS = 90; // Gentle interaction zone
    const REPEL_FORCE = 0.45; // Soft displacement (3-5px max)
    const SPRING_STIFFNESS = 0.035; // Controlled, elegant return
    const DAMPING = 0.91; // Heavily damped, zero jitter
    const ANGULAR_DAMPING = 0.84;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Static rendering for reduced motion
    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const [r, g, b] = p.baseRgb;
        const halfLen = p.length * 0.5;
        const cosA = Math.cos(p.baseAngle);
        const sinA = Math.sin(p.baseAngle);

        ctx.beginPath();
        if (p.isDot) {
          ctx.arc(p.baseX, p.baseY, p.width * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.globalAlpha = p.baseAlpha;
          ctx.fill();
        } else {
          ctx.moveTo(p.baseX - cosA * halfLen, p.baseY - sinA * halfLen);
          ctx.lineTo(p.baseX + cosA * halfLen, p.baseY + sinA * halfLen);
          ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.lineWidth = p.width;
          ctx.lineCap = "round";
          ctx.globalAlpha = p.baseAlpha;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;
    };

    const render = () => {
      if (!isVisible) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      if (mouse.active) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
        mouse.vx = mouse.x - mouse.prevX;
        mouse.vy = mouse.y - mouse.prevY;
      } else {
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;
      }

      ctx.clearRect(0, 0, width, height);

      // Ultra-slow, barely perceptible ambient rotation
      ambientAngle += 0.000035;
      const cx = width * 0.5;
      const cy = height * 0.48;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const currentBaseTheta = p.initialTheta + ambientAngle;
        p.baseX = cx + Math.cos(currentBaseTheta) * p.initialRadius * 1.22;
        p.baseY = cy + Math.sin(currentBaseTheta) * p.initialRadius * 0.88;
        const currentRestingAngle = p.baseAngle + ambientAngle;

        let interactionFactor = 0;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < REPEL_RADIUS && dist > 0.1) {
            const t = dist / REPEL_RADIUS;
            // Smooth cosine falloff
            interactionFactor = Math.cos(t * Math.PI * 0.5);
            const nx = dx / dist;
            const ny = dy / dist;

            const push = interactionFactor * REPEL_FORCE;
            p.vx += nx * push;
            p.vy += ny * push;
          }
        }

        const springX = (p.baseX - p.x) * SPRING_STIFFNESS;
        const springY = (p.baseY - p.y) * SPRING_STIFFNESS;

        p.vx = (p.vx + springX) * DAMPING;
        p.vy = (p.vy + springY) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.hypot(p.vx, p.vy);
        let targetAngle = currentRestingAngle;

        if (speed > 0.3) {
          targetAngle = Math.atan2(p.vy, p.vx);
        }

        const diff = angleDiff(targetAngle, p.currentAngle);
        p.angularVelocity = (p.angularVelocity + diff * 0.035) * ANGULAR_DAMPING;
        p.currentAngle += p.angularVelocity;

        // Subtle excitation (no brightness flashes)
        const displacement = Math.hypot(p.x - p.baseX, p.y - p.baseY);
        const motionImpulse = Math.min(0.5, speed * 0.18 + displacement * 0.02 + interactionFactor * 0.3);

        if (motionImpulse > p.excitation) {
          p.excitation = motionImpulse;
        } else {
          p.excitation *= 0.94;
        }

        // Monochromatic color (pure architectural neutral)
        const [r, g, b] = p.baseRgb;

        // Center vignette fade (keeps the hero headline and earth card ultra clean)
        const distToCenter = Math.hypot(p.x - cx, p.y - cy);
        const centerDistFade = distToCenter < 220 ? 0.25 + (distToCenter / 220) * 0.75 : 1.0;

        // Very restrained opacity (never competes with typography)
        const dynamicAlphaBase = Math.min(0.18, p.baseAlpha + p.excitation * 0.06);
        const dynamicAlpha = dynamicAlphaBase * centerDistFade;

        const currentLength = p.isDot
          ? p.length
          : p.length + p.excitation * 0.6; // Minimal length change

        const halfLen = currentLength * 0.5;
        const cosA = Math.cos(p.currentAngle);
        const sinA = Math.sin(p.currentAngle);

        const x1 = p.x - cosA * halfLen;
        const y1 = p.y - sinA * halfLen;
        const x2 = p.x + cosA * halfLen;
        const y2 = p.y + sinA * halfLen;

        ctx.beginPath();
        if (p.isDot) {
          ctx.arc(p.x, p.y, p.width * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.globalAlpha = dynamicAlpha;
          ctx.fill();
        } else {
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.lineWidth = p.width;
          ctx.lineCap = "round";
          ctx.globalAlpha = dynamicAlpha;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animFrameId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      if (!isTouchDevice && !prefersReducedMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
