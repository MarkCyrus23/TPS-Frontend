import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../auth";
import { peso, to12 } from "./payUtils";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;
const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

function StatCard({ title, value, subtitle, variant = "light" }) {
    const base =
        "h-[140px] overflow-hidden border px-[23px] py-[22px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";
    const styles = {
        dark: "bg-[#1f4d3f] border-[#c7b6b6]",
        warn: "bg-gradient-to-b from-[#fdf1bc] to-[#fffbdd] from-0% to-25% border-[#2020203d]",
        light: "bg-white border-[#2020203d]",
    };
    const label = variant === "dark" ? "text-[#a8c8b8]" : "text-[#666]";
    const num = variant === "dark" ? "text-white" : "text-[#202020]";
    return (
        <div className={`${base} ${styles[variant]}`}>
            <div className={`${inter} text-[11px] font-bold ${label}`}>{title}</div>
            <div className={`${inter} mt-[14px] text-[32px] font-bold leading-none ${num}`}>{value}</div>
            <p className={`${inter} mt-[12px] text-[11px] font-bold ${label}`}>{subtitle}</p>
        </div>
    );
}

const statusBadge = {
    to_verify: ["To verify", "bg-[#fdf1bc] text-[#7a5400]"],
    verified: ["Verified", "bg-[#e3f2ee] text-[#2a8570]"],
    rejected: ["Rejected", "bg-red-100 text-red-700"],
};

