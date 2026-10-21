import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Reveal, SectionHead, Photo, btnSolid } from "../components/Layout";
import { CLINIC } from "../data/clinic";

const ICONS = {
  select: <><rect x="14" y="10" width="36" height="46" rx="5" /><path d="M24 24h16M24 34h16M24 44h10" /></>,
  calendar: <><rect x="10" y="14" width="44" height="40" rx="5" /><path d="M10 26h44M22 8v10M42 8v10" /></>,
  connect: <><circle cx="24" cy="24" r="8" /><circle cx="42" cy="28" r="6" /><path d="M10 52c0-9 6-15 14-15s14 6 14 15M38 40c8 0 14 4 16 12" /></>,
  sprout: <><path d="M32 56V30" /><path d="M32 34c0-10-7-16-18-16 0 10 7 16 18 16zM32 28c0-9 6-14 16-14 0 9-6 14-16 14z" /></>,
  chat: <><path d="M10 14h44v28H30l-12 10V42h-8z" /><path d="M32 36s-10-6-10-12a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 12-10 12z" /></>,
  blocks: <><rect x="10" y="32" width="20" height="20" rx="3" /><rect x="34" y="32" width="20" height="20" rx="3" /><rect x="22" y="10" width="20" height="20" rx="3" /></>,
  check: <><rect x="14" y="10" width="36" height="46" rx="5" /><path d="M24 34l6 6 11-13" /></>,
};

