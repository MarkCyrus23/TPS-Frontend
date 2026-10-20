import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./Review.css";

const PSYCHOLOGIST = "Dr. Maria Santos";

const APPOINTMENT = {
  date: "Thursday, October 15, 2026",
  time: "9:00 AM – 10:00 AM",
  service: "Psychotherapy / Counseling",
  length: "1 hour",
  psychologist: `${PSYCHOLOGIST}, Clinical Psychologist`,
};

const CLIENT = {
  name: "Client Name",
  birthdate: "2004-09-10",
  email: "client@gmail.com",
  mobile: "09XX XXX XXXX",
  emergencyName: "Jane Dela Cruz",
  emergencyMobile: "09XX XXX XXXX",
};

function ReviewCard({ title, editTo, rows }) {
  return (
    <section className="rv-card">
      <header className="rv-card__head">
        <p className="rv-card__eyebrow">{title}</p>
        <Link to={editTo} className="rv-card__edit">Edit</Link>
      </header>
      <dl className="rv-card__rows">
        {rows.map((r) => (
          <div key={r.label} className="rv-card__row">
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function Review() {
  const navigate = useNavigate();

  const summaryRows = [
    { label: "SESSION", value: APPOINTMENT.service },
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
          <Reveal delay={80}><StepRail current={3} /></Reveal>

          <div className="bs__grid">
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head">
                <h2>Review &amp; send your appointment</h2>
                <p>Check that everything looks right. Your psychologist will review and accept your appointment first.</p>
              </header>

              <div className="rv-stack">
                <ReviewCard
                  title="SCHEDULE"
                  editTo="/book/date-time"
                  rows={[
                    { label: "Date", value: APPOINTMENT.date },
                    { label: "Time", value: APPOINTMENT.time },
                  ]}
                />
                <ReviewCard
                  title="SESSION"
                  editTo="/book"
                  rows={[
                    { label: "Service", value: APPOINTMENT.service },
                    { label: "Length", value: APPOINTMENT.length },
                    { label: "Psychologist", value: APPOINTMENT.psychologist },
                  ]}
                />
                <ReviewCard
                  title="YOUR DETAILS"
                  editTo="/book/info"
                  rows={[
                    { label: "Name", value: CLIENT.name },
                    { label: "Birthdate", value: CLIENT.birthdate },
                    { label: "Email", value: CLIENT.email },
                    { label: "Mobile", value: CLIENT.mobile },
                    { label: "Emergency Contact", value: `${CLIENT.emergencyName} (${CLIENT.emergencyMobile})` },
                  ]}
                />
              </div>

              <div className="bs-nav">
                <Link to="/book/info" className="btn btn--ghost">Back</Link>
                <button type="button" className="btn btn--solid" onClick={() => navigate("/book/approval")}>
                  Send appointment to {PSYCHOLOGIST}
                </button>
              </div>
            </Reveal>

            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={4} rows={summaryRows} />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}