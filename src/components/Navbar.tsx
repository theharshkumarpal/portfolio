"use strict";
"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Defer state update to satisfy eslint hooks rule
    setTimeout(() => {
      const savedTheme = localStorage.getItem("theme") as "dark" | "light";
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "light") {
          document.documentElement.classList.add("light");
        }
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
        document.documentElement.classList.add("light");
      }
    }, 0);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Expertise", href: "#services" },
    { name: "Stack", href: "#stack" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#experience" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 sm:py-4 bg-background/70 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/5"
          : "py-4 sm:py-6 bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-sans font-bold text-lg sm:text-2xl tracking-tight text-white transition-colors duration-300">
            Harsh Kumar
          </span>
        </a>

        {/* Desktop Nav Links (Centered) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-nav-link text-xs sm:text-sm font-normal transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side controls (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <a
            href="#contact"
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-900 bg-white border border-white hover:bg-transparent hover:text-white rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-sm"
          >
            Contact
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out border-b border-white/10 overflow-hidden ${
          isOpen
            ? "max-h-80 bg-background/95 backdrop-blur-lg opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-nav-link text-base font-medium py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <a
              href="https://github.com/harshkumarpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/harshkumarpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="ml-auto px-5 py-2 text-xs font-semibold text-slate-900 bg-white rounded-full flex items-center gap-1"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
