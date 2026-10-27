import React, { useMemo, useState } from "react";
import AdminNavigation from "./adminnavigation";
import ProfileMenu from "../components/ProfileMenu";
import { sendClientMessage } from "./messageApi";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;
const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Mock data (palitan ng API call)                                    */
/* ------------------------------------------------------------------ */
const SEED = [
    {
        id: 1, name: "Juan Delacruz", email: "juan.delacruz@gmail.com", phone: "0917 123 4567",
        birthdate: "1994-03-12", address: "Taguig City", guardian: "",
        emergencyName: "Rosa Delacruz", emergencyPhone: "0918 111 2222",
        status: "Active", joined: "2026-02-02",
        appointments: [
            { id: 1, date: "Oct 19, 2026 · 10:00 AM", service: "Psychotherapy", by: "Dr. Santos", mode: "Online", status: "Confirmed" },
            { id: 2, date: "Oct 12, 2026 · 10:00 AM", service: "Psychotherapy", by: "Dr. Santos", mode: "In-person", status: "Completed" },
            { id: 3, date: "Oct 05, 2026 · 10:00 AM", service: "Psychotherapy", by: "Dr. Santos", mode: "In-person", status: "Completed" },
        ],
        payments: [
            { id: 1, date: "Oct 12, 2026", amount: 1500, method: "GCash", status: "Paid" },
            { id: 2, date: "Oct 05, 2026", amount: 1500, method: "GCash", status: "Paid" },
            { id: 3, date: "Oct 19, 2026", amount: 1500, method: "GCash", status: "To verify" },
        ],
    },
    {
        id: 2, name: "Maria Reyes", email: "maria.reyes@gmail.com", phone: "0918 234 5678",
        birthdate: "1989-07-30", address: "Makati City", guardian: "",
        emergencyName: "Pedro Reyes", emergencyPhone: "0919 333 4444",
        status: "Active", joined: "2026-09-21",
        appointments: [
            { id: 1, date: "Oct 22, 2026 · 2:00 PM", service: "Assessment & Consultation", by: "Dr. Lim", mode: "In-person", status: "Pending" },
        ],
        payments: [],
    },
    {
        id: 3, name: "Miguel Tan", email: "tan.family@yahoo.com", phone: "0922 678 9012",
        birthdate: "2018-11-04", address: "Pasig City", guardian: "Ramon Tan (father)",
        emergencyName: "Ramon Tan", emergencyPhone: "0922 678 9012",
        status: "Inactive", joined: "2026-06-18",
        appointments: [
            { id: 1, date: "Sep 10, 2026 · 9:00 AM", service: "ABA Therapy", by: "Dr. Lim", mode: "In-person", status: "Completed" },
            { id: 2, date: "Sep 17, 2026 · 9:00 AM", service: "ABA Therapy", by: "Dr. Lim", mode: "In-person", status: "Cancelled" },
        ],
        payments: [{ id: 1, date: "Sep 10, 2026", amount: 3500, method: "Bank transfer", status: "Paid" }],
    },
];

const STATUS_STYLE = {
    Active: "bg-[#d7eee8] text-[#1f6b55]",
    Inactive: "bg-[#eeeeee] text-[#666]",
    Completed: "bg-[#d7eee8] text-[#1f6b55]",
    Confirmed: "bg-[#e3f2ee] text-[#2a8570]",
    Pending: "bg-[#fdf1bc] text-[#8a6a00]",
    Cancelled: "bg-[#fde3df] text-[#b3382a]",
    Paid: "bg-[#d7eee8] text-[#1f6b55]",
    "To verify": "bg-[#fdf1bc] text-[#8a6a00]",
    Refunded: "bg-[#eeeeee] text-[#666]",
};

const EMPTY = {
    name: "", email: "", phone: "", birthdate: "", address: "", guardian: "",
    emergencyName: "", emergencyPhone: "", status: "Active", appointments: [], payments: [],
};

