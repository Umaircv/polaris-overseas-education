import type { Metadata } from "next";
import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";
import { countrySlug, destinations } from "../site-data";

export const metadata: Metadata = {
  title: "Study Destinations",
  description: "Explore ten study destinations across Europe and Asia with Polaris Global Education Center.",
};

const destinationHighlights: Record<string, string[]> = {
  Italy: ["Historic public universities", "English-taught options", "Regional scholarship routes"],
  France: ["Globally respected institutions", "Business, technology and arts", "International student ecosystem"],
  Germany: ["Research-led education", "Engineering and technology strength", "Public and private routes"],
  Türkiye: ["European and Asian connection", "Varied scholarship options", "Vibrant student cities"],
  China: ["Modern research campuses", "STEM and business programmes", "Developing funding routes"],
  Sweden: ["Innovation-led universities", "Many English-taught degrees", "Collaborative learning culture"],
  Austria: ["Central European location", "Research and arts strengths", "Public and applied-science routes"],
  Cyprus: ["Accredited degree choices", "English-friendly study options", "Mediterranean student experience"],
  Malaysia: ["Competitive study costs", "International branch campuses", "Broad English-medium options"],
  Finland: ["Student-centred teaching", "Technology and design strengths", "University scholarship routes"],
};

const newPhotoCredits = [
  ["Sweden", "Acediscovery", "https://commons.wikimedia.org/wiki/File:Stockholm-Gamla-Stan-panorama.jpg"],
  ["Austria", "Nagesh Kamath", "https://commons.wikimedia.org/wiki/File:Sch%C3%B6nbrunnPalace.jpg"],
  ["Cyprus", "Anna Anichkova", "https://commons.wikimedia.org/wiki/File:View_of_Paphos_harbor_00490-92.jpg"],
  ["Malaysia", "flydime", "https://commons.wikimedia.org/wiki/File:Petronas_Twin_Towers,_Malaysia,_Kuala_Lumpur.jpg"],
  ["Finland", "John Samuel", "https://commons.wikimedia.org/wiki/File:Helsinki_Cathedral_view.jpg"],
];

export default function DestinationsPage() {
  return (
    <InnerPage>
      <PageHero
        eyebrow="Study destinations"
        title="Ten countries."
        accent="A world of possibility."
        description="Compare destinations by programme fit, budget, language, scholarship possibilities and the kind of student experience you want."
        aside={<div className="flag-stack" aria-label="Ten Polaris destination flags">{destinations.map((country) => <img key={country.country} src={country.flagImage} alt={`${country.country} flag`} />)}</div>}
      />
      <section className="inner-content-section destination-page-section">
        <SectionIntro eyebrow="Explore your options" title="Start with the country. Finish with the right course." text="Each destination offers a different balance of education, cost, culture and career direction. Explore the overview, then search current programme options." />
        <div className="destination-route-grid">
          {destinations.map((destination) => (
            <article key={destination.country}>
              <img className="destination-route-image" src={destination.image} alt={`${destination.landmark}, ${destination.country}`} loading="lazy" decoding="async" />
              <div className="destination-route-top"><img src={destination.flagImage} alt={`${destination.country} national flag`} loading="lazy" decoding="async" /><span>{destination.code}</span></div>
              <h2>{destination.country}</h2>
              <p>{destination.note}</p>
              <ul>{destinationHighlights[destination.country].map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={`/course-finder#${countrySlug(destination.country)}`}>Open official source for {destination.country} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="destination-photo-credits">New destination photography via Wikimedia Commons: {newPhotoCredits.map(([country, author, url], index) => <span key={country}>{index ? " · " : ""}<a href={url} target="_blank" rel="noreferrer">{country} — {author}</a></span>)}.</p>
      </section>
      <ContactCta title="Not sure which country fits you?" text="Share your academics, budget and preferred study field. We will help you compare realistic destination routes." />
    </InnerPage>
  );
}
