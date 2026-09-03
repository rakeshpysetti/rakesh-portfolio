"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_ITEMS = [
  {
    id: "hero",
    label: "Intro",
    num: "00",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: "about",
    label: "Global ML",
    num: "01",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    )
  },
  {
    id: "journey",
    label: "Experience",
    num: "02",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: "projects",
    label: "Work",
    num: "03",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    )
  },
  {
    id: "skills",
    label: "Skills Lab",
    num: "04",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    )
  },
  {
    id: "contact",
    label: "Contact",
    num: "05",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // Scroll Spy with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0.1 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* 1. Floating Top-Left Brand Logo & Name */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("hero");
        }}
        className={`floating-brand-chip ${scrolled ? "scrolled" : ""}`}
        aria-label="Back to top"
      >
        <span className="brand-logo-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="4" />
            <path d="M8 8h5a2.5 2.5 0 0 1 0 5H8V8z" />
            <path d="M8 13v3" />
            <path d="M13 13l3 3" />
          </svg>
        </span>
        <span className="brand-name">Rakesh Pysetti</span>
      </a>

      {/* 2. Right-Side Cybernetic Navigation Dock */}
      <nav className="right-nav-dock" aria-label="Quick page navigation">
        <div className="right-dock-track">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`right-dock-item ${isActive ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
                aria-label={`Jump to ${item.label}`}
              >
                {/* Hover / Active Flyout Label (appears to the left) */}
                <span className="dock-flyout-label">
                  <span className="flyout-num">{item.num}</span>
                  <span className="flyout-text">{item.label}</span>
                </span>

                {/* Dock Button Icon & Active Indicator */}
                <span className="dock-icon-wrap">
                  <span className="dock-icon">{item.icon}</span>
                  <span className="dock-pip"></span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
