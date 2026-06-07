import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "Melvin Gaal Ltd | Global Maritime Solutions" },
  description:
    "World-class ship repair, marine engineering, crew recruitment, and maritime support services. Trusted worldwide.",
};

export default function HomePage() {
  return <HomeClient />;
}
