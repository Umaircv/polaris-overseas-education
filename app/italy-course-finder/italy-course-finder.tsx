"use client";

import { useEffect, useMemo, useState } from "react";

type Course = {
  id: number;
  academicYear: string;
  title: string;
  titleIt: string;
  universityId: number;
  university: string;
  universityUrl: string;
  institutionType: "State" | "Non-state" | "Unclassified";
  region: string;
  city: string;
  province: string;
  disciplineCode: string;
  discipline: string;
  degreeTypeId: number | null;
  qualification: string;
  degreeClassId: number | null;
  degreeClassCode: string;
  degreeClass: string;
  durationYears: number | null;
  language: string;
  accessType: string;
  deliveryMode: string;
  interUniversity: boolean;
  programmeUrl: string;
  lastSourceUpdate: string | null;
};

type Metadata = {
  source: string;
  sourceUrl: string;
  institutionClassificationSource: string;
  institutionClassificationUrl: string;
  generatedAt: string;
  academicYears: string[];
  totalCourses: number;
  totalInstitutions: number;
};

type Dataset = { metadata: Metadata; courses: Course[] };
type DatasetIndex = { metadata: Metadata; parts: string[] };
type Sort = "relevance" | "course" | "university" | "city";

const PAGE_SIZE = 20;
const sourceUrl = "https://www.universitaly.it/en/cerca-corsi";
const counsellingUrl = "https://wa.me/923416934362?text=Hello%20Polaris%20Global%20Education%20Center%2C%20I%20would%20like%20help%20shortlisting%20universities%20and%20courses%20in%20Italy.";

function readableQualification(course: Course) {
  if (course.durationYears === 3) return "Bachelor's / first cycle";
  if (course.durationYears === 2) return "Master's / second cycle";
  if (course.durationYears === 5 || course.durationYears === 6) return "Single-cycle degree";
  return course.qualification || "Other qualification";
}

function readableAccess(value: string) {
  if (/libero|diploma|open/i.test(value)) return "Open access";
  if (/test/i.test(value)) return "Entry test";
  if (/program|limited/i.test(value)) return "Limited enrolment";
  return value || "Check requirements";
}

function readableDelivery(value: string) {
  if (/conventional|presenza|in person/i.test(value)) return "In person";
  if (/mixed|mista/i.test(value)) return "Mixed";
  if (/prevalent|mostly/i.test(value)) return "Mostly online";
  if (/distance|distanza|remote/i.test(value)) return "Online";
  return value || "Delivery not listed";
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

async function fetchCoursePart(part: string) {
  const response = await fetch(part);
  if (!response.ok) throw new Error("Catalogue part unavailable");
  if (!part.endsWith(".gz")) return response.json() as Promise<Course[]>;
  if (!response.body || typeof DecompressionStream === "undefined") {
    throw new Error("Compressed catalogue is not supported by this browser");
  }
  const stream = response.body.pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text()) as Course[];
}

