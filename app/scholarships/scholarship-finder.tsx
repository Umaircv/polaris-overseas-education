"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { scholarshipCountries, scholarships, type Scholarship } from "./scholarship-data";

const levels = ["Associate", "Bachelor's", "Master's", "PhD", "Research", "Language"];
const fundingTypes = ["Fully funded", "Tuition + stipend", "Tuition waiver", "Needs-based"];

export default function ScholarshipFinder() {
  const [country, setCountry] = useState("");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [funding, setFunding] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("deadline");

  useEffect(() => {
    const requestedCountry = new URLSearchParams(window.location.search).get("country");
    if (requestedCountry && scholarshipCountries.some((item) => item.name === requestedCountry)) setCountry(requestedCountry);
  }, []);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = scholarships.filter((item) => {
      const matchesSearch = !search || [item.name, item.provider, item.country, item.summary, ...item.levels]
        .join(" ")
        .toLowerCase()
        .includes(search);
      return matchesSearch
        && (!country || item.country === country)
        && (!level || item.levels.includes(level))
        && (!funding || item.fundingType === funding)
        && (!status || item.status === status);
    });

    return filtered.sort((a, b) => {
      if (sort === "country") return a.country.localeCompare(b.country) || a.name.localeCompare(b.name);
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "status") return statusWeight(a.status) - statusWeight(b.status) || deadlineWeight(a) - deadlineWeight(b);
      return deadlineWeight(a) - deadlineWeight(b) || statusWeight(a.status) - statusWeight(b.status);
    });
  }, [country, funding, level, query, sort, status]);

  const reset = () => {
    setCountry("");
    setQuery("");
    setLevel("");
    setFunding("");
    setStatus("");
    setSort("deadline");
  };

  return (
    <section className="scholarship-finder-shell" id="scholarship-results" aria-labelledby="scholarship-finder-title">
      <div className="scholarship-finder-heading">
        <div>
          <p className="eyebrow dark"><span /> Official-source finder</p>
          <h2 id="scholarship-finder-title">Find your scholarship route.</h2>
          <p>Filter major current and upcoming opportunities. Open any card for eligibility, documents, benefits and application steps.</p>
        </div>
        <div className="scholarship-verified-mark"><span aria-hidden="true">✓</span><div><strong>Source checked</strong><small>23 August 2026</small></div></div>
      </div>

      <div className="scholarship-country-filter" aria-label="Filter scholarships by country">
        <button className={!country ? "is-active" : ""} type="button" onClick={() => setCountry("")} aria-pressed={!country}>
          <span className="country-orbit" aria-hidden="true">✦</span><strong>All countries</strong><small>{scholarships.length} opportunities</small>
        </button>
        {scholarshipCountries.map((item) => {
          const count = scholarships.filter((scholarship) => scholarship.country === item.name).length;
          return (
            <button className={country === item.name ? "is-active" : ""} type="button" key={item.name} onClick={() => setCountry(item.name)} aria-pressed={country === item.name}>
              <img src={item.flag} alt={`${item.name} national flag`} /><strong>{item.name}</strong><small>{count} opportunities</small>
            </button>
          );
        })}
      </div>

      <div className="scholarship-controls">
        <label className="scholarship-search-field">
          <span>Search scholarship or provider</span>
          <span className="scholarship-input-wrap"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. DAAD, Eiffel, Master's" /></span>
        </label>
        <ScholarshipSelect label="Study level" value={level} onChange={setLevel} options={levels} />
        <ScholarshipSelect label="Funding" value={funding} onChange={setFunding} options={fundingTypes} />
        <ScholarshipSelect label="Application status" value={status} onChange={setStatus} options={["Open", "Closing soon", "Coming soon"]} />
        <button className="scholarship-reset" type="button" onClick={reset}>Reset all</button>
      </div>

      <div className="scholarship-results-toolbar">
        <div><span>{results.length}</span><p><strong>{country || "Five countries"}</strong><small>current and upcoming records</small></p></div>
        <label>Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="deadline">Earliest deadline</option><option value="status">Application status</option><option value="country">Country A–Z</option><option value="name">Scholarship A–Z</option></select></label>
      </div>

      {results.length ? (
        <div className="scholarship-results-grid">
          {results.map((item) => <ScholarshipCard item={item} key={item.id} />)}
        </div>
      ) : (
        <div className="scholarship-empty-state"><span aria-hidden="true">✦</span><h3>No exact match found.</h3><p>Widen one filter or reset the search. A Polaris counsellor can also check institution-specific funding for your profile.</p><button type="button" onClick={reset}>Reset filters</button></div>
      )}

      <div className="scholarship-source-note">
        <div><ShieldIcon /><p><strong>Accuracy before applications.</strong><span>Dates, benefits and criteria can change without notice. This portal links to the scholarship owner—not a copied application form. Always complete a final check on the official source.</span></p></div>
        <a href="https://wa.me/923416934362?text=Hello%20Polaris%20Overseas%20Education%2C%20please%20help%20me%20build%20a%20verified%20scholarship%20shortlist." target="_blank" rel="noreferrer">Request a verified shortlist <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function ScholarshipCard({ item }: { item: Scholarship }) {
  const message = encodeURIComponent(`Hello Polaris Overseas Education, please check my eligibility for ${item.name} in ${item.country}.`);
  return (
    <article className="scholarship-card">
      <div className="scholarship-card-head">
        <div className="scholarship-country-name"><img src={item.flag} alt={`${item.country} national flag`} /><span><small>{item.country}</small><strong>{item.provider}</strong></span></div>
        <span className={`scholarship-status status-${item.status.toLowerCase().replaceAll(" ", "-")}`}><i aria-hidden="true" />{item.status}</span>
      </div>
      <div className="scholarship-card-copy">
        <p>{item.intake}</p>
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
      </div>
      <div className="scholarship-tags"><span>{item.fundingType}</span>{item.levels.map((itemLevel) => <span key={itemLevel}>{itemLevel}</span>)}</div>
      <div className="scholarship-deadline"><CalendarIcon /><div><small>Application deadline</small><strong>{item.deadlineLabel}</strong></div></div>

      <details className="scholarship-details">
        <summary><span>View full scholarship details</span><i aria-hidden="true">+</i></summary>
        <div className="scholarship-detail-grid">
          <DetailList icon={<EligibilityIcon />} title="Eligibility" items={item.eligibility} />
          <DetailList icon={<DocumentIcon />} title="Required documents" items={item.documents} />
          <DetailList icon={<BenefitIcon />} title="What it can cover" items={item.benefits} />
        </div>
        <div className="scholarship-steps">
          <h4>How to apply</h4>
          <ol>{item.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        </div>
        {item.note ? <p className="scholarship-card-note"><strong>Important:</strong> {item.note}</p> : null}
      </details>

      <div className="scholarship-card-actions">
        <a className="scholarship-official-link" href={item.officialUrl} target="_blank" rel="noreferrer"><span><small>Official source</small><strong>{item.sourceLabel}</strong></span><i aria-hidden="true">↗</i></a>
        <a className="scholarship-check-link" href={`https://wa.me/923416934362?text=${message}`} target="_blank" rel="noreferrer">Check my eligibility <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

function DetailList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return <section><div>{icon}<h4>{title}</h4></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function ScholarshipSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">All {label.toLowerCase()}</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
}

function statusWeight(status: Scholarship["status"]) {
  return status === "Closing soon" ? 0 : status === "Open" ? 1 : 2;
}

function deadlineWeight(item: Scholarship) {
  return item.deadlineISO ? new Date(`${item.deadlineISO}T12:00:00Z`).getTime() : Number.MAX_SAFE_INTEGER;
}

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>; }
function CalendarIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 2v6M16 2v6M3 10h18" /></svg>; }
function ShieldIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5.1-3.3 8.9-8 11-4.7-2.1-8-5.9-8-11V5l8-3Z" /><path d="m8.5 12 2.2 2.2 4.9-5" /></svg>; }
function EligibilityIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="7" r="4" /><path d="M2 21c.6-5 3-7 7-7 2.2 0 3.9.6 5.1 1.8M16 11l2 2 4-5" /></svg>; }
function DocumentIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></svg>; }
function BenefitIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h16v12H4zM2 6h20v4H2zM12 6v15M7.2 6C5 6 4 4.8 4.5 3.4 5.2 1.5 8.8 3.2 12 6M16.8 6c2.2 0 3.2-1.2 2.7-2.6C18.8 1.5 15.2 3.2 12 6" /></svg>; }
