"use client";

import { useEffect, useMemo, useState } from "react";
import { courses, destinations, type Course } from "../site-data";

type View = "live" | "shortlist" | "scholarships";

const officialCatalogues = [
  {
    country: "Italy",
    flagImage: "/polaris/flags/it.png",
    source: "Universitaly",
    owner: "Italian Ministry of University and Research",
    coverage: "National universities, institutions and degree programmes",
    stat: "Official national catalogue",
    url: "/italy-course-finder",
  },
  {
    country: "France",
    flagImage: "/polaris/flags/fr.png",
    source: "Campus France",
    owner: "France's national higher-education agency",
    coverage: "English-taught programmes across French institutions",
    stat: "1,200+ English-taught programmes",
    url: "https://taughtie.campusfrance.org/tiesearch/index.html",
  },
  {
    country: "Germany",
    flagImage: "/polaris/flags/de.png",
    source: "DAAD",
    owner: "German Academic Exchange Service",
    coverage: "Bachelor's, Master's, doctoral and international programmes",
    stat: "21,000+ degree programmes",
    url: "https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/",
  },
  {
    country: "Türkiye",
    flagImage: "/polaris/flags/tr.png",
    source: "Study in Türkiye",
    owner: "Council of Higher Education programme finder",
    coverage: "Associate, Bachelor's, Master's and doctoral programmes",
    stat: "9,000+ programme results",
    url: "https://www.studyinturkiye.gov.tr/StudySearch/List",
  },
  {
    country: "China",
    flagImage: "/polaris/flags/cn.png",
    source: "Study in China",
    owner: "Official international education portal",
    coverage: "Degree, non-degree and scholarship programme routes",
    stat: "Official national search",
    url: "https://www.studyinchina.edu.cn/",
  },
];

const countries = ["Italy", "France", "Germany", "Türkiye", "China"];
const levels = ["Bachelor's", "Master's", "PhD", "Foundation"];
const disciplines = ["Computer & IT", "Business & Management", "Engineering & Technology", "Health & Medicine", "Arts & Humanities"];

