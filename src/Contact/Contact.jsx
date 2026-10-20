import { useState } from "react";
import { Navbar, Footer, Reveal, Photo } from "../components/Layout";
import "./Contact.css";

const CONTACTS = [
  {
    id: "clinic",
    name: "Threefold Clinic",
    role: "Front Desk · Online",
    lastMessage: "You: Thank you so much!",
    time: "6:00 PM",
    avatar: "/img/threefold-logo-10.png",
    active: false,
  },
  {
    id: "maria",
    name: "Dr. Maria Santos",
    role: "Clinical Psychologist · Online now",
    lastMessage: "You: Thank you, Doc. I'll...",
    time: "6:00 PM",
    avatar: "/img/cartoon-female-psychologist-portrait-2.png",
    active: true,
  },
  {
    id: "juan",
    name: "Dr. Juan Dela Cruz",
    role: "Psychotherapist · Offline",
    lastMessage: "You: Thank you, Doc. I'll...",
    time: "6:00 PM",
    avatar: "/img/cartoon-female-psychologist-portrait-4.png",
    active: false,
  },
];

const CHAT_HISTORY = [
  {
    id: 1,
    sender: "doctor",
    text: "Hi Client, thanks for booking. I'm looking forward to our session.",
    time: "9:00 AM",
  },
  {
    id: 2,
    sender: "system",
    text: "Next session · Fri, Oct 16 · 10:00 AM · Online",
    time: "9:05 AM",
  },
  {
    id: 3,
    sender: "user",
    text: "Thank you so much!",
    time: "6:00 PM",
  },
];

function AvatarFallback() {
  return (
    <div className="ct-avatar-fallback" aria-hidden="true">
      <span />
    </div>
  );
}

export default function Contact() {
  const [activeChat, setActiveChat] = useState("maria");
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="tf">
      <Navbar />
      <main className="ct">
        <div className="container">
          <Reveal>
            <p className="eyebrow">CONTACT</p>
            <h1 className="ct-title">
              We're <em>here to listen.</em>
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <div className="ct-layout">
              {/* Sidebar - Message List */}
              <aside className="ct-sidebar">
                <div className="ct-sidebar__head">
                  <h2>Messages</h2>
                  <div className="ct-search">
                    <input type="text" placeholder="Search People" />
                  </div>
                </div>

                <div className="ct-list">
                  {CONTACTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChat(c.id)}
                      className={`ct-contact ${activeChat === c.id ? "is-active" : ""}`}
                    >
                      <div className="ct-contact__avatar">
                        <Photo src={c.avatar} alt={c.name} className="ct-avatar-img" fallback={<AvatarFallback />} />
                      </div>
                      <div className="ct-contact__info">
                        <div className="ct-contact__top">
                          <strong>{c.name}</strong>
                          <small>{c.time}</small>
                        </div>
                        <div className="ct-contact__bottom">
                          <p>{c.lastMessage}</p>
                          {c.active && <span className="ct-dot" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Main Chat Area */}
              <section className="ct-chat">
                <header className="ct-chat__head">
                  <div className="ct-chat__profile">
                    <div className="ct-contact__avatar ct-contact__avatar--lg">
                      <Photo src="/img/cartoon-female-psychologist-portrait-2.png" className="ct-avatar-img" fallback={<AvatarFallback />} />
                    </div>
                    <div>
                      <h3>Dr. Maria Santos</h3>
                      <p>Clinical Psychologist · Online now</p>
                    </div>
                  </div>
                  <button className="btn btn--ghost">View Profile</button>
                </header>

                <div className="ct-chat__history">
                  <div className="ct-date-sep">MONDAY OCT 15</div>
                  
                  {CHAT_HISTORY.map((msg) => {
                    if (msg.sender === "system") {
                      return (
                        <div key={msg.id} className="ct-system-msg">
                          <div className="ct-system-msg__box">
                            <span className="ct-system-msg__badge">Next session</span>
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      );
                    }
                    const isUser = msg.sender === "user";
                    return (
                      <div key={msg.id} className={`ct-bubble-row ${isUser ? "is-user" : ""}`}>
                        {!isUser && (
                          <div className="ct-contact__avatar">
                            <Photo src="/img/cartoon-female-psychologist-portrait-2.png" className="ct-avatar-img" fallback={<AvatarFallback />} />
                          </div>
                        )}
                        <div className={`ct-bubble ${isUser ? "ct-bubble--user" : ""}`}>
                          <p>{msg.text}</p>
                          <span>{msg.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form className="ct-chat__input" onSubmit={handleSend}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" className="ct-send-btn">Send</button>
                </form>
              </section>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}