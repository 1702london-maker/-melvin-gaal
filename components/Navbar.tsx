"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Fleet", href: "/" },
  { label: "Personnel", href: "/recruitment" },
  { label: "Services", href: "/services" },
  { label: "Support", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/[0.08] backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#D4AF37]/50 shadow-[0_40px_40px_-15px_rgba(5,19,36,0.4)]">
      <div className="flex justify-between items-center px-6 md:px-12 h-20 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[#D4AF37] text-[28px]">anchor</span>
          <span className="text-[#b3c8ea] font-[var(--font-hanken)] text-[22px] font-bold tracking-tight">
            Melvin Gaal Ltd
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[var(--font-jetbrains)] text-[12px] tracking-[0.1em] uppercase transition-colors h-20 flex items-center border-b-2 ${
                  active
                    ? "text-[#D4AF37] border-[#D4AF37] font-bold"
                    : "text-[#c4c6ce] border-transparent hover:text-[#b3c8ea]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:block font-[var(--font-jetbrains)] text-[12px] bg-[#D4AF37] text-[#051324] px-6 py-2 rounded-full hover:scale-[1.02] active:scale-95 transition-transform tracking-widest uppercase sheen-effect"
          >
            Request a Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#e0e3e5] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#101415]/95 backdrop-blur-xl border-t border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-jetbrains)] text-[12px] tracking-widest uppercase text-[#c4c6ce] hover:text-[#D4AF37] transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 font-[var(--font-jetbrains)] text-[12px] bg-[#D4AF37] text-[#051324] px-6 py-3 rounded-full text-center tracking-widest uppercase"
          >
            Request a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
