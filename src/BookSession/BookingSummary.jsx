import { btnSolid } from "../components/Layout";

export default function BookingSummary({
  step = 1,
  totalSteps = 5, // matches StepRail: Service → Date & Time → Your Info → Review & Pay → Confirmed
  title = "Psychotherapy / Counseling",
  rows = [],
  fee = "₱1,500",
  status = "Not submitted yet",
  ctaLabel = "Continue",
  ctaDisabled = false,
  onContinue,
}) {
  return (
    <aside
      className="bg-white border border-black/[0.23] rounded-[21px] p-7 sticky top-[100px] max-[900px]:static"
      aria-labelledby="bs-summary-title"
    >
      <p
        className="m-0 mb-1.5 font-sans font-bold text-tf-teal text-xs tracking-[0.14em]"
        id="bs-summary-title"
      >
        YOUR BOOKING
      </p>
      <p className="m-0 mb-1 font-serif text-base text-[#202020]">{title}</p>
      <p className="m-0 mb-[18px] text-[#666] text-[0.72rem]">
        Step {step} of {totalSteps} · {status}
      </p>

      <dl className="border-y border-dashed border-[#d0e5dd] py-3.5 m-0 mb-3.5">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex justify-between items-baseline gap-3 py-[5px]"
          >
            <dt className="text-[#666] text-[0.78rem] tracking-[0.04em] m-0">
              {r.label}
            </dt>
            <dd className="m-0 text-[#666] text-[0.85rem] font-bold text-right">
              {r.value || "To be set"}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex justify-between items-center mb-4">
        <span className="text-[#666] text-[0.85rem]">Session fee</span>
        <strong className="font-sans font-bold text-tf-teal text-[1.35rem]">
          {fee}
        </strong>
      </div>

      {onContinue && ctaLabel && (
        <button
          type="button"
          className={`${btnSolid} w-full h-auto min-h-[41px] py-2.5 px-3.5 text-center whitespace-normal disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
          onClick={onContinue}
          disabled={ctaDisabled}
        >
          <span className="block leading-[1.3]">{ctaLabel}</span>
        </button>
      )}
    </aside>
  );
}
