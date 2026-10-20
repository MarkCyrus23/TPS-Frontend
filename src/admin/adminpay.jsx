import React, { useState } from "react";
import AdminNavigation from "./adminnavigation";

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
export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState("receive");
  const [searchTerm, setSearchTerm] = useState("");

  const matches = (p) => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

  return (
    <div className="flex min-h-screen w-full bg-[#f2f2f2] antialiased">
      <style>{FONT_CSS}</style>

      <AdminNavigation />

      <main className="flex-1 overflow-y-auto px-[41px] pb-[60px] pt-[51px]">
        {/* Header */}
        <header className="flex items-start justify-between">
          <div>
            <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e]`}>PAYMENT</div>
            <h1 className={`${serif} mt-[8px] text-[40px] font-bold leading-[1.15] text-[#2f4a42]`}>
              receipts &amp; payments.
            </h1>
            <p className={`${serif} mt-[8px] max-w-xl text-[13px] text-[#666]`}>
              See everyone who paid a downpayment or the full amount, open the receipt they uploaded, and set where clients should send their money.
            </p>
          </div>

          <div className="flex items-center gap-[17px]">
            <div className="flex h-[30px] w-[170px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee]">
              <Calendar className="h-[14px] w-[14px] text-[#2a8570]" />
              <span className={`${inter} text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
            </div>
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
        <section className="mt-[34px] grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
          <StatCard variant="dark" title="VERIFIED PAYMENTS" value="₱9,600" subtitle="Open slots · next 30 days" />
          <StatCard variant="warn" title="RECEIPTS TO VERIFY" value="3" subtitle="Receipts to verify" />
          <StatCard title="BALANCE DUE" value="₱2,400" subtitle="Balance due from downpayments" />
          <StatCard title="PAYMENT SUMMARY" value="6 / 4" subtitle="Full payments / downpayments" />
        </section>

        {/* Tabs & search */}
        <div className="mb-[24px] mt-[41px] flex flex-wrap items-center justify-between gap-4">
          <div className="flex h-[28px] items-center gap-[3px] rounded-[11px] bg-[#4a9b8e30] p-[3px]">
            {[
              ["receive", "Payments Receive"],
              ["methods", "Payment methods"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`${serif} h-[22px] rounded-[9px] px-[14px] text-[11px] text-[#202020] transition ${
                  activeTab === key ? "bg-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search client"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${serif} w-full rounded-[10px] border border-[#c7b6b6] bg-white py-2 pl-9 pr-4 text-[13px] text-black focus:outline-none focus:ring-2 focus:ring-[#4a9b8e]`}
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
    "h-[140px] overflow-hidden border px-[23px] py-[22px] rounded-tl-[18px] rounded-tr-[7px] rounded-br-[18px] rounded-bl-[7px]";
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

function PaymentRow({ data }) {
  const isPending = data.status === "To verify";
  const isDownpayment = data.type === "Downpayment";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[#c7b6b6] bg-white p-4 transition hover:shadow-md md:flex-nowrap">
      {/* Date badge */}
      <div className="min-w-[90px] rounded-[8px] bg-[#e3f2ee] p-3 text-center">
        <div className={`${serif} text-2xl font-bold leading-none text-[#2f4a42]`}>{data.day}</div>
        <div className={`${serif} text-xs text-[#2a8570]`}>{data.month}</div>
        <div className={`${serif} mt-1 text-[10px] text-[#666]`}>{data.time}</div>
      </div>

      {/* Client */}
      <div className="min-w-[200px] flex-1">
        <h4 className={`${serif} text-[16px] font-bold text-black`}>{data.name}</h4>
        <p className={`${serif} text-[12px] text-[#666]`}>{data.service}</p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2">
        <span
          className={`${inter} rounded-full px-3 py-1 text-[11px] font-bold ${
            isDownpayment ? "bg-[#fdf1bc] text-[#7a5400]" : "bg-[#e3f2ee] text-[#2a8570]"
          }`}
        >
          {data.type}
        </span>
        <span className={`${inter} rounded-full bg-[#f2f2f2] px-3 py-1 text-[11px] font-bold text-[#202020]`}>
          {data.method}
        </span>
      </div>

      {/* Amount */}
      <div className="min-w-[100px] text-right">
        <div className={`${inter} text-[16px] font-bold text-[#202020]`}>{data.amount}</div>
        <div className={`${serif} text-[11px] text-[#666]`}>{data.statusText}</div>
      </div>

      {/* Status & action */}
      <div className="flex items-center gap-3">
        <span
          className={`${inter} flex items-center gap-1 rounded px-2 py-1 text-[11px] font-bold ${
            isPending ? "bg-[#fdf1bc] text-[#7a5400]" : "bg-[#e3f2ee] text-[#2a8570]"
          }`}
        >
          {isPending ? <AlertCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
          {data.status}
        </span>

        <button
          className={`${serif} rounded-[6px] px-4 py-1.5 text-[12px] transition ${
            isPending
              ? "bg-[#11a086] text-white hover:bg-[#0e8c75]"
              : "border border-[#c7b6b6] bg-white text-[#2f4a42] hover:bg-[#e3f2ee]"
          }`}
        >
          {data.action}
        </button>
      </div>
    </div>
  );
}