import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const tabs = [
  { id: "hotels", name: "HOTELS", icon: hotelIcon },
  { id: "car-rentals", name: "CAR RENTALS", icon: carIcon },
  { id: "flights", name: "FLIGHTS", icon: flightIcon },
  { id: "trips", name: "TRIPS", icon: tripIcon },
  { id: "cruises", name: "CRUISES", icon: cruiseIcon },
  { id: "activities", name: "ACTIVITIES", icon: activityIcon },
];

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("hotels");
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabRefs.current[index];
    if (!el) return;

    gsap.to(indicatorRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.6,
      ease: "power4.out",
    });
  }, [activeTab]);

  const magnet = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.28,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const resetMagnet = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <section className="relative py-12">
      {/* CINEMATIC MOVING GRADIENT BG */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-[length:400%_400%] bg-gradient-to-br from-[#020617] via-[#050d1f] to-[#090020]" />

      {/* GLOW ORBS */}
      <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-indigo-500/20 blur-[120px] rounded-full animate-floatSlow" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[360px] h-[360px] bg-purple-600/20 blur-[140px] rounded-full animate-floatSlow delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.18)] overflow-hidden">

          {/* NEON SLIDING INDICATOR */}
          <span
            ref={indicatorRef}
            className="absolute top-1 bottom-1 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-[0_0_45px_rgba(99,102,241,0.85)]"
          />

          {/* TABS */}
          <div className="relative z-10 flex flex-wrap md:flex-nowrap">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(tab.id)}
                onMouseMove={magnet}
                onMouseLeave={resetMagnet}
                className={`
                  flex-1 flex flex-col sm:flex-row items-center justify-center gap-2
                  px-4 py-4 sm:py-5 text-xs sm:text-sm font-semibold
                  tracking-widest transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? "text-white scale-110"
                      : "text-white/60 hover:text-white hover:scale-105"
                  }
                `}
              >
                <span className="text-xl">{tab.icon()}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ICONS ---------------- */

function hotelIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
    </svg>
  );
}

function carIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8h2v-1h14v1h2v-8z"/>
    </svg>
  );
}

function flightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
    </svg>
  );
}

function tripIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-3V4H7v2H4v13h16z"/>
    </svg>
  );
}

function cruiseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.95 19H20.05l1.9-6.7L12 8l-9.95 3.3z"/>
    </svg>
  );
}

function activityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.49 5.48a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  );
}
