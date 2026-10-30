import React, { useState } from "react";
import AffiliateNavigation from "./affiliatenav";
import { Logo, Photo } from "../components/Layout";
import ProfileMenu from "../components/ProfileMenu";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const MONTHS = [
    { m: "May", h: 166 },
    { m: "Jun", h: 212 },
    { m: "Jul", h: 196 },
    { m: "Aug", h: 221 },
    { m: "Sep", h: 252 },
    { m: "Oct", h: 139 },
];

const EARNINGS = [
    { label: "PSYCHOTHERAPY / COUNSELING", amount: "₱10,000", color: "#345e51", pct: 100 },
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

const ACTIVITY = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    text: "Juan Delacruz paid ₱1,500 via GCash",
    time: "12 min ago",
}));

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const Card = ({ className = "", children }) => (
    <section className={`relative bg-white rounded-[10px] border border-[#c7b6b6] ${className}`}>
        {children}
    </section>
);

const CardTitle = ({ children, className = "" }) => (
    <h2 className={`${serif} text-[16px] text-black ${className}`}>{children}</h2>
);

const Sparkline = ({ id, stroke, fill, dot, d, area }) => (
    <div className="relative mt-[10px] h-[45px] w-full max-w-[187px]">
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
    <div className="mt-auto flex flex-wrap items-center gap-[6px] pt-[12px]">
        <span
            className={`${inter} flex h-[16px] items-center gap-[4px] rounded-full px-[8px] text-[10px] font-bold ${
                dark ? "bg-[#4a9b8e78] text-[#a8c8b8]" : "bg-[#83cec2c9] text-[#666]"
            }`}
        >
            <svg width="10" height="7" viewBox="0 0 10 7">
                <path d="M5 0 10 7H0z" fill="currentColor" />
            </svg>
            4.6%
        </span>
        <span
            className={`${inter} text-[10px] font-bold whitespace-nowrap ${
                dark ? "text-[#a8c8b8]" : "text-[#666]"
            }`}
        >
            VS&nbsp;&nbsp;LAST MONTH
        </span>
    </div>
);

