import React from "react";

const LINKS = [
    { label: "Appointment", href: "#appointment" },
    { label: "Schedules", href: "#schedules" },
    { label: "Payment", href: "#payment" },
];

export default function AffiliateNavigation() {
    return (
        <aside className="sticky top-0 h-[923px] w-[321px] shrink-0 self-start overflow-hidden rounded-r-[50px] bg-[#1f4d3f]">
            {/* Brand header */}
            <div className="absolute left-[15px] top-[43px] flex items-center gap-3">
                <img
                    src="img/threefold-logo-6.png"
                    alt="Threefold Logo"
                    className="h-[66px] w-[70px] object-cover"
                />
                <div>
                    <h1 className="font-serif text-[20px] leading-[20px] text-[#3d865b]">THREEFOLD</h1>
                    <p className="whitespace-nowrap font-serif text-[15px] leading-[15px] text-[#3d865b]">
                        Behavioral Interventions And Psychological Services
                    </p>
                </div>
            </div>

            <span className="absolute left-[40px] top-[164px] block text-[14px] font-bold uppercase tracking-[2.52px] text-[#a8c8b8]">
                MENU
            </span>

            {/* Active item: white pill that runs flush to the right edge */}
            <a
                href="#dashboard"
                aria-current="page"
                className="absolute left-[26px] right-0 top-[192px] flex h-[56px] items-center gap-3 rounded-l-[28px] bg-white pl-[22px]"
            >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#1f6b55" aria-hidden="true">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" />
                    <rect x="13" y="3" width="8" height="8" rx="1.5" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" />
                    <rect x="13" y="13" width="8" height="8" rx="1.5" />
                </svg>
                <span className="text-[18px] font-bold text-[#1f6b55]">Dashboard</span>
            </a>

            {/* Other links */}
            <nav className="absolute left-[40px] top-[288px] flex flex-col gap-[44px] text-[20px] font-semibold text-[#4a9b8e]">
                {LINKS.map((l) => (
                    <a key={l.label} href={l.href} className="hover:text-white">
                        {l.label}
                    </a>
                ))}
            </nav>

            <a
                href="#logout"
                className="absolute bottom-[60px] left-[40px] text-[20px] font-semibold text-[#4a9b8e] hover:text-white"
            >
                Logout
            </a>
        </aside>
    );
}