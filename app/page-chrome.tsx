import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "./site-shell";
import { WHATSAPP_URL } from "./site-data";

export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <main className="inner-page">
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  aside,
  primaryHref = WHATSAPP_URL,
  primaryLabel = "Free counselling",
  secondaryHref = "/course-finder",
  secondaryLabel = "Find a course",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  aside?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const primaryExternal = primaryHref.startsWith("http");
  const secondaryExternal = secondaryHref.startsWith("http");
  return (
    <section className="page-hero">
      <div className="page-hero-stars" aria-hidden="true" />
      <div className="page-hero-copy">
        <p className="eyebrow"><span />{eyebrow}</p>
        <h1>{title}{accent ? <><br /><em>{accent}</em></> : null}</h1>
        <p>{description}</p>
        <div className="page-hero-actions">
          <a className="button button-primary" href={primaryHref} {...(primaryExternal ? { target: "_blank", rel: "noreferrer" } : {})}>{primaryLabel} <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href={secondaryHref} {...(secondaryExternal ? { target: "_blank", rel: "noreferrer" } : {})}>{secondaryLabel}</a>
        </div>
      </div>
      {aside ? <div className="page-hero-aside">{aside}</div> : null}
    </section>
  );
}

export function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text: string; light?: boolean }) {
  return (
    <div className={`inner-section-heading${light ? " is-light" : ""}`}>
      <p className={`eyebrow${light ? "" : " dark"}`}><span />{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function ContactCta({ title = "Ready to find your direction?", text = "Tell us your preferred country, intake and study field. A Polaris counsellor will help you plan the next practical step." }: { title?: string; text?: string }) {
  return (
    <section className="inner-contact-cta">
      <div>
        <p className="eyebrow"><span /> Start with a conversation</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="inner-contact-actions">
        <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Free counselling <span aria-hidden="true">↗</span></a>
        <a className="button button-secondary" href="tel:+923416934362">Call +92 341 6934362</a>
      </div>
    </section>
  );
}
