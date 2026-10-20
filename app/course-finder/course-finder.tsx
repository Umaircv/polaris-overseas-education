"use client";

import { useState } from "react";
import { countrySlug, destinations, officialCatalogues } from "../site-data";

type View = "live" | "scholarships";

export default function CourseFinder() {
  const [view, setView] = useState<View>("live");

  return (
    <section className="course-finder-app">
      <div className="catalogue-view-tabs" role="tablist" aria-label="Finder content type">
        <button role="tab" aria-selected={view === "live"} onClick={() => setView("live")}>Live catalogues</button>
        <button role="tab" aria-selected={view === "scholarships"} onClick={() => setView("scholarships")}>Scholarships</button>
        <span>Application matching <small>coming soon</small></span>
      </div>

      {view === "live" && (
        <div className="live-catalogue-view">
          <div className="source-confidence">
            <span aria-hidden="true">✓</span>
            <div><strong>Official programme sources only</strong><small>Each Search live catalogue button opens the official national source for that destination.</small></div>
          </div>

          <div className="official-source-header">
            <div><p className="eyebrow dark"><span /> Official programme databases</p><h2>All ten destinations</h2></div>
            <p><strong>Ten countries</strong> · ten official catalogues</p>
          </div>

          <div className="official-source-grid">
            {officialCatalogues.map((source) => <OfficialSourceCard key={source.country} source={source} />)}
          </div>
        </div>
      )}

      {view === "scholarships" && (
        <div className="scholarship-view">
          <div className="scholarship-intro">
            <p className="eyebrow dark"><span /> Scholarship guidance</p>
            <h2>Explore funding routes by destination.</h2>
            <p>Open the Polaris Scholarship Finder to compare major official-source opportunities, deadlines, eligibility and document requirements.</p>
          </div>
          <div className="scholarship-grid scholarship-flag-grid">
            {destinations.map((destination) => (
              <article key={destination.country}>
                <img src={destination.flagImage} alt={`${destination.country} national flag`} />
                <small>{destination.code}</small><h3>{destination.country}</h3><p>Government, university and external funding routes with official-source verification.</p><a href={`/scholarships?country=${encodeURIComponent(destination.country)}`}>Explore scholarships ↗</a>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function OfficialSourceCard({ source }: { source: typeof officialCatalogues[number] }) {
  const message = encodeURIComponent(`Hello Polaris Global Education Center, please help me search programmes in ${source.country}.`);
  return (
    <article className="official-source-card" id={countrySlug(source.country)}>
      <div className="source-card-top"><img src={source.flagImage} alt={`${source.country} national flag`} /><small>OFFICIAL SOURCE</small></div>
      <p>{source.country}</p>
      <h3>{source.source}</h3>
      <strong>{source.stat}</strong>
      <dl><div><dt>Managed by</dt><dd>{source.owner}</dd></div><div><dt>Coverage</dt><dd>{source.coverage}</dd></div></dl>
      <div className="source-card-actions"><a href={source.url} target="_blank" rel="noreferrer">Search live catalogue ↗</a><a href={`https://wa.me/923416934362?text=${message}`} target="_blank" rel="noreferrer">Ask Polaris</a></div>
    </article>
  );
}