function Icon({ name, size = 64, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const LeafVine = ({ className = "" }) => (
  <svg className={`pointer-events-none absolute z-0 ${className}`} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 C50 50 10 100 10 150 C10 180 30 200 50 200" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M30 40 Q50 30 60 50 Q40 60 30 40" fill="#2a6a53" opacity="0.8" />
    <path d="M15 90 Q35 70 45 90 Q25 110 15 90" fill="#2a6a53" opacity="0.8" />
    <path d="M20 140 Q40 130 50 150 Q30 160 20 140" fill="#2a6a53" opacity="0.8" />
    <path d="M60 70 Q80 50 90 70 Q70 90 60 70" fill="#2a6a53" opacity="0.6" />
    <path d="M40 180 Q60 170 70 190 Q50 200 40 180" fill="#2a6a53" opacity="0.6" />
  </svg>
);

const HeadIcon = ({ className = "" }) => (
  <svg className={`pointer-events-none absolute z-0 ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 20 C130 20 160 50 160 90 C160 120 140 140 120 150 C110 155 100 170 90 170 C80 170 70 160 70 150 C70 140 80 130 90 130 C100 130 110 120 110 110 C110 100 100 90 90 90 C80 90 70 100 60 100 C50 100 40 90 40 80 C40 50 70 20 100 20 Z" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M120 80 C130 80 140 90 140 100" stroke="#2a6a53" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M80 110 C85 115 90 120 100 120" stroke="#2a6a53" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M150 120 Q170 120 180 140 Q170 160 150 160" stroke="#2a6a53" strokeWidth="1.5" />
    <path d="M160 130 Q175 130 185 140" stroke="#2a6a53" strokeWidth="1.5" />
  </svg>
);

const FloatingDots = ({ className = "" }) => (
  <svg className={`pointer-events-none absolute z-0 ${className}`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="3" fill="#4a9b8e" opacity="0.6" />
    <circle cx="25" cy="5" r="2" fill="#4a9b8e" opacity="0.4" />
    <circle cx="5" cy="25" r="2" fill="#4a9b8e" opacity="0.4" />
    <circle cx="40" cy="15" r="4" fill="#4a9b8e" opacity="0.7" />
    <circle cx="20" cy="40" r="3" fill="#4a9b8e" opacity="0.5" />
    <circle cx="45" cy="40" r="2" fill="#4a9b8e" opacity="0.6" />
  </svg>
);

function HeroArt({ className = "" }) {
  const leaf = (x, y, r, c, s = 1) => (
    <path key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={c}
      d="M0 0C30-40 90-40 120 0 90 40 30 40 0 0z" />
  );
  return (
    <svg className={className} viewBox="0 0 600 520" aria-hidden="true">
      <circle cx="400" cy="270" r="210" fill="#cfe4dc" opacity=".6" />
      <circle cx="470" cy="330" r="130" fill="#aac6b7" opacity=".55" />
      <path d="M300 520C300 380 330 260 420 120" stroke="#3d865b" strokeWidth="6" fill="none" strokeLinecap="round" />
      {leaf(312, 430, -40, "#6bbfaa")}
      {leaf(306, 360, -150, "#4a9b8e")}
      {leaf(330, 300, -35, "#3d865b", 1.1)}
      {leaf(340, 240, -155, "#7bb4ab")}
      {leaf(375, 190, -45, "#4a9b8e", 1.1)}
      {leaf(395, 140, -150, "#00a58a", .9)}
      {leaf(418, 118, -75, "#3d865b", .8)}
    </svg>
  );
}

const containerClass =
  "w-[min(1240px,calc(100%-clamp(40px,10vw,160px)))] mx-auto relative z-10";
const sectionClass = "py-[clamp(72px,10vw,130px)] relative";

const btnSolidLg =
  "inline-flex items-center justify-center h-12 px-7 rounded-lg bg-tf-navy text-white text-base no-underline whitespace-nowrap transition-[transform,box-shadow,background,color] duration-[250ms] ease-tf hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(24,28,59,0.55)] active:translate-y-0 active:scale-[0.98] max-[560px]:w-full";

const riseBase =
  "opacity-0 translate-y-[18px] animate-[tf-rise_0.9s_var(--ease-tf)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:animate-none";

/* ---------- Content ---------- */
const STEPS = [
  { icon: "select", title: "Select your service", text: "Explore and choose from our range of mental health services (Psychotherapy, Counseling, ABA Therapy, Assessment) that best fit your needs." },
  { icon: "calendar", title: "Choose your schedule", text: "Select a convenient date and time for your initial virtual or in-person appointment that works for you." },
  { icon: "connect", title: "Connect with a specialist", text: "Get matched with a licensed therapist or counselor who specializes in your specific area of concern." },
  { icon: "sprout", title: "Start your journey", text: "Attend your scheduled session (in-person or virtual) to begin your path to healing and resilience." },
];

const SERVICES = [
  { icon: "chat", photo: "service-1.png", meta: "1 Hour Session", title: "Psychotherapy & Counseling", text: "Individual talk therapy sessions designed to enhance self-awareness, explore complex emotions, build deep insight, and develop healthy, resilient coping mechanisms tailored for your daily life." },
  { icon: "blocks", photo: "service-2.png", meta: "2 Hour Intensive Session", title: "ABA Therapy", text: "Structured behavioral interventions applying Applied Behavior Analysis. We focus on intensive skill building, positive reinforcement, and the development of key life behaviors in a supportive, encouraging environment." },
  { icon: "check", photo: "service-3.png", meta: "1 Hour Comprehensive Review", title: "Assessment & Consultation", text: "A thorough initial review and diagnostic structured interview. This provides a holistic understanding of your unique mental health landscape, allowing us to recommend highly tailored, effective approaches just for you." },
];

const TEAM = [
  { name: "Dr. Maria Santos", role: "Clinical Psychologist", focus: "Psychotherapy", quote: "A safe space to understand yourself, heal, and grow at your own pace.", bio: "I believe that healing begins when you feel safe, heard, and understood. My goal is to provide a supportive space where you can explore your emotions, overcome challenges, and work toward a healthier and more balanced life.", tags: ["Psychotherapy", "Counseling", "Anxiety"] },
  { name: "Dr. Juan Dela Cruz", role: "Psychotherapist", focus: "Counseling", quote: "Change starts with being heard — we move at a pace that feels right for you.", bio: "I work with adults navigating stress, relationships, and life transitions. Sessions focus on practical tools and a collaborative therapeutic relationship.", tags: ["Psychotherapy", "Counseling", "Relationships"] },
  { name: "Dr. Ana Reyes", role: "Behavioral Specialist", focus: "ABA Therapy", quote: "Small, consistent steps create lasting growth for children and families.", bio: "I specialize in Applied Behavior Analysis for children and teens, partnering with families to build communication, social, and daily living skills.", tags: ["ABA Therapy", "Child & Teen", "Parent coaching"] },
];

const STORIES = [
  { who: "M.C", text: "I felt heard and understood without being judged. The sessions helped me understand my emotions better and gave me confidence in handling life's challenges." },
  { who: "M.C", text: "The experience made me feel comfortable opening up about things I usually keep to myself. I learned to be kinder to myself and take things one step at a time." },
  { who: "M.C", text: "I appreciate having a safe space where I can talk freely. The guidance helped me reflect on my experiences and find healthier ways to cope with stress." },
];

const FAQS = [
  { q: "Is everything I share confidential?", a: "Yes. Your sessions are private and handled according to professional ethics and applicable privacy laws. Limits to confidentiality are explained before your first session." },
  { q: "Do you offer online and in-person sessions?", a: "Yes. You can choose a virtual or an in-person appointment when you book." },
  { q: "How long is a session, and how many will I need?", a: "Sessions run 1 to 2 hours depending on the service. Your specialist will recommend a plan after your first session." },
  { q: "How do I reschedule or cancel?", a: "Open My appointments, pick the session, and choose a new time or cancel. Please do so in advance when possible." },
  { q: "What if I don't feel like it's the right fit?", a: "That's okay. You can ask to be matched with a different specialist at any time." },
  { q: "Can children and teens be seen?", a: "Yes. Our ABA Therapy and counseling services support children and teens, with parents or guardians involved." },
];

function ChipAvatar() {
  return (
    <span className="shrink-0 w-10 h-[38px] rounded-full bg-[#7bb4ab] grid place-items-end justify-items-center overflow-hidden">
      <i className="block w-[66%] h-[62%] bg-[#214f44] rounded-[50%_50%_0_0]" />
    </span>
  );
}

/* ---------- Sections ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden isolate min-h-[clamp(600px,75vh,750px)] bg-[url('/img/hero-bg.svg'),linear-gradient(100deg,#faf9f6_0%,#f1f6f3_55%,#e3efe9_100%)] bg-center bg-cover bg-no-repeat"
    >
      <div
        className="absolute inset-0 -z-[2] bg-[linear-gradient(90deg,#faf9f6_0%,#faf9f6_45%,rgba(250,249,246,0)_90%)]"
        aria-hidden="true"
      />
      <div className={`${containerClass} relative z-10 py-20`}>
        <div className="max-w-[540px]">
          <p className={`font-serif text-sm tracking-[0.08em] text-[#5a615d] mb-3 ${riseBase} [animation-delay:0.05s]`}>
            A SAFE SPACE FOR WELL-BEING
          </p>
          <h1 className={`font-serif font-normal text-[clamp(36px,4.5vw,54px)] leading-[1.12] my-3.5 text-[#111] ${riseBase} [animation-delay:0.15s]`}>
            Professional support for every step of <em className="not-italic font-bold text-tf-green">your journey</em>.
          </h1>
          <p className={`font-serif text-lg leading-[1.55] max-w-[460px] text-[#333] ${riseBase} [animation-delay:0.3s]`}>
            Access compassionate mental health services, professional counseling, therapy, and
            assessment consultation in a safe and supportive environment.
          </p>
          <div className={`flex items-center flex-wrap gap-6 mt-9 ${riseBase} [animation-delay:0.45s]`}>
            <Link to="/book" className={btnSolidLg}>Book an Appointment</Link>
            <a
              href="#how"
              className="font-serif text-[15px] text-black/70 border-b border-transparent no-underline transition-[border-color,color] duration-[250ms] hover:text-black hover:border-current"
            >
              Learn how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const treeImgClass =
    "absolute bottom-0 right-0 w-full origin-bottom-right -translate-y-[30%] animate-[tf-sway_9s_ease-in-out_infinite_alternate] motion-reduce:animate-none";

  return (
    <section className={`${sectionClass} bg-tf-mint overflow-visible pt-[clamp(72px,9vw,110px)]`} id="how">
      <div className="absolute top-0 right-[-2%] w-[min(65vw,900px)] h-0 -z-[1] pointer-events-none max-[900px]:w-screen max-[900px]:right-[-10%] max-[900px]:-translate-y-[10%] max-[900px]:opacity-30">
        <Photo src="/img/tree.png" className={treeImgClass} fallback={<HeroArt className={treeImgClass} />} />
      </div>

      <LeafVine className="top-0 right-[-5%] w-[300px] h-[600px] -rotate-[15deg] opacity-80" />
      <div className={containerClass}>
        <Reveal>
          <SectionHead
            align="left"
            eyebrow="HOW IT WORKS"
            title="Four steps toward feeling better"
            sub="From your initial check-in to your first session, we prioritize clarity and your comfort."
          />
        </Reveal>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 mt-12 relative z-10 list-none m-0 p-0">
          {STEPS.map((s, i) => (
            <li key={s.title} className="m-0 p-0">
              <Reveal delay={i * 90} className="h-full">
                <article className="relative h-full bg-white rounded-2xl px-6 pt-10 pb-8 text-center flex flex-col items-center gap-4 border border-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-[350ms] ease-tf hover:-translate-y-[5px] hover:shadow-[0_18px_34px_-20px_rgba(32,62,67,0.45)]">
                  <span className="absolute top-4 left-4 w-[30px] h-[30px] rounded-full bg-tf-teal text-white text-sm grid place-items-center">
                    {i + 1}
                  </span>
                  <Icon name={s.icon} className="text-tf-teal mt-2 w-16 h-16 [stroke-width:1.5]" />
                  <h3 className="m-0 font-serif text-lg font-bold uppercase tracking-[0.04em] text-tf-ink">{s.title}</h3>
                  <p className="m-0 text-sm leading-[1.6] text-tf-body">{s.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className={`${sectionClass} bg-white`} id="services">
      <div className={containerClass}>
        <Reveal>
          <SectionHead
            align="center"
            eyebrow="OUR SERVICES"
            title="Comprehensive Mental Health Care"
            sub="Focused care tailored to your unique journey toward clarity and growth."
          />
        </Reveal>
        {SERVICES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal
              key={s.title}
              className={`group grid grid-cols-2 items-center gap-[clamp(40px,6vw,96px)] mt-[clamp(64px,8vw,120px)] max-[900px]:grid-cols-1`}
            >
              <div className={`relative grid place-items-center p-5 ${flip ? "order-2 max-[900px]:order-0" : ""}`}>
                <div className="absolute w-full aspect-[522/404] rounded-[210px_190px_240px_130px] bg-tf-soft transition-[border-radius,transform] duration-[1.2s] ease-tf group-hover:rounded-[130px_240px_190px_210px] group-hover:-rotate-2" />
                <Photo
                  src={`/img/${s.photo}`}
                  className="relative w-[95%] h-auto rounded-2xl object-cover"
                  alt={s.title}
                  fallback={
                    <Icon
                      name={s.icon}
                      size={120}
                      className="relative w-[32%] h-auto text-white transition-transform duration-[600ms] ease-tf group-hover:scale-[1.08] group-hover:-rotate-[3deg]"
                    />
                  }
                />
              </div>
              <div>
                <p className="m-0 flex items-center gap-3 text-[#6c7d82] font-medium text-[15px] uppercase tracking-[0.05em]">
                  <i className="block w-8 h-0.5 bg-tf-teal not-italic" />
                  {s.meta}
                </p>
                <h3 className="m-0 font-serif font-bold text-tf-ink text-[clamp(32px,3.8vw,46px)] leading-[1.12] my-4">
                  {s.title}
                </h3>
                <p className="m-0 text-tf-body leading-[1.7] text-base max-w-[480px] max-[900px]:max-w-none">
                  {s.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Team() {
  const [i, setI] = useState(0);
  const p = TEAM[i];
  return (
    <section className={`${sectionClass} bg-tf-mint`} id="about">
      <HeadIcon className="top-[10%] right-[5%] w-[250px] h-[250px] opacity-60" />
      <FloatingDots className="bottom-[10%] left-[5%] w-20 h-20" />
      <div className={containerClass}>
        <Reveal>
          <h2 className="m-0 font-serif text-[clamp(32px,3.8vw,42px)] font-normal text-tf-ink">
            The people <span className="text-tf-teal italic">behind</span> your care
          </h2>
          <p className="m-0 mt-3 text-lg max-w-[560px] leading-normal text-tf-body">
            Licensed, experienced professionals who will listen first and guide you at a pace that feels right.
          </p>
        </Reveal>

        <div className="grid grid-cols-[minmax(260px,440px)_1fr] gap-[clamp(40px,6vw,96px)] items-center mt-14 max-[900px]:grid-cols-1">
          <div className="group relative aspect-square w-full max-w-[380px] justify-self-center" aria-hidden="true">
            <div className="absolute inset-0 -translate-x-3 -translate-y-4 border border-[#6bbfaa] rounded-full transition-transform duration-[800ms] ease-tf group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-full rounded-full bg-[#aac6b7] overflow-hidden flex flex-col items-center gap-[11.7%]">
              <i className="block w-[32%] aspect-square mt-[28%] rounded-full bg-[#335b51]" />
              <i className="block w-[74%] h-[64%] rounded-full bg-[#26a38c]" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-3.5" role="tablist" aria-label="Team members">
              {TEAM.map((t, idx) => {
                const active = idx === i;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`flex items-center gap-3 py-3 pr-[26px] pl-4 rounded-[34px] border text-left cursor-pointer font-inherit transition-[background,color,border-color,transform] duration-300 ease-tf hover:-translate-y-0.5 max-[560px]:w-full ${
                      active
                        ? "bg-tf-teal border-tf-teal text-white"
                        : "bg-white border-black/15 text-[#202020] hover:border-tf-teal"
                    }`}
                    onClick={() => setI(idx)}
                  >
                    <ChipAvatar />
                    <span>
                      <b className="block font-normal text-[15px]">{t.name}</b>
                      <small className={`block text-[13px] ${active ? "opacity-80" : "opacity-65"}`}>{t.role}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-10 animate-[tf-fade-slide_0.55s_var(--ease-tf)] motion-reduce:animate-none"
              key={i}
            >
              <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">{p.role.toUpperCase()}</p>
              <h3 className="m-0 text-tf-teal font-normal text-[clamp(28px,3.4vw,36px)] my-2 font-serif">{p.name}</h3>
              <blockquote className="m-0 font-serif font-bold text-tf-ink text-[22px] leading-[1.3] max-w-[480px] border-l-[3px] border-tf-teal pl-4">
                {p.quote}
              </blockquote>
              <p className="m-0 my-6 max-w-[500px] text-base leading-[1.7] text-tf-body">{p.bio}</p>
              <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">WORKS WITH</p>
              <ul className="flex flex-wrap gap-2.5 mt-3 mb-0 mx-0 list-none p-0">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="font-serif font-bold text-xs text-[rgba(26,35,50,0.7)] bg-[rgba(74,155,142,0.15)] py-1.5 px-4 rounded-xl"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => (x + d + STORIES.length) % STORIES.length);
  const s = STORIES[i];
  return (
    <section className={`${sectionClass} bg-tf-mint`}>
      <div className={`${containerClass} max-w-[900px] text-center`}>
        <Reveal>
          <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">STORIES</p>
          <h2 className="m-0 text-tf-teal text-[clamp(24px,2.8vw,32px)] font-normal mt-2.5 font-serif">
            Words from people we've supported
          </h2>
        </Reveal>
        <figure
          className="m-0 mt-12 animate-[tf-fade-slide_0.6s_var(--ease-tf)] motion-reduce:animate-none flex flex-col items-center"
          key={i}
          aria-live="polite"
        >
          <blockquote className="m-0 font-serif font-bold text-tf-ink text-[clamp(24px,3.2vw,36px)] leading-[1.4] max-w-[800px]">
            “{s.text}”
          </blockquote>
          <figcaption className="flex items-center gap-3.5 mt-8">
            <ChipAvatar />
            <span>
              <b className="font-serif text-[17px] block font-bold">{s.who}</b>
              <small className="font-serif text-[13px] opacity-60">Client</small>
            </span>
          </figcaption>
        </figure>
        <div className="flex items-center justify-center gap-3.5 mt-10 text-[#7bb4ab] font-serif text-sm font-bold">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous story"
            className="w-9 h-9 rounded-full border-0 bg-[#99cbc2] text-white text-xl leading-none cursor-pointer transition-[background,transform] duration-[250ms] ease-tf hover:bg-tf-teal hover:scale-[1.08]"
          >
            ‹
          </button>
          <span>
            {i + 1} of {STORIES.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next story"
            className="w-9 h-9 rounded-full border-0 bg-[#99cbc2] text-white text-xl leading-none cursor-pointer transition-[background,transform] duration-[250ms] ease-tf hover:bg-tf-teal hover:scale-[1.08]"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className={`${sectionClass} bg-white`} id="faq">
      <LeafVine className="bottom-[-50px] left-[-20px] w-[200px] h-[400px] opacity-70" />
      <LeafVine className="top-[10%] right-[-20px] w-[200px] h-[400px] -scale-x-100 -rotate-[20deg] opacity-70" />
      <div className={`${containerClass} max-w-[820px]`}>
        <Reveal>
          <SectionHead align="center" eyebrow="FAQ" title="Frequently asked questions" />
        </Reveal>
        <div className="mt-10 grid gap-4">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={f.q}
                className={`rounded-xl bg-white border shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] transition-[border-color,background] duration-300 ${
                  isOpen ? "border-tf-teal" : "border-black/10"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${idx}`}
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 border-0 bg-transparent text-tf-ink text-[clamp(16px,2vw,18px)] font-serif font-bold text-left cursor-pointer"
                >
                  <span>{f.q}</span>
                  <i
                    aria-hidden="true"
                    className={`shrink-0 w-9 h-9 rounded-full not-italic text-[22px] grid place-items-center transition-[transform,background,color] duration-[400ms] ease-tf ${
                      isOpen ? "rotate-[135deg] bg-tf-teal text-white" : "bg-tf-soft text-tf-teal"
                    }`}
                  >
                    +
                  </i>
                </button>
                <div
                  id={`faq-${idx}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-[450ms] ease-tf ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 px-6 pb-6 text-tf-body leading-[1.7] text-base">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const inquiryInput =
  "w-full rounded-lg border border-black/14 bg-white px-3.5 py-3 font-serif text-[0.95rem] text-[#202020] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#666]/70 focus:border-tf-teal focus:shadow-[0_0_0_3px_rgba(74,155,142,0.15)]";

function ContactInquiry() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | success | error
  const [touched, setTouched] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "error") setStatus(null);
  };

  const fieldErrors = {
    name: form.name.trim().length < 2 ? "Name is required." : "",
    email: !form.email.includes("@") ? "Enter a valid email." : "",
    subject: form.subject.trim().length < 2 ? "Subject is required." : "",
    message: form.message.trim().length < 6 ? "Message must be at least a short sentence." : "",
  };
  const hasErrors = Object.values(fieldErrors).some(Boolean);

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTouched(false);
  };

  const contacts = [
    { label: "Email", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
    { label: "Phone", value: CLINIC.phone, href: `tel:${CLINIC.phone.replace(/\s/g, "")}` },
    {
      label: "Location",
      value: CLINIC.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`,
      external: true,
    },
    { label: "Facebook", value: CLINIC.facebookLabel, href: CLINIC.facebook, external: true },
  ];

  return (
    <section className={`${sectionClass} bg-tf-mint`} id="inquiry">
      <div className={containerClass}>
        <Reveal>
          <SectionHead
            align="center"
            eyebrow="GET IN TOUCH"
            title="Message the clinic"
            sub="Questions about services or booking? Send an inquiry and our team will respond during clinic hours."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 max-[900px]:grid-cols-1">
          <Reveal className="flex flex-col gap-5">
            {contacts.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-black/8 bg-white px-5 py-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)]"
              >
                <p className="m-0 text-[12px] font-bold tracking-[0.1em] text-tf-teal">{c.label.toUpperCase()}</p>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="mt-1 block font-serif text-lg text-tf-ink no-underline hover:text-tf-teal"
                >
                  {c.value}
                  {c.label === "Location" && (
                    <span className="mt-1 block text-sm font-sans font-medium text-tf-teal">
                      Open in Maps →
                    </span>
                  )}
                </a>
              </div>
            ))}
            <p className="m-0 text-sm text-tf-body">Clinic hours · {CLINIC.hours}</p>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={submit}
              className="rounded-2xl border border-black/8 bg-white p-7 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)] max-[560px]:p-5"
              noValidate
            >
              <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
                <label className="flex flex-col gap-1.5">
                  <span className="font-serif text-sm font-bold text-[#202020]">Your name</span>
                  <input
                    className={`${inquiryInput} ${touched && fieldErrors.name ? "border-red-400" : ""}`}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                    required
                  />
                  {touched && fieldErrors.name && (
                    <span className="text-xs text-red-600">{fieldErrors.name}</span>
                  )}
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-serif text-sm font-bold text-[#202020]">Email</span>
                  <input
                    type="email"
                    className={`${inquiryInput} ${touched && fieldErrors.email ? "border-red-400" : ""}`}
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@email.com"
                    required
                  />
                  {touched && fieldErrors.email && (
                    <span className="text-xs text-red-600">{fieldErrors.email}</span>
                  )}
                </label>
              </div>
              <label className="mt-4 flex flex-col gap-1.5">
                <span className="font-serif text-sm font-bold text-[#202020]">Subject</span>
                <input
                  className={`${inquiryInput} ${touched && fieldErrors.subject ? "border-red-400" : ""}`}
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="How can we help?"
                  required
                />
                {touched && fieldErrors.subject && (
                  <span className="text-xs text-red-600">{fieldErrors.subject}</span>
                )}
              </label>
              <label className="mt-4 flex flex-col gap-1.5">
                <span className="font-serif text-sm font-bold text-[#202020]">Message</span>
                <textarea
                  className={`${inquiryInput} min-h-[140px] resize-y ${touched && fieldErrors.message ? "border-red-400" : ""}`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Share a brief note about your inquiry…"
                  required
                />
                {touched && fieldErrors.message && (
                  <span className="text-xs text-red-600">{fieldErrors.message}</span>
                )}
              </label>

              {status === "success" && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-tf-teal/40 bg-tf-soft px-4 py-3 text-sm text-tf-ink"
                >
                  Thank you — your inquiry was sent. We will reply to your email shortly.
                </p>
              )}
              {status === "error" && touched && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  Please fix the highlighted fields before submitting.
                </p>
              )}

              <button type="submit" className={`${btnSolid} mt-5 w-full max-[560px]:w-full`}>
                Submit Inquiry
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans text-black bg-tf-bg overflow-x-hidden antialiased">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Team />
        <Stories />
        <FAQ />
        <ContactInquiry />
      </main>
      <Footer />
    </div>
  );
}
