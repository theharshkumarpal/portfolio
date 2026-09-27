"use strict";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Tech {
  name: string;
  icon: string; // devicon class or custom
}

interface Category {
  label: string;
  items: Tech[];
}

const categories: Category[] = [
  {
    label: "Languages",
    items: [
      { name: "Java", icon: "js" },
      { name: "Python", icon: "python" },
      { name: "C/C++", icon: "js" },
      { name: "SQL (Postgres)", icon: "postgresql" },
      { name: "JavaScript", icon: "js" },
      { name: "HTML/CSS", icon: "js" },
      { name: "TypeScript", icon: "ts" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "Flask", icon: "python" },
      { name: "FastAPI", icon: "python" },
      { name: "WordPress", icon: "js" },
    ],
  },
  {
    label: "Database Systems",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    label: "Developer Tools & Skills",
    items: [
      { name: "Git", icon: "git" },
      { name: "Selenium", icon: "docker" },
      { name: "BeautifulSoup", icon: "python" },
      { name: "Scrapy", icon: "docker" },
      { name: "VS Code", icon: "js" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    label: "Web Scraping",
    items: [
      { name: "BeautifulSoup", icon: "js" },
      { name: "Tkinter", icon: "js" },
      { name: "Scrapy", icon: "js" },
      { name: "Selenium", icon: "js" },
    ],
  },
  {
    label: "Data Analysis",
    items: [
      { name: "Advanced Excel", icon: "js" },
      { name: "Pandas", icon: "python" },
      { name: "NumPy", icon: "python" },
      { name: "Matplotlib", icon: "python" },
      { name: "Statistical Modeling", icon: "js" },
      { name: "A/B Testing", icon: "js" },
      { name: "Business Analysis", icon: "js" },
      { name: "Product Management", icon: "js" },
    ],
  },
];

// Inline SVG icons as components
const TechIcon = ({ icon, name }: { icon: string; name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    js: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <rect width="32" height="32" rx="4" fill="#F7DF1E" />
        <path d="M10.5 25.6c.5.9 1.2 1.5 2.4 1.5 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.8 0-1.9 1.4-3.3 3.6-3.3 1.6 0 2.7.5 3.5 1.9l-1.9 1.2c-.4-.7-.9-1-1.6-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.7 3.5-4 3.5-2.2 0-3.7-1.1-4.4-2.5l2.3-1.5zm9.8.2c.4.7.7 1.2 1.5 1.2.8 0 1.2-.3 1.2-1.5v-7.9h2.5v8c0 2.4-1.4 3.5-3.5 3.5-1.9 0-3-1-3.5-2.1l1.8-1.2z" fill="#000" />
      </svg>
    ),
    ts: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <rect width="32" height="32" rx="4" fill="#3178C6" />
        <path d="M18.6 20.3v2.2c.4.2.8.3 1.3.4.5.1 1 .1 1.5.1.5 0 1-.1 1.4-.2.5-.1.9-.3 1.2-.6.3-.2.6-.6.8-1 .2-.4.3-.9.3-1.5 0-.4-.1-.8-.2-1.1-.1-.3-.3-.6-.6-.9-.3-.3-.6-.5-1-.7-.4-.2-.8-.4-1.4-.6-.4-.1-.7-.3-1-.4-.2-.1-.4-.3-.6-.4-.1-.1-.2-.3-.3-.4-.1-.2-.1-.3-.1-.5 0-.2 0-.3.1-.5.1-.1.2-.3.3-.4.2-.1.3-.2.5-.2.2-.1.4-.1.7-.1.2 0 .5 0 .7.1.2 0 .4.1.6.2.2.1.4.2.6.3.2.1.3.3.5.4V14c-.3-.2-.7-.3-1.1-.4-.4-.1-.9-.1-1.4-.1-.5 0-.9.1-1.4.2-.4.1-.8.3-1.2.6-.3.3-.6.6-.8 1-.2.4-.3.9-.3 1.4 0 .7.2 1.3.6 1.8.4.5 1 .9 1.8 1.2.4.2.8.3 1.1.4.3.1.6.3.8.4.2.2.4.3.5.5.1.2.2.4.2.6 0 .2 0 .4-.1.5-.1.2-.2.3-.4.4-.2.1-.4.2-.6.2-.2.1-.5.1-.7.1-.5 0-1-.1-1.5-.3-.4-.2-.8-.5-1.1-.8zM13.7 14H17v-1.8H8v1.8h3.2v9.5h2.5V14z" fill="#fff" />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#20232A" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.2" fill="#61DAFB" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#000" />
        <path d="M9.5 21.5V10.5h8v1.5h-6.2v3.7h5.8v1.5h-5.8v4.3H9.5zm9.7-11v11l-6-8.3v8.3h-1.5" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M19.2 10.5l4.8 7.2-4.8 3.8" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#0F172A" />
        <path d="M16 9.5c-2.5 0-4 1.25-4.5 3.75.75-1 1.625-1.375 2.625-1.125.57.142.977.555 1.43 1.013C16.322 14.02 17.1 14.875 18.5 14.875c2.5 0 4-1.25 4.5-3.75-.75 1-1.625 1.375-2.625 1.125-.57-.142-.977-.555-1.43-1.013C18.178 10.355 17.4 9.5 16 9.5zm-4.5 7.5c-2.5 0-4 1.25-4.5 3.75.75-1 1.625-1.375 2.625-1.125.57.142.977.555 1.43 1.013C11.822 21.52 12.6 22.375 14 22.375c2.5 0 4-1.25 4.5-3.75-.75 1-1.625 1.375-2.625 1.125-.57-.142-.977-.555-1.43-1.013C13.678 17.855 12.9 17 11.5 17z" fill="#38BDF8" />
      </svg>
    ),
    gsap: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#0D0D0D" />
        <path d="M7 16a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" fill="none" stroke="#88CE02" strokeWidth="2" />
        <path d="M16 11v5l3 3" stroke="#88CE02" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    framer: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A1A" />
        <path d="M10 10h12v6H16L10 10zm0 6h6l6 6H10v-6zm0 6h6v6L10 22z" fill="#BB4AE8" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A1A" />
        <path d="M16 6l9 5.2v10.4L16 26l-9-4.4V11.2L16 6z" fill="none" stroke="#539E43" strokeWidth="1.2" />
        <path d="M11.5 14.5c0-1.4 1.1-2.2 2.6-2.2 1 0 1.8.4 2.3 1.2l-1.1.7c-.3-.5-.7-.7-1.2-.7-.7 0-1.2.4-1.2 1 0 .7.4 1 1.3 1.4l.4.2c1.5.7 2.3 1.4 2.3 2.9 0 1.6-1.2 2.6-2.9 2.6-1.6 0-2.7-.8-3.2-2l1.2-.7c.3.7.9 1.2 1.7 1.2s1.4-.4 1.4-1.1c0-.7-.4-1-1.4-1.5l-.4-.2c-1.4-.6-2.2-1.4-2.2-2.8zm6.8-2h1.4l1.8 5.8 1.8-5.8h1.4l-2.6 7.8H19l-2.6-7.8h1.9z" fill="#539E43" />
      </svg>
    ),
    express: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#2D2D2D" />
        <text x="5" y="20" fontSize="9" fontFamily="monospace" fill="#fff" fontWeight="bold">ex</text>
        <path d="M14 19.5h10M14 16.5h7M14 13.5h10" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
        <path d="M16 7c-2.2 0-4 .7-4 2v2.5h4V13H10c-1.3 0-2 1-2 2.5v3c0 1.5.7 2.5 2 2.5h1.5V19c0-1.3.7-2 2-2h5c1.3 0 2-.7 2-2v-4c0-1.5-.9-2-2.5-2H16zm-1 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#3776AB" />
        <path d="M16 25c2.2 0 4-.7 4-2v-2.5h-4V19h6c1.3 0 2-1 2-2.5v-3c0-1.5-.7-2.5-2-2.5h-1.5V13c0 1.3-.7 2-2 2h-5c-1.3 0-2 .7-2 2v4c0 1.5.9 2 2.5 2H16zm1-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#FFD43B" />
      </svg>
    ),
    postgresql: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
        <ellipse cx="16" cy="12" rx="7" ry="3.5" fill="none" stroke="#336791" strokeWidth="1.5" />
        <path d="M9 12v8c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5v-8" fill="none" stroke="#336791" strokeWidth="1.5" />
        <path d="M9 16c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5" fill="none" stroke="#336791" strokeWidth="1" strokeDasharray="2" />
        <ellipse cx="16" cy="12" rx="7" ry="3.5" fill="#336791" opacity="0.3" />
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A1A" />
        <path d="M16 6c0 0-6 6.5-6 11.5a6 6 0 0 0 12 0C22 12.5 16 6 16 6z" fill="#4DB33D" />
        <path d="M16 6v20.5" stroke="#F5F0E8" strokeWidth="1.5" />
        <path d="M16 20c2-2 4-4 4-6.5" stroke="#3D9970" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    mysql: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
        <path d="M6 11h3.5l2.5 7 2.5-7H18v10h-2.2V14l-2.8 7h-2L8.2 14V21H6V11zm13 0h2.5l3 8.5-1.8.5-2.5-7.2-2.5 7.2-1.8-.5L19 11z" fill="#00758F" />
      </svg>
    ),
    prisma: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
        <path d="M16 6L8 24l6-3 2-15z" fill="#5A67D8" opacity="0.8" />
        <path d="M16 6l8 18-6-3-2-15z" fill="#5A67D8" />
        <path d="M8 24l8-3 6 3" fill="none" stroke="#5A67D8" strokeWidth="1" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#F05032" />
        <path d="M29 15l-12-12a1.4 1.4 0 0 0-2 0l-2.7 2.7 3.4 3.4a1.7 1.7 0 0 1 2.1 2.1l3.2 3.2a1.7 1.7 0 1 1-1 .9l-3-3v7.8a1.7 1.7 0 1 1-1.4 0V13.1a1.7 1.7 0 0 1-.9-2.2l-3.3-3.3L3 15a1.4 1.4 0 0 0 0 2l12 12a1.4 1.4 0 0 0 2 0l12-12a1.4 1.4 0 0 0 0-2z" fill="#fff" />
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A2E" />
        <path d="M9 13h3v3H9zm3.5 0h3v3h-3zm3.5 0h3v3h-3zm-7-3.5h3v3h-3zm3.5 0h3v3h-3zm3.5 0h3v3h-3zm3.5 0h3v3h-3zm-7-3.5h3v3h-3zm3.5 0h3v3h-3z" fill="#2496ED" />
        <path d="M27 15.5c-.5-1-2-1.5-3-1.3-.2-1.5-1.5-2.5-3-2.2" fill="none" stroke="#2496ED" strokeWidth="1" />
        <path d="M5.5 16c1 2.5 3.5 4 8.5 4h6c3 0 5-2 5-4H5.5z" fill="#2496ED" opacity="0.6" />
      </svg>
    ),
    aws: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A1A" />
        <path d="M11 19.5c-2.2 0-3.5-1-3.5-3.5 0-2.5 1.5-4.5 4.5-4.5.5 0 1 .1 1.5.2-.1-.5-.2-1-.2-1.5 0-2.5 2-4.2 4.5-4.2 2 0 3.5 1 4 2.5.5-.2 1-.3 1.5-.3 2.5 0 4 1.5 4 3.5 0 2-1.5 3.3-3.5 3.3H11z" fill="none" stroke="#FF9900" strokeWidth="1.5" />
        <text x="8.5" y="26" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#FF9900">AWS</text>
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#1A1A1A" />
        <rect x="11" y="7" width="5" height="5" rx="2.5" fill="#F24E1E" />
        <rect x="16" y="7" width="5" height="5" rx="2.5" fill="#FF7262" />
        <rect x="11" y="12" width="5" height="5" rx="2.5" fill="#A259FF" />
        <rect x="11" y="17" width="5" height="5" rx="2.5" fill="#1ABCFE" />
        <circle cx="18.5" cy="14.5" r="2.5" fill="#0ACF83" />
      </svg>
    ),
  };

  return (
    <span className="flex-shrink-0">
      {icons[icon] ?? (
        <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
};

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate each category row
      gsap.fromTo(
        ".stack-category",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate individual tech items with stagger
      gsap.fromTo(
        ".tech-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section header */}
      <div className="stack-header mb-16 sm:mb-20 opacity-0">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          ✦ MY STACK
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white tracking-tight">
          Technical Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="space-y-12 sm:space-y-16">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="stack-category opacity-0"
          >
            {/* Category Title */}
            <h3 className="text-sm sm:text-base font-sans font-bold text-white/50 uppercase tracking-wider mb-4 sm:mb-6">
              {cat.label}
            </h3>

            {/* Tech Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
              {cat.items.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-item group flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl glass-panel hover:border-brand-purple/40 hover:bg-white/[0.06] transition-all duration-300 cursor-default opacity-0"
                >
                  <div className="flex-shrink-0">
                    <TechIcon icon={tech.icon} name={tech.name} />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors duration-200 text-center line-clamp-2">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
