import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Footer,
  Reveal,
  Photo,
  container,
  btnGhost,
  btnSolid,
} from "../components/Layout";
import { CLINIC } from "../data/clinic";

const CONTACTS = [
  {
    id: "clinic",
    name: "Threefold Clinic",
    role: "Front Desk · Online",
    avatar: "/img/threefold-logo-10.png",
  },
  {
    id: "maria",
    name: "Dr. Maria Santos",
    role: "Clinical Psychologist · Online now",
    avatar: "/img/cartoon-female-psychologist-portrait-2.png",
  },
  {
    id: "juan",
    name: "Dr. Juan Dela Cruz",
    role: "Psychotherapist · Offline",
    avatar: "/img/cartoon-male-psychologist.png",
  },
];

const INITIAL_THREADS = {
  clinic: [
    {
      id: 1,
      sender: "doctor",
      text: "Hello! How can the clinic help you today?",
      time: "9:00 AM",
    },
  ],
  maria: [
    {
      id: 1,
      sender: "doctor",
      text: "Hi Client, thanks for booking. I'm looking forward to our session.",
      time: "9:00 AM",
    },
    {
      id: 2,
      sender: "system",
      text: "Next session · Fri, Oct 16 · 10:00 AM · Format TBD by psychologist",
      time: "9:05 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Thank you so much!",
      time: "6:00 PM",
    },
  ],
  juan: [],
};

const avatarWrap = "size-11 shrink-0 overflow-hidden rounded-full bg-[#aac6b7]";
const avatarWrapLg = "size-14 shrink-0 overflow-hidden rounded-full bg-[#aac6b7]";
const avatarImg = "size-full object-cover";
const inquiryInput =
  "w-full rounded-lg border border-black/14 bg-white px-3.5 py-2.5 font-serif text-sm outline-none focus:border-tf-teal";

function AvatarFallback() {
  return <div className="size-full bg-[#aac6b7]" aria-hidden="true" />;
}

