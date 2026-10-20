import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./Review.css";
import "./Payment.css";

const PSYCHOLOGIST = "Dr. Maria Santos";
const FEE = 1500;

const PAYMENT_METHODS = [
  { id: "gcash", letter: "G", title: "GCash", sub: "Pay with your GCash wallet" },
  { id: "maya", letter: "M", title: "MayaPay", sub: "Pay with your MayaPay wallet" },
];

function ReviewCard({ title, editTo, rows }) {
  return (
    <section className="rv-card">
      <header className="rv-card__head">
        <p className="rv-card__eyebrow">{title}</p>
        <Link to={editTo} className="rv-card__edit">Edit</Link>
      </header>
      <dl className="rv-card__rows">
        {rows.map((r) => (
          <div key={r.label} className="rv-card__row"><dt>{r.label}</dt><dd>{r.value}</dd></div>
        ))}
      </dl>
    </section>
  );
}

export default function ReviewAndPay() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("gcash");
  const [type, setType] = useState("full"); 
  const [gNumber, setGNumber] = useState("");
  const [refNum, setRefNum] = useState("");
  const [receipt, setReceipt] = useState(null);

  const amountToPay = type === "full" ? FEE : FEE / 2;
  const isFormValid = gNumber.length > 5 && refNum.length > 5 && receipt !== null;

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
          <Reveal><StepRail current={3} /></Reveal>
          <div className="bs__grid" style={{ marginTop: 32 }}>
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head">
                <h2>Review &amp; Complete Payment</h2>
                <p>Check your details and pay to secure your appointment.</p>
              </header>

              <div className="rv-stack" style={{ marginBottom: 32 }}>
                <ReviewCard title="SCHEDULE" editTo="/book/date-time" rows={[{ label: "Date", value: "Thursday, October 15, 2026" }, { label: "Time", value: "9:00 AM – 10:00 AM" }]} />
                <ReviewCard title="SESSION" editTo="/book" rows={[{ label: "Service", value: "Psychotherapy" }, { label: "Psychologist", value: PSYCHOLOGIST }]} />
                <ReviewCard title="YOUR DETAILS" editTo="/book/info" rows={[{ label: "Name", value: "Client Name" }, { label: "Email", value: "client@gmail.com" }]} />
              </div>

              <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Select Payment Option</h3>
              <div className="pm-options" style={{ marginBottom: 24 }}>
                <button className={`pm-option ${type === "down" ? "is-selected" : ""}`} onClick={() => setType("down")}>
                  <span className="pm-radio" /> Downpayment <span className="pm-amount">50%</span>
                </button>
                <button className={`pm-option ${type === "full" ? "is-selected" : ""}`} onClick={() => setType("full")}>
                  <span className="pm-radio" /> Full Payment
                </button>
              </div>

              <div className="pm-pay-area">
                <div className="pm-qr-card">
                  <div className="pm-qr-card__head"><span>GCash</span><strong>₱{amountToPay.toLocaleString()}</strong></div>
                  <div className="pm-qr-card__qr">
                    <div className="pm-qr-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></div>
                  </div>
                  <div className="pm-qr-card__details">
                    <div><small>Account name</small><span>Threefold</span></div>
                    <div><small>GCash number</small><span>0917 000 0000</span></div>
                  </div>
                </div>

                <div className="pm-form">
                  <div className="pm-inputs">
                    <label>Your GCash number<input type="tel" value={gNumber} onChange={(e) => setGNumber(e.target.value)} /></label>
                    <label>GCash Reference no.<input type="text" value={refNum} onChange={(e) => setRefNum(e.target.value)} /></label>
                  </div>
                  <label className={`pm-upload ${receipt ? "has-file" : ""}`}>
                    <input type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files[0])} hidden />
                    <div className="pm-upload__icon">↑</div>
                    <strong>{receipt ? receipt.name : "Upload your payment screenshot"}</strong>
                  </label>
                </div>
              </div>

              <div className="bs-nav">
                <Link to="/book/info" className="btn btn--ghost">Back</Link>
                <button className="btn btn--solid" disabled={!isFormValid} onClick={() => navigate("/book/confirmation")}>
                  Pay & Book Appointment
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