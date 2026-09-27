"use strict";
import React from "react";
import { Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-8 sm:py-12 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Logo & Info */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg sm:rounded-xl bg-white/5 text-brand-cyan">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white">
              Harsh Kumar<span className="text-brand-cyan">.dev</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/harshkumarpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://linkedin.com/in/harshkumarpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com/harshkumarpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Harsh Kumar Pal. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Journey</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
