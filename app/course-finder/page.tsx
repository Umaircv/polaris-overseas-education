import type { Metadata } from "next";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "../site-shell";
import CourseFinder from "./course-finder";

export const metadata: Metadata = {
  title: "Course Finder",
  description: "Search authoritative national programme catalogues and explore verified study options across Italy, France, Germany, Türkiye and China.",
  alternates: { canonical: "/course-finder" },
  openGraph: {
    title: "Polaris Course Finder",
    description: "Open live official programme catalogues across five supported study destinations.",
    url: "https://polarisoverseasedu.com/course-finder",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Polaris Global Education Center Course Finder" }],
  },
};

export default function CourseFinderPage() {
  return (
    <main className="finder-page">
      <SiteHeader />
      <section className="finder-page-hero">
        <div>
          <p className="eyebrow"><span /> Verified sources and expert guidance</p>
          <h1>Find programmes with confidence.</h1>
          <p>Search all five destinations through their authoritative national catalogues, then ask Polaris to verify eligibility, deadlines and the best-fit route for your profile.</p>
          <span className="catalogue-note">Five countries · Official catalogues · Polaris shortlists</span>
        </div>
      </section>
      <CourseFinder />
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
