"use client";

import { useEffect, useState } from "react";

const ROLES = [
  { text: "AI/ML Engineer", color: "#F0883E", grad: "linear-gradient(135deg, #FFB066 0%, #F0883E 100%)" },
  { text: "Gen AI Engineer", color: "#58A6FF", grad: "linear-gradient(135deg, #79C0FF 0%, #58A6FF 100%)" },
  { text: "Data Scientist", color: "#3FB950", grad: "linear-gradient(135deg, #7EE787 0%, #3FB950 100%)" },
  { text: "Python Developer", color: "#A371F7", grad: "linear-gradient(135deg, #D2A8FF 0%, #A371F7 100%)" }
];

export default function HeroRoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex].text;
    let timer;

    if (!isDeleting && displayText.length < currentRole.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 85);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      // Backspacing
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 45);
    } else if (isDeleting && displayText.length === 0) {
      // Transition to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const activeRole = ROLES[roleIndex];

  return (
    <div className="cyber-typewriter-container">
      <span className="cyber-prompt-symbol">&gt;</span>
      <span
        className="cyber-typewriter-text"
        style={{
          "--role-gradient": activeRole.grad
        }}
      >
        {displayText}
      </span>
      <span
        className="cyber-terminal-cursor"
        style={{ color: activeRole.color, textShadow: `0 0 10px ${activeRole.color}` }}
      >
        ▎
      </span>
    </div>
  );
}
