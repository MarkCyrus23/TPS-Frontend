import React, { useState } from "react";
import AffiliateNavigation from "./affiliatenav";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;600;700&family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap');`;

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";

/* ------------------------------------------------------------------ */
/*  Initial Data for October 2023                                      */
/* ------------------------------------------------------------------ */
const STAT_CARDS = [
  { count: "13", label: "Open slots · next 30 days" },
  { count: "13", label: "Booked sessions" },
  { count: "13", label: "Pending requests" },
  { count: "13", label: "Not available" },
];

const DAYS_HEADER = ["S", "M", "T", "W", "T", "F", "S"];

const INITIAL_DAYS = [
  // Week 1
  { d: 1, dayName: "Sun", state: "normal", hours: "" },
  { d: 2, dayName: "Mon", state: "normal", hours: "" },
  { d: 3, dayName: "Tue", state: "normal", hours: "" },
  { d: 4, dayName: "Wed", state: "normal", hours: "" },
  { d: 5, dayName: "Thu", state: "normal", hours: "" },
  { d: 6, dayName: "Fri", state: "normal", hours: "" },
  { d: 7, dayName: "Sat", state: "normal", hours: "" },
  // Week 2
  { d: 8, dayName: "Sun", state: "normal", hours: "" },
  { d: 9, dayName: "Mon", state: "normal", hours: "" },
  { d: 10, dayName: "Tue", state: "normal", hours: "" },
  { d: 11, dayName: "Wed", state: "normal", hours: "" },
  { d: 12, dayName: "Thu", state: "normal", hours: "" },
  { d: 13, dayName: "Fri", state: "normal", hours: "" },
  { d: 14, dayName: "Sat", state: "normal", hours: "" },
  // Week 3
  { d: 15, dayName: "Sun", state: "normal", hours: "" },
  { d: 16, dayName: "Mon", state: "selected", hours: "9 AM - 5 PM", openHours: 8, booked: 0, requested: 0 },
  { d: 17, dayName: "Tue", state: "available", hours: "9 AM - 5 PM", hasSession: true, openHours: 8, booked: 2, requested: 1 },
  { d: 18, dayName: "Wed", state: "available", hours: "9 AM - 5 PM", hasSession: true, openHours: 8, booked: 1, requested: 0 },
  { d: 19, dayName: "Thu", state: "available", hours: "9 AM - 5 PM", hasSession: true, openHours: 8, booked: 3, requested: 1 },
  { d: 20, dayName: "Fri", state: "available", hours: "9 AM - 5 PM", hasSession: true, openHours: 8, booked: 2, requested: 0 },
  { d: 21, dayName: "Sat", state: "unavailable", hours: "Not available" },
  // Week 4
  { d: 22, dayName: "Sun", state: "unavailable", hours: "Not available" },
  { d: 23, dayName: "Mon", state: "available", hours: "9 AM - 5 PM", hasSession: false, openHours: 8, booked: 0, requested: 0 },
  { d: 24, dayName: "Tue", state: "available", hours: "9 AM - 5 PM", hasSession: false, openHours: 8, booked: 0, requested: 0 },
  { d: 25, dayName: "Wed", state: "available", hours: "9 AM - 5 PM", hasSession: false, openHours: 8, booked: 0, requested: 0 },
  { d: 26, dayName: "Thu", state: "available", hours: "9 AM - 5 PM", hasSession: false, openHours: 8, booked: 0, requested: 0 },
  { d: 27, dayName: "Fri", state: "available", hours: "9 AM - 5 PM", hasSession: false, openHours: 8, booked: 0, requested: 0 },
  { d: 28, dayName: "Sat", state: "unavailable", hours: "Not available" },
  // Week 5
  { d: 29, dayName: "Sun", state: "unavailable", hours: "Not available" },
  { d: 30, dayName: "Mon", state: "unavailable", hours: "Not available" },
  { d: 31, dayName: "Tue", state: "unavailable", hours: "Not available" },
  // Next month (November) filler days
  { d: 1, dayName: "Wed", state: "next-month", hours: "" },
  { d: 2, dayName: "Thu", state: "next-month", hours: "" },
  { d: 3, dayName: "Fri", state: "next-month", hours: "" },
  { d: 4, dayName: "Sat", state: "next-month", hours: "" },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
function DateChip({ className = "" }) {
  return (
    <div className={`h-[30px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee] px-[12px] ${className}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      <span className={`${inter} whitespace-nowrap text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Schedule Component                                            */
/* ------------------------------------------------------------------ */
export default function AffiliateSchedule() {
  const [days, setDays] = useState(INITIAL_DAYS);
  const [selectedDayNumber, setSelectedDayNumber] = useState(16);
  const [availabilityMode, setAvailabilityMode] = useState("available"); // 'available' | 'not_available'
  const [fromTime, setFromTime] = useState("8:00 AM");
  const [toTime, setToTime] = useState("5:00 PM");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // bukas/sarado ang sidebar drawer sa mobile

  // Find currently selected day
  const selectedDay = days.find((item) => item.d === selectedDayNumber && item.state !== "next-month") || days[15];

  const handleSelectDay = (dayObj) => {
    if (dayObj.state === "next-month") return;
    setSelectedDayNumber(dayObj.d);
    if (dayObj.state === "unavailable") {
      setAvailabilityMode("not_available");
    } else {
      setAvailabilityMode("available");
    }
  };

  const handleAddAvailability = () => {
    setDays((prev) =>
      prev.map((item) => {
        if (item.d === selectedDayNumber && item.state !== "next-month") {
          if (availabilityMode === "available") {
            return {
              ...item,
              state: "available",
              hours: `${fromTime} - ${toTime}`,
            };
          } else {
            return {
              ...item,
              state: "unavailable",
              hours: "Not available",
              hasSession: false,
            };
          }
        }
        return item;
      })
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const fullDayName =
    selectedDay.dayName === "Sun"
      ? "Sunday"
      : selectedDay.dayName === "Mon"
      ? "Monday"
      : selectedDay.dayName === "Tue"
      ? "Tuesday"
      : selectedDay.dayName === "Wed"
      ? "Wednesday"
      : selectedDay.dayName === "Thu"
      ? "Thursday"
      : selectedDay.dayName === "Fri"
      ? "Friday"
      : "Saturday";

  return (
    <div className={`${inter} min-h-screen w-full bg-[#f4f6f5] text-[#1c1c1c] antialiased`}>
      <style>{FONT_CSS}</style>

      <div className="flex w-full items-start">
        {/* Affiliate sidebar (may sariling drawer behavior na) */}
        <AffiliateNavigation open={navOpen} onClose={() => setNavOpen(false)} />

        {/* Right Main Content Area */}
        <main className="min-w-0 max-w-[1400px] flex-1 px-[16px] pb-[48px] pt-[20px] sm:px-[28px] sm:pt-[32px] lg:px-[40px] lg:pb-[60px]">
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
                <div className={`${inter} text-[14px] font-bold uppercase tracking-[3px] text-[#4a9b8e] sm:text-[20px] sm:tracking-[4.2px]`}>
                  SCHEDULE
                </div>
              </div>
              <h1 className={`${serif} mt-[8px] text-[26px] font-bold leading-[1.15] text-[#2f4a42] sm:text-[34px] lg:text-[40px]`}>
                When are you available?
              </h1>
              <p className={`${serif} mt-[8px] max-w-[620px] text-[14px] text-[#555] sm:text-[15px]`}>
                Set the days and hours clients can book with you. Clients only see the times you open here.
              </p>
              {/* Date chip: nasa ilalim ng description sa mobile */}
              <DateChip className="mt-[12px] inline-flex sm:hidden" />
            </div>

            {/* Header Right Actions */}
            <div className="flex shrink-0 items-center gap-[12px] sm:gap-[17px] sm:pt-[6px]">
              <DateChip className="hidden w-[170px] sm:flex" />

              {/* Notification bell */}
              <button
                aria-label="Notifications"
                className="relative flex h-[37px] w-[46px] cursor-pointer items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white transition-colors hover:bg-[#f9fbf9]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span className="absolute right-[10px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#e07b6a]" />
              </button>
            </div>
          </header>

          {/* 4 Summary Stat Cards */}
          <div className="mt-[24px] grid grid-cols-2 gap-[12px] sm:mt-[34px] sm:gap-[24px] xl:grid-cols-4">
            {STAT_CARDS.map((card, i) => (
              <div
                key={i}
                className="flex min-h-[96px] flex-col justify-center rounded-[10px] border border-[#c7b6b6] bg-white p-[16px] shadow-sm sm:p-[20px]"
              >
                <div className={`${serif} text-[30px] font-bold leading-none text-[#202020] sm:text-[36px]`}>
                  {card.count}
                </div>
                <div className={`${serif} mt-[8px] text-[13px] font-normal text-[#555] sm:text-[14px]`}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid: Calendar + Availability Settings (naka-stack sa mas maliit sa xl) */}
          <div className="mt-[16px] grid grid-cols-1 gap-[16px] sm:mt-[24px] sm:gap-[24px] xl:grid-cols-[1.38fr_1fr]">
            {/* Left Card: Calendar */}
            <div className="flex flex-col justify-between rounded-[10px] border border-[#c7b6b6] bg-white p-[16px] shadow-sm sm:p-[28px]">
              <div>
                {/* Month header & navigation */}
                <div className="flex items-center justify-between gap-[12px]">
                  <div>
                    <h2 className={`${serif} text-[20px] font-bold text-[#202020] sm:text-[24px]`}>
                      October 2023
                    </h2>
                    <p className={`${serif} mt-[2px] text-[13px] text-[#666]`}>
                      Select a date to view availability
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-[8px]">
                    <button
                      className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#dcf0e8] text-[#1f6b55] transition-colors hover:bg-[#cbe8dc] sm:h-[28px] sm:w-[28px]"
                      aria-label="Previous month"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#dcf0e8] text-[#1f6b55] transition-colors hover:bg-[#cbe8dc] sm:h-[28px] sm:w-[28px]"
                      aria-label="Next month"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Day of Week Header: S M T W T F S */}
                <div className="mt-[20px] grid grid-cols-7 gap-[4px] text-center sm:gap-[8px]">
                  {DAYS_HEADER.map((d, i) => (
                    <div key={i} className={`${serif} text-[13px] font-normal text-[#666] sm:text-[14px]`}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Days 7-column Grid */}
                <div className="mt-[10px] grid grid-cols-7 gap-[4px] sm:gap-[8px]">
                  {days.map((item, idx) => {
                    const isSelected = item.d === selectedDayNumber && item.state !== "next-month";

                    // Determine styling based on state
                    let cardBg = "bg-white border-[#eef2f0] text-[#202020]";
                    let dayColor = "text-[#202020]";
                    let subtextColor = "text-[#8a9e97]";
                    let hoursColor = "text-[#202020]";

                    if (item.state === "next-month") {
                      cardBg = "bg-white border-[#f2f5f3] opacity-40";
                      dayColor = "text-[#b0c0b9]";
                      subtextColor = "text-[#c2d0c9]";
                    } else if (isSelected) {
                      // Selected date: Dark forest green
                      cardBg = "bg-[#184a3e] border-[#184a3e] text-white shadow-md";
                      dayColor = "text-white";
                      subtextColor = "text-[#cce2d9]";
                      hoursColor = "text-[#e2f0ea]";
                    } else if (item.state === "available") {
                      // Available date: Mint / sage green card
                      cardBg = "bg-[#9ccac0] border-[#8fbeb4] text-[#16382f]";
                      dayColor = "text-[#16382f]";
                      subtextColor = "text-[#285045]";
                      hoursColor = "text-[#16382f]";
                    } else if (item.state === "unavailable") {
                      // Unavailable date: Grayish / muted dark card
                      cardBg = "bg-[#7a817f] border-[#727977] text-white";
                      dayColor = "text-white";
                      subtextColor = "text-[#dbe0de]";
                      hoursColor = "text-white";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectDay(item)}
                        className={`relative flex min-h-[48px] cursor-pointer flex-col items-center justify-center rounded-[8px] border p-[2px] transition-all sm:min-h-[66px] sm:p-[6px] ${cardBg} ${
                          item.state !== "next-month" ? "hover:scale-[1.02]" : "cursor-default"
                        }`}
                      >
                        {/* Session indicator dot (yellow/gold) */}
                        {item.hasSession && (
                          <span className="absolute top-[4px] h-[6px] w-[6px] rounded-full bg-[#f3b53f]" />
                        )}

                        <div className={`${serif} text-[15px] font-bold leading-tight sm:text-[16px] ${dayColor}`}>
                          {item.d}
                        </div>
                        {/* Day name at oras: nakatago sa pinakamaliit na screen dahil masikip ang cell */}
                        <div className={`${serif} mt-[1px] hidden text-[11px] leading-tight sm:block ${subtextColor}`}>
                          {item.dayName}
                        </div>
                        {item.hours && (
                          <div className={`${serif} mt-[3px] hidden text-center text-[9px] font-medium leading-tight sm:block ${hoursColor}`}>
                            {item.hours}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend Footer */}
              <div className="mt-[26px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] border-t border-[#edf2ef] pt-[14px] text-[12px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <span className="h-[12px] w-[12px] rounded-[3px] bg-[#9ccac0]" />
                  <span className={serif}>Available</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="h-[12px] w-[12px] rounded-[3px] bg-[#7a817f]" />
                  <span className={serif}>Not available</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#f3b53f]" />
                  <span className={serif}>Has sessions</span>
                </div>
              </div>
            </div>

            {/* Right Card: Availability Settings */}
            <div className="flex flex-col justify-between rounded-[10px] border border-[#c7b6b6] bg-white p-[16px] shadow-sm sm:p-[28px]">
              <div>
                {/* Date header */}
                <h3 className={`${serif} text-[20px] font-bold text-[#202020] sm:text-[24px]`}>
                  {fullDayName}, October {selectedDay.d}
                </h3>
                <p className={`${serif} mt-[2px] text-[13px] text-[#666]`}>
                  {selectedDay.openHours || 8} open hours · {selectedDay.booked || 0} booked · {selectedDay.requested || 0} requested
                </p>

                {/* Available / Not available toggle cards */}
                <div className="mt-[20px] grid grid-cols-2 gap-[10px] sm:gap-[14px]">
                  {/* Available Option */}
                  <div
                    onClick={() => setAvailabilityMode("available")}
                    className={`cursor-pointer rounded-[8px] border p-[12px] transition-all ${
                      availabilityMode === "available"
                        ? "border-[#1f6b55] bg-white shadow-sm ring-1 ring-[#1f6b55]"
                        : "border-[#c7b6b6] bg-[#fbfdfc] opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-[6px] text-[#202020]">
                      {availabilityMode === "available" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f6b55" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      <span className={`${serif} text-[14px] font-bold`}>Available</span>
                    </div>
                    <div className={`${serif} mt-[3px] text-[11px] text-[#666]`}>
                      Client can book this date
                    </div>
                  </div>

                  {/* Not Available Option */}
                  <div
                    onClick={() => setAvailabilityMode("not_available")}
                    className={`cursor-pointer rounded-[8px] border p-[12px] transition-all ${
                      availabilityMode === "not_available"
                        ? "border-[#1f6b55] bg-white shadow-sm ring-1 ring-[#1f6b55]"
                        : "border-[#c7b6b6] bg-[#fbfdfc] opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-[6px] text-[#202020]">
                      {availabilityMode === "not_available" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f6b55" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      <span className={`${serif} text-[14px] font-bold`}>Not available</span>
                    </div>
                    <div className={`${serif} mt-[3px] text-[11px] text-[#666]`}>
                      Not available on this date
                    </div>
                  </div>
                </div>

                {/* Add availability Section */}
                <div className="mt-[28px]">
                  <h4 className={`${serif} text-[20px] font-bold text-[#202020]`}>
                    Add availability
                  </h4>
                  <p className={`${serif} mt-[2px] text-[13px] text-[#666]`}>
                    Type the time you can see clients on this date.
                  </p>

                  <div className="mt-[16px]">
                    <label className={`${inter} mb-[6px] block text-[11px] font-bold uppercase tracking-[1.5px] text-[#666]`}>
                      FROM AND TO
                    </label>
                    <div className="flex items-center gap-[8px] sm:gap-[10px]">
                      <input
                        type="text"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        aria-label="From time"
                        className={`${serif} w-full min-w-0 rounded-[6px] border border-[#c7b6b6] bg-white px-[12px] py-[10px] text-[16px] text-[#202020] outline-none focus:border-[#1f6b55] focus:ring-1 focus:ring-[#1f6b55] sm:px-[14px] sm:py-[8px] sm:text-[14px]`}
                        placeholder="8:00 AM"
                      />
                      <span className={`${serif} px-[2px] text-[13px] font-medium text-[#666]`}>
                        To
                      </span>
                      <input
                        type="text"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                        aria-label="To time"
                        className={`${serif} w-full min-w-0 rounded-[6px] border border-[#c7b6b6] bg-white px-[12px] py-[10px] text-[16px] text-[#202020] outline-none focus:border-[#1f6b55] focus:ring-1 focus:ring-[#1f6b55] sm:px-[14px] sm:py-[8px] sm:text-[14px]`}
                        placeholder="5:00 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic notice box */}
                <div className="mt-[24px] flex items-center justify-between rounded-[8px] border border-[#a8dbc4] bg-[#e6f4ee] p-[14px] text-[13px] text-[#175240]">
                  <span className={`${serif} text-[13px]`}>
                    {availabilityMode === "available"
                      ? `You'll open ${fromTime} – ${toTime} on ${fullDayName}, Oct ${selectedDay.d}.`
                      : `You will be marked unavailable on ${fullDayName}, Oct ${selectedDay.d}.`}
                  </span>
                </div>

                {savedSuccess && (
                  <div role="status" className="mt-[10px] flex items-center gap-[6px] text-[13px] font-semibold text-[#1f6b55]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className={serif}>Availability updated successfully!</span>
                  </div>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={handleAddAvailability}
                className={`${serif} mt-[28px] w-full cursor-pointer rounded-[8px] border-0 bg-[#00a58a] py-[12px] text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#00937a] hover:shadow`}
              >
                + Add availability
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}