import type { Metadata } from "next";
import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";

export const metadata: Metadata = {
  title: "Study Abroad Steps",
  description: "Follow the study abroad journey from profile review and course selection to applications, visa and departure.",
};

const journey = [
  ["01", "Profile review", "We understand your academics, budget, goals, preferred destination and intake."],
  ["02", "Select your programme", "Compare relevant courses and universities, requirements, tuition and application timelines."],
  ["03", "Prepare documents", "Organise academic, identity, language, financial and supporting documents."],
  ["04", "Submit applications", "Complete forms carefully and submit before the relevant institutional deadlines."],
  ["05", "Receive an offer", "Understand conditions, respond on time and complete any outstanding requirements."],
  ["06", "Plan funding", "Review tuition deposits, scholarships, financial evidence and the total study budget."],
  ["07", "Apply for your visa", "Prepare the destination-specific visa file, appointment and supporting documents."],
  ["08", "Prepare to depart", "Plan travel, accommodation, arrival documents and your first weeks abroad."],
];

export default function StepsPage() {
  return (
    <InnerPage>
      <PageHero
        eyebrow="Study abroad steps"
        title="From first question"
        accent="to your first day."
        description="A successful application is easier when every stage is visible. Follow the journey and understand what comes next."
        aside={<div className="journey-progress-card"><strong>8 clear stages</strong><div>{journey.map(([number]) => <span key={number}>{number}</span>)}</div><small>Plan · apply · prepare · depart</small></div>}
      />
      <section className="inner-content-section">
        <SectionIntro eyebrow="Your roadmap" title="A clear process removes unnecessary stress." text="Exact requirements vary by country and institution, but the core journey follows these eight practical stages." />
        <div className="journey-timeline">
          {journey.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div><i aria-hidden="true">↗</i></article>)}
        </div>
      </section>
      <ContactCta title="Start at step one with Polaris." text="Book a free counselling session and receive an initial route based on your profile, destination and intended intake." />
    </InnerPage>
  );
}

