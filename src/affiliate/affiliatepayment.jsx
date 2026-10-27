import React, { useState } from "react";
import AffiliateNavigation from "./affiliatenav";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@600&family=Inria+Serif:wght@400;700&family=Inter:wght@400;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ---------- Icons (inline SVG) ---------- */
function Icon({ className = "", children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const Search = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);
const Bell = (p) => (
  <Icon {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);
const Calendar = (p) => (
  <Icon {...p}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </Icon>
);
const CheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const AlertCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </Icon>
);

/* ---------- Data ---------- */
const todayPayments = [
  { id: 1, day: "17", month: "Oct", time: "4:14 PM", name: "Juan Delacruz", service: "Psychotherapy · Tomorrow, 10:00 AM", type: "Full payment", method: "Gcash", amount: "₱1,500", statusText: "Paid in full", status: "To verify", action: "Review receipt" },
  { id: 2, day: "17", month: "Oct", time: "4:14 PM", name: "Juan Delacruz", service: "Psychotherapy · Tomorrow, 10:00 AM", type: "Downpayment", method: "Maya", amount: "₱750", statusText: "Balance ₱750", status: "To verify", action: "Review receipt" },
];

const yesterdayPayments = [
  { id: 3, day: "17", month: "Oct", time: "4:14 PM", name: "Juan Delacruz", service: "Psychotherapy · Tomorrow, 10:00 AM", type: "Full payment", method: "Gcash", amount: "₱1,500", statusText: "Paid in full", status: "Verified", action: "View receipt" },
  { id: 4, day: "17", month: "Oct", time: "4:14 PM", name: "Juan Delacruz", service: "Psychotherapy · Tomorrow, 10:00 AM", type: "Downpayment", method: "Gcash", amount: "₱750", statusText: "Balance ₱750", status: "Verified", action: "View receipt" },
];

/* ---------- Page ---------- */
function DateChip({ className = "" }) {
  return (
    <div className={`h-[30px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee] px-[12px] ${className}`}>
      <Calendar className="h-[14px] w-[14px] text-[#2a8570]" />
      <span className={`${inter} whitespace-nowrap text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
    </div>
  );
}

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState("receive");
  const [searchTerm, setSearchTerm] = useState("");
  const [navOpen, setNavOpen] = useState(false); // bukas/sarado ang sidebar drawer sa mobile

  const matches = (p) => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

  return (
    <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
      <style>{FONT_CSS}</style>

      {/* Affiliate sidebar (may sariling drawer behavior na) */}
      <AffiliateNavigation open={navOpen} onClose={() => setNavOpen(false)} />

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
              <div className={`${inter} text-[14px] font-bold tracking-[3px] text-[#4a9b8e] sm:text-[20px] sm:tracking-[4.2px]`}>PAYMENT</div>
            </div>
            <h1 className={`${serif} mt-[8px] text-[26px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[34px] lg:text-[40px]`}>
              receipts &amp; payments.
            </h1>
            <p className={`${serif} mt-[8px] max-w-xl text-[13px] text-[#666]`}>
              See everyone who paid a downpayment or the full amount, open the receipt they uploaded, and set where clients should send their money.
            </p>
            {/* Date chip: nasa ilalim ng description sa mobile */}
            <DateChip className="mt-[12px] inline-flex sm:hidden" />
          </div>

          <div className="flex shrink-0 items-center gap-[12px] sm:gap-[17px]">
            <DateChip className="hidden w-[170px] sm:flex" />
            <button
              aria-label="Notifications"
              className="relative flex h-[37px] w-[46px] items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white"
            >
              <Bell className="h-[18px] w-[18px] text-[#2a8570]" />
              <span className="absolute right-[10px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#e07b6a]" />
            </button>
          </div>
        </header>

        {/* Stat cards */}
        <section className="mt-[24px] grid grid-cols-1 gap-[12px] sm:mt-[34px] sm:grid-cols-2 sm:gap-[16px] xl:grid-cols-4 xl:gap-[29px]">
          <StatCard variant="dark" title="VERIFIED PAYMENTS" value="₱9,600" subtitle="Open slots · next 30 days" />
          <StatCard variant="warn" title="RECEIPTS TO VERIFY" value="3" subtitle="Receipts to verify" />
          <StatCard title="BALANCE DUE" value="₱2,400" subtitle="Balance due from downpayments" />
          <StatCard title="PAYMENT SUMMARY" value="6 / 4" subtitle="Full payments / downpayments" />
        </section>

        {/* Tabs & search */}
        <div className="mb-[24px] mt-[28px] flex flex-col gap-[12px] sm:mt-[41px] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex h-[38px] w-full items-center gap-[3px] rounded-[11px] bg-[#4a9b8e30] p-[3px] sm:h-[28px] sm:w-auto">
            {[
              ["receive", "Payments Receive"],
              ["methods", "Payment methods"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                aria-pressed={activeTab === key}
                className={`${serif} h-[32px] flex-1 rounded-[9px] px-[14px] text-[12px] text-[#202020] transition sm:h-[22px] sm:flex-none sm:text-[11px] ${
                  activeTab === key ? "bg-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search client"
              aria-label="Search client"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${serif} w-full rounded-[10px] border border-[#c7b6b6] bg-white py-2.5 pl-9 pr-4 text-[16px] text-black focus:outline-none focus:ring-2 focus:ring-[#4a9b8e] sm:py-2 sm:text-[13px]`}
            />
          </div>
        </div>

        <Group label="TODAY" items={todayPayments.filter(matches)} />
        <Group label="YESTERDAY" items={yesterdayPayments.filter(matches)} />
      </main>
    </div>
  );
}

function Group({ label, items }) {
  if (items.length === 0) return null;
  return (
    <section className="mb-[32px]">
      <div className="mb-4 flex items-center gap-4">
        <h3 className={`${inter} text-[12px] font-bold tracking-[2.5px] text-[#4a9b8e]`}>{label}</h3>
        <div className="h-px flex-1 bg-[#c7b6b6]" />
      </div>
      <div className="space-y-[14px]">
        {items.map((item) => (
          <PaymentRow key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ title, value, subtitle, variant = "light" }) {
  const base =
    "min-h-[140px] overflow-hidden border px-[23px] py-[22px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";
  const styles = {
    dark: "bg-[#1f4d3f] border-[#c7b6b6]",
    warn: "bg-gradient-to-b from-[#fdf1bc] to-[#fffbdd] from-0% to-25% border-[#2020203d]",
    light: "bg-white border-[#2020203d]",
  };
  const label = variant === "dark" ? "text-[#a8c8b8]" : "text-[#666]";
  const num = variant === "dark" ? "text-white" : "text-[#202020]";
  const sub = variant === "dark" ? "text-[#a8c8b8]" : "text-[#666]";

  return (
    <div className={`${base} ${styles[variant]}`}>
      <div className={`${inter} text-[11px] font-bold ${label}`}>{title}</div>
      <div className={`${inter} mt-[14px] text-[32px] font-bold leading-none ${num}`}>{value}</div>
      <p className={`${inter} mt-[12px] text-[11px] font-bold ${sub}`}>{subtitle}</p>
    </div>
  );
}

function Amount({ data, className = "" }) {
  return (
    <div className={`text-right ${className}`}>
      <div className={`${inter} text-[16px] font-bold text-[#202020]`}>{data.amount}</div>
      <div className={`${serif} whitespace-nowrap text-[11px] text-[#666]`}>{data.statusText}</div>
    </div>
  );
}

function PaymentRow({ data }) {
  const isPending = data.status === "To verify";
  const isDownpayment = data.type === "Downpayment";

  /*
    Mas maliit sa xl: dalawang row ang card.
      Row 1: date + client + amount
      Row 2: badges + status + action
    xl pataas: isang row lang (ang row 2 wrapper ay "contents" kaya nagiging direct na bahagi ng row).
  */
  return (
    <div className="flex flex-col gap-[14px] rounded-[10px] border border-[#c7b6b6] bg-white p-4 transition hover:shadow-md xl:flex-row xl:items-center xl:justify-between xl:gap-4">
      {/* Date badge + Client (+ amount sa mas maliit na screen) */}
      <div className="flex min-w-0 items-center gap-[14px] xl:flex-1">
        <div className="w-[72px] shrink-0 rounded-[8px] bg-[#e3f2ee] p-2 text-center sm:w-[80px] sm:p-3">
          <div className={`${serif} text-2xl font-bold leading-none text-[#2f4a42]`}>{data.day}</div>
          <div className={`${serif} text-xs text-[#2a8570]`}>{data.month}</div>
          <div className={`${serif} mt-1 whitespace-nowrap text-[10px] text-[#666]`}>{data.time}</div>
        </div>

        <div className="min-w-0 flex-1 xl:min-w-[150px]">
          <h4 className={`${serif} text-[16px] font-bold text-black`}>{data.name}</h4>
          <p className={`${serif} text-[12px] text-[#666]`}>{data.service}</p>
        </div>

        <Amount data={data} className="shrink-0 xl:hidden" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-t border-[#e8e8e8] pt-[12px] xl:contents">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`${inter} whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold ${
              isDownpayment ? "bg-[#fdf1bc] text-[#7a5400]" : "bg-[#e3f2ee] text-[#2a8570]"
            }`}
          >
            {data.type}
          </span>
          <span className={`${inter} rounded-full bg-[#f2f2f2] px-3 py-1 text-[11px] font-bold text-[#202020]`}>
            {data.method}
          </span>
        </div>

        {/* Amount (xl pataas lang; sa mas maliit nasa itaas na) */}
        <Amount data={data} className="hidden min-w-[90px] xl:block" />

        {/* Status & action */}
        <div className="flex items-center gap-3">
          <span
            className={`${inter} flex items-center gap-1 whitespace-nowrap rounded px-2 py-1 text-[11px] font-bold ${
              isPending ? "bg-[#fdf1bc] text-[#7a5400]" : "bg-[#e3f2ee] text-[#2a8570]"
            }`}
          >
            {isPending ? <AlertCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
            {data.status}
          </span>

          <button
            className={`${serif} whitespace-nowrap rounded-[6px] px-4 py-2 text-[13px] transition sm:py-1.5 sm:text-[12px] ${
              isPending
                ? "bg-[#11a086] text-white hover:bg-[#0e8c75]"
                : "border border-[#c7b6b6] bg-white text-[#2f4a42] hover:bg-[#e3f2ee]"
            }`}
          >
            {data.action}
          </button>
        </div>
      </div>
    </div>
  );
}