function nowLabel() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function Contact() {
  const [activeChat, setActiveChat] = useState("maria");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [message, setMessage] = useState("");
  const [sendError, setSendError] = useState("");
  const [inquiry, setInquiry] = useState({ name: "", email: "", subject: "", message: "" });
  const [inquiryStatus, setInquiryStatus] = useState(null);

  const active = CONTACTS.find((c) => c.id === activeChat) || CONTACTS[0];
  const history = threads[activeChat] || [];

  const sidebarPreview = useMemo(() => {
    const map = {};
    for (const c of CONTACTS) {
      const msgs = threads[c.id] || [];
      const last = msgs[msgs.length - 1];
      map[c.id] = last
        ? `${last.sender === "user" ? "You: " : ""}${last.text}`
        : "No messages yet";
    }
    return map;
  }, [threads]);

  const handleSend = (e) => {
    e.preventDefault();
    setSendError("");
    if (!message.trim()) {
      setSendError("Type a message before sending.");
      return;
    }
    const text = message.trim();
    setThreads((prev) => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []),
        { id: Date.now(), sender: "user", text, time: nowLabel() },
      ],
    }));
    setMessage("");
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    const ok =
      inquiry.name.trim().length > 1 &&
      inquiry.email.includes("@") &&
      inquiry.subject.trim().length > 1 &&
      inquiry.message.trim().length > 5;
    if (!ok) {
      setInquiryStatus("error");
      return;
    }
    setInquiryStatus("success");
    setInquiry({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="font-sans text-[#202020]">
      <Navbar />
      <main className="bg-white py-12 pb-24">
        <div className={container}>
          <Reveal>
            <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-tf-teal">CONTACT</p>
            <h1 className="mb-3 mt-2 font-serif text-[2.5rem] text-[#111]">
              We&apos;re <em className="italic text-tf-teal">here to listen.</em>
            </h1>
            <p className="m-0 mb-8 max-w-xl text-[#666]">
              Message the clinic or your psychologist, or send a new inquiry below.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-10 grid grid-cols-2 gap-4 max-[720px]:grid-cols-1 sm:grid-cols-4">
              {[
                { label: "Email", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
                {
                  label: "Phone",
                  value: CLINIC.phone,
                  href: `tel:${CLINIC.phone.replace(/\s/g, "")}`,
                },
                {
                  label: "Location",
                  value: CLINIC.address,
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`,
                },
                { label: "Facebook", value: CLINIC.facebookLabel, href: CLINIC.facebook },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-2xl border border-black/10 bg-tf-mint p-4 no-underline transition-colors hover:border-tf-teal"
                >
                  <p className="m-0 text-[11px] font-bold tracking-[0.1em] text-tf-teal">
                    {c.label.toUpperCase()}
                  </p>
                  <p className="m-0 mt-1 font-serif text-sm text-tf-ink">{c.value}</p>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid h-auto min-h-[600px] grid-cols-1 overflow-hidden rounded-[18px] border border-black/28 bg-[linear-gradient(107deg,#eafdeb_0%,#ffffff_14%)] max-[900px]:min-h-[600px] min-[901px]:h-[720px] min-[901px]:grid-cols-[320px_1fr]">
              <aside className="flex max-h-[300px] flex-col border-b border-[#e5e5e5] bg-white/60 min-[901px]:max-h-none min-[901px]:border-b-0 min-[901px]:border-r">
                <div className="border-b border-[#e5e5e5] p-6">
                  <h2 className="mb-0 mt-0 font-serif text-[1.6rem] text-[#222b28]">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {CONTACTS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setActiveChat(c.id);
                        setSendError("");
                      }}
                      className={`flex w-full cursor-pointer items-center gap-3 border-0 border-b border-[#e5e5e5] px-6 py-4 text-left ${
                        activeChat === c.id ? "bg-white" : "bg-transparent hover:bg-white"
                      }`}
                    >
                      <div className={avatarWrap}>
                        <Photo
                          src={c.avatar}
                          alt={c.name}
                          className={avatarImg}
                          fallback={<AvatarFallback />}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="block font-serif text-[0.95rem]">{c.name}</strong>
                        <p className="m-0 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-[0.8rem] text-[#666]">
                          {sidebarPreview[c.id]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              <section className="flex h-[600px] flex-col bg-white min-[901px]:h-auto">
                <header className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={avatarWrapLg}>
                      <Photo
                        src={active.avatar}
                        className={avatarImg}
                        fallback={<AvatarFallback />}
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 mt-0 font-serif text-[1.1rem]">{active.name}</h3>
                      <p className="m-0 text-[0.8rem] text-[#666]">{active.role}</p>
                    </div>
                  </div>
                  <Link to="/appointments" className={`${btnGhost} no-underline`}>
                    My appointments
                  </Link>
                </header>

                <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#fafafa] p-6">
                  {history.length === 0 ? (
                    <div className="m-auto max-w-sm rounded-2xl border border-dashed border-[#b6d2c4] bg-white px-6 py-10 text-center">
                      <p className="m-0 font-serif text-base text-[#3d5c52]">No messages yet</p>
                      <p className="m-0 mt-2 text-sm text-[#666]">
                        Say hello to start the conversation with {active.name}.
                      </p>
                    </div>
                  ) : (
                    history.map((msg) => {
                      if (msg.sender === "system") {
                        return (
                          <div key={msg.id} className="my-2 flex justify-center">
                            <div className="max-w-[80%] rounded-xl border border-[#14a48c]/20 bg-[#14a48c]/11 px-5 py-3 text-center">
                              <p className="m-0 font-serif text-[0.85rem] font-bold">{msg.text}</p>
                            </div>
                          </div>
                        );
                      }
                      const isUser = msg.sender === "user";
                      return (
                        <div
                          key={msg.id}
                          className={`flex max-w-[75%] items-end gap-3 ${
                            isUser ? "ml-auto flex-row-reverse" : ""
                          }`}
                        >
                          {!isUser && (
                            <div className={avatarWrap}>
                              <Photo
                                src={active.avatar}
                                className={avatarImg}
                                fallback={<AvatarFallback />}
                              />
                            </div>
                          )}
                          <div
                            className={`px-4 py-3 ${
                              isUser
                                ? "rounded-[16px_16px_4px_16px] bg-tf-teal text-white"
                                : "rounded-[16px_16px_16px_4px] border border-black/10 bg-white"
                            }`}
                          >
                            <p className="mb-1.5 mt-0 text-[0.9rem] leading-[1.4]">{msg.text}</p>
                            <span className={`text-[0.65rem] ${isUser ? "opacity-80" : "opacity-60"}`}>
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form className="border-t border-[#e5e5e5] px-6 py-4" onSubmit={handleSend}>
                  {sendError && (
                    <p role="alert" className="mb-2 text-sm text-red-700">
                      {sendError}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setSendError("");
                      }}
                      className="flex-1 rounded-xl border border-[#666]/35 px-5 py-3 font-serif outline-none focus:border-tf-teal"
                    />
                    <button
                      type="submit"
                      className="cursor-pointer rounded-xl border-0 bg-tf-navy px-6 font-serif font-bold text-white"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <section className="mt-14 rounded-2xl border border-black/10 bg-tf-mint p-7 max-[560px]:p-5">
              <h2 className="m-0 font-serif text-2xl text-tf-ink">Clinic inquiry form</h2>
              <p className="m-0 mt-2 text-sm text-[#666]">
                Prefer email? Send a structured inquiry and we will reply during clinic hours (
                {CLINIC.hours}).
              </p>
              <form className="mt-6 grid gap-4" onSubmit={submitInquiry} noValidate>
                <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
                  <label className="text-sm font-bold">
                    Name
                    <input
                      className={`${inquiryInput} mt-1.5`}
                      value={inquiry.name}
                      onChange={(e) => setInquiry((f) => ({ ...f, name: e.target.value }))}
                    />
                  </label>
                  <label className="text-sm font-bold">
                    Email
                    <input
                      type="email"
                      className={`${inquiryInput} mt-1.5`}
                      value={inquiry.email}
                      onChange={(e) => setInquiry((f) => ({ ...f, email: e.target.value }))}
                    />
                  </label>
                </div>
                <label className="text-sm font-bold">
                  Subject
                  <input
                    className={`${inquiryInput} mt-1.5`}
                    value={inquiry.subject}
                    onChange={(e) => setInquiry((f) => ({ ...f, subject: e.target.value }))}
                  />
                </label>
                <label className="text-sm font-bold">
                  Message
                  <textarea
                    className={`${inquiryInput} mt-1.5 min-h-[120px] resize-y`}
                    value={inquiry.message}
                    onChange={(e) => setInquiry((f) => ({ ...f, message: e.target.value }))}
                  />
                </label>
                {inquiryStatus === "success" && (
                  <p className="m-0 rounded-lg border border-tf-teal/40 bg-white px-4 py-3 text-sm">
                    Inquiry sent. We will reply to your email shortly.
                  </p>
                )}
                {inquiryStatus === "error" && (
                  <p role="alert" className="m-0 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Please complete all fields with a valid email and message.
                  </p>
                )}
                <button type="submit" className={`${btnSolid} w-fit`}>
                  Submit Inquiry
                </button>
              </form>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
