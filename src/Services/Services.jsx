import { Link } from "react-router-dom";
import { Navbar, Footer, Reveal, Photo, container, btnSolid } from "../components/Layout";

/* Where "Book now" goes. Matches Home's current booking anchor; point it at your real booking route later. */
const BOOK_TO = "/book";

/* ---------- Content (edit here, not in the markup) ---------- */
const SERVICES = [
  {
    id: "psychotherapy",
    name: "Psychotherapy / Counseling",
    title: "Psychotherapy / Counseling",
    hours: 1,
    label: "1-hour session",
    meta: "Online or in-person",
    text: "Individual talk therapy designed to build self-awareness, explore complex emotions, and develop healthy, lasting ways of coping with daily life.",
    goodFor: ["Anxiety", "Low mood", "Stress & burnout", "Relationships", "Grief"],
    steps: [
      "You talk through what's on your mind in a private, judgment-free space.",
      "Together we explore the patterns behind your thoughts, feelings, and reactions.",
      "You leave with practical coping skills you can use right away.",
    ],
  },
  {
    id: "aba",
    name: "ABA Therapy",
    title: "ABA Therapy",
    hours: 2,
    label: "2-hour session",
    meta: "Intensive · For children · Parents involved",
    text: "Structured, play-based sessions using Applied Behavior Analysis. We focus on building skills step by step with positive reinforcement in a warm, encouraging space.",
    goodFor: ["Autism", "Developmental delays", "Communication", "Social skills", "Daily routines"],
    steps: [
      "Goals are set around your child's needs, strengths, and pace.",
      "Skills are built through play, practice, and positive reinforcement.",
      "Parents are guided on how to carry progress over to home.",
    ],
  },
  {
    id: "assessment",
    name: "Assessment & Consultation",
    title: "Assessment & Consultation",
    hours: 1,
    label: "1-hour session",
    meta: "Comprehensive review · Adults & children",
    text: "A thorough review and structured interview that gives you a clear picture of what's going on, along with recommendations tailored to you or your child.",
    goodFor: ["Not sure where to start", "Seeking clarity", "Learning concerns", "Behavior concerns", "Next-step guidance"],
    steps: [
      "We gather background and clarify the concerns you want help understanding.",
      "A structured interview and review help map strengths, challenges, and context.",
      "You receive clear recommendations and next-step options tailored to you or your child.",
    ],
  },
];

