import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";

const SERVICES = [
  { id: "psychotherapy", name: "Psychotherapy", hours: 1 },
  { id: "aba", name: "ABA Therapy", hours: 2 },
  { id: "assessment", name: "Assessment", hours: 1 },
];

const DOCTORS = {
  psychotherapy: [
    { id: "maria", name: "Dr. Maria Santos", role: "Clinical Psychologist", photo: "/img/cartoon-female-psychologist-portrait-2.png" },
    { id: "juan", name: "Dr. Juan Dela Cruz", role: "Psychotherapist", photo: "/img/cartoon-male-psychologist.png" },
  ],
  aba: [],
  assessment: [],
};

function AvatarFallback() {
  return <div className="bs-avatar-fallback"><span className="bs-avatar-fallback__head" /><span className="bs-avatar-fallback__body" /></div>;
}

export default function BookSession() {
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const handleServiceSelect = (id) => {
    setService(id);
    setDoctor(null); 
  };

  const summaryRows = [
    { label: "SERVICE", value: SERVICES.find(s => s.id === service)?.name || "To be set" },
    { label: "PSYCHOLOGIST", value: doctor ? DOCTORS.psychotherapy.find(d => d.id === doctor)?.name : (service === "psychotherapy" ? "To be set" : "Auto-assigned") },
    { label: "DATE & TIME", value: "To be set" },
  ];

  const canContinue = service && (service !== "psychotherapy" || doctor);

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal>
            <p className="eyebrow">BOOK A SESSION</p>
            <h1 className="bs__title">Let's find a time <em>that works for you.</em></h1>
          </Reveal>
          <Reveal delay={80}><StepRail current={0} /></Reveal>

          <div className="bs__grid">
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head">
                <h2>Choose a service</h2>
                <p>Select the type of session you'd like to book.</p>
              </header>

              <div className="bs-tabs">
                {SERVICES.map((s) => (
                  <button key={s.id} className={`bs-tab ${service === s.id ? "is-active" : ""}`} onClick={() => handleServiceSelect(s.id)}>
                    {s.name}
                  </button>
                ))}
              </div>

              {service && (
                <div style={{ marginTop: "24px" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>
                    {service === "psychotherapy" ? "Select a Psychologist" : "Psychologist Assignment"}
                  </h3>
                  {service === "psychotherapy" ? (
                    <ul className="bs-people">
                      {DOCTORS.psychotherapy.map((p) => (
                        <li key={p.id}>
                          <button className={`bs-person ${doctor === p.id ? "is-selected" : ""}`} onClick={() => setDoctor(p.id)}>
                            <div className="bs-person__media">
                              <Photo src={p.photo} alt={p.name} className="bs-person__photo" fallback={<AvatarFallback />} />
                            </div>
                            <div className="bs-person__body"><h3>{p.name}</h3><p className="bs-person__role">{p.role}</p></div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ background: "#f9fcfb", padding: "24px", borderRadius: "12px", border: "1px solid #4a9b8e", color: "#4a9b8e" }}>
                      <p>You don't need to choose a psychologist. We will automatically assign the best available specialist for your {SERVICES.find(s => s.id === service)?.name} session.</p>
                    </div>
                  )}
                </div>
              )}
            </Reveal>

            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={1} rows={summaryRows} ctaDisabled={!canContinue} onContinue={() => navigate("/book/date-time")} />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}