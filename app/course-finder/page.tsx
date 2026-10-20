import type { Metadata } from "next";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "../site-shell";
import CourseFinder from "./course-finder";

export const metadata: Metadata = {
  title: "Course Finder",
  description: "Search official national programme catalogues across ten Polaris study destinations, including Sweden, Austria, Cyprus, Malaysia and Finland.",
  alternates: { canonical: "/course-finder" },
  openGraph: {
    title: "Polaris Course Finder",
    description: "Open live official programme catalogues across ten supported study destinations.",
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
          <p>Search all ten destinations through authoritative official catalogues, then ask Polaris to verify eligibility, deadlines and the best-fit route for your profile.</p>
          <span className="catalogue-note">Ten countries · Ten official catalogues</span>
        </div>
      </section>
      <CourseFinder />
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
