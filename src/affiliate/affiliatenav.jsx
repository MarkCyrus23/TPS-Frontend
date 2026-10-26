import React from "react";
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

export default function AffiliateNavigation() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/signin", { replace: true });
    };

    return (
        <>
            <aside className="fixed left-0 top-0 z-50 h-screen w-[321px] shrink-0 overflow-y-auto rounded-r-[50px] bg-[#1f4d3f]">
                {/* Brand header */}
                <div className="relative mt-[38px] px-[26px]">
                    <Link to="/" className="group flex items-center gap-[12px] no-underline" aria-label="Threefold Home">
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

                <span className="absolute left-[40px] top-[164px] block text-[14px] font-bold uppercase tracking-[2.52px] text-[#a8c8b8]">
                    MENU
                </span>

                {/* Menu: bawat item may sariling slot, ang active ang nagiging white pill */}
                <nav className="absolute left-[26px] right-0 top-[192px] flex flex-col gap-[16px]">
                    {ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.key}
                                to={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex h-[56px] items-center rounded-l-[28px] pl-[14px] ${isActive
                                        ? "gap-3 bg-white pl-[22px] text-[18px] font-bold text-[#1f6b55]"
                                        : "text-[20px] font-semibold text-[#4a9b8e] hover:text-white"
                                    }`}
                            >
                                {isActive && <Icon name={item.icon} />}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="absolute bottom-[60px] left-[40px] cursor-pointer border-0 bg-transparent p-0 text-[20px] font-semibold text-[#4a9b8e] hover:text-white"
                >
                    Logout
                </button>
            </aside>
            <div className="w-[321px] shrink-0" aria-hidden="true" />
        </>
    );
}