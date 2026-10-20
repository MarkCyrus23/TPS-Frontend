export const STEPS = ["Service", "Date & Time", "Your Info", "Review & Pay", "Confirmed"];

export default function StepRail({ current = 0 }) {
  return (
    <ol className="bs-rail" aria-label="Booking progress">
      {STEPS.map((label, i) => {
        const state = i === current ? "is-active" : i < current ? "is-done" : "";
        return (
          <li key={label} className={`bs-rail__item ${state}`}>
            <span className="bs-rail__num">{i + 1}</span>
            <span className="bs-rail__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}