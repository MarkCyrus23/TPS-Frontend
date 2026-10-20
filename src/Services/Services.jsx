import { Link } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo } from "../components/Layout";
import "./Services.css";

/* Where "Book now" goes. Matches Home's current booking anchor; point it at your real booking route later. */
const BOOK_TO = "/book";

/* ---------- Content (edit here, not in the markup) ---------- */
const SERVICES = [
  {
    id: "psychotherapy",
    name: "Psychotherapy / Counseling",
    title: "Psychotherapy / Counseling",
    hours: 1,
    label: "1-hour session",
    meta: "Online or in-person",
    text: "Individual talk therapy designed to build self-awareness, explore complex emotions, and develop healthy, lasting ways of coping with daily life.",
    goodFor: ["Anxiety", "Low mood", "Stress & burnout", "Relationships", "Grief"],
    steps: [
      "You talk through what's on your mind in a private, judgment-free space.",
      "Together we explore the patterns behind your thoughts, feelings, and reactions.",
      "You leave with practical coping skills you can use right away.",
    ],
  },
  {
    id: "aba",
    name: "ABA Therapy",
    title: "ABA Therapy",
    hours: 2,
    label: "2-hour session",
    meta: "Intensive · For children · Parents involved",
    text: "Structured, play-based sessions using Applied Behavior Analysis. We focus on building skills step by step with positive reinforcement in a warm, encouraging space.",
    goodFor: ["Autism", "Developmental delays", "Communication", "Social skills", "Daily routines"],
    steps: [
      "Goals are set around your child's needs, strengths, and pace.",
      "Skills are built through play, practice, and positive reinforcement.",
      "Parents are guided on how to carry progress over to home.",
    ],
  },
  {
    id: "assessment",
    name: "Assessment & Consultation",
    title: "Assessment & Consultation",
    hours: 1,
    label: "1-hour session",
    meta: "Comprehensive review · Adults & children",
    text: "A thorough review and structured interview that gives you a clear picture of what's going on, along with recommendations tailored to you or your child.",
    goodFor: ["Not sure where to start", "Seeking clarity", "Learning concerns", "Behavior concerns", "Next-step guidance"],
    /* Copy mirrors the Figma file; swap in assessment-specific steps when the client sends them. */
    steps: [
      "You talk through what's on your mind in a private, judgment-free space.",
      "Together we explore the patterns behind your thoughts, feelings, and reactions.",
      "You leave with practical coping skills you can use right away.",
    ],
  },
];

/* ---------- Small pieces ---------- */
const Arrow = ({ dir = "right" }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={dir === "down" ? { transform: "rotate(90deg)" } : undefined}>
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

function Glance() {
  return (
    <aside className="sv-glance" aria-labelledby="sv-glance-title">
      <h2 id="sv-glance-title">At a glance</h2>
      <p>Tap a service to see what's included before you book.</p>
      <ul>
        {SERVICES.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="sv-glance__row">
              <span className="sv-glance__text">
                <b>{s.name}</b>
                <small>See what's included &amp; how it works</small>
              </span>
              <span className="sv-glance__time">{s.hours} hr</span>
              <span className="sv-glance__go"><Arrow /></span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Service({ s }) {
  return (
    <Reveal className="sv-wrap">
      <section className="sv" id={s.id} aria-labelledby={`${s.id}-title`}>
        <div className="sv__main">
          <div className="sv__head">
            <span className="sv__badge" aria-hidden="true">
              <b>{s.hours}</b><i>hr</i>
            </span>
            <p className="sv__meta">
              <span>{s.label}</span>
              <small>{s.meta}</small>
            </p>
          </div>
          <h2 id={`${s.id}-title`}>{s.title}</h2>
          <p className="sv__text">{s.text}</p>
          <div className="sv__actions">
            <Link to={BOOK_TO} className="btn btn--solid">Book now</Link>
            <Link to="/#contact" className="link-soft">Ask a question</Link>
          </div>
        </div>

        <div className="sv__panel">
          <h3 className="sv__label">Good for</h3>
          <ul className="tags">
            {s.goodFor.map((t) => <li key={t}>{t}</li>)}
          </ul>

          <h3 className="sv__label">What happens</h3>
          <ol className="sv__steps">
            {s.steps.map((t) => <li key={t}>{t}</li>)}
          </ol>
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- Page ---------- */
export default function Services() {
  return (
    <div className="tf">
      <Navbar />
      <main>
        <header className="sv-intro">
          {/* Optional: export the tree art from Figma as ONE png to /public/img/tree.png */}
          <Photo src="/img/tree.png" className="sv-intro__tree" />
          <div className="container sv-intro__grid">
            <div className="sv-intro__copy">
              <p className="eyebrow">OUR SERVICES</p>
              <h1>Care that fits <em>what you need.</em></h1>
              <p className="sv-intro__lead">
                Three clear ways we can support you. Every session is private, paced by you, and led by a qualified specialist.
              </p>
              <a href="#psychotherapy" className="sv-scroll">
                <span className="sv-scroll__dot"><Arrow dir="down" /></span>
                Scroll to explore each service
              </a>
            </div>
            <Glance />
          </div>
        </header>

        <div className="container sv-list">
          {SERVICES.map((s) => <Service key={s.id} s={s} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}