const peso = (n) => `₱${Number(n).toLocaleString()}`;
const fmtDate = (iso) =>
    iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—";
const ageOf = (iso) => (iso ? Math.floor((Date.now() - new Date(iso)) / 31557600000) : null);
const phoneOk = (v) => /^(09|\+639)\d{9}$/.test((v || "").replace(/[\s-]/g, ""));

// 16px sa mobile para hindi mag-zoom ang iOS kapag nag-focus sa input
const inputCls = `${inter} h-[38px] w-full min-w-0 rounded-[6px] border border-[#c7b6b6] bg-white px-[12px] text-[16px] sm:text-[13px] text-[#202020] outline-none focus:border-[#4a9b8e] focus:ring-2 focus:ring-[#4a9b8e]/25`;

const Field = ({ label, error, children }) => (
    <label className="flex min-w-0 flex-col gap-[6px]">
        <span className={`${inter} text-[12px] font-bold text-[#666]`}>{label}</span>
        {children}
        {error && <span className={`${serif} text-[11px] text-[#b3382a]`}>{error}</span>}
    </label>
);

const Pill = ({ children }) => (
    <span className={`${serif} inline-flex h-[20px] shrink-0 items-center whitespace-nowrap rounded-full px-[10px] text-[11px] font-bold ${STATUS_STYLE[children] || ""}`}>
        {children}
    </span>
);

