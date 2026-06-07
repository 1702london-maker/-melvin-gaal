import type { Metadata } from "next";
import RecruitmentClient from "./RecruitmentClient";

export const metadata: Metadata = {
  title: "Crew Recruitment Portal",
  description:
    "Join Melvin Gaal Ltd — register as a seafarer, view active vacancies, and connect with premium maritime roles worldwide.",
};

export default function RecruitmentPage() {
  return <RecruitmentClient />;
}
