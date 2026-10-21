import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Footer,
  Reveal,
  Photo,
  container,
  btnSolid,
  btnGhost,
} from "../components/Layout";

const APPOINTMENTS = [
  {
    id: "1",
    tab: "upcoming",
    service: "Psychotherapy / Counseling",
    doctor: "Dr. Maria Santos",
    dateLabel: "Thu, Oct 15",
    time: "9:00 AM - 10:00 AM",
    format: "To be determined",
    status: "Confirmed",
    payment: "Paid in full",
    balance: 0,
    consent: "Completed",
    target: new Date(2026, 9, 15, 9, 0, 0).getTime(),
    message: "Your appointment is confirmed. We look forward to seeing you.",
  },
  {
    id: "2",
    tab: "upcoming",
    service: "ABA Therapy",
    doctor: "Dr. Ana Reyes",
    dateLabel: "Tue, Oct 20",
    time: "9:00 AM - 11:00 AM",
    format: "In-person",
    status: "Confirmed",
    payment: "Downpayment received",
    balance: 750,
    consent: "Completed",
    target: new Date(2026, 9, 20, 9, 0, 0).getTime(),
    message: "Remaining balance of ₱750 is due after the session.",
  },
  {
    id: "3",
    tab: "upcoming",
    service: "Assessment",
    doctor: "Dr. Juan Dela Cruz",
    dateLabel: "Fri, Oct 23",
    time: "1:00 PM - 2:00 PM",
    format: "Online",
    status: "Pending approval",
    payment: "Pending verification",
    balance: 0,
    consent: "Pending",
    target: new Date(2026, 9, 23, 13, 0, 0).getTime(),
    message: "Payment verification is in progress before psychologist approval.",
  },
  {
    id: "4",
    tab: "completed",
    service: "Psychotherapy / Counseling",
    doctor: "Dr. Maria Santos",
    dateLabel: "Mon, Sep 28",
    time: "10:00 AM - 11:00 AM",
    format: "In-person",
    status: "Completed",
    payment: "Paid in full",
    balance: 0,
    consent: "Completed",
    target: null,
    message: "Session completed. Thank you for attending.",
  },
  {
    id: "5",
    tab: "cancelled",
    service: "Assessment",
    doctor: "Dr. Juan Dela Cruz",
    dateLabel: "Wed, Sep 10",
    time: "2:00 PM - 3:00 PM",
    format: "Online",
    status: "Cancelled",
    payment: "Refunded",
    balance: 0,
    consent: "N/A",
    target: null,
    message: "This appointment was cancelled by the client.",
  },
];

