import type { Metadata } from "next";
import { ServicePage } from "../service-page";

export const metadata: Metadata = {
  title: "Study Abroad Counselling",
  description: "Personalised overseas education counselling, university selection, application and student visa support from Polaris Overseas Education.",
};

export default function StudyAbroadPage() {
  return (
    <ServicePage
      eyebrow="Study abroad counselling"
      title="Your global education plan,"
      accent="made clear."
      description="From choosing the right destination to preparing for departure, Polaris helps you make informed decisions at every stage of your international education journey."
      marker="360°"
      promise="End-to-end study abroad guidance"
      steps={[
        { number: "01", title: "Profile assessment", text: "We review your academics, study goals, budget, preferred intake and career direction." },
        { number: "02", title: "Course & university shortlist", text: "You receive relevant options with clear reasoning—not a random list of institutions." },
        { number: "03", title: "Application preparation", text: "We guide forms, documents, statements, deadlines and institution-specific requirements." },
        { number: "04", title: "Offer to departure", text: "Support continues through offer conditions, visa preparation and pre-departure planning." },
      ]}
      includes={[
        "One-to-one academic and destination counselling",
        "Course and university comparison",
        "Application forms and document checklist",
        "Statement and supporting-document guidance",
        "Student visa documentation assistance",
        "Accommodation and pre-departure guidance",
      ]}
      note="We coordinate the moving parts while keeping the final choices with you. Admission and visa decisions always remain with the relevant institutions and authorities."
    />
  );
}