export default function CourseFinder() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [intake, setIntake] = useState("");
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<View>("live");
  const [compare, setCompare] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCountry(params.get("country") || "");
    setLevel(params.get("level") || "");
    setDiscipline(params.get("discipline") || "");
    const requestedView = params.get("view");
    if (requestedView === "scholarships") setView("scholarships");
    if (requestedView === "shortlist") setView("shortlist");
  }, []);

  const filteredSources = useMemo(() => {
    const term = query.trim().toLowerCase();
    return officialCatalogues.filter((source) => {
      const matchesCountry = !country || source.country === country;
      const matchesText = !term || `${source.country} ${source.source} ${source.owner} ${source.coverage}`.toLowerCase().includes(term);
      return matchesCountry && matchesText;
    });
  }, [country, query]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = courses.filter((course) => {
      const matchesText = !term || `${course.title} ${course.university} ${course.city} ${course.country}`.toLowerCase().includes(term);
      return matchesText && (!country || course.country === country) && (!level || course.level === level) && (!discipline || course.discipline === discipline) && (!intake || course.intake === intake);
    });
    return [...result].sort((a, b) => {
      if (sort === "university") return a.university.localeCompare(b.university);
      if (sort === "country") return a.country.localeCompare(b.country);
      if (sort === "duration") return Number.parseInt(a.duration) - Number.parseInt(b.duration);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [query, country, level, discipline, intake, sort]);

  const comparedCourses = compare.map((id) => courses.find((course) => course.id === id)).filter(Boolean) as Course[];
  const focus = [level, discipline].filter(Boolean).join(" · ") || "All study levels and subjects";

  function toggleCompare(id: number) {
    setShowComparison(false);
    setCompare((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  }

  function resetFilters() {
    setQuery("");
    setCountry("");
    setLevel("");
    setDiscipline("");
    setIntake("");
    setSort("recommended");
    window.history.replaceState({}, "", "/course-finder");
  }

  return (
    <section className="course-finder-app">
      <div className="catalogue-view-tabs" role="tablist" aria-label="Finder content type">
        <button role="tab" aria-selected={view === "live"} onClick={() => setView("live")}>Live catalogues</button>
        <button role="tab" aria-selected={view === "shortlist"} onClick={() => setView("shortlist")}>Polaris shortlists</button>
        <button role="tab" aria-selected={view === "scholarships"} onClick={() => setView("scholarships")}>Scholarships</button>
        <span>Application matching <small>coming soon</small></span>
      </div>

      {view !== "scholarships" && (
        <div className="catalogue-searchbar">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={view === "live" ? "Search country or official catalogue" : "Search course, university, city or country"} aria-label="Search course finder" />
          <button type="button">⌕ Search</button>
        </div>
      )}

      {view === "live" && (
        <div className="live-catalogue-view">
          <div className="live-filter-panel">
            <Filter label="Destination" value={country} onChange={setCountry} options={countries} />
            <Filter label="Qualification" value={level} onChange={setLevel} options={levels} />
            <Filter label="Discipline" value={discipline} onChange={setDiscipline} options={disciplines} />
            <button type="button" onClick={resetFilters}>Reset search</button>
          </div>

          <div className="source-confidence">
            <span aria-hidden="true">✓</span>
            <div><strong>Live information from authoritative catalogues</strong><small>Programmes, deadlines and requirements can change. Final details open on the official national source for verification.</small></div>
          </div>

          <div className="official-source-header">
            <div><p className="eyebrow dark"><span /> Official programme databases</p><h2>{country ? `Explore ${country}` : "All five destinations"}</h2></div>
            <p>Your focus: <strong>{focus}</strong></p>
          </div>

          {filteredSources.length ? (
            <div className="official-source-grid">
              {filteredSources.map((source) => <OfficialSourceCard key={source.country} source={source} level={level} discipline={discipline} />)}
            </div>
          ) : <NoResults onReset={resetFilters} />}

          <div className="catalogue-partner-note">
            <div><span aria-hidden="true">✦</span><div><strong>Need one shortlist instead of five databases?</strong><p>Send your qualification, subject and budget. Polaris will verify suitable programmes and return a focused shortlist.</p></div></div>
            <a href={`https://wa.me/923416934362?text=${encodeURIComponent(`Hello Polaris Global Education Center, please prepare a verified programme shortlist. My preference is ${country || "any destination"}, ${level || "any level"}, ${discipline || "any subject"}.`)}`} target="_blank" rel="noreferrer">Request verified shortlist ↗</a>
          </div>
        </div>
      )}

      {view === "shortlist" && (
        <div className="catalogue-layout">
          <aside className="catalogue-filters">
            <h2>Refine shortlist</h2>
            <Filter label="Destination" value={country} onChange={setCountry} options={countries} />
            <Filter label="Qualification" value={level} onChange={setLevel} options={levels} />
            <Filter label="Discipline" value={discipline} onChange={setDiscipline} options={disciplines} />
            <Filter label="Intake" value={intake} onChange={setIntake} options={["September", "October", "January"]} />
            <button type="button" onClick={resetFilters}>Reset all filters</button>
          </aside>

          <div className="catalogue-results">
            <div className="shortlist-disclaimer"><span>POLARIS SHORTLIST</span><p>Curated starting points, reviewed August 2026. Confirm current intake, fees and eligibility before applying.</p></div>
            <div className="catalogue-results-header">
              <p><strong>{filtered.length}</strong> programme examples found</p>
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort results">
                <option value="recommended">Recommended</option>
                <option value="university">University A–Z</option>
                <option value="country">Country A–Z</option>
                <option value="duration">Shortest duration</option>
              </select>
            </div>

            {filtered.length ? <div className="course-list">{filtered.map((course) => <CourseCard key={course.id} course={course} selected={compare.includes(course.id)} onCompare={toggleCompare} />)}</div> : <NoResults onReset={resetFilters} />}

            {showComparison && comparedCourses.length > 1 && (
              <div className="comparison-panel">
                <h2>Programme comparison</h2>
                <div className="comparison-grid">
                  {comparedCourses.map((course) => <article key={course.id}><small>{course.university}</small><h3>{course.title}</h3><p>{course.country} · {course.city}</p><p>{course.level} · {course.duration}</p><p>{course.language} · {course.intake} intake</p></article>)}
                </div>
              </div>
            )}
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
            {destinations.map((destination) => {
              return (
                <article key={destination.country}>
                  <img src={destination.flagImage} alt={`${destination.country} national flag`} />
                  <small>{destination.code}</small><h3>{destination.country}</h3><p>Government, university and external funding routes with official-source verification.</p><a href={`/scholarships?country=${encodeURIComponent(destination.country)}`}>Explore scholarships ↗</a>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {view === "shortlist" && compare.length > 0 && (
        <div className="compare-bar"><p><strong>{compare.length}</strong> of 3 programmes selected</p><div><button type="button" onClick={() => { setCompare([]); setShowComparison(false); }}>Clear</button><button type="button" disabled={compare.length < 2} onClick={() => setShowComparison(true)}>Compare programmes</button></div></div>
      )}
    </section>
  );
}

function OfficialSourceCard({ source, level, discipline }: { source: typeof officialCatalogues[number]; level: string; discipline: string }) {
  const message = encodeURIComponent(`Hello Polaris Global Education Center, please help me search ${source.country}. I am interested in ${level || "any level"}, ${discipline || "any subject"}.`);
  return (
    <article className="official-source-card">
      <div className="source-card-top"><img src={source.flagImage} alt={`${source.country} national flag`} /><small>OFFICIAL SOURCE</small></div>
      <p>{source.country}</p>
      <h3>{source.source}</h3>
      <strong>{source.stat}</strong>
      <dl><div><dt>Managed by</dt><dd>{source.owner}</dd></div><div><dt>Coverage</dt><dd>{source.coverage}</dd></div></dl>
      <div className="source-card-actions"><a href={source.url} target="_blank" rel="noreferrer">Search live catalogue ↗</a><a href={`https://wa.me/923416934362?text=${message}`} target="_blank" rel="noreferrer">Ask Polaris</a></div>
    </article>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <div className="filter-group"><label>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">All</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}

function CourseCard({ course, selected, onCompare }: { course: Course; selected: boolean; onCompare: (id: number) => void }) {
  const message = encodeURIComponent(`Hello Polaris Global Education Center, please verify current details and my eligibility for ${course.title} at ${course.university}, ${course.country}.`);
  return (
    <article className="course-card">
      <div>
        <div className="course-card-top"><span className="country-chip">{course.country}</span>{course.featured && <span className="featured-chip">Polaris pick</span>}</div>
        <h3>{course.title}</h3><p className="course-university">{course.university} · {course.city}</p>
        <div className="course-meta"><span>{course.level}</span><span>{course.duration}</span><span>{course.mode}</span><span>{course.language}</span><span>{course.intake} intake</span></div>
      </div>
      <div className="course-actions"><button type="button" aria-pressed={selected} onClick={() => onCompare(course.id)}>{selected ? "Added to compare" : "Add to compare"}</button><a href={`https://wa.me/923416934362?text=${message}`} target="_blank" rel="noreferrer">Verify & check eligibility ↗</a></div>
    </article>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return <div className="no-results"><h3>No matching results.</h3><p>Try widening your filters or ask a Polaris counsellor for a personalised search.</p><button className="button button-dark" type="button" onClick={onReset}>Reset filters</button></div>;
}
