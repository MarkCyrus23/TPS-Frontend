import React from "react";

/* ------------------------------------------------------------------ */
/*  Fonts (Inter / Inria Serif / Inknut Antiqua)                       */
/*  If you already load these in index.html, delete the <style> below. */
/* ------------------------------------------------------------------ */
const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";
const inknut = "font-['Inknut_Antiqua',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const NAV = ["Appointment", "Schedules", "Services", "Payment", "Backup and Restore"];

const MONTHS = [
    { m: "May", h: 166 },
    { m: "Jun", h: 212 },
    { m: "Jul", h: 196 },
    { m: "Aug", h: 221 },
    { m: "Sep", h: 252 },
    { m: "Oct", h: 139 },
];

const EARNINGS = [
    { label: "PSYCHOTHERAPY / COUNSELING", amount: "₱10,000", color: "#345e51", w: "50%" },
    { label: "ABA THERAPY", amount: "₱7,000", color: "#34b09a", w: "30%" },
    { label: "ASSESSMENT & CONSULTATION", amount: "₱3,000", color: "#4a9b8e78", w: "20%" },
];

const REQUESTS = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    name: "Juan D. · Psychotherapy",
    meta: "Mon, Oct 19 · 10:00 AM · Online · waiting 5 hrs",
}));

const TIMELINE = [
    { time: "9 AM", status: "In Session" },
    { time: "10 AM", status: "Upcoming" },
    { time: "11 AM", status: "Upcoming" },
];

const SESSION_STATS = [
    { label: "Completed", n: 15, pct: 62, color: "#2d6a4f" },
    { label: "Confirmed", n: 6, pct: 24, color: "#52b788" },
    { label: "Pending", n: 2, pct: 9, color: "#f4a623" },
    { label: "Cancelled", n: 1, pct: 5, color: "#e07b6a" },
];

const SERVICE_LEGEND = [
    { label: "Psychotherapy / Counseling", amount: "₱10,000", color: "#345e59", pct: 50 },
    { label: "ABA Therapy", amount: "₱5,000", color: "#34b09a", pct: 25 },
    { label: "Assessment Consultation", amount: "₱5,000", color: "#4a9b8e78", pct: 25 },
];

const ACTIVITY = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    text: "Juan Delacruz paid ₱1,500 via GCash",
    time: "12 min ago",
}));

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const Logo = ({ className = "w-[70px] h-[66px]" }) => (
    // Replace with <img src="/img/threefold-logo.png" /> when you have the asset
    <svg viewBox="0 0 70 66" className={className} aria-label="Threefold logo">
        <circle cx="25" cy="24" r="17" fill="#4a9b8e" opacity="0.9" />
        <circle cx="45" cy="24" r="17" fill="#e07b6a" opacity="0.85" />
        <circle cx="35" cy="42" r="17" fill="#f4c95d" opacity="0.85" />
    </svg>
);

const Card = ({ className = "", children }) => (
    <section
        className={`relative bg-white rounded-[10px] border border-[#c7b6b6] ${className}`}
    >
        {children}
    </section>
);

const CardTitle = ({ children, className = "" }) => (
    <h2 className={`${serif} text-[16px] text-black ${className}`}>{children}</h2>
);

const Sparkline = ({ id, stroke, fill, dot, d, area }) => (
    <div className="relative mt-[10px] h-[45px] w-[187px]">
        <svg viewBox="0 0 187 45" className="absolute inset-0 h-full w-full" fill="none">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={fill} stopOpacity="0.45" />
                    <stop offset="1" stopColor={fill} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill={`url(#${id})`} />
            <path d={d} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
            className="absolute right-0 top-[-2px] h-[6px] w-[6px] rounded-full"
            style={{ background: dot }}
        />
    </div>
);

