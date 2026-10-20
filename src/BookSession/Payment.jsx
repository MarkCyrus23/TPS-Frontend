import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./Payment.css";

/* ---------- Content ---------- */
const PSYCHOLOGIST = "Dr. Maria Santos";
const FEE = 1500;

const PAYMENT_METHODS = [
  { id: "gcash", letter: "G", title: "GCash", sub: "Pay with your GCash wallet" },
  { id: "maya", letter: "M", title: "MayaPay", sub: "Pay with your MayaPay wallet" },
  { id: "card", letter: "C", title: "Credit / Debit card", sub: "Visa, Mastercard" },
  { id: "bank", letter: "B", title: "Online banking", sub: "Pay through your bank app" },
];

export default function Payment() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("gcash");
  const [type, setType] = useState("full"); // "down" or "full"
  const [gNumber, setGNumber] = useState("");
  const [refNum, setRefNum] = useState("");
  const [receipt, setReceipt] = useState(null);

  // In a real app, you'd pass this through context or route state
  const summaryRows = [
    { label: "SESSION", value: "Psychotherapy / Counseling" },
    { label: "PSYCHOLOGIST", value: PSYCHOLOGIST },
    { label: "DATE & TIME", value: "Thu, Oct 15 · 9:00 AM" },
  ];

  const amountToPay = type === "full" ? FEE : FEE / 2;
  
  // We only disable the button if BOTH text fields are completely empty.
  // (If we require the file, users can't test the flow without an image).
  const isFormValid = gNumber.trim().length > 0 && refNum.trim().length > 0;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setReceipt(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receipt) {
      alert("Please upload a payment screenshot to continue.");
      return;
    }
    navigate("/book/confirmation");
  };

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal>
            <p className="eyebrow">BOOK A SESSION</p>
            <h1 className="bs__title">
              Let's find a time <em>that works for you.</em>
            </h1>
            <p className="bs__lead">
              A few quick steps. You won't be charged until your psychologist accepts your request.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <StepRail current={5} />
          </Reveal>

          <div className="bs__grid">
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head">
                <h2>Complete your payment</h2>
                <p>Your appointment was accepted, pay ₱1,500 to confirm your session.</p>
              </header>

              {/* Payment Methods */}
              <div className="pm-grid">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`pm-card ${method === m.id ? "is-selected" : ""}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <div className="pm-card__icon">{m.letter}</div>
                    <div className="pm-card__text">
                      <strong>{m.title}</strong>
                      <small>{m.sub}</small>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Options */}
              <p className="pm-label">Select Payment Option</p>
              <div className="pm-options">
                <button
                  type="button"
                  className={`pm-option ${type === "down" ? "is-selected" : ""}`}
                  onClick={() => setType("down")}
                >
                  <span className="pm-radio" /> Downpayment <span className="pm-amount">50%</span>
                </button>
                <button
                  type="button"
                  className={`pm-option ${type === "full" ? "is-selected" : ""}`}
                  onClick={() => setType("full")}
                >
                  <span className="pm-radio" /> Full Payment
                </button>
              </div>

              <div className="pm-divider" />

              {/* GCash Instructions & Upload */}
              <div className="pm-pay-area">
                {/* Left Side: QR & Details */}
                <div className="pm-qr-card">
                  <div className="pm-qr-card__head">
                    <span>GCash</span>
                    <strong>₱{amountToPay.toLocaleString()}</strong>
                  </div>
                  <div className="pm-qr-card__qr">
                    {/* Placeholder for actual QR code */}
                    <div className="pm-qr-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </div>
                  </div>
                  <p className="pm-qr-card__hint">
                    Scan with the GCash app, or send to the number below
                  </p>
                  <div className="pm-qr-card__details">
                    <div>
                      <small>Account name</small>
                      <span>Threefold</span>
                    </div>
                    <div>
                      <small>GCash number</small>
                      <span>0917 000 0000</span>
                    </div>
                    <div>
                      <small>Amount to send</small>
                      <span>₱{amountToPay.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Steps & Form */}
                <div className="pm-form">
                  <ol className="pm-steps">
                    <li>
                      <span className="pm-step-num">1</span>
                      <p>Send ₱{amountToPay.toLocaleString()} to the GCash account on the left.</p>
                    </li>
                    <li>
                      <span className="pm-step-num">2</span>
                      <p>Screenshot your GCash receipt.</p>
                    </li>
                    <li>
                      <span className="pm-step-num">3</span>
                      <p>Upload it here with your reference number.</p>
                    </li>
                  </ol>

                  <div className="pm-inputs">
                    <label>
                      Your GCash number (the one you paid from)
                      <input
                        type="tel"
                        placeholder="09090000000"
                        value={gNumber}
                        onChange={(e) => setGNumber(e.target.value)}
                      />
                    </label>
                    <label>
                      GCash Reference no. (From your receipt)
                      <input
                        type="text"
                        placeholder="1234 567 890123"
                        value={refNum}
                        onChange={(e) => setRefNum(e.target.value)}
                      />
                    </label>
                  </div>

                  <p className="pm-label">Payment screenshot</p>
                  <label className={`pm-upload ${receipt ? "has-file" : ""}`}>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileUpload}
                      hidden
                    />
                    <div className="pm-upload__icon">↑</div>
                    <strong>{receipt ? receipt.name : "Upload your payment screenshot"}</strong>
                    {!receipt && <small>Tap to choose a photo, or drag it here PNG or JPG up to 5mb</small>}
                  </label>
                </div>
              </div>

              <div className="pm-footer">
                <p>Your slot is held while you complete this step.</p>
                <div className="bs-nav">
                  <Link to="/book/approval" className="btn btn--ghost">Back</Link>
                  
                  {/* Changed to onClick={handleSubmit} */}
                  <button
                    type="button"
                    className="btn btn--solid"
                    disabled={!isFormValid}
                    onClick={handleSubmit}
                  >
                    Submit Payment
                  </button>

                </div>
              </div>
            </Reveal>

            <Reveal className="bs__aside" delay={200}>
              <BookingSummary
                step={6}
                rows={summaryRows}
                ctaLabel=""
                status="Accepted"
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}