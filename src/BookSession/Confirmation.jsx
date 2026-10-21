import { Link } from "react-router-dom";
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

export default function Confirmation() {
  const {
    booking,
    service,
    psychologist,
    dateLongLabel,
    dateLabel,
    summaryRows,
    feeLabel,
    fee,
  } = useBooking();

  const ref =
    booking.referenceNumber || `TF-${Date.now().toString().slice(-8)}`;
  const paid = booking.payment.amountPaid || fee;
  const remaining = booking.payment.remaining || 0;

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
              <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-tf-soft text-2xl text-tf-teal">
                ✓
              </div>
              <header>
                <h2 className="m-0 mb-2 font-serif text-[1.6rem] font-normal text-[#202020]">
                  Appointment confirmed
                </h2>
                <p className="m-0 text-sm text-[#666]">
                  A confirmation was sent to{" "}
                  <strong>{booking.client.email || "your email"}</strong>. We look forward to seeing
                  you.
                </p>
              </header>

              <div className="mt-6 rounded-2xl border border-black/10 bg-[#fbfdfc] p-5">
                <p className="m-0 text-[11px] font-bold tracking-[0.12em] text-tf-teal">
                  REFERENCE NUMBER
                </p>
                <p className="m-0 mt-1 font-serif text-2xl tracking-wide text-tf-ink">{ref}</p>

                <dl className="m-0 mt-5 grid gap-3 border-t border-dashed border-[#d0e5dd] pt-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Service</dt>
                    <dd className="m-0 text-right font-medium">
                      {service?.fullName || service?.name || "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Psychologist</dt>
                    <dd className="m-0 text-right font-medium">
                      {psychologist?.name || "To be assigned"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Date</dt>
                    <dd className="m-0 text-right font-medium">{dateLongLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Time</dt>
                    <dd className="m-0 text-right font-medium">{booking.time || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Session format</dt>
                    <dd className="m-0 text-right font-medium">
                      To be determined by psychologist
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Amount paid</dt>
                    <dd className="m-0 text-right font-medium">₱{paid.toLocaleString()}</dd>
                  </div>
                  {remaining > 0 && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#666]">Remaining balance</dt>
                      <dd className="m-0 text-right font-medium text-amber-800">
                        ₱{remaining.toLocaleString()} (due after session)
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#666]">Consent form</dt>
                    <dd className="m-0 text-right font-medium">
                      {booking.consentComplete ? "Completed" : "Pending"}
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-tf-body">
                Clinic location:{" "}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC.address)}`}
                  className="font-medium text-tf-teal no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CLINIC.address}
                </a>
                . Please arrive 10 minutes early for in-person sessions once the format is confirmed.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/" className={btnGhost}>
                  Back to Home
                </Link>
                <Link to="/appointments" className={btnSolid}>
                  View My Appointments
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <BookingSummary
                step={5}
                title={service?.fullName || "Booking"}
                rows={[
                  ...summaryRows.slice(0, 2),
                  { label: "DATE & TIME", value: dateLabel },
                ]}
                fee={feeLabel}
                status="Confirmed"
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