export default function ItalyCourseFinder() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [qualification, setQualification] = useState("");
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [university, setUniversity] = useState("");
  const [access, setAccess] = useState("");
  const [delivery, setDelivery] = useState("");
  const [degreeClass, setDegreeClass] = useState("");
  const [sort, setSort] = useState<Sort>("relevance");
  const [page, setPage] = useState(1);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/data/italy-courses-index.json")
      .then((response) => {
        if (!response.ok) throw new Error("Catalogue index unavailable");
        return response.json();
      })
      .then(async (index: DatasetIndex) => {
        const parts = await Promise.all(index.parts.map(fetchCoursePart));
        if (active) setDataset({ metadata: index.metadata, courses: parts.flat() });
      })
      .catch(() => fetch("/data/italy-courses.json")
        .then((response) => {
          if (!response.ok) throw new Error("Catalogue unavailable");
          return response.json();
        })
        .then((payload: Dataset) => active && setDataset(payload))
        .catch(() => active && setLoadError(true)));
    return () => { active = false; };
  }, []);

  const options = useMemo(() => {
    const courses = dataset?.courses ?? [];
    return {
      disciplines: unique(courses.map((course) => course.discipline)),
      cities: unique(courses.map((course) => course.city)),
      regions: unique(courses.map((course) => course.region)),
      universities: unique(courses.map((course) => course.university)),
      degreeClasses: unique(courses.map((course) => course.degreeClassCode && course.degreeClass ? `${course.degreeClassCode} — ${course.degreeClass}` : "")),
    };
  }, [dataset]);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    const rows = (dataset?.courses ?? []).filter((course) => {
      const searchable = normalize(`${course.title} ${course.titleIt} ${course.university} ${course.city} ${course.degreeClassCode} ${course.degreeClass}`);
      return (!term || searchable.includes(term))
        && (!discipline || course.discipline === discipline)
        && (!qualification || readableQualification(course) === qualification)
        && (!language || course.language === language)
        && (!city || course.city === city)
        && (!region || course.region === region)
        && (!institutionType || course.institutionType === institutionType)
        && (!university || course.university === university)
        && (!access || readableAccess(course.accessType) === access)
        && (!delivery || readableDelivery(course.deliveryMode) === delivery)
        && (!degreeClass || `${course.degreeClassCode} — ${course.degreeClass}` === degreeClass);
    });

    return rows.sort((a, b) => {
      if (sort === "course") return a.title.localeCompare(b.title);
      if (sort === "university") return a.university.localeCompare(b.university) || a.title.localeCompare(b.title);
      if (sort === "city") return a.city.localeCompare(b.city) || a.title.localeCompare(b.title);
      if (term) {
        const aStarts = normalize(a.title).startsWith(term) ? 0 : 1;
        const bStarts = normalize(b.title).startsWith(term) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
      }
      return a.title.localeCompare(b.title);
    });
  }, [access, city, dataset, degreeClass, delivery, discipline, institutionType, language, qualification, query, region, sort, university]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilters = [discipline, qualification, language, city, region, institutionType, university, access, delivery, degreeClass].filter(Boolean).length + Number(Boolean(query));

  function reset() {
    setQuery("");
    setDiscipline("");
    setQualification("");
    setLanguage("");
    setCity("");
    setRegion("");
    setInstitutionType("");
    setUniversity("");
    setAccess("");
    setDelivery("");
    setDegreeClass("");
    setSort("relevance");
    setPage(1);
  }

  function downloadResults() {
    const payload = {
      exportedAt: new Date().toISOString(),
      source: dataset?.metadata,
      filters: { query, discipline, qualification, language, city, region, institutionType, university, access, delivery, degreeClass },
      totalResults: filtered.length,
      courses: filtered,
    };
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    link.download = "polaris-italy-course-results.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function downloadCatalogue() {
    if (!dataset) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(dataset)], { type: "application/json" }));
    link.download = "polaris-italy-courses.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const updated = dataset?.metadata.generatedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(dataset.metadata.generatedAt))
    : "";

  return (
    <>
      <section className="italy-finder-intro">
        <div className="italy-intro-copy">
          <p className="eyebrow"><span /> Italy · Official higher-education data</p>
          <h1>Find your course<br /><em>in Italy.</em></h1>
          <p>Explore Italy&apos;s current university catalogue with clear, student-friendly filters. Search in English, compare routes, then ask Polaris to verify eligibility and admissions.</p>
          <div className="italy-hero-actions">
            <a href="#italy-search">Start searching ↓</a>
            <a href={counsellingUrl} target="_blank" rel="noreferrer">Get free counselling ↗</a>
          </div>
        </div>
        <div className="italy-data-card">
          <img src="/polaris/flags/it.png" alt="Flag of Italy" />
          <p>Current catalogue</p>
          <strong>{dataset ? dataset.metadata.totalCourses.toLocaleString("en-GB") : "5,900+"}</strong>
          <span>university programmes</span>
          <dl>
            <div><dt>Academic year</dt><dd>{dataset?.metadata.academicYears.join(", ") || "2026/27"}</dd></div>
            <div><dt>Institutions</dt><dd>{dataset?.metadata.totalInstitutions || "100+"}</dd></div>
            <div><dt>Source</dt><dd>Universitaly / MUR</dd></div>
          </dl>
        </div>
      </section>

      <section className="italy-finder-workspace" id="italy-search">
        <div className="italy-source-strip">
          <div className="source-pulse"><i /><span>OFFICIAL DATA SNAPSHOT</span></div>
          <p>Programme data from <a href={sourceUrl} target="_blank" rel="noreferrer">Universitaly</a>. Institution type from <a href="https://ustat.mur.gov.it/dati/didattica/italia/atenei" target="_blank" rel="noreferrer">MUR USTAT</a>. {updated && `Refreshed ${updated}.`}</p>
          <button type="button" onClick={downloadCatalogue} disabled={!dataset}>Download all JSON ↓</button>
        </div>

        <div className="italy-search-shell">
          <div className="italy-search-heading">
            <div><small>COURSE DISCOVERY</small><h2>Search Italy&apos;s universities</h2></div>
            <p>Choose any combination of filters. Results update instantly.</p>
          </div>

          <label className="italy-keyword-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Course, university, degree class or keyword" />
            {query && <button type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label="Clear keyword">×</button>}
          </label>

          <div className="italy-primary-filters">
            <Select label="Discipline" value={discipline} setValue={(value) => { setDiscipline(value); setPage(1); }} options={options.disciplines} placeholder="All disciplines" />
            <Select label="Qualification" value={qualification} setValue={(value) => { setQualification(value); setPage(1); }} options={["Bachelor's / first cycle", "Master's / second cycle", "Single-cycle degree"]} placeholder="All qualifications" />
            <Select label="Language" value={language} setValue={(value) => { setLanguage(value); setPage(1); }} options={["English", "Italian"]} placeholder="Any language" />
            <Select label="City" value={city} setValue={(value) => { setCity(value); setPage(1); }} options={options.cities} placeholder="All cities" />
          </div>

          <button className="advanced-filter-toggle" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((value) => !value)}>
            <span>{advancedOpen ? "Hide advanced filters" : "More filters"}{activeFilters ? ` · ${activeFilters} active` : ""}</span><i>{advancedOpen ? "−" : "+"}</i>
          </button>

          {advancedOpen && (
            <div className="italy-advanced-filters">
              <Select label="Region" value={region} setValue={(value) => { setRegion(value); setPage(1); }} options={options.regions} placeholder="All regions" />
              <Select label="University type" value={institutionType} setValue={(value) => { setInstitutionType(value); setPage(1); }} options={["State", "Non-state"]} optionLabels={{ State: "Public / state", "Non-state": "Private / non-state" }} placeholder="Any university type" />
              <Select label="Access" value={access} setValue={(value) => { setAccess(value); setPage(1); }} options={["Open access", "Entry test", "Limited enrolment"]} placeholder="Any access type" />
              <Select label="Delivery" value={delivery} setValue={(value) => { setDelivery(value); setPage(1); }} options={["In person", "Mixed", "Mostly online", "Online"]} placeholder="Any delivery mode" />
              <Select label="University" value={university} setValue={(value) => { setUniversity(value); setPage(1); }} options={options.universities} placeholder="All universities" />
              <Select label="Degree class" value={degreeClass} setValue={(value) => { setDegreeClass(value); setPage(1); }} options={options.degreeClasses} placeholder="All degree classes" />
            </div>
          )}
        </div>

        <div className="italy-results-toolbar">
          <div>
            {dataset && <p><strong>{filtered.length.toLocaleString("en-GB")}</strong> programme{filtered.length === 1 ? "" : "s"} found</p>}
            {!dataset && !loadError && <p className="loading-line"><i /> Loading the official catalogue…</p>}
            {activeFilters > 0 && <button type="button" onClick={reset}>Clear all filters</button>}
          </div>
          <div>
            <button type="button" onClick={downloadResults} disabled={!dataset || filtered.length === 0}>Export results JSON</button>
            <label>Sort <select value={sort} onChange={(event) => { setSort(event.target.value as Sort); setPage(1); }}><option value="relevance">Best match</option><option value="course">Course A–Z</option><option value="university">University A–Z</option><option value="city">City A–Z</option></select></label>
          </div>
        </div>

        {loadError && <div className="italy-empty-state"><span>!</span><h3>The catalogue could not load.</h3><p>Please refresh the page or open the official Universitaly search.</p><a href={sourceUrl} target="_blank" rel="noreferrer">Open Universitaly ↗</a></div>}

        {dataset && filtered.length === 0 && <div className="italy-empty-state"><span>⌕</span><h3>No exact match yet.</h3><p>Try removing one or two filters, or ask Polaris to identify the closest available route.</p><button type="button" onClick={reset}>Reset search</button></div>}

        {visible.length > 0 && (
          <div className="italy-course-list">
            {visible.map((course) => <ItalyCourseCard key={course.id} course={course} />)}
          </div>
        )}

        {filtered.length > PAGE_SIZE && (
          <nav className="italy-pagination" aria-label="Course results pages">
            <button type="button" disabled={currentPage === 1} onClick={() => { setPage(Math.max(1, currentPage - 1)); document.querySelector(".italy-results-toolbar")?.scrollIntoView({ behavior: "smooth" }); }}>← Previous</button>
            <p>Page <strong>{currentPage}</strong> of {totalPages}</p>
            <button type="button" disabled={currentPage === totalPages} onClick={() => { setPage(Math.min(totalPages, currentPage + 1)); document.querySelector(".italy-results-toolbar")?.scrollIntoView({ behavior: "smooth" }); }}>Next →</button>
          </nav>
        )}

        <aside className="italy-verification-note">
          <div><span>✓</span><div><strong>Official source, human guidance.</strong><p>Course availability, admissions and deadlines can change. Polaris verifies the official university page before advising or submitting an application.</p></div></div>
          <a href={counsellingUrl} target="_blank" rel="noreferrer">Ask Polaris to verify ↗</a>
        </aside>
      </section>
    </>
  );
}

