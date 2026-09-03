"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", type = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Trigger bar fill for skills
            if (entry.target.classList.contains("skill-group-bars")) {
              entry.target.classList.add("bars-animated");
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass =
    type === "scale" ? "reveal-scale" :
    type === "stagger" ? "reveal-stagger" :
    "reveal-up";

  return (
    <div ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </div>
  );
}
