import type { Metadata } from "next";
import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";
import { destinations } from "../site-data";

export const metadata: Metadata = {
  title: "Study Destinations",
  description: "Explore study opportunities in Italy, France, Germany, Türkiye and China with Polaris Global Education Center.",
};

const destinationHighlights: Record<string, string[]> = {
  Italy: ["Historic public universities", "English-taught options", "Regional scholarship routes"],
  France: ["Globally respected institutions", "Business, technology and arts", "International student ecosystem"],
  Germany: ["Research-led education", "Engineering and technology strength", "Public and private routes"],
  Türkiye: ["European and Asian connection", "Varied scholarship options", "Vibrant student cities"],
  China: ["Modern research campuses", "STEM and business programmes", "Developing funding routes"],
};

export default function DestinationsPage() {
  return (
    <InnerPage>
      <PageHero
        eyebrow="Study destinations"
        title="Five countries."
        accent="A world of possibility."
        description="Compare destinations by programme fit, budget, language, scholarship possibilities and the kind of student experience you want."
        aside={<div className="flag-stack" aria-label="Italy, France, Germany, Türkiye and China flags">{destinations.map((country) => <img key={country.country} src={country.flagImage} alt={`${country.country} flag`} />)}</div>}
      />
      <section className="inner-content-section destination-page-section">
        <SectionIntro eyebrow="Explore your options" title="Start with the country. Finish with the right course." text="Each destination offers a different balance of education, cost, culture and career direction. Explore the overview, then search current programme options." />
        <div className="destination-route-grid">
          {destinations.map((destination) => (
            <article key={destination.country}>
              <div className="destination-route-top"><img src={destination.flagImage} alt={`${destination.country} national flag`} loading="lazy" decoding="async" /><span>{destination.code}</span></div>
              <h2>{destination.country}</h2>
              <p>{destination.note}</p>
              <ul>{destinationHighlights[destination.country].map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={destination.country === "Italy" ? "/italy-course-finder" : `/course-finder?country=${encodeURIComponent(destination.country)}`}>Find courses in {destination.country} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>
      <ContactCta title="Not sure which country fits you?" text="Share your academics, budget and preferred study field. We will help you compare realistic destination routes." />
    </InnerPage>
  );
}