const avatarClass = "size-12 rounded-full object-cover bg-[#aac6b7] shrink-0";
const avatarFallback = <div className="size-12 rounded-full bg-[#aac6b7]" />;
const cardLinkClass =
  "bg-transparent border-0 p-0 text-[#202020] text-[0.8rem] font-bold underline cursor-pointer font-[inherit]";

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!target) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) return null;
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return (
    <div className="flex gap-2">
      {[
        [String(days), "Days"],
        [String(hours).padStart(2, "0"), "Hours"],
        [String(mins).padStart(2, "0"), "Min"],
        [String(secs).padStart(2, "0"), "Sec"],
      ].map(([n, label]) => (
        <div
          key={label}
          className="flex h-14 w-12 flex-col items-center justify-center rounded-lg bg-white/10"
        >
          <strong className="text-[1.1rem] font-bold">{n}</strong>
          <span className="text-[0.6rem] opacity-80">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Dialog({ title, children, onClose, onConfirm, confirmLabel, danger }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="m-0 font-serif text-xl text-[#202020]">{title}</h3>
        <div className="mt-3 text-sm leading-relaxed text-[#555]">{children}</div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" className={btnGhost} onClick={onClose}>
            Keep appointment
          </button>
          <button
            type="button"
            className={
              danger
                ? `${btnSolid} !bg-red-700 hover:!shadow-[0_10px_22px_-8px_rgba(153,27,27,0.45)]`
                : btnSolid
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ tab }) {
  const copy = {
    upcoming: "No upcoming appointments. Book a session when you are ready.",
    completed: "No completed appointments yet.",
    cancelled: "No cancelled appointments.",
  };
  return (
    <div className="rounded-2xl border border-dashed border-[#b6d2c4] bg-[#f9fcfb] px-6 py-14 text-center">
      <p className="m-0 font-serif text-lg text-[#3d5c52]">{copy[tab]}</p>
      {tab === "upcoming" && (
        <Link to="/book" className={`${btnSolid} mt-5 inline-flex no-underline`}>
          Book a session
        </Link>
      )}
    </div>
  );
}

export default function MyAppointments() {
  const [tab, setTab] = useState("upcoming");
  const [items, setItems] = useState(APPOINTMENTS);
  const [dialog, setDialog] = useState(null); // { type, id }
  const [detailsId, setDetailsId] = useState(null);

  const filtered = useMemo(() => items.filter((a) => a.tab === tab), [items, tab]);
  const next = items.find((a) => a.tab === "upcoming") || null;
  const details = items.find((a) => a.id === detailsId);

  const counts = {
    upcoming: items.filter((a) => a.tab === "upcoming").length,
    completed: items.filter((a) => a.tab === "completed").length,
    cancelled: items.filter((a) => a.tab === "cancelled").length,
  };

  const confirmAction = () => {
    if (!dialog) return;
    setItems((list) =>
      list.map((a) => {
        if (a.id !== dialog.id) return a;
        if (dialog.type === "cancel") {
          return {
            ...a,
            tab: "cancelled",
            status: "Cancelled",
            message: "This appointment was cancelled.",
          };
        }
        if (dialog.type === "reschedule") {
          return {
            ...a,
            message: "Reschedule requested — our team will contact you with new options.",
            status: "Reschedule requested",
          };
        }
        return a;
      })
    );
    setDialog(null);
  };

  return (
    <div className="font-sans text-[#202020]">
      <Navbar />
      <main className="bg-white py-12 pb-24">
        <div className={container}>
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">
                  MY APPOINTMENTS
                </p>
                <h1 className="my-2 font-serif text-[2.5rem] text-[#111]">
                  Hi, <em className="italic text-tf-teal">Client.</em>
                </h1>
                <p className="m-0 text-base text-[#666]">
                  Track upcoming, completed, and cancelled sessions.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Link to="/book" className={`${btnSolid} no-underline`}>
                  Book a new Session
                </Link>
                <Link
                  to="/contact"
                  className="font-serif text-[15px] text-black/70 no-underline border-b border-transparent hover:border-current hover:text-black"
                >
                  Message the clinic
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-10 inline-flex flex-wrap gap-1 rounded-[11px] bg-tf-teal/19 p-1">
              {[
                ["upcoming", "Upcoming"],
                ["completed", "Completed"],
                ["cancelled", "Cancelled"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-0 px-5 py-2 font-serif text-[0.9rem] text-[#202020] ${
                    tab === id
                      ? "bg-white font-bold shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setTab(id)}
                >
                  {label}
                  <span className="grid size-[18px] place-items-center rounded-full bg-[#345e51]/15 font-sans text-[0.7rem]">
                    {counts[id]}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_300px]">
            <div>
              {tab === "upcoming" && next && (
                <Reveal delay={120}>
                  <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.15em] text-tf-teal">
                    YOUR NEXT SESSION
                  </h2>
                  <div className="grid grid-cols-1 items-center gap-8 rounded-[23px] bg-[#345e51] p-6 text-white md:grid-cols-[1fr_auto] md:p-8">
                    <div>
                      <h3 className="mb-3 mt-0 font-serif text-[1.6rem] font-bold">
                        {next.service}
                      </h3>
                      <div className="mb-4 flex items-center gap-3">
                        <Photo
                          src="/img/image.png"
                          className={avatarClass}
                          fallback={avatarFallback}
                        />
                        <div>
                          <strong className="block text-[0.95rem]">{next.doctor}</strong>
                          <small className="opacity-80">{next.dateLabel} · {next.time}</small>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold">
                          {next.payment}
                        </span>
                        {next.balance > 0 && (
                          <span className="rounded-lg bg-amber-400/30 px-3 py-1 text-xs font-semibold">
                            Balance ₱{next.balance.toLocaleString()}
                          </span>
                        )}
                        <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold">
                          Consent · {next.consent}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:items-end">
                      <Countdown target={next.target} />
                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="bg-transparent border-0 p-0 text-white text-sm underline cursor-pointer"
                          onClick={() => setDialog({ type: "reschedule", id: next.id })}
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="bg-transparent border-0 p-0 text-white text-sm underline cursor-pointer"
                          onClick={() => setDialog({ type: "cancel", id: next.id })}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              <Reveal delay={180}>
                <div className={tab === "upcoming" && next ? "mt-12" : ""}>
                  <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.15em] text-tf-teal">
                    {tab === "upcoming"
                      ? "Other appointments"
                      : tab === "completed"
                        ? "Completed appointments"
                        : "Cancelled appointments"}
                  </h2>

                  {filtered.length === 0 ? (
                    <EmptyState tab={tab} />
                  ) : (
                    <div className="flex flex-col gap-5">
                      {filtered.map((apt) => (
                        <div
                          key={apt.id}
                          className="rounded-2xl border border-[#666]/31 bg-white p-6"
                        >
                          <div className="mb-5 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                            <Photo
                              src="/img/cartoon-female-psychologist-portrait.png"
                              className={avatarClass}
                              fallback={avatarFallback}
                            />
                            <div>
                              <h4 className="mb-1 mt-0 font-serif text-[1.1rem] text-[#355f52]">
                                {apt.service}
                              </h4>
                              <p className="m-0 text-[0.8rem] text-[#666]">{apt.doctor}</p>
                            </div>
                            <span className="rounded-lg bg-[#9ac5be]/24 px-2.5 py-1 text-[0.7rem] font-bold text-[#345e51] md:ml-auto">
                              {apt.status}
                            </span>
                          </div>

                          <div className="mb-5 grid grid-cols-2 gap-3 border-b border-[#eee] pb-5 text-center sm:grid-cols-4 md:text-left">
                            <div>
                              <span className="mb-1 block text-[0.7rem] text-[#666]">Date</span>
                              <strong className="text-[0.9rem]">{apt.dateLabel}</strong>
                            </div>
                            <div>
                              <span className="mb-1 block text-[0.7rem] text-[#666]">Time</span>
                              <strong className="text-[0.9rem]">{apt.time}</strong>
                            </div>
                            <div>
                              <span className="mb-1 block text-[0.7rem] text-[#666]">Payment</span>
                              <strong className="text-[0.9rem]">{apt.payment}</strong>
                            </div>
                            <div>
                              <span className="mb-1 block text-[0.7rem] text-[#666]">Consent</span>
                              <strong className="text-[0.9rem]">{apt.consent}</strong>
                            </div>
                          </div>

                          {apt.balance > 0 && (
                            <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
                              Remaining balance: ₱{apt.balance.toLocaleString()}
                            </p>
                          )}

                          <p className="mb-5 rounded-lg bg-[#9ac5be]/24 px-4 py-3 text-[0.8rem]">
                            {apt.message}
                          </p>

                          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                            <button
                              type="button"
                              className={cardLinkClass}
                              onClick={() => setDetailsId(apt.id)}
                            >
                              View details
                            </button>
                            <Link to="/contact" className={cardLinkClass}>
                              Message
                            </Link>
                            {apt.tab === "upcoming" && (
                              <>
                                <button
                                  type="button"
                                  className={cardLinkClass}
                                  onClick={() => setDialog({ type: "reschedule", id: apt.id })}
                                >
                                  Reschedule
                                </button>
                                <button
                                  type="button"
                                  className={`${cardLinkClass} text-[#dc0000]`}
                                  onClick={() => setDialog({ type: "cancel", id: apt.id })}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal
              className="sticky top-[100px] flex flex-col gap-6 max-lg:static"
              delay={160}
            >
              <div className="rounded-[10px] border border-black/24 bg-[#ebfef6] p-6 text-center">
                <h3 className="m-0 font-serif text-5xl text-[#28473a]">{counts.completed}</h3>
                <p className="mb-4 mt-1 text-[0.85rem] text-[#666]">Sessions completed</p>
                <div className="border-t border-black/10 pt-4">
                  <p className="m-0 font-serif text-[0.9rem] font-bold text-[#28473a]">
                    {counts.upcoming} upcoming
                  </p>
                </div>
              </div>
              <div className="rounded-[10px] border border-black/24 bg-[#ebfef6] p-6">
                <h4 className="mb-2 mt-0 font-serif text-base text-[#28473a]">
                  Book another session
                </h4>
                <p className="m-0 text-[0.8rem] text-[#666]">
                  Pick a service and a time that works for you.
                </p>
                <Link to="/book" className={`${btnSolid} mt-3 block w-full text-center no-underline`}>
                  Book now
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />

      {dialog && (
        <Dialog
          title={dialog.type === "cancel" ? "Cancel appointment?" : "Reschedule appointment?"}
          confirmLabel={dialog.type === "cancel" ? "Yes, cancel" : "Request reschedule"}
          danger={dialog.type === "cancel"}
          onClose={() => setDialog(null)}
          onConfirm={confirmAction}
        >
          {dialog.type === "cancel" ? (
            <p className="m-0">
              This will move the appointment to Cancelled. You can book a new session anytime.
            </p>
          ) : (
            <p className="m-0">
              We will mark this as a reschedule request and the clinic will contact you with new
              available times.
            </p>
          )}
        </Dialog>
      )}

      {details && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="m-0 font-serif text-xl">{details.service}</h3>
            <dl className="mt-4 grid gap-2 text-sm">
              {[
                ["Psychologist", details.doctor],
                ["Date", details.dateLabel],
                ["Time", details.time],
                ["Format", details.format],
                ["Status", details.status],
                ["Payment", details.payment],
                ["Balance", details.balance ? `₱${details.balance.toLocaleString()}` : "None"],
                ["Consent", details.consent],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-[#666]">{k}</dt>
                  <dd className="m-0 font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <button type="button" className={`${btnSolid} mt-6 w-full`} onClick={() => setDetailsId(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
