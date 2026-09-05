"use client";

import type { FormEvent } from "react";

export default function EnquiryForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const level = String(form.get("level") || "Not specified");
    const destination = String(form.get("destination") || "Not decided");
    const message = String(form.get("message") || "").trim();
    const text = [
      "Hello Polaris Overseas Education, I would like a free counselling session.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Study level: ${level}`,
      `Preferred destination: ${destination}`,
      message ? `Message: ${message}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/923416934362?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <span>ENQUIRY FORM</span>
        <strong>Start with a simple hello.</strong>
      </div>
      <label>
        Full name
        <input name="name" type="text" placeholder="Your name" required />
      </label>
      <label>
        WhatsApp number
        <input name="phone" type="tel" placeholder="e.g. +92 300 0000000" required />
      </label>
      <div className="form-row">
        <label>
          Study level
          <select name="level" defaultValue="">
            <option value="" disabled>Select level</option>
            <option>Foundation</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
            <option>Language course</option>
          </select>
        </label>
        <label>
          Destination
          <select name="destination" defaultValue="">
            <option value="" disabled>Select country</option>
            <option>Italy</option>
            <option>France</option>
            <option>Germany</option>
            <option>Türkiye</option>
            <option>China</option>
            <option>Not decided</option>
          </select>
        </label>
      </div>
      <label>
        Your question <small>(optional)</small>
        <textarea name="message" rows={3} placeholder="Tell us about your plans" />
      </label>
      <button type="submit">Continue on WhatsApp <span aria-hidden="true">↗</span></button>
      <p className="form-note">Your details are used only to respond to your enquiry.</p>
    </form>
  );
}
