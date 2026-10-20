import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo } from "../components/Layout";
import "./MyAppointments.css";

/* ---------- Data ---------- */
const NEXT_SESSION = {
  doctor: "Dr. Maria Santos",
  role: "Clinical Psychologist",
  service: "Psychotherapy / Counseling",
  date: "Thursday, October 15, 2026",
  time: "9:00 AM - 10:00 AM",
  format: "In-person",
  status: "Paid",
  month: "October",
  day: "15",
  weekday: "THU",
};

const UPCOMING_APPOINTMENTS = [
  {
    id: "1",
    service: "ABA Therapy",
    doctor: "Dr. Maria Santos · ABA Therapist",
    date: "Tue, Oct 20",
    time: "9:00 AM - 11:00 AM",
    format: "In-person",
    status: "Confirmed",
    message: "Your appointment is confirmed. We look forward to seeing you.",
  },
  {
    id: "2",
    service: "Assessment",
    doctor: "Dr. Juan Dela Cruz · Psychologist",
    date: "Fri, Oct 23",
    time: "1:00 PM - 2:00 PM",
    format: "Online",
    status: "Confirmed",
    message: "Your appointment is confirmed. The video link will be sent 15 minutes before.",
  }
];

/* ---------- Countdown Timer Component ---------- */
function Countdown() {
  return (
    <div className="ma-countdown">
      <div className="ma-countdown__box"><strong>1</strong><span>Days</span></div>
      <div className="ma-countdown__box"><strong>17</strong><span>Hours</span></div>
      <div className="ma-countdown__box"><strong>45</strong><span>Min</span></div>
      <div className="ma-countdown__box"><strong>01</strong><span>Sec</span></div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function MyAppointments() {
  const [tab, setTab] = useState("ongoing");

  return (
    <div className="tf">
      <Navbar />
      <main className="ma">
        <div className="container">
          
          {/* Header */}
          <Reveal>
            <div className="ma-header">
              <div>
                <p className="eyebrow">MY APPOINTMENTS</p>
                <h1 className="ma-title">
                  Hi, <em>Client.</em>
                </h1>
                <p className="ma-lead">Here's what's coming up, and how far you've come.</p>
              </div>
              <div className="ma-header__actions">
                <Link to="/book" className="btn btn--solid">Book a new Session</Link>
                <Link to="/contact" className="link-soft">Message the clinic</Link>
              </div>
            </div>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={60}>
            <div className="ma-tabs">
              <button
                className={`ma-tab ${tab === "ongoing" ? "is-active" : ""}`}
                onClick={() => setTab("ongoing")}
              >
                Ongoing <span className="ma-badge">3</span>
              </button>
              <button
                className={`ma-tab ${tab === "recent" ? "is-active" : ""}`}
                onClick={() => setTab("recent")}
              >
                Recent <span className="ma-badge ma-badge--outline">3</span>
              </button>
            </div>
          </Reveal>

          {/* Main Grid */}
          <div className="ma-grid">
            
            {/* Left Column (Sessions) */}
            <div className="ma-main">
              <Reveal delay={120}>
                <h2 className="ma-section-title">YOUR NEXT SESSION</h2>
                
                {/* Hero Card */}
                <div className="ma-hero">
                  <div className="ma-hero__date">
                    <span className="ma-hero__weekday">{NEXT_SESSION.weekday}</span>
                    <span className="ma-hero__month">{NEXT_SESSION.month}</span>
                    <span className="ma-hero__day">{NEXT_SESSION.day}</span>
                  </div>
                  
                  <div className="ma-hero__details">
                    <h3>{NEXT_SESSION.service}</h3>
                    <div className="ma-hero__doctor">
                      <Photo src="/img/image.png" className="ma-avatar" fallback={<div className="ma-avatar-fallback" />} />
                      <div>
                        <strong>{NEXT_SESSION.doctor}</strong>
                        <small>{NEXT_SESSION.role}</small>
                      </div>
                    </div>
                    <div className="ma-hero__meta">
                      <span className="ma-pill">🕒 {NEXT_SESSION.time}</span>
                      <span className="ma-pill">📍 {NEXT_SESSION.format}</span>
                      <span className="ma-pill ma-pill--success">💳 {NEXT_SESSION.status}</span>
                    </div>
                  </div>

                  <div className="ma-hero__actions">
                    <Countdown />
                    <Link to="/contact" className="btn btn--ghost" style={{ borderColor: '#fff', color: '#fff' }}>Message</Link>
                    <div className="ma-hero__links">
                      <button className="ma-link">Reschedule</button>
                      <button className="ma-link">Cancel</button>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div style={{ marginTop: "48px" }}>
                  <h2 className="ma-section-title">Other appointments &amp; upcoming</h2>
                  <p className="ma-section-sub">Sessions that are confirmed and scheduled.</p>
                  
                  <div className="ma-list">
                    {UPCOMING_APPOINTMENTS.map((apt) => (
                      <div key={apt.id} className="ma-card">
                        <div className="ma-card__head">
                          <Photo src="/img/cartoon-female-psychologist-portrait.png" className="ma-avatar" fallback={<div className="ma-avatar-fallback" />} />
                          <div className="ma-card__head-info">
                            <h4>{apt.service}</h4>
                            <p>{apt.doctor}</p>
                          </div>
                          <span className={`ma-status ${apt.status === "Confirmed" ? "is-accepted" : ""}`}>
                            {apt.status}
                          </span>
                        </div>
                        
                        <div className="ma-card__meta">
                          <div><span className="ma-meta-label">Date</span><strong>{apt.date}</strong></div>
                          <div><span className="ma-meta-label">Time</span><strong>{apt.time}</strong></div>
                          <div><span className="ma-meta-label">Format</span><strong>{apt.format}</strong></div>
                        </div>

                        <div className="ma-card__alert">
                          <p>{apt.message}</p>
                        </div>

                        <div className="ma-card__footer">
                          <div className="ma-card__links">
                            <button className="ma-link">View details</button>
                            <Link to="/contact" className="ma-link">Message</Link>
                            <button className="ma-link">Reschedule</button>
                            <button className="ma-link ma-link--danger">Cancel</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column (Sidebar) */}
            <Reveal className="ma-aside" delay={160}>
              
              {/* Stats Card */}
              <div className="ma-stats">
                <div className="ma-stats__main">
                  <h3>3</h3>
                  <p>Sessions completed</p>
                </div>
                <div className="ma-stats__sub">
                  <p>3 ongoing</p>
                </div>
              </div>

              {/* Action Cards */}
              <div className="ma-action-card">
                <h4>Need to change something?</h4>
                <p>Message your psychologist or our team and we'll sort it out together.</p>
                <Link to="/contact" className="btn btn--ghost" style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '12px' }}>Message</Link>
              </div>

              <div className="ma-action-card">
                <h4>Book another session</h4>
                <p>Pick a service, a psychologist, and a time that works for you.</p>
                <Link to="/book" className="btn btn--solid" style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '12px' }}>Book now</Link>
              </div>

            </Reveal>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}