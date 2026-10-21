import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo, container, btnGhost, btnSolid } from "../components/Layout";
import { SERVICES, PSYCHOLOGISTS } from "../data/clinic";
import StepRail from "./StepRail";
import BookingSummary from "./BookingSummary";
import { useBooking } from "./bookingContext";

const pageShell = "font-sans text-black bg-tf-bg overflow-x-hidden antialiased";
const mainPad = "py-12 pb-24 max-[720px]:py-7 max-[720px]:pb-16 bg-tf-bg";
const gridClass =
  "grid grid-cols-[minmax(0,1fr)_320px] gap-7 mt-7 items-start max-[900px]:grid-cols-1";
const panelClass =
  "bg-white border border-black/[0.23] rounded-[21px] p-7 max-[720px]:p-5";

function AvatarFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#d7eee8] to-[#eaf3ef]">
      <span className="absolute top-[26%] left-1/2 w-[62px] h-[62px] rounded-full bg-tf-teal -translate-x-1/2" />
      <span className="absolute -bottom-[30px] left-1/2 w-40 h-[140px] rounded-[50%_50%_0_0/60%_60%_0_0] bg-tf-teal -translate-x-1/2" />
    </div>
  );
}

export default function BookSession() {
  const navigate = useNavigate();
  const { booking, update, service, psychologist, summaryRows, feeLabel } = useBooking();
  const serviceId = booking.serviceId;
  const doctorId = booking.psychologistId;

  const handleServiceSelect = (id) => {
    update({
      serviceId: id,
      psychologistId: null,
      bookingMode: id === "psychotherapy" ? booking.bookingMode : "schedule-first",
    });
  };

  const canContinue = serviceId && (serviceId !== "psychotherapy" || doctorId);

  return (
    <div className={pageShell}>
      <Navbar />
      <main className={mainPad}>
        <div className={container}>
          <Reveal>
            <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">
              BOOK A SESSION
            </p>
            <h1 className="font-serif font-normal text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.15] my-2 mb-3 text-[#111]">
              Let&apos;s find a time <em className="text-tf-teal italic">that works for you.</em>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <StepRail current={0} />
          </Reveal>

          <div className={gridClass}>
            <Reveal className={panelClass} delay={140}>
              <header>
                <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                  Choose a service
                </h2>
                <p className="m-0 mb-5 text-[#202020] text-[0.9rem] leading-normal">
                  Select the type of session you&apos;d like to book.
                </p>
              </header>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {SERVICES.map((s) => {
                  const selected = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleServiceSelect(s.id)}
                      className={[
                        "text-left rounded-[18px] border bg-white p-5 cursor-pointer transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(30,78,65,0.35)]",
                        selected
                          ? "border-[2.5px] border-tf-teal shadow-[0_8px_20px_-12px_rgba(74,155,142,0.45)]"
                          : "border-black/[0.18]",
                      ].join(" ")}
                    >
                      <p className="m-0 text-[11px] font-bold tracking-[0.12em] text-tf-teal">
                        {s.duration.toUpperCase()}
                      </p>
                      <h3 className="m-0 mt-2 font-serif text-lg text-[#202020]">{s.name}</h3>
                      <p className="m-0 mt-2 text-sm leading-relaxed text-[#666]">{s.description}</p>
                      <ul className="m-0 mt-3 list-none p-0 space-y-1">
                        {s.details.map((d) => (
                          <li key={d} className="text-xs text-tf-body before:content-['·'] before:mr-1.5 before:text-tf-teal">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              {!serviceId && (
                <div className="mt-6 rounded-xl border border-dashed border-[#b6d2c4] bg-[#f9fcfb] px-5 py-8 text-center">
                  <p className="m-0 font-serif text-base text-[#3d5c52]">
                    No service selected yet
                  </p>
                  <p className="m-0 mt-1 text-sm text-[#666]">
                    Choose Psychotherapy, ABA Therapy, or Assessment to continue.
                  </p>
                </div>
              )}

              {serviceId && (
                <div className="mt-8">
                  <h3 className="text-[1.2rem] mb-4 mt-0 font-serif font-normal text-[#202020]">
                    {serviceId === "psychotherapy"
                      ? "Select a Psychologist"
                      : "Psychologist Assignment"}
                  </h3>
                  {serviceId === "psychotherapy" ? (
                    <ul className="list-none p-0 m-0 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[18px] max-[720px]:grid-cols-1">
                      {PSYCHOLOGISTS.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            className={[
                              "w-full flex flex-col text-left bg-[#fdfdfd] border border-black/[0.23] rounded-[21px] overflow-hidden cursor-pointer p-0 transition-[border-color,transform,box-shadow] duration-200 relative hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,78,65,0.08)]",
                              doctorId === p.id && "border-[3px] border-tf-teal",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => update({ psychologistId: p.id })}
                          >
                            <div className="aspect-[4/3] bg-[#eaf3ef] relative overflow-hidden">
                              <Photo
                                src={p.photo}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                fallback={<AvatarFallback />}
                              />
                            </div>
                            <div className="px-[18px] pt-4 pb-5">
                              <h3 className="m-0 mb-0.5 font-sans font-bold text-tf-teal text-[1.05rem]">
                                {p.name}
                              </h3>
                              <p className="m-0 mb-3 text-[#666] text-[0.85rem]">{p.role}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-[#f9fcfb] p-6 rounded-xl border border-tf-teal text-tf-teal">
                      <p className="m-0">
                        You don&apos;t need to choose a psychologist for{" "}
                        {service?.name}. We will automatically assign the best available specialist.
                        No psychologist selector is shown for ABA Therapy or Assessment.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#d0e5dd] pt-5">
                <Link to="/" className={btnGhost}>
                  Back
                </Link>
                <button
                  type="button"
                  className={`${btnSolid} disabled:opacity-55 disabled:cursor-not-allowed`}
                  disabled={!canContinue}
                  onClick={() => navigate("/book/date-time")}
                >
                  Continue
                </button>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <BookingSummary
                step={1}
                title={service?.fullName || "Select a service"}
                rows={summaryRows}
                fee={feeLabel}
                ctaDisabled={!canContinue}
                onContinue={() => navigate("/book/date-time")}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
