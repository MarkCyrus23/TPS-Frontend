import { Link } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./Confirmation.css";

const PSYCHOLOGIST = "Dr. Maria Santos";

export default function Confirmation() {
  const summaryRows = [
    { label: "SERVICE", value: "Psychotherapy / Counseling" },
    { label: "PSYCHOLOGIST", value: PSYCHOLOGIST },
    { label: "DATE & TIME", value: "Thu, Oct 15 · 9:00 AM" },
  ];

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal><StepRail current={4} /></Reveal>
          <div className="bs__grid" style={{ marginTop: 32 }}>
            <Reveal className="bs__main" delay={140}>
              <header className="cf-head">
                <h2>Your session is booked</h2>
                <p>We've sent a confirmation to <strong>client@gmail.com</strong>. See you soon.</p>
              </header>

              <div className="cf-receipt">
                <div className="cf-receipt__row"><dt>Service</dt><dd>Psychotherapy / Counseling</dd></div>
                <div className="cf-receipt__row"><dt>Psychologist</dt><dd>{PSYCHOLOGIST}</dd></div>
                <div className="cf-receipt__row"><dt>When</dt><dd>Thursday, October 15, 2026<br/>9:00 AM – 10:00 AM</dd></div>
                <div className="cf-receipt__row"><dt>Status</dt><dd>Paid & Confirmed</dd></div>
                <div className="cf-receipt__row"><dt>Payment ref. no.</dt><dd>1234567890</dd></div>
              </div>

              <div className="cf-notes">
                <p>Come to <a href="#" className="cf-notes__link">16 Dr. Sixto Antonio Avenue, Kapasigan, Pasig</a>. Please arrive 10 minutes early.</p>
              </div>

              <div className="bs-nav cf-actions">
                <Link to="/" className="btn btn--ghost">Back to home</Link>
              </div>
            </Reveal>

            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={5} rows={summaryRows} status="Paid & Confirmed" />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}