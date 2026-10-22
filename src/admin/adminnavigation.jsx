import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo, Photo } from "../components/Layout";

const inter = "font-['Inter',Helvetica,sans-serif]";
const serif = "font-['Inria_Serif',Georgia,serif]";
const inknut = "font-['Inknut_Antiqua',Georgia,serif]";

const NAV_ITEMS = [
    { label: "Dashboard", to: "/admin" },
    { label: "Appointment", to: "/admin/appointment" },
    { label: "Schedules", to: "/admin/schedule" },
    { label: "Services", to: "/services" },
    { label: "Payment", to: "/admin/payment" },
    { label: "Backup and Restore", to: "/admin/backup" },
];

const GridIcon = ({ className = "" }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.2" />
        <rect x="12" y="2" width="6" height="6" rx="1.2" />
        <rect x="2" y="12" width="6" height="6" rx="1.2" />
        <rect x="12" y="12" width="6" height="6" rx="1.2" />
    </svg>
);

const isActiveRoute = (pathname, to) => {
    if (to === "/admin/payment") {
        return pathname === to || pathname === "/admin/payment-method";
    }
    return pathname === to;
};

export default function AdminNavigation() {
    const { pathname } = useLocation();

    return (
        <>
            <aside className="fixed left-0 top-0 z-50 flex h-screen w-[321px] shrink-0 flex-col overflow-y-auto rounded-tr-[64px] rounded-br-[64px] rounded-bl-[32px] bg-[#1f4d3f]">
            <div className="relative mt-[38px] px-[26px]">
                <Link to="/" className="group flex items-center gap-[12px] no-underline" aria-label="Threefold Home">
                    <Photo
                        src="/img/Threefold%20logo.png"
                        className="h-[42px] w-[42px] shrink-0 object-contain transition-transform group-hover:scale-105"
                        fallback={<Logo size={42} />}
                    />
                    <div className="flex flex-col">
                        <span className={`${serif} text-[15px] font-bold tracking-[0.05em] leading-[16px] text-[#f2f7f4] transition-colors group-hover:text-white`}>
                            THREEFOLD
                        </span>
                        <span className={`${serif} mt-[3px] max-w-[195px] text-[8px] leading-[11px] text-[#a8c8b8]`}>
                            Behavioral Interventions And Psychological Services
                        </span>
                    </div>
                </Link>
            </div>

            <div className={`${inter} mt-[44px] px-[40px] text-[14px] font-bold tracking-[2.52px] text-[#a8c8b8]`}>
                MENU
            </div>

            <nav aria-label="Admin navigation" className="mt-[16px] flex flex-col gap-[14px]">
                {NAV_ITEMS.map(({ label, to }) => {
                    const active = isActiveRoute(pathname, to);
                    const dashboard = label === "Dashboard";

                    return (
                        <Link
                            key={label}
                            to={to}
                            aria-current={active ? "page" : undefined}
                            className={active
                                ? "ml-[26px] flex h-[52px] items-center gap-[14px] rounded-l-[26px] bg-white pl-[23px] no-underline"
                                : `${inknut} flex h-[52px] items-center gap-[14px] px-[40px] text-[20px] font-semibold text-[#2a8570] no-underline transition-colors hover:text-[#4fbfa5]`
                            }
                        >
                            {dashboard && (
                                <GridIcon className={active ? "text-[#1f6b55]" : "text-[#2a8570]"} />
                            )}
                            <span className={active
                                ? `${inter} text-[18px] font-bold text-[#1f6b55]`
                                : ""
                            }>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <a
                href="#"
                className={`${inknut} mt-auto mb-[64px] px-[38px] text-[20px] font-semibold text-[#2a8570] transition-colors hover:text-[#4fbfa5]`}
            >
                Logout
            </a>
            </aside>
            <div className="w-[321px] shrink-0" aria-hidden="true" />
        </>
    );
}