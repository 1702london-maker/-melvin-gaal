"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    icon: "groups",
    title: "Crew Manning",
    desc: "Expert recruitment of qualified officers and ratings for all vessel types.",
  },
  {
    icon: "build",
    title: "Ship Repair",
    desc: "Full-scale dry dock management and emergency repair services globally.",
  },
  {
    icon: "settings_suggest",
    title: "Marine Engineering",
    desc: "Technical support for propulsion, electrical, and hydraulic systems.",
  },
  {
    icon: "verified_user",
    title: "Maritime Security",
    desc: "Integrated security solutions for high-risk transit zones worldwide.",
  },
];

const regions = [
  { label: "UK & EUROPE", sub: "Strategic Headquarters", gold: true },
  { label: "MIDDLE EAST", sub: "Transit Hubs", gold: false },
  { label: "AFRICA", sub: "Technical Support", gold: false },
  { label: "ASIA PACIFIC", sub: "Offshore Operations", gold: false },
  { label: "AMERICAS", sub: "Port Services", gold: false },
  { label: "SCANDINAVIA", sub: "Fleet Management", gold: false },
];

export default function HomeClient() {
  const statsRef = useRef<HTMLDivElement>(null);
  const countersRan = useRef(false);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-hidden").forEach((el) => observer.observe(el));

    // Stats counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersRan.current) {
            countersRan.current = true;
            animateCounter("stat-1", 500, "+");
            animateCounter("stat-2", 120, "+");
            animateCounter("stat-3", 20, "+");
            animateCounter("stat-4", 98, "%");
          }
        });
      },
      { threshold: 0.15 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    // Particle system
    initParticles();

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  function animateCounter(id: string, target: number, suffix: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - progress) ** 2;
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  }

  function initParticles() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = document.getElementById("particle-container");
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        position:absolute; background:white; border-radius:50%;
        pointer-events:none; opacity:0.3;
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 20}%;
      `;
      container.appendChild(p);
      p.animate(
        [
          { transform: "translateY(0) scale(1)", opacity: 0.4 },
          {
            transform: `translateY(-${Math.random() * 200 + 100}px) translateX(${Math.random() * 50 - 25}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: (Math.random() * 5 + 3) * 1000,
          delay: Math.random() * 5 * 1000,
          iterations: Infinity,
          easing: "ease-out",
        }
      );
    }
  }

  return (
    <div className="bg-[#101415] text-[#e0e3e5] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="vessel-parallax h-full w-full opacity-60 scale-105 transition-transform duration-[20s] hover:scale-100"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80')",
            }}
          />
          {/* Moving vessel overlay */}
          <div className="absolute bottom-[35%] left-0 w-full h-24 pointer-events-none opacity-40 mix-blend-overlay">
            <svg
              className="animate-ship h-16 w-auto text-[#D4AF37]"
              fill="currentColor"
              viewBox="0 0 100 20"
            >
              <path d="M5,15 L95,15 L90,18 L10,18 Z M40,5 L60,5 L60,15 L40,15 Z M45,2 L55,2 L55,5 L45,5 Z" />
            </svg>
          </div>
          <div
            id="particle-container"
            className="absolute inset-0 z-10 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-[#101415]/40 to-transparent" />
        </div>

        <div className="relative z-20 px-6 md:px-12 max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 animate-float">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="font-[var(--font-jetbrains)] text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">
              Excellence in Maritime Logistics
            </span>
          </div>
          <h2 className="font-[var(--font-hanken)] text-[clamp(40px,8vw,64px)] font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-2xl tracking-tight">
            Global Maritime Solutions.{" "}
            <span className="text-[#D4AF37]">Trusted Worldwide.</span>
          </h2>
          <p className="text-lg text-[#c4c6ce] max-w-2xl mx-auto mb-10">
            Providing world-class ship repair, marine engineering, crew recruitment and maritime support services across international waters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#024a89] to-[#081f3a] border border-[#D4AF37] text-white font-[var(--font-jetbrains)] text-[12px] tracking-widest rounded-full sheen-effect shadow-xl uppercase hover:scale-[1.02] transition-transform"
            >
              Request a Quote
            </Link>
            <Link
              href="/recruitment"
              className="w-full sm:w-auto px-10 py-4 border border-[#E2E8F0]/30 text-[#e0e3e5] font-[var(--font-jetbrains)] text-[12px] tracking-widest rounded-full hover:bg-white/[0.08] transition-all uppercase"
            >
              Recruit Crew
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[200%] h-12 md:h-20 text-[#101415] wave-path"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g>
              <use href="#gentle-wave" fill="currentColor" opacity="0.7" x="48" y="0" />
              <use href="#gentle-wave" fill="currentColor" opacity="0.5" x="48" y="3" />
              <use href="#gentle-wave" fill="currentColor" opacity="0.3" x="48" y="5" />
              <use href="#gentle-wave" fill="currentColor" x="48" y="7" />
            </g>
          </svg>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-14 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30">
          <span className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal-hidden">
          <div className="max-w-xl">
            <h3 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] mb-4 tracking-tight">
              Our Core Capabilities
            </h3>
            <p className="text-[#c4c6ce]">
              Precision engineering and expert staffing for the modern maritime industry. We bridge the gap between traditional seafaring excellence and contemporary technology.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="p-4 rounded-full border border-[#E2E8F0]/20 hover:bg-[#D4AF37] hover:text-[#051324] transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="p-4 rounded-full border border-[#E2E8F0]/20 hover:bg-[#D4AF37] hover:text-[#051324] transition-all">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="glass-card p-8 rounded-xl group hover:scale-[1.05] transition-all duration-500 cursor-pointer sheen-effect reveal-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-lg bg-[#081f3a] flex items-center justify-center mb-6 border border-[#D4AF37]/20 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">{s.icon}</span>
              </div>
              <h4 className="font-[var(--font-hanken)] text-[22px] font-semibold text-white mb-3">{s.title}</h4>
              <p className="text-[#c4c6ce] mb-6">{s.desc}</p>
              <div className="flex items-center gap-2 text-[#D4AF37] font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        ref={statsRef}
        className="py-20 bg-[#051324] border-y border-[#E2E8F0]/10 overflow-hidden"
      >
        <div className="px-6 md:px-12 max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { id: "stat-1", label: "Qualified Crew" },
            { id: "stat-2", label: "Vessel Projects" },
            { id: "stat-3", label: "Countries Served" },
            { id: "stat-4", label: "Client Satisfaction" },
          ].map((s, i) => (
            <div
              key={s.id}
              className={`flex flex-col items-center reveal-hidden ${i > 0 ? "border-l border-[#E2E8F0]/10" : ""}`}
            >
              <span
                id={s.id}
                className="font-[var(--font-hanken)] text-[clamp(40px,6vw,64px)] font-extrabold text-[#D4AF37] block mb-2"
              >
                0
              </span>
              <span className="font-[var(--font-jetbrains)] text-[12px] text-[#c4c6ce] uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services extra row ── */}
      <section className="py-16 px-6 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "security", title: "Offshore Personnel", desc: "Trained offshore technicians and platform crew." },
            { icon: "search", title: "Vessel Inspection", desc: "Flag state and class society pre-inspection audits." },
            { icon: "architecture", title: "Technical Consultancy", desc: "Fleet lifecycle management and carbon-neutral planning." },
            { icon: "dock", title: "Port Support", desc: "24/7 shore-side logistics across major terminals." },
          ].map((s, i) => (
            <div
              key={s.title}
              className="glass-card p-6 rounded-xl group hover:scale-[1.03] transition-all duration-300 cursor-pointer sheen-effect reveal-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#081f3a] flex items-center justify-center mb-4 border border-[#D4AF37]/20 text-[#D4AF37]">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h4 className="font-[var(--font-hanken)] font-semibold text-white mb-2">{s.title}</h4>
              <p className="text-[#c4c6ce] text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Global Operations Map ── */}
      <section className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto overflow-hidden">
        <div className="text-center mb-16 reveal-hidden">
          <h3 className="font-[var(--font-hanken)] text-[40px] font-bold text-white mb-4 tracking-tight">
            Strategic Global Presence
          </h3>
          <p className="text-[#c4c6ce] max-w-2xl mx-auto">
            Operating across major trade routes with dedicated support hubs in every hemisphere.
          </p>
        </div>

        <div className="relative w-full min-h-[500px] flex items-center justify-center rounded-3xl overflow-hidden glass-card group reveal-hidden">
          {/* 3D Globe */}
          <div className="absolute inset-0 flex items-center justify-center globe-container">
            <div className="relative w-80 h-80 globe-rotation">
              <div className="globe-layer bg-[#081f3a]/20 shadow-[inset_0_0_50px_rgba(179,200,234,0.1)]" />
              <div className="globe-layer border-[#D4AF37]/10" style={{ transform: "rotateX(45deg)" }} />
              <div className="globe-layer border-[#D4AF37]/10" style={{ transform: "rotateX(-45deg)" }} />
              <div className="globe-layer border-[#D4AF37]/10" style={{ transform: "rotateY(90deg)" }} />
              <div
                className="absolute inset-0 grayscale opacity-40 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=60')",
                  maskImage: "radial-gradient(circle, black, transparent)",
                }}
              />
            </div>
          </div>

          {/* Region overlays */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 pointer-events-auto">
              {regions.map((r) => (
                <div
                  key={r.label}
                  className={`p-4 rounded-xl bg-[#051324]/80 backdrop-blur-md border transform hover:-translate-y-2 transition-transform cursor-default ${
                    r.gold ? "border-[#D4AF37]/30" : "border-[#E2E8F0]/20"
                  }`}
                >
                  <h5 className={`font-[var(--font-jetbrains)] text-[12px] mb-1 ${r.gold ? "text-[#D4AF37]" : "text-white"}`}>
                    {r.label}
                  </h5>
                  <p className="text-[10px] text-[#c4c6ce] uppercase">{r.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-20 bg-[#051324] border-y border-[#E2E8F0]/10">
        <div className="px-6 md:px-12 max-w-[1280px] mx-auto text-center reveal-hidden">
          <p className="font-[var(--font-jetbrains)] text-[12px] text-[#D4AF37] uppercase tracking-widest mb-4">
            Join the Fleet
          </p>
          <h3 className="font-[var(--font-hanken)] text-[clamp(28px,4vw,40px)] font-bold text-white mb-6 tracking-tight">
            Ready to advance your maritime career?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/recruitment"
              className="px-10 py-4 bg-[#D4AF37] text-[#051324] font-[var(--font-jetbrains)] text-[12px] tracking-widest rounded-full hover:scale-[1.02] transition-transform sheen-effect uppercase"
            >
              Seafarer Registration
            </Link>
            <Link
              href="/services"
              className="px-10 py-4 border border-[#E2E8F0]/20 text-[#e0e3e5] font-[var(--font-jetbrains)] text-[12px] tracking-widest rounded-full hover:bg-white/[0.08] transition-all uppercase"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
