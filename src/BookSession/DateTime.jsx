import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal } from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import "./BookSession.css";
import "./DateTime.css";

const AVAILABLE_DAYS = [14, 15, 16, 19, 20, 22, 23, 26, 27, 29, 30];
const MORNING_SLOTS = [{ time: "9:00 AM" }, { time: "10:00 AM" }];
const AFTERNOON_SLOTS = [{ time: "1:00 PM" }, { time: "2:00 PM" }, { time: "4:00 PM" }];

function buildMonth(year, month) {
  const cells = [];
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < first.getDay(); i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function DateTime() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(15);
  const [time, setTime] = useState(null);

  const weeks = useMemo(() => buildMonth(year, month), [year, month]);
  const canContinue = !!day && !!time;

  const summaryRows = [
    { label: "SERVICE", value: "Selected Service" },
    { label: "PSYCHOLOGIST", value: "Assigned" },
    { label: "DATE & TIME", value: time ? `Oct ${day}, ${time}` : "To be set" },
  ];

  return (
    <div className="tf">
      <Navbar />
      <main className="bs">
        <div className="container">
          <Reveal><StepRail current={1} /></Reveal>
          <div className="bs__grid" style={{ marginTop: 32 }}>
            <Reveal className="bs__main" delay={140}>
              <header className="bs__head"><h2>Pick a date &amp; time</h2></header>
              <div className="bs-datetime">
                <div className="bs-cal">
                  <div className="bs-cal__head">
                    <button className="bs-cal__nav" onClick={() => setMonth(m => m === 0 ? 11 : m - 1)}>‹</button>
                    <p className="bs-cal__month">{new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                    <button className="bs-cal__nav" onClick={() => setMonth(m => m === 11 ? 0 : m + 1)}>›</button>
                  </div>
                  <div className="bs-cal__grid">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="bs-cal__week">
                        {week.map((d, di) => {
                          if (!d) return <span key={di} className="bs-cal__empty" />;
                          const isAvail = AVAILABLE_DAYS.includes(d);
                          return (
                            <button key={di} disabled={!isAvail} className={`bs-cal__day ${isAvail ? "is-available" : ""} ${day === d ? "is-selected" : ""}`} onClick={() => setDay(d)}>
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bs-datetime__side">
                  <p className="bs-datetime__date">October {day}, {year}</p>
                  <div className="bs-slots">
                    <p className="bs-slots__title">MORNING</p>
                    <div className="bs-slots__grid">
                      {MORNING_SLOTS.map(s => <button key={s.time} className={`bs-slot ${time === s.time ? "is-selected" : ""}`} onClick={() => setTime(s.time)}>{s.time}</button>)}
                    </div>
                  </div>
                  <div className="bs-slots">
                    <p className="bs-slots__title">AFTERNOON</p>
                    <div className="bs-slots__grid">
                      {AFTERNOON_SLOTS.map(s => <button key={s.time} className={`bs-slot ${time === s.time ? "is-selected" : ""}`} onClick={() => setTime(s.time)}>{s.time}</button>)}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="bs__aside" delay={200}>
              <BookingSummary step={2} rows={summaryRows} ctaDisabled={!canContinue} onContinue={() => navigate("/book/info")} />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}