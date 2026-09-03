"use client";

import { useState } from "react";

export default function MinimalContact() {
  const [copied, setCopied] = useState(false);
  const email = "rpysetti44@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="minimal-contact-card">
      {/* 1. Live Availability Indicator */}
      <div className="contact-status-badge">
        <span className="contact-status-dot"></span>
        <span>CURRENT STATUS &bull; OPEN TO AI/ML & GENAI ROLES &bull; USA</span>
      </div>

      {/* 2. Bold Editorial Headline */}
      <h2 className="minimal-contact-title">
        Let&apos;s build intelligence that lasts.
      </h2>
      <p className="minimal-contact-subtext">
        Ready to architect production-grade ML pipelines, deterministic GenAI workflows, or scalable cloud infrastructure where accuracy and reliability are non-negotiable.
      </p>

      {/* 3. Hero Email Action Bar */}
      <div className="contact-action-bar">
        <a href={`mailto:${email}`} className="contact-primary-email">
          <span className="email-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <span className="email-text">{email}</span>
        </a>
        <button
          type="button"
          className={`contact-copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy email address"
        >
          {copied ? (
            <>
              <span>✓</span> Copied to Clipboard
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* 4. Minimal Connect Channels Grid */}
      <div className="contact-channels-grid">
        <a
          href="https://www.linkedin.com/in/rakesh-ps"
          target="_blank"
          rel="noopener noreferrer"
          className="channel-item"
        >
          <span className="channel-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z" />
            </svg>
          </span>
          <span className="channel-name">LinkedIn</span>
          <span className="channel-arrow">↗</span>
        </a>

        <a href="tel:+12602671286" className="channel-item">
          <span className="channel-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68a2 2 0 0 1 1.72 2.03Z" />
            </svg>
          </span>
          <span className="channel-name">+1 (260) 267-1286</span>
          <span className="channel-arrow">➔</span>
        </a>

        <div className="channel-item location">
          <span className="channel-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="channel-name">United States &bull; Remote / Relocation</span>
        </div>
      </div>
    </div>
  );
}
