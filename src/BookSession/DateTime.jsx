import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal, container, btnGhost, btnSolid } from "../components/Layout";
import { PSYCHOLOGISTS } from "../data/clinic";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import { useBooking } from "./bookingContext";

const AVAILABLE_DAYS = [14, 15, 16, 19, 20, 22, 23, 26, 27, 29, 30];
const MORNING_SLOTS = ["9:00 AM", "10:00 AM"];
const AFTERNOON_SLOTS = ["1:00 PM", "2:00 PM", "4:00 PM"];
/** Mock already-booked slots: key = `${day}|${time}` or `${day}|${time}|${psychologistId}` */
const BOOKED_SLOTS = new Set([
  "15|9:00 AM",
  "15|9:00 AM|maria",
  "20|2:00 PM",
  "22|10:00 AM|juan",
  "14|4:00 PM",
]);
const SLOT_DOCTORS = {
  "9:00 AM": ["maria", "juan"],
  "10:00 AM": ["maria"],
  "1:00 PM": ["juan"],
  "2:00 PM": ["maria", "juan"],
  "4:00 PM": ["juan"],
};

function isSlotBooked(day, time, psychologistId) {
  if (!day || !time) return false;
  if (BOOKED_SLOTS.has(`${day}|${time}`)) return true;
  if (psychologistId && BOOKED_SLOTS.has(`${day}|${time}|${psychologistId}`)) return true;
  return false;
}

const pageShell = "font-sans text-black bg-tf-bg overflow-x-hidden antialiased";
const mainPad = "py-12 pb-24 max-[720px]:py-7 max-[720px]:pb-16 bg-tf-bg";
const gridClass =
  "grid grid-cols-[minmax(0,1fr)_320px] gap-7 mt-8 items-start max-[900px]:grid-cols-1";
const panelClass =
  "bg-white border border-black/[0.23] rounded-[21px] p-7 max-[720px]:p-5";

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

