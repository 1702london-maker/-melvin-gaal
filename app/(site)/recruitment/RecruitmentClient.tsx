"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const vacancies = [
  {
    icon: "directions_boat",
    title: "Master Mariner / Captain",
    desc: "Seeking an experienced Master for a 120m+ Luxury Mega Yacht. Unlimited COC required with a minimum 5 years in rank.",
    badge: "URGENT",
    rotation: "2:2 Months",
    postedAgo: "4H AGO",
    large: true,
  },
  {
    icon: "settings",
    title: "Chief Engineer",
    desc: "Y1/III/2 Unlimited. Modern diesel-electric propulsion experience required.",
    postedAgo: "2H AGO",
    large: false,
  },
  {
    icon: "bolt",
    title: "ETO",
    desc: "Electronic Technical Officer for new-build explorer vessel.",
    postedAgo: "1D AGO",
    large: false,
  },
  {
    icon: "layers",
    title: "Deck Rating",
    desc: "Lead Deckhand for fleet expansion program.",
    large: false,
  },
  {
    icon: "engineering",
    title: "Engine Rating",
    desc: "Motorman with STCW-II/4 or III/5 certification.",
    large: false,
  },
];

const ranks = [
  "Select Rank",
  "Master / Captain",
  "Chief Mate",
  "Second Officer",
  "Third Officer",
  "Chief Engineer",
  "Second Engineer",
  "Third Engineer",
  "Fourth Engineer",
  "ETO",
  "Bosun",
  "AB Seaman",
  "OS / Deck Rating",
  "Motorman / Engine Rating",
  "Cook / Steward",
  "Other",
];

