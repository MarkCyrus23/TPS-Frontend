import React, { useMemo, useState } from "react";
import AffiliateNavigation from "./affiliatenav";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Data (sample — replace with your backend data)                     */
/* ------------------------------------------------------------------ */
const DAYS = [
    { key: "today", title: "TODAY", n: 15, dow: "THU" },
    { key: "tomorrow", title: "TOMORROW", n: 16, dow: "FRI" },
    { key: "sunday", title: "SUNDAY, OCTOBER 18", n: 18, dow: "SUN" },
];

// chip = status badge, steps = progress of Requested / Accepted / Paid / Done
const STATUS = {
    pending: { chip: "Pending", cls: "bg-[#fdf1bc] text-[#7a5d00]", steps: ["current", "todo", "todo", "todo"] },
    awaiting: { chip: "Awaiting payment", cls: "bg-[#fde3d6] text-[#a4492a]", steps: ["done", "done", "current", "todo"] },
    verify: { chip: "Verify payment", cls: "bg-[#fdf1bc] text-[#7a5d00]", steps: ["done", "done", "warn", "todo"] },
    confirmed: { chip: "Confirmed", cls: "bg-[#a9d0c8] text-[#1f4d3f]", steps: ["done", "done", "done", "todo"] },
    completed: { chip: "Completed", cls: "bg-[#e6e6e6] text-[#555]", steps: ["done", "done", "done", "done"] },
};

const FILTERS = [
    ["all", "All upcoming"],
    ["pending", "Pending"],
    ["awaiting", "Awaiting payment"],
    ["verify", "To verify"],
    ["confirmed", "Confirmed"],
    ["completed", "Completed"],
];

const STEP_LABELS = ["Requested", "Accepted", "Paid", "Done"];

const PRICE = { "Psychotherapy / Counseling": "₱1,500", "ABA Therapy": "₱1,200", "Assessment & Consultation": "₱2,000" };
const fmt = (h) => `${h % 12 || 12}:00 ${h < 12 ? "AM" : "PM"}`;
const slot = (h) => `${fmt(h)} – ${fmt(h + 1)}`;

const PSY = "Psychotherapy / Counseling";
const ABA = "ABA Therapy";
const ASM = "Assessment & Consultation";

const RAW = [
    ["today", "Juan Delacruz", PSY, 9, "Online", "pending"],
    ["today", "Maria Santos", ABA, 11, "In-person", "confirmed"],
    ["today", "Carlo Bautista", PSY, 15, "Online", "completed"],
    ["tomorrow", "Juan Delacruz", PSY, 9, "Online", "confirmed"],
    ["tomorrow", "Bea Garcia", PSY, 10, "Online", "pending"],
    ["tomorrow", "Rica Lim", ASM, 14, "In-person", "awaiting"],
    ["sunday", "Juan Delacruz", PSY, 9, "Online", "confirmed"],
    ["sunday", "Juan Delacruz", PSY, 13, "Online", "verify"],
    ["sunday", "Kim Aquino", PSY, 10, "Online", "pending"],
    ["sunday", "Liza Mendoza", ABA, 14, "In-person", "awaiting"],
    ["sunday", "Noel Ramos", PSY, 15, "Online", "verify"],
    ["sunday", "Leo Flores", ABA, 16, "In-person", "confirmed"],
    ["tomorrow", "Paolo Cruz", PSY, 16, "Online", "verify"],
    ["today", "Ana Reyes", ASM, 8, "Online", "completed"],
    ["tomorrow", "Joy Pascual", ABA, 11, "In-person", "completed"],
];

