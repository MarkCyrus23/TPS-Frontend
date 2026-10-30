import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo, Photo } from "../components/Layout";
import { logout } from "../auth";


const ITEMS = [
    { key: "dashboard", label: "Dashboard", href: "/affiliate", icon: "grid" },
    { key: "appointment", label: "Appointment", href: "/affiliate/appointment", icon: "calendar" },
    { key: "schedules", label: "Schedules", href: "/affiliate/schedules", icon: "clock" },
    { key: "payment", label: "Payment", href: "/affiliate/payment", icon: "wallet" },
];

const Icon = ({ name }) => {
    const common = {
        width: 17,
        height: 17,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "#1f6b55",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
    };
    switch (name) {
        case "calendar":
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            );
        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );
        case "wallet":
            return (
                <svg {...common}>
                    <path d="M3 7a2 2 0 0 1 2-2h13v4" />
                    <path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z" />
                    <circle cx="16.5" cy="14.5" r="1" fill="#1f6b55" />
                </svg>
            );
        default:
            return (
                <svg {...common} fill="#1f6b55" stroke="none">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" />
                    <rect x="13" y="3" width="8" height="8" rx="1.5" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" />
                    <rect x="13" y="13" width="8" height="8" rx="1.5" />
                </svg>
            );
    }
};

/**
 * Responsive na sidebar.
 *  - lg pataas: fixed sidebar sa kaliwa + spacer (kapareho ng dati)
 *  - mas maliit: nakatago (off-canvas); bubukas bilang drawer kapag `open` ang true
 *
 * Props (galing sa page na may hamburger button):
 *   open    - boolean, bukas ba ang drawer
 *   onClose - function, tinatawag kapag nag-click sa backdrop / link / X / Escape
 *
 * May sarili ring floating hamburger button ang component na ito. Lumalabas ito
 * kapag na-scroll na pababa ang page (nawala na sa screen ang hamburger sa header),
 * kaya laging abot ang menu. Hindi na kailangan ng dagdag na props mula sa page.
 */
export default function AffiliateNavigation({ open = false, onClose = () => { } }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // `open` galing sa page (hamburger sa header); `internalOpen` galing sa floating button
    const [internalOpen, setInternalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isOpen = open || internalOpen;

    const close = useCallback(() => {
        setInternalOpen(false);
        onClose();
    }, [onClose]);

    // Ipakita ang floating hamburger kapag lumampas na sa header ang scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 70);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        close();
        await logout();
        navigate("/signin", { replace: true });
    };

    // Isara ang drawer gamit ang Escape key
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, close]);

    const showFloating = scrolled && !isOpen;

    return (
        <>
            {/* Floating hamburger: lumalabas kapag na-scroll na ang page (mobile/tablet lang) */}
            <button
                type="button"
                onClick={() => setInternalOpen(true)}
                aria-label="Open menu"
                aria-hidden={!showFloating}
                tabIndex={showFloating ? 0 : -1}
                className={`fixed left-[16px] top-[12px] z-30 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#c7b6b6] bg-white text-[#2f4a42] shadow-md transition-opacity duration-200 motion-reduce:transition-none sm:left-[28px] lg:hidden ${showFloating ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Backdrop (mobile/tablet lang) */}
            <div
                onClick={close}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 motion-reduce:transition-none lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <aside
                aria-label="Main navigation"
                className={`fixed inset-y-0 left-0 z-50 flex w-[321px] max-w-[85vw] shrink-0 flex-col overflow-y-auto rounded-r-[50px] bg-[#1f4d3f] transition-transform duration-200 motion-reduce:transition-none lg:max-w-none lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close button (mobile/tablet lang) */}
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close menu"
                    className="absolute right-[18px] top-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#a8c8b8] hover:bg-white/10 hover:text-white lg:hidden"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                </button>

                {/* Brand header */}
                <div className="relative mt-[38px] shrink-0 px-[26px]">
                    <Link to="/" onClick={close} className="group flex items-center gap-[12px] no-underline" aria-label="Threefold Home">
                        <Photo
                            src="/img/Threefold%20logo.png"
                            alt="Threefold Logo"
                            className="h-[42px] w-[42px] shrink-0 object-contain transition-transform group-hover:scale-105"
                            fallback={<Logo size={42} />}
                        />
                        <div className="flex flex-col">
                            <span className="font-['Inria_Serif',Georgia,serif] text-[15px] font-bold leading-[16px] tracking-[0.05em] text-[#f2f7f4] transition-colors group-hover:text-white">
                                THREEFOLD
                            </span>
                            <span className="mt-[3px] max-w-[195px] font-['Inria_Serif',Georgia,serif] text-[8px] leading-[11px] text-[#a8c8b8]">
                                Behavioral Interventions And Psychological Services
                            </span>
                        </div>
                    </Link>
                </div>

                <span className="mt-[84px] block shrink-0 pl-[40px] text-[14px] font-bold uppercase tracking-[2.52px] text-[#a8c8b8]">
                    MENU
                </span>

                {/* Menu: bawat item may sariling slot, ang active ang nagiging white pill */}
                <nav className="ml-[26px] mt-[7px] flex shrink-0 flex-col gap-[16px]">
                    {ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.key}
                                to={item.href}
                                onClick={close}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex h-[56px] items-center rounded-l-[28px] ${isActive
                                        ? "gap-3 bg-white pl-[22px] text-[18px] font-bold text-[#1f6b55]"
                                        : "pl-[14px] text-[20px] font-semibold text-[#4a9b8e] hover:text-white"
                                    }`}
                            >
                                {isActive && <Icon name={item.icon} />}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout: laging nasa ilalim, pero hindi na tatakpan ang menu sa maiikling screen */}
                <div className="mt-auto shrink-0 pb-[60px] pl-[40px] pt-[32px]">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="cursor-pointer border-0 bg-transparent p-0 text-[20px] font-semibold text-[#4a9b8e] hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Spacer: nagre-reserve ng espasyo sa desktop lang */}
            <div className="hidden w-[321px] shrink-0 lg:block" aria-hidden="true" />
        </>
    );
}