import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./Approval.css";

const PSYCHOLOGIST = "Dr. Maria Santos";

export default function Approval() {
  const navigate = useNavigate();

  const summaryRows = [
    { label: "SESSION", value: "Psychotherapy / Counseling" },
    { label: "PSYCHOLOGIST", value: PSYCHOLOGIST },
    { label: "DATE & TIME", value: "Thu, Oct 15 · 9:00 AM" },
  ];

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal>
            <p className="eyebrow">BOOK A SESSION</p>
            <h1 className="bs__title">Let's find a time <em>that works for you.</em></h1>
          </Reveal>
          <Reveal delay={80}><StepRail current={4} /></Reveal>

          <div className="bs__grid">
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head bs-approval__header">
                <div>
                  <h2>Confirm your appointment</h2>
                  <p>Please review your schedule. Your slot is temporarily held.</p>
                </div>
                <span className="bs-badge bs-badge--pending">Payment Required</span>
              </header>

              <div className="bs-status-card">
                <Photo src="/img/cartoon-female-psychologist-portrait.png" alt={PSYCHOLOGIST} className="bs-status-card__photo" fallback={<div className="bs-status-card__photo-fallback" />} />

                <div className="bs-timeline">
                  <div className="bs-timeline__item is-done">
                    <div className="bs-timeline__marker">✓</div>
                    <div className="bs-timeline__content">
                      <h4>Request sent</h4>
                      <p>Review complete</p>
                    </div>
                  </div>
                  <div className="bs-timeline__line" />

                  <div className="bs-timeline__item is-active">
                    <div className="bs-timeline__marker"><span className="bs-timeline__pulse" />₱</div>
                    <div className="bs-timeline__content">
                      <div className="bs-timeline__title-row">
                        <h4>Payment Required</h4>
                        <span className="bs-badge bs-badge--warning">Pending</span>
                      </div>
                      <p>Complete payment to finalize your booking.</p>
                    </div>
                  </div>
                  <div className="bs-timeline__line" />

                  <div className="bs-timeline__item is-locked">
                    <div className="bs-timeline__marker">🔒</div>
                    <div className="bs-timeline__content">
                      <h4>Confirmed</h4>
                      <p>Your appointment will be fully secured.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bs-nav">
                <Link to="/book/review" className="btn btn--ghost">Back</Link>
                <button type="button" className="btn btn--solid" onClick={() => navigate("/book/payment")}>
                  Proceed to Payment
                </button>
              </div>
            </Reveal>

            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={5} rows={summaryRows} />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}