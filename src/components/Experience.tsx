"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw/Grow the vertical progress line as we scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          }
        }
      );

      // 2. Animate and highlight individual timeline rows as they pass the center
      const rows = gsap.utils.toArray(".timeline-row") as HTMLElement[];
      rows.forEach((row) => {
        const year = row.querySelector(".timeline-year");
        const dot = row.querySelector(".timeline-dot");
        const contentLeft = row.querySelector(".timeline-content-left");
        const contentRight = row.querySelector(".timeline-content-right");

        // Staggered reveal for row contents
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 45%",
            scrub: 0.5,
          }
        });

        tl.fromTo([contentLeft, contentRight], { opacity: 0.25, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
          .fromTo(year, { scale: 0.8, opacity: 0.3 }, { scale: 1.15, opacity: 1, color: "#a855f7", duration: 0.5, ease: "back.out(2)" }, "<")
          .fromTo(dot, { scale: 0.8, boxShadow: "0 0 0px rgba(168,85,247,0)" }, { scale: 1.3, backgroundColor: "#a855f7", boxShadow: "0 0 15px #a855f7", duration: 0.5 }, "<");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
    {
      role: "B.Tech in Biotechnology",
      type: "Netaji Subhas University of Technology, Delhi",
      year: "2023–2027",
      description: "CGPA: 6.85. Coursework in biotechnology, programming, and data analysis."
    },
    {
      role: "CBSE Class 12th",
      type: "School of Excellence, Kalkaji",
      year: "2020–2021",
      description: "Scored 89.2%." 
    },
    {
      role: "CBSE Class 10th",
      type: "Amrita Public School, Delhi",
      year: "2018–2019",
      description: "Scored 95.6%." 
    },
    {
      role: "Major Projects & Achievements",
      type: "Personal & Academic",
      year: "2023–2026",
      description: "Credit Card Recommender Web App, Large Scale Scraping Automation, Post Navigation WordPress Plugin. Solved 183+ LeetCode problems, Codeforces rating: 847."
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-6xl mx-auto relative z-10 overflow-hidden"
    >
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 sm:mb-20 md:mb-24">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          • JOURNEY •
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-tight">
          My career &<br />
          <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent font-serif-italic font-normal">
            experience
          </span>
        </h2>
      </div>

      {/* Main Timeline Section */}
      <div className="relative mt-12 sm:mt-16 md:mt-20">
        
        {/* Central Vertical Line Structure - Mobile */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-white/10">
          <div 
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-b from-brand-purple via-brand-purple to-brand-blue shadow-[0_0_10px_#a855f7]"
          />
        </div>

        {/* Central Vertical Line Structure - Desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10">
          <div 
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-b from-brand-purple via-brand-purple to-brand-blue shadow-[0_0_10px_#a855f7]"
          />
        </div>

        {/* Timeline Rows */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {timelineData.map((item, idx) => (
            <div 
              key={idx} 
              className="timeline-row relative"
            >
              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col gap-4">
                {/* Year Badge */}
                <div className="flex items-center gap-4 pl-20">
                  <div className="timeline-dot absolute left-0 w-3 h-3 rounded-full bg-white/20 border-2 border-background transition-all duration-300">
                    <div className="timeline-dot-inner w-1 h-1 rounded-full bg-white absolute inset-0 m-auto" />
                  </div>
                  <span className="timeline-year inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 font-sans font-semibold text-sm text-brand-purple whitespace-nowrap">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="timeline-content-left pl-20">
                  <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-white">{item.role}</h3>
                  <span className="text-xs sm:text-sm font-semibold text-brand-purple/80 block mt-1 uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                <div className="timeline-content-right pl-20">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 lg:gap-8">
                {/* Left Content */}
                <div className="timeline-content-left text-right">
                  <h3 className="text-xl lg:text-2xl font-bold font-sans tracking-tight text-white">{item.role}</h3>
                  <span className="text-sm lg:text-base font-semibold text-brand-purple block mt-2 uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                {/* Center: Year & Dot */}
                <div className="flex flex-col items-center gap-3 -mx-4 z-20">
                  <span className="timeline-year font-sans font-bold text-lg lg:text-xl text-white/40 whitespace-nowrap">
                    {item.year}
                  </span>
                  <div className="timeline-dot w-4 h-4 rounded-full bg-white/20 border-2 border-background transition-all duration-300 flex items-center justify-center">
                    <div className="timeline-dot-inner w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Right Content */}
                <div className="timeline-content-right">
                  <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
