import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Navbar, Footer, Reveal, SectionHead, Photo } from "../components/Layout";

/* ---------- Built-in graphics (no image files needed) ---------- */
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="12" r="9" fill="#4a9b8e" opacity=".85" />
      <circle cx="12" cy="26" r="9" fill="#3d865b" opacity=".85" />
      <circle cx="28" cy="26" r="9" fill="#00a58a" opacity=".85" />
    </svg>
  );
}

const ICONS = {
  select: <><rect x="14" y="10" width="36" height="46" rx="5" /><path d="M24 24h16M24 34h16M24 44h10" /></>,
  calendar: <><rect x="10" y="14" width="44" height="40" rx="5" /><path d="M10 26h44M22 8v10M42 8v10" /></>,
  connect: <><circle cx="24" cy="24" r="8" /><circle cx="42" cy="28" r="6" /><path d="M10 52c0-9 6-15 14-15s14 6 14 15M38 40c8 0 14 4 16 12" /></>,
  sprout: <><path d="M32 56V30" /><path d="M32 34c0-10-7-16-18-16 0 10 7 16 18 16zM32 28c0-9 6-14 16-14 0 9-6 14-16 14z" /></>,
  chat: <><path d="M10 14h44v28H30l-12 10V42h-8z" /><path d="M32 36s-10-6-10-12a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 12-10 12z" /></>,
  blocks: <><rect x="10" y="32" width="20" height="20" rx="3" /><rect x="34" y="32" width="20" height="20" rx="3" /><rect x="22" y="10" width="20" height="20" rx="3" /></>,
  check: <><rect x="14" y="10" width="36" height="46" rx="5" /><path d="M24 34l6 6 11-13" /></>,
};

