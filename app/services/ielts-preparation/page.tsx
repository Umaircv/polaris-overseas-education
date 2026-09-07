import type { Metadata } from "next";
import { ServicePage } from "../service-page";

export const metadata: Metadata = {
  title: "IELTS Preparation",
  description: "IELTS preparation, English language and spoken English training with a free demo class at Polaris Global Education Center.",
};

export default function IeltsPage() {
  return (
    <ServicePage
      eyebrow="IELTS & language preparation"
      title="Prepare with purpose."
      accent="Speak with confidence."
      description="Build the skills and test strategy you need through focused IELTS preparation, English language support and guided practice."
      marker="IELTS"
      promise="Focused preparation and feedback"
      primaryHref="/book-ielts-demo"
      primaryLabel="Book free IELTS demo"
      steps={[
        { number: "01", title: "Diagnostic assessment", text: "We identify your current level, target band and the skills that need the most attention." },
        { number: "02", title: "Personal study plan", text: "Your preparation covers listening, reading, writing and speaking with realistic milestones." },
        { number: "03", title: "Practice & feedback", text: "Regular exercises, speaking practice and writing feedback turn weak areas into progress." },
        { number: "04", title: "Test readiness", text: "Timed practice and practical test-day guidance help you approach the exam confidently." },
      ]}
      includes={[
        "Free initial demo class",
        "Four-module IELTS preparation",
        "Speaking and pronunciation practice",
        "Writing task feedback",
        "Mock tests and progress checks",
        "English and spoken-English support",
      ]}
      note="The right preparation plan depends on your current English level, target score and intended application timeline. Start with a free demo class before enrolling."
    />
  );
}