const statCardBase =
    "relative flex min-h-[204px] flex-col overflow-hidden border border-[#2020203d] px-[23px] pb-[14px] pt-[28px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";

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
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
const DateChip = ({ className = "" }) => (
    <div className={`h-[30px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee] px-[12px] ${className}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
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
                <div className={`${inter} text-[14px] font-bold tracking-[3px] text-[#4a9b8e] sm:text-[20px] sm:tracking-[4.2px]`}>DASHBOARD</div>
            </div>
            <h1 className={`${serif} mt-[8px] text-[26px] font-bold leading-[1.15] sm:text-[34px] lg:text-[40px]`}>
                <span className="text-[#2f4a42]">Good evening, </span>
                <span className="text-[#4a9b8e]">Dr. Santos</span>
            </h1>
            {/* Date chip: nasa ilalim ng title sa mobile */}
            <DateChip className="mt-[12px] inline-flex sm:hidden" />
        </div>
        <div className="flex shrink-0 items-center gap-[10px] sm:gap-[17px]">
            <DateChip className="hidden w-[170px] sm:flex" />
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
            <ProfileMenu size={37} />
        </div>
    </header>
);

const StatCards = () => (
    <div className="mt-[24px] grid grid-cols-1 gap-[12px] sm:mt-[34px] sm:grid-cols-2 sm:gap-[16px] xl:grid-cols-4 xl:gap-[29px]">
        {/* Total income */}
        <div className={`${statCardBase} bg-[#1f4d3f] !border-[#c7b6b6]`}>
            <div className={`${inter} text-[11px] font-bold text-[#a8c8b8]`}>
                TOTAL INCOME · OCTOBER
            </div>
            <div className={`${inter} mt-[22px] text-[32px] font-bold leading-none text-white`}>₱112,163</div>
            <Sparkline id="sa" stroke="#8ff1d7" fill="#8ff1d7" dot="#8ff1d7" {...SPARK_A} />
            <Delta dark />
        </div>

        {/* New clients */}
        <div className={`${statCardBase} bg-white`}>
            <div className={`${inter} text-[11px] font-bold text-[#666]`}>NEW CLIENTS</div>
            <div className={`${inter} mt-[28px] font-bold leading-none text-[#202020]`}>
                <span className="text-[24px]">14 </span>
                <span className="text-[15px]">THIS MONTH</span>
            </div>
            <Sparkline id="sb" stroke="#2a8570" fill="#83cec2" dot="#2a8570" {...SPARK_B} />
            <Delta />
        </div>

        {/* Sessions */}
        <div className={`${statCardBase} bg-white`}>
            <div className={`${inter} text-[11px] font-bold text-[#666]`}>SESSIONS</div>
            <div className={`${inter} mt-[28px] font-bold leading-none text-[#202020]`}>
                <span className="text-[24px]">60</span>
                <span className="text-[20px]">&nbsp;</span>
                <span className="text-[15px]">THIS MONTH</span>
            </div>
            <Sparkline id="sc" stroke="#2a8570" fill="#83cec2" dot="#2a8570" {...SPARK_C} />
            <Delta />
        </div>

        {/* Needs attention */}
        <div className={`${statCardBase} bg-gradient-to-b from-[#fdf1bc] to-[#fffbdd] from-0% to-25%`}>
            <div className={`${inter} text-[11px] font-bold text-[#666]`}>NEEDS ATTENTION</div>
            <div className={`${inter} mt-[33px] text-[24px] font-bold leading-none text-[#202020]`}>
                7<span className="text-[15px]"> CLIENTS</span>
            </div>
            <p className={`${inter} mt-[15px] text-[11px] font-bold leading-[13px] text-[#666]`}>
                3 PAYMENTS TO VERIFY · 4 AWAITING APPROVAL
            </p>
        </div>
    </div>
);

const MonthlyIncome = () => (
    <Card className="flex flex-col p-[20px] sm:p-[28px]">
        <div className="flex items-start justify-between gap-[12px]">
            <div className="min-w-0">
                <CardTitle>Monthly income</CardTitle>
                <p className={`${serif} mt-[3px] max-w-[289px] text-[11px] text-black`}>
                    Total payments you received by each month.
                </p>
            </div>

            {/* 6M / 12M toggle */}
            <div className="flex h-[28px] w-[95px] shrink-0 items-center rounded-[11px] bg-[#4a9b8e30] p-[3px]">
                <button className={`${serif} h-[20px] w-[43px] rounded-[11px] bg-white text-[10px] text-[#202020]`}>6M</button>
                <button className={`${serif} h-[20px] flex-1 text-[10px] text-[#202020]`}>12M</button>
            </div>
        </div>

        {/* Summary numbers */}
        <div className="mt-[20px] flex flex-wrap gap-x-[28px] gap-y-[12px]">
            {[
                ["12-month total", "₱2,145,763"],
                ["Monthly average", "₱184,873"],
                ["Best month", "SEPTEMBER · ₱221,700"],
            ].map(([label, value]) => (
                <div key={label} className="whitespace-nowrap">
                    <div className={`${serif} text-[10px] text-[#666]`}>{label}</div>
                    <div className={`${inter} mt-[7px] text-[14px] font-bold text-[#202020]`}>{value}</div>
                </div>
            ))}
        </div>

        {/* Chart */}
        <div className="relative mt-[24px] h-[272px]">
            {[0, 43, 87, 131, 180, 222, 268].map((t) => (
                <div key={t} className="absolute left-0 right-0 h-px bg-[#e4e4e4]" style={{ top: t }} />
            ))}
            <div className="absolute inset-x-0 bottom-[2px] flex items-end px-[4px]">
                {MONTHS.map((b) => (
                    <div key={b.m} className="flex flex-1 justify-center">
                        <div className="w-full max-w-[36px] rounded-t-[5px] bg-[#345e51]" style={{ height: b.h }} />
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-[8px] flex px-[4px]">
            {MONTHS.map((b) => (
                <span key={b.m} className={`${serif} flex-1 text-center text-[13px] text-[#666] sm:text-[15px]`}>
                    {b.m}
                </span>
            ))}
        </div>

        {/* Legend */}
        <div className="mt-[18px] flex items-center gap-[8px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#345e51]" />
            <span className={`${serif} text-[15px] text-[#666]`}>Total income</span>
        </div>
    </Card>
);

const Earnings = () => (
    <Card className="flex flex-col p-[20px] xl:min-h-[465px]">
        <CardTitle>Earnings this month</CardTitle>
        <div className={`${serif} mt-[2px] text-[11px] text-black`}>October · so far</div>

        {/* Stacked bar */}
        <div className="mt-[14px] flex h-[9px] overflow-hidden rounded-[3px]">
            {EARNINGS.map((e) => (
                <div key={e.label} style={{ width: `${e.pct}%`, background: e.color }} />
            ))}
        </div>

        <div className={`${inter} mt-[16px] text-[14px] font-bold text-[#202020]`}>₱10,000</div>
        <div className={`${serif} mt-[2px] max-w-[221px] text-[11px] text-black`}>
            Total clinic income (all payments received)
        </div>

        {/* Breakdown */}
        <div className="mt-[20px]">
            {EARNINGS.map((e) => (
                <div key={e.label} className="flex items-start gap-[8px] border-t border-[#e4e4e4] py-[16px]">
                    <span className="relative mt-[2px] flex h-[28px] w-[30px] shrink-0 items-center justify-center rounded-full border border-[#0000001c]">
                        <span className="h-[21px] w-[22px] rounded-full" style={{ background: e.color }} />
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className={`${inter} text-[10px] font-bold text-[#202020]`}>{e.label}</div>
                        <div className={`${serif} mt-[9px] text-[11px] text-black`}>{e.pct}% of income</div>
                    </div>
                    <div className={`${serif} shrink-0 text-[11px] font-bold text-black`}>{e.amount}</div>
                </div>
            ))}
        </div>

        {/* Note */}
        <div className="mt-[20px] rounded-[10px] bg-[#e3f2ee] px-[20px] py-[14px] sm:px-[28px] xl:mt-auto">
            <p className={`${serif} text-[11px] leading-[13px] text-black`}>
                Note: this month is still accruing, so totals will grow as payments come in.
            </p>
        </div>
    </Card>
);

const Attention = () => (
    <Card className="flex flex-col p-[20px] sm:p-[23px] xl:min-h-[464px]">
        <CardTitle>Needs your attention</CardTitle>
        <p className={`${serif} mt-[4px] max-w-[310px] text-[13px] text-[#666]`}>
            Your clients&#39; requests and payments waiting on you.
        </p>

        {/* Tabs */}
        <div className="mt-[16px] flex w-full flex-wrap gap-[4px] rounded-[11px] bg-[#4a9b8e30] p-[4px] sm:inline-flex sm:w-auto sm:self-start">
            <button className={`${serif} flex h-[32px] flex-1 items-center justify-center gap-[6px] whitespace-nowrap rounded-[11px] bg-white px-[12px] text-[11px] text-[#202020] sm:h-[20px] sm:flex-none sm:text-[10px]`}>
                Appointment to accept
                <span className="flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#345e51] px-[3px] text-[9px] text-white">4</span>
            </button>
            <button className={`${serif} flex h-[32px] flex-1 items-center justify-center gap-[6px] whitespace-nowrap rounded-[11px] px-[12px] text-[11px] text-[#202020] sm:h-[20px] sm:flex-none sm:text-[10px]`}>
                Payment to verify
                <span className="flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-white px-[3px] text-[9px] text-[#202020]">3</span>
            </button>
        </div>

        {/* Rows */}
        <ul className="mt-[20px]">
            {REQUESTS.map((r) => (
                <li key={r.id} className="flex flex-wrap items-start gap-x-[10px] gap-y-[10px] border-b border-[#e8e8e8] py-[12px] last:border-0">
                    <div className="h-[29px] w-[34px] shrink-0 rounded-[6px] border border-[#00000036] bg-white" />
                    <div className="min-w-[160px] flex-1">
                        <div className={`${serif} text-[13px] text-black`}>{r.name}</div>
                        <div className={`${serif} mt-[2px] text-[10px] text-[#666]`}>{r.meta}</div>
                    </div>
                    <div className="ml-[44px] flex gap-[6px] sm:ml-0 sm:mt-[5px]">
                        <button className={`${serif} h-[30px] w-[68px] rounded-[4px] border border-[#ff4c4c75] bg-white text-[11px] text-[#ff5656] hover:bg-[#fff1f1] sm:h-[19px] sm:w-[45px] sm:text-[10px]`}>
                            Decline
                        </button>
                        <button className={`${serif} h-[30px] w-[68px] rounded-[4px] bg-[#11a086] text-[11px] text-white hover:bg-[#0e8c75] sm:h-[19px] sm:w-[45px] sm:text-[10px]`}>
                            Accept
                        </button>
                    </div>
                </li>
            ))}
        </ul>

        {/* Footer links */}
        <div className="mt-auto border-t border-[#e8e8e8] pt-[16px]">
            <div className={`${serif} flex gap-[14px] pl-[4px] text-[12px] font-bold text-[#222b28] underline sm:text-[11px]`}>
                <a href="#all-appointments">All appointments</a>
                <a href="#all-payments">All payment</a>
            </div>
        </div>
    </Card>
);

const Today = () => (
    <Card className="p-[16px] sm:p-[20px] xl:min-h-[464px]">
        <div className="flex items-start justify-between gap-[12px]">
            <div>
                <CardTitle>Today&#39;s sessions</CardTitle>
                <div className={`${serif} mt-[4px] text-[11px] text-[#666]`}>3 sessions scheduled</div>
            </div>
            <a
                href="https://www.claudeusercontent.com/psychologist-schedule.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`${serif} shrink-0 text-[11px] font-bold text-[#222b28] underline`}
            >
                Open schedule
            </a>
        </div>

        {/* In session banner */}
        <div className="mt-[16px] flex min-h-[44px] items-center gap-[12px] rounded-[11px] bg-[#2f4a42] px-[8px] py-[6px]">
            <span className="flex h-[21px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-white/10">
                <Photo src="/img/Threefold%20logo.png" className="h-[16px] w-[17px] object-contain" fallback={<Logo size={16} />} />
            </span>
            <div className="min-w-0 flex-1">
                <div className={`${serif} text-[11px] text-[#f2f2f2]`}>In Session now</div>
                <div className={`${serif} truncate text-[11px] font-bold text-[#f2f2f2]`}>Juan Delacruz - Psychotherapy</div>
            </div>
            <span className={`${serif} flex h-[21px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#4a9b8e] px-[10px] text-[10px] text-white`}>
                Until 10:00 AM
            </span>
        </div>

        {/* Timeline */}
        <div className="mt-[22px] flex flex-col gap-[23px]">
            {TIMELINE.map((t, i) => {
                const active = t.status === "In Session";
                return (
                    <div key={t.time} className="relative flex h-[52px] items-start">
                        <div className={`${serif} w-[44px] shrink-0 pt-[2px] text-[8px] font-bold leading-[10px] text-[#202020] sm:w-[47px]`}>
                            {t.time}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;1hr
                        </div>
                        <div className="relative -mt-[4px] mr-[10px] flex w-[20px] shrink-0 flex-col items-center sm:mr-[15px]">
                            <span className="flex h-[19px] w-[20px] items-center justify-center rounded-full bg-[#d7eee8]">
                                <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#32ac97]">
                                    <Photo src="/img/Threefold%20logo.png" className="h-[9px] w-[9px] object-contain" fallback={<Logo size={9} />} />
                                </span>
                            </span>
                            {i < TIMELINE.length - 1 && (
                                <span className="absolute top-[19px] h-[56px] w-px bg-[#32ac97]/60" />
                            )}
                        </div>
                        <div
                            className={`flex h-[52px] min-w-0 flex-1 items-center gap-[8px] overflow-hidden rounded-tl-[7px] rounded-tr-[18px] rounded-br-[7px] rounded-bl-[18px] border px-[8px] ${
                                active ? "border-[#4a9b8e] bg-[#4a9b8e52]" : "border-[#2020203d] bg-white"
                            }`}
                        >
                            <span className="flex h-[23px] w-[28px] shrink-0 items-center justify-center rounded-[6px] border border-[#00000036] bg-white">
                                <Photo src="/img/Threefold%20logo.png" className="h-[14px] w-[15px] object-contain" fallback={<Logo size={14} />} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className={`${serif} truncate text-[10px] font-bold text-[#666]`}>
                                    Psychotherapy · In-person
                                </div>
                                <div className={`${serif} mt-[2px] truncate text-[10px] font-bold text-[#202020]`}>
                                    Juan Delacruz
                                </div>
                            </div>
                            <span
                                className={`${serif} flex h-[18px] w-[72px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                    active ? "bg-[#2a8570] text-white" : "bg-[#f2f2f2] text-[#202020]"
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

const YourSessions = () => (
    <section className="flex min-h-[263px] w-full flex-col rounded-[10px] border border-[#c7b6b6] bg-white px-5 py-6">
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
    <Card className="p-[20px] sm:p-[15px] sm:pb-[20px]">
        <CardTitle className="sm:mt-[4px]">Recent Activity</CardTitle>
        <div className={`${serif} mt-[3px] text-[11px] text-[#666]`}>What&#39;s happened lately.</div>
        <ul className="mt-[16px]">
            {ACTIVITY.map((a) => (
                <li key={a.id} className="border-b border-[#e4e4e4] py-[10px] last:border-0">
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
export default function AffiliateDashboard() {
    const [navOpen, setNavOpen] = useState(false); // bukas/sarado ang sidebar drawer sa mobile

    return (
        <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
            <style>{FONT_CSS}</style>

            {/* Affiliate sidebar (may sariling drawer behavior na) */}
            <AffiliateNavigation open={navOpen} onClose={() => setNavOpen(false)} />

            <main className="min-w-0 flex-1 px-[16px] pb-[48px] pt-[20px] sm:px-[28px] sm:pt-[32px] lg:px-[41px] lg:pb-[60px] lg:pt-[51px]">
                <Header onMenu={() => setNavOpen(true)} />
                <StatCards />

                <div className="mt-[24px] grid grid-cols-1 gap-[16px] sm:mt-[32px] xl:mt-[41px] xl:grid-cols-[1fr_324px] xl:gap-[24px]">
                    <MonthlyIncome />
                    <Earnings />
                </div>

                <div className="mt-[16px] grid grid-cols-1 gap-[16px] sm:mt-[24px] xl:mt-[28px] xl:grid-cols-[570fr_412fr] xl:gap-[27px]">
                    <Attention />
                    <Today />
                </div>

                <div className="mt-[16px] grid grid-cols-1 items-start gap-[14px] sm:mt-[24px] md:grid-cols-2 xl:mt-[26px] xl:grid-cols-[2fr_1fr]">
                    <YourSessions />
                    <RecentActivity />
                </div>
            </main>
        </div>
    );
}