function PaymentRow({ p, onOpen }) {
    const created = new Date(p.created_at);
    const isDown = p.payment_type === "down";
    const [statusText, statusCls] = statusBadge[p.status] || statusBadge.to_verify;
    const sched = `${new Date(p.date + "T00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })}, ${to12(p.start_time)}`;

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[#c7b6b6] bg-white p-4 transition hover:shadow-md md:flex-nowrap">
            <div className="min-w-[90px] rounded-[8px] bg-[#e3f2ee] p-3 text-center">
                <div className={`${serif} text-2xl font-bold leading-none text-[#2f4a42]`}>
                    {created.getDate()}
                </div>
                <div className={`${serif} text-xs text-[#2a8570]`}>
                    {created.toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className={`${serif} mt-1 text-[10px] text-[#666]`}>
                    {created.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </div>
            </div>

            <div className="min-w-[200px] flex-1">
                <h4 className={`${serif} text-[16px] font-bold text-black`}>{p.client_name || "Client"}</h4>
                <p className={`${serif} text-[12px] text-[#666]`}>
                    {p.service_name} · {sched}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={`${inter} rounded-full px-3 py-1 text-[11px] font-bold ${isDown ? "bg-[#fdf1bc] text-[#7a5400]" : "bg-[#e3f2ee] text-[#2a8570]"
                        }`}
                >
                    {isDown ? "Downpayment" : "Full payment"}
                </span>
                <span className={`${inter} rounded-full bg-[#f2f2f2] px-3 py-1 text-[11px] font-bold text-[#202020]`}>
                    {p.method}
                </span>
            </div>

            <div className="min-w-[100px] text-right">
                <div className={`${inter} text-[16px] font-bold text-[#202020]`}>{peso(p.amount_paid)}</div>
                <div className={`${serif} text-[11px] text-[#666]`}>
                    {isDown ? `Balance ${peso(p.balance)}` : "Paid in full"}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={`${inter} rounded px-2 py-1 text-[11px] font-bold ${statusCls}`}>{statusText}</span>
                <button
                    type="button"
                    onClick={() => onOpen(p)}
                    className={`${serif} cursor-pointer rounded-[6px] px-4 py-1.5 text-[12px] transition ${p.status === "to_verify"
                            ? "border-0 bg-[#11a086] text-white hover:bg-[#0e8c75]"
                            : "border border-[#c7b6b6] bg-white text-[#2f4a42] hover:bg-[#e3f2ee]"
                        }`}
                >
                    {p.status === "to_verify" ? "Review receipt" : "View receipt"}
                </button>
            </div>
        </div>
    );
}

function ReceiptModal({ p, base, onClose, onUpdated }) {
    const [busy, setBusy] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const act = async (kind) => {
        setBusy(true);
        setError("");
        try {
            const d = await apiFetch(`${base}/payments/${p.id}/${kind}`, {
                method: "POST",
                body: JSON.stringify(kind === "reject" ? { reason: reason.trim() || null } : {}),
            });
            onUpdated(d.payment);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setBusy(false);
        }
    };

    const rows = [
        ["Reference", p.reference],
        ["Client", p.client_name],
        ["Email", p.client_email],
        ["Mobile", p.client_mobile],
        ["Service", p.service_name],
        [
            "Schedule",
            `${new Date(p.date + "T00:00").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })} · ${to12(p.start_time)} - ${to12(p.end_time)}`,
        ],
        ["Method", p.method],
        ["Sender number", p.wallet_number],
        ["Reference no.", p.reference_number],
        ["Session fee", peso(p.total_amount)],
        ["Amount paid", peso(p.amount_paid)],
        ["Balance", peso(p.balance)],
    ];

    return (
        <div
            className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/45 p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 rounded-2xl bg-white p-6 shadow-xl max-[720px]:grid-cols-1">
                <div>
                    <h3 className={`${serif} m-0 mb-3 text-xl text-[#202020]`}>Proof of payment</h3>
                    <a href={p.receipt_url} target="_blank" rel="noreferrer">
                        <img
                            src={p.receipt_url}
                            alt="Receipt"
                            className="max-h-[460px] w-full rounded-lg border border-black/10 object-contain"
                        />
                    </a>
                    <p className={`${serif} mt-2 text-[11px] text-[#666]`}>Click the image to open it full size.</p>
                </div>

                <div>
                    <h3 className={`${serif} m-0 mb-3 text-xl text-[#202020]`}>Details</h3>
                    <dl className="m-0 grid gap-2 text-sm">
                        {rows.map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-3">
                                <dt className="m-0 text-[#666]">{k}</dt>
                                <dd className="m-0 break-all text-right font-medium text-[#202020]">{v || "—"}</dd>
                            </div>
                        ))}
                    </dl>

                    {p.status === "rejected" && p.reject_reason && (
                        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                            Rejected: {p.reject_reason}
                        </p>
                    )}

                    {error && (
                        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                            {error}
                        </p>
                    )}

                    {rejecting && (
                        <textarea
                            rows={2}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason (optional)"
                            className={`${serif} mt-3 w-full resize-none rounded-md border border-black/20 p-2 text-sm`}
                        />
                    )}

                    <div className="mt-5 flex flex-wrap justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${serif} cursor-pointer rounded-md border border-[#c7b6b6] bg-white px-4 py-2 text-sm`}
                        >
                            Close
                        </button>
                        {p.status === "to_verify" && !rejecting && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => setRejecting(true)}
                                className={`${serif} cursor-pointer rounded-md border border-red-300 bg-white px-4 py-2 text-sm text-red-700 disabled:opacity-60`}
                            >
                                Reject
                            </button>
                        )}
                        {p.status === "to_verify" && rejecting && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => act("reject")}
                                className={`${serif} cursor-pointer rounded-md border-0 bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60`}
                            >
                                {busy ? "Please wait…" : "Confirm reject"}
                            </button>
                        )}
                        {p.status === "to_verify" && !rejecting && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => act("verify")}
                                className={`${serif} cursor-pointer rounded-md border-0 bg-[#11a086] px-4 py-2 text-sm text-white hover:bg-[#0e8c75] disabled:opacity-60`}
                            >
                                {busy ? "Please wait…" : "Verify payment"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Props:
 *  Nav               - AdminNavigation o AffiliateNavigation
 *  base              - "/admin" o "/affiliate" (API prefix)
 *  canManageMethods  - true lang para sa admin (may tab papuntang Payment methods)
 */
export default function PaymentsBoard({ Nav, base, canManageMethods = false }) {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(null);

    const load = () => {
        setLoading(true);
        apiFetch(`${base}/payments`)
            .then((d) => {
                setPayments(d.payments || []);
                setStats(d.stats || null);
            })
            .catch((err) => setError(err.message || "Could not load payments."))
            .finally(() => setLoading(false));
    };

    useEffect(load, [base]); // eslint-disable-line react-hooks/exhaustive-deps

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return payments.filter(
            (p) =>
                !q ||
                (p.client_name || "").toLowerCase().includes(q) ||
                (p.reference || "").toLowerCase().includes(q)
        );
    }, [payments, search]);

    const groups = useMemo(() => {
        const today = new Date().toDateString();
        const yest = new Date(Date.now() - 86400000).toDateString();
        const map = new Map();
        filtered.forEach((p) => {
            const d = new Date(p.created_at);
            const key = d.toDateString();
            const label =
                key === today
                    ? "TODAY"
                    : key === yest
                        ? "YESTERDAY"
                        : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
            if (!map.has(key)) map.set(key, { label, items: [] });
            map.get(key).items.push(p);
        });
        return [...map.values()];
    }, [filtered]);

    const onUpdated = (np) => {
        setPayments((list) => list.map((p) => (p.id === np.id ? np : p)));
        setOpen(np);
        load(); // i-refresh ang stats
    };

    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>
            <Nav />

            <main className="flex-1 overflow-y-auto px-[41px] pb-[60px] pt-[51px]">
                <header className="flex items-start justify-between">
                    <div>
                        <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e]`}>PAYMENT</div>
                        <h1 className={`${serif} mt-[8px] text-[40px] font-bold leading-[1.15] text-[#2f4a42]`}>
                            receipts &amp; payments.
                        </h1>
                        <p className={`${serif} mt-[8px] max-w-xl text-[13px] text-[#666]`}>
                            See everyone who paid a downpayment or the full amount, and open the receipt they uploaded.
                        </p>
                    </div>
                    <div className="flex h-[30px] w-[190px] items-center justify-center rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee]">
                        <span className={`${inter} text-[12px] font-bold text-[#2a8570]`}>{todayLabel}</span>
                    </div>
                </header>

                <section className="mt-[34px] grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
                    <StatCard variant="dark" title="VERIFIED PAYMENTS" value={peso(stats?.verified_total)} subtitle="Total verified" />
                    <StatCard variant="warn" title="RECEIPTS TO VERIFY" value={stats?.to_verify ?? 0} subtitle="Waiting for review" />
                    <StatCard title="BALANCE DUE" value={peso(stats?.balance_due)} subtitle="Balance due from downpayments" />
                    <StatCard
                        title="PAYMENT SUMMARY"
                        value={`${stats?.full_count ?? 0} / ${stats?.down_count ?? 0}`}
                        subtitle="Full payments / downpayments"
                    />
                </section>

                <div className="mb-[24px] mt-[41px] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex h-[28px] items-center gap-[3px] rounded-[11px] bg-[#4a9b8e30] p-[3px]">
                        <button type="button" className={`${serif} h-[22px] rounded-[9px] bg-white px-[14px] text-[11px] text-[#202020]`}>
                            Payments Receive
                        </button>
                        {canManageMethods && (
                            <button
                                type="button"
                                onClick={() => navigate("/admin/payment-method")}
                                className={`${serif} h-[22px] cursor-pointer rounded-[9px] px-[14px] text-[11px] text-[#202020]`}
                            >
                                Payment methods
                            </button>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Search client or reference"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`${serif} w-72 rounded-[10px] border border-[#c7b6b6] bg-white px-4 py-2 text-[13px] text-black focus:outline-none focus:ring-2 focus:ring-[#4a9b8e]`}
                    />
                </div>

                {error && (
                    <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
                )}
                {loading && <p className={`${serif} text-sm text-[#666]`}>Loading payments…</p>}
                {!loading && !error && groups.length === 0 && (
                    <p className={`${serif} text-sm text-[#666]`}>No payments yet.</p>
                )}

                {groups.map((g) => (
                    <section key={g.label} className="mb-[32px]">
                        <div className="mb-4 flex items-center gap-4">
                            <h3 className={`${inter} text-[12px] font-bold tracking-[2.5px] text-[#4a9b8e]`}>{g.label}</h3>
                            <div className="h-px flex-1 bg-[#c7b6b6]" />
                        </div>
                        <div className="space-y-[14px]">
                            {g.items.map((p) => (
                                <PaymentRow key={p.id} p={p} onOpen={setOpen} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            {open && <ReceiptModal p={open} base={base} onClose={() => setOpen(null)} onUpdated={onUpdated} />}
        </div>
    );
}