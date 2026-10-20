import React, { useMemo, useState } from "react";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";
const inknut = "font-['Inknut_Antiqua',Georgia,serif]";

const NAV = ["Schedules", "Services", "Payment", "Backup and Restore"];

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
const Logo = ({ className = "w-[70px] h-[66px]" }) => (
    // Replace with <img src="/img/threefold-logo.png" /> when you have the asset
    <svg viewBox="0 0 70 66" className={className} aria-label="Threefold logo">
        <circle cx="25" cy="24" r="17" fill="#4a9b8e" opacity="0.9" />
        <circle cx="45" cy="24" r="17" fill="#e07b6a" opacity="0.85" />
        <circle cx="35" cy="42" r="17" fill="#f4c95d" opacity="0.85" />
    </svg>
);

const Sidebar = () => (
    <aside className="relative flex h-[923px] w-[321px] shrink-0 flex-col self-start rounded-tr-[64px] rounded-br-[64px] rounded-bl-[32px] bg-[#1f4d3f]">
        <div className="relative mt-[43px] h-[66px]">
            <Logo className="absolute left-[15px] top-0 h-[66px] w-[70px] opacity-60" />
            <div className="absolute left-[92px] top-[8px]">
                <div className={`${serif} text-[20px] leading-[20px] text-[#3d865b]`}>THREEFOLD</div>
                <p className={`${serif} mt-[13px] whitespace-nowrap text-[15px] leading-[15px] text-[#3d865b]`}>
                    Behavioral Interventions And Psychological Services
                </p>
            </div>
        </div>

        <div className={`${inter} mt-[44px] px-[40px] text-[14px] font-bold tracking-[2.52px] text-[#a8c8b8]`}>MENU</div>

        {/* Dashboard (inactive) */}
        <a href="#" className="mt-[16px] flex h-[52px] items-center gap-[20px] px-[49px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#3d7a68" strokeWidth="1.8">
                <rect x="2" y="2" width="6" height="6" rx="1.2" />
                <rect x="12" y="2" width="6" height="6" rx="1.2" />
                <rect x="2" y="12" width="6" height="6" rx="1.2" />
                <rect x="12" y="12" width="6" height="6" rx="1.2" />
            </svg>
            <span className={`${inter} text-[18px] font-bold text-[#3d7a68] hover:text-white`}>Dashboard</span>
        </a>

        {/* Active: Appointment */}
        <div className="relative ml-[14px] mt-[8px] flex h-[52px] items-center rounded-l-[26px] bg-white pl-[26px]">
            <span className={`${inknut} text-[20px] font-semibold text-[#2a8570]`}>Appointment</span>
        </div>

        <nav className="mt-[24px] flex flex-col gap-[41px] px-[40px]">
            {NAV.map((item) => (
                <a key={item} href="#" className={`${inknut} text-[20px] font-semibold text-[#2a8570] transition-colors hover:text-[#4fbfa5]`}>
                    {item}
                </a>
            ))}
        </nav>

        <a href="#" className={`${inknut} mt-auto mb-[64px] px-[30px] text-[20px] font-semibold text-[#2a8570] transition-colors hover:text-[#4fbfa5]`}>
            Logout
        </a>
    </aside>
);

