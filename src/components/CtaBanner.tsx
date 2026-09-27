"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".text-highlight",
        { scale: 0.95, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".text-highlight",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative w-full min-h-[500px] flex items-center justify-center py-24 px-6 my-16 overflow-hidden"
    >
      {/* Banner Cover Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
          alt="Collaboration Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center z-20 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8 text-xs font-semibold tracking-wider text-slate-200 uppercase">
          • AVAILABLE FOR WORK •
        </div>

        <h2 className="text-2xl sm:text-4xl font-sans font-normal leading-relaxed text-white mb-10 max-w-3xl mx-auto">
          {"Step into the world of Vandy, where every project is built for "}
          <span className="text-highlight">{"storytelling and impact,"}</span>
          {" ensuring your portfolio feels modern, functional, and elevated."}
        </h2>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-200 transition-all duration-300 shadow-lg"
        >
          Discuss a Project
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
