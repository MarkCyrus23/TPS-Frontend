import React, { useState } from "react";
import AdminNavigation from "./adminnavigation";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";
const Card = ({ className = "", children }) => (
    <section className={`relative bg-white rounded-[10px] border border-[#c7b6b6] ${className}`}>
        {children}
    </section>
);

const CardTitle = ({ children, className = "" }) => (
    <h2 className={`${serif} text-[16px] text-black ${className}`}>{children}</h2>
);

/* Same asymmetric stat-card shape used on the Dashboard */
const statCardBase =
    "relative overflow-hidden border border-[#2020203d] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";

const Header = ({ eyebrow, title, description }) => (
    <header className="flex items-start justify-between">
        <div>
            <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e]`}>{eyebrow}</div>
            <h1 className={`${serif} mt-[8px] text-[40px] font-bold leading-[1.15]`}>{title}</h1>
            {description && (
                <p className={`${serif} mt-[8px] max-w-[472px] text-[14px] font-bold text-[#2f4a42]`}>{description}</p>
            )}
        </div>
        <div className="flex items-center gap-[17px]">
            <div className="flex h-[30px] w-[170px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className={`${inter} text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
            </div>
            <button
                aria-label="Notifications"
                className="relative flex h-[37px] w-[46px] items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span className="absolute right-[10px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#e07b6a]" />
            </button>
        </div>
    </header>
);

