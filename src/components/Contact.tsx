"use strict";
"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-sans font-bold text-white tracking-tight">
          {"Get in Touch"}
        </h2>
        <p className="text-muted mt-4">{"Have a project or question? Reach out and let's connect."}</p>
        <p className="text-slate-400 mt-3 text-sm">{"📧 harshkumarpalofficial@gmail.com • 📱 +91-7065382962"}</p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-2xl rounded-full" />
        
        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="p-4 rounded-full bg-brand-cyan/10 text-brand-cyan">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
            <p className="text-slate-400 max-w-md">
              {"Thank you for reaching out. I'll get back to you within 24 hours. Let's make something amazing together!"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-300">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-300"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-300"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-300">Your Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-300 resize-none"
                placeholder="Hey, let's work on a new project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl text-white font-semibold hover:opacity-90 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple/10 disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message
                  <Mail className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