const Header = () => (
    <header className="flex items-start justify-between">
        <div>
            <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e]`}>APPOINTMENT</div>
            <h1 className={`${serif} mt-[8px] text-[40px] font-bold leading-[1.15] text-[#2f4a42]`}>Everyone who booked with you.</h1>
        </div>
        <div className="flex items-center gap-[17px]">
            <div className="flex h-[30px] w-[170px] items-center justify-center rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee]">
                <span className={`${inter} text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
            </div>
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
    <div className="flex items-start" aria-label="Appointment progress">
        {steps.map((st, i) => (
            <React.Fragment key={STEP_LABELS[i]}>
                {i > 0 && (
                    <span className={`mt-[11px] h-px w-[34px] ${steps[i - 1] === "done" && st !== "todo" ? "bg-[#4a9b8e]" : "bg-[#b9b9b9]"}`} />
                )}
                <div className="flex w-[22px] flex-col items-center">
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

const MessageBtn = () => (
    <button className={`${serif} flex h-[26px] items-center gap-[6px] rounded-[5px] border border-[#00000024] bg-[#a9d0c8] px-[12px] text-[11px] text-[#202020] hover:bg-[#98c5bc]`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#202020" strokeWidth="2" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12Z" />
        </svg>
        Message
    </button>
);

const PrimaryBtn = ({ children, onClick }) => (
    <button onClick={onClick} className={`${serif} h-[26px] rounded-[5px] bg-[#11a086] px-[14px] text-[11px] text-white hover:bg-[#0e8c75]`}>
        {children}
    </button>
);

const AppointmentCard = ({ a, open, onToggle, setStatus, remove }) => {
    const s = STATUS[a.status];
    const day = DAYS.find((d) => d.key === a.day);
    return (
        <article className="rounded-[10px] border border-[#c7b6b6] bg-white px-[24px] pb-[16px] pt-[20px]">
            <div className="flex items-center">
                {/* date block */}
                <div className={`${serif} flex h-[68px] w-[62px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#a9d0c8] leading-[1.15] text-[#1f4d3f]`}>
                    <span className="text-[17px] font-bold">{day.n}</span>
                    <span className="text-[10px]">{day.dow}</span>
                    <span className="text-[10px]">Oct</span>
                </div>

                <div className="ml-[22px] flex-1">
                    <div className={`${serif} text-[15px] font-bold text-[#202020]`}>{a.name}</div>
                    <div className={`${serif} mt-[2px] text-[13px] text-[#444]`}>
                        {a.service} · {a.time} · {a.mode}
                    </div>
                </div>

                <Stepper steps={s.steps} />

                <span className={`${serif} ml-[40px] flex h-[22px] w-[118px] items-center justify-center rounded-full text-[10px] font-bold ${s.cls}`}>
                    {s.chip}
                </span>
            </div>

            <div className="mt-[18px] flex items-center justify-between border-t border-[#e8e8e8] pt-[14px]">
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    className={`${serif} flex items-center gap-[4px] text-[11px] font-bold text-[#222b28] underline`}
                >
                    {open ? "Hide details" : "Client details"}
                    {open && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#222b28" strokeWidth="1.5" strokeLinecap="round">
                            <path d="m2 6.5 3-3 3 3" />
                        </svg>
                    )}
                </button>

                <div className="flex items-center gap-[8px]">
                    {a.status === "pending" && (
                        <button
                            onClick={() => remove(a.id)}
                            className={`${serif} h-[26px] rounded-[5px] border border-[#ff4c4c75] bg-white px-[14px] text-[11px] text-[#ff5656] hover:bg-[#fff1f1]`}
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
                <div className="mt-[14px] grid grid-cols-3 gap-[24px] rounded-[6px] border border-[#c9d9d4] bg-[#e8f1ee] px-[24px] py-[18px]">
                    <div>
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Contact</div>
                        <div className={`${serif} mt-[6px] text-[12px] leading-[16px] text-[#444]`}>
                            {a.email}<br />{a.phone}<br />{a.mode} session
                        </div>
                    </div>
                    <div>
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Booking</div>
                        <div className={`${serif} mt-[6px] text-[12px] leading-[16px] text-[#444]`}>
                            {a.ref}<br />{a.service}<br />{a.price}
                        </div>
                    </div>
                    <div>
                        <div className={`${serif} text-[12px] font-bold text-[#202020]`}>Emergency Contact</div>
                        <div className={`${serif} mt-[6px] text-[12px] leading-[16px] text-[#444]`}>{a.emergency}</div>
                    </div>
                </div>
            )}
        </article>
    );
};

const DayHeading = ({ children }) => (
    <div className="mt-[34px] flex items-center gap-[14px] first:mt-0">
        <h2 className={`${inter} whitespace-nowrap text-[15px] font-bold tracking-[3.15px] text-[#4a9b8e]`}>{children}</h2>
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
        <div className="flex min-h-screen w-full min-w-[1440px] bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>

            <Sidebar />

            <main className="flex-1 px-[36px] pb-[60px] pt-[51px]">
                <Header />

                {/* Status filters */}
                <div className="mt-[56px] grid grid-cols-6 gap-[27px]">
                    {FILTERS.map(([key, label]) => {
                        const active = filter === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                aria-pressed={active}
                                className={`h-[84px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px] border border-[#2020203d] px-[19px] pt-[9px] text-left transition-colors ${active ? "bg-[#4a9b8e78]" : "bg-white hover:bg-[#4a9b8e22]"
                                    }`}
                            >
                                <div className={`${serif} text-[24px] font-bold leading-[1.2] text-[#2f4a42]`}>{counts[key]}</div>
                                <div className={`${serif} text-[14px] font-bold leading-[1.1] text-[#2f4a42]`}>{label}</div>
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <label className="relative mt-[26px] block w-[286px]">
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
                <div className="mt-[26px]">
                    {DAYS.map((d) => {
                        const list = visible.filter((a) => a.day === d.key);
                        if (list.length === 0) return null;
                        return (
                            <section key={d.key} className="mb-[8px]">
                                <DayHeading>{d.title}</DayHeading>
                                <div className="mt-[16px] flex flex-col gap-[22px]">
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
                        <div className={`${serif} rounded-[10px] border border-[#c7b6b6] bg-white px-[28px] py-[56px] text-center text-[14px] text-[#666]`}>
                            No appointments match. Try another status or clear the search.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}