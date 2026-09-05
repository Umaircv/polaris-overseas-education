"use client";

import { useState, type FormEvent } from "react";

const tabCopy = {
  Courses: ["Select discipline", "Select qualification", "Select destination"],
  Universities: ["Select subject area", "Select qualification", "Select destination"],
  Scholarships: ["Select discipline", "Select qualification", "Select destination"],
};

export default function HomeCourseSearch() {
  const [tab, setTab] = useState<keyof typeof tabCopy>("Courses");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const discipline = String(data.get("discipline") || "");
    const level = String(data.get("level") || "");
    const country = String(data.get("country") || "");
    if (discipline) params.set("discipline", discipline);
    if (level) params.set("level", level);
    if (country) params.set("country", country);
    params.set("view", tab.toLowerCase());
    window.location.href = country === "Italy" ? "/italy-course-finder" : `/course-finder?${params.toString()}`;
  }

  return (
    <div className="finder-panel" id="find-course">
      <div className="finder-tabs" role="tablist" aria-label="Education search type">
        {(Object.keys(tabCopy) as Array<keyof typeof tabCopy>).map((item) => (
          <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <form className="finder-fields" onSubmit={submit}>
        <label>
          <span>{tabCopy[tab][0]}</span>
          <select name="discipline" defaultValue="">
            <option value="">All disciplines</option>
            <option>Computer & IT</option>
            <option>Business & Management</option>
            <option>Engineering & Technology</option>
            <option>Health & Medicine</option>
            <option>Arts & Humanities</option>
          </select>
        </label>
        <label>
          <span>{tabCopy[tab][1]}</span>
          <select name="level" defaultValue="">
            <option value="">All qualifications</option>
            <option>Foundation</option>
            <option>Bachelor&apos;s</option>
            <option>Master&apos;s</option>
            <option>PhD</option>
            <option>Language course</option>
          </select>
        </label>
        <label>
          <span>{tabCopy[tab][2]}</span>
          <select name="country" defaultValue="">
            <option value="">All destinations</option>
            <option>Italy</option>
            <option>France</option>
            <option>Germany</option>
            <option>Türkiye</option>
            <option>China</option>
          </select>
        </label>
        <button type="submit"><span aria-hidden="true">⌕</span> Search</button>
      </form>
    </div>
  );
}
