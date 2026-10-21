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

export default function Consent() {
  const navigate = useNavigate();
  const { booking, update, service, summaryRows, feeLabel } = useBooking();
  const [informed, setInformed] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [limits, setLimits] = useState(false);
  const [signature, setSignature] = useState(booking.client.fullName || "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const incomplete = !informed || !privacy || !limits || signature.trim().length < 2 || !date;

  const onSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (incomplete) return;
    update({ consentComplete: true });
    setSubmitted(true);
    setTimeout(() => navigate("/book/confirmation"), 900);
  };

  return (
    <div className={pageShell}>
      <Navbar />
      <main className={mainPad}>
        <div className={container}>
          <Reveal>
            <StepRail current={4} />
          </Reveal>
          <div className={gridClass}>
            <Reveal className={panelClass} delay={140}>
              <header>
                <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                  Informed consent
                </h2>
                <p className="m-0 text-sm text-[#666]">
                  Please read and complete this form after your appointment has been approved.
                </p>
              </header>

              {booking.approvalStatus !== "approved" && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Consent is intended after appointment approval.{" "}
                  <Link to="/book/approval" className="font-semibold text-tf-teal">
                    Check approval status
                  </Link>
                  .
                </div>
              )}

              <article className="mt-6 max-h-[280px] overflow-y-auto rounded-xl border border-black/10 bg-[#fbfdfc] p-5 text-sm leading-relaxed text-[#444]">
                <p className="m-0 font-serif text-base text-[#202020]">
                  {CLINIC.name} — Client Informed Consent
                </p>
                <p className="mt-3">
                  I understand that psychological services may include psychotherapy, counseling, ABA
                  therapy, or assessment consultation. Sessions are confidential, except where disclosure
                  is required by law (e.g., risk of harm, abuse reporting, or court order).
                </p>
                <p className="mt-3">
                  I understand that the psychologist will determine whether sessions are conducted online
                  or in person based on clinical appropriateness. I may ask questions about the treatment
                  plan, fees, and scheduling at any time.
                </p>
                <p className="mt-3">
                  Payment arrangements (full payment or downpayment with remaining balance due after the
                  session) have been explained. I agree to arrive on time and to provide notice when
                  rescheduling or cancelling whenever possible.
                </p>
              </article>

              <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                {[
                  {
                    id: "informed",
                    checked: informed,
                    set: setInformed,
                    label: "I have read and understand the informed consent information above.",
                  },
                  {
                    id: "privacy",
                    checked: privacy,
                    set: setPrivacy,
                    label: "I consent to the processing of my personal data for clinical and booking purposes.",
                  },
                  {
                    id: "limits",
                    checked: limits,
                    set: setLimits,
                    label: "I understand the limits of confidentiality as described.",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 size-5 accent-tf-teal"
                      checked={item.checked}
                      onChange={(e) => item.set(e.target.checked)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}

                <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
                  <label className="block text-sm font-serif font-bold">
                    Full name (signature)
                    <input
                      className={inputClass}
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Type your full name"
                    />
                  </label>
                  <label className="block text-sm font-serif font-bold">
                    Date
                    <input
                      type="date"
                      className={inputClass}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>

                {attempted && incomplete && (
                  <p role="alert" className="m-0 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Please complete all checkboxes and the signature fields before submitting.
                  </p>
                )}
                {submitted && (
                  <p role="status" className="m-0 rounded-lg border border-tf-teal/40 bg-tf-soft px-4 py-3 text-sm text-tf-ink">
                    Consent form submitted. Redirecting to your confirmation…
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#d0e5dd] pt-5">
                  <Link to="/book/approval" className={btnGhost}>
                    Back
                  </Link>
                  <button type="submit" className={btnSolid} disabled={submitted}>
                    Submit consent form
                  </button>
                </div>
              </form>
            </Reveal>

            <Reveal delay={200}>
              <BookingSummary
                step={5}
                title={service?.fullName || "Booking"}
                rows={summaryRows}
                fee={feeLabel}
                status={booking.consentComplete ? "Consent complete" : "Consent required"}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
