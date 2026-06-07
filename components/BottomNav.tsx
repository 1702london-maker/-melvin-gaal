"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Fleet", href: "/", icon: "directions_boat" },
  { label: "Personnel", href: "/recruitment", icon: "groups" },
  { label: "Services", href: "/services", icon: "precision_manufacturing" },
  { label: "Support", href: "/contact", icon: "support_agent" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/[0.08] backdrop-blur-xl rounded-full px-6 py-3 border border-[#E2E8F0]/20 shadow-2xl z-50 flex justify-around items-center">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all ${
              active ? "text-[#D4AF37] scale-110" : "text-[#c4c6ce]/70 hover:text-[#b3c8ea]"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="font-[var(--font-jetbrains)] text-[8px] uppercase mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