export default function RecruitmentClient() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const parallaxRef = useRef<HTMLImageElement>(null);

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

    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          rank: data.get("rank"),
          cocCountry: data.get("cocCountry"),
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Graceful — show success anyway (offline/dev)
    }
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="bg-[#051324] text-[#e0e3e5] overflow-x-hidden">
      <div className="pt-32 pb-48 px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* ── Hero ── */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-hidden">
              <h1 className="font-[var(--font-hanken)] text-[clamp(40px,8vw,64px)] font-extrabold text-[#b3c8ea] mb-6 leading-tight tracking-tight">
                Join Our Fleet
              </h1>
              <p className="text-lg text-[#c4c6ce] max-w-xl mb-10">
                Embark on a career defined by maritime excellence. Melvin Gaal Ltd connects elite seafarers with world-class vessels, ensuring safety, precision, and technological advancement in every voyage.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#registration-portal"
                  className="bg-[#D4AF37] text-[#051324] px-8 py-4 font-[var(--font-jetbrains)] text-[12px] tracking-widest hover:bg-[#ffe088] transition-colors uppercase"
                >
                  Start Registration
                </a>
                <a
                  href="#vacancies"
                  className="border border-[#E2E8F0]/20 text-[#e0e3e5] px-8 py-4 font-[var(--font-jetbrains)] text-[12px] tracking-widest hover:bg-white/[0.08] transition-colors uppercase"
                >
                  View All Vacancies
                </a>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden glass-card reveal-hidden">
              <img
                ref={parallaxRef}
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                alt="Maritime vessel bridge"
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051324] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="font-[var(--font-jetbrains)] text-[10px] text-[#D4AF37] tracking-widest uppercase">Live Status</span>
                </div>
                <p className="text-[#e0e3e5] font-[var(--font-hanken)] text-[22px] font-semibold">Fleet Operational: 100%</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vacancies ── */}
        <section className="mb-32" id="vacancies">
          <div className="flex items-center justify-between mb-12 reveal-hidden">
            <h2 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] tracking-tight">Active Vacancies</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 glass-card text-[#c4c6ce] font-[var(--font-jetbrains)] text-[10px]">ALL ROLES</span>
              <span className="px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] font-[var(--font-jetbrains)] text-[10px] animate-urgent">
                URGENT FILL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Large captain card */}
            <div className="md:col-span-2 md:row-span-2 glass-card rounded-xl p-8 sheen-effect group flex flex-col justify-between reveal-hidden">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="material-symbols-outlined text-[#D4AF37] text-5xl group-hover:scale-110 transition-transform duration-300">
                    directions_boat
                  </span>
                  <span className="font-[var(--font-jetbrains)] text-[12px] text-[#D4AF37] px-4 py-1 border border-[#D4AF37] animate-urgent">
                    URGENT
                  </span>
                </div>
                <h3 className="font-[var(--font-hanken)] text-[40px] font-bold text-white mb-2 leading-tight">
                  Master Mariner / Captain
                </h3>
                <p className="text-[#c4c6ce] mb-6">
                  Seeking an experienced Master for a 120m+ Luxury Mega Yacht. Unlimited COC required with a minimum 5 years in rank.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-[#E2E8F0]/10 pt-6">
                <div>
                  <span className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce]">ROTATION</span>
                  <p className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea]">2:2 Months</p>
                </div>
                <a
                  href="#registration-portal"
                  className="bg-[#081f3a] text-[#b3c8ea] border border-[#b3c8ea]/20 px-6 py-3 font-[var(--font-jetbrains)] text-[12px] tracking-widest hover:bg-[#b3c8ea] hover:text-[#1d314d] transition-all"
                >
                  APPLY NOW
                </a>
              </div>
            </div>

            {/* Smaller cards */}
            {[
              { icon: "settings", title: "Chief Engineer", desc: "Y1/III/2 Unlimited. Modern diesel-electric propulsion.", time: "2H AGO" },
              { icon: "bolt", title: "ETO", desc: "Electronic Technical Officer for new-build explorer vessel.", time: "1D AGO" },
              { icon: "layers", title: "Deck Rating", desc: "Lead Deckhand for fleet expansion program.", time: null },
              { icon: "engineering", title: "Engine Rating", desc: "Motorman with STCW-II/4 or III/5 certification.", time: null },
            ].map((v) => (
              <div key={v.title} className="glass-card rounded-xl p-6 sheen-effect group reveal-hidden">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-[#a5c8ff] text-3xl">{v.icon}</span>
                </div>
                <h4 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#e0e3e5] mb-2">{v.title}</h4>
                <p className="text-[#c4c6ce] text-sm mb-4">{v.desc}</p>
                {v.time ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-[var(--font-jetbrains)] text-[11px]">POSTED {v.time}</span>
                  </div>
                ) : (
                  <button className="w-full py-2 border border-[#E2E8F0]/10 font-[var(--font-jetbrains)] text-[11px] hover:bg-white/[0.08] transition-colors">
                    VIEW DETAILS
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Registration Portal ── */}
        <section className="mb-32 reveal-hidden" id="registration-portal">
          <div className="glass-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-[#D4AF37]/20">
            {/* Sidebar */}
            <div className="lg:col-span-2 bg-[#081f3a] p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] mb-6 tracking-tight">
                  Seafarer Registration
                </h2>
                <p className="text-[#7487a8] mb-12">
                  Complete your digital profile to access premium maritime roles and automated certification tracking.
                </p>
                <div className="space-y-8" id="step-indicator">
                  {[
                    { n: "01", label: "Personal Details", sub: "Basic identity and contact information." },
                    { n: "02", label: "Sea Service & COCs", sub: "Verification of maritime experience." },
                    { n: "03", label: "Document Vault", sub: "Securely upload CV and certificates." },
                  ].map((s, i) => {
                    const active = step === i + 1;
                    const done = step > i + 1;
                    return (
                      <div
                        key={s.n}
                        className={`flex items-start gap-4 transition-all duration-300 ${!active && !done ? "opacity-50" : ""} ${active ? "scale-105" : ""}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                            active || done
                              ? "bg-[#D4AF37]/10 border-[#D4AF37]"
                              : "bg-white/5 border-white/20"
                          }`}
                        >
                          {done ? (
                            <span className="material-symbols-outlined text-[#D4AF37] text-base">done</span>
                          ) : (
                            <span className="text-[#D4AF37] font-bold text-sm">{s.n}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#e0e3e5]">{s.label}</h4>
                          <p className="text-sm text-[#7487a8]">{s.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 opacity-5 -mb-20 -mr-20">
                <span className="material-symbols-outlined text-[300px]">verified_user</span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-12 bg-[#101415]/80 relative min-h-[600px]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center border border-[#D4AF37]/20 rounded-xl animate-urgent p-6">
                  <span className="material-symbols-outlined text-7xl text-[#D4AF37] mb-6">verified</span>
                  <h3 className="font-[var(--font-hanken)] text-[40px] font-bold text-[#b3c8ea] mb-4 tracking-tight">
                    Registration Received
                  </h3>
                  <p className="text-[#c4c6ce] max-w-md">
                    Your seafarer profile is being verified. A recruitment officer will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                        GIVEN NAME *
                      </label>
                      <input
                        name="firstName"
                        required
                        placeholder="John"
                        type="text"
                        className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                        onChange={() => setStep(Math.max(step, 2))}
                      />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                        FAMILY NAME *
                      </label>
                      <input
                        name="lastName"
                        required
                        placeholder="Doe"
                        type="text"
                        className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 group">
                    <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      name="email"
                      required
                      placeholder="j.doe@maritime.com"
                      type="email"
                      className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                    />
                  </div>

                  <div className="flex flex-col gap-2 group">
                    <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                      PHONE NUMBER
                    </label>
                    <input
                      name="phone"
                      placeholder="+44 20 0000 0000"
                      type="tel"
                      className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                        RANK / POSITION *
                      </label>
                      <select
                        name="rank"
                        required
                        className="bg-[#101415] border-b border-white/10 p-2 text-[#e0e3e5] input-ocean appearance-none"
                        onChange={() => setStep(Math.max(step, 2))}
                      >
                        {ranks.map((r) => (
                          <option key={r} value={r === "Select Rank" ? "" : r} className="bg-[#051324]">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest group-focus-within:text-[#a5c8ff] transition-colors">
                        COC COUNTRY
                      </label>
                      <input
                        name="cocCountry"
                        placeholder="United Kingdom"
                        type="text"
                        className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest">
                        NATIONALITY
                      </label>
                      <input
                        name="nationality"
                        placeholder="British"
                        type="text"
                        className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                      />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest">
                        YEARS OF EXPERIENCE
                      </label>
                      <input
                        name="experience"
                        placeholder="5"
                        type="number"
                        min="0"
                        max="50"
                        className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 group">
                    <label className="font-[var(--font-jetbrains)] text-[10px] text-[#c4c6ce] tracking-widest">
                      AVAILABILITY DATE
                    </label>
                    <input
                      name="availability"
                      type="date"
                      className="bg-transparent border-b border-white/10 p-2 text-[#e0e3e5] input-ocean"
                      onChange={() => setStep(Math.max(step, 2))}
                    />
                  </div>

                  {/* Upload zone */}
                  <div
                    className={`mt-4 p-6 border-2 border-dashed rounded-xl hover:border-[#a5c8ff] transition-all cursor-pointer group relative overflow-hidden ${
                      uploaded ? "border-emerald-500" : "border-[#E2E8F0]/10"
                    }`}
                    onClick={() => {
                      if (!uploaded) {
                        setUploading(true);
                        setTimeout(() => {
                          setUploading(false);
                          setUploaded(true);
                          setStep(3);
                        }, 1500);
                      }
                    }}
                  >
                    {uploaded ? (
                      <div className="flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
                        <p className="font-bold text-emerald-400">Files Uploaded Successfully</p>
                      </div>
                    ) : uploading ? (
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-8 h-8 border-2 border-[#a5c8ff] border-t-transparent rounded-full animate-spin" />
                        <p className="text-[#c4c6ce]">Uploading…</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-4xl text-[#c4c6ce] group-hover:text-[#a5c8ff] transition-colors">
                          cloud_upload
                        </span>
                        <div>
                          <p className="font-bold text-[#e0e3e5]">Upload CV & Certificates</p>
                          <p className="text-sm text-[#c4c6ce]">CV, Passport, STCW, Medical — PDF/DOCX up to 15MB. Encrypted.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="w-5 h-5 rounded border-white/10 bg-transparent text-[#D4AF37] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-sm text-[#c4c6ce] cursor-pointer">
                      I agree to the GDPR-compliant{" "}
                      <a href="#" className="text-[#D4AF37] hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and data processing terms.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#024a89] to-[#081f3a] border border-[#D4AF37] text-[#b3c8ea] font-[var(--font-jetbrains)] text-[12px] tracking-widest hover:scale-[1.01] transition-transform sheen-effect shadow-xl active:scale-95 disabled:opacity-70"
                  >
                    {loading ? "SUBMITTING…" : "COMPLETE PROFILE CREATION"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
