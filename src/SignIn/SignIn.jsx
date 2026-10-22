import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer, Logo, Photo, btnSolid, btnGhost } from "../components/Layout";

const DEMO_USER = "admin";
const DEMO_PASS = "12345";

function EyeIcon({ off }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-black/14 bg-white px-3.5 py-3 font-serif text-sm outline-none focus:border-tf-teal focus:shadow-[0_0_0_3px_rgba(74,155,142,0.15)]";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/appointments";

  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [username, setUsername] = useState(() => localStorage.getItem("tf_user") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(() => !!localStorage.getItem("tf_user"));
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const fail = (msg) => {
    setError(msg);
    setInfo("");
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  };

  const submit = (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setInfo("");

    if (mode === "forgot") {
      if (!email.includes("@")) return fail("Enter a valid email address.");
      setInfo("If an account exists for that email, a reset link would be sent (demo only).");
      return;
    }

    if (mode === "signup") {
      if (!username.trim() || !email.includes("@") || password.length < 5) {
        return fail("Enter a username, valid email, and password (min 5 characters).");
      }
      if (password !== confirm) return fail("Passwords do not match.");
      setLoading(true);
      setTimeout(() => {
        sessionStorage.setItem("tf_auth", "1");
        localStorage.setItem("tf_user", username.trim());
        setLoading(false);
        navigate(from);
      }, 600);
      return;
    }

    if (!username.trim() || !password) return fail("Please enter your username and password.");
    setLoading(true);
    setTimeout(() => {
      const ok =
        username.trim().toLowerCase() === DEMO_USER && password === DEMO_PASS;
      if (!ok) {
        setLoading(false);
        return fail("Incorrect username or password. Demo: admin / 12345");
      }
      remember
        ? localStorage.setItem("tf_user", username.trim())
        : localStorage.removeItem("tf_user");
      sessionStorage.setItem("tf_auth", "1");
      setLoading(false);
      navigate(from);
    }, 700);
  };

  return (
    <div className="font-sans text-black bg-tf-bg min-h-screen overflow-x-hidden antialiased">
      <Navbar />
      <main className="relative py-14 pb-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <span className="absolute -left-20 top-10 size-64 rounded-full bg-tf-soft opacity-70" />
          <span className="absolute -right-16 bottom-20 size-72 rounded-full bg-[#d7eee8] opacity-60" />
        </div>

        <div className="relative z-10 mx-auto grid w-[min(1040px,calc(100%-40px))] grid-cols-2 gap-10 max-[900px]:grid-cols-1">
          <section className="flex flex-col justify-center max-[900px]:text-center">
            <div className="mb-6 flex items-center gap-3 max-[900px]:justify-center">
              <Photo
                src="/img/Threefold%20logo.png"
                alt="Threefold logo"
                className="h-[42px] w-[42px] shrink-0 object-contain"
                fallback={<Logo size={42} />}
              />
              <span>
                <strong className="block font-serif text-sm tracking-[0.04em] text-tf-forest">
                  THREEFOLD
                </strong>
                <small className="text-[10px] text-[#666]">
                  Behavioral Interventions And Psychological Services
                </small>
              </span>
            </div>
            <h1 className="m-0 font-serif text-[clamp(2rem,4vw,2.8rem)] font-normal leading-tight text-[#111]">
              Welcome back to <em className="italic text-tf-teal">Threefold</em>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#555] max-[900px]:mx-auto">
              Sign in to manage appointments, message your care team, and continue your wellness
              journey.
            </p>
            <ul className="mt-6 list-none space-y-2 p-0 text-sm text-tf-body max-[900px]:mx-auto max-[900px]:text-left">
              {[
                "View and manage your appointments",
                "Secure messaging with the clinic",
                "Track payment and consent status",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-tf-teal" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section
            className={[
              "rounded-2xl border border-black/10 bg-white p-8 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)] max-[560px]:p-5",
              shaking ? "animate-[tf-shake_0.45s_ease]" : "",
            ].join(" ")}
          >
            <div className="mb-6 flex gap-2 rounded-[11px] bg-tf-teal/15 p-1">
              {[
                ["signin", "Sign In"],
                ["signup", "Register"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`flex-1 rounded-lg border-0 py-2 font-serif text-sm cursor-pointer ${
                    mode === id || (mode === "forgot" && id === "signin")
                      ? "bg-white font-bold shadow-sm"
                      : "bg-transparent"
                  }`}
                  onClick={() => {
                    setMode(id);
                    setError("");
                    setInfo("");
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <h2 className="m-0 font-serif text-2xl text-[#202020]">
              {mode === "signup"
                ? "Create account"
                : mode === "forgot"
                  ? "Reset password"
                  : "Sign In"}
            </h2>
            <p className="mt-1 text-sm text-[#666]">
              {mode === "signup"
                ? "Register for the client demo (stored locally)."
                : mode === "forgot"
                  ? "Enter your email to receive reset instructions."
                  : "Demo credentials: admin / 12345"}
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={submit} noValidate>
              {mode !== "forgot" && (
                <label className="text-xs font-bold tracking-[0.08em] text-[#666]">
                  USERNAME
                  <input
                    className={inputClass}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    autoComplete="username"
                    placeholder="admin"
                  />
                </label>
              )}

              {(mode === "signup" || mode === "forgot") && (
                <label className="text-xs font-bold tracking-[0.08em] text-[#666]">
                  EMAIL
                  <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="email"
                    placeholder="you@email.com"
                  />
                </label>
              )}

              {mode !== "forgot" && (
                <label className="text-xs font-bold tracking-[0.08em] text-[#666]">
                  PASSWORD
                  <div className="relative mt-1.5">
                    <input
                      type={show ? "text" : "password"}
                      className={`${inputClass} !mt-0 pr-12`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[#666] cursor-pointer"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      <EyeIcon off={show} />
                    </button>
                  </div>
                </label>
              )}

              {mode === "signup" && (
                <label className="text-xs font-bold tracking-[0.08em] text-[#666]">
                  CONFIRM PASSWORD
                  <input
                    type={show ? "text" : "password"}
                    className={inputClass}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                </label>
              )}

              {mode === "signin" && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="size-4 accent-tf-teal"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-tf-teal underline cursor-pointer"
                    onClick={() => {
                      setMode("forgot");
                      setError("");
                      setInfo("");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {(error || info) && (
                <p
                  role="alert"
                  className={`m-0 rounded-lg px-4 py-3 text-sm ${
                    error
                      ? "border border-red-200 bg-red-50 text-red-800"
                      : "border border-tf-teal/30 bg-tf-soft text-tf-ink"
                  }`}
                >
                  {error || info}
                </p>
              )}

              <button type="submit" className={`${btnSolid} w-full`} disabled={loading}>
                {loading
                  ? "Please wait…"
                  : mode === "signup"
                    ? "Create account"
                    : mode === "forgot"
                      ? "Send reset link"
                      : "Sign in"}
              </button>
            </form>

            {mode === "forgot" && (
              <button
                type="button"
                className={`${btnGhost} mt-4 w-full`}
                onClick={() => setMode("signin")}
              >
                Back to Sign In
              </button>
            )}

            <p className="mt-6 text-center text-sm text-[#666]">
              New here?{" "}
              <Link to="/book" className="font-semibold text-tf-teal no-underline hover:underline">
                Book a session
              </Link>{" "}
              without an account, or register above.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
