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
import { CLINIC } from "../data/clinic";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import { useBooking } from "./bookingContext";

const pageShell = "font-sans text-black bg-tf-bg overflow-x-hidden antialiased";
const mainPad = "py-12 pb-24 max-[720px]:py-7 max-[720px]:pb-16 bg-tf-bg";
const gridClass =
  "grid grid-cols-[minmax(0,1fr)_320px] gap-7 mt-8 items-start max-[900px]:grid-cols-1";
const panelClass =
  "bg-white border border-black/[0.23] rounded-[21px] p-7 max-[720px]:p-5";
const inputClass =
  "mt-1.5 w-full rounded-lg border border-black/14 bg-white px-3.5 py-2.5 font-serif text-sm outline-none focus:border-tf-teal focus:shadow-[0_0_0_3px_rgba(74,155,142,0.15)]";

const METHODS = [
  { id: "gcash", title: "GCash", sub: "Pay with your GCash wallet", letter: "G" },
  { id: "maya", title: "Maya", sub: "Pay with your Maya wallet", letter: "M" },
];

function ReviewCard({ title, editTo, rows }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-[#fbfdfc] p-5">
      <header className="mb-3 flex items-center justify-between gap-3">
        <p className="m-0 text-[11px] font-bold tracking-[0.12em] text-tf-teal">{title}</p>
        <Link to={editTo} className="text-sm font-semibold text-tf-teal no-underline hover:underline">
          Edit
        </Link>
      </header>
      <dl className="m-0 grid gap-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 text-sm">
            <dt className="m-0 text-[#666]">{r.label}</dt>
            <dd className="m-0 text-right font-medium text-[#202020]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ReviewAndPay() {
  const navigate = useNavigate();
  const {
    booking,
    service,
    psychologist,
    dateLongLabel,
    fee,
    feeLabel,
    summaryRows,
    updatePayment,
    update,
  } = useBooking();

  const [method, setMethod] = useState(booking.payment.method || "gcash");
  const [type, setType] = useState(booking.payment.type || "full");
  const [walletNumber, setWalletNumber] = useState("");
  const [refNum, setRefNum] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [showDownWarn, setShowDownWarn] = useState(false);
  const [pendingProceed, setPendingProceed] = useState(false);

  const amountDue = type === "full" ? fee : Math.round(fee / 2);
  const remaining = type === "full" ? 0 : fee - amountDue;
  const isFormValid = walletNumber.length > 5 && refNum.length > 5 && receipt !== null;

  const methodLabel = METHODS.find((m) => m.id === method)?.title || "GCash";

  const commitAndGo = () => {
    updatePayment({
      type,
      method,
      amountPaid: amountDue,
      remaining,
      refNumber: refNum,
    });
    update({
      approvalStatus: "payment_pending",
      referenceNumber: `TF-${Date.now().toString().slice(-8)}`,
    });
    navigate("/book/approval");
  };

  const tryProceed = () => {
    if (!isFormValid) return;
    if (type === "down") {
      setPendingProceed(true);
      setShowDownWarn(true);
      return;
    }
    commitAndGo();
  };

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
              <header>
                <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                  Review &amp; payment
                </h2>
                <p className="m-0 text-sm text-[#666]">
                  Confirm your appointment details, then complete payment to secure your slot.
                </p>
              </header>

              <div className="mt-6 grid gap-4">
                <ReviewCard
                  title="SCHEDULE"
                  editTo="/book/date-time"
                  rows={[
                    { label: "Date", value: dateLongLabel },
                    { label: "Time", value: booking.time || "—" },
                  ]}
                />
                <ReviewCard
                  title="SESSION"
                  editTo="/book"
                  rows={[
                    { label: "Service", value: service?.name || "—" },
                    {
                      label: "Psychologist",
                      value: psychologist?.name || "Auto-assigned",
                    },
                  ]}
                />
                <ReviewCard
                  title="YOUR DETAILS"
                  editTo="/book/info"
                  rows={[
                    { label: "Name", value: booking.client.fullName || "—" },
                    { label: "Email", value: booking.client.email || "—" },
                    { label: "Mobile", value: booking.client.mobile || "—" },
                  ]}
                />
              </div>

              <h3 className="mt-8 mb-3 font-serif text-lg font-normal text-[#202020]">
                Payment option
              </h3>
              <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                {[
                  {
                    id: "full",
                    title: "Full payment",
                    amount: fee,
                    note: "Pay the full session fee now",
                  },
                  {
                    id: "down",
                    title: "Downpayment",
                    amount: Math.round(fee / 2),
                    note: `Remaining ₱${remaining || Math.round(fee / 2)} due after the session`,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setType(opt.id)}
                    className={[
                      "rounded-xl border p-4 text-left cursor-pointer transition-[border-color,background] duration-150",
                      type === opt.id
                        ? "border-tf-teal bg-tf-soft"
                        : "border-black/12 bg-white hover:border-tf-teal",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className="font-serif text-base text-[#202020]">{opt.title}</strong>
                      <span className="font-bold text-tf-teal">
                        ₱{opt.amount.toLocaleString()}
                      </span>
                    </div>
                    <p className="m-0 mt-1 text-xs text-[#666]">{opt.note}</p>
                  </button>
                ))}
              </div>

              <h3 className="mt-8 mb-3 font-serif text-lg font-normal text-[#202020]">
                Payment method
              </h3>
              <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={[
                      "flex items-center gap-3 rounded-xl border p-4 text-left cursor-pointer",
                      method === m.id
                        ? "border-tf-teal bg-tf-soft"
                        : "border-black/12 bg-white hover:border-tf-teal",
                    ].join(" ")}
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-tf-navy font-bold text-white">
                      {m.letter}
                    </span>
                    <span>
                      <strong className="block text-sm">{m.title}</strong>
                      <small className="text-[#666]">{m.sub}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-[220px_minmax(0,1fr)] gap-5 max-[720px]:grid-cols-1">
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{methodLabel}</span>
                    <strong className="text-tf-teal">₱{amountDue.toLocaleString()}</strong>
                  </div>
                  <div className="mt-4 grid place-items-center rounded-xl bg-[#f3f8f6] py-8 text-tf-teal">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <p className="m-0 mt-2 text-xs text-[#666]">Scan QR to pay</p>
                  </div>
                  <dl className="m-0 mt-3 grid gap-2 text-xs">
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#666]">Account</dt>
                      <dd className="m-0 font-medium">{CLINIC.name}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#666]">Number</dt>
                      <dd className="m-0 font-medium">
                        {method === "gcash" ? CLINIC.gcashNumber : CLINIC.mayaNumber}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-black/10 bg-[#fbfdfc] p-4">
                    <p className="m-0 text-[11px] font-bold tracking-[0.1em] text-tf-teal">
                      PAYMENT SUMMARY
                    </p>
                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#666]">Session fee</span>
                        <span>{feeLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">Amount due now</span>
                        <strong className="text-tf-teal">₱{amountDue.toLocaleString()}</strong>
                      </div>
                      {type === "down" && (
                        <div className="flex justify-between">
                          <span className="text-[#666]">Remaining balance</span>
                          <span>₱{remaining.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="block text-sm font-serif font-bold">
                    Your {methodLabel} number
                    <input
                      type="tel"
                      className={inputClass}
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                      placeholder="09XX XXX XXXX"
                    />
                  </label>
                  <label className="block text-sm font-serif font-bold">
                    Reference number
                    <input
                      type="text"
                      className={inputClass}
                      value={refNum}
                      onChange={(e) => setRefNum(e.target.value)}
                      placeholder="Transaction / ref no."
                    />
                  </label>
                  <label
                    className={[
                      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors",
                      receipt
                        ? "border-tf-teal bg-tf-soft"
                        : "border-[#b6d2c4] bg-white hover:border-tf-teal",
                    ].join(" ")}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                    />
                    <span className="text-2xl text-tf-teal">↑</span>
                    <strong className="text-sm">
                      {receipt ? receipt.name : "Upload proof of payment"}
                    </strong>
                    <span className="text-xs text-[#666]">PNG or JPG screenshot</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#d0e5dd] pt-5">
                <Link to="/book/info" className={btnGhost}>
                  Back
                </Link>
                <button
                  type="button"
                  className={`${btnSolid} disabled:opacity-55 disabled:cursor-not-allowed`}
                  disabled={!isFormValid}
                  onClick={tryProceed}
                >
                  Proceed
                </button>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <BookingSummary
                step={4}
                title={service?.fullName || "Booking"}
                rows={summaryRows}
                fee={feeLabel}
                status={`Due now · ₱${amountDue.toLocaleString()}`}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />

      {showDownWarn && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="down-warn-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 id="down-warn-title" className="m-0 font-serif text-xl text-[#202020]">
              Confirm downpayment
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555]">
              You are paying <strong>₱{amountDue.toLocaleString()}</strong> now. The remaining
              balance of <strong>₱{remaining.toLocaleString()}</strong> is due after your session.
              Continue with downpayment?
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className={btnGhost}
                onClick={() => {
                  setShowDownWarn(false);
                  setPendingProceed(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className={btnSolid}
                onClick={() => {
                  setShowDownWarn(false);
                  if (pendingProceed) commitAndGo();
                }}
              >
                Continue with downpayment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
