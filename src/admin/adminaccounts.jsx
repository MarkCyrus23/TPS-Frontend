import React, { useMemo, useState } from "react";
import AdminNavigation from "./adminnavigation";
import ProfileMenu from "../components/ProfileMenu";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;
const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Mock data (palitan ng API call)                                    */
/* ------------------------------------------------------------------ */
const SEED = [
    { id: 1, name: "Juan Delacruz", email: "juan.delacruz@gmail.com", phone: "0917 123 4567", role: "Client", status: "Active", joined: "Oct 02, 2026" },
    { id: 2, name: "Maria Reyes", email: "maria.reyes@gmail.com", phone: "0918 234 5678", role: "Client", status: "Active", joined: "Sep 21, 2026" },
    { id: 3, name: "Dr. Ana Santos", email: "ana.santos@threefold.ph", phone: "0919 345 6789", role: "Psychologist", status: "Active", joined: "Jan 11, 2026" },
    { id: 4, name: "Dr. Paolo Lim", email: "paolo.lim@threefold.ph", phone: "0920 456 7890", role: "Psychologist", status: "Active", joined: "Mar 04, 2026" },
    { id: 5, name: "Carla Mendoza", email: "carla.m@gmail.com", phone: "0921 567 8901", role: "Affiliate", status: "Pending", joined: "Oct 14, 2026" },
    { id: 6, name: "Ramon Tan", email: "ramon.tan@yahoo.com", phone: "0922 678 9012", role: "Client", status: "Suspended", joined: "Jun 18, 2026" },
    { id: 7, name: "Liza Aquino", email: "liza.aquino@gmail.com", phone: "0923 789 0123", role: "Affiliate", status: "Active", joined: "Aug 30, 2026" },
    { id: 8, name: "Dr. Joy Villanueva", email: "joy.v@threefold.ph", phone: "0924 890 1234", role: "Psychologist", status: "Pending", joined: "Oct 12, 2026" },
];

const ROLES = ["All", "Client", "Psychologist", "Affiliate"];
const STATUS_STYLE = {
    Active: "bg-[#d7eee8] text-[#1f6b55]",
    Pending: "bg-[#fdf1bc] text-[#8a6a00]",
    Suspended: "bg-[#fde3df] text-[#b3382a]",
};
const PAGE_SIZE = 6;

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
const Avatar = ({ name }) => {
    const initials = name.replace("Dr. ", "").split(" ").map((p) => p[0]).slice(0, 2).join("");
    return (
        <span className={`${inter} flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#4a9b8e30] text-[12px] font-bold text-[#1f6b55]`}>
            {initials}
        </span>
    );
};

const StatusBadge = ({ status }) => (
    <span className={`${serif} inline-flex h-[20px] items-center rounded-full px-[10px] text-[11px] font-bold ${STATUS_STYLE[status]}`}>
        {status}
    </span>
);

const Field = ({ label, children }) => (
    <label className="flex flex-col gap-[6px]">
        <span className={`${inter} text-[12px] font-bold text-[#666]`}>{label}</span>
        {children}
    </label>
);

// 16px sa mobile para hindi mag-auto-zoom ang iOS Safari kapag nag-focus sa input
const inputCls = `${inter} h-[40px] rounded-[6px] border border-[#c7b6b6] bg-white px-[12px] text-[16px] text-[#202020] outline-none focus:border-[#4a9b8e] focus:ring-2 focus:ring-[#4a9b8e]/25 sm:h-[38px] sm:text-[13px]`;

// Mas malaking tap target sa mobile (32px), original size (24px) sa md pataas
const actionBtn = `${serif} h-[32px] rounded-[4px] border px-[12px] text-[12px] md:h-[24px] md:px-[10px] md:text-[11px]`;
const neutralBtn = `${actionBtn} border-[#c7b6b6] bg-white text-[#202020] hover:bg-[#f2f2f2]`;

