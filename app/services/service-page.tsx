import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";

export type ServiceDetail = {
  number: string;
  title: string;
  text: string;
};

export function ServicePage({
  eyebrow,
  title,
  accent,
  description,
  marker,
  promise,
  steps,
  includes,
  note,
  primaryHref,
  primaryLabel,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  marker: string;
  promise: string;
  steps: ServiceDetail[];
  includes: string[];
  note: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <InnerPage>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        description={description}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        aside={<div className="hero-service-marker"><span>{marker}</span><strong>{promise}</strong><small>Personal · clear · student-focused</small></div>}
      />

      <section className="inner-content-section">
        <SectionIntro
          eyebrow="What you receive"
          title="Support built around your next decision."
          text="No two applications are identical. We explain what matters for your route, organise the work into clear stages and keep you informed throughout."
        />
        <div className="feature-step-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-includes-section">
        <div>
          <p className="eyebrow"><span /> Included support</p>
          <h2>A complete, organised experience.</h2>
          <p>{note}</p>
        </div>
        <ul>
          {includes.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<i aria-hidden="true">✓</i></li>)}
        </ul>
      </section>
      <ContactCta />
    </InnerPage>
  );
}
