export default function BookingSummary({
  step = 1,
  totalSteps = 6,
  title = "Psychotherapy / Counseling",
  rows = [],
  fee = "₱1,500",
  status = "Not submitted yet",
  ctaLabel = "Continue",
  ctaDisabled = false,
  onContinue,
}) {
  return (
    <aside className="bs-summary" aria-labelledby="bs-summary-title">
      <p className="bs-summary__eyebrow" id="bs-summary-title">YOUR BOOKING</p>
      <p className="bs-summary__title">{title}</p>
      <p className="bs-summary__status">
        Step {step} of {totalSteps} · {status}
      </p>

      <dl className="bs-summary__rows">
        {rows.map((r) => (
          <div key={r.label} className="bs-summary__row">
            <dt>{r.label}</dt>
            <dd>{r.value || "To be set"}</dd>
          </div>
        ))}
      </dl>

      <div className="bs-summary__total">
        <span>Session fee</span>
        <strong>{fee}</strong>
      </div>

      {onContinue && (
        <button
          type="button"
          className="btn btn--solid bs-summary__cta"
          onClick={onContinue}
          disabled={ctaDisabled}
        >
          {ctaLabel}
        </button>
      )}
    </aside>
  );
}