function Icon({ name, size = 64 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const LeafVine = ({ className }) => (
  <svg className={`deco-vine ${className}`} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 C50 50 10 100 10 150 C10 180 30 200 50 200" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M30 40 Q50 30 60 50 Q40 60 30 40" fill="#2a6a53" opacity="0.8" />
    <path d="M15 90 Q35 70 45 90 Q25 110 15 90" fill="#2a6a53" opacity="0.8" />
    <path d="M20 140 Q40 130 50 150 Q30 160 20 140" fill="#2a6a53" opacity="0.8" />
    <path d="M60 70 Q80 50 90 70 Q70 90 60 70" fill="#2a6a53" opacity="0.6" />
    <path d="M40 180 Q60 170 70 190 Q50 200 40 180" fill="#2a6a53" opacity="0.6" />
  </svg>
);

const HeadIcon = ({ className }) => (
  <svg className={`deco-head ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 20 C130 20 160 50 160 90 C160 120 140 140 120 150 C110 155 100 170 90 170 C80 170 70 160 70 150 C70 140 80 130 90 130 C100 130 110 120 110 110 C110 100 100 90 90 90 C80 90 70 100 60 100 C50 100 40 90 40 80 C40 50 70 20 100 20 Z" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M120 80 C130 80 140 90 140 100" stroke="#2a6a53" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M80 110 C85 115 90 120 100 120" stroke="#2a6a53" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M150 120 Q170 120 180 140 Q170 160 150 160" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M160 130 Q175 130 185 140" stroke="#2a6a53" strokeWidth="1.5" />
  </svg>
);

const FloatingDots = ({ className }) => (
  <svg className={`deco-dots ${className}`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="3" fill="#4a9b8e" opacity="0.6" />
    <circle cx="25" cy="5" r="2" fill="#4a9b8e" opacity="0.4" />
    <circle cx="5" cy="25" r="2" fill="#4a9b8e" opacity="0.4" />
    <circle cx="40" cy="15" r="4" fill="#4a9b8e" opacity="0.7" />
    <circle cx="20" cy="40" r="3" fill="#4a9b8e" opacity="0.5" />
    <circle cx="45" cy="40" r="2" fill="#4a9b8e" opacity="0.6" />
  </svg>
);

function HeroArt() {
  const leaf = (x, y, r, c, s = 1) => (
    <path key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={c}
      d="M0 0C30-40 90-40 120 0 90 40 30 40 0 0z" />
  );
  return (
    <svg className="how__tree-img" viewBox="0 0 600 520" aria-hidden="true">
      <circle cx="400" cy="270" r="210" fill="#cfe4dc" opacity=".6" />
      <circle cx="470" cy="330" r="130" fill="#aac6b7" opacity=".55" />
      <path d="M300 520C300 380 330 260 420 120" stroke="#3d865b" strokeWidth="6" fill="none" strokeLinecap="round" />
      {leaf(312, 430, -40, "#6bbfaa")}
      {leaf(306, 360, -150, "#4a9b8e")}
      {leaf(330, 300, -35, "#3d865b", 1.1)}
      {leaf(340, 240, -155, "#7bb4ab")}
      {leaf(375, 190, -45, "#4a9b8e", 1.1)}
      {leaf(395, 140, -150, "#00a58a", .9)}
      {leaf(418, 118, -75, "#3d865b", .8)}
    </svg>
  );
}

/* ---------- Content ---------- */
const STEPS = [
  { icon: "select", title: "Select your service", text: "Explore and choose from our range of mental health services (Psychotherapy, Counseling, ABA Therapy, Assessment) that best fit your needs." },
  { icon: "calendar", title: "Choose your schedule", text: "Select a convenient date and time for your initial virtual or in-person appointment that works for you." },
  { icon: "connect", title: "Connect with a specialist", text: "Get matched with a licensed therapist or counselor who specializes in your specific area of concern." },
  { icon: "sprout", title: "Start your journey", text: "Attend your scheduled session (in-person or virtual) to begin your path to healing and resilience." },
];

const SERVICES = [
  { icon: "chat", photo: "service-1.png", meta: "1 Hour Session", title: "Psychotherapy & Counseling", text: "Individual talk therapy sessions designed to enhance self-awareness, explore complex emotions, build deep insight, and develop healthy, resilient coping mechanisms tailored for your daily life." },
  { icon: "blocks", photo: "service-2.png", meta: "2 Hour Intensive Session", title: "ABA Therapy", text: "Structured behavioral interventions applying Applied Behavior Analysis. We focus on intensive skill building, positive reinforcement, and the development of key life behaviors in a supportive, encouraging environment." },
  { icon: "check", photo: "service-3.png", meta: "1 Hour Comprehensive Review", title: "Assessment & Consultation", text: "A thorough initial review and diagnostic structured interview. This provides a holistic understanding of your unique mental health landscape, allowing us to recommend highly tailored, effective approaches just for you." },
];

const TEAM = [
  { name: "Dr. Maria Santos", role: "Clinical Psychologist", focus: "ABA Therapy", quote: "A safe space to understand yourself, heal, and grow at your own pace.", bio: "I believe that healing begins when you feel safe, heard, and understood. My goal is to provide a supportive space where you can explore your emotions, overcome challenges, and work toward a healthier and more balanced life.", tags: ["ABA Therapy", "Psychotherapy", "Counseling"] },
  { name: "Dr. Maria Santos", role: "Clinical Psychologist", focus: "Psychotherapy", quote: "A safe space to understand yourself, heal, and grow at your own pace.", bio: "I believe that healing begins when you feel safe, heard, and understood. My goal is to provide a supportive space where you can explore your emotions, overcome challenges, and work toward a healthier and more balanced life.", tags: ["ABA Therapy", "Psychotherapy", "Counseling"] },
  { name: "Dr. Maria Santos", role: "Clinical Psychologist", focus: "Counseling", quote: "A safe space to understand yourself, heal, and grow at your own pace.", bio: "I believe that healing begins when you feel safe, heard, and understood. My goal is to provide a supportive space where you can explore your emotions, overcome challenges, and work toward a healthier and more balanced life.", tags: ["ABA Therapy", "Psychotherapy", "Counseling"] },
];

const STORIES = [
  { who: "M.C", text: "I felt heard and understood without being judged. The sessions helped me understand my emotions better and gave me confidence in handling life's challenges." },
  { who: "M.C", text: "The experience made me feel comfortable opening up about things I usually keep to myself. I learned to be kinder to myself and take things one step at a time." },
  { who: "M.C", text: "I appreciate having a safe space where I can talk freely. The guidance helped me reflect on my experiences and find healthier ways to cope with stress." },
];

const FAQS = [
  { q: "Is everything I share confidential?", a: "Yes. Your sessions are private and handled according to professional ethics and applicable privacy laws. Limits to confidentiality are explained before your first session." },
  { q: "Do you offer online and in-person sessions?", a: "Yes. You can choose a virtual or an in-person appointment when you book." },
  { q: "How long is a session, and how many will I need?", a: "Sessions run 1 to 2 hours depending on the service. Your specialist will recommend a plan after your first session." },
  { q: "How do I reschedule or cancel?", a: "Open My appointments, pick the session, and choose a new time or cancel. Please do so in advance when possible." },
  { q: "What if I don't feel like it's the right fit?", a: "That's okay. You can ask to be matched with a different specialist at any time." },
  { q: "Can children and teens be seen?", a: "Yes. Our ABA Therapy and counseling services support children and teens, with parents or guardians involved." },
];

/* ---------- Sections ---------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">A SAFE SPACE FOR WELL-BEING</p>
          <h1>
            Professional support for every step of <em>your journey</em>.
          </h1>
          <p className="hero__lead">
            Access compassionate mental health services, professional counseling, therapy, and
            assessment consultation in a safe and supportive environment.
          </p>
          <div className="hero__actions">
            <Link to="/book" className="btn btn--solid btn--lg">Book an Appointment</Link>
            <a href="#how" className="link-soft">Learn how it works</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how" id="how">
      {/* The tree wrapper overlaps the sections */}
      <div className="how__tree-wrapper">
        <Photo src="/img/tree.png" className="how__tree-img" fallback={<HeroArt />} />
      </div>
      
      <LeafVine className="how__vine" />
      <div className="container">
        <Reveal>
          <SectionHead
            align="left"
            eyebrow="HOW IT WORKS"
            title="Four steps toward feeling better"
            sub="From your initial check-in to your first session, we prioritize clarity and your comfort."
          />
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90} className="step-wrap">
                <article className="step">
                  <span className="step__num">{i + 1}</span>
                  <Icon name={s.icon} />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal>
          <SectionHead
            align="center"
            eyebrow="OUR SERVICES"
            title="Comprehensive Mental Health Care"
            sub="Focused care tailored to your unique journey toward clarity and growth."
          />
        </Reveal>
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} className={`service ${i % 2 ? "service--flip" : ""}`}>
            <div className="service__media">
              <div className="pebble" />
              <Photo src={`/img/${s.photo}`} className="service__photo" alt={s.title} fallback={<Icon name={s.icon} size={120} />} />
            </div>
            <div className="service__body">
              <p className="service__meta"><i />{s.meta}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const [i, setI] = useState(0);
  const p = TEAM[i];
  return (
    <section className="section team" id="about">
      <HeadIcon className="team__head-deco" />
      <FloatingDots className="team__dots" />
      <div className="container">
        <Reveal>
          <h2 className="team__title">The people <span>behind</span> your care</h2>
          <p className="team__sub">
            Licensed, experienced professionals who will listen first and guide you at a pace that feels right.
          </p>
        </Reveal>

        <div className="team__grid">
          <div className="avatar-lg" aria-hidden="true">
            <div className="avatar-lg__ring" />
            <div className="avatar-lg__disc"><i className="head" /><i className="body" /></div>
          </div>

          <div className="team__panel">
            <div className="chips" role="tablist" aria-label="Team members">
              {TEAM.map((t, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === i}
                  className={`chip ${idx === i ? "is-active" : ""}`}
                  onClick={() => setI(idx)}
                >
                  <span className="chip__avatar"><i /></span>
                  <span><b>{t.name}</b><small>{t.role}</small></span>
                </button>
              ))}
            </div>

            <div className="profile" key={i}>
              <p className="eyebrow">{p.role.toUpperCase()}</p>
              <h3>{p.name}</h3>
              <blockquote>{p.quote}</blockquote>
              <p className="profile__bio">{p.bio}</p>
              <p className="eyebrow">WORKS WITH</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => (x + d + STORIES.length) % STORIES.length);
  const s = STORIES[i];
  return (
    <section className="section stories">
      <div className="container stories__inner">
        <Reveal>
          <p className="eyebrow">STORIES</p>
          <h2>Words from people we've supported</h2>
        </Reveal>
        <figure className="story" key={i} aria-live="polite">
          <blockquote>“{s.text}”</blockquote>
          <figcaption>
            <span className="chip__avatar"><i /></span>
            <span><b>{s.who}</b><small>Client</small></span>
          </figcaption>
        </figure>
        <div className="pager">
          <button onClick={() => go(-1)} aria-label="Previous story">‹</button>
          <span>{i + 1} of {STORIES.length}</span>
          <button onClick={() => go(1)} aria-label="Next story">›</button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <LeafVine className="faq__vine-left" />
      <LeafVine className="faq__vine-right" />
      <div className="container faq__inner">
        <Reveal>
          <SectionHead align="center" eyebrow="FAQ" title="Frequently asked questions" />
        </Reveal>
        <div className="faq__list">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-${idx}`}
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                >
                  <span>{f.q}</span>
                  <i aria-hidden="true">+</i>
                </button>
                <div className="faq__panel" id={`faq-${idx}`} role="region">
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="tf">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Team />
        <Stories />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}