const Delta = ({ dark }) => (
    <div className="absolute bottom-[14px] left-[19px] flex items-center gap-[6px]">
        <span
            className={`${inter} flex h-[16px] items-center gap-[4px] rounded-full px-[8px] text-[10px] font-bold ${dark ? "bg-[#4a9b8e78] text-[#a8c8b8]" : "bg-[#83cec2c9] text-[#666]"
                }`}
        >
            <svg width="10" height="7" viewBox="0 0 10 7">
                <path d="M5 0 10 7H0z" fill="currentColor" />
            </svg>
            4.6%
        </span>
        <span
            className={`${inter} text-[10px] font-bold whitespace-nowrap ${dark ? "text-[#a8c8b8]" : "text-[#666]"
                }`}
        >
            VS&nbsp;&nbsp;LAST MONTH
        </span>
    </div>
);

const statCardBase =
    "relative h-[204px] overflow-hidden border border-[#2020203d] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";

const SPARK_A = {
    d: "M0 32 C20 30 30 22 50 24 S80 30 100 18 S140 22 160 10 S178 6 184 4",
    area: "M0 32 C20 30 30 22 50 24 S80 30 100 18 S140 22 160 10 S178 6 184 4 V45 H0Z",
};
const SPARK_B = {
    d: "M0 34 C20 28 35 36 55 26 S90 28 110 20 S150 24 170 12 S180 8 184 6",
    area: "M0 34 C20 28 35 36 55 26 S90 28 110 20 S150 24 170 12 S180 8 184 6 V45 H0Z",
};
const SPARK_C = {
    d: "M0 30 C25 36 40 20 60 24 S95 34 115 22 S150 12 170 14 S180 8 184 6",
    area: "M0 30 C25 36 40 20 60 24 S95 34 115 22 S150 12 170 14 S180 8 184 6 V45 H0Z",
};

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */
const Sidebar = () => (
    <aside className="relative flex h-[923px] w-[321px] shrink-0 flex-col self-start rounded-tr-[64px] rounded-br-[64px] rounded-bl-[32px] bg-[#1f4d3f]">
        {/* Brand */}
        <div className="relative mt-[43px] h-[66px]">
            <Logo className="absolute left-[15px] top-0 h-[66px] w-[70px] opacity-60" />
            <div className="absolute left-[92px] top-[8px]">
                <div className={`${serif} text-[20px] leading-[20px] text-[#3d865b]`}>THREEFOLD</div>
                <p className={`${serif} mt-[13px] whitespace-nowrap text-[15px] leading-[15px] text-[#3d865b]`}>
                    Behavioral Interventions And Psychological Services
                </p>
            </div>
        </div>

        {/* Menu label */}
        <div className={`${inter} mt-[44px] px-[40px] text-[14px] font-bold tracking-[2.52px] text-[#a8c8b8]`}>
            MENU
        </div>

        {/* Active tab: white pill flush with the sidebar's right edge */}
        <div className="relative ml-[26px] mt-[16px] h-[52px] rounded-l-[26px] bg-white">
            <svg className="absolute left-[23px] top-[16px]" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1f6b55" strokeWidth="1.8">
                <rect x="2" y="2" width="6" height="6" rx="1.2" />
                <rect x="12" y="2" width="6" height="6" rx="1.2" />
                <rect x="2" y="12" width="6" height="6" rx="1.2" />
                <rect x="12" y="12" width="6" height="6" rx="1.2" />
            </svg>
            <span className={`${inter} absolute left-[63px] top-[15px] text-[18px] font-bold text-[#1f6b55]`}>
                Dashboard
            </span>
        </div>

        {/* Nav */}
        <nav className="mt-[44px] flex flex-col gap-[41px] px-[40px]">
            {NAV.map((item) => (
                <a
                    key={item}
                    href="#"
                    className={`${inknut} text-[20px] font-semibold text-[#2a8570] transition-colors hover:text-[#4fbfa5]`}
                >
                    {item}
                </a>
            ))}
        </nav>

        {/* Logout */}
        <a
            href="#"
            className={`${inknut} mt-auto mb-[64px] px-[38px] text-[20px] font-semibold text-[#2a8570] transition-colors hover:text-[#4fbfa5]`}
        >
            Logout
        </a>
    </aside>
);

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
const Header = () => (
    <header className="flex items-start justify-between">
        <div>
            <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e]`}>DASHBOARD</div>
            <h1 className={`${serif} mt-[8px] text-[40px] font-bold leading-[1.15]`}>
                <span className="text-[#2f4a42]">Good evening, </span>
                <span className="text-[#4a9b8e]">Dr. Santos</span>
            </h1>
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

const StatCards = () => (
    <div className="mt-[34px] grid grid-cols-4 gap-[29px]">
        {/* Total income */}
        <div className={`${statCardBase} bg-[#1f4d3f] !border-[#c7b6b6]`}>
            <div className={`${inter} absolute left-[23px] top-[32px] whitespace-nowrap text-[11px] font-bold text-[#a8c8b8]`}>
                TOTAL CLINIC INCOME · OCTOBER
            </div>
            <div className={`${inter} absolute left-[23px] top-[78px] text-[32px] font-bold text-white`}>₱112,163</div>
            <div className="absolute left-[17px] top-[117px]">
                <Sparkline id="sa" stroke="#8ff1d7" fill="#8ff1d7" dot="#8ff1d7" {...SPARK_A} />
            </div>
            <Delta dark />
        </div>

        {/* New clients */}
        <div className={`${statCardBase} bg-white`}>
            <div className={`${inter} absolute left-[23px] top-[32px] text-[11px] font-bold text-[#666]`}>NEW CLIENTS</div>
            <div className={`${inter} absolute left-[23px] top-[81px] font-bold text-[#202020]`}>
                <span className="text-[24px]">14 </span>
                <span className="text-[15px]">THIS MONTH</span>
            </div>
            <div className="absolute left-[19px] top-[112px]">
                <Sparkline id="sb" stroke="#2a8570" fill="#83cec2" dot="#2a8570" {...SPARK_B} />
            </div>
            <Delta />
        </div>

        {/* Sessions */}
        <div className={`${statCardBase} bg-white`}>
            <div className={`${inter} absolute left-[23px] top-[32px] text-[11px] font-bold text-[#666]`}>SESSIONS</div>
            <div className={`${inter} absolute left-[23px] top-[81px] font-bold text-[#202020]`}>
                <span className="text-[24px]">60</span>
                <span className="text-[20px]">&nbsp;</span>
                <span className="text-[15px]">THIS MONTH</span>
            </div>
            <div className="absolute left-[19px] top-[112px]">
                <Sparkline id="sc" stroke="#2a8570" fill="#83cec2" dot="#2a8570" {...SPARK_C} />
            </div>
            <Delta />
        </div>

        {/* Needs attention */}
        <div
            className={`${statCardBase} flex flex-col bg-gradient-to-b from-[#fdf1bc] to-[#fffbdd] from-0% to-25%`}
        >
            <div className={`${inter} ml-[23px] mt-[32px] text-[11px] font-bold text-[#666]`}>NEEDS ATTENTION</div>
            <div className={`${inter} ml-[23px] mt-[33px] text-[24px] font-bold text-[#202020]`}>
                7<span className="text-[15px]"> CLIENTS</span>
            </div>
            <p className={`${inter} ml-[16px] mr-[7px] mt-[15px] text-[11px] font-bold leading-[13px] text-[#666]`}>
                3 PAYMENTS TO VERIFY · 4 AWAITING APPROVAL
            </p>
        </div>
    </div>
);

