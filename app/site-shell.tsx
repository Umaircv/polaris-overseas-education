import { WHATSAPP_URL } from "./site-data";

const navItems = [
  ["Home", "/"],
  ["Course Finder", "/course-finder"],
  ["Destinations", "/destinations"],
  ["Blogs", "/blogs"],
  ["Our Office", "/our-office"],
];

const serviceItems = [
  ["All services", "/services"],
  ["Study Abroad", "/services/study-abroad"],
  ["Scholarship Finder", "/scholarships"],
  ["IELTS Preparation", "/services/ielts-preparation"],
  ["Study Abroad Steps", "/study-abroad-steps"],
];

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand-lockup${footer ? " footer-brand" : ""}`} href="/" aria-label="Polaris Overseas Education home">
      <img src="/polaris/logo-optimized.png" alt="" width="60" height="60" loading={footer ? "lazy" : "eager"} decoding="async" />
      <span>
        <strong>POLARIS</strong>
        <small>OVERSEAS EDUCATION</small>
      </span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="main-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(0, 1).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <details className="nav-dropdown">
            <summary>Services <span aria-hidden="true">⌄</span></summary>
            <div className="nav-dropdown-menu">
              {serviceItems.map(([label, href]) => <a key={label} href={href}>{label}<span aria-hidden="true">↗</span></a>)}
            </div>
          </details>
          {navItems.slice(1).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="header-phones" aria-label="Call Polaris">
            <a href="tel:+923416934362"><span aria-hidden="true">☎</span> +92 341 6934362</a>
            <a href="tel:+923000756932"><span aria-hidden="true">☎</span> +92 300 0756932</a>
          </div>
          <a className="header-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Free consultation</a>
        </div>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <div>
            {navItems.slice(0, 1).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <details className="mobile-services-menu">
              <summary>Services <span aria-hidden="true">⌄</span></summary>
              <div>
                {serviceItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
              </div>
            </details>
            {navItems.slice(1).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <a href="tel:+923416934362">Call +92 341 6934362</a>
            <a href="tel:+923000756932">Call +92 300 0756932</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Free consultation</a>
          </div>
        </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <Brand footer />
          <p>Your North Star to Global Education</p>
          <div className="social-links">
            <a href="https://www.facebook.com/polarisoverseaseducation?mibextid=ZbWKwL" target="_blank" rel="noreferrer" aria-label="Polaris on Facebook">
              <span className="social-icon facebook-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.5c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.2h3.3l-.5 3.5h-2.8V24c5.8-.9 10.2-5.9 10.2-11.9Z" /></svg></span>
              Facebook
            </a>
            <a href="https://www.instagram.com/polarisoverseaseducation?utm_source=qr&igsi=cXA3cGFseHU2czQx" target="_blank" rel="noreferrer" aria-label="Polaris on Instagram">
              <span className="social-icon instagram-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.3" /><circle cx="12" cy="12" r="4.5" /><circle cx="18.1" cy="5.9" r="1.2" className="solid-dot" /></svg></span>
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-links-column">
          <strong>Explore</strong>
          <a href="/services">Our services</a>
          <a href="/course-finder">Course finder</a>
          <a href="/scholarships">Scholarship finder</a>
          <a href="/destinations">Study destinations</a>
          <a href="/blogs">Blogs</a>
          <a href="/our-office">Our office</a>
        </div>
        <div className="footer-links-column">
          <strong>Destinations</strong>
          <a href="/italy-course-finder">Study in Italy</a>
          <a href="/course-finder?country=France">Study in France</a>
          <a href="/course-finder?country=Germany">Study in Germany</a>
          <a href="/course-finder?country=Türkiye">Study in Türkiye</a>
          <a href="/course-finder?country=China">Study in China</a>
        </div>
        <div className="footer-contact-column">
          <strong>Contact</strong>
          <a href="tel:+923416934362">+92 341 6934362</a>
          <a href="tel:+923000756932">+92 300 0756932</a>
          <a href="mailto:contact@polarisoverseasedu.com">contact@polarisoverseasedu.com</a>
          <address>228C PIA Main Boulevard, Block C, PIA Housing Scheme, Lahore 54770</address>
        </div>
      </div>
      <div className="footer-legal">
        <p>© 2026 Polaris Overseas Education. All rights reserved.</p>
        <p>Admissions, scholarships and visas remain subject to the decisions of relevant institutions and authorities. Polaris is not a university or degree-awarding institution.</p>
        <a href="https://polarisoverseasedu.com">polarisoverseasedu.com</a>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Contact Polaris on WhatsApp">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.9 7.01c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.3-1.654a11.882 11.882 0 0 0 5.693 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.481-8.413Z" /></svg>
      </span>
    </a>
  );
}
