import type { Metadata } from "next";
import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";

export const metadata: Metadata = {
  title: "Student Services",
  description: "Explore Polaris study abroad counselling, scholarship guidance and IELTS preparation services.",
};

const serviceRoutes = [
  { number: "01", title: "Study Abroad", text: "Profile-led counselling, course selection, applications, visa assistance and pre-departure support.", href: "/services/study-abroad", action: "Explore study abroad" },
  { number: "02", title: "Scholarships", text: "Eligibility review, funding shortlists, document planning and scholarship application guidance.", href: "/services/scholarships", action: "Explore scholarships" },
  { number: "03", title: "IELTS Preparation", text: "Focused language training, mock practice, feedback and a free IELTS demo class.", href: "/services/ielts-preparation", action: "Explore IELTS" },
];

export default function ServicesPage() {
  return (
    <InnerPage>
      <PageHero
        eyebrow="Our services"
        title="One team."
        accent="Every important step."
        description="Choose the support you need today, with a clear route to everything that comes next."
        aside={<div className="hero-service-marker"><span>3</span><strong>Focused service routes</strong><small>Admissions · funding · language</small></div>}
      />
      <section className="inner-content-section">
        <SectionIntro eyebrow="Choose your route" title="Support designed around the student journey." text="Each service has its own dedicated page, details and next steps—so you can quickly find the guidance you need." />
        <div className="route-card-grid">
          {serviceRoutes.map((service) => (
            <a href={service.href} key={service.title}>
              <span>{service.number}</span>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <strong>{service.action} <i aria-hidden="true">↗</i></strong>
            </a>
          ))}
        </div>
      </section>
      <ContactCta />
    </InnerPage>
  );
}

