"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    const tiltX = -(dy / yc) * 3;
    const tiltY = (dx / xc) * 3;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const servicesData = [
    {
      title: "Web Development",
      tags: "REACT • NEXT.JS • FULL-STACK",
      description: "Building responsive, high-performance web applications with React, Next.js, and modern frontend frameworks. Expertise in optimized UX and SEO."
    },
    {
      title: "Backend Systems",
      tags: "NODE.JS • PYTHON • DATABASES",
      description: "Developing scalable server-side solutions, RESTful APIs, and database architecture. Experience with PostgreSQL, MongoDB, and FastAPI."
    },
    {
      title: "Web Scraping & Automation",
      tags: "SELENIUM • BEAUTIFULSOUP • PYTHON",
      description: "Automating data extraction workflows across 10+ e-commerce and SaaS platforms. Building GUI tools and headless browser solutions for complex scraping tasks."
    },
    {
      title: "Problem Solving",
      tags: "ALGORITHMS • DSA • COMPETITIVE CODING",
      description: "Solving complex algorithmic challenges. 183+ LeetCode problems across DP, graphs, and arrays. Active in competitive programming."
    }
  ];

  return (
    <section 
      ref={servicesRef}
      id="services" 
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10"
    >
      <div className="mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white tracking-tight">
          My expertise
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {servicesData.map((service, idx) => (
          <div 
            key={idx} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="service-card glow-card p-6 sm:p-8 md:p-12 rounded-3xl glass-panel flex flex-col justify-between min-h-[280px] sm:min-h-[320px] hover:border-white/10 transition-all duration-300 opacity-0 cursor-pointer"
          >
            <div>
              <h3 className="text-3xl font-sans font-semibold text-white mb-2">
                {service.title}
              </h3>
              <span className="text-xs font-semibold tracking-wider text-brand-purple block mb-6">
                {service.tags}
              </span>
              <p className="text-muted text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
