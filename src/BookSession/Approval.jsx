import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Footer,
  Reveal,
  container,
  btnSolid,
  btnGhost,
} from "../components/Layout";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import { useBooking } from "./bookingContext";

const pageShell = "font-sans text-black bg-tf-bg overflow-x-hidden antialiased";
const mainPad = "py-12 pb-24 max-[720px]:py-7 max-[720px]:pb-16 bg-tf-bg";
const gridClass =
  "grid grid-cols-[minmax(0,1fr)_320px] gap-7 mt-8 items-start max-[900px]:grid-cols-1";
const panelClass =
  "bg-white border border-black/[0.23] rounded-[21px] p-7 max-[720px]:p-5";

const STAGES = [
  {
    id: "payment_pending",
    title: "Payment verification",
    detail: "Our team is reviewing your proof of payment.",
  },
  {
    id: "psychologist_pending",
    title: "Psychologist approval",
    detail: "After payment is verified, your psychologist confirms the appointment.",
  },
  {
    id: "approved",
    title: "Appointment approved",
    detail: "Your booking is confirmed. Complete the consent form next.",
  },
  {
    id: "rejected",
    title: "Appointment not approved",
    detail: "This request was not approved. Please contact the clinic or book again.",
  },
];

function StatusBadge({ status }) {
  const map = {
    payment_pending: { label: "Pending payment verification", cls: "bg-amber-100 text-amber-900" },
    psychologist_pending: { label: "Pending psychologist approval", cls: "bg-sky-100 text-sky-900" },
    approved: { label: "Approved", cls: "bg-emerald-100 text-emerald-900" },
    rejected: { label: "Rejected", cls: "bg-red-100 text-red-900" },
  };
  const m = map[status] || map.payment_pending;
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${m.cls}`}>
      {m.label}
    </span>
  );
}

export default function Approval() {
  const navigate = useNavigate();
  const { booking, update, service, psychologist, dateLabel, summaryRows, feeLabel } =
    useBooking();
  const [status, setStatus] = useState(
    booking.approvalStatus === "none" ? "payment_pending" : booking.approvalStatus
  );

  const setStage = (next) => {
    setStatus(next);
    update({ approvalStatus: next });
  };

  const stageIndex =
    status === "rejected"
      ? -1
      : status === "payment_pending"
        ? 0
        : status === "psychologist_pending"
          ? 1
          : 2;

  return (
    <div className={pageShell}>
      <Navbar />
      <main className={mainPad}>
        <div className={container}>
          <Reveal>
            <StepRail current={3} />
          </Reveal>
          <div className={gridClass}>
            <Reveal className={panelClass} delay={140}>
              <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                    Appointment status
                  </h2>
                  <p className="m-0 text-sm text-[#666]">
                    Psychologist approval follows payment verification.
                  </p>
                </div>
                <StatusBadge status={status} />
              </header>

              <ol className="m-0 mt-8 list-none space-y-0 p-0">
                {STAGES.filter((s) => s.id !== "rejected").map((s, i) => {
                  const done = stageIndex > i || status === "approved";
                  const active = stageIndex === i;
                  return (
                    <li key={s.id} className="relative flex gap-4 pb-8 last:pb-0">
                      {i < 2 && (
                        <span
                          className={`absolute left-[15px] top-9 h-[calc(100%-24px)] w-0.5 ${
                            done ? "bg-tf-teal" : "bg-[#d0e5dd]"
                          }`}
                          aria-hidden
                        />
                      )}
                      <span
                        className={[
                          "relative z-[1] grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                          done && "bg-tf-teal text-white",
                          active && !done && "bg-[#1e4e41] text-white shadow-[0_0_0_6px_#d7eee8]",
                          !done && !active && "bg-white border-2 border-[#d0e5dd] text-[#65736d]",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <div>
                        <h3 className="m-0 font-serif text-base text-[#202020]">{s.title}</h3>
                        <p className="m-0 mt-1 text-sm text-[#666]">{s.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {status === "rejected" && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900">
                  <strong>Appointment rejected.</strong> {STAGES[3].detail}
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-black/10 bg-[#fbfdfc] p-5">
                <p className="m-0 text-[11px] font-bold tracking-[0.1em] text-tf-teal">
                  APPOINTMENT DETAILS
                </p>
                <dl className="m-0 mt-3 grid gap-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Service</dt>
                    <dd className="m-0 font-medium">{service?.name || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Psychologist</dt>
                    <dd className="m-0 font-medium">{psychologist?.name || "Auto-assigned"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">When</dt>
                    <dd className="m-0 font-medium text-right">{dateLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Reference</dt>
                    <dd className="m-0 font-medium">{booking.referenceNumber || "Pending"}</dd>
                  </div>
                </dl>
                <p className="m-0 mt-4 text-sm text-tf-body">
                  {status === "payment_pending" &&
                    "Next: wait for payment verification, then psychologist review."}
                  {status === "psychologist_pending" &&
                    "Payment verified. Waiting for psychologist confirmation."}
                  {status === "approved" &&
                    "Next step: complete the clinic consent form before your session."}
                  {status === "rejected" &&
                    "You may return home or message the clinic for assistance."}
                </p>
              </div>

              {/* Demo controls for presentation */}
              <div className="mt-6 rounded-xl border border-dashed border-[#b6d2c4] bg-[#f9fcfb] p-4">
                <p className="m-0 mb-3 text-xs font-bold tracking-[0.08em] text-tf-teal">
                  DEMO STATUS CONTROLS
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={`${btnGhost} !h-9 !px-3 !text-sm`} onClick={() => setStage("payment_pending")}>
                    Payment pending
                  </button>
                  <button type="button" className={`${btnGhost} !h-9 !px-3 !text-sm`} onClick={() => setStage("psychologist_pending")}>
                    Psych. pending
                  </button>
                  <button type="button" className={`${btnGhost} !h-9 !px-3 !text-sm`} onClick={() => setStage("approved")}>
                    Approved
                  </button>
                  <button type="button" className={`${btnGhost} !h-9 !px-3 !text-sm`} onClick={() => setStage("rejected")}>
                    Rejected
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#d0e5dd] pt-5">
                <Link to="/book/review" className={btnGhost}>
                  Back
                </Link>
                {status === "approved" ? (
                  <button type="button" className={btnSolid} onClick={() => navigate("/book/consent")}>
                    Continue to consent form
                  </button>
                ) : status === "rejected" ? (
                  <Link to="/" className={btnSolid}>
                    Back to home
                  </Link>
                ) : (
                  <button type="button" className={`${btnSolid} opacity-55 cursor-not-allowed`} disabled>
                    Waiting for approval…
                  </button>
                )}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <BookingSummary
                step={4}
                title={service?.fullName || "Booking"}
                rows={summaryRows}
                fee={feeLabel}
                status={status.replace(/_/g, " ")}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
