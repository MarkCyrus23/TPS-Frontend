import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CLINIC, getPsychologist, getService } from "../data/clinic";

const STORAGE_KEY = "tf_booking";

const defaultBooking = {
  serviceId: null,
  psychologistId: null,
  bookingMode: "psychologist-first", // or "schedule-first"
  date: null, // { year, month, day }
  time: null,
  client: {
    fullName: "",
    birthdate: "",
    email: "",
    mobile: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  },
  payment: {
    type: "full", // full | down
    method: "gcash",
    amountPaid: 0,
    remaining: 0,
    refNumber: "",
  },
  approvalStatus: "none", // none | payment_pending | psychologist_pending | approved | rejected
  consentComplete: false,
  referenceNumber: "",
};

function load() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultBooking;
    return { ...defaultBooking, ...JSON.parse(raw), client: { ...defaultBooking.client, ...JSON.parse(raw).client }, payment: { ...defaultBooking.payment, ...JSON.parse(raw).payment } };
  } catch {
    return defaultBooking;
  }
}

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(load);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  }, [booking]);

  const update = (patch) => setBooking((b) => ({ ...b, ...patch }));
  const updateClient = (patch) =>
    setBooking((b) => ({ ...b, client: { ...b.client, ...patch } }));
  const updatePayment = (patch) =>
    setBooking((b) => ({ ...b, payment: { ...b.payment, ...patch } }));
  const reset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBooking(defaultBooking);
  };

  const service = getService(booking.serviceId);
  const psychologist = getPsychologist(booking.psychologistId);

  const dateLabel = useMemo(() => {
    if (!booking.date || !booking.time) return "To be set";
    const { year, month, day } = booking.date;
    const d = new Date(year, month, day);
    const dateStr = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return `${dateStr} · ${booking.time}`;
  }, [booking.date, booking.time]);

  const dateLongLabel = useMemo(() => {
    if (!booking.date) return "—";
    const { year, month, day } = booking.date;
    return new Date(year, month, day).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [booking.date]);

  const fee = service?.fee ?? CLINIC.sessionFee;
  const feeLabel = `₱${fee.toLocaleString()}`;

  const summaryRows = [
    { label: "SERVICE", value: service?.name || "To be set" },
    {
      label: "PSYCHOLOGIST",
      value:
        psychologist?.name ||
        (booking.serviceId === "psychotherapy" ? "To be set" : booking.serviceId ? "Auto-assigned" : "To be set"),
    },
    { label: "DATE & TIME", value: dateLabel },
  ];

  const value = {
    booking,
    setBooking,
    update,
    updateClient,
    updatePayment,
    reset,
    service,
    psychologist,
    dateLabel,
    dateLongLabel,
    fee,
    feeLabel,
    summaryRows,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
