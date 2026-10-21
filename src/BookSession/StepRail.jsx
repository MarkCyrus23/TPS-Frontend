export const STEPS = ["Service", "Date & Time", "Your Info", "Review & Pay", "Confirmed"];

export default function StepRail({ current = 0 }) {
  return (
    <ol
      className="list-none grid grid-cols-5 gap-2 py-8 pb-2 m-0 relative max-[720px]:grid-cols-3 max-[720px]:gap-y-6 before:content-[''] before:absolute before:top-[52px] before:left-[3%] before:right-[3%] before:border-t-2 before:border-dashed before:border-[#d0e5dd] before:z-0 max-[720px]:before:hidden"
      aria-label="Booking progress"
    >
      {STEPS.map((label, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <li
            key={label}
            className="flex flex-col items-center gap-2.5 relative z-[1]"
          >
            <span
              className={[
                "w-10 h-10 rounded-full grid place-items-center bg-white border-2 border-[#d0e5dd] text-[#65736d] font-semibold text-[0.95rem] transition-[background,color,border-color] duration-200",
                isActive &&
                  "bg-[#1e4e41] border-[#1e4e41] text-white shadow-[0_0_0_8px_#d7eee8,0_0_0_16px_#f6fbfa] max-[720px]:shadow-[0_0_0_6px_#d7eee8]",
                isDone && "bg-tf-teal border-tf-teal text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {i + 1}
            </span>
            <span
              className={[
                "text-[0.85rem] text-[#65736d] text-center whitespace-nowrap",
                isActive && "text-[#245848] font-semibold",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