function AppShell({ eyebrow, title, description, children }) {
    return (
        <div className="flex min-h-screen w-full min-w-[1440px] bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>
            <AdminNavigation />
            <main className="flex-1 px-[41px] pb-[60px] pt-[51px]">
                <Header eyebrow={eyebrow} title={title} description={description} />
                {children}
            </main>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const STATS = [
    { label: "VERIFIED PAYMENTS", value: "₱9,600", caption: "Open slots · next 30 days" },
    { label: "RECEIPTS", value: "3", caption: "Receipts to verify" },
    { label: "BALANCE DUE", value: "₱2,400", caption: "Balance due from downpayments" },
    { label: "PAYMENTS", value: "6 / 4", caption: "Full payments / downpayments" },
];

const METHODS = [
    {
        name: "GCash",
        letter: "G",
        badge: "#1e83e2",
        enabled: true,
        qr: "img/image-5-2.png",
        fields: [
            ["ACCOUNT NAME", "Threefold Clinic"],
            ["MOBILE NUMBER", "09289898765"],
        ],
    },
    {
        name: "Maya",
        letter: "M",
        badge: "#3d865b",
        enabled: true,
        qr: "img/image.png",
        fields: [
            ["ACCOUNT NAME", "Threefold Clinic"],
            ["MOBILE NUMBER", "09289898765"],
        ],
    },
    {
        name: "BDO Unibank",
        letter: "B",
        badge: "#1e83e2",
        enabled: true,
        qr: "img/image-5.png",
        fields: [
            ["ACCOUNT NAME", "Threefold Clinic"],
            ["ACCOUNT NUMBER", "0012 3456 7890"],
            ["BANK", "BDO Unibank"],
        ],
    },
    {
        name: "BPI",
        letter: "B",
        badge: "#ff4d4d",
        enabled: false,
        qr: "img/image-5-3.png",
        fields: [
            ["ACCOUNT NAME", "Threefold Clinic"],
            ["ACCOUNT NUMBER", "0012 3456 7890"],
            ["BANK", "BPI"],
        ],
    },
];

/* ------------------------------------------------------------------ */
/*  Blocks                                                             */
/* ------------------------------------------------------------------ */
const StatCard = ({ label, value, caption }) => (
    <div className={`${statCardBase} flex h-[130px] flex-col bg-white px-[23px] pt-[24px]`}>
        <div className={`${inter} text-[11px] font-bold text-[#666]`}>{label}</div>
        <div className={`${inter} mt-[14px] text-[24px] font-bold text-[#202020]`}>{value}</div>
        <p className={`${inter} mt-[8px] text-[11px] font-bold text-[#666]`}>{caption}</p>
    </div>
);

const Toggle = ({ on, onChange, label }) => (
    <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className={`relative h-[26px] w-[50px] shrink-0 rounded-full transition-colors ${on ? "bg-[#2a8570]" : "bg-[#989898]"}`}
    >
        <span
            className={`absolute top-[4px] h-[18px] w-[19px] rounded-full bg-white transition-all ${on ? "left-[27px]" : "left-[4px]"}`}
        />
    </button>
);

const MethodCard = ({ name, letter, badge, enabled, qr, fields }) => {
    const [on, setOn] = useState(enabled);
    return (
        <Card className="p-[18px]">
            <div className="flex items-center gap-[12px]">
                <span
                    className={`${serif} flex h-[29px] w-[33px] items-center justify-center rounded-[9px] text-[16px] text-white`}
                    style={{ background: badge }}
                >
                    {letter}
                </span>
                <div className="flex-1">
                    <CardTitle>{name}</CardTitle>
                    <p className={`${serif} text-[11px] text-[#666]`}>Shown to clients when they pay</p>
                </div>
                <Toggle on={on} onChange={setOn} label={`${name} enabled`} />
            </div>

            <div className="my-[14px] h-px bg-[#e4e4e4]" />

            <div className={`flex gap-[20px] ${on ? "" : "opacity-60"}`}>
                <img src={qr} alt={`${name} QR`} className="h-[89px] w-[87px] shrink-0 object-cover" />
                <dl className="flex flex-col gap-[10px]">
                    {fields.map(([label, value]) => (
                        <div key={label}>
                            <dt className={`${inter} text-[8px] font-bold tracking-[1.28px] text-[#666]`}>{label}</dt>
                            <dd className={`${serif} text-[13px] text-[#202020]`}>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <button
                type="button"
                className={`${serif} mt-[16px] h-[33px] w-[107px] rounded-[7px] border border-[#00000052] bg-white text-[14px] font-bold text-[#202020] hover:bg-[#f2f2f2]`}
            >
                Edit details
            </button>
        </Card>
    );
};

const Tabs = () => {
    const [tab, setTab] = useState("methods");
    const item = (id, text) => (
        <button
            type="button"
            onClick={() => setTab(id)}
            className={`${serif} h-[20px] rounded-[11px] px-[12px] text-[10px] text-[#202020] ${tab === id ? "bg-white" : ""}`}
        >
            {text}
        </button>
    );
    return (
        <div className="inline-flex h-[28px] items-center gap-[2px] rounded-[11px] bg-[#4a9b8e30] p-[4px]">
            {item("receive", "Payments Receive")}
            {item("methods", "Payment methods")}
        </div>
    );
};

const PaymentTerms = () => (
    <Card className="p-[16px]">
        <CardTitle>Payment Terms</CardTitle>
        <p className={`${serif} text-[11px] text-black`}>How much clients pay to hold a slot.</p>

        <label className={`${serif} mt-[14px] block text-[11px] text-[#666]`}>Downpayment</label>
        <select
            defaultValue="50"
            className={`${serif} mt-[6px] h-[30px] w-full rounded-[4px] border border-[#00000033] bg-white px-[10px] text-[11px] text-[#666]`}
        >
            <option value="50">50% downpayment , balance later</option>
            <option value="100">Full payment upfront</option>
        </select>

        <label className={`${serif} mt-[14px] block text-[11px] text-[#666]`}>Note shown to clients</label>
        <textarea
            rows={3}
            defaultValue="Please send your receipt right after paying. A downpayment holds your slot, and the balance is paid on or before your session."
            className={`${serif} mt-[6px] w-full resize-none rounded-[4px] border border-[#00000033] bg-white p-[10px] text-[11px] text-[#666]`}
        />
    </Card>
);

const AddMethod = () => (
    <section className="rounded-[12px] border border-dashed border-[#666] bg-white p-[16px]">
        <CardTitle>Add another way to pay</CardTitle>
        <p className={`${serif} text-[11px] text-[#666]`}>
            Another bank, an e-wallet, or anything your clients use.
        </p>
        <div className="mt-[14px] flex gap-[12px]">
            <input
                placeholder="GoTyme"
                className={`${serif} h-[30px] flex-1 rounded-[4px] border border-[#00000033] bg-white px-[10px] text-[11px] text-[#666]`}
            />
            <button
                type="button"
                className={`${serif} h-[30px] rounded-[4px] bg-[#4a9b8e] px-[14px] text-[11px] font-bold text-white hover:bg-[#3f8a7d]`}
            >
                +&nbsp;&nbsp;Add
            </button>
        </div>
    </section>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PaymentMethods() {
    return (
        <AppShell
            eyebrow="PAYMENT"
            title={<span className="text-[#2f4a42]">receipts &amp; payments.</span>}
            description="See everyone who paid a downpayment or the full amount, open the receipt they uploaded, and set where clients should send their money."
        >
            <div className="mt-[34px] grid grid-cols-4 gap-[29px]">
                {STATS.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            <div className="mt-[28px]">
                <Tabs />
            </div>

            <div className="mt-[16px] grid grid-cols-2 items-start gap-[24px]">
                <PaymentTerms />
                <AddMethod />
            </div>

            <div className="mt-[24px] grid grid-cols-2 gap-[24px]">
                {METHODS.map((m) => (
                    <MethodCard key={m.name} {...m} />
                ))}
            </div>
        </AppShell>
    );
}