import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Melvin Gaal Ltd | Global Maritime Solutions",
    template: "%s | Melvin Gaal Ltd",
  },
  description:
    "World-class ship repair, marine engineering, crew recruitment, and maritime support services across international waters. Based in London, UK.",
  keywords: [
    "maritime recruitment",
    "crew management",
    "ship repair",
    "marine engineering",
    "seafarer jobs",
    "maritime security",
    "offshore personnel",
    "vessel inspection",
  ],
  openGraph: {
    title: "Melvin Gaal Ltd | Global Maritime Solutions",
    description:
      "Providing world-class maritime services including crew recruitment, ship repair, marine engineering, and technical consultancy.",
    type: "website",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#101415] text-[#e0e3e5] font-[var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
