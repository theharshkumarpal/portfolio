"use strict";
"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Three lag indicators for Lerp (Linear Interpolation)
  const bubble1Ref = useRef({ x: 0, y: 0 }); // Purple
  const bubble2Ref = useRef({ x: 0, y: 0 }); // Cyan
  const bubble3Ref = useRef({ x: 0, y: 0 }); // Pink

  const dom1Ref = useRef<HTMLDivElement>(null);
  const dom2Ref = useRef<HTMLDivElement>(null);
  const dom3Ref = useRef<HTMLDivElement>(null);

  // 1. Safe Client mount transition to prevent SSR mismatch
  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) {
        setMounted(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // 2. Cursor movement frame loop tracker
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    // Only enable on desktop devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    // Set initial positions to center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseRef.current = { x: centerX, y: centerY };
    bubble1Ref.current = { x: centerX, y: centerY };
    bubble2Ref.current = { x: centerX, y: centerY };
    bubble3Ref.current = { x: centerX, y: centerY };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const updatePositions = () => {
      const target = mouseRef.current;

      // Lerping formula: current += (target - current) * factor
      bubble1Ref.current.x += (target.x - bubble1Ref.current.x) * 0.08;
      bubble1Ref.current.y += (target.y - bubble1Ref.current.y) * 0.08;

      bubble2Ref.current.x += (target.x - bubble2Ref.current.x) * 0.05;
      bubble2Ref.current.y += (target.y - bubble2Ref.current.y) * 0.05;

      bubble3Ref.current.x += (target.x - bubble3Ref.current.x) * 0.03;
      bubble3Ref.current.y += (target.y - bubble3Ref.current.y) * 0.03;

      if (dom1Ref.current) {
        dom1Ref.current.style.transform = `translate3d(${bubble1Ref.current.x - 200}px, ${bubble1Ref.current.y - 200}px, 0)`;
      }
      if (dom2Ref.current) {
        dom2Ref.current.style.transform = `translate3d(${bubble2Ref.current.x - 250}px, ${bubble2Ref.current.y - 250}px, 0)`;
      }
      if (dom3Ref.current) {
        dom3Ref.current.style.transform = `translate3d(${bubble3Ref.current.x - 170}px, ${bubble3Ref.current.y - 170}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Glow Bubble 1: Brand Purple */}
      <div 
        ref={dom1Ref}
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.14] mix-blend-screen transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0) 70%)",
          willChange: "transform"
        }}
      />
      {/* Glow Bubble 2: Brand Cyan */}
      <div 
        ref={dom2Ref}
        className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.12] mix-blend-screen transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.7) 0%, rgba(6, 182, 212, 0) 70%)",
          willChange: "transform"
        }}
      />
      {/* Glow Bubble 3: Brand Pink/Magenta for color shifts */}
      <div 
        ref={dom3Ref}
        className="absolute w-[340px] h-[340px] rounded-full blur-[90px] opacity-[0.15] mix-blend-screen transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(236, 72, 153, 0) 70%)",
          willChange: "transform"
        }}
      />
    </div>
  );
}
