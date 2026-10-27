import React, { useState } from "react";
import AdminNavigation from "./adminnavigation";
import ProfileMenu from "../components/ProfileMenu";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;
const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Mock data (palitan ng API call)                                    */
/* ------------------------------------------------------------------ */
const SEED = [
    { id: 1, name: "Psychotherapy / Counseling", description: "One-on-one sessions for emotional and mental health concerns.", hours: 1, price: 1500, color: "#345e51" },
    { id: 2, name: "ABA Therapy", description: "Applied Behavior Analysis for children and teens.", hours: 2, price: 1750, color: "#34b09a" },
    { id: 3, name: "Assessment & Consultation", description: "Initial evaluation and recommended care plan.", hours: 1.5, price: 2000, color: "#4a9b8e" },
];

const MIN_HOURS = 0.5;
const MAX_HOURS = 8;
const STEP = 0.5;
const COLORS = ["#345e51", "#34b09a", "#4a9b8e", "#2a8570", "#52b788"];

const fmtHours = (h) => `${h} ${h === 1 ? "hr" : "hrs"}`;
const fmtPeso = (n) => `₱${Number(n).toLocaleString()}`;

// 16px sa mobile para hindi mag-auto-zoom ang iOS Safari kapag nag-focus sa input
const inputCls = `${inter} h-[40px] rounded-[6px] border border-[#c7b6b6] bg-white px-[12px] text-[16px] text-[#202020] outline-none focus:border-[#4a9b8e] focus:ring-2 focus:ring-[#4a9b8e]/25 sm:h-[38px] sm:text-[13px]`;

const Field = ({ label, children }) => (
    <label className="flex flex-col gap-[6px]">
        <span className={`${inter} text-[12px] font-bold text-[#666]`}>{label}</span>
        {children}
    </label>
);

/* ------------------------------------------------------------------ */
/*  Duration stepper — saves right away                                */
/* ------------------------------------------------------------------ */
const stepBtn =
    "flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#c7b6b6] bg-white text-[18px] text-[#202020] hover:bg-[#f2f2f2] disabled:opacity-40 sm:h-[28px] sm:w-[28px] sm:text-[16px]";

