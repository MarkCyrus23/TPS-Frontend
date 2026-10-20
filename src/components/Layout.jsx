import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Home/Home.css"; // shared design tokens, .tf scope, navbar, footer, buttons
import { NAV } from "./navConfig";

/* ---------- Built-in graphics ---------- */
export function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="12" r="9" fill="#4a9b8e" opacity=".85" />
      <circle cx="12" cy="26" r="9" fill="#3d865b" opacity=".85" />
      <circle cx="28" cy="26" r="9" fill="#00a58a" opacity=".85" />
    </svg>
  );
}

/* Shows /public/img/<file> if it exists, otherwise the fallback */
export function Photo({ src, fallback = null, className, alt = "" }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img className={className} src={src} alt={alt} onError={() => setOk(false)} />
  ) : (
    fallback
  );
}

/* Sign In link, or Sign Out once logged in (demo auth via sessionStorage) */
export function AuthButton({ className, onDone }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("tf_auth") === "1");
  if (authed) {
    return (
      <button
        className={className}
        onClick={() => {
          sessionStorage.removeItem("tf_auth");
          setAuthed(false);
          onDone?.();
        }}
      >
        Sign Out
      </button>
    );
  }
  return (
    <Link to="/signin" className={className} onClick={onDone}>
      Sign In
    </Link>
  );
}

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`} style={{ "--d": `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub, align = "center" }) {
  return (
    <header className={`sec-head sec-head--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </header>
  );
}

/* ---------- Navigation (works from any page) ---------- */
// "#x"  -> same-page anchor.   "/..." -> router link (hash handled by ScrollToHash)


function NavItem({ to, className, onClick, children }) {
  const { pathname } = useLocation();
  if (to.startsWith("#")) {
    return <a href={to} className={className} onClick={onClick}>{children}</a>;
  }
  const current = !to.includes("#") && pathname === to;
  return (
    <Link to={to} className={className} onClick={onClick} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}

/* Scrolls to #hash after a route change, or to top when there is none */
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <ScrollToHash />
      <div className="nav__inner">
        <Link to="/#top" className="brand" aria-label="Threefold home">
          <Photo src="/img/logo.png" className="brand__logo" fallback={<Logo />} />
          <span>
            <strong>THREEFOLD</strong>
            <small>Behavioral Interventions And Psychological Services</small>
          </span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {NAV.map((l) => (
            <NavItem key={l.label} to={l.to} onClick={close}>{l.label}</NavItem>
          ))}
          <NavItem to="/appointments" className="nav__appt" onClick={close}>My appointments</NavItem>
          <div className="nav__cta-mobile">
            <AuthButton className="btn btn--ghost" onDone={close} />
            <button className="btn btn--solid">Get Started</button>
          </div>
        </nav>

        <div className="nav__cta">
          <AuthButton className="btn btn--ghost btn--sm" />
          <button className="btn btn--solid btn--sm">Get Started</button>
        </div>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/#top" className="brand brand--light">
            <Photo src="/img/logo.png" className="brand__logo" fallback={<Logo />} />
            <strong>THREEFOLD</strong>
          </Link>
          <p>Bridging the gap between you and the mental clarity you deserve. Available anytime, anywhere.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><Link to="/services#psychotherapy">Psychotherapy/Counseling</Link></li>
            <li><Link to="/services#aba">ABA Therapy</Link></li>
            <li><Link to="/services#assessment">Assessment Consultation</Link></li>
          </ul>
        </div>
        <div>
          <h4>Threefold</h4>
          <ul>
            {NAV.map((l) => (
              <li key={l.label}><NavItem to={l.to}>{l.label}</NavItem></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            {["Help Center", "Book a Session", "Contact us", "Site map"].map((x) => (
              <li key={x}><a href="#contact">{x}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__bar">
        <p>© 2026 Threefold. All rights reserved. Made with 💚 for mental wellness.</p>
        <p className="footer__legal">
          <a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a><a href="#cookies">Cookie Policy</a>
        </p>
      </div>
    </footer>
  );
}