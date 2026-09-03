"use client";

import { useEffect, useRef, useState } from "react";

const HUBS = [
  {
    id: "india",
    name: "Hyderabad, India",
    coords: "17.3850° N, 78.4867° E",
    role: "ML Foundations & Clinical Systems",
    period: "2018 – 2023",
    companies: "ServiceNow &bull; CommonSpirit Health",
    color: "#58A6FF",
    // Relative position on map (0 to 1)
    px: 0.69,
    py: 0.54,
    highlights: ["Enterprise incident classification & clustering", "HIPAA-aligned EHR streaming feature stores"]
  },
  {
    id: "usa",
    name: "United States (Illinois / Financial)",
    coords: "39.7817° N, 89.6501° W",
    role: "AI Risk Engineering & GenAI",
    period: "2023 – Present",
    companies: "Charles Schwab &bull; Univ. of Illinois Springfield",
    color: "#F0883E",
    // Relative position on map (0 to 1)
    px: 0.26,
    py: 0.40,
    highlights: ["Overnight financial risk scoring pipelines", "Regulatory document vector intelligence (RAG)"]
  }
];

export default function GlobalSystemsMap() {
  const canvasRef = useRef(null);
  const [activeHub, setActiveHub] = useState("usa");

  const hub = HUBS.find(h => h.id === activeHub) || HUBS[1];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = canvas.parentElement.clientWidth || 600;
    let H = 380;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // World Landmass schematic dot matrix
    const DOTS = [];
    const rows = 24;
    const cols = 48;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols;
        const ny = r / rows;
        // Approximation of continents mask
        const isAmericas = (nx > 0.16 && nx < 0.35 && ny > 0.22 && ny < 0.78);
        const isEurasiaAfrica = (nx > 0.42 && nx < 0.88 && ny > 0.20 && ny < 0.82);
        if (isAmericas || isEurasiaAfrica) {
          // slight random jitter
          if (Math.random() > 0.35) {
            DOTS.push({ x: nx, y: ny, baseAlpha: 0.12 + Math.random() * 0.14 });
          }
        }
      }
    }

    // Packets moving along the transatlantic arc
    const packets = [
      { progress: 0.0, speed: 0.005, color: "#F0883E" },
      { progress: 0.35, speed: 0.0045, color: "#58A6FF" },
      { progress: 0.70, speed: 0.0052, color: "#3FB950" }
    ];

    let t = 0;

    function render() {
      ctx.clearRect(0, 0, W, H);
      t += 0.03;

      // 1. Draw subtle world schematic dots
      ctx.fillStyle = "#E6EDF3";
      for (let dot of DOTS) {
        ctx.globalAlpha = dot.baseAlpha * 0.8;
        ctx.beginPath();
        ctx.arc(dot.x * W, dot.y * H, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Hub Coordinates on Canvas
      const h1 = { x: HUBS[0].px * W, y: HUBS[0].py * H }; // India
      const h2 = { x: HUBS[1].px * W, y: HUBS[1].py * H }; // USA

      // Bezier Control Point (Arches high over the Atlantic/Arctic)
      const midX = (h1.x + h2.x) * 0.5;
      const midY = Math.min(h1.y, h2.y) - 90;

      // 2. Draw Transatlantic Curved Data Pipeline Arc
      ctx.beginPath();
      ctx.moveTo(h1.x, h1.y);
      ctx.quadraticCurveTo(midX, midY, h2.x, h2.y);
      ctx.strokeStyle = "rgba(88, 166, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer glow of arc
      ctx.beginPath();
      ctx.moveTo(h1.x, h1.y);
      ctx.quadraticCurveTo(midX, midY, h2.x, h2.y);
      ctx.strokeStyle = "rgba(240, 136, 62, 0.12)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // 3. Draw Animated Data Packets traveling between India & USA
      for (let p of packets) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        // Quadratic Bezier interpolation formula: B(p) = (1-p)^2*P0 + 2(1-p)p*P1 + p^2*P2
        const p0 = h1;
        const p1 = { x: midX, y: midY };
        const p2 = h2;

        const inv = 1 - p.progress;
        const bx = inv * inv * p0.x + 2 * inv * p.progress * p1.x + p.progress * p.progress * p2.x;
        const by = inv * inv * p0.y + 2 * inv * p.progress * p1.y + p.progress * p.progress * p2.y;

        // Packet photon
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Particle trail
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // 4. Draw Hub Beacons with Radar Ping Waves
      [h1, h2].forEach((pos, idx) => {
        const hubData = HUBS[idx];
        const isSel = hubData.id === activeHub;

        // Pulsing radar ring
        const pingR = ((t * 20 + idx * 30) % 40) + 6;
        const pingAlpha = Math.max(0, 1 - pingR / 45);

        ctx.strokeStyle = hubData.color;
        ctx.globalAlpha = pingAlpha * 0.7;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pingR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Core Hub Pin
        ctx.fillStyle = isSel ? "#FFFFFF" : hubData.color;
        ctx.shadowColor = hubData.color;
        ctx.shadowBlur = isSel ? 14 : 8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isSel ? 6.5 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Hub Callout Label
        ctx.font = "bold 11px var(--font-head), 'Space Grotesk', sans-serif";
        ctx.fillStyle = isSel ? "#FFFFFF" : "rgba(230, 237, 243, 0.85)";
        ctx.textAlign = idx === 0 ? "left" : "right";
        ctx.fillText(hubData.name.split(" ")[0], pos.x + (idx === 0 ? 12 : -12), pos.y - 6);

        ctx.font = "9px monospace";
        ctx.fillStyle = hubData.color;
        ctx.fillText(idx === 0 ? "ORIGIN [HYD]" : "CURRENT [USA]", pos.x + (idx === 0 ? 12 : -12), pos.y + 7);
      });

      animId = requestAnimationFrame(render);
    }

    render();

    const onResize = () => {
      if (!canvas.parentElement) return;
      W = canvas.parentElement.clientWidth;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [activeHub]);

  return (
    <div className="global-systems-deck">
      {/* 1. Systems Telemetry Status Ribbon */}
      <div className="global-telemetry-header">
        <div className="telemetry-item">
          <span className="telemetry-dot"></span>
          <span className="telemetry-label">TRANSLOCAL ML DATA MESH:</span>
          <span className="telemetry-val">ACTIVE &bull; 2 CONTINENTS</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">PIPELINE SECURITY:</span>
          <span className="telemetry-val">HIPAA / FINRA / SOC2</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">TRANSFER LATENCY:</span>
          <span className="telemetry-val">&lt; 38ms GLOBAL SYNC</span>
        </div>
      </div>

      {/* 2. Interactive Global Map Canvas */}
      <div className="global-canvas-wrap">
        <canvas ref={canvasRef} className="global-map-canvas" />

        {/* Region Switcher Buttons */}
        <div className="global-region-switchers">
          {HUBS.map(h => (
            <button
              key={h.id}
              type="button"
              className={`region-btn ${activeHub === h.id ? "active" : ""}`}
              style={{ "--hub-color": h.color }}
              onClick={() => setActiveHub(h.id)}
            >
              <span className="region-indicator"></span>
              <span className="region-name">{h.name.split(" ")[0]}</span>
              <span className="region-tag">{h.id === "india" ? "Origins" : "Current"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Selected Hub Regional Impact Card */}
      <div className="global-hub-card" style={{ "--hub-color": hub.color }}>
        <div className="hub-card-header">
          <div>
            <span className="hub-tag" style={{ color: hub.color }}>{hub.coords} &bull; {hub.period}</span>
            <h4 className="hub-title">{hub.name}</h4>
            <div className="hub-companies" dangerouslySetInnerHTML={{ __html: hub.companies }}></div>
          </div>
          <div className="hub-badge" style={{ background: `${hub.color}15`, color: hub.color, borderColor: `${hub.color}35` }}>
            ● {hub.role}
          </div>
        </div>

        <div className="hub-highlights-grid">
          {hub.highlights.map((item, idx) => (
            <div key={idx} className="hub-highlight-item">
              <span className="h-arrow" style={{ color: hub.color }}>➔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