/* ---------- Small pieces ---------- */
const Arrow = ({ dir = "right" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={dir === "down" ? "rotate-90" : undefined}
  >
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

function Glance() {
  return (
    <aside
      className="bg-[#fafafa] border border-black/15 rounded-[19px] pt-6 px-[26px] pb-2 max-[560px]:px-[18px]"
      aria-labelledby="sv-glance-title"
    >
      <h2 id="sv-glance-title" className="m-0 text-[15px] font-normal">
        At a glance
      </h2>
      <p className="m-0 mt-1 text-[11px] text-black/55">
        Tap a service to see what&apos;s included before you book.
      </p>
      <ul className="m-0 mt-3.5 p-0 list-none">
        {SERVICES.map((s) => (
          <li key={s.id} className="border-t border-tf-line first:border-t-0">
            <a
              href={`#${s.id}`}
              className="grid grid-cols-[1fr_auto_auto] max-[560px]:grid-cols-[1fr_auto] items-center gap-3.5 py-4 no-underline text-inherit transition-transform duration-250 ease-tf hover:translate-x-[3px] group"
            >
              <span>
                <b className="block font-normal text-sm">{s.name}</b>
                <small className="block mt-[3px] text-[10px] text-black/55">
                  See what&apos;s included &amp; how it works
                </small>
              </span>
              <span className="font-serif text-sm text-tf-teal whitespace-nowrap">
                {s.hours} hr
              </span>
              <span className="grid place-items-center w-6 h-6 rounded-full bg-[#c9e0d5] text-tf-ink transition-[background,color] duration-250 group-hover:bg-tf-teal group-hover:text-white max-[560px]:hidden">
                <Arrow />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Service({ s }) {
  return (
    <Reveal className="border-t border-tf-line first:border-t-0">
      <section
        className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] max-[900px]:grid-cols-1 gap-[clamp(28px,5vw,80px)] items-start py-[clamp(44px,6vw,80px)]"
        id={s.id}
        aria-labelledby={`${s.id}-title`}
      >
        <div>
          <div className="flex items-center gap-4">
            <span
              className="shrink-0 grid content-center justify-items-center w-[66px] h-[66px] rounded-full border-4 border-[#10a28c] font-serif leading-none"
              aria-hidden="true"
            >
              <b className="text-[22px] font-normal">{s.hours}</b>
              <i className="text-[11px] not-italic mt-0.5">hr</i>
            </span>
            <p className="m-0 grid gap-[3px] font-serif">
              <span className="text-sm text-[#10a28c]">{s.label}</span>
              <small className="text-[11px] text-[#666]">{s.meta}</small>
            </p>
          </div>
          <h2
            id={`${s.id}-title`}
            className="m-0 mt-[22px] mb-3.5 font-serif font-bold text-tf-ink text-[clamp(28px,3.6vw,40px)] leading-[1.12]"
          >
            {s.title}
          </h2>
          <p className="m-0 font-serif text-[clamp(17px,2vw,20px)] leading-[1.55] text-[#666] max-w-[52ch]">
            {s.text}
          </p>
          <div className="flex items-center flex-wrap gap-[22px] mt-7">
            <Link to={BOOK_TO} className={`${btnSolid} no-underline max-[560px]:flex-1 max-[560px]:min-w-[140px]`}>
              Book now
            </Link>
            <Link
              to="/#contact"
              className="font-serif text-[15px] text-tf-ink border-b border-transparent no-underline transition-[border-color,color] duration-250 hover:border-current"
            >
              Ask a question
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-[clamp(22px,3vw,32px)]">
          <h3 className="m-0 mb-3 font-serif font-normal text-[13px] tracking-[0.12em] uppercase text-[#666]">
            Good for
          </h3>
          <ul className="flex flex-wrap gap-2.5 m-0 mb-[30px] p-0 list-none">
            {s.goodFor.map((t) => (
              <li
                key={t}
                className="font-serif font-bold text-xs text-[rgba(26,35,50,0.7)] bg-[rgba(74,155,142,0.15)] py-1.5 px-4 rounded-xl"
              >
                {t}
              </li>
            ))}
          </ul>

          <h3 className="m-0 mb-3 font-serif font-normal text-[13px] tracking-[0.12em] uppercase text-[#666]">
            What happens
          </h3>
          <ol className="relative m-0 p-0 pl-[22px] list-none grid gap-[18px] before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-px before:bg-[rgba(74,155,142,0.45)]">
            {s.steps.map((t) => (
              <li
                key={t}
                className="relative font-serif text-[15px] leading-normal text-[#666] before:content-[''] before:absolute before:-left-[22px] before:top-1.5 before:w-[9px] before:h-[9px] before:rounded-full before:bg-tf-teal"
              >
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- Page ---------- */
export default function Services() {
  return (
    <div className="font-sans text-black bg-tf-bg overflow-x-hidden antialiased">
      <Navbar />
      <main>
        <header className="relative isolate overflow-hidden py-[clamp(48px,7vw,96px)]">
          {/* Optional: export the tree art from Figma as ONE png to /public/img/tree.png */}
          <Photo
            src="/img/tree.png"
            className="absolute -right-[4%] -bottom-[6%] w-[min(46vw,560px)] opacity-[0.22] -z-10 pointer-events-none max-[900px]:w-[90vw] max-[900px]:-right-[20%] max-[900px]:opacity-[0.14]"
          />
          <div
            className={`${container} grid grid-cols-[minmax(0,1fr)_minmax(0,470px)] max-[900px]:grid-cols-1 gap-[clamp(32px,6vw,96px)] items-center`}
          >
            <div>
              <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">OUR SERVICES</p>
              <h1 className="m-0 mt-2.5 mb-[18px] font-semibold text-[clamp(30px,4.2vw,40px)] leading-[1.15] max-w-[14ch] max-[900px]:max-w-none">
                Care that fits <em className="not-italic text-tf-teal">what you need.</em>
              </h1>
              <p className="m-0 text-base leading-relaxed text-black/70 max-w-[440px]">
                Three clear ways we can support you. Every session is private, paced by you, and led by a qualified specialist.
              </p>
              <a
                href="#psychotherapy"
                className="inline-flex items-center gap-3 mt-7 text-xs text-black/70 no-underline group"
              >
                <span className="grid place-items-center w-[30px] h-[30px] rounded-full border border-black/25 transition-[background,border-color] duration-250 group-hover:bg-white group-hover:border-tf-teal">
                  <Arrow dir="down" />
                </span>
                Scroll to explore each service
              </a>
            </div>
            <Glance />
          </div>
        </header>

        <div className={`${container} pb-[clamp(40px,6vw,80px)]`}>
          {SERVICES.map((s) => (
            <Service key={s.id} s={s} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
