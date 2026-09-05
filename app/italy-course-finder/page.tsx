import type { Metadata } from "next";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "../site-shell";
import ItalyCourseFinder from "./italy-course-finder";

export const metadata: Metadata = {
  title: "Italy Course Finder | Polaris Overseas Education",
  description: "Search Italy's current university programmes by discipline, qualification, language, city, university type, access and delivery mode using official MUR data.",
  alternates: { canonical: "/italy-course-finder" },
  openGraph: {
    title: "Italy Course Finder — Polaris Overseas Education",
    description: "Explore Italy's official university programme catalogue with student-friendly filters.",
    url: "https://polarisoverseasedu.com/italy-course-finder",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Polaris Overseas Education Italy Course Finder" }],
  },
};

export default function ItalyCourseFinderPage() {
  return (
    <main className="italy-finder-page">
      <SiteHeader />
      <ItalyCourseFinder />
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
