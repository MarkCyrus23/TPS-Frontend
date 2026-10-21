import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, Reveal, container, btnSolid, btnGhost } from "../components/Layout";
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
  "font-serif text-[0.9rem] text-[#202020] bg-white border border-black/14 rounded-lg py-[11px] px-3.5 w-full outline-none transition-[border-color,box-shadow] duration-150 focus:border-tf-teal focus:shadow-[0_0_0_3px_rgba(74,155,142,0.15)] placeholder:text-[#666]/75";
const inputError = "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.2)]";

function Field({ id, label, hint, error, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="font-serif font-bold text-[0.85rem] text-[#202020]">
        {label}
        <span className="ml-1 text-red-500">*</span>
        {hint && (
          <span className="ml-1.5 font-sans font-normal text-[0.7rem] text-[#666]">{hint}</span>
        )}
      </label>
      {children}
      {error && <p className="m-0 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function UserInfo() {
  const navigate = useNavigate();
  const { booking, updateClient, service, summaryRows, feeLabel, dateLabel } = useBooking();
  const c = booking.client;

  const [fullName, setFullName] = useState(c.fullName);
  const [birthdate, setBirthdate] = useState(c.birthdate);
  const [email, setEmail] = useState(c.email);
  const [mobile, setMobile] = useState(c.mobile);
  const [emergencyName, setEmergencyName] = useState(c.emergencyName);
  const [emergencyRelation, setEmergencyRelation] = useState(c.emergencyRelation);
  const [emergencyPhone, setEmergencyPhone] = useState(c.emergencyPhone);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    fullName: fullName.trim().length < 2 ? "Full name is required." : "",
    birthdate: !birthdate ? "Date of birth is required." : "",
    email: !email.includes("@") ? "Enter a valid email address." : "",
    mobile: mobile.trim().length < 6 ? "Mobile number is required." : "",
    emergencyName: emergencyName.trim().length < 2 ? "Emergency contact name is required." : "",
    emergencyRelation: !emergencyRelation.trim() ? "Relationship is required." : "",
    emergencyPhone: emergencyPhone.trim().length < 6 ? "Emergency phone is required." : "",
    agreed: !agreed ? "You must agree to data privacy terms." : "",
  };

  const canContinue = Object.values(errors).every((e) => !e);

  const persist = () => {
    updateClient({
      fullName: fullName.trim(),
      birthdate,
      email: email.trim(),
      mobile: mobile.trim(),
      emergencyName: emergencyName.trim(),
      emergencyRelation: emergencyRelation.trim(),
      emergencyPhone: emergencyPhone.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canContinue) return;
    persist();
    navigate("/book/review");
  };

  return (
    <div className={pageShell}>
      <Navbar />
      <main className={mainPad}>
        <div className={container}>
          <Reveal>
            <StepRail current={2} />
          </Reveal>
          <div className={gridClass}>
            <Reveal className={panelClass} delay={140}>
              <header>
                <h2 className="m-0 mb-1.5 font-serif text-[1.4rem] font-normal text-[#202020]">
                  Tell us about you
                </h2>
                <p className="m-0 text-sm text-[#666]">
                  Session format (online or in-person) will be determined by your psychologist after booking.
                </p>
              </header>
              <form className="flex flex-col gap-[18px] mt-4" onSubmit={onSubmit} noValidate>
                <p className="m-0 font-sans font-semibold text-[0.78rem] tracking-[0.1em] text-tf-teal">
                  ABOUT YOU
                </p>
                <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                  <Field id="fullName" label="Full name" error={submitted && errors.fullName}>
                    <input
                      id="fullName"
                      type="text"
                      className={`${inputClass} ${submitted && errors.fullName ? inputError : ""}`}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Field>
                  <Field id="birthdate" label="Date of birth" error={submitted && errors.birthdate}>
                    <input
                      id="birthdate"
                      type="date"
                      className={`${inputClass} ${submitted && errors.birthdate ? inputError : ""}`}
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </Field>
                </div>

                <p className="m-0 mt-3 font-sans font-semibold text-[0.78rem] tracking-[0.1em] text-tf-teal">
                  HOW TO REACH YOU
                </p>
                <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                  <Field id="email" label="Email address" error={submitted && errors.email}>
                    <input
                      id="email"
                      type="email"
                      className={`${inputClass} ${submitted && errors.email ? inputError : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                  <Field id="mobile" label="Mobile number" error={submitted && errors.mobile}>
                    <input
                      id="mobile"
                      type="tel"
                      className={`${inputClass} ${submitted && errors.mobile ? inputError : ""}`}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Field>
                </div>

                <p className="m-0 mt-3 font-sans font-semibold text-[0.78rem] tracking-[0.1em] text-tf-teal">
                  EMERGENCY CONTACT
                </p>
                <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                  <Field
                    id="emName"
                    label="Contact name"
                    error={submitted && errors.emergencyName}
                  >
                    <input
                      id="emName"
                      type="text"
                      className={`${inputClass} ${submitted && errors.emergencyName ? inputError : ""}`}
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                    />
                  </Field>
                  <Field
                    id="emRelation"
                    label="Relationship to client"
                    error={submitted && errors.emergencyRelation}
                  >
                    <input
                      id="emRelation"
                      type="text"
                      placeholder="e.g. Parent, Spouse, Sibling"
                      className={`${inputClass} ${submitted && errors.emergencyRelation ? inputError : ""}`}
                      value={emergencyRelation}
                      onChange={(e) => setEmergencyRelation(e.target.value)}
                    />
                  </Field>
                  <Field
                    id="emMobile"
                    label="Contact phone number"
                    error={submitted && errors.emergencyPhone}
                    className="max-[720px]:col-span-1 col-span-2"
                  >
                    <input
                      id="emMobile"
                      type="tel"
                      className={`${inputClass} ${submitted && errors.emergencyPhone ? inputError : ""}`}
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                    />
                  </Field>
                </div>

                <div className="rounded-xl border border-tf-teal/30 bg-tf-soft px-4 py-3 text-sm text-tf-ink">
                  <strong className="font-serif">Note:</strong> Online or in-person session format is
                  decided by your assigned psychologist. You do not need to choose a format here.
                </div>

                <label className="flex items-start gap-3 bg-[rgba(154,197,190,0.24)] rounded-[13px] py-3.5 px-4 cursor-pointer font-serif font-bold text-[0.85rem] text-[#666]/75 leading-[1.45]">
                  <input
                    type="checkbox"
                    className="shrink-0 w-5 h-5 mt-px accent-tf-teal cursor-pointer"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    I agree to the processing of my personal information in line with the Data Privacy
                    Act.
                  </span>
                </label>
                {submitted && errors.agreed && (
                  <p className="m-0 -mt-2 text-xs text-red-600">{errors.agreed}</p>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap mt-4 pt-5 border-t border-dashed border-[#d0e5dd]">
                  <Link to="/book/date-time" className={btnGhost}>
                    Back
                  </Link>
                  <button
                    type="submit"
                    className={`${btnSolid} disabled:opacity-55 disabled:cursor-not-allowed`}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </Reveal>
            <Reveal delay={200}>
              <BookingSummary
                step={3}
                title={service?.fullName || "Booking"}
                rows={[
                  ...summaryRows.slice(0, 2),
                  { label: "DATE & TIME", value: dateLabel },
                ]}
                fee={feeLabel}
                ctaDisabled={!canContinue}
                onContinue={() => {
                  setSubmitted(true);
                  if (!canContinue) return;
                  persist();
                  navigate("/book/review");
                }}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
