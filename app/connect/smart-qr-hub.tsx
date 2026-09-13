"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { campaignName } from "../qr-campaigns";

const primaryNumber = "923000756932";

const services = [
  { id: "course_finder", label: "Find a course", detail: "Explore programmes and official catalogues", href: "/course-finder", icon: "⌕" },
  { id: "scholarships", label: "Find scholarships", detail: "Compare verified funding opportunities", href: "/scholarships", icon: "✦" },
  { id: "ielts_demo", label: "Book IELTS demo", detail: "Choose a preferred demo date and time", href: "/book-ielts-demo", icon: "A" },
  { id: "counselling", label: "Free counselling", detail: "Share your profile with a counsellor", href: "#student-request", icon: "✓" },
  { id: "directions", label: "Office directions", detail: "Open our Lahore office information", href: "/our-office", icon: "⌖" },
  { id: "save_contact", label: "Save Polaris contact", detail: "Add our details to your phone", href: "/polaris-global.vcf", icon: "+" },
] as const;

function getVisitorId() {
  try {
    const stored = window.localStorage.getItem("polaris_qr_visitor");
    if (stored) return stored;
    const created = window.crypto.randomUUID();
    window.localStorage.setItem("polaris_qr_visitor", created);
    return created;
  } catch {
    return `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function deviceType() {
  if (window.matchMedia("(max-width: 680px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

export default function SmartQrHub() {
  const [campaign, setCampaign] = useState("master");
  const [visitorId, setVisitorId] = useState("");
  const [selectedService, setSelectedService] = useState("Free counselling");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    const params = new URLSearchParams(window.location.search);
    const safeCampaign = (params.get("campaign") || "master").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 80) || "master";
    const id = getVisitorId();
    setCampaign(safeCampaign);
    setVisitorId(id);

    void fetch("/api/qr/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "scan",
        campaign: safeCampaign,
        action: "hub_opened",
        visitorId: id,
        referrer: document.referrer,
        device: deviceType(),
      }),
      keepalive: true,
    });
  }, []);

  function trackAction(action: string) {
    const body = JSON.stringify({
      eventType: "action",
      campaign,
      action,
      visitorId,
      referrer: document.referrer,
      device: deviceType(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/qr/events", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/qr/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    }
  }

  function chooseService(label: string, action: string) {
    trackAction(action);
    if (label === "Free counselling") setSelectedService(label);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      campaign,
      visitorId,
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      city: String(form.get("city") || "").trim(),
      service: String(form.get("service") || "Free counselling"),
      country: String(form.get("country") || "Not decided"),
      studyLevel: String(form.get("studyLevel") || "Not specified"),
      discipline: String(form.get("discipline") || "Not specified"),
      intake: String(form.get("intake") || "Not decided"),
      ieltsStatus: String(form.get("ieltsStatus") || "Not specified"),
      consent: form.get("consent") === "yes",
      website: String(form.get("website") || ""),
    };
    const message = [
      "Hello Polaris Global Education Center, I scanned your Smart QR and would like guidance.",
      `Name: ${payload.name}`,
      `WhatsApp: ${payload.phone}`,
      `City: ${payload.city}`,
      `Service: ${payload.service}`,
      `Preferred country: ${payload.country}`,
      `Study level: ${payload.studyLevel}`,
      `Discipline: ${payload.discipline}`,
      `Preferred intake: ${payload.intake}`,
      `IELTS status: ${payload.ieltsStatus}`,
      `Campaign: ${campaignName(campaign)}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${primaryNumber}?text=${encodeURIComponent(message)}`;
    setFallbackUrl(whatsappUrl);
    setStatus("saving");

    try {
      const response = await fetch("/api/qr/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Lead save failed");
      window.location.assign(whatsappUrl);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="smart-qr-page">
      <header className="smart-qr-header">
        <a href="/" className="smart-qr-brand" aria-label="Polaris Global Education Center home">
          <img src="/polaris/logo-optimized.png" alt="" width="62" height="62" />
          <span><strong>POLARIS</strong><small>GLOBAL EDUCATION CENTER</small></span>
        </a>
        <a href="tel:+923000756932" className="smart-qr-call">Call us</a>
      </header>

      <section className="smart-qr-intro">
        <p><span /> SMART STUDENT CONNECT</p>
        <h1>Choose your next step.</h1>
        <div className="smart-qr-intro-row">
          <span>{campaignName(campaign)}</span>
          <small>Verified guidance for five study destinations</small>
        </div>
      </section>

      <section className="smart-qr-actions" aria-label="Polaris services">
        {services.map((service) => (
          <a key={service.id} href={service.href} download={service.id === "save_contact" ? "Polaris-Global-Education-Center.vcf" : undefined} onClick={() => chooseService(service.label, service.id)}>
            <span aria-hidden="true">{service.icon}</span>
            <div><strong>{service.label}</strong><small>{service.detail}</small></div>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </section>

      <section className="smart-qr-form-section" id="student-request">
        <div className="smart-qr-form-copy">
          <p>PERSONALISED GUIDANCE</p>
          <h2>Tell us what you want to study.</h2>
          <span>Complete this short profile once. Your details will be saved for counsellor follow-up and prepared as a WhatsApp message.</span>
          <ul><li>One-to-one initial counselling</li><li>Programme and scholarship direction</li><li>Clear next-step guidance</li></ul>
        </div>

        <form className="smart-qr-lead-form" onSubmit={submitLead}>
          <label>Full name<input name="name" type="text" autoComplete="name" required /></label>
          <label>WhatsApp number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 300 0000000" required /></label>
          <label>City<input name="city" type="text" autoComplete="address-level2" required /></label>
          <label>What do you need?
            <select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required>
              <option>Free counselling</option><option>Course and university selection</option><option>Scholarship guidance</option><option>Application support</option><option>Visa assistance</option><option>IELTS preparation</option>
            </select>
          </label>
          <label>Preferred country
            <select name="country" defaultValue="Not decided"><option>Not decided</option><option>Italy</option><option>France</option><option>Germany</option><option>Türkiye</option><option>China</option></select>
          </label>
          <label>Study level
            <select name="studyLevel" defaultValue="Not specified"><option>Not specified</option><option>Foundation</option><option>Bachelor&apos;s</option><option>Master&apos;s</option><option>PhD</option><option>Language course</option></select>
          </label>
          <label>Discipline<input name="discipline" type="text" placeholder="e.g. Computer Science" /></label>
          <label>Preferred intake<input name="intake" type="text" placeholder="e.g. September 2027" /></label>
          <label className="smart-qr-full-field">IELTS status
            <select name="ieltsStatus" defaultValue="Not specified"><option>Not specified</option><option>Not taken yet</option><option>Preparing now</option><option>Test booked</option><option>Already have a score</option><option>Need an IELTS demo</option></select>
          </label>
          <label className="smart-qr-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label className="smart-qr-consent"><input name="consent" type="checkbox" value="yes" required /><span>I agree that Polaris may use these details to respond to my enquiry on call or WhatsApp.</span></label>
          <button type="submit" disabled={status === "saving"}>{status === "saving" ? "Preparing your request…" : "Continue on WhatsApp"}<span aria-hidden="true">↗</span></button>
          {status === "error" ? <p className="smart-qr-form-error" role="alert">We could not save your request right now. Your details are still in the form. <a href={fallbackUrl}>Continue directly on WhatsApp</a>.</p> : null}
        </form>
      </section>

      <footer className="smart-qr-footer">
        <div><strong>Need immediate help?</strong><a href="https://wa.me/923000756932" onClick={() => trackAction("direct_whatsapp")}>WhatsApp +92 300 0756932</a></div>
        <div className="smart-qr-social"><a href="https://www.instagram.com/polarisoverseaseducation" target="_blank" rel="noreferrer" onClick={() => trackAction("instagram")}>Instagram</a><a href="https://www.facebook.com/polarisoverseaseducation" target="_blank" rel="noreferrer" onClick={() => trackAction("facebook")}>Facebook</a><a href="mailto:contact@polarisoverseasedu.com" onClick={() => trackAction("email")}>Email</a></div>
        <small>Your details are used only for your enquiry and counsellor follow-up.</small>
      </footer>
    </main>
  );
}
