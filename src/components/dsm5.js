export const DSM5_OPTIONS = [
    { v: 0, label: "None", sub: "Not at all" },
    { v: 1, label: "Slight", sub: "Rare, less than a day or two" },
    { v: 2, label: "Mild", sub: "Several days" },
    { v: 3, label: "Moderate", sub: "More than half the days" },
    { v: 4, label: "Severe", sub: "Nearly every day" },
];

export const DSM5_QUESTIONS = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Feeling more irritated, grouchy, or angry than usual?",
    "Sleeping less than usual, but still have a lot of energy?",
    "Starting lots more projects than usual or doing more risky things than usual?",
    "Feeling nervous, anxious, frightened, worried, or on edge?",
    "Feeling panic or being frightened?",
    "Avoiding situations that make you anxious?",
    "Unexplained aches and pains (e.g., head, back, joints, abdomen, legs)?",
    "Feeling that your illnesses are not being taken seriously enough?",
    "Thoughts of actually hurting yourself?",
    "Hearing things other people couldn’t hear, such as voices even when no one was around?",
    "Feeling that someone could hear your thoughts, or that you could hear what another person was thinking?",
    "Problems with sleep that affected your sleep quality over all?",
    "Problems with memory (e.g., learning new information) or with location (e.g., finding your way home)?",
    "Unpleasant thoughts, urges, or images that repeatedly enter your mind?",
    "Feeling driven to perform certain behaviors or mental acts over and over again?",
    "Feeling detached or distant from yourself, your body, your physical surroundings, or your memories?",
    "Not knowing who you really are or what you want out of life?",
    "Not feeling close to other people or enjoying your relationships with them?",
    "Drinking at least 4 drinks of any kind of alcohol in a single day?",
    "Smoking any cigarettes, a cigar, or pipe, or using snuff or chewing tobacco?",
    "Using any of the following medicines ON YOUR OWN, that is, without a doctor’s prescription, in greater amounts or longer than prescribed [e.g., painkillers (like Vicodin), stimulants (like Ritalin or Adderall), sedatives or tranquilizers (like sleeping pills or Valium), or drugs like marijuana, cocaine or crack, club drugs (like ecstasy), hallucinogens (like LSD), heroin, inhalants or solvents (like glue), or methamphetamine (like speed)]?",
];

// items = numero ng tanong (1-based). threshold = pinakamababang score na dapat i-follow up (DSM-5 Level 2 guide)
export const DSM5_DOMAINS = [
    { id: "I", name: "Depression", items: [1, 2], threshold: 2 },
    { id: "II", name: "Anger", items: [3], threshold: 2 },
    { id: "III", name: "Mania", items: [4, 5], threshold: 2 },
    { id: "IV", name: "Anxiety", items: [6, 7, 8], threshold: 2 },
    { id: "V", name: "Somatic symptoms", items: [9, 10], threshold: 2 },
    { id: "VI", name: "Suicidal ideation", items: [11], threshold: 1 },
    { id: "VII", name: "Psychosis", items: [12, 13], threshold: 1 },
    { id: "VIII", name: "Sleep problems", items: [14], threshold: 2 },
    { id: "IX", name: "Memory", items: [15], threshold: 1 },
    { id: "X", name: "Repetitive thoughts & behaviors", items: [16, 17], threshold: 2 },
    { id: "XI", name: "Dissociation", items: [18], threshold: 2 },
    { id: "XII", name: "Personality functioning", items: [19, 20], threshold: 2 },
    { id: "XIII", name: "Substance use", items: [21, 22, 23], threshold: 1 },
];

// Highest score kada domain + kung umabot sa threshold
export function domainResults(answers = []) {
    return DSM5_DOMAINS.map((d) => {
        const scores = d.items.map((n) => answers[n - 1]);
        const highest = Math.max(...scores.map((s) => (typeof s === "number" ? s : 0)));
        return { ...d, scores, highest, flagged: highest >= d.threshold };
    });
}