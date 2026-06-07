"use client";

import { useState } from "react";

const offices = [
  { city: "London HQ", address: "12 Leadenhall St, London EC3V 1PP, UK" },
  { city: "Singapore", address: "7 Temasek Blvd, Suntec Tower One, Singapore" },
  { city: "Dubai", address: "Burj Daman, DIFC, Dubai, UAE" },
];

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          vesselName: data.get("vessel_name"),
          imoNumber: data.get("imo_number"),
          service: data.get("service_required"),
          urgency: data.get("urgency"),
          message: data.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // graceful
    }
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  }

  return (
    <div className="bg-[#101415] text-[#e0e3e5] overflow-x-hidden">
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* Hero */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="font-[var(--font-hanken)] text-[clamp(32px,6vw,64px)] font-extrabold text-[#e0e3e5] mb-6 tracking-tight">
            Global Maritime <span className="text-[#D4AF37]">Liaison</span>
          </h1>
          <p className="text-lg text-[#c4c6ce] max-w-2xl">
            Ensuring technical continuity and crewing excellence across every meridian. Connect with our dedicated support teams available 24/7 for urgent vessel requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card sheen-effect p-8 md:p-12 rounded-xl">
              <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-8">Service Request Portal</h2>
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input
                      name="vessel_name"
                      id="vessel_name"
                      placeholder=" "
                      type="text"
                      className="contact-input w-full py-2 text-[#e0e3e5] peer"
                    />
                    <label
                      htmlFor="vessel_name"
                      className="absolute left-0 top-2 text-[#c4c6ce] pointer-events-none font-[var(--font-jetbrains)] text-[12px] tracking-widest transition-all peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#D4AF37] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-85"
                    >
                      Vessel Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      name="imo_number"
                      id="imo_number"
                      placeholder=" "
                      type="text"
                      className="contact-input w-full py-2 text-[#e0e3e5] peer"
                    />
                    <label
                      htmlFor="imo_number"
                      className="absolute left-0 top-2 text-[#c4c6ce] pointer-events-none font-[var(--font-jetbrains)] text-[12px] tracking-widest transition-all peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#D4AF37] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-85"
                    >
                      IMO Number
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="service_required" className="-translate-y-6 scale-85 text-[#D4AF37] absolute left-0 font-[var(--font-jetbrains)] text-[12px] tracking-widest">
                    Service Required
                  </label>
                  <select
                    name="service_required"
                    id="service_required"
                    className="contact-input w-full py-2 text-[#e0e3e5] bg-transparent appearance-none mt-4"
                  >
                    <option value="" className="bg-[#051324]">Select Service</option>
                    <option value="crew" className="bg-[#051324]">Technical Crewing</option>
                    <option value="compliance" className="bg-[#051324]">Regulatory Compliance</option>
                    <option value="logistics" className="bg-[#051324]">Maritime Logistics</option>
                    <option value="maintenance" className="bg-[#051324]">Fleet Maintenance</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <span className="font-[var(--font-jetbrains)] text-[12px] text-[#c4c6ce]">Urgency Level</span>
                  <div className="flex flex-wrap gap-6">
                    {[
                      { val: "routine", label: "Routine", cls: "text-[#e0e3e5] hover:text-[#b3c8ea]" },
                      { val: "priority", label: "Priority", cls: "text-[#e0e3e5] hover:text-[#a5c8ff]" },
                      { val: "urgent", label: "AOG / Urgent", cls: "text-[#D4AF37] font-bold" },
                    ].map((opt) => (
                      <label key={opt.val} className={`flex items-center gap-2 cursor-pointer group ${opt.cls}`}>
                        <input
                          name="urgency"
                          type="radio"
                          value={opt.val}
                          className="w-4 h-4 bg-transparent border-[#8e9198] focus:ring-0 accent-[#D4AF37]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    placeholder=" "
                    rows={4}
                    className="contact-input w-full py-2 text-[#e0e3e5] resize-none peer"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-2 text-[#c4c6ce] pointer-events-none font-[var(--font-jetbrains)] text-[12px] tracking-widest transition-all peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-[#D4AF37] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-85"
                  >
                    Detailed Requirements
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className={`w-full md:w-auto px-10 py-4 rounded-lg font-[var(--font-jetbrains)] text-[12px] tracking-widest transition-all shadow-xl border border-[#D4AF37] sheen-effect ${
                    status === "sent"
                      ? "bg-gradient-to-r from-emerald-900 to-emerald-800 text-white"
                      : "bg-gradient-to-r from-[#024a89] to-[#081f3a] text-[#051c37] hover:scale-[1.02] active:scale-95"
                  } disabled:opacity-70`}
                >
                  {status === "idle" && "TRANSMIT REQUEST"}
                  {status === "sending" && "TRANSMITTING…"}
                  {status === "sent" && "SIGNAL RECEIVED ✓"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Emergency Hotline */}
            <div className="bg-gradient-to-br from-[#93000a]/20 to-[#051324] border border-[#ffb4ab]/30 p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[120px]">emergency</span>
              </div>
              <div className="relative z-10">
                <span className="font-[var(--font-jetbrains)] text-[12px] text-[#ffb4ab] bg-[#ffb4ab]/10 px-3 py-1 rounded-full mb-4 inline-block">
                  24/7 Global Response
                </span>
                <h3 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#ffdad6] mb-2">Emergency Hotline</h3>
                <p className="text-[#c4c6ce] mb-6">Immediate assistance for critical vessel downtime or security incidents.</p>
                <a
                  href="tel:+442079460000"
                  className="flex items-center gap-4 bg-[#ffb4ab] text-[#690005] font-[var(--font-jetbrains)] text-[18px] py-4 px-6 rounded-lg hover:brightness-110 transition-all justify-center font-bold"
                >
                  <span className="material-symbols-outlined">call</span>
                  +44 20 7946 0000
                </a>
              </div>
            </div>

            {/* Global Offices */}
            <div className="glass-card p-8 rounded-xl flex-grow">
              <h3 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#b3c8ea] mb-6">Global Presence</h3>
              <div className="space-y-4">
                {offices.map((o) => (
                  <div key={o.city} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-[#D4AF37] mt-1">location_on</span>
                    <div>
                      <h4 className="font-bold text-[#e0e3e5]">{o.city}</h4>
                      <p className="text-[#c4c6ce] text-sm">{o.address}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-[#E2E8F0]/20 group-hover:text-[#D4AF37] transition-colors">map</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/442079460000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-8 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.744-2.834-2.512-2.92-2.629-.087-.117-.726-.966-.726-1.843 0-.878.446-1.31.623-1.496.174-.186.38-.233.507-.233.127 0 .253.003.364.009.117.005.276-.044.432.319.162.374.551 1.341.599 1.445.048.103.08.223.013.355-.067.133-.101.215-.203.333-.101.117-.211.262-.3.351-.098.1-.2.208-.087.403.114.19.503.826 1.08 1.339.743.662 1.37.868 1.564.965.194.097.306.081.42-.048.114-.129.489-.571.619-.765.131-.194.264-.162.445-.097.181.065 1.144.538 1.341.636.197.098.328.146.375.226.048.081.048.467-.097.873z" />
              </svg>
              <span>Instant Crew Support via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* World Map */}
        <section className="mt-24 relative rounded-2xl overflow-hidden h-[400px] glass-card">
          <div className="absolute inset-0 opacity-30 grayscale">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=60"
              alt="World Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#051324] via-transparent to-[#051324]/20" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-[#081f3a]/80 backdrop-blur px-4 py-2 rounded-full border border-[#b3c8ea]/20">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest">Active Operations: 1,242</span>
              </div>
              <div className="flex items-center gap-2 bg-[#024a89]/80 backdrop-blur px-4 py-2 rounded-full border border-[#a5c8ff]/20">
                <span className="w-2 h-2 rounded-full bg-[#a5c8ff] animate-pulse" />
                <span className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest">Global Support Online</span>
              </div>
            </div>
            <h2 className="font-[var(--font-hanken)] text-[22px] font-semibold text-[#e0e3e5] max-w-lg">
              Our Network Spans the Seven Seas
            </h2>
            <p className="text-[#c4c6ce] mt-4 max-w-md">Strategically located hubs ensuring your fleet never sails alone.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
