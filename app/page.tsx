import EnquiryForm from "./enquiry-form";
import HomeCourseSearch from "./home-course-search";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "./site-shell";
import { destinations, IELTS_DEMO_URL, TRACKING_WHATSAPP_URL, WHATSAPP_URL } from "./site-data";

const faqs = [
  ["When should I start my application?", "Starting early gives you more time to compare programmes, collect documents and meet admission, scholarship and visa timelines. Share your preferred intake and we will help map the right starting point."],
  ["Can Polaris help me find scholarships?", "Yes. We help identify relevant scholarship opportunities and support you in preparing the required application material. Every award remains subject to the provider's eligibility criteria and final decision."],
  ["Do I need IELTS to study abroad?", "Requirements vary by country, university and programme. Some routes may accept alternative English evidence, while others require a recognised test. We help you verify the requirement for your shortlist."],
  ["Does Polaris guarantee admission or a visa?", "No consultancy can guarantee admission, scholarship or visa approval. Polaris provides careful guidance and documentation support; final decisions belong to institutions, scholarship bodies and government authorities."],
];

const whyChoosePolaris = [
  { value: "1:1", title: "Personalised counselling", text: "Advice built around each student's academics, budget, destination goals and career direction.", icon: "◎" },
  { value: "5", title: "Focused destinations", text: "Dedicated guidance for Italy, France, Germany, Türkiye and China—with country-specific next steps.", icon: "✦" },
  { value: "CLEAR", title: "Transparent progress", text: "Clear requirements, honest expectations and application status updates throughout the journey.", icon: "✓" },
  { value: "360°", title: "Complete application support", text: "Shortlisting, documents, applications, scholarship guidance, visa preparation and pre-departure help.", icon: "↗" },
  { value: "IELTS", title: "Language preparation", text: "IELTS preparation, English language support and a free demo class before enrolment.", icon: "A" },
  { value: "CARE", title: "Student-first guidance", text: "Friendly counselling that explains the options clearly without making false admission or visa guarantees.", icon: "♡" },
];

