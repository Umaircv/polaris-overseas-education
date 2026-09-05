"use client";

import { useMemo, useState, type FormEvent } from "react";

type PreviousAttempt = "Yes" | "No" | "";

const IELTS_TEST_WHATSAPP_NUMBER = "923043929800";

export default function IeltsBookingForm() {
  const today = useMemo(getLocalDate, []);
  const [step, setStep] = useState<1 | 2>(1);
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [previousAttempt, setPreviousAttempt] = useState<PreviousAttempt>("");
  const [previousScore, setPreviousScore] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const confirmSchedule = () => {
    if (!demoDate || !demoTime) {
      setError("Please select both your preferred demo date and time.");
      return;
    }
    setError("");
    setStep(2);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !city.trim() || !previousAttempt || !targetDate) {
      setError("Please complete your name, city, IELTS history and planned test date.");
      return;
    }

    const message = [
      "*New IELTS Demo Booking — Polaris*",
      "",
      `*Student name:* ${name.trim()}`,
      `*City:* ${city.trim()}`,
      `*Preferred demo date:* ${formatDate(demoDate)}`,
      `*Preferred demo time:* ${formatTime(demoTime)}`,
      `*Taken IELTS before?* ${previousAttempt}`,
      ...(previousAttempt === "Yes" && previousScore.trim() ? [`*Previous band/result:* ${previousScore.trim()}`] : []),
      `*Plans to appear for IELTS:* ${formatDate(targetDate)}`,
      "",
      "Please confirm the demo class slot.",
    ].join("\n");
    const url = `https://wa.me/${IELTS_TEST_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setError("");
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="ielts-booking-shell" id="ielts-booking-form" aria-labelledby="booking-form-title">
      <div className="ielts-booking-intro">
        <p className="eyebrow dark"><span /> Free IELTS demo</p>
        <h2 id="booking-form-title">Choose your demo slot.</h2>
        <p>Tell us when you are available and a little about your IELTS plan. Your booking request will be prepared for WhatsApp confirmation.</p>
        <div className="ielts-booking-promise">
          <article><span aria-hidden="true"><CalendarIcon /></span><div><strong>Pick a convenient slot</strong><small>Select your preferred date and time.</small></div></article>
          <article><span aria-hidden="true"><ProfileIcon /></span><div><strong>Share your current level</strong><small>Previous IELTS is helpful—not required.</small></div></article>
          <article><span aria-hidden="true"><WhatsAppIcon /></span><div><strong>Confirm on WhatsApp</strong><small>Polaris will verify final availability.</small></div></article>
        </div>
      </div>

      <div className="ielts-booking-card">
        <div className="ielts-booking-progress" aria-label={`Booking step ${step} of 2`}>
          <div className={step >= 1 ? "is-active" : ""}><span>{step > 1 ? "✓" : "01"}</span><p><strong>Demo slot</strong><small>Date and time</small></p></div>
          <i aria-hidden="true" />
          <div className={step >= 2 ? "is-active" : ""}><span>02</span><p><strong>Your details</strong><small>Profile and plan</small></p></div>
        </div>

        {step === 1 ? (
          <div className="ielts-schedule-step">
            <div className="ielts-form-heading"><span>STEP 01</span><h3>When would you like your demo?</h3><p>Select your preferred slot. The Polaris team will confirm availability on WhatsApp.</p></div>
            <div className="ielts-schedule-grid">
              <label><span>Preferred demo date</span><div className="ielts-date-input"><CalendarIcon /><input type="date" min={today} value={demoDate} onChange={(event) => setDemoDate(event.target.value)} /></div></label>
              <label><span>Preferred demo time</span><div className="ielts-date-input"><ClockIcon /><input type="time" value={demoTime} onChange={(event) => setDemoTime(event.target.value)} /></div></label>
            </div>
            {demoDate && demoTime ? <div className="ielts-slot-preview"><span aria-hidden="true">✓</span><p><small>Your preferred slot</small><strong>{formatDate(demoDate)} · {formatTime(demoTime)}</strong></p></div> : null}
            {error ? <p className="ielts-form-error" role="alert">{error}</p> : null}
            <button className="ielts-next-button" type="button" onClick={confirmSchedule}><span>Confirm date & continue</span><i aria-hidden="true">→</i></button>
          </div>
        ) : (
          <form className="ielts-details-step" onSubmit={submitBooking}>
            <div className="ielts-form-heading"><span>STEP 02</span><h3>Tell us about the student.</h3><p>We will use these details only to prepare your WhatsApp booking request.</p></div>
            <div className="ielts-student-grid">
              <label><span>Student full name</span><input type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter full name" /></label>
              <label><span>City</span><input type="text" autoComplete="address-level2" value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Lahore, Karachi" /></label>
            </div>

            <fieldset className="ielts-attempt-field">
              <legend>Have you taken IELTS before?</legend>
              <div>
                <label className={previousAttempt === "Yes" ? "is-selected" : ""}><input type="radio" name="previous-ielts" value="Yes" checked={previousAttempt === "Yes"} onChange={() => setPreviousAttempt("Yes")} /><span>Yes, I have</span><small>Share your previous result if available</small></label>
                <label className={previousAttempt === "No" ? "is-selected" : ""}><input type="radio" name="previous-ielts" value="No" checked={previousAttempt === "No"} onChange={() => { setPreviousAttempt("No"); setPreviousScore(""); }} /><span>No, first attempt</span><small>We will start from your current level</small></label>
              </div>
            </fieldset>

            {previousAttempt === "Yes" ? <label className="ielts-full-field"><span>Previous band/result <small>(optional)</small></span><input type="text" value={previousScore} onChange={(event) => setPreviousScore(event.target.value)} placeholder="e.g. Overall 6.0" /></label> : null}

            <label className="ielts-full-field"><span>When do you plan to appear for IELTS?</span><div className="ielts-date-input"><TargetIcon /><input type="date" min={demoDate || today} value={targetDate} onChange={(event) => setTargetDate(event.target.value)} /></div><small>An estimated date is fine if your test is not booked yet.</small></label>

            <div className="ielts-booking-review">
              <span aria-hidden="true"><CalendarIcon /></span><p><small>Demo request</small><strong>{formatDate(demoDate)} · {formatTime(demoTime)}</strong></p><button type="button" onClick={() => { setError(""); setStep(1); }}>Change</button>
            </div>
            {error ? <p className="ielts-form-error" role="alert">{error}</p> : null}
            <button className="ielts-whatsapp-submit" type="submit"><WhatsAppIcon /><span><strong>Confirm booking on WhatsApp</strong><small>Your details will be added automatically</small></span><i aria-hidden="true">↗</i></button>
            {whatsappUrl ? <p className="ielts-whatsapp-fallback">WhatsApp did not open? <a href={whatsappUrl} target="_blank" rel="noreferrer">Open booking request manually</a>.</p> : null}
          </form>
        )}
      </div>
    </section>
  );
}

function getLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "Not selected";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-PK", { weekday: "short", day: "numeric", month: "long", year: "numeric" }).format(new Date(year, month - 1, day));
}

function formatTime(value: string) {
  if (!value) return "Not selected";
  const [hour, minute] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-PK", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(2026, 0, 1, hour, minute));
}

function CalendarIcon() { return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 2v6M16 2v6M3 10h18" /></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>; }
function ProfileIcon() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7" /></svg>; }
function TargetIcon() { return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" /></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 32 32"><path d="M16 3a12.7 12.7 0 0 0-11 19.1L3.3 29l7-1.8A12.8 12.8 0 1 0 16 3Zm0 23.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.1 1.1 1.1-4-.3-.4A10.3 10.3 0 1 1 16 26Zm5.7-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.4 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.4.1.7-.1 1.8-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5Z" /></svg>; }
