import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

/* ---- Demo credentials (presentation only) ---- */
const DEMO_USER = "admin";
const DEMO_PASS = "12345";

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="12" r="9" fill="#4a9b8e" opacity=".85" />
      <circle cx="12" cy="26" r="9" fill="#3d865b" opacity=".85" />
      <circle cx="28" cy="26" r="9" fill="#00a58a" opacity=".85" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

const PERKS = [
  "Personalised daily wellness check-ins",
  "Guided meditations & breathing exercises",
  "Private mood tracking & reflection journal",
];

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem("tf_user") || "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(() => !!localStorage.getItem("tf_user"));
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const fail = (msg) => {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  };

  const submit = (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setInfo("");
    if (!username.trim() || !password) return fail("Please enter your username and password.");

    setLoading(true);
    setTimeout(() => {
      const ok = username.trim().toLowerCase() === DEMO_USER && password === DEMO_PASS;
      if (!ok) {
        setLoading(false);
        return fail("Incorrect username or password.");
      }
      remember ? localStorage.setItem("tf_user", username.trim()) : localStorage.removeItem("tf_user");
      sessionStorage.setItem("tf_auth", "1");
      navigate("/");
    }, 700);
  };

  return (
    <div className="si">
      {/* ---------- Header ---------- */}
      <header className="si-nav">
        <div className="si-nav__inner">
          <Link to="/" className="si-brand" aria-label="Threefold home">
            <Logo />
            <span>
              <strong>THREEFOLD</strong>
              <small>Behavioral Interventions And Psychological Services</small>
            </span>
          </Link>
          <nav className="si-nav__links" aria-label="Primary">
            <Link to="/">Home</Link>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#how">Book Session</a>
            <a href="/#contact">Contact</a>
          </nav>
          <div className="si-nav__cta">
            <Link to="/signin" className="si-btn si-btn--ghost">Sign Up</Link>
            <Link to="/signin" className="si-btn si-btn--solid">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ---------- Main ---------- */}
      <main className="si-main">
        <span className="orb orb--1" /><span className="orb orb--2" /><span className="orb orb--3" />

        <div className="si-grid">
          <section className="si-welcome">
            <div className="si-welcome__brand">
              <Logo size={42} />
              <span><strong>THREEFOLD</strong><small>Behavioral Interventions And Psychological Services</small></span>
            </div>
            <h1>
              <b>Welcome back to</b>
              <em>Threefold</em>
            </h1>
            <p>
              Sign in to access your appointments, connect with your specialist, and continue your path
              to mental wellness.
            </p>
            <ul>
              {PERKS.map((p) => (
                <li key={p}><i />{p}</li>
              ))}
            </ul>
          </section>

          <section className="si-card" aria-labelledby="si-title">
            <h2 id="si-title">Sign In</h2>
            <p className="si-card__sub">Enter your credentials to continue</p>

            <form onSubmit={submit} noValidate className={shaking ? "is-shaking" : ""}>
              <label className="field">
                <span>USERNAME</span>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); setInfo(""); }}
                  aria-invalid={!!error}
                />
              </label>

              <label className="field">
                <span>PASSWORD</span>
                <div className="field__pw">
                  <input
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); setInfo(""); }}
                    aria-invalid={!!error}
                  />
                  <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
                    <EyeIcon off={show} />
                  </button>
                </div>
              </label>

              <div className="row">
                <label className="check">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <span>Remember me</span>
                </label>
                <button type="button" className="link" onClick={() => { setError(""); setInfo("Password reset is not available in this demo."); }}>
                  Forgot password?
                </button>
              </div>

              <p className={`si-msg ${error || info ? "is-on" : ""} ${error ? "is-error" : "is-info"}`} role="alert">{error || info}</p>

              <button type="submit" className="si-submit" disabled={loading}>
                {loading ? <i className="spin" aria-label="Signing in" /> : "Sign in"}
              </button>
            </form>

            <div className="or"><span>OR</span></div>

            <button type="button" className="google" onClick={() => { setError(""); setInfo("Google sign-in is not available in this demo."); }}>
              <GoogleIcon /> Continue with Google
            </button>

            <p className="si-card__new">
              New to Threefold? <button type="button" className="link link--bold">Create a free account</button>
            </p>
          </section>
        </div>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="si-footer">
        <div className="si-footer__grid">
          <div>
            <div className="si-brand si-brand--light"><Logo /><strong>THREEFOLD</strong></div>
            <p>Bridging the gap between you and the mental clarity you deserve. Available anytime, anywhere.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul><li>Psychotherapy/Counseling</li><li>ABA Therapy</li><li>Assessment Consultation</li></ul>
          </div>
          <div>
            <h4>Threefold</h4>
            <ul><li>Home</li><li>About</li><li>Services</li><li>Book Session</li><li>Contact</li></ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul><li>Help Center</li><li>Book a Session</li><li>Contact us</li><li>Site map</li></ul>
          </div>
        </div>
        <div className="si-footer__bar">
          <p>© 2026 Threefold. All rights reserved. Made with 💚 for mental wellness.</p>
          <p>Privacy Policy · Terms of Service · Cookie Policy</p>
        </div>
      </footer>
    </div>
  );
}