const Avatar = ({ name, size = 34 }) => (
    <span
        className={`${inter} flex shrink-0 items-center justify-center rounded-full bg-[#4a9b8e30] text-[12px] font-bold text-[#1f6b55]`}
        style={{ width: size, height: size }}
    >
        {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
    </span>
);

/* ------------------------------------------------------------------ */
/*  Message modal                                                      */
/* ------------------------------------------------------------------ */
const SMS_LIMIT = 160;
const firstName = (n) => n.split(" ")[0];
const TEMPLATES = [
    {
        label: "Appointment reminder",
        subject: "Appointment reminder",
        body: (n) => `Hi ${firstName(n)}, this is a reminder about your upcoming appointment at Threefold. Please let us know if you need to reschedule.`,
    },
    {
        label: "Payment reminder",
        subject: "Payment reminder",
        body: (n) => `Hi ${firstName(n)}, we're still waiting on your payment for your recent session. Please send your proof of payment when you can. Thank you!`,
    },
    {
        label: "Follow-up",
        subject: "Checking in",
        body: (n) => `Hi ${firstName(n)}, we're checking in after your last session. Reply here if you'd like to book your next appointment.`,
    },
];

const MessageModal = ({ client, onClose, onSent }) => {
    const [channel, setChannel] = useState("Email");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const isSms = channel === "SMS";
    const emailOk = /\S+@\S+\.\S+/.test(client.email);
    const smsOk = phoneOk(client.phone);
    const destination = isSms ? client.phone : client.email;
    const destOk = isSms ? smsOk : emailOk;
    const valid = destOk && body.trim() && (isSms || subject.trim());

    const applyTemplate = (t) => {
        setSubject(t.subject);
        setBody(t.body(client.name));
    };

    const send = async () => {
        setSending(true);
        setError("");
        try {
            await sendClientMessage(client.id, { channel, subject: isSms ? undefined : subject.trim(), body: body.trim() });
            onSent(client);
        } catch (e) {
            setError(e.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-[92vh] w-full overflow-y-auto rounded-t-[16px] border border-[#c7b6b6] bg-white p-5 sm:max-w-[500px] sm:rounded-[10px] sm:p-[28px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={`${serif} text-[20px] font-bold text-[#2f4a42]`}>Message {client.name}</h2>

                <div className="mt-[16px] flex h-[34px] w-fit rounded-[11px] bg-[#4a9b8e30] p-[3px]">
                    {["Email", "SMS"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setChannel(c)}
                            className={`${serif} rounded-[11px] px-[18px] text-[12px] text-[#202020] ${channel === c ? "bg-white" : ""}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <p className={`${serif} mt-[10px] break-words text-[12px] ${destOk ? "text-[#666]" : "text-[#b3382a]"}`}>
                    {destOk
                        ? `To: ${destination}`
                        : `This client has no valid ${isSms ? "mobile number" : "email"} on file. Update their profile first.`}
                </p>

                <div className="mt-[14px]">
                    <span className={`${inter} text-[12px] font-bold text-[#666]`}>Quick templates</span>
                    <div className="mt-[6px] flex flex-wrap gap-[6px]">
                        {TEMPLATES.map((t) => (
                            <button
                                key={t.label}
                                type="button"
                                onClick={() => applyTemplate(t)}
                                className={`${serif} h-[30px] rounded-full border border-[#c7b6b6] bg-white px-[12px] text-[11px] hover:bg-[#f2f2f2] sm:h-[26px]`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-[14px] flex flex-col gap-[14px]">
                    {!isSms && (
                        <Field label="Subject">
                            <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Field>
                    )}
                    <Field label="Message">
                        <textarea
                            rows={6}
                            className={`${inputCls} h-auto py-[8px]`}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {isSms && (
                            <span className={`${serif} text-[11px] ${body.length > SMS_LIMIT ? "text-[#8a6a00]" : "text-[#666]"}`}>
                                {body.length}/{SMS_LIMIT} characters{body.length > SMS_LIMIT ? " · will be sent as multiple texts" : ""}
                            </span>
                        )}
                    </Field>
                </div>

                <p className={`${serif} mt-[12px] text-[11px] text-[#666]`}>
                    Don't include diagnoses or other sensitive clinical details in emails or texts.
                </p>
                {error && <p role="alert" className={`${serif} mt-[8px] text-[12px] text-[#b3382a]`}>Couldn't send: {error}</p>}

                <div className="mt-[20px] flex gap-[10px] max-sm:[&>button]:flex-1 sm:justify-end">
                    <button onClick={onClose} className={`${serif} h-[40px] rounded-[6px] border border-[#c7b6b6] bg-white px-[16px] text-[13px] hover:bg-[#f2f2f2] sm:h-[34px]`}>
                        Cancel
                    </button>
                    <button
                        disabled={!valid || sending}
                        onClick={send}
                        className={`${serif} h-[40px] rounded-[6px] bg-[#11a086] px-[16px] text-[13px] text-white hover:bg-[#0e8c75] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[34px]`}
                    >
                        {sending ? "Sending…" : "Send message"}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Detail drawer                                                      */
/* ------------------------------------------------------------------ */
const ClientDrawer = ({ client, isNew, onClose, onSave, onDelete, onMessage }) => {
    const [tab, setTab] = useState("Profile");
    const [form, setForm] = useState(client);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const minor = ageOf(form.birthdate) !== null && ageOf(form.birthdate) < 18;
    const errors = {
        phone: form.phone && !phoneOk(form.phone) ? "Use a PH mobile number, e.g. 0917 123 4567." : "",
        emergencyPhone: form.emergencyPhone && !phoneOk(form.emergencyPhone) ? "Use a PH mobile number." : "",
        guardian: minor && !form.guardian.trim() ? "Add a parent or guardian for clients under 18." : "",
    };
    const valid =
        form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && phoneOk(form.phone) &&
        !errors.emergencyPhone && !errors.guardian;

    const paidTotal = form.payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const tabs = isNew ? ["Profile"] : ["Profile", "Appointments", "Payments"];

    return (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={onClose}>
            <aside
                role="dialog"
                aria-modal="true"
                className="flex h-full w-full flex-col bg-white sm:w-[540px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Head */}
                <div className="flex items-start justify-between gap-3 border-b border-[#e8e8e8] px-5 py-5 sm:px-[28px] sm:py-[24px]">
                    <div className="flex min-w-0 items-center gap-[14px]">
                        {!isNew && <Avatar name={form.name || "?"} size={48} />}
                        <div className="min-w-0">
                            <h2 className={`${serif} truncate text-[20px] font-bold text-[#2f4a42] sm:text-[22px]`}>
                                {isNew ? "Add client" : form.name}
                            </h2>
                            {!isNew && (
                                <p className={`${serif} text-[12px] text-[#666]`}>Client since {fmtDate(client.joined)}</p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="grid h-[36px] w-[36px] shrink-0 place-items-center text-[24px] leading-none text-[#666] hover:text-black">×</button>
                </div>

                {/* Tabs */}
                <div className="px-5 pt-4 sm:px-[28px]">
                    <div className="flex h-[34px] w-fit max-w-full overflow-x-auto rounded-[11px] bg-[#4a9b8e30] p-[3px]">
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`${serif} shrink-0 rounded-[11px] px-[16px] text-[12px] text-[#202020] ${tab === t ? "bg-white" : ""}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-[28px]">
                    {tab === "Profile" && (
                        <div className="flex flex-col gap-[14px]">
                            <Field label="Full name"><input className={inputCls} value={form.name} onChange={set("name")} /></Field>
                            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                                <Field label="Email"><input type="email" className={inputCls} value={form.email} onChange={set("email")} /></Field>
                                <Field label="Phone number" error={errors.phone}>
                                    <input type="tel" className={inputCls} value={form.phone} onChange={set("phone")} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                                <Field label="Birthdate"><input type="date" className={inputCls} value={form.birthdate} onChange={set("birthdate")} /></Field>
                                <Field label="Status">
                                    <select className={inputCls} value={form.status} onChange={set("status")}>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </Field>
                            </div>
                            <Field label="Address"><input className={inputCls} value={form.address} onChange={set("address")} /></Field>
                            <Field label="Parent / guardian (for clients under 18)" error={errors.guardian}>
                                <input className={inputCls} value={form.guardian} onChange={set("guardian")} />
                            </Field>
                            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                                <Field label="Emergency contact"><input className={inputCls} value={form.emergencyName} onChange={set("emergencyName")} /></Field>
                                <Field label="Emergency phone" error={errors.emergencyPhone}>
                                    <input type="tel" className={inputCls} value={form.emergencyPhone} onChange={set("emergencyPhone")} />
                                </Field>
                            </div>
                        </div>
                    )}

                    {tab === "Appointments" && (
                        <ul>
                            {form.appointments.length === 0 && (
                                <li className={`${serif} py-[32px] text-center text-[13px] text-[#666]`}>No appointments yet.</li>
                            )}
                            {form.appointments.map((a) => (
                                <li key={a.id} className="flex items-center justify-between gap-3 border-b border-[#e8e8e8] py-[12px] last:border-0">
                                    <div className="min-w-0">
                                        <div className={`${serif} text-[13px] text-black`}>{a.service} · {a.by}</div>
                                        <div className={`${serif} text-[11px] text-[#666]`}>{a.date} · {a.mode}</div>
                                    </div>
                                    <Pill>{a.status}</Pill>
                                </li>
                            ))}
                        </ul>
                    )}

                    {tab === "Payments" && (
                        <>
                            <div className="mb-[8px] flex items-baseline justify-between">
                                <span className={`${serif} text-[12px] text-[#666]`}>Total paid</span>
                                <span className={`${inter} text-[20px] font-bold text-[#202020]`}>{peso(paidTotal)}</span>
                            </div>
                            <ul>
                                {form.payments.length === 0 && (
                                    <li className={`${serif} py-[32px] text-center text-[13px] text-[#666]`}>No payments yet.</li>
                                )}
                                {form.payments.map((p) => (
                                    <li key={p.id} className="flex items-center justify-between gap-3 border-b border-[#e8e8e8] py-[12px] last:border-0">
                                        <div className="min-w-0">
                                            <div className={`${serif} text-[13px] text-black`}>{peso(p.amount)} via {p.method}</div>
                                            <div className={`${serif} text-[11px] text-[#666]`}>{p.date}</div>
                                        </div>
                                        <Pill>{p.status}</Pill>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Foot */}
                <div className="flex flex-col gap-3 border-t border-[#e8e8e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-[28px]">
                    {isNew ? <span /> : (
                        <div className="flex gap-[10px] max-sm:[&>button]:flex-1">
                            <button
                                onClick={() => onMessage(client)}
                                className={`${serif} h-[40px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee] px-[16px] text-[13px] text-[#2a8570] hover:bg-[#d7eee8] sm:h-[34px]`}
                            >
                                Message
                            </button>
                            <button
                                onClick={() => onDelete(client)}
                                className={`${serif} h-[40px] rounded-[6px] border border-[#ff4c4c75] bg-white px-[16px] text-[13px] text-[#ff5656] hover:bg-[#fff1f1] sm:h-[34px]`}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    <div className="flex gap-[10px] max-sm:[&>button]:flex-1">
                        <button onClick={onClose} className={`${serif} h-[40px] rounded-[6px] border border-[#c7b6b6] bg-white px-[16px] text-[13px] hover:bg-[#f2f2f2] sm:h-[34px]`}>
                            Cancel
                        </button>
                        <button
                            disabled={!valid}
                            onClick={() => onSave(form)}
                            className={`${serif} h-[40px] rounded-[6px] bg-[#11a086] px-[16px] text-[13px] text-white hover:bg-[#0e8c75] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[34px]`}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AdminClients() {
    const [clients, setClients] = useState(SEED);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("All");
    const [open, setOpen] = useState(null); // null | "new" | client
    const [messageTo, setMessageTo] = useState(null);
    const [toast, setToast] = useState("");

    const notify = (m) => {
        setToast(m);
        setTimeout(() => setToast(""), 2500);
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return clients.filter(
            (c) =>
                (status === "All" || c.status === status) &&
                (!q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q))
        );
    }, [clients, query, status]);

    const save = (form) => {
        if (form.id) {
            setClients((p) => p.map((c) => (c.id === form.id ? form : c)));
            notify("Client updated");
        } else {
            setClients((p) => [{ ...form, id: Date.now(), joined: new Date().toISOString().slice(0, 10) }, ...p]);
            notify("Client added");
        }
        setOpen(null);
    };

    const remove = (c) => {
        if (!window.confirm(`Delete ${c.name}? Their appointments and payment records will be removed too.`)) return;
        setClients((p) => p.filter((x) => x.id !== c.id));
        setOpen(null);
        notify("Client deleted");
    };

    const toVerify = (c) => c.payments.filter((p) => p.status === "To verify").length;
    const upcoming = (c) => c.appointments.filter((a) => a.status === "Confirmed" || a.status === "Pending").length;
    const stats = [
        ["TOTAL CLIENTS", clients.length],
        ["ACTIVE", clients.filter((c) => c.status === "Active").length],
        ["UPCOMING APPOINTMENTS", clients.reduce((s, c) => s + upcoming(c), 0)],
        ["PAYMENTS TO VERIFY", clients.reduce((s, c) => s + toVerify(c), 0)],
    ];

    const actionBtn = `${serif} h-[34px] rounded-[4px] px-[12px] text-[12px] xl:h-[24px] xl:px-[10px] xl:text-[11px]`;

    return (
        <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>
            <AdminNavigation />

            {/* pt-[68px] sa phone para hindi matakpan ng hamburger button */}
            <main className="min-w-0 flex-1 px-4 pb-[60px] pt-[68px] sm:px-6 lg:px-[41px] lg:pt-[51px]">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className={`${inter} text-[14px] font-bold tracking-[4.2px] text-[#4a9b8e] sm:text-[20px]`}>CLIENTS</div>
                        <h1 className={`${serif} mt-[8px] text-[30px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[40px]`}>Client management</h1>
                        <p className={`${serif} mt-[4px] text-[14px] text-[#666]`}>
                            Update client information and review their appointments and payments.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-[17px]">
                        <button
                            onClick={() => setOpen("new")}
                            className={`${inter} flex h-[40px] items-center gap-[8px] rounded-[8px] bg-[#1f4d3f] px-[16px] text-[13px] font-bold text-white hover:bg-[#2f4a42] lg:h-[37px]`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                            Add client
                        </button>
                        <ProfileMenu size={37} />
                    </div>
                </header>

                {/* Stats */}
                <div className="mt-[28px] grid grid-cols-2 gap-3 sm:mt-[34px] sm:gap-4 xl:grid-cols-4 xl:gap-[29px]">
                    {stats.map(([label, n], i) => (
                        <div
                            key={label}
                            className={`relative min-h-[96px] overflow-hidden rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px] border px-4 py-4 sm:min-h-[110px] sm:px-[23px] sm:py-0 ${i === 0 ? "border-[#c7b6b6] bg-[#1f4d3f]" : i === 3 ? "border-[#2020203d] bg-gradient-to-b from-[#fdf1bc] to-[#fffbdd] from-0% to-25%" : "border-[#2020203d] bg-white"
                                }`}
                        >
                            <div className={`${inter} text-[10px] font-bold sm:mt-[24px] sm:text-[11px] ${i === 0 ? "text-[#a8c8b8]" : "text-[#666]"}`}>{label}</div>
                            <div className={`${inter} mt-[8px] text-[26px] font-bold sm:mt-[10px] sm:text-[32px] ${i === 0 ? "text-white" : "text-[#202020]"}`}>{n}</div>
                        </div>
                    ))}
                </div>

                <section className="mt-[24px] rounded-[10px] border border-[#c7b6b6] bg-white sm:mt-[32px]">
                    <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className={`${serif} text-[16px] text-black`}>All clients</h2>
                            <p className={`${serif} text-[11px] text-[#666]`}>{filtered.length} found</p>
                        </div>
                        <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search name, email, or phone"
                                aria-label="Search clients"
                                className={`${inputCls} sm:!w-[280px]`}
                            />
                            <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={`${inputCls} sm:!w-[150px]`}>
                                <option value="All">All statuses</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Desktop table (xl pataas) */}
                    <div className="hidden overflow-x-auto xl:block">
                        <table className="w-full border-t border-[#e8e8e8] text-left">
                            <thead>
                                <tr className={`${inter} text-[11px] text-[#666]`}>
                                    <th className="px-[24px] py-[12px] font-bold">Client</th>
                                    <th className="py-[12px] font-bold">Phone</th>
                                    <th className="py-[12px] font-bold">Appointments</th>
                                    <th className="py-[12px] font-bold">Payments</th>
                                    <th className="py-[12px] font-bold">Status</th>
                                    <th className="px-[24px] py-[12px] text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((c) => (
                                    <tr key={c.id} className="border-t border-[#e8e8e8] hover:bg-[#fafafa]">
                                        <td className="px-[24px] py-[12px]">
                                            <div className="flex items-center gap-[12px]">
                                                <Avatar name={c.name} />
                                                <div>
                                                    <div className={`${serif} text-[13px] text-black`}>{c.name}</div>
                                                    <div className={`${serif} text-[11px] text-[#666]`}>{c.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`${serif} whitespace-nowrap text-[13px] text-black`}>{c.phone}</td>
                                        <td className={`${serif} text-[13px] text-black`}>
                                            {c.appointments.length} total{upcoming(c) > 0 && <span className="text-[#666]"> · {upcoming(c)} upcoming</span>}
                                        </td>
                                        <td className={`${serif} text-[13px] text-black`}>
                                            {toVerify(c) > 0 ? <Pill>To verify</Pill> : <span className="text-[#666]">Up to date</span>}
                                        </td>
                                        <td><Pill>{c.status}</Pill></td>
                                        <td className="px-[24px]">
                                            <div className="flex justify-end gap-[6px]">
                                                <button onClick={() => setOpen(c)} className={`${actionBtn} bg-[#11a086] text-white hover:bg-[#0e8c75]`}>
                                                    View / Edit
                                                </button>
                                                <button onClick={() => setMessageTo(c)} className={`${actionBtn} border border-[#4a9b8e] bg-[#e3f2ee] text-[#2a8570] hover:bg-[#d7eee8]`}>
                                                    Message
                                                </button>
                                                <button onClick={() => remove(c)} className={`${actionBtn} border border-[#ff4c4c75] bg-white text-[#ff5656] hover:bg-[#fff1f1]`}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile at tablet: cards */}
                    <ul className="border-t border-[#e8e8e8] xl:hidden">
                        {filtered.map((c) => (
                            <li key={c.id} className="border-b border-[#e8e8e8] p-4 last:border-0 sm:px-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-[12px]">
                                        <Avatar name={c.name} size={40} />
                                        <div className="min-w-0">
                                            <div className={`${serif} truncate text-[14px] text-black`}>{c.name}</div>
                                            <div className={`${serif} truncate text-[12px] text-[#666]`}>{c.email}</div>
                                        </div>
                                    </div>
                                    <Pill>{c.status}</Pill>
                                </div>

                                <dl className={`${serif} mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-[12px] sm:grid-cols-3`}>
                                    <div>
                                        <dt className="text-[#666]">Phone</dt>
                                        <dd className="text-black">{c.phone}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#666]">Appointments</dt>
                                        <dd className="text-black">
                                            {c.appointments.length} total{upcoming(c) > 0 && ` · ${upcoming(c)} upcoming`}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#666]">Payments</dt>
                                        <dd>{toVerify(c) > 0 ? <Pill>To verify</Pill> : <span className="text-black">Up to date</span>}</dd>
                                    </div>
                                </dl>

                                <div className="mt-4 flex gap-[8px] max-sm:[&>button]:flex-1">
                                    <button onClick={() => setOpen(c)} className={`${actionBtn} bg-[#11a086] text-white hover:bg-[#0e8c75]`}>
                                        View / Edit
                                    </button>
                                    <button onClick={() => setMessageTo(c)} className={`${actionBtn} border border-[#4a9b8e] bg-[#e3f2ee] text-[#2a8570] hover:bg-[#d7eee8]`}>
                                        Message
                                    </button>
                                    <button onClick={() => remove(c)} className={`${actionBtn} border border-[#ff4c4c75] bg-white text-[#ff5656] hover:bg-[#fff1f1]`}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {filtered.length === 0 && (
                        <p className={`${serif} border-t border-[#e8e8e8] px-6 py-12 text-center text-[13px] text-[#666]`}>
                            No clients match your search. Clear the filters or add a new client.
                        </p>
                    )}
                </section>
            </main>

            {open && (
                <ClientDrawer
                    key={open === "new" ? "new" : open.id}
                    client={open === "new" ? EMPTY : open}
                    isNew={open === "new"}
                    onClose={() => setOpen(null)}
                    onSave={save}
                    onDelete={remove}
                    onMessage={setMessageTo}
                />
            )}

            {messageTo && (
                <MessageModal
                    key={messageTo.id}
                    client={messageTo}
                    onClose={() => setMessageTo(null)}
                    onSent={(c) => {
                        setMessageTo(null);
                        notify(`Message sent to ${c.name}`);
                    }}
                />
            )}

            {toast && (
                <div role="status" className={`${inter} fixed bottom-[20px] left-4 right-4 z-[90] rounded-[8px] bg-[#2f4a42] px-[18px] py-[10px] text-center text-[13px] text-white sm:bottom-[28px] sm:left-auto sm:right-[28px] sm:text-left`}>
                    {toast}
                </div>
            )}
        </div>
    );
}