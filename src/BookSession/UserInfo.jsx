import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./UserInfo.css";

function Field({ id, label, hint, children, className = "" }) {
  return (
    <div className={`bs-field ${className}`}>
      <label htmlFor={id} className="bs-field__label">{label}{hint && <span className="bs-field__hint">{hint}</span>}</label>
      {children}
    </div>
  );
}

export default function UserInfo() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyMobile, setEmergencyMobile] = useState("");
  const [agreed, setAgreed] = useState(false);

  const canContinue = fullName.length > 2 && email.includes("@") && mobile.length > 5 && emergencyName.length > 2 && emergencyMobile.length > 5 && agreed;

  const summaryRows = [
    { label: "SERVICE", value: "Selected Service" },
    { label: "PSYCHOLOGIST", value: "Assigned" },
    { label: "DATE & TIME", value: "Thu, Oct 15 · 9:00 AM" },
  ];

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal><StepRail current={2} /></Reveal>
          <div className="bs__grid" style={{ marginTop: 32 }}>
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head"><h2>Tell us about you</h2></header>
              <form className="bs-form" onSubmit={(e) => { e.preventDefault(); if (canContinue) navigate("/book/review"); }}>
                <p className="bs-form__section">ABOUT YOU</p>
                <div className="bs-form__row">
                  <Field id="fullName" label="Full name"><input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /></Field>
                  <Field id="birthdate" label="Birthdate"><input id="birthdate" type="date" /></Field>
                </div>

                <p className="bs-form__section">HOW TO REACH YOU</p>
                <div className="bs-form__row">
                  <Field id="email" label="Email"><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
                  <Field id="mobile" label="Mobile number"><input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} /></Field>
                </div>

                <p className="bs-form__section">EMERGENCY CONTACT</p>
                <div className="bs-form__row">
                  <Field id="emName" label="Contact Name"><input id="emName" type="text" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} /></Field>
                  <Field id="emMobile" label="Contact Number"><input id="emMobile" type="tel" value={emergencyMobile} onChange={(e) => setEmergencyMobile(e.target.value)} /></Field>
                </div>

                <label className="bs-consent">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  <span>I agree to the processing of my personal information in line with the Data Privacy Act.</span>
                </label>

                <div className="bs-nav">
                  <Link to="/book/date-time" className="btn btn--ghost">Back</Link>
                  <button type="submit" className="btn btn--solid" disabled={!canContinue}>Continue</button>
                </div>
              </form>
            </Reveal>
            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={3} rows={summaryRows} ctaDisabled={!canContinue} onContinue={() => navigate("/book/review")} />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}