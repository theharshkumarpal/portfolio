"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Load Animations
      // Concentric circles scaling
      gsap.fromTo(
        ".concentric-circle",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power3.out" }
      );

      // Hero Header slide up
      gsap.fromTo(
        ".hero-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Auto-type characters on load
      gsap.fromTo(
        ".char-span",
        { opacity: 0.1 },
        { opacity: 1, duration: 0.05, stagger: 0.025, ease: "power1.inOut", delay: 0.4 }
      );

      // Hero Mockup animate up
      gsap.fromTo(
        ".hero-mockup-wrapper",
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.5 }
      );

      // 2. Scroll-Driven Parallax/Fade Animations as user moves down
      gsap.to(".hero-header", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
          invalidateOnRefresh: true,
          onLeave: () => gsap.set(".hero-header", { opacity: 0, y: -100 }),
          onEnterBack: () => gsap.to(".hero-header", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true }),
        },
        y: -100,
        opacity: 0,
        immediateRender: false,
        ease: "none",
      });

      // Ambient circles scale out
      gsap.to(".concentric-circle", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: true,
          invalidateOnRefresh: true,
          onEnterBack: () => gsap.to(".concentric-circle", { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true }),
        },
        opacity: 0,
        scale: 1.15,
        immediateRender: false,
        ease: "none",
      });

      // Mockup parallax fade out
      gsap.to(".hero-mockup-wrapper", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
          invalidateOnRefresh: true,
          onEnterBack: () => gsap.to(".hero-mockup-wrapper", { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true }),
        },
        y: -50,
        scale: 0.96,
        opacity: 0.2,
        immediateRender: false,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string, isSerif = false) => {
    return (
      <span className={isSerif ? "font-serif-italic font-normal" : ""}>
        {text.split("").map((char, index) => (
          <span key={index} className="char-span opacity-10 inline-block select-none">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex flex-col justify-between pt-16 pb-12 px-6 overflow-hidden"
    >
      {/* Concentric circles background graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[300px] h-[300px] rounded-full concentric-circle absolute" />
        <div className="w-[520px] h-[520px] rounded-full concentric-circle absolute" />
        <div className="w-[740px] h-[740px] rounded-full concentric-circle absolute" />
        <div className="w-[960px] h-[960px] rounded-full concentric-circle absolute" />
        <div className="w-[1180px] h-[1180px] rounded-full concentric-circle absolute" />
      </div>

      <div className="max-w-5xl mx-auto text-center z-10 pt-16 flex-grow flex flex-col justify-center items-center">
        <h1 className="hero-header text-5xl sm:text-7xl md:text-8xl font-sans font-bold tracking-tight text-white mb-8 max-w-4xl leading-tight">
          {renderLetters("Full-Stack", true)}
          <br />
          {renderLetters("Developer &")}
          <br />
          {renderLetters("Problem Solver")}
        </h1>
      </div>

      {/* Hero mockup/cards layout stacked below the headline */}
      <div className="w-full max-w-5xl mx-auto mt-12 z-10 px-4 relative hero-mockup-wrapper opacity-0">
        <div className="relative h-[250px] sm:h-[450px] w-full rounded-2xl overflow-hidden glass-panel border-white/5 flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src="/boldstream.png" 
            alt="Design Mockup" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-102"
          />
          {/* Overlapping project preview indicators */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
            <span className="text-xs font-semibold text-brand-cyan tracking-wider uppercase">FEATURED PROJECT</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Boldstream Branding System</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
