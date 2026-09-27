"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

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
      const cards = gsap.utils.toArray(".project-card-pin") as HTMLElement[];
      if (cards.length > 0) {
        // First card visible, rest stacked below with initial blur
        gsap.set(cards, {
          yPercent: (i) => (i === 0 ? 0 : 120),
          opacity: (i) => (i === 0 ? 1 : 0.3),
          scale: (i) => (i === 0 ? 1 : 0.92),
          filter: (i) => (i === 0 ? "blur(0px)" : "blur(8px)"),
        });

        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (cards.length - 1) * 1.3}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            const next = cards[index + 1];

            // Current card: fade out + blur + scale down + move up
            pinTimeline.to(card, {
              yPercent: -120,
              opacity: 0,
              scale: 0.92,
              filter: "blur(12px)",
              duration: 1,
              ease: "power2.inOut",
            });

            // Next card: blur in + scale up + move into view
            pinTimeline.to(
              next,
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.inOut",
              },
              "<"
            );
          }
        });
      }
    }, projectsRef);

    // Refresh all ScrollTriggers after pin spacer is injected into the DOM
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  const projectsData = [
    {
      title: "Credit Card Recommender",
      tags: "PYTHON • FLASK • OPENAI API",
      description: "A responsive web app that recommends credit cards based on user preferences using Flask backend and OpenAI API integration. Features interactive chat UI with dynamic message bubbles.",
      image: "https://images.unsplash.com/photo-1607734564620-cf0d5ad63b5d?auto=format&fit=crop&w=1200&q=80",
      link: "#"
    },
    {
      title: "Web Scraping Automation",
      tags: "SELENIUM • BEAUTIFULSOUP • PYTHON",
      description: "Automated data extraction across 10+ e-commerce platforms using Selenium, BeautifulSoup, and Scrapy. Integrated REST API pipeline with WordPress, handled authentication and CAPTCHA avoidance.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?auto=format&fit=crop&w=1200&q=80",
      link: "#"
    },
    {
      title: "Post Navigation WordPress Plugin",
      tags: "PHP • JQUERY • MYSQL • WP-CLI",
      description: "Custom WordPress plugin adding dynamic Previous/Next post navigation limited to current category. Implemented keyboard navigation support and optimized MySQL queries for large databases.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      link: "#"
    },
    {
      title: "Full-Stack Portfolio",
      tags: "NEXT.JS • REACT • TAILWIND",
      description: "A premium portfolio website built with Next.js, featuring GSAP scroll animations, glassmorphism UI, and responsive design. Demonstrates modern web development best practices.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      link: "#"
    },
    {
      title: "Data Analysis Projects",
      tags: "PYTHON • PANDAS • SQL",
      description: "Advanced data analysis and visualization using Python (Pandas, NumPy, Matplotlib). Projects include statistical modeling, A/B testing, and business analytics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      link: "#"
    }
  ];

  return (
    <section 
      ref={projectsRef}
      id="projects" 
      className="w-screen relative overflow-hidden z-10 flex flex-col bg-background min-h-screen"
    >
      {/* Header */}
      <div className="flex-shrink-0 pt-4 sm:pt-6 px-4 sm:px-8 lg:px-16 pb-4 z-30">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
          <span className="font-serif-italic font-normal">Projects</span> we made
        </h2>
      </div>

      {/* Immersive Framed Card Container */}
      <div className="flex-1 px-3 sm:px-6 md:px-12 pb-4 sm:pb-6 relative flex items-center justify-center min-h-[400px]">
        {projectsData.map((project, idx) => (
          <div 
            key={idx} 
            id={`project-card-${idx}`}
            className="project-card-pin absolute inset-3 sm:inset-6 md:inset-12 bottom-4 sm:bottom-6 flex items-stretch justify-center"
            style={{
              zIndex: projectsData.length - idx,
            }}
          >
            {/* Inner card with tilt and glow */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glow-card group w-full rounded-[32px] overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-12 shadow-2xl relative"
            >
              {/* Card Background Image Covered */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover project-bg-img transition-transform duration-700"
                />
              </div>

              {/* Card Top Details */}
              <div className="relative z-20 flex justify-between text-xs sm:text-sm font-semibold tracking-wider text-white/50 uppercase mt-2 sm:mt-4">
                <span>PROJECT 0{idx + 1}</span>
                <span className="hidden sm:inline">{project.tags.split("•")[0]}</span>
              </div>

              {/* Card Center Title (Huge Elegant Serif) */}
              <div className="relative z-20 text-center flex-grow flex items-center justify-center py-4 sm:py-8">
                <h3 className="font-serif-italic text-3xl sm:text-5xl md:text-[9vw] text-white tracking-wide text-glow leading-none px-2">
                  {project.title}
                </h3>
              </div>

              {/* Card Bottom Row Details */}
              <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-4 text-xs sm:text-sm text-white/80">
                <span className="font-sans font-medium tracking-wide max-w-xs sm:max-w-md line-clamp-3">
                  {project.description}
                </span>
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-1.5 font-sans font-semibold text-white border-b border-white/20 pb-0.5 hover:border-brand-purple transition-all duration-300 whitespace-nowrap text-xs sm:text-sm mt-2 sm:mt-0"
                >
                  View Project
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
