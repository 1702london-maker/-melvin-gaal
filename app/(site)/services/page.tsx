import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Technical",
  description:
    "Ship repair, marine engineering, technical consultancy, and port support services. Precision-led maritime solutions for the world's most sophisticated fleets.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