const DurationStepper = ({ hours, onChange }) => (
    <div className="flex items-center gap-[10px]">
        <button
            aria-label="Decrease duration"
            disabled={hours <= MIN_HOURS}
            onClick={() => onChange(hours - STEP)}
            className={stepBtn}
        >
            −
        </button>
        <span className={`${inter} min-w-[64px] text-center text-[18px] font-bold text-[#202020]`}>{fmtHours(hours)}</span>
        <button
            aria-label="Increase duration"
            disabled={hours >= MAX_HOURS}
            onClick={() => onChange(hours + STEP)}
            className={stepBtn}
        >
            +
        </button>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Add / edit modal                                                   */
/* ------------------------------------------------------------------ */
const ServiceModal = ({ service, onClose, onSave }) => {
    const [form, setForm] = useState(
        service || { name: "", description: "", hours: 1, price: "", color: COLORS[0] }
    );
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const hoursOk = form.hours >= MIN_HOURS && form.hours <= MAX_HOURS;
    const valid = form.name.trim() && hoursOk && Number(form.price) >= 0 && form.price !== "";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-[16px]" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-[10px] border border-[#c7b6b6] bg-white p-[20px] sm:p-[28px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={`${serif} text-[20px] font-bold text-[#2f4a42]`}>
                    {service ? "Edit service" : "Add service"}
                </h2>
                <div className="mt-[20px] flex flex-col gap-[14px]">
                    <Field label="Service name">
                        <input className={inputCls} value={form.name} onChange={set("name")} />
                    </Field>
                    <Field label="Description">
                        <textarea
                            rows={3}
                            className={`${inputCls} h-auto py-[8px]`}
                            value={form.description}
                            onChange={set("description")}
                        />
                    </Field>
                    <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                        <Field label="Duration (hours)">
                            <input
                                type="number"
                                min={MIN_HOURS}
                                max={MAX_HOURS}
                                step={STEP}
                                className={inputCls}
                                value={form.hours}
                                onChange={(e) => setForm({ ...form, hours: parseFloat(e.target.value) || 0 })}
                            />
                        </Field>
                        <Field label="Price per session (₱)">
                            <input type="number" min={0} className={inputCls} value={form.price} onChange={set("price")} />
                        </Field>
                    </div>
                    {!hoursOk && (
                        <p className={`${serif} text-[11px] text-[#b3382a]`}>
                            Duration must be between {MIN_HOURS} and {MAX_HOURS} hours.
                        </p>
                    )}
                    <Field label="Color">
                        <div className="flex flex-wrap gap-[12px] sm:gap-[10px]">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    aria-label={`Color ${c}`}
                                    aria-pressed={form.color === c}
                                    onClick={() => setForm({ ...form, color: c })}
                                    className={`h-[32px] w-[32px] rounded-full sm:h-[26px] sm:w-[26px] ${form.color === c ? "ring-2 ring-offset-2 ring-[#202020]" : ""}`}
                                    style={{ background: c }}
                                />
                            ))}
                        </div>
                    </Field>
                </div>
                <div className="mt-[24px] flex justify-end gap-[10px]">
                    <button onClick={onClose} className={`${serif} h-[38px] rounded-[6px] border border-[#c7b6b6] bg-white px-[16px] text-[13px] text-[#202020] hover:bg-[#f2f2f2] sm:h-[34px]`}>
                        Cancel
                    </button>
                    <button
                        disabled={!valid}
                        onClick={() => onSave({ ...form, price: Number(form.price) })}
                        className={`${serif} h-[38px] rounded-[6px] bg-[#11a086] px-[16px] text-[13px] text-white hover:bg-[#0e8c75] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[34px]`}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AdminServices() {
    const [services, setServices] = useState(SEED);
    const [modal, setModal] = useState(null); // null | "new" | service
    const [toast, setToast] = useState("");
    const [navOpen, setNavOpen] = useState(false); // mobile drawer para sa AdminNavigation

    const notify = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const save = (form) => {
        if (form.id) {
            setServices((p) => p.map((s) => (s.id === form.id ? form : s)));
            notify("Service updated");
        } else {
            setServices((p) => [...p, { ...form, id: Date.now() }]);
            notify("Service added");
        }
        setModal(null);
    };

    const changeHours = (s, hours) => {
        setServices((p) => p.map((x) => (x.id === s.id ? { ...x, hours } : x)));
        notify(`${s.name} is now ${fmtHours(hours)}`);
    };

    const remove = (s) => {
        if (!window.confirm(`Delete "${s.name}"? Clients won't be able to book it anymore.`)) return;
        setServices((p) => p.filter((x) => x.id !== s.id));
        notify("Service deleted");
    };

    return (
        <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>

            {/* Sidebar: laging nakikita sa lg pataas */}
            <div className="hidden lg:block">
                <AdminNavigation />
            </div>

            {/* Sidebar: drawer sa mobile/tablet */}
            {navOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="h-full overflow-y-auto bg-white">
                        <AdminNavigation />
                    </div>
                    <button
                        aria-label="Close menu"
                        onClick={() => setNavOpen(false)}
                        className="flex-1 bg-black/40"
                    />
                </div>
            )}

            <main className="min-w-0 flex-1 px-[16px] pb-[48px] pt-[20px] sm:px-[28px] sm:pt-[32px] lg:px-[41px] lg:pb-[60px] lg:pt-[51px]">
                <header className="flex items-start justify-between gap-[12px]">
                    <div className="min-w-0">
                        <div className="flex items-center gap-[12px]">
                            <button
                                onClick={() => setNavOpen(true)}
                                aria-label="Open menu"
                                className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white text-[#2f4a42] lg:hidden"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className={`${inter} text-[14px] font-bold tracking-[3px] text-[#4a9b8e] sm:text-[20px] sm:tracking-[4.2px]`}>
                                SERVICES
                            </div>
                        </div>
                        <h1 className={`${serif} mt-[8px] text-[28px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[34px] lg:text-[40px]`}>
                            Manage services
                        </h1>
                        <p className={`${serif} mt-[4px] text-[13px] text-[#666] sm:text-[14px]`}>
                            Add or remove services and set how long each session lasts.
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-[10px] sm:gap-[17px]">
                        <button
                            onClick={() => setModal("new")}
                            aria-label="Add service"
                            className={`${inter} flex h-[37px] items-center gap-[8px] rounded-[8px] bg-[#1f4d3f] px-[12px] text-[13px] font-bold text-white hover:bg-[#2f4a42] sm:px-[16px]`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span className="hidden sm:inline">Add service</span>
                        </button>
                        <ProfileMenu size={37} />
                    </div>
                </header>

                {services.length === 0 ? (
                    <section className="mt-[24px] rounded-[10px] border border-[#c7b6b6] bg-white px-[16px] py-[48px] text-center sm:mt-[34px] sm:px-[24px] sm:py-[64px]">
                        <p className={`${serif} text-[15px] text-[#202020]`}>No services yet.</p>
                        <p className={`${serif} mt-[4px] text-[13px] text-[#666]`}>Add your first service so clients can book it.</p>
                        <button
                            onClick={() => setModal("new")}
                            className={`${serif} mt-[16px] h-[38px] rounded-[6px] bg-[#11a086] px-[16px] text-[13px] text-white hover:bg-[#0e8c75] sm:h-[34px]`}
                        >
                            Add service
                        </button>
                    </section>
                ) : (
                    <div className="mt-[24px] grid grid-cols-1 gap-[16px] sm:mt-[34px] md:grid-cols-2 md:gap-[20px] xl:grid-cols-3 xl:gap-[29px]">
                        {services.map((s) => (
                            <section
                                key={s.id}
                                className="relative flex flex-col overflow-hidden rounded-[10px] border border-[#c7b6b6] bg-white"
                            >
                                <div className="h-[6px] w-full" style={{ background: s.color }} />
                                <div className="flex flex-1 flex-col p-[20px] sm:p-[24px]">
                                    <h2 className={`${serif} text-[18px] font-bold text-[#202020]`}>{s.name}</h2>
                                    <p className={`${serif} mt-[6px] text-[13px] leading-[18px] text-[#666] sm:min-h-[54px]`}>
                                        {s.description || "No description."}
                                    </p>

                                    <div className="mt-[18px] flex flex-wrap items-end justify-between gap-x-[16px] gap-y-[14px] border-t border-[#e8e8e8] pt-[16px]">
                                        <div>
                                            <div className={`${serif} mb-[8px] text-[11px] text-[#666]`}>Session length</div>
                                            <DurationStepper hours={s.hours} onChange={(h) => changeHours(s, h)} />
                                        </div>
                                        <div className="text-right">
                                            <div className={`${serif} mb-[8px] text-[11px] text-[#666]`}>Price</div>
                                            <div className={`${inter} text-[18px] font-bold text-[#202020]`}>{fmtPeso(s.price)}</div>
                                        </div>
                                    </div>

                                    <div className="mt-[20px] flex justify-end gap-[6px]">
                                        <button
                                            onClick={() => setModal(s)}
                                            className={`${serif} h-[34px] rounded-[4px] border border-[#c7b6b6] bg-white px-[14px] text-[12px] text-[#202020] hover:bg-[#f2f2f2] sm:h-[26px] sm:px-[12px] sm:text-[11px]`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => remove(s)}
                                            className={`${serif} h-[34px] rounded-[4px] border border-[#ff4c4c75] bg-white px-[14px] text-[12px] text-[#ff5656] hover:bg-[#fff1f1] sm:h-[26px] sm:px-[12px] sm:text-[11px]`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </main>

            {modal && (
                <ServiceModal
                    service={modal === "new" ? null : modal}
                    onClose={() => setModal(null)}
                    onSave={save}
                />
            )}

            {toast && (
                <div role="status" className={`${inter} fixed bottom-[16px] left-[16px] right-[16px] z-[70] rounded-[8px] bg-[#2f4a42] px-[18px] py-[10px] text-center text-[13px] text-white sm:bottom-[28px] sm:left-auto sm:right-[28px] sm:text-left`}>
                    {toast}
                </div>
            )}
        </div>
    );
}