function Select({ label, value, setValue, options, placeholder, optionLabels = {} }: { label: string; value: string; setValue: (value: string) => void; options: string[]; placeholder: string; optionLabels?: Record<string, string> }) {
  return (
    <label className="italy-filter-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{optionLabels[option] || option}</option>)}
      </select>
    </label>
  );
}

function ItalyCourseCard({ course }: { course: Course }) {
  const officialUrl = course.programmeUrl || sourceUrl;
  const message = encodeURIComponent(`Hello Polaris Global Education Center, please verify my eligibility and current admission details for ${course.title} at ${course.university}, Italy (Universitaly course ID ${course.id}).`);
  return (
    <article className="italy-course-card">
      <div className="italy-card-index"><span>IT</span><small>{course.disciplineCode || "—"}</small></div>
      <div className="italy-card-main">
        <div className="italy-card-badges">
          <span>{course.language || "Language not listed"}</span>
          <span>{course.institutionType === "State" ? "Public / state" : course.institutionType === "Non-state" ? "Private / non-state" : "Type unclassified"}</span>
          {course.academicYear && <span>{course.academicYear}</span>}
        </div>
        <h3>{course.title}</h3>
        {course.titleIt && normalize(course.titleIt) !== normalize(course.title) && <p className="italian-title">Italian title: {course.titleIt}</p>}
        <p className="italy-course-university">{course.university}</p>
        <div className="italy-course-meta">
          <div><small>QUALIFICATION</small><strong>{readableQualification(course)}</strong></div>
          <div><small>LOCATION</small><strong>{course.city || "Location not listed"}{course.region ? `, ${course.region}` : ""}</strong></div>
          <div><small>DEGREE CLASS</small><strong>{course.degreeClassCode || "—"}{course.degreeClass ? ` · ${course.degreeClass}` : ""}</strong></div>
          <div><small>STUDY MODE</small><strong>{readableDelivery(course.deliveryMode)}</strong></div>
          <div><small>ACCESS</small><strong>{readableAccess(course.accessType)}</strong></div>
          <div><small>DURATION</small><strong>{course.durationYears ? `${course.durationYears} years` : "Not listed"}</strong></div>
        </div>
      </div>
      <div className="italy-card-actions">
        <a href={officialUrl} target="_blank" rel="noreferrer">Official details ↗</a>
        <a href={`https://wa.me/923416934362?text=${message}`} target="_blank" rel="noreferrer">Check eligibility</a>
        <small>Source ID {course.id}</small>
      </div>
    </article>
  );
}
