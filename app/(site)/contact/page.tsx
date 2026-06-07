import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "24/7 global maritime support. Emergency hotline, service requests, and office locations in London, Singapore, and Dubai.",
};

export default function ContactPage() {
  return <ContactClient />;
}
