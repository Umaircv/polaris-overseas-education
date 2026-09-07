import type { Metadata } from "next";
import { InnerPage } from "../page-chrome";
import ScholarshipFinder from "./scholarship-finder";
import { scholarships } from "./scholarship-data";

export const metadata: Metadata = {
  title: "Scholarship Finder",
  description: "Find official-source scholarships for Italy, France, Germany, Türkiye and China. Filter deadlines, funding, study level, eligibility and required documents.",
};

export default function ScholarshipsPortalPage() {
  const openCount = scholarships.filter((item) => item.status === "Open" || item.status === "Closing soon").length;
  return (
    <InnerPage>
      <section className="scholarship-portal-hero">
        <div className="scholarship-hero-stars" aria-hidden="true" />
        <div className="scholarship-hero-copy">
          <p className="eyebrow"><span /> Polaris scholarship finder</p>
          <h1>Funding clarity.<br /><em>One verified route.</em></h1>
          <p>Explore major scholarships for five destinations—then compare eligibility, deadlines, required documents and application steps without jumping between unreliable listings.</p>
          <div className="scholarship-hero-actions"><a href="#scholarship-results">Explore scholarships <span aria-hidden="true">↓</span></a><a href="https://wa.me/923416934362?text=Hello%20Polaris%20Global%20Education%20Center%2C%20please%20check%20my%20scholarship%20profile." target="_blank" rel="noreferrer">Free profile check <span aria-hidden="true">↗</span></a></div>
          <div className="scholarship-hero-proof"><span><b>{scholarships.length}</b> curated opportunities</span><span><b>5</b> study destinations</span><span><b>Official</b> source links</span></div>
        </div>
        <aside className="scholarship-hero-board" aria-label="Scholarship finder summary">
          <div className="scholarship-board-orbit" aria-hidden="true"><span>✦</span><i /><i /><i /></div>
          <p>Live opportunity radar</p>
          <strong>{openCount}</strong>
          <h2>Open or closing soon</h2>
          <div>{["IT", "FR", "DE", "TR", "CN"].map((code) => <span key={code}>{code}</span>)}</div>
          <small>Data review: 23 August 2026</small>
        </aside>
      </section>

      <ScholarshipFinder />

      <section className="scholarship-method-section">
        <div><p className="eyebrow dark"><span /> How to use this portal</p><h2>Shortlist here.<br />Confirm at the source.</h2></div>
        <div className="scholarship-method-grid">
          <article><span>01</span><h3>Filter your profile</h3><p>Choose destination, qualification, funding and current application status.</p></article>
          <article><span>02</span><h3>Check the complete file</h3><p>Open the card to review eligibility, documents, benefits and application route.</p></article>
          <article><span>03</span><h3>Verify before submission</h3><p>Use the official-source link and let Polaris check your fit before you apply.</p></article>
        </div>
      </section>
    </InnerPage>
  );
}
