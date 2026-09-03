"use client";

import { useEffect, useRef, useState } from "react";

// Canvas Component for Project 01: Financial Risk Simulation
function RiskCanvas({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 500;
    let H = 340;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        W = rect.width;
        H = rect.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resize();

    let t = 0;

    function render() {
      ctx.clearRect(0, 0, W, H);
      t += 0.025;

      const pCol = "#F0883E";
      const pGlow = "rgba(240, 136, 62,";

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const cx = W * 0.5;
      const baseline = H - 48;

      // Baseline time axis
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, baseline);
      ctx.lineTo(W - 24, baseline);
      ctx.stroke();

      // 3 Layered Risk Distribution Curves
      const maxPeak = Math.min(H * 0.52, 130);
      for (let k = 0; k < 3; k++) {
        const spread = Math.min(W * 0.16, 80) + k * 28;
        const peak = maxPeak - k * 24 + Math.sin(t * 1.5 + k) * 10;
        const shift = Math.sin(t * 0.8 + k * 1.2) * 18;

        ctx.beginPath();
        ctx.moveTo(24, baseline);
        for (let x = 24; x <= W - 24; x += 4) {
          const dx = (x - (cx + shift)) / spread;
          const y = baseline - Math.exp(-dx * dx) * peak;
          ctx.lineTo(x, y);
        }

        const fillGrad = ctx.createLinearGradient(0, baseline - peak, 0, baseline);
        fillGrad.addColorStop(0, `${pGlow}${0.24 - k * 0.07})`);
        fillGrad.addColorStop(1, `${pGlow}0)`);
        ctx.fillStyle = fillGrad;
        ctx.fill();

        ctx.strokeStyle = k === 0 ? pCol : `${pGlow}0.45)`;
        ctx.lineWidth = k === 0 ? 2 : 1;
        ctx.stroke();
      }

      // Radar Scan Line
      const scanX = 24 + ((t * 80) % (W - 48));
      ctx.strokeStyle = `${pGlow}0.6)`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(scanX, 24);
      ctx.lineTo(scanX, baseline);
      ctx.stroke();
      ctx.setLineDash([]);

      // Anomaly Marker
      const anomX = cx + Math.min(W * 0.1, 45);
      const anomY = baseline - maxPeak * 0.65;
      const pulseR = ((t * 20) % 22) + 3;
      ctx.strokeStyle = "#FF5555";
      ctx.beginPath();
      ctx.arc(anomX, anomY, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#FF5555";
      ctx.beginPath();
      ctx.arc(anomX, anomY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "9px monospace";
      ctx.fillStyle = "#FFAAAA";
      ctx.fillText("ANOMALY RESOLVED [0.01%]", anomX + 8, anomY - 6);

      // HUD Label
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.textAlign = "right";
      ctx.fillText("MONTE CARLO RISK SIMULATION [ONLINE]", W - 18, 22);

      animId = requestAnimationFrame(render);
    }

    render();

    // Re-check size on mount and resize
    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    // If active state changed, re-measure after animation settles
    const timer = setTimeout(resize, 80);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="scroll-stage-canvas" />;
}

// Canvas Component for Project 02: Neural RAG Simulation
function RagCanvas({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 500;
    let H = 340;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        W = rect.width;
        H = rect.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resize();

    let t = 0;
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * W,
        y: H * 0.5 + (Math.random() - 0.5) * 20,
        speed: 1.5 + Math.random() * 0.8
      });
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      t += 0.025;

      const pCol = "#58A6FF";
      const pGlow = "rgba(88, 166, 255,";

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const centerY = H * 0.5;
      const stages = [
        { label: "RAW DOCS", x: W * 0.16, y: centerY },
        { label: "CHUNKING", x: W * 0.38, y: centerY },
        { label: "PINECONE 512-D", x: W * 0.62, y: centerY },
        { label: "GUARDRAILS & LLM", x: W * 0.86, y: centerY }
      ];

      // Connecting conduit
      ctx.strokeStyle = `${pGlow}0.3)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(stages[0].x, stages[0].y);
      for (let s of stages) ctx.lineTo(s.x, s.y);
      ctx.stroke();

      // Traveling vector query packets
      for (let p of particles) {
        p.x += p.speed;
        if (p.x > stages[3].x + 15) p.x = stages[0].x - 10;
        p.y = centerY + Math.sin(p.x * 0.04 + t * 2) * 14;

        ctx.fillStyle = pCol;
        ctx.shadowColor = pCol;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes
      stages.forEach((st, idx) => {
        const isPulse = Math.floor(t * 2) % stages.length === idx;

        ctx.fillStyle = "#161B22";
        ctx.strokeStyle = isPulse ? "#FFFFFF" : pCol;
        ctx.lineWidth = isPulse ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (isPulse) {
          ctx.strokeStyle = `${pGlow}0.4)`;
          ctx.beginPath();
          ctx.arc(st.x, st.y, 26, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.font = "bold 9px var(--font-head), 'Space Grotesk', sans-serif";
        ctx.fillStyle = isPulse ? "#FFFFFF" : "rgba(230, 237, 243, 0.85)";
        ctx.textAlign = "center";
        ctx.fillText(st.label, st.x, st.y + 32);

        ctx.font = "10px monospace";
        ctx.fillStyle = pCol;
        ctx.fillText(`0${idx + 1}`, st.x, st.y + 3);
      });

      // HUD Label
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.textAlign = "right";
      ctx.fillText("NEURAL RAG VECTOR PIPELINE [ACTIVE]", W - 18, 22);

      animId = requestAnimationFrame(render);
    }

    render();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    const timer = setTimeout(resize, 80);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="scroll-stage-canvas" />;
}

// Canvas Component for Project 03: Clinical Risk Simulation
function ClinicalCanvas({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 500;
    let H = 340;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        W = rect.width;
        H = rect.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resize();

    let t = 0;

    function render() {
      ctx.clearRect(0, 0, W, H);
      t += 0.025;

      const pCol = "#3FB950";

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const cx = W * 0.5;
      const cy = H * 0.48;
      const gaugeR = Math.min(W * 0.2, H * 0.28, 85);

      // Outer track
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.arc(cx, cy, gaugeR, Math.PI * 0.8, Math.PI * 2.2);
      ctx.stroke();

      // Active arc
      const activeEnd = Math.PI * 0.8 + (Math.sin(t * 1.2) * 0.25 + 0.85) * (Math.PI * 1.4);
      ctx.strokeStyle = pCol;
      ctx.lineWidth = 9;
      ctx.shadowColor = pCol;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(cx, cy, gaugeR, Math.PI * 0.8, activeEnd);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Readout
      ctx.font = "bold 26px var(--font-head), 'Space Grotesk', sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      const readmitPct = Math.round(18 + Math.sin(t * 1.2) * 4);
      ctx.fillText(`${readmitPct}%`, cx, cy + 3);

      ctx.font = "9px monospace";
      ctx.fillStyle = pCol;
      ctx.fillText("READMISSION RISK", cx, cy + 20);

      // Surrounding patient nodes
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + t * 0.4;
        const dist = gaugeR + 36;
        const px = cx + Math.cos(ang) * dist;
        const py = cy + Math.sin(ang) * dist;

        ctx.fillStyle = (i % 3 === 0) ? "#FF5555" : pCol;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // HUD Label
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.textAlign = "right";
      ctx.fillText("CLINICAL COHORT READMISSION GAUGE [ONLINE]", W - 18, 22);

      animId = requestAnimationFrame(render);
    }

    render();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    const timer = setTimeout(resize, 80);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="scroll-stage-canvas" />;
}

const PROJECTS = [
  {
    num: "01",
    company: "Charles Schwab",
    title: "Financial Risk & Anomaly Pipelines",
    oneLiner: "Overnight batch ML pipelines forecasting portfolio risk and anomaly signals with zero-tolerance for stale data.",
    color: "#F0883E",
    badges: ["Overnight Batch Window", "< 0.02% Drift Guardrails", "1.4M Events / Min"],
    tech: ["Python", "PyTorch", "Snowflake", "Databricks", "Amazon EKS", "SageMaker"],
    renderCanvas: (isActive) => <RiskCanvas isActive={isActive} />
  },
  {
    num: "02",
    company: "Charles Schwab",
    title: "Regulatory Document Intelligence & GenAI",
    oneLiner: "Dense semantic vector retrieval and grounded RAG synthesis across millions of regulatory compliance tokens.",
    color: "#58A6FF",
    badges: ["< 85ms Vector Speed", "99.4% Groundedness", "Zero-Hallucination RAG"],
    tech: ["LangChain", "LangGraph", "Pinecone", "FAISS", "Amazon Bedrock", "OpenSearch"],
    renderCanvas: (isActive) => <RagCanvas isActive={isActive} />
  },
  {
    num: "03",
    company: "CommonSpirit Health",
    title: "Clinical Risk & Readmission AI",
    oneLiner: "HIPAA-aligned supervised models predicting 30-day readmission and length-of-stay across hospital cohorts.",
    color: "#3FB950",
    badges: ["100% HIPAA De-ID", "0.892 ROC-AUC Score", "30-Day Readmission Horizon"],
    tech: ["Azure ML", "PostgreSQL", "Kafka", "Python NLP", "Scikit-learn", "AKS"],
    renderCanvas: (isActive) => <ClinicalCanvas isActive={isActive} />
  }
];

export default function ProjectSimulationDeck() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll detection to advance projects as user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      if (progress > 0.62) {
        setActiveIndex(2);
      } else if (progress > 0.28) {
        setActiveIndex(1);
      } else {
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetY = window.scrollY + rect.top + (index / 2) * totalScrollable + 10;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <div className="project-scroll-track" ref={trackRef}>
      {/* Sticky Theater Stage */}
      <div className="project-sticky-theater" style={{ "--p-color": activeProject.color }}>
        
        {/* Left Side: Editorial Details (Moves Upwards / Out to the Top) */}
        <div className="project-scroll-left">
          {/* Vertical Progress Rail */}
          <div className="project-scroll-rail">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.num}
                type="button"
                className={`rail-step-btn ${activeIndex === idx ? "active" : ""}`}
                style={{ "--step-color": p.color }}
                onClick={() => jumpTo(idx)}
              >
                <span className="rail-dot"></span>
                <span className="rail-label">{p.num}</span>
              </button>
            ))}
          </div>

          {/* Animated Text Content Deck */}
          <div className="project-text-deck">
            {PROJECTS.map((p, idx) => {
              const stateClass =
                idx === activeIndex
                  ? "active"
                  : idx < activeIndex
                  ? "past"
                  : "future";

              return (
                <div key={p.num} className={`project-text-slide ${stateClass}`}>
                  <div className="p-num-marker" style={{ color: p.color }}>
                    {p.num} / 03
                  </div>

                  <span className="p-comp-badge" style={{ color: p.color }}>
                    ● {p.company}
                  </span>

                  <h3 className="p-editorial-title">{p.title}</h3>
                  <p className="p-editorial-oneliner">{p.oneLiner}</p>

                  <div className="p-editorial-badges">
                    {p.badges.map((b, bIdx) => (
                      <span key={bIdx} className="p-badge-item" style={{ borderColor: `${p.color}35` }}>
                        <span style={{ color: p.color }}>●</span> {b}
                      </span>
                    ))}
                  </div>

                  <div className="p-editorial-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="p-tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Live Dynamic Simulation Canvas (Slides In From Right with Motion) */}
        <div className="project-scroll-right">
          <div className="project-canvas-stage">
            {PROJECTS.map((p, idx) => {
              const stateClass =
                idx === activeIndex
                  ? "active"
                  : idx < activeIndex
                  ? "past"
                  : "future";

              return (
                <div key={p.num} className={`project-canvas-slide ${stateClass}`}>
                  <div className="canvas-frame">
                    {p.renderCanvas(idx === activeIndex)}
                    <div className="canvas-frame-status">
                      <span className="frame-dot" style={{ background: p.color }}></span>
                      <span>SYSTEM SIMULATION &bull; {p.num} OF 03</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
