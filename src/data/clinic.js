/** Shared clinic contact & branding data for the client site demo */

export const CLINIC = {
  name: "THREEFOLD",
  fullName: "Behavioral Interventions And Psychological Services",
  email: "hello@threefold.ph",
  phone: "+63 917 000 0000",
  phoneDisplay: "(02) 8000-1234",
  address: "16 Dr. Sixto Antonio Avenue, Kapasigan, Pasig City",
  facebook: "https://www.facebook.com/threefold.ph",
  facebookLabel: "facebook.com/threefold.ph",
  hours: "Mon–Sat · 9:00 AM – 6:00 PM",
  gcashNumber: "0917 000 0000",
  mayaNumber: "0917 000 0001",
  sessionFee: 1500,
  feeLabel: "₱1,500",
};

export const SERVICES = [
  {
    id: "psychotherapy",
    name: "Psychotherapy",
    fullName: "Psychotherapy / Counseling",
    hours: 1,
    duration: "1 hour",
    fee: 1500,
    description:
      "Individual talk therapy to build insight, process emotions, and develop healthy coping skills in a confidential setting.",
    details: ["Licensed psychologists", "Online or in-person (set by psychologist)", "Ideal for anxiety, mood, and life transitions"],
  },
  {
    id: "aba",
    name: "ABA Therapy",
    fullName: "ABA Therapy",
    hours: 2,
    duration: "2 hours",
    fee: 1500,
    description:
      "Structured Applied Behavior Analysis sessions focused on skill building, positive reinforcement, and supportive behavior change.",
    details: ["Specialist auto-assigned", "Intensive skill-focused sessions", "Family involvement when appropriate"],
  },
  {
    id: "assessment",
    name: "Assessment",
    fullName: "Assessment Consultation",
    hours: 1,
    duration: "1 hour",
    fee: 1500,
    description:
      "A comprehensive consultation and structured interview to clarify concerns and recommend the most effective next steps.",
    details: ["Specialist auto-assigned", "Diagnostic-informed interview", "Personalized recommendations"],
  },
];

export const PSYCHOLOGISTS = [
  {
    id: "maria",
    name: "Dr. Maria Santos",
    role: "Clinical Psychologist",
    photo: "/img/cartoon-female-psychologist-portrait-2.png",
    services: ["psychotherapy"],
  },
  {
    id: "juan",
    name: "Dr. Juan Dela Cruz",
    role: "Psychotherapist",
    photo: "/img/cartoon-male-psychologist.png",
    services: ["psychotherapy"],
  },
];

export function getService(id) {
  return SERVICES.find((s) => s.id === id) || null;
}

export function getPsychologist(id) {
  return PSYCHOLOGISTS.find((p) => p.id === id) || null;
}
