"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={aboutRef}
      id="about" 
      className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10"
    >
      <div className="about-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-xs font-semibold tracking-wider text-slate-300 uppercase opacity-0">
        • ABOUT ME •
      </div>
      <p className="about-animate text-xl sm:text-3xl font-normal leading-relaxed text-white opacity-0">
        {"A passionate developer from Delhi, currently pursuing B.Tech in Biotechnology at NSUT. Experienced in building web apps, automation, and solving algorithmic challenges. 183+ LeetCode problems solved, Codeforces rating: 847. Contact: harshkumarpalofficial@gmail.com | +91-7065382962"}
      </p>
      <p className="about-animate text-lg sm:text-2xl font-normal leading-relaxed text-muted mt-6 font-serif-italic opacity-0">
        {"Education: Netaji Subhas University of Technology (2023–2027), B.Tech in Biotechnology (CGPA: 6.85). School of Excellence, Kalkaji (12th, 89.2%). Amrita Public School, Delhi (10th, 95.6%)."}
      </p>
    </section>
  );
}
