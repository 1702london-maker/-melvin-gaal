"use client";

import { useEffect } from "react";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1565034946487-077786996e27?w=600&q=80",
    tag: "PROPULSION OVERHAUL • 2024",
    title: "MV Oceanic Pioneer Retrofit",
  },
  {
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
    tag: "DIGITAL TWIN • 2023",
    title: "Fleet Performance Analytics Deployment",
  },
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    tag: "HULL RESTORATION • 2023",
    title: "Rotterdam Dry Dock Series-A",
  },
];

export default function ServicesClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-hidden").forEach((el) => observer.observe(el));

    // Parallax on scroll
    const onScroll = () => {
      document.querySelectorAll<HTMLElement>(".parallax-bg").forEach((bg) => {
        const rect = bg.parentElement?.getBoundingClientRect();
        if (!rect) return;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          bg.style.transform = `translateY(${(pct - 0.5) * 40}px) scale(1.25)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.dispatchEvent(new Event("scroll"));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="bg-[#101415] text-[#e0e3e5] overflow-x-hidden">
      {/* Emergency hotline FAB */}
      <div className="fixed bottom-32 right-8 z-[60] group">
        <button className="bg-[#D4AF37] text-[#241a00] w-14 h-14 md:w-auto md:h-auto md:px-6 md:py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 hover:scale-110 transition-all duration-300">
          <span className="material-symbols-outlined text-[24px]">emergency_home</span>
          <span className="hidden md:block font-[var(--font-jetbrains)] text-[12px] tracking-widest uppercase">
            Emergency Hotline
          </span>
        </button>
        <div className="absolute right-0 bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glass-card p-4 rounded-xl whitespace-nowrap">
            <p className="font-[var(--font-jetbrains)] text-[#D4AF37] text-[10px] mb-1">TECHNICAL SUPPORT 24/7</p>
            <p className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea]">+44 (0) 20 7946 0123</p>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-48">
        {/* ── Hero ── */}
        <section className="px-6 md:px-12 max-w-[1280px] mx-auto mb-32">
          <div className="relative w-full h-[500px] overflow-hidden rounded-xl parallax-container">
            <div
              className="absolute inset-0 bg-cover bg-center parallax-bg scale-125"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#051324] via-[#051324]/60 to-transparent flex flex-col justify-center px-12 z-10">
              <h1 className="font-[var(--font-hanken)] text-[clamp(32px,5vw,64px)] font-extrabold text-[#b3c8ea] max-w-2xl mb-6 leading-tight tracking-tight">
                Technical Engineering & Maritime Solutions
              </h1>
              <p className="text-lg text-[#c4c6ce] max-w-xl">
                Precision-led maintenance and engineering consultancy for the world's most sophisticated commercial fleets.
              </p>
            </div>
          </div>
        </section>

        {/* ── Bento Services Grid ── */}
        <section className="px-6 md:px-12 max-w-[1280px] mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Ship Repair — large */}
            <div className="md:col-span-7 glass-card p-8 rounded-xl sheen-effect group flex flex-col justify-between min-h-[400px] reveal-hidden">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-[#D4AF37] text-[40px]">handyman</span>
                  <h2 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] tracking-tight">
                    Ship Repair & Maintenance
                  </h2>
                </div>
                <p className="text-[#c4c6ce] mb-6">
                  Full-cycle dry dock management and emergency hull repairs. Our team utilises advanced ultrasonic testing and laser alignment to ensure vessel integrity.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Hull Integrity Inspections", "Propulsion System Overhaul", "Surface Treatment & Coating"].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-[var(--font-jetbrains)] text-[12px] text-[#c4c6ce]">
                      <span className="material-symbols-outlined text-[16px] text-[#D4AF37]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-fit font-[var(--font-jetbrains)] text-[12px] tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-6 py-3 hover:bg-[#D4AF37] hover:text-[#051324] transition-all">
                EXPLORE CAPABILITIES
              </button>
            </div>

            {/* Marine Engineering */}
            <div className="md:col-span-5 glass-card p-8 rounded-xl sheen-effect group relative overflow-hidden reveal-hidden">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-[#D4AF37] text-[40px] mb-8 block">precision_manufacturing</span>
                  <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-4">Marine Engineering</h2>
                  <p className="text-[#c4c6ce] mb-6">
                    Specialised propulsion and electrical engineering solutions tailored for modern LNG and container vessels.
                  </p>
                </div>
                <div className="h-48 rounded-lg overflow-hidden mb-4 parallax-container">
                  <img
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80"
                    alt="Marine engine"
                    className="w-full h-full object-cover filter brightness-75 contrast-125 parallax-bg scale-125"
                  />
                </div>
              </div>
            </div>

            {/* Consultancy */}
            <div
              className="md:col-span-5 glass-card p-8 rounded-xl sheen-effect flex flex-col justify-between min-h-[350px] reveal-hidden"
              style={{ transitionDelay: "100ms" }}
            >
              <div>
                <span className="material-symbols-outlined text-[#D4AF37] text-[40px] mb-8 block">architecture</span>
                <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-4">Technical Consultancy</h2>
                <p className="text-[#c4c6ce]">
                  Strategic vessel lifecycle management, carbon-neutral transition planning, and fleet-wide efficiency audits.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                {["ISO 9001", "IMO COMPLIANT"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#081f3a] text-[#7487a8] font-[var(--font-jetbrains)] text-[10px] rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Port Support */}
            <div
              className="md:col-span-7 glass-card p-8 rounded-xl sheen-effect relative min-h-[350px] flex flex-col justify-end reveal-hidden"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-[#D4AF37] text-[64px] opacity-20">dock</span>
              </div>
              <div className="relative z-10 max-w-lg">
                <h2 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] mb-4 tracking-tight">
                  Port Support Services
                </h2>
                <p className="text-[#c4c6ce] mb-6">
                  24/7 shore-side assistance and logistical coordination across major European and Asian terminals. We minimise downtime through rapid response units.
                </p>
                <button className="bg-[#b3c8ea] text-[#1d314d] px-8 py-4 font-[var(--font-jetbrains)] text-[12px] tracking-widest hover:scale-105 transition-transform pulse-animation">
                  REQUEST DISPATCH
                </button>
              </div>
            </div>

            {/* Maritime Security */}
            <div className="md:col-span-6 glass-card p-8 rounded-xl sheen-effect flex flex-col justify-between reveal-hidden" style={{ transitionDelay: "200ms" }}>
              <div>
                <span className="material-symbols-outlined text-[#D4AF37] text-[40px] mb-6 block">shield</span>
                <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-4">Maritime Security</h2>
                <p className="text-[#c4c6ce]">
                  Integrated security solutions for high-risk transit zones. Armed escort, vessel hardening, and piracy prevention intelligence.
                </p>
              </div>
              <ul className="space-y-2 mt-6">
                {["Piracy Risk Assessments", "Armed Escort Services", "Vessel Hardening"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-[var(--font-jetbrains)] text-[11px] text-[#c4c6ce]">
                    <span className="material-symbols-outlined text-[14px] text-[#D4AF37]">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vessel Inspection */}
            <div className="md:col-span-6 glass-card p-8 rounded-xl sheen-effect flex flex-col justify-between reveal-hidden" style={{ transitionDelay: "400ms" }}>
              <div>
                <span className="material-symbols-outlined text-[#D4AF37] text-[40px] mb-6 block">search</span>
                <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-4">Vessel Inspection</h2>
                <p className="text-[#c4c6ce]">
                  Pre-purchase surveys, flag state compliance checks, and condition assessments by certified marine surveyors.
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                {["SOLAS", "MARPOL", "MLC 2006"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#081f3a] text-[#7487a8] font-[var(--font-jetbrains)] text-[10px] rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Case Studies ── */}
        <section className="bg-[#1d2022] py-24 border-y border-[#E2E8F0]/10">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-16 reveal-hidden">
              <div>
                <p className="font-[var(--font-jetbrains)] text-[12px] text-[#D4AF37] mb-2 tracking-widest">RECENT SUCCESS</p>
                <h2 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] tracking-tight">
                  Technical Excellence in Motion
                </h2>
              </div>
              <button className="text-[#c4c6ce] hover:text-[#D4AF37] flex items-center gap-2 font-[var(--font-jetbrains)] text-[12px] transition-colors">
                VIEW ALL PROJECTS
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  className="flex flex-col group cursor-pointer reveal-hidden"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#051324]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#D4AF37] text-[#241a00] px-6 py-3 font-[var(--font-jetbrains)] text-[12px] tracking-widest">
                        VIEW PROJECT
                      </span>
                    </div>
                  </div>
                  <p className="font-[var(--font-jetbrains)] text-[10px] text-[#D4AF37] mb-2 tracking-widest">{p.tag}</p>
                  <h3 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] group-hover:text-[#D4AF37] transition-colors">
                    {p.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