const RowActions = ({ a, onApprove, onEdit, onSuspend, onDelete, className = "" }) => (
    <div className={`flex flex-wrap gap-[6px] ${className}`}>
        {a.status === "Pending" && (
            <button onClick={() => onApprove(a)} className={`${actionBtn} border-transparent bg-[#11a086] text-white hover:bg-[#0e8c75]`}>
                Approve
            </button>
        )}
        <button onClick={() => onEdit(a)} className={neutralBtn}>Edit</button>
        {a.status !== "Pending" && (
            <button onClick={() => onSuspend(a)} className={neutralBtn}>
                {a.status === "Suspended" ? "Reactivate" : "Suspend"}
            </button>
        )}
        <button onClick={() => onDelete(a)} className={`${actionBtn} border-[#ff4c4c75] bg-white text-[#ff5656] hover:bg-[#fff1f1]`}>
            Delete
        </button>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Add / edit modal                                                   */
/* ------------------------------------------------------------------ */
const AccountModal = ({ account, onClose, onSave }) => {
    const isEdit = !!account;
    const [form, setForm] = useState(
        account ? { ...account, password: "" } : { name: "", email: "", phone: "", password: "", role: "Client", status: "Active" }
    );
    const [showPw, setShowPw] = useState(false);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const phoneOk = /^(09|\+639)\d{9}$/.test((form.phone || "").replace(/[\s-]/g, ""));
    // New account: password required. Edit: blank = keep current password.
    const pwOk = isEdit ? form.password === "" || form.password.length >= 8 : form.password.length >= 8;
    const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && phoneOk && pwOk;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-[16px]" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-[440px] overflow-y-auto rounded-[10px] border border-[#c7b6b6] bg-white p-[20px] sm:p-[28px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={`${serif} text-[20px] font-bold text-[#2f4a42]`}>
                    {account ? "Edit account" : "Add account"}
                </h2>
                <div className="mt-[20px] flex flex-col gap-[14px]">
                    <Field label="Full name"><input className={inputCls} value={form.name} onChange={set("name")} /></Field>
                    <Field label="Email"><input type="email" className={inputCls} value={form.email} onChange={set("email")} /></Field>
                    <Field label="Phone number">
                        <input type="tel" placeholder="0917 123 4567" className={inputCls} value={form.phone} onChange={set("phone")} />
                        {form.phone && !phoneOk && (
                            <span className={`${serif} text-[11px] text-[#b3382a]`}>Use a PH mobile number, e.g. 0917 123 4567.</span>
                        )}
                    </Field>
                    <Field label={isEdit ? "New password" : "Password"}>
                        <div className="relative">
                            <input
                                type={showPw ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder={isEdit ? "Leave blank to keep current" : "At least 8 characters"}
                                className={`${inputCls} w-full pr-[60px]`}
                                value={form.password}
                                onChange={set("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className={`${serif} absolute right-[10px] top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#2a8570] underline`}
                            >
                                {showPw ? "Hide" : "Show"}
                            </button>
                        </div>
                        {form.password && form.password.length < 8 && (
                            <span className={`${serif} text-[11px] text-[#b3382a]`}>Password must be at least 8 characters.</span>
                        )}
                    </Field>
                    <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                        <Field label="Role">
                            <select className={inputCls} value={form.role} onChange={set("role")}>
                                {ROLES.slice(1).map((r) => <option key={r}>{r}</option>)}
                            </select>
                        </Field>
                        <Field label="Status">
                            <select className={inputCls} value={form.status} onChange={set("status")}>
                                {Object.keys(STATUS_STYLE).map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </Field>
                    </div>
                </div>
                <div className="mt-[24px] flex justify-end gap-[10px]">
                    <button onClick={onClose} className={`${serif} h-[38px] rounded-[6px] border border-[#c7b6b6] bg-white px-[16px] text-[13px] text-[#202020] hover:bg-[#f2f2f2] sm:h-[34px]`}>
                        Cancel
                    </button>
                    <button
                        disabled={!valid}
                        onClick={() => onSave(form)}
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
export default function AdminAccounts() {
    const [accounts, setAccounts] = useState(SEED);
    const [role, setRole] = useState("All");
    const [status, setStatus] = useState("All");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(null); // null | "new" | account object
    const [toast, setToast] = useState("");
    const [navOpen, setNavOpen] = useState(false); // mobile drawer para sa AdminNavigation

    const notify = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return accounts.filter(
            (a) =>
                (role === "All" || a.role === role) &&
                (status === "All" || a.status === status) &&
                (!q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q))
        );
    }, [accounts, role, status, query]);

    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const current = Math.min(page, pages);
    const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

    const count = (r) => (r === "All" ? accounts.length : accounts.filter((a) => a.role === r).length);

    const save = (formData) => {
        // Hindi dapat naka-store ang password sa list; ipadala sa API (hashed sa backend)
        const { password, ...form } = formData;
        if (form.id) {
            setAccounts((p) => p.map((a) => (a.id === form.id ? form : a)));
            notify("Account updated");
        } else {
            setAccounts((p) => [{ ...form, id: Date.now(), joined: "Oct 26, 2026" }, ...p]);
            notify("Account added");
        }
        setModal(null);
    };

    const toggleSuspend = (a) => {
        const next = a.status === "Suspended" ? "Active" : "Suspended";
        setAccounts((p) => p.map((x) => (x.id === a.id ? { ...x, status: next } : x)));
        notify(next === "Suspended" ? "Account suspended" : "Account reactivated");
    };

    const approve = (a) => {
        setAccounts((p) => p.map((x) => (x.id === a.id ? { ...x, status: "Active" } : x)));
        notify("Account approved");
    };

    const remove = (a) => {
        if (!window.confirm(`Delete ${a.name}'s account? This can't be undone.`)) return;
        setAccounts((p) => p.filter((x) => x.id !== a.id));
        notify("Account deleted");
    };

    const actionProps = { onApprove: approve, onEdit: setModal, onSuspend: toggleSuspend, onDelete: remove };

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
                {/* Header */}
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
                                ACCOUNTS
                            </div>
                        </div>
                        <h1 className={`${serif} mt-[8px] text-[28px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[34px] lg:text-[40px]`}>
                            Manage accounts
                        </h1>
                        <p className={`${serif} mt-[4px] text-[13px] text-[#666] sm:text-[14px]`}>
                            Add, approve, edit, or suspend clients, psychologists, and affiliates.
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-[10px] sm:gap-[17px]">
                        <button
                            onClick={() => setModal("new")}
                            aria-label="Add account"
                            className={`${inter} flex h-[37px] items-center gap-[8px] rounded-[8px] bg-[#1f4d3f] px-[12px] text-[13px] font-bold text-white hover:bg-[#2f4a42] sm:px-[16px]`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span className="hidden sm:inline">Add account</span>
                        </button>
                        <ProfileMenu size={37} />
                    </div>
                </header>

                {/* Role tabs */}
                <div className="mt-[24px] grid grid-cols-2 gap-[12px] sm:mt-[34px] lg:grid-cols-4 lg:gap-[29px]">
                    {ROLES.map((r) => {
                        const on = role === r;
                        return (
                            <button
                                key={r}
                                onClick={() => { setRole(r); setPage(1); }}
                                aria-pressed={on}
                                className={`relative h-[88px] overflow-hidden rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px] border px-[16px] text-left transition-colors sm:h-[100px] lg:h-[110px] lg:px-[23px] ${on ? "border-[#c7b6b6] bg-[#1f4d3f]" : "border-[#2020203d] bg-white hover:bg-[#fafafa]"
                                    }`}
                            >
                                <div className={`${inter} text-[10px] font-bold sm:text-[11px] ${on ? "text-[#a8c8b8]" : "text-[#666]"}`}>
                                    {r === "All" ? "ALL ACCOUNTS" : r.toUpperCase() + "S"}
                                </div>
                                <div className={`${inter} mt-[10px] text-[26px] font-bold sm:mt-[14px] sm:text-[32px] ${on ? "text-white" : "text-[#202020]"}`}>
                                    {count(r)}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Table card */}
                <section className="mt-[24px] rounded-[10px] border border-[#c7b6b6] bg-white sm:mt-[32px]">
                    <div className="flex flex-col gap-[12px] px-[16px] py-[16px] sm:px-[24px] sm:py-[20px] md:flex-row md:items-center md:justify-between md:gap-[16px]">
                        <div>
                            <h2 className={`${serif} text-[16px] text-black`}>
                                {role === "All" ? "All accounts" : `${role}s`}
                            </h2>
                            <p className={`${serif} text-[11px] text-[#666]`}>{filtered.length} found</p>
                        </div>
                        <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center sm:gap-[12px]">
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                                placeholder="Search name or email"
                                aria-label="Search accounts"
                                className={`${inputCls} w-full sm:flex-1 md:w-[220px] md:flex-none lg:w-[260px]`}
                            />
                            <select
                                value={status}
                                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                                aria-label="Filter by status"
                                className={`${inputCls} w-full sm:w-[150px]`}
                            >
                                {["All", ...Object.keys(STATUS_STYLE)].map((s) => (
                                    <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mobile: card list (< md) */}
                    <ul className="md:hidden">
                        {rows.map((a) => (
                            <li key={a.id} className="border-t border-[#e8e8e8] px-[16px] py-[14px]">
                                <div className="flex items-start gap-[12px]">
                                    <Avatar name={a.name} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-[8px]">
                                            <div className={`${serif} text-[14px] text-black`}>{a.name}</div>
                                            <StatusBadge status={a.status} />
                                        </div>
                                        <div className={`${serif} mt-[2px] break-all text-[12px] text-[#666]`}>{a.email}</div>
                                        <div className={`${serif} text-[12px] text-[#666]`}>{a.phone}</div>
                                        <div className={`${serif} mt-[4px] text-[12px] text-[#666]`}>
                                            {a.role} · Joined {a.joined}
                                        </div>
                                    </div>
                                </div>
                                <RowActions a={a} {...actionProps} className="mt-[12px]" />
                            </li>
                        ))}
                        {rows.length === 0 && (
                            <li className={`${serif} border-t border-[#e8e8e8] px-[16px] py-[40px] text-center text-[13px] text-[#666]`}>
                                No accounts match these filters. Clear the search or pick another role.
                            </li>
                        )}
                    </ul>

                    {/* Tablet/desktop: table (md pataas) */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full border-t border-[#e8e8e8] text-left">
                            <thead>
                                <tr className={`${inter} text-[11px] font-bold text-[#666]`}>
                                    <th className="px-[24px] py-[12px] font-bold">Name</th>
                                    <th className="py-[12px] pr-[12px] font-bold">Role</th>
                                    <th className="py-[12px] pr-[12px] font-bold">Status</th>
                                    <th className="hidden py-[12px] pr-[12px] font-bold xl:table-cell">Joined</th>
                                    <th className="px-[24px] py-[12px] text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((a) => (
                                    <tr key={a.id} className="border-t border-[#e8e8e8] hover:bg-[#fafafa]">
                                        <td className="px-[24px] py-[12px]">
                                            <div className="flex items-center gap-[12px]">
                                                <Avatar name={a.name} />
                                                <div className="min-w-0">
                                                    <div className={`${serif} text-[13px] text-black`}>{a.name}</div>
                                                    <div className={`${serif} break-all text-[11px] text-[#666]`}>{a.email} · {a.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`${serif} pr-[12px] text-[13px] text-black`}>{a.role}</td>
                                        <td className="pr-[12px]"><StatusBadge status={a.status} /></td>
                                        <td className={`${serif} hidden pr-[12px] text-[13px] text-[#666] xl:table-cell`}>{a.joined}</td>
                                        <td className="px-[24px]">
                                            <RowActions a={a} {...actionProps} className="justify-end" />
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className={`${serif} px-[24px] py-[48px] text-center text-[13px] text-[#666]`}>
                                            No accounts match these filters. Clear the search or pick another role.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between gap-[12px] border-t border-[#e8e8e8] px-[16px] py-[14px] sm:px-[24px]">
                        <span className={`${serif} text-[11px] text-[#666]`}>
                            Page {current} of {pages}
                        </span>
                        <div className="flex gap-[6px]">
                            <button
                                disabled={current === 1}
                                onClick={() => setPage(current - 1)}
                                className={`${serif} h-[32px] rounded-[4px] border border-[#c7b6b6] bg-white px-[14px] text-[12px] disabled:opacity-40 sm:h-[24px] sm:px-[12px] sm:text-[11px]`}
                            >
                                Previous
                            </button>
                            <button
                                disabled={current === pages}
                                onClick={() => setPage(current + 1)}
                                className={`${serif} h-[32px] rounded-[4px] border border-[#c7b6b6] bg-white px-[14px] text-[12px] disabled:opacity-40 sm:h-[24px] sm:px-[12px] sm:text-[11px]`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {modal && (
                <AccountModal
                    account={modal === "new" ? null : modal}
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