function SlotButton({ time, selected, unavailable, booked, onClick }) {
  const disabled = unavailable || booked;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={booked ? "Already booked" : undefined}
      className={[
        "h-[42px] rounded-lg border font-serif text-[0.9rem] grid place-items-center transition-[background,border-color,color] duration-150",
        disabled && "cursor-not-allowed border-[#e5ebe8] bg-[#f5f7f6] text-[#aab4ae] line-through",
        booked && !unavailable && "bg-[#eee] text-[#888] line-through decoration-[#888]",
        !disabled &&
          !selected &&
          "cursor-pointer bg-white border-black/14 text-[#202020] hover:border-tf-teal",
        selected && "bg-[#2c5743] border-[#2c5743] text-white no-underline",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {time}
    </button>
  );
}

export default function DateTime() {
  const navigate = useNavigate();
  const {
    booking,
    update,
    service,
    psychologist,
    summaryRows,
    feeLabel,
  } = useBooking();

  const today = new Date();
  const [year, setYear] = useState(booking.date?.year ?? today.getFullYear());
  const [month, setMonth] = useState(booking.date?.month ?? today.getMonth());
  const [day, setDay] = useState(booking.date?.day ?? null);
  const [time, setTime] = useState(booking.time);
  const isPsycho = booking.serviceId === "psychotherapy";
  const mode = isPsycho ? booking.bookingMode : "schedule-first";

  const weeks = useMemo(() => buildMonth(year, month), [year, month]);
  const availableForDay = day != null && AVAILABLE_DAYS.includes(day);
  const slotsForDay = availableForDay
    ? [...MORNING_SLOTS, ...AFTERNOON_SLOTS]
    : [];

  const schedulePsychologists =
    time && SLOT_DOCTORS[time]
      ? PSYCHOLOGISTS.filter((p) => SLOT_DOCTORS[time].includes(p.id))
      : [];

  const psychId = booking.psychologistId;
  const selectedBooked = isSlotBooked(day, time, psychId);
  const canContinue =
    !!day &&
    !!time &&
    availableForDay &&
    !selectedBooked &&
    (!isPsycho || !!psychId);

  const persistAndGo = () => {
    update({
      date: { year, month, day },
      time,
    });
    navigate("/book/info");
  };

  const selectDay = (d) => {
    setDay(d);
    setTime(null);
    if (mode === "schedule-first" && isPsycho) {
      update({ psychologistId: null });
    }
  };

  const selectTime = (t) => {
    setTime(t);
    if (mode === "schedule-first" && isPsycho) {
      update({ psychologistId: null });
    }
  };

  return (
    <div className={pageShell}>
      <Navbar />
      <main className={mainPad}>
        <div className={container}>
          <Reveal>
            <StepRail current={1} />
          </Reveal>
          <div className={gridClass}>
            <Reveal className={panelClass} delay={140}>
              <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                    Pick a date &amp; time
                  </h2>
                  <p className="m-0 text-sm text-[#666]">
                    {service?.name || "Service"}
                    {psychologist ? ` · ${psychologist.name}` : ""}
                  </p>
                </div>
                {isPsycho && (
                  <div className="inline-flex rounded-[11px] bg-tf-teal/19 p-1 gap-1">
                    {[
                      ["psychologist-first", "Psychologist first"],
                      ["schedule-first", "Schedule first"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        className={[
                          "border-0 rounded-lg py-2 px-3 font-serif text-[0.78rem] cursor-pointer transition-[background,color] duration-200",
                          mode === id
                            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] font-bold text-[#202020]"
                            : "bg-transparent text-[#202020]",
                        ].join(" ")}
                        onClick={() => update({ bookingMode: id })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </header>

              {isPsycho && mode === "psychologist-first" && !booking.psychologistId && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Select a psychologist on the previous step to view their available schedules.
                </div>
              )}

              {isPsycho && mode === "psychologist-first" && booking.psychologistId && (
                <p className="m-0 mt-4 text-sm text-tf-body">
                  Showing availability for <strong>{psychologist?.name}</strong>.
                </p>
              )}

              <div className="grid grid-cols-[380px_minmax(0,1fr)] gap-7 mt-5 items-start max-[900px]:grid-cols-1">
                <div className="bg-white border border-[#e8eeeb] rounded-[14px] px-4 pt-3.5 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-[#e8eeeb] bg-white text-[#1e4c40] text-[1.1rem] cursor-pointer grid place-items-center hover:bg-[#f3f8f6]"
                      onClick={() => {
                        if (month === 0) {
                          setYear((y) => y - 1);
                          setMonth(11);
                        } else setMonth((m) => m - 1);
                        setDay(null);
                        setTime(null);
                      }}
                    >
                      ‹
                    </button>
                    <p className="m-0 font-serif font-bold text-[#1e4c40] text-[1.1rem] text-center flex-1">
                      {new Date(year, month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-[#e8eeeb] bg-white text-[#1e4c40] text-[1.1rem] cursor-pointer grid place-items-center hover:bg-[#f3f8f6]"
                      onClick={() => {
                        if (month === 11) {
                          setYear((y) => y + 1);
                          setMonth(0);
                        } else setMonth((m) => m + 1);
                        setDay(null);
                        setTime(null);
                      }}
                    >
                      ›
                    </button>
                  </div>
                  <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[0.7rem] font-bold tracking-wide text-[#8a9690]">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-1.5">
                        {week.map((d, di) => {
                          if (!d) return <span key={di} className="aspect-square block" />;
                          const isAvail = AVAILABLE_DAYS.includes(d);
                          return (
                            <button
                              key={di}
                              type="button"
                              disabled={!isAvail}
                              className={[
                                "relative aspect-square rounded-[14px] border-0 font-sans font-medium text-[0.95rem] grid place-items-center transition-[background,color] duration-150",
                                !isAvail && "bg-white text-[#adb8b2] cursor-not-allowed",
                                isAvail &&
                                  day !== d &&
                                  "bg-[#f3f8f6] text-[#29353b] cursor-pointer hover:outline hover:outline-2 hover:outline-[#b6d2c4]",
                                day === d && "bg-[#1e4c40] text-white",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={() => selectDay(d)}
                            >
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-[0.7rem] text-[#666]">
                    <span className="inline-flex items-center gap-1.5">
                      <i className="size-2.5 rounded-sm bg-[#f3f8f6] border border-[#c5d8ce] not-italic" /> Available
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="size-2.5 rounded-sm bg-white border border-[#e5ebe8] not-italic" /> Unavailable
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="size-2.5 rounded-sm bg-[#eee] not-italic" /> Booked
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="size-2.5 rounded-sm bg-[#1e4c40] not-italic" /> Selected
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  {!day && (
                    <div className="rounded-xl border border-dashed border-[#b6d2c4] bg-[#f9fcfb] px-5 py-10 text-center">
                      <p className="m-0 font-serif text-base text-[#3d5c52]">Select a date</p>
                      <p className="m-0 mt-1 text-sm text-[#666]">
                        Available days are highlighted on the calendar.
                      </p>
                    </div>
                  )}

                  {day && !availableForDay && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-8 text-center text-sm text-amber-900">
                      No schedule is available on this date. Please choose another day.
                    </div>
                  )}

                  {day && availableForDay && (
                    <>
                      <p className="m-0 mb-1 font-serif text-[1.15rem] text-[#202020]">
                        {new Date(year, month, day).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {slotsForDay.length === 0 ? (
                        <p className="mt-4 text-sm text-[#666]">No time slots available.</p>
                      ) : (
                        <>
                          <div className="mt-4">
                            <p className="m-0 mb-2 font-serif font-bold text-[#666] text-[0.72rem] tracking-[0.1em]">
                              MORNING
                            </p>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5 max-[720px]:grid-cols-2">
                              {MORNING_SLOTS.map((t) => {
                                const booked = isSlotBooked(day, t, mode === "psychologist-first" ? psychId : null);
                                return (
                                  <SlotButton
                                    key={t}
                                    time={t}
                                    selected={time === t}
                                    booked={booked}
                                    onClick={() => selectTime(t)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="m-0 mb-2 font-serif font-bold text-[#666] text-[0.72rem] tracking-[0.1em]">
                              AFTERNOON
                            </p>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5 max-[720px]:grid-cols-2">
                              {AFTERNOON_SLOTS.map((t) => {
                                const booked = isSlotBooked(day, t, mode === "psychologist-first" ? psychId : null);
                                return (
                                  <SlotButton
                                    key={t}
                                    time={t}
                                    selected={time === t}
                                    booked={booked}
                                    onClick={() => selectTime(t)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          {selectedBooked && (
                            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                              That time is already booked. Please choose another available slot.
                            </p>
                          )}
                          {!MORNING_SLOTS.concat(AFTERNOON_SLOTS).some(
                            (t) => !isSlotBooked(day, t, mode === "psychologist-first" ? psychId : null)
                          ) && (
                            <p className="mt-3 text-sm text-[#666]">
                              No open slots left on this date. Try another available day.
                            </p>
                          )}
                        </>
                      )}

                      {isPsycho && mode === "schedule-first" && time && (
                        <div className="mt-6">
                          <h3 className="m-0 mb-3 font-serif text-base text-[#202020]">
                            Psychologists available for this schedule
                          </h3>
                          {schedulePsychologists.length === 0 ? (
                            <p className="m-0 text-sm text-[#666]">
                              No psychologists are available for this slot.
                            </p>
                          ) : (
                            <ul className="m-0 list-none p-0 grid gap-2.5">
                              {schedulePsychologists.map((p) => {
                                const taken = isSlotBooked(day, time, p.id);
                                return (
                                  <li key={p.id}>
                                    <button
                                      type="button"
                                      disabled={taken}
                                      onClick={() => update({ psychologistId: p.id })}
                                      className={[
                                        "w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-[border-color,background] duration-150",
                                        taken && "cursor-not-allowed opacity-55 bg-[#f5f7f6]",
                                        !taken && booking.psychologistId === p.id
                                          ? "border-tf-teal bg-tf-soft cursor-pointer"
                                          : "",
                                        !taken && booking.psychologistId !== p.id
                                          ? "border-black/12 bg-white hover:border-tf-teal cursor-pointer"
                                          : "",
                                      ].join(" ")}
                                    >
                                      <span>
                                        <strong className="block text-sm text-tf-ink">{p.name}</strong>
                                        <small className="text-[#666]">
                                          {taken ? "Unavailable for this slot" : p.role}
                                        </small>
                                      </span>
                                      {booking.psychologistId === p.id && !taken && (
                                        <span className="text-xs font-bold text-tf-teal">Selected</span>
                                      )}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap mt-8 pt-5 border-t border-dashed border-[#d0e5dd]">
                <Link to="/book" className={btnGhost}>
                  Back
                </Link>
                <button
                  type="button"
                  className={`${btnSolid} disabled:opacity-55 disabled:cursor-not-allowed`}
                  disabled={!canContinue}
                  onClick={persistAndGo}
                >
                  Continue
                </button>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <BookingSummary
                step={2}
                title={service?.fullName || "Booking"}
                rows={[
                  ...summaryRows.slice(0, 2),
                  {
                    label: "DATE & TIME",
                    value:
                      day && time
                        ? `${new Date(year, month, day).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${time}`
                        : "To be set",
                  },
                ]}
                fee={feeLabel}
                ctaDisabled={!canContinue}
                onContinue={persistAndGo}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