const INITIAL = RAW.map(([day, name, service, h, mode, status], i) => {
    const id = i + 1;
    const [first, last = ""] = name.toLowerCase().split(" ");
    return {
        id, day, name, service, mode, status,
        time: slot(h),
        email: `${first}.${last[0] || "x"}@email.com`,
        phone: `0917 111 22${String(id).padStart(2, "0")}`,
        emergency: `0922 345 67${String(id).padStart(2, "0")}`,
        ref: `Ref: ${String(id).padStart(4, "0")}`,
        price: PRICE[service],
    };
});

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */
const DateChip = ({ className = "" }) => (
    <div className={`h-[30px] items-center justify-center rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee] px-[12px] ${className}`}>
        <span className={`${inter} whitespace-nowrap text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
    </div>
);

const Header = ({ onMenu }) => (
    <header className="flex items-start justify-between gap-[12px]">
        <div className="min-w-0">
            <div className="flex items-center gap-[12px]">
                <button
                    onClick={onMenu}
                    aria-label="Open menu"
                    className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white text-[#2f4a42] lg:hidden"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className={`${inter} text-[14px] font-bold tracking-[3px] text-[#4a9b8e] sm:text-[20px] sm:tracking-[4.2px]`}>APPOINTMENT</div>
            </div>
            <h1 className={`${serif} mt-[8px] text-[26px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[34px] lg:text-[40px]`}>
                Everyone who booked with you.
            </h1>
            {/* Date chip: nasa ilalim ng title sa mobile */}
            <DateChip className="mt-[12px] inline-flex sm:hidden" />
        </div>
        <div className="flex shrink-0 items-center gap-[12px] sm:gap-[17px]">
            <DateChip className="hidden w-[170px] sm:flex" />
            <button aria-label="Notifications" className="relative flex h-[37px] w-[46px] items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span className="absolute right-[10px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#e07b6a]" />
            </button>
        </div>
    </header>
);

const Stepper = ({ steps }) => (
    <div className="flex w-full items-start xl:w-auto" aria-label="Appointment progress">
        {steps.map((st, i) => (
            <React.Fragment key={STEP_LABELS[i]}>
                {i > 0 && (
                    <span
                        className={`mt-[11px] h-px min-w-[12px] flex-1 xl:w-[34px] xl:flex-none ${steps[i - 1] === "done" && st !== "todo" ? "bg-[#4a9b8e]" : "bg-[#b9b9b9]"}`}
                    />
                )}
                <div className="flex w-[22px] shrink-0 flex-col items-center">
                    <span
                        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border ${st === "done"
                                ? "border-[#4a9b8e] bg-[#4a9b8e]"
                                : st === "current"
                                    ? "border-[#202020] bg-white"
                                    : st === "warn"
                                        ? "border-[#e8c547] bg-[#fdf1bc]"
                                        : "border-[#b9b9b9] bg-white"
                            }`}
                    >
                        {st === "done" && (
                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 4.5 4 7.5 10 1.5" />
                            </svg>
                        )}
                    </span>
                    <span className={`${serif} mt-[4px] whitespace-nowrap text-[9px] font-bold ${st === "todo" ? "text-[#9a9a9a]" : "text-[#202020]"}`}>
                        {STEP_LABELS[i]}
                    </span>
                </div>
            </React.Fragment>
        ))}
    </div>
);

const StatusChip = ({ s, className = "" }) => (
    <span className={`${serif} h-[22px] items-center justify-center whitespace-nowrap rounded-full px-[12px] text-[10px] font-bold ${s.cls} ${className}`}>
        {s.chip}
    </span>
);

// Mas mataas ang buttons sa mobile (tap target); flex-1 sa mobile para pantay ang lapad
const btnBase = `${serif} h-[36px] flex-1 justify-center rounded-[5px] px-[14px] text-[12px] sm:h-[26px] sm:flex-none sm:text-[11px]`;

const MessageBtn = () => (
    <button className={`${btnBase} flex items-center gap-[6px] border border-[#00000024] bg-[#a9d0c8] text-[#202020] hover:bg-[#98c5bc]`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#202020" strokeWidth="2" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12Z" />
        </svg>
        Message
    </button>
);

const PrimaryBtn = ({ children, onClick }) => (
    <button onClick={onClick} className={`${btnBase} bg-[#11a086] text-white hover:bg-[#0e8c75]`}>
        {children}
    </button>
);

const AppointmentCard = ({ a, open, onToggle, setStatus, remove }) => {
    const s = STATUS[a.status];
    const day = DAYS.find((d) => d.key === a.day);
    return (
        <article className="rounded-[10px] border border-[#c7b6b6] bg-white px-[16px] pb-[16px] pt-[16px] sm:px-[24px] sm:pt-[20px]">
            {/* Mobile/tablet: date + info (+ chip) tapos stepper sa sariling row. xl pataas: isang row lang */}
            <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[16px] xl:flex-nowrap xl:gap-x-0">
                {/* date block */}
                <div className={`${serif} flex h-[68px] w-[62px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#a9d0c8] leading-[1.15] text-[#1f4d3f]`}>
                    <span className="text-[17px] font-bold">{day.n}</span>
                    <span className="text-[10px]">{day.dow}</span>
                    <span className="text-[10px]">Oct</span>
                </div>

                <div className="min-w-0 flex-1 basis-[160px] xl:ml-[22px]">
                    <div className={`${serif} text-[15px] font-bold text-[#202020]`}>{a.name}</div>
                    <div className={`${serif} mt-[2px] text-[13px] text-[#444]`}>
                        {a.service} · {a.time} · {a.mode}
                    </div>
                    {/* chip dito sa mobile/tablet */}
                    <StatusChip s={s} className="mt-[8px] inline-flex xl:hidden" />
                </div>

                <Stepper steps={s.steps} />

                {/* chip sa gilid sa xl pataas */}
                <StatusChip s={s} className="ml-[40px] hidden w-[118px] xl:flex" />
            </div>

            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-x-[12px] gap-y-[12px] border-t border-[#e8e8e8] pt-[14px]">
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    className={`${serif} flex items-center gap-[4px] py-[4px] text-[12px] font-bold text-[#222b28] underline sm:text-[11px]`}
                >
                    {open ? "Hide details" : "Client details"}
                    {open && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#222b28" strokeWidth="1.5" strokeLinecap="round">
                            <path d="m2 6.5 3-3 3 3" />
                        </svg>
                    )}
                </button>

                <div className="flex w-full items-center gap-[8px] sm:w-auto">
                    {a.status === "pending" && (
                        <button
                            onClick={() => remove(a.id)}
                            className={`${btnBase} border border-[#ff4c4c75] bg-white text-[#ff5656] hover:bg-[#fff1f1]`}
                        >
                            Decline
                        </button>
                    )}
                    <MessageBtn />
                    {a.status === "pending" && <PrimaryBtn onClick={() => setStatus(a.id, "awaiting")}>Accept</PrimaryBtn>}
                    {a.status === "verify" && <PrimaryBtn onClick={() => setStatus(a.id, "confirmed")}>Review payment</PrimaryBtn>}
                </div>
            </div>

            {open && (
                <div className="mt-[14px] grid grid-cols-1 gap-[16px] rounded-[6px] border border-[#c9d9d4] bg-[#e8f1ee] px-[16px] py-[16px] sm:grid-cols-3 sm:gap-[24px] sm:px-[24px] sm:py-[18px]">
                    <div className="min-w-0">
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Contact</div>
                        <div className={`${serif} mt-[6px] break-words text-[12px] leading-[16px] text-[#444]`}>
                            {a.email}<br />{a.phone}<br />{a.mode} session
                        </div>
                    </div>
                    <div className="min-w-0">
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Booking</div>
                        <div className={`${serif} mt-[6px] break-words text-[12px] leading-[16px] text-[#444]`}>
                            {a.ref}<br />{a.service}<br />{a.price}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Emergency Contact</div>
                        <div className={`${serif} mt-[6px] text-[12px] leading-[16px] text-[#444]`}>{a.emergency}</div>
                    </div>
                </div>
            )}
        </article>
    );
};

const DayHeading = ({ children }) => (
    <div className="mt-[28px] flex items-center gap-[14px] first:mt-0 sm:mt-[34px]">
        <h2 className={`${inter} text-[13px] font-bold tracking-[2.5px] text-[#4a9b8e] sm:whitespace-nowrap sm:text-[15px] sm:tracking-[3.15px]`}>{children}</h2>
        <span className="h-px flex-1 bg-[#c9c9c9]" />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Appointment() {
    const [items, setItems] = useState(INITIAL);
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [openIds, setOpenIds] = useState(() => new Set([1]));
    const [navOpen, setNavOpen] = useState(false); // bukas/sarado ang sidebar drawer sa mobile

    const setStatus = (id, status) => setItems((p) => p.map((a) => (a.id === id ? { ...a, status } : a)));
    const remove = (id) => setItems((p) => p.filter((a) => a.id !== id));
    const toggle = (id) =>
        setOpenIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const counts = useMemo(() => {
        const c = { all: items.filter((a) => a.status !== "completed").length };
        FILTERS.slice(1).forEach(([k]) => (c[k] = items.filter((a) => a.status === k).length));
        return c;
    }, [items]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((a) => {
            const byStatus = filter === "all" ? a.status !== "completed" : a.status === filter;
            return byStatus && (!q || a.name.toLowerCase().includes(q));
        });
    }, [items, filter, query]);

    return (
        <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>

            {/* Affiliate sidebar (may sariling drawer behavior na) */}
            <AffiliateNavigation open={navOpen} onClose={() => setNavOpen(false)} />

            <main className="min-w-0 flex-1 px-[16px] pb-[48px] pt-[20px] sm:px-[28px] sm:pt-[32px] lg:px-[36px] lg:pb-[60px] lg:pt-[51px]">
                <Header onMenu={() => setNavOpen(true)} />

                {/* Status filters */}
                <div className="mt-[28px] grid grid-cols-2 gap-[12px] sm:mt-[40px] sm:grid-cols-3 xl:mt-[56px] xl:grid-cols-6 xl:gap-[27px]">
                    {FILTERS.map(([key, label]) => {
                        const active = filter === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                aria-pressed={active}
                                className={`min-h-[84px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px] border border-[#2020203d] px-[16px] pb-[10px] pt-[9px] text-left transition-colors xl:px-[19px] ${active ? "bg-[#4a9b8e78]" : "bg-white hover:bg-[#4a9b8e22]"
                                    }`}
                            >
                                <div className={`${serif} text-[24px] font-bold leading-[1.2] text-[#2f4a42]`}>{counts[key]}</div>
                                <div className={`${serif} text-[14px] font-bold leading-[1.1] text-[#2f4a42]`}>{label}</div>
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <label className="relative mt-[22px] block w-full sm:mt-[26px] sm:w-[286px]">
                    <span className="sr-only">Search people</span>
                    <svg className="absolute left-[15px] top-[8px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m16.5 16.5 4.5 4.5" />
                    </svg>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search People"
                        className={`${serif} h-[39px] w-full rounded-[14px] border border-[#0000002b] bg-white pl-[43px] pr-[12px] text-[16px] font-bold text-black outline-none placeholder:text-[#666] focus:border-[#4a9b8e]`}
                    />
                </label>

                {/* Day groups */}
                <div className="mt-[22px] sm:mt-[26px]">
                    {DAYS.map((d) => {
                        const list = visible.filter((a) => a.day === d.key);
                        if (list.length === 0) return null;
                        return (
                            <section key={d.key} className="mb-[8px]">
                                <DayHeading>{d.title}</DayHeading>
                                <div className="mt-[16px] flex flex-col gap-[16px] sm:gap-[22px]">
                                    {list.map((a) => (
                                        <AppointmentCard
                                            key={a.id}
                                            a={a}
                                            open={openIds.has(a.id)}
                                            onToggle={() => toggle(a.id)}
                                            setStatus={setStatus}
                                            remove={remove}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {visible.length === 0 && (
                        <div className={`${serif} rounded-[10px] border border-[#c7b6b6] bg-white px-[16px] py-[40px] text-center text-[14px] text-[#666] sm:px-[28px] sm:py-[56px]`}>
                            No appointments match. Try another status or clear the search.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}