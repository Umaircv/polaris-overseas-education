import type { Metadata } from "next";
import { ServicePage } from "../service-page";

export const metadata: Metadata = {
  title: "Scholarship Guidance",
  description: "Scholarship search, eligibility review and application guidance for students applying to Italy, France, Germany, Türkiye and China.",
};

export default function ScholarshipsPage() {
  return (
    <ServicePage
      eyebrow="Scholarship guidance"
      title="Turn funding options into"
      accent="a practical plan."
      description="We help you understand university, government and external scholarship routes, identify relevant opportunities and prepare a complete, accurate application."
      marker="FUND"
      promise="Profile-matched scholarship guidance"
      steps={[
        { number: "01", title: "Eligibility review", text: "We compare your academics, nationality, programme and financial profile with published criteria." },
        { number: "02", title: "Funding shortlist", text: "We organise suitable university, regional, government and external opportunities." },
        { number: "03", title: "Document planning", text: "You receive a clear checklist for academic, financial and supporting documentation." },
        { number: "04", title: "Application support", text: "We help you prepare forms, statements and timelines before each submission deadline." },
      ]}
      includes={[
        "Scholarship opportunity mapping",
        "Eligibility and deadline verification",
        "Financial-document checklist",
        "Motivation letter and statement guidance",
        "Application review before submission",
        "Post-award next-step guidance",
      ]}
      note="Scholarships are competitive and subject to each provider's rules. We provide careful guidance and realistic expectations; no scholarship can be guaranteed."
    />
  );
}

