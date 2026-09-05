import type { Metadata } from "next";
import { InnerPage } from "../page-chrome";
import IeltsBookingForm from "./ielts-booking-form";

export const metadata: Metadata = {
  title: "Book a Free IELTS Demo",
  description: "Choose an IELTS demo class date and time, share your preparation goals and confirm your booking with Polaris Overseas Education on WhatsApp.",
};

export default function BookIeltsDemoPage() {
  return (
    <InnerPage>
      <section className="ielts-booking-hero">
        <div className="ielts-booking-hero-stars" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span /> IELTS preparation</p>
          <h1>Start with a demo.<br /><em>Build your band.</em></h1>
          <p>Choose a convenient date and time, tell us your IELTS goal and send one complete booking request to Polaris.</p>
          <a href="#ielts-booking-form">Book your free demo <span aria-hidden="true">↓</span></a>
        </div>
        <aside>
          <span>FREE DEMO</span>
          <strong>4</strong>
          <h2>skills. One focused plan.</h2>
          <div><span>Listening</span><span>Reading</span><span>Writing</span><span>Speaking</span></div>
          <small>Final slot subject to confirmation</small>
        </aside>
      </section>
      <IeltsBookingForm />
    </InnerPage>
  );
}

