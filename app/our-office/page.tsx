import type { Metadata } from "next";
import EnquiryForm from "../enquiry-form";
import { InnerPage, PageHero, SectionIntro } from "../page-chrome";
import { WHATSAPP_URL } from "../site-data";

export const metadata: Metadata = {
  title: "Our Office in Lahore",
  description: "Contact Polaris Global Education Center at 228C PIA Main Boulevard, Lahore. Get phone, email, WhatsApp, map and directions.",
};

const mapQuery = "228C PIA Main Boulevard, Block C, PIA Housing Scheme, Lahore 54770";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

export default function OurOfficePage() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Polaris Global Education Center",
    email: "contact@polarisoverseasedu.com",
    telephone: ["+92 300 0756932", "+92 341 6934362"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "228C PIA Main Boulevard, Block C, PIA Housing Scheme",
      addressLocality: "Lahore",
      postalCode: "54770",
      addressCountry: "PK",
    },
  };

  return (
    <InnerPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
      <PageHero
        eyebrow="Our office"
        title="Let’s plan your"
        accent="next move together."
        description="Visit our Lahore office, call either contact number or message us on WhatsApp for a free initial counselling conversation."
        aside={<div className="office-hero-card"><span>LAHORE</span><strong>228C PIA Main Boulevard</strong><small>Block C · PIA Housing Scheme · 54770</small><a href={directionsUrl} target="_blank" rel="noreferrer">Open directions ↗</a></div>}
      />

      <section className="inner-content-section office-contact-section">
        <SectionIntro eyebrow="Contact Polaris" title="Choose the easiest way to reach us." text="For an office meeting, message or call before your visit so our team can prepare for your study-abroad questions." />
        <div className="office-contact-grid">
          <a href="tel:+923000756932"><span>CALL 01</span><strong>+92 300 0756932</strong><small>Tap to call the counselling team</small><i aria-hidden="true">↗</i></a>
          <a href="tel:+923416934362"><span>CALL 02</span><strong>+92 341 6934362</strong><small>Alternative contact number</small><i aria-hidden="true">↗</i></a>
          <a href="mailto:contact@polarisoverseasedu.com"><span>EMAIL</span><strong>contact@polarisoverseasedu.com</strong><small>Send your question and contact details</small><i aria-hidden="true">↗</i></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span>WHATSAPP</span><strong>Free counselling</strong><small>Start a conversation on WhatsApp</small><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <section className="office-map-section">
        <div className="office-map-copy">
          <p className="eyebrow"><span /> Find us in Lahore</p>
          <h2>228C PIA Main Boulevard.</h2>
          <address>Block C, PIA Housing Scheme<br />Lahore 54770, Pakistan</address>
          <p>Consultations are available by appointment. Contact the team before visiting to confirm availability.</p>
          <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Get Google Maps directions <span aria-hidden="true">↗</span></a>
        </div>
        <div className="map-frame">
          <iframe src={embedUrl} title="Polaris Global Education Center office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section className="office-enquiry-section">
        <div>
          <p className="eyebrow dark"><span /> Before you visit</p>
          <h2>Tell us what you want to study.</h2>
          <p>Share a few details and continue the conversation directly on WhatsApp. This helps our counsellor understand your goal before your meeting.</p>
        </div>
        <EnquiryForm />
      </section>
    </InnerPage>
  );
}
