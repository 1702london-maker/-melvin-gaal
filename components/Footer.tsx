import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#051324] relative w-full py-16 border-t border-[#E2E8F0]/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div>
          <h4 className="font-[var(--font-hanken)] text-[22px] font-bold text-[#D4AF37] mb-6">
            Melvin Gaal Ltd
          </h4>
          <p className="text-[#c4c6ce] text-base mb-6 max-w-xs">
            Excellence defined in global maritime recruitment and technical engineering. Serving the world since 1994.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#c4c6ce] hover:text-[#D4AF37] cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-[#c4c6ce] hover:text-[#D4AF37] cursor-pointer transition-colors">mail</span>
            <span className="material-symbols-outlined text-[#c4c6ce] hover:text-[#D4AF37] cursor-pointer transition-colors">call</span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <h5 className="font-[var(--font-jetbrains)] text-[12px] tracking-widest text-white mb-4 uppercase">Services</h5>
          {["Fleet Management", "Crew Services", "Safety & Compliance", "Technical Engineering"].map((s) => (
            <Link key={s} href="/services" className="text-[#c4c6ce] hover:text-[#b3c8ea] text-base hover:translate-x-1 transition-transform inline-block">
              {s}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h5 className="font-[var(--font-jetbrains)] text-[12px] tracking-widest text-white mb-4 uppercase">Legal</h5>
          {["Privacy Policy", "Terms of Service", "Cookie Settings", "Seafarer Handbook"].map((s) => (
            <Link key={s} href="#" className="text-[#c4c6ce] hover:text-[#b3c8ea] text-base hover:translate-x-1 transition-transform inline-block">
              {s}
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="font-[var(--font-jetbrains)] text-[12px] tracking-widest text-white mb-4 uppercase">Newsletter</h5>
          <p className="font-[var(--font-jetbrains)] text-[11px] text-[#c4c6ce] mb-4 tracking-widest uppercase">
            Get industry updates monthly.
          </p>
          <div className="flex border-b border-[#E2E8F0]/20 pb-2">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-white w-full text-base"
            />
            <button className="text-[#D4AF37] ml-2">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <p className="text-[#c4c6ce]/70 text-sm mt-4">
            support@melvingaal.com
          </p>
        </div>
      </div>

      <div className="text-center mt-16 pt-8 border-t border-[#E2E8F0]/5 px-6">
        <p className="text-[#c4c6ce]/50 text-base">
          © {new Date().getFullYear()} Melvin Gaal Ltd. Maritime Excellence Defined.
        </p>
      </div>
    </footer>
  );
}
