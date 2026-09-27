"use strict";
"use client";

import React, { useEffect, useState, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  r: number;
  d: number;
  opacity: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
}

export default function Snowfall() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const maxParticles = 80;
    const particles: Snowflake[] = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        d: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.45 + 0.15,
        swaySpeed: Math.random() * 0.02 + 0.005,
        swayAmplitude: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isLightMode = document.documentElement.classList.contains("light");

      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.fillStyle = isLightMode
          ? `rgba(15, 23, 42, ${p.opacity * 0.25})`
          : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();

        p.y += p.d;
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * (p.swayAmplitude * 0.15);

        if (p.y > height || p.x > width + 5 || p.x < -5) {
          particles[i] = {
            ...p,
            x: Math.random() * width,
            y: -10,
            swayOffset: Math.random() * Math.PI * 2,
          };
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--top-glow-color), transparent)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