const popularUniversities = [
  { name: "University of Bologna", country: "Italy", flag: "/polaris/flags/it.png" },
  { name: "Politecnico di Milano", country: "Italy", flag: "/polaris/flags/it.png" },
  { name: "University of Padua", country: "Italy", flag: "/polaris/flags/it.png" },
  { name: "Sapienza University of Rome", country: "Italy", flag: "/polaris/flags/it.png" },
  { name: "Université Paris-Saclay", country: "France", flag: "/polaris/flags/fr.png" },
  { name: "Sorbonne University", country: "France", flag: "/polaris/flags/fr.png" },
  { name: "Sciences Po", country: "France", flag: "/polaris/flags/fr.png" },
  { name: "École Polytechnique", country: "France", flag: "/polaris/flags/fr.png" },
  { name: "Technical University of Munich", country: "Germany", flag: "/polaris/flags/de.png" },
  { name: "Heidelberg University", country: "Germany", flag: "/polaris/flags/de.png" },
  { name: "RWTH Aachen University", country: "Germany", flag: "/polaris/flags/de.png" },
  { name: "Humboldt University of Berlin", country: "Germany", flag: "/polaris/flags/de.png" },
  { name: "Middle East Technical University", country: "Türkiye", flag: "/polaris/flags/tr.png" },
  { name: "Istanbul Technical University", country: "Türkiye", flag: "/polaris/flags/tr.png" },
  { name: "Boğaziçi University", country: "Türkiye", flag: "/polaris/flags/tr.png" },
  { name: "Bilkent University", country: "Türkiye", flag: "/polaris/flags/tr.png" },
  { name: "Tsinghua University", country: "China", flag: "/polaris/flags/cn.png" },
  { name: "Peking University", country: "China", flag: "/polaris/flags/cn.png" },
  { name: "Zhejiang University", country: "China", flag: "/polaris/flags/cn.png" },
  { name: "Shanghai Jiao Tong University", country: "China", flag: "/polaris/flags/cn.png" },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Polaris Overseas Education",
    url: "https://polarisoverseasedu.com",
    email: "contact@polarisoverseasedu.com",
    telephone: "+92 341 6934362",
    slogan: "Your North Star to Global Education",
    address: {
      "@type": "PostalAddress",
      streetAddress: "228C PIA Main Boulevard, Block C, PIA Housing Scheme",
      addressLocality: "Lahore",
      postalCode: "54770",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.facebook.com/polarisoverseaseducation",
      "https://www.instagram.com/polarisoverseaseducation",
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <section className="hero hero-v2" id="top">
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Your North Star to Global Education</p>
          <h1>Find your course.<br /><em>Follow your north star.</em></h1>
          <p className="hero-lead">
            Personalised study-abroad guidance for university selection, applications,
            scholarships, student visas and the journey beyond.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/course-finder"><span>Find a course</span><i aria-hidden="true">↗</i></a>
            <a className="button button-secondary" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span>Free counselling</span><i aria-hidden="true">↗</i></a>
            <a className="button button-secondary" href="/scholarships"><span>Find scholarships</span><i aria-hidden="true">↗</i></a>
            <a className="button button-secondary" href={IELTS_DEMO_URL}><span>Book IELTS demo</span><i aria-hidden="true">↗</i></a>
            <a className="button button-secondary tracking-button" href="#application-tracking"><span>Application tracking</span><small>Portal soon</small></a>
          </div>
          <div className="hero-proof">
            <span><b>01</b> Profile-led advice</span>
            <span><b>02</b> Five destinations</span>
            <span><b>03</b> End-to-end support</span>
          </div>
        </div>

        <div className="landmark-mosaic" aria-label="Featured study destinations">
          <figure className="mosaic-main">
            <img src="/polaris/landmarks/france.webp" alt="Eiffel Tower in Paris, France" fetchPriority="high" decoding="async" />
            <figcaption><span>FR</span><strong>Study in France</strong><small>Paris · Eiffel Tower</small></figcaption>
          </figure>
          <figure>
            <img src="/polaris/landmarks/italy.webp" alt="The Colosseum in Rome, Italy" decoding="async" />
            <figcaption><span>IT</span><strong>Italy</strong></figcaption>
          </figure>
          <figure>
            <img src="/polaris/landmarks/germany.webp" alt="Brandenburg Gate in Berlin, Germany" decoding="async" />
            <figcaption><span>DE</span><strong>Germany</strong></figcaption>
          </figure>
          <figure>
            <img src="/polaris/landmarks/turkiye.webp" alt="Hagia Sophia in Istanbul, Türkiye" decoding="async" />
            <figcaption><span>TR</span><strong>Türkiye</strong></figcaption>
          </figure>
          <figure>
            <img src="/polaris/landmarks/china.webp" alt="The Great Wall of China" decoding="async" />
            <figcaption><span>CN</span><strong>China</strong></figcaption>
          </figure>
          <div className="mosaic-star" aria-hidden="true">✦</div>
        </div>
      </section>

      <div className="finder-wrap"><HomeCourseSearch /></div>

      <section className="support-strip" aria-label="Our support">
        {["Counselling", "Course search", "Admissions", "Scholarships", "Student visas", "IELTS & languages"].map((item) => (
          <span key={item}><i aria-hidden="true">✦</i>{item}</span>
        ))}
      </section>

      <section className="why-choose-section" id="why-choose-us">
        <div className="why-choose-heading">
          <p className="eyebrow"><span /> Why choose us</p>
          <h2>Why students choose Polaris.</h2>
          <p>Professional support should feel personal, transparent and easy to understand. That principle guides every Polaris service.</p>
        </div>
        <div className="why-choose-grid">
          {whyChoosePolaris.map((item) => (
            <article key={item.title}>
              <div className="why-card-top"><strong>{item.value}</strong><span aria-hidden="true">{item.icon}</span></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-showcase" id="destinations">
        <div className="section-heading light">
          <div>
            <p className="eyebrow"><span /> Study destinations</p>
            <h2>Five countries.<br />A world of possibility.</h2>
          </div>
          <p>Explore programme routes, institutions and scholarships across the destinations Polaris currently supports.</p>
        </div>
        <div className="destination-flag-grid">
          {destinations.map((destination) => (
            <article className="destination-flag-card" key={destination.country}>
              <img className="country-flag" src={destination.flagImage} alt={`${destination.country} national flag`} loading="lazy" decoding="async" />
              <small>{destination.code} · STUDY IN</small>
              <h3>{destination.country}</h3>
              <p>{destination.note}</p>
              <a href={destination.country === "Italy" ? "/italy-course-finder" : `/course-finder?country=${encodeURIComponent(destination.country)}`} aria-label={`Find courses in ${destination.country}`}>Explore country <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <a className="section-page-link is-light" href="/destinations">Compare all destinations <span aria-hidden="true">↗</span></a>
      </section>

      <section className="popular-universities-section" aria-labelledby="popular-universities-title">
        <div className="popular-universities-heading">
          <p className="eyebrow dark"><span /> Explore institutions</p>
          <h2 id="popular-universities-title">Popular universities across five countries.</h2>
          <p>Browse recognisable institutions, then use the Polaris Course Finder to verify current programmes and requirements.</p>
        </div>
        <UniversityMarquee items={popularUniversities.slice(0, 10)} />
        <UniversityMarquee items={popularUniversities.slice(10)} reverse />
        <div className="university-disclaimer">Featured for student exploration. Inclusion does not imply a formal university partnership.</div>
      </section>

      <section className="tracking-section" id="application-tracking">
        <div className="tracking-copy">
          <p className="eyebrow dark"><span /> Transparent from day one</p>
          <h2>Know exactly where your application stands.</h2>
          <p>Our dedicated student tracking portal is coming soon. Until launch, Polaris students can request a clear WhatsApp status update at every stage.</p>
          <div className="tracking-status"><i aria-hidden="true" /> Student Portal · In development</div>
          <a className="button button-dark" href={TRACKING_WHATSAPP_URL} target="_blank" rel="noreferrer">Request application update <span aria-hidden="true">↗</span></a>
        </div>
        <div className="tracking-journey" aria-label="Application tracking stages">
          {[
            ["01", "Profile reviewed", "Academic profile and destination goals"],
            ["02", "Documents ready", "Required documents checked and organised"],
            ["03", "Application submitted", "Submission date and institution recorded"],
            ["04", "Decision & visa", "Offer, next steps and visa preparation"],
          ].map(([number, title, text], index) => (
            <article key={number} className={index < 2 ? "is-active" : ""}><span>{number}</span><div><strong>{title}</strong><small>{text}</small></div><i aria-hidden="true">{index < 2 ? "✓" : "○"}</i></article>
          ))}
        </div>
      </section>

      <section className="finder-feature-section">
        <div className="finder-feature-copy">
          <p className="eyebrow dark"><span /> Polaris Course Finder</p>
          <h2>Search smarter before you apply.</h2>
          <p>Start with Polaris shortlists, then continue to the live national programme catalogue for each destination. That keeps university and programme information current and verifiable.</p>
          <ul>
            <li><span>✓</span> Five authoritative national catalogues</li>
            <li><span>✓</span> Curated Polaris programme shortlists</li>
            <li><span>✓</span> Eligibility checks through WhatsApp</li>
          </ul>
          <a className="button button-dark" href="/course-finder">Open Course Finder <span>↗</span></a>
        </div>
        <div className="finder-demo" aria-label="Official course catalogue sources">
          <div className="demo-top"><span>Live Course Sources</span><small>OFFICIAL CATALOGUES</small></div>
          {[
            ["/polaris/flags/it.png", "Universitaly", "Italy", "National university and course catalogue"],
            ["/polaris/flags/de.png", "DAAD", "Germany", "21,000+ degree programmes"],
            ["/polaris/flags/tr.png", "Study in Türkiye", "Türkiye", "9,000+ programme results"],
          ].map(([flag, title, country, meta]) => (
            <article key={title}><img className="demo-flag" src={flag} alt={`${country} flag`} loading="lazy" decoding="async" /><div><small>{country}</small><h3>{title}</h3><p>{meta}</p></div><span>↗</span></article>
          ))}
          <a href="/course-finder">Open all five live catalogues →</a>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-title">
          <p className="eyebrow dark"><span /> Common questions</p>
          <h2>What students ask us.</h2>
          <p>Every profile is different. These quick answers are a starting point; your counselling session gives you guidance tailored to your case.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Free counselling</p>
          <h2>Let’s find the direction that feels right.</h2>
          <p>Tell us where you are in your study journey. A Polaris counsellor can help you understand your most suitable next step.</p>
          <div className="contact-links">
            <a href="tel:+923416934362"><ContactIcon name="phone" />+92 341 6934362</a>
            <a href="tel:+923000756932"><ContactIcon name="phone" />+92 300 0756932</a>
            <a href="mailto:contact@polarisoverseasedu.com"><ContactIcon name="email" />contact@polarisoverseasedu.com</a>
            <address><ContactIcon name="location" />228C PIA Main Boulevard, Block C, PIA Housing Scheme, Lahore 54770</address>
          </div>
          <a className="button button-primary office-page-button" href="/our-office">Map, directions & office details <span aria-hidden="true">↗</span></a>
        </div>
        <EnquiryForm />
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}

function ContactIcon({ name }: { name: "phone" | "email" | "location" }) {
  return (
    <span className="contact-icon" aria-hidden="true">
      {name === "phone" && (
        <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg>
      )}
      {name === "email" && (
        <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
      )}
      {name === "location" && (
        <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
      )}
    </span>
  );
}

function UniversityMarquee({ items, reverse = false }: { items: typeof popularUniversities; reverse?: boolean }) {
  const loopItems = [...items, ...items];
  return (
    <div className="university-marquee" aria-label="Popular universities">
      <div className={`university-track${reverse ? " reverse" : ""}`}>
        {loopItems.map((university, index) => (
          <a href={`/course-finder?country=${encodeURIComponent(university.country)}`} className="university-mark" key={`${university.name}-${index}`}>
            <img src={university.flag} alt="" loading="lazy" decoding="async" />
            <span><strong>{university.name}</strong><small>{university.country}</small></span>
          </a>
        ))}
      </div>
    </div>
  );
}