const MonthlyIncome = () => (
    <Card className="h-[473px] p-0">
        <CardTitle className="absolute left-[28px] top-[20px]">Monthly income</CardTitle>
        <p className={`${serif} absolute left-[28px] top-[39px] w-[289px] text-[11px] text-black`}>
            Total payments received by the whole clinic each month.
        </p>

        {/* 6M / 12M toggle */}
        <div className="absolute right-[15px] top-[25px] flex h-[28px] w-[95px] items-center rounded-[11px] bg-[#4a9b8e30] p-[3px]">
            <button className={`${serif} h-[20px] w-[43px] rounded-[11px] bg-white text-[10px] text-[#202020]`}>6M</button>
            <button className={`${serif} h-[20px] flex-1 text-[10px] text-[#202020]`}>12M</button>
        </div>

        {/* Summary numbers */}
        <div className="absolute left-[28px] top-[72px] flex gap-[19px]">
            {[
                ["12-month total", "₱2,145,763"],
                ["Monthly average", "₱184,873"],
                ["Best month", "SEPTEMBER · ₱221,700"],
            ].map(([label, value]) => (
                <div key={label} className="w-[84px] whitespace-nowrap">
                    <div className={`${serif} text-[10px] text-[#666]`}>{label}</div>
                    <div className={`${inter} mt-[7px] text-[14px] font-bold text-[#202020]`}>{value}</div>
                </div>
            ))}
        </div>

        {/* Chart */}
        <div className="absolute left-[14px] right-[18px] top-[129px] h-[272px]">
            {/* gridlines */}
            {[0, 43, 87, 131, 180, 222, 268].map((t) => (
                <div key={t} className="absolute left-0 right-0 h-px bg-[#e4e4e4]" style={{ top: t }} />
            ))}
            {/* bars */}
            <div className="absolute inset-x-[10px] bottom-[2px] flex items-end justify-between px-[4px]">
                {MONTHS.map((b) => (
                    <div key={b.m} className="flex w-[36px] flex-col items-center">
                        <div
                            className={`w-[36px] rounded-t-[5px] ${b.m === "Oct" ? "bg-[#345e51]" : "bg-[#345e51]"}`}
                            style={{ height: b.h }}
                        />
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute inset-x-[25px] top-[402px] flex justify-between px-[4px]">
            {MONTHS.map((b) => (
                <span key={b.m} className={`${serif} w-[36px] text-center text-[15px] text-[#666]`}>
                    {b.m}
                </span>
            ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-[24px] left-[28px] flex items-center gap-[8px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#345e51]" />
            <span className={`${serif} text-[15px] text-[#666]`}>Total clinic income</span>
        </div>
    </Card>
);

const Earnings = () => (
    <Card className="h-[465px] p-0">
        <CardTitle className="absolute left-[16px] top-[14px]">Earnings this month</CardTitle>
        <div className={`${serif} absolute left-[17px] top-[39px] text-[11px] text-black`}>October · so far</div>
        <div className={`${inter} absolute left-[17px] top-[92px] text-[14px] font-bold text-[#202020]`}>₱20,000</div>
        <div className={`${serif} absolute left-[17px] top-[110px] w-[221px] text-[11px] text-black`}>
            Total clinic income (all payments received)
        </div>

        {/* Stacked bar */}
        <div className="absolute left-[20px] right-[25px] top-[64px] flex h-[9px] overflow-hidden">
            <div className="w-[49%] rounded-l-[3px] bg-[#345e51]" />
            <div className="w-[30%] bg-[#34b09a]" />
            <div className="w-[21%] bg-[#4a9b8e78]" />
        </div>

        {/* Breakdown */}
        {EARNINGS.map((e, i) => (
            <div key={e.label}>
                <div className="absolute left-[17px] right-[22px]" style={{ top: 159 + i * 65 }}>
                    <div className="flex items-start gap-[8px]">
                        <span className="relative mt-[2px] flex h-[28px] w-[30px] items-center justify-center rounded-full border border-[#0000001c]">
                            <span className="h-[21px] w-[22px] rounded-full" style={{ background: e.color }} />
                        </span>
                        <div className="flex-1">
                            <div className={`${inter} whitespace-nowrap text-[10px] font-bold text-[#202020]`}>{e.label}</div>
                            <div className={`${serif} mt-[9px] text-[11px] text-black`}>58% of income</div>
                        </div>
                        <div className={`${serif} text-[11px] font-bold text-black`}>{e.amount}</div>
                    </div>
                </div>
                {i < 2 && (
                    <div className="absolute left-[18px] right-[22px] h-px bg-[#e4e4e4]" style={{ top: 206 + i * 69 }} />
                )}
            </div>
        ))}

        {/* Note */}
        <div className="absolute bottom-[54px] left-[25px] right-[26px] flex h-[56px] items-center rounded-[10px] bg-[#fdf1bc]/60 px-[28px]">
            <p className={`${serif} text-[11px] leading-[13px] text-black`}>
                Note: this month is still accruing, so totals will grow as payments come in.
            </p>
        </div>
    </Card>
);

const Attention = () => (
    <Card className="h-[464px]">
        <CardTitle className="absolute left-[23px] top-[20px]">Needs your attention</CardTitle>
        <p className={`${serif} absolute left-[25px] top-[42px] w-[310px] text-[13px] text-[#666]`}>
            Your clients&#39; requests and payments waiting on you.
        </p>

        {/* Tabs */}
        <div className="absolute left-[25px] top-[72px] h-[28px] w-[239px] rounded-[11px] bg-[#4a9b8e30]">
            <div className="absolute left-[7px] top-[4px] h-[20px] w-[129px] rounded-[11px] bg-white" />
            <span className={`${serif} absolute left-[12px] top-[7px] text-[10px] text-[#202020]`}>Appointment to accept</span>
            <span className={`${serif} absolute left-[139px] top-[7px] whitespace-nowrap text-[10px] text-[#202020]`}>Payment to verify</span>
            <span className={`${serif} absolute left-[120px] top-[9px] flex h-[9px] w-[10px] items-center justify-center rounded-full bg-[#345e51] text-[8px] text-white`}>4</span>
            <span className={`${serif} absolute left-[223px] top-[9px] flex h-[9px] w-[10px] items-center justify-center rounded-full bg-white text-[8px] text-[#202020]`}>3</span>
        </div>

        {/* Rows */}
        <ul className="absolute left-[18px] right-[27px] top-[130px]">
            {REQUESTS.map((r) => (
                <li key={r.id} className="flex h-[63px] items-start border-b border-[#e8e8e8] pt-[1px] last:border-0">
                    <div className="h-[29px] w-[34px] shrink-0 rounded-[6px] border border-[#00000036] bg-white" />
                    <div className="ml-[10px] flex-1">
                        <div className={`${serif} text-[13px] text-black`}>{r.name}</div>
                        <div className={`${serif} mt-[2px] text-[10px] text-[#666]`}>{r.meta}</div>
                    </div>
                    <div className="mt-[5px] flex gap-[6px]">
                        <button className={`${serif} h-[19px] w-[45px] rounded-[4px] border border-[#ff4c4c75] bg-white text-[10px] text-[#ff5656] hover:bg-[#fff1f1]`}>
                            Decline
                        </button>
                        <button className={`${serif} h-[19px] w-[45px] rounded-[4px] bg-[#11a086] text-[10px] text-white hover:bg-[#0e8c75]`}>
                            Accept
                        </button>
                    </div>
                </li>
            ))}
        </ul>

        {/* Footer links */}
        <div className="absolute bottom-[0px] left-[22px] right-[22px] h-[1px] bg-[#e8e8e8]" style={{ bottom: 83 }} />
        <div className={`${serif} absolute bottom-[56px] left-[33px] flex gap-[14px] text-[11px] font-bold text-[#222b28] underline`}>
            <a href="#">All appointments</a>
            <a href="#">All payment</a>
        </div>
    </Card>
);

const Today = () => (
    <Card className="h-[464px]">
        <CardTitle className="absolute left-[18px] top-[16px]">Today&#39;s sessions</CardTitle>
        <div className={`${serif} absolute left-[18px] top-[37px] text-[11px] text-[#666]`}>3 sessions scheduled</div>
        <a
            href="https://www.claudeusercontent.com/psychologist-schedule.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`${serif} absolute right-[14px] top-[16px] text-[11px] font-bold text-[#222b28] underline`}
        >
            Open schedule
        </a>

        {/* In session banner */}
        <div className="absolute left-[20px] right-[21px] top-[58px] flex h-[44px] items-center rounded-[11px] bg-[#2f4a42] px-[8px]">
            <span className="flex h-[21px] w-[24px] items-center justify-center rounded-[6px] bg-white/10">
                <Logo className="h-[16px] w-[17px]" />
            </span>
            <div className="ml-[17px] flex-1">
                <div className={`${serif} text-[11px] text-[#f2f2f2]`}>In Session now</div>
                <div className={`${serif} text-[11px] font-bold text-[#f2f2f2]`}>Juan Delacruz - Psychotherapy</div>
            </div>
            <span className={`${serif} flex h-[21px] w-[77px] items-center justify-center rounded-full bg-[#4a9b8e] text-[10px] text-white`}>
                Until 10:00 AM
            </span>
        </div>

        {/* Timeline */}
        <div className="absolute left-[20px] right-[21px] top-[121px] flex flex-col gap-[23px]">
            {TIMELINE.map((t, i) => {
                const active = t.status === "In Session";
                return (
                    <div key={t.time} className="relative flex h-[52px] items-start">
                        {/* time label */}
                        <div className={`${serif} w-[47px] shrink-0 pt-[2px] text-[8px] font-bold leading-[10px] text-[#202020]`}>
                            {t.time}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;1hr
                        </div>
                        {/* dot + connector */}
                        <div className="relative -mt-[4px] mr-[15px] flex w-[20px] shrink-0 flex-col items-center">
                            <span className="flex h-[19px] w-[20px] items-center justify-center rounded-full bg-[#d7eee8]">
                                <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#32ac97]">
                                    <Logo className="h-[9px] w-[9px]" />
                                </span>
                            </span>
                            {i < TIMELINE.length - 1 && (
                                <span className="absolute top-[19px] h-[56px] w-px bg-[#32ac97]/60" />
                            )}
                        </div>
                        {/* card */}
                        <div
                            className={`relative h-[52px] flex-1 overflow-hidden rounded-tl-[7px] rounded-tr-[18px] rounded-br-[7px] rounded-bl-[18px] border ${active ? "border-[#4a9b8e] bg-[#4a9b8e52]" : "border-[#2020203d] bg-white"
                                }`}
                        >
                            <span className="absolute left-[8px] top-[15px] flex h-[23px] w-[28px] items-center justify-center rounded-[6px] border border-[#00000036] bg-white">
                                <Logo className="h-[14px] w-[15px]" />
                            </span>
                            <div className={`${serif} absolute left-[43px] top-[16px] whitespace-nowrap text-[10px] font-bold text-[#666]`}>
                                Psychotherapy · In-person
                            </div>
                            <div className={`${serif} absolute left-[43px] top-[28px] whitespace-nowrap text-[10px] font-bold text-[#202020]`}>
                                Juan Delacruz
                            </div>
                            <span
                                className={`${serif} absolute right-[14px] top-[15px] flex h-[18px] w-[72px] items-center justify-center rounded-full text-[10px] font-bold ${active ? "bg-[#2a8570] text-white" : "bg-[#f2f2f2] text-[#202020]"
                                    }`}
                            >
                                {t.status}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    </Card>
);

const IncomeByService = () => {
    const R = 38;
    const C = 2 * Math.PI * R;
    let offset = 0;
    return (
        <Card className="h-[263px]">
            <CardTitle className="absolute left-[22px] top-[21px]">Income by service</CardTitle>
            <div className={`${serif} absolute left-[22px] top-[46px] text-[13px] text-[#666]`}>October - ₱20,000</div>

            {/* Donut */}
            <div className="absolute left-[22px] top-[78px] h-[106px] w-[106px]">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r={R} fill="none" stroke="#eeeeee" strokeWidth="14" />
                    {SERVICE_LEGEND.map((s) => {
                        const len = (s.pct / 100) * C;
                        const el = (
                            <circle
                                key={s.label}
                                cx="50"
                                cy="50"
                                r={R}
                                fill="none"
                                stroke={s.color}
                                strokeWidth="14"
                                strokeDasharray={`${len - 2} ${C - len + 2}`}
                                strokeDashoffset={-offset}
                            />
                        );
                        offset += len;
                        return el;
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className={`${serif} text-[20px] font-bold leading-[22px]`}>20</span>
                    <span className={`${inter} text-[12px] font-semibold`}>Sessions</span>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute left-[196px] right-[18px] top-[78px] flex flex-col gap-[12px]">
                {SERVICE_LEGEND.map((s) => (
                    <div key={s.label} className="flex items-start gap-[8px]">
                        <span className="mt-[3px] h-[9px] w-[11px] shrink-0" style={{ background: s.color }} />
                        <div>
                            <div className={`${serif} text-[8px] leading-[10px] text-[#666]`}>{s.label}</div>
                            <div className={`${serif} text-[8px] leading-[10px] text-[#666]`}>{s.amount}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const YourSessions = () => (
    <section className="flex h-[263px] w-full flex-col rounded-[10px] border border-[#c7b6b6] bg-white px-5 py-6">
        <h2 className={`${inter} text-[16px] text-[#1a1a1a]`}>Your sessions</h2>
        <p className={`${inter} text-[13px] text-[#888]`}>24 sessions in October</p>
        <div className="mt-[20px] flex flex-col gap-[10px]">
            {SESSION_STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                        <span className={`${inter} text-[13px] text-[#333]`}>{s.label}</span>
                        <span className="inline-flex items-center gap-[2px]">
                            <span className={`${inter} text-[13px] font-bold text-[#1a1a1a]`}>{s.n}</span>
                            <span className={`${inter} text-[13px] text-[#888]`}>·</span>
                            <span className={`${inter} text-[13px] font-bold text-[#1a1a1a]`}>{s.pct}%</span>
                        </span>
                    </div>
                    <div className="h-[8px] w-full rounded-[4px] bg-[#eeeeee]">
                        <div className="h-[8px] rounded-[4px]" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const RecentActivity = () => (
    <Card className="h-[386px]">
        <CardTitle className="absolute left-[15px] top-[19px]">Recent Activity</CardTitle>
        <div className={`${serif} absolute left-[15px] top-[38px] text-[11px] text-[#666]`}>What&#39;s happened lately.</div>
        <ul className="absolute left-[15px] right-[56px] top-[70px]">
            {ACTIVITY.map((a) => (
                <li key={a.id} className="h-[51px] border-b border-[#e4e4e4] pt-[1px] last:border-0">
                    <p className={`${serif} text-[13px] text-black`}>{a.text}</p>
                    <p className={`${serif} mt-[6px] text-[13px] text-[#666]`}>{a.time}</p>
                </li>
            ))}
        </ul>
    </Card>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen w-full min-w-[1440px] bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>

            <Sidebar />

            <main className="flex-1 px-[41px] pb-[60px] pt-[51px]">
                <Header />
                <StatCards />

                <div className="mt-[41px] grid grid-cols-[1fr_324px] gap-[24px]">
                    <MonthlyIncome />
                    <Earnings />
                </div>

                <div className="mt-[28px] grid grid-cols-[570fr_412fr] gap-[27px]">
                    <Attention />
                    <Today />
                </div>

                <div className="mt-[26px] grid grid-cols-3 items-start gap-[14px]">
                    <IncomeByService />
                    <YourSessions />
                    <RecentActivity />
                </div>
            </main>
        </div>
    );
}