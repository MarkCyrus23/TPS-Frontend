import React, { useState } from "react";
import AdminNavigation from "./affiliatenav";

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
/*  Main Schedule Component                                            */
/* ------------------------------------------------------------------ */
export default function AdminSchedule() {
  const [days, setDays] = useState(INITIAL_DAYS);
  const [selectedDayNumber, setSelectedDayNumber] = useState(16);
  const [availabilityMode, setAvailabilityMode] = useState("available"); // 'available' | 'not_available'
  const [fromTime, setFromTime] = useState("8:00 AM");
  const [toTime, setToTime] = useState("5:00 PM");
  const [savedSuccess, setSavedSuccess] = useState(false);

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
        {/* Left Sidebar */}
        <AdminNavigation />

        {/* Right Main Content Area */}
        <main className="flex-1 px-[40px] pt-[32px] pb-[60px] max-w-[1400px]">
          {/* Header matching admindashboard.jsx style tokens */}
          <header className="flex items-start justify-between">
            <div>
              <div className={`${inter} text-[20px] font-bold tracking-[4.2px] text-[#4a9b8e] uppercase`}>
                SCHEDULE
              </div>
              <h1 className={`${serif} text-[40px] font-bold leading-[1.15] text-[#2f4a42] mt-[8px]`}>
                When are you available?
              </h1>
              <p className={`${serif} text-[15px] text-[#555] mt-[8px] max-w-[620px]`}>
                Set the days and hours clients can book with you. Clients only see the times you open here.
              </p>
            </div>

            {/* Header Right Actions matching admindashboard.jsx */}
            <div className="flex items-center gap-[17px] pt-[6px]">
              {/* Date pill */}
              <div className="flex h-[30px] w-[170px] items-center justify-center gap-[8px] rounded-[6px] border border-[#4a9b8e] bg-[#e3f2ee]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className={`${inter} text-[12px] font-bold text-[#2a8570]`}>Thursday, October 15</span>
              </div>

              {/* Notification bell */}
              <button
                aria-label="Notifications"
                className="relative flex h-[37px] w-[46px] items-center justify-center rounded-[8px] border border-[#c7b6b6] bg-white hover:bg-[#f9fbf9] transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a8570" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span className="absolute right-[10px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#e07b6a]" />
              </button>
            </div>
          </header>

          {/* 4 Summary Stat Cards matching admindashboard.jsx card aesthetics */}
          <div className="grid grid-cols-4 gap-[24px] mt-[34px]">
            {STAT_CARDS.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-[#c7b6b6] rounded-[10px] p-[20px] shadow-sm flex flex-col justify-center min-h-[96px]"
              >
                <div className={`${serif} text-[36px] font-bold text-[#202020] leading-none`}>
                  {card.count}
                </div>
                <div className={`${serif} text-[14px] text-[#555] font-normal mt-[8px]`}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid: Calendar on Left, Availability Settings on Right */}
          <div className="grid grid-cols-[1.38fr_1fr] gap-[24px] mt-[24px]">
            {/* Left Card: Calendar */}
            <div className="bg-white border border-[#c7b6b6] rounded-[10px] p-[28px] shadow-sm flex flex-col justify-between">
              <div>
                {/* Month header & navigation */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`${serif} text-[24px] font-bold text-[#202020]`}>
                      October 2023
                    </h2>
                    <p className={`${serif} text-[13px] text-[#666] mt-[2px]`}>
                      Select a date to view availability
                    </p>
                  </div>

                  <div className="flex items-center gap-[8px]">
                    <button
                      className="w-[28px] h-[28px] rounded-full bg-[#dcf0e8] text-[#1f6b55] flex items-center justify-center hover:bg-[#cbe8dc] transition-colors cursor-pointer border-0"
                      aria-label="Previous month"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="w-[28px] h-[28px] rounded-full bg-[#dcf0e8] text-[#1f6b55] flex items-center justify-center hover:bg-[#cbe8dc] transition-colors cursor-pointer border-0"
                      aria-label="Next month"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Day of Week Header: S M T W T F S with Serif font */}
                <div className="grid grid-cols-7 gap-[8px] mt-[20px] text-center">
                  {DAYS_HEADER.map((d, i) => (
                    <div key={i} className={`${serif} text-[14px] font-normal text-[#666]`}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Days 7-column Grid with Serif numbers & labels */}
                <div className="grid grid-cols-7 gap-[8px] mt-[10px]">
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
                        className={`relative rounded-[8px] border p-[6px] min-h-[66px] flex flex-col items-center justify-center transition-all cursor-pointer ${cardBg} ${
                          item.state !== "next-month" ? "hover:scale-[1.02]" : "cursor-default"
                        }`}
                      >
                        {/* Session indicator dot (yellow/gold) */}
                        {item.hasSession && (
                          <span className="absolute top-[5px] w-[6px] h-[6px] rounded-full bg-[#f3b53f]" />
                        )}

                        <div className={`${serif} text-[16px] font-bold leading-tight ${dayColor}`}>
                          {item.d}
                        </div>
                        <div className={`${serif} text-[11px] leading-tight mt-[1px] ${subtextColor}`}>
                          {item.dayName}
                        </div>
                        {item.hours && (
                          <div className={`${serif} text-[9px] font-medium leading-tight mt-[3px] text-center ${hoursColor}`}>
                            {item.hours}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend Footer */}
              <div className="flex items-center gap-[18px] mt-[26px] pt-[14px] border-t border-[#edf2ef] text-[12px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <span className="w-[12px] h-[12px] rounded-[3px] bg-[#9ccac0]" />
                  <span className={serif}>Available</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[12px] h-[12px] rounded-[3px] bg-[#7a817f]" />
                  <span className={serif}>Not available</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[8px] h-[8px] rounded-full bg-[#f3b53f]" />
                  <span className={serif}>Has sessions</span>
                </div>
              </div>
            </div>

            {/* Right Card: Availability Settings */}
            <div className="bg-white border border-[#c7b6b6] rounded-[10px] p-[28px] shadow-sm flex flex-col justify-between">
              <div>
                {/* Date header */}
                <h3 className={`${serif} text-[24px] font-bold text-[#202020]`}>
                  {fullDayName}, October {selectedDay.d}
                </h3>
                <p className={`${serif} text-[13px] text-[#666] mt-[2px]`}>
                  {selectedDay.openHours || 8} open hours · {selectedDay.booked || 0} booked · {selectedDay.requested || 0} requested
                </p>

                {/* Available / Not available toggle cards */}
                <div className="grid grid-cols-2 gap-[14px] mt-[20px]">
                  {/* Available Option */}
                  <div
                    onClick={() => setAvailabilityMode("available")}
                    className={`rounded-[8px] border p-[12px] transition-all cursor-pointer ${
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
                      <span className={`${serif} font-bold text-[14px]`}>Available</span>
                    </div>
                    <div className={`${serif} text-[11px] text-[#666] mt-[3px]`}>
                      Client can book this date
                    </div>
                  </div>

                  {/* Not Available Option */}
                  <div
                    onClick={() => setAvailabilityMode("not_available")}
                    className={`rounded-[8px] border p-[12px] transition-all cursor-pointer ${
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
                      <span className={`${serif} font-bold text-[14px]`}>Not available</span>
                    </div>
                    <div className={`${serif} text-[11px] text-[#666] mt-[3px]`}>
                      Not available on this date
                    </div>
                  </div>
                </div>

                {/* Add availability Section */}
                <div className="mt-[28px]">
                  <h4 className={`${serif} text-[20px] font-bold text-[#202020]`}>
                    Add availability
                  </h4>
                  <p className={`${serif} text-[13px] text-[#666] mt-[2px]`}>
                    Type the time you can see clients on this date.
                  </p>

                  <div className="mt-[16px]">
                    <label className={`${inter} block text-[11px] font-bold tracking-[1.5px] text-[#666] uppercase mb-[6px]`}>
                      FROM AND TO
                    </label>
                    <div className="flex items-center gap-[10px]">
                      <input
                        type="text"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className={`${serif} w-full rounded-[6px] border border-[#c7b6b6] bg-white px-[14px] py-[8px] text-[14px] text-[#202020] outline-none focus:border-[#1f6b55] focus:ring-1 focus:ring-[#1f6b55]`}
                        placeholder="8:00 AM"
                      />
                      <span className={`${serif} text-[13px] font-medium text-[#666] px-[2px]`}>
                        To
                      </span>
                      <input
                        type="text"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                        className={`${serif} w-full rounded-[6px] border border-[#c7b6b6] bg-white px-[14px] py-[8px] text-[14px] text-[#202020] outline-none focus:border-[#1f6b55] focus:ring-1 focus:ring-[#1f6b55]`}
                        placeholder="5:00 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic notice box */}
                <div className="mt-[24px] bg-[#e6f4ee] border border-[#a8dbc4] rounded-[8px] p-[14px] text-[13px] text-[#175240] flex items-center justify-between">
                  <span className={`${serif} text-[13px]`}>
                    {availabilityMode === "available"
                      ? `You'll open ${fromTime} – ${toTime} on ${fullDayName}, Oct ${selectedDay.d}.`
                      : `You will be marked unavailable on ${fullDayName}, Oct ${selectedDay.d}.`}
                  </span>
                </div>

                {savedSuccess && (
                  <div className="mt-[10px] text-[13px] font-semibold text-[#1f6b55] flex items-center gap-[6px]">
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
                className={`${serif} w-full mt-[28px] py-[12px] bg-[#00a58a] hover:bg-[#00937a] text-white rounded-[8px] text-[15px] font-semibold transition-all shadow-sm hover:shadow cursor-pointer border-0`}
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
