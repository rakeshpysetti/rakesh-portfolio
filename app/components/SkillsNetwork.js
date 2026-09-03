"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function CategoryIcon({ id, size = 14 }) {
  if (id === "genai") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (id === "ml") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    );
  }
  if (id === "cloud") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 8 4 4-4 4M15 16h-2" />
    </svg>
  );
}

function StepIcon({ stepIndex, size = 16 }) {
  if (stepIndex === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    );
  }
  if (stepIndex === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    );
  }
  if (stepIndex === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const CATEGORIES = [
  {
    id: "genai",
    label: "GenAI & LLMs",
    code: "LLM",
    color: "#58A6FF",
    glow: "rgba(88, 166, 255, ",
    description: "LLMs, Vector Search, Agentic Workflows & Guardrails",
    skills: [
      { name: "LangChain", role: "LLM Agent Orchestration", experience: "Schwab research workflows" },
      { name: "LangGraph", role: "Stateful Agent Graphs", experience: "Multi-agent planning" },
      { name: "LlamaIndex", role: "Context & RAG Retrieval", experience: "Document indexing" },
      { name: "OpenAI API", role: "Frontier Foundation Models", experience: "Semantic embeddings & generation" },
      { name: "Hugging Face", role: "Transformers & Model Hub", experience: "Fine-tuning & local inference" },
      { name: "Pinecone", role: "Managed Vector Database", experience: "Sub-second similarity search" },
      { name: "FAISS", role: "High-density Vector Indexing", experience: "Large-scale document search" },
      { name: "Amazon Bedrock", role: "Enterprise Foundation Models", experience: "Governed generative models" },
      { name: "Output Guardrails", role: "Safety & Hallucination Mitigation", experience: "Financial compliance filters" },
      { name: "Prompt Eng.", role: "Few-shot & Chain-of-Thought", experience: "Structured financial output" }
    ]
  },
  {
    id: "ml",
    label: "Machine Learning & DL",
    code: "ML",
    color: "#F0883E",
    glow: "rgba(240, 136, 62, ",
    description: "Predictive Modeling, Time-Series & Deep Neural Nets",
    skills: [
      { name: "PyTorch", role: "Deep Learning & Time-Series", experience: "Financial predictive signals" },
      { name: "TensorFlow", role: "Neural Network Modeling", experience: "Forecasting & deep architectures" },
      { name: "Scikit-learn", role: "Supervised & Unsupervised ML", experience: "Clinical risk scoring at CommonSpirit" },
      { name: "XGBoost", role: "Gradient Boosted Trees", experience: "High-stakes risk classification" },
      { name: "LightGBM", role: "Fast Scalable Boosting", experience: "High-dimensional financial datasets" },
      { name: "Pandas & NumPy", role: "High-performance Array Math", experience: "Overnight batch vectorization" },
      { name: "Anomaly Detection", role: "Outlier & Fraud Identification", experience: "Clinical datasets & platform logs" },
      { name: "Feature Eng.", role: "Feature Validation & Stale Signals", experience: "Resolved recommendation drift" }
    ]
  },
  {
    id: "cloud",
    label: "Cloud & Data Platforms",
    code: "DATA",
    color: "#3FB950",
    glow: "rgba(63, 185, 80, ",
    description: "Distributed Compute, Lakehouses & Streaming Data",
    skills: [
      { name: "Snowflake", role: "Cloud Data Warehouse & Streams", experience: "Snowpipe & real-time risk ingest" },
      { name: "Databricks", role: "Unified Data Analytics Platform", experience: "Spark & feature preparation" },
      { name: "Apache Spark", role: "Distributed Big Data Processing", experience: "Multi-million row feature pipelines" },
      { name: "Delta Lake", role: "ACID Lakehouse Architecture", experience: "Data consistency & time travel" },
      { name: "AWS", role: "Cloud Infrastructure & SageMaker", experience: "EKS, SageMaker, CloudWatch" },
      { name: "Azure", role: "Azure ML & Healthcare Compute", experience: "AKS, Functions & HIPAA Storage" },
      { name: "Google Cloud", role: "BigQuery & Cloud Run", experience: "Incident routing at ServiceNow" },
      { name: "PostgreSQL & Kafka", role: "Event Streaming & ACID DB", experience: "EHR streaming feature pipelines" }
    ]
  },
  {
    id: "mlops",
    label: "MLOps & Systems",
    code: "OPS",
    color: "#D2A8FF",
    glow: "rgba(210, 168, 255, ",
    description: "Orchestration, CI/CD, Model Risk Governance & Observability",
    skills: [
      { name: "Docker", role: "Containerized Model Artifacts", experience: "Reproducible inference microservices" },
      { name: "Kubernetes (EKS/AKS)", role: "Orchestration & Auto-scaling", experience: "Production model serving" },
      { name: "GitHub Actions", role: "Automated CI/CD Pipelines", experience: "Automated testing & deployment" },
      { name: "Model Monitoring", role: "Drift, Skew & Latency Tracking", experience: "CloudWatch & Azure Monitor alerts" },
      { name: "Explainable AI", role: "SHAP, LIME & Model Fairness", experience: "Financial risk & regulatory audit" },
      { name: "REST APIs", role: "FastAPI & Python Microservices", experience: "Platform application integration" },
      { name: "Model Versioning", role: "Registry & Rollback Strategy", experience: "Zero-downtime model promotions" }
    ]
  }
];

const PIPELINE_STEPS = [
  {
    stage: "01. INGEST & PREP",
    title: "Data Streaming & Lakehouse",
    color: "#3FB950",
    tools: ["Snowflake Streams", "Apache Spark", "Kafka", "Delta Lake", "BigQuery"],
    detail: "Overnight batch windows, streaming deidentified EHR feeds, and ACID lakehouse feature stores with zero signal drift."
  },
  {
    stage: "02. FEATURE LAB",
    title: "Validation & Engineering",
    color: "#F0883E",
    tools: ["Pandas", "NumPy", "Unity Catalog", "Feature Imbalance", "Outlier Filters"],
    detail: "Resolving stale signals, balancing minority clinical classes, and building reusable feature pipelines for advisors and physicians."
  },
  {
    stage: "03. INTELLIGENCE CORE",
    title: "Modeling & Generative RAG",
    color: "#58A6FF",
    tools: ["PyTorch", "XGBoost", "LangChain", "OpenAI API", "Pinecone", "FAISS"],
    detail: "Time-series risk scoring, supervised readmission models, and semantic retrieval over regulatory and research documents."
  },
  {
    stage: "04. PRODUCTION SERVING",
    title: "MLOps, Guardrails & Audit",
    color: "#D2A8FF",
    tools: ["Docker", "Amazon EKS", "SageMaker", "Output Guardrails", "CloudWatch"],
    detail: "Automated CI/CD promotion, drift monitoring, rollback triggers, and strict compliance filters for financial and healthcare standards."
  }
];

export default function SkillsNetwork() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("network"); // "network" | "pipeline"
  const [hoveredNode, setHoveredNode] = useState(null);
  const [stats, setStats] = useState({ nodesCount: 33, activeCategory: "All Capabilities" });

  useEffect(() => {
    setStats({
      nodesCount: activeTab === "all" ? 12 : CATEGORIES.find(c => c.id === activeTab)?.skills.length || 0,
      activeCategory: activeTab === "all" ? "Flagship Core" : CATEGORIES.find(c => c.id === activeTab)?.label || ""
    });
  }, [activeTab]);

  // Canvas interactive simulation
  useEffect(() => {
    if (viewMode !== "network") return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let W = container.clientWidth || 1000;
    let H = 600;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes = [];
    let hubs = [];
    let pulses = [];
    let mouse = { x: -1000, y: -1000, active: false };

    const HUB_RADIUS = 36;
    const NODE_RADIUS = 10;
    const MOUSE_REPEL_RADIUS = 140;

    function initNetwork() {
      W = container.clientWidth || 1000;
      H = 600;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      hubs = [];
      pulses = [];

      const filteredCategories = activeTab === "all"
        ? CATEGORIES
        : CATEGORIES.filter(c => c.id === activeTab);

      const cx = W / 2;
      const cy = H / 2;
      const numCats = filteredCategories.length;

      filteredCategories.forEach((cat, i) => {
        let hx, hy;
        if (numCats === 1) {
          hx = cx;
          hy = cy;
        } else {
          // Spread 4 hubs with generous spacing
          const angle = (i / numCats) * Math.PI * 2 - Math.PI / 4;
          const orbitR = Math.min(W * 0.28, H * 0.28);
          hx = cx + Math.cos(angle) * orbitR;
          hy = cy + Math.sin(angle) * orbitR;
        }

        hubs.push({
          id: cat.id,
          label: cat.label,
          code: cat.code,
          color: cat.color,
          glow: cat.glow,
          x: hx,
          y: hy,
          base_x: hx,
          base_y: hy,
          angle: (i / numCats) * Math.PI * 2,
          radius: numCats === 1 ? 46 : HUB_RADIUS
        });

        // In "All Systems", show top 3 flagship skills per hub to avoid clutter!
        // When a specific category is focused, show all its skills in clean staggered concentric rings.
        const skillList = activeTab === "all" ? cat.skills.slice(0, 3) : cat.skills;
        const skillCount = skillList.length;

        skillList.forEach((skill, j) => {
          const sAngle = (j / skillCount) * Math.PI * 2;
          // Staggered orbits: alternate inner and outer rings so labels never collide
          const dist = numCats === 1
            ? (j % 2 === 0 ? 115 : 170)
            : (70 + (j % 3) * 28);

          const nx = hx + Math.cos(sAngle) * dist;
          const ny = hy + Math.sin(sAngle) * dist;

          nodes.push({
            hubIndex: i,
            catId: cat.id,
            name: skill.name,
            role: skill.role,
            experience: skill.experience,
            color: cat.color,
            glow: cat.glow,
            x: nx,
            y: ny,
            targetX: nx,
            targetY: ny,
            vx: 0,
            vy: 0,
            orbitAngle: sAngle,
            orbitDist: dist,
            orbitSpeed: numCats === 1 ? (0.0012 + (j % 2) * 0.0006) : (0.0015 + (j % 2) * 0.0008),
            r: NODE_RADIUS,
            highlight: false
          });
        });
      });
    }

    // Periodic synaptic electrical pulses from hubs to random nodes
    let pulseTimer = 0;
    function addPulse() {
      if (nodes.length === 0 || hubs.length === 0) return;
      const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
      const hub = hubs[targetNode.hubIndex];
      if (!hub) return;
      pulses.push({
        hubX: hub.x,
        hubY: hub.y,
        node: targetNode,
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        color: targetNode.color
      });
    }

    // Drag & Throw Interactive Physics
    let draggedItem = null;
    let prevMouse = { x: 0, y: 0 };

    function animate() {
      ctx.clearRect(0, 0, W, H);
      const time = Date.now() * 0.0015;

      // Pulse generation
      pulseTimer++;
      if (pulseTimer % 20 === 0) {
        addPulse();
      }

      // Update Hub positions
      hubs.forEach(hub => {
        if (!hub.isDragged) {
          hub.x = hub.base_x + Math.sin(time + hub.angle) * 14;
          hub.y = hub.base_y + Math.cos(time * 0.8 + hub.angle) * 14;
        } else {
          hub.base_x = hub.x;
          hub.base_y = hub.y;
        }
      });

      // Update node physics
      let foundHover = null;
      nodes.forEach(node => {
        const hub = hubs[node.hubIndex];
        if (!hub) return;

        if (node.isDragged) {
          // Being dragged directly by user
          node.x = mouse.x;
          node.y = mouse.y;
          node.vx = mouse.vx;
          node.vy = mouse.vy;
          foundHover = node;
          node.highlight = true;
        } else {
          // Orbit target position
          node.orbitAngle += node.orbitSpeed;
          node.targetX = hub.x + Math.cos(node.orbitAngle) * node.orbitDist;
          node.targetY = hub.y + Math.sin(node.orbitAngle) * node.orbitDist;

          // Spring force pulling back to orbit
          node.vx += (node.targetX - node.x) * 0.025;
          node.vy += (node.targetY - node.y) * 0.025;

          // Mouse distance
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 28) {
            foundHover = node;
            node.highlight = true;
          } else {
            node.highlight = false;
          }

          // Mouse repelling / pull-push physics
          if (mouse.active && dist > 0) {
            if (mouse.down && !draggedItem) {
              // Pull-Push Wave: Pull nearby nodes towards cursor when holding click on canvas
              if (dist < 220) {
                const pullForce = (220 - dist) * 0.035;
                node.vx -= (dx / dist) * pullForce;
                node.vy -= (dy / dist) * pullForce;
                // Add drag momentum push
                node.vx += mouse.vx * 0.3;
                node.vy += mouse.vy * 0.3;
              }
            } else if (!mouse.down && dist < MOUSE_REPEL_RADIUS) {
              // Gentle hover repel when not dragging
              const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
              node.vx += (dx / dist) * force * 2.8;
              node.vy += (dy / dist) * force * 2.8;
            }
          }

          // Damping / Friction
          node.vx *= 0.91;
          node.vy *= 0.91;

          node.x += node.vx;
          node.y += node.vy;

          // Elastic boundary bounce
          if (node.x < 30) { node.x = 30; node.vx *= -0.75; }
          if (node.x > W - 30) { node.x = W - 30; node.vx *= -0.75; }
          if (node.y < 30) { node.y = 30; node.vy *= -0.75; }
          if (node.y > H - 30) { node.y = H - 30; node.vy *= -0.75; }
        }

        // Draw connection line to Hub
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(hub.x, hub.y);
        ctx.strokeStyle = node.highlight ? `${node.color}` : `${node.glow}0.22)`;
        ctx.lineWidth = node.highlight ? 2 : 1;
        ctx.stroke();
      });

      // Anti-collision separation force: Prevents labels from overlapping
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          const minClearance = 56;
          if (dist < minClearance && dist > 0) {
            const push = ((minClearance - dist) / minClearance) * 0.45;
            if (!nodes[i].isDragged) {
              nodes[i].vx += (dx / dist) * push;
              nodes[i].vy += (dy / dist) * push;
            }
            if (!nodes[j].isDragged) {
              nodes[j].vx -= (dx / dist) * push;
              nodes[j].vy -= (dy / dist) * push;
            }
          }
        }
      }

      // Draw inter-node synaptic links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 75) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - d / 75) * 0.18;
            ctx.strokeStyle = `${nodes[i].glow}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw active pulses traveling along lines
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const px = pulse.hubX + (pulse.node.x - pulse.hubX) * pulse.progress;
        const py = pulse.hubY + (pulse.node.y - pulse.hubY) * pulse.progress;

        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Hubs
      hubs.forEach(hub => {
        // Outer halo
        const grad = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, hub.radius * 2.2);
        grad.addColorStop(0, `${hub.glow}0.28)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Hub core
        ctx.fillStyle = "#161B22";
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hub Text & Technical Monogram Code
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = hub.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`[ ${hub.code} ]`, hub.x, hub.y - 7);

        ctx.font = "600 11px var(--font-head), 'Space Grotesk', sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(hub.label, hub.x, hub.y + 11);
      });

      // Draw Nodes
      nodes.forEach(node => {
        // Glow if highlighted or dragged
        if (node.highlight || node.isDragged) {
          ctx.fillStyle = `${node.glow}0.38)`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node Circle
        ctx.fillStyle = (node.highlight || node.isDragged) ? node.color : "#1C2128";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = (node.highlight || node.isDragged) ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.highlight || node.isDragged) ? node.r + 2.5 : node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Label pill background & text
        ctx.font = (node.highlight || node.isDragged)
          ? "600 12px var(--font-head), 'Space Grotesk', sans-serif"
          : "500 11px var(--font-body), 'Inter', sans-serif";

        const textMetrics = ctx.measureText(node.name);
        const pillWidth = textMetrics.width + 12;
        const pillHeight = 18;
        const pillX = node.x + node.r + 5;
        const pillY = node.y - 9;

        ctx.fillStyle = (node.highlight || node.isDragged) ? "rgba(13, 17, 23, 0.95)" : "rgba(22, 27, 34, 0.85)";
        ctx.strokeStyle = (node.highlight || node.isDragged) ? node.color : "rgba(48, 54, 61, 0.7)";
        ctx.lineWidth = 1;

        // Rounded badge
        const rad = 4;
        ctx.beginPath();
        ctx.moveTo(pillX + rad, pillY);
        ctx.lineTo(pillX + pillWidth - rad, pillY);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY, pillX + pillWidth, pillY + rad);
        ctx.lineTo(pillX + pillWidth, pillY + pillHeight - rad);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY + pillHeight, pillX + pillWidth - rad, pillY + pillHeight);
        ctx.lineTo(pillX + rad, pillY + pillHeight);
        ctx.quadraticCurveTo(pillX, pillY + pillHeight, pillX, pillY + pillHeight - rad);
        ctx.lineTo(pillX, pillY + rad);
        ctx.quadraticCurveTo(pillX, pillY, pillX + rad, pillY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Label text
        ctx.fillStyle = (node.highlight || node.isDragged) ? "#FFFFFF" : "#E6EDF3";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, pillX + 6, node.y + 0.5);
      });

      if (foundHover) {
        setHoveredNode({
          name: foundHover.name,
          role: foundHover.role,
          experience: foundHover.experience,
          color: foundHover.color,
          category: CATEGORIES.find(c => c.id === foundHover.catId)?.label || ""
        });
      } else if (!draggedItem) {
        setHoveredNode(null);
      }

      animId = requestAnimationFrame(animate);
    }

    initNetwork();
    animate();

    const getCanvasPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleMouseDown = (e) => {
      if (e.button !== 0 && !e.touches) return; // Left click only
      const pos = getCanvasPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      prevMouse.x = pos.x;
      prevMouse.y = pos.y;
      mouse.down = true;

      // Check if user clicked on a node to drag
      const hitNode = nodes.find(n => Math.hypot(n.x - pos.x, n.y - pos.y) < 32);
      if (hitNode) {
        draggedItem = { type: 'node', target: hitNode };
        hitNode.isDragged = true;
        canvas.style.cursor = 'grabbing';
        return;
      }

      // Check if user clicked on a hub to drag or focus
      const hitHub = hubs.find(h => Math.hypot(h.x - pos.x, h.y - pos.y) < h.radius + 8);
      if (hitHub) {
        if (activeTab === "all") {
          // Immediately focus and expand that domain cleanly!
          setActiveTab(hitHub.id);
          return;
        }
        draggedItem = { type: 'hub', target: hitHub };
        hitHub.isDragged = true;
        canvas.style.cursor = 'grabbing';
        return;
      }
    };

    const handleMouseMove = (e) => {
      const pos = getCanvasPos(e);
      
      // Calculate instantaneous velocity for throwing physics
      mouse.vx = pos.x - mouse.x;
      mouse.vy = pos.y - mouse.y;
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.active = true;

      if (draggedItem) {
        canvas.style.cursor = 'grabbing';
      } else {
        const isHoverNode = nodes.some(n => Math.hypot(n.x - pos.x, n.y - pos.y) < 26);
        const isHoverHub = hubs.some(h => Math.hypot(h.x - pos.x, h.y - pos.y) < h.radius);
        canvas.style.cursor = (isHoverNode || isHoverHub) ? 'grab' : (mouse.down ? 'grabbing' : 'crosshair');
      }
    };

    const handleMouseUp = () => {
      if (draggedItem) {
        // Apply Throw Physics Momentum!
        draggedItem.target.vx = mouse.vx * 1.6;
        draggedItem.target.vy = mouse.vy * 1.6;

        if (draggedItem.type === 'node') {
          draggedItem.target.isDragged = false;
        } else {
          draggedItem.target.base_x = draggedItem.target.x;
          draggedItem.target.base_y = draggedItem.target.y;
          draggedItem.target.isDragged = false;
        }
        draggedItem = null;
      }
      mouse.down = false;
      canvas.style.cursor = 'crosshair';
    };

    const handleMouseLeave = () => {
      if (draggedItem) {
        handleMouseUp();
      }
      mouse.active = false;
      mouse.down = false;
      setHoveredNode(null);
    };

    const handleResize = () => {
      initNetwork();
    };

    // Event listeners: Mouse & Touch
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    canvas.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      canvas.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);

      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, viewMode]);

  return (
    <div className="skills-interactive-deck" ref={containerRef}>
      {/* Top Controls: View Selector & Category Filters */}
      <div className="skills-top-bar">
        <div className="skills-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${viewMode === "network" ? "active" : ""}`}
            onClick={() => setViewMode("network")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            <span>Neural Universe Graph</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === "pipeline" ? "active" : ""}`}
            onClick={() => setViewMode("pipeline")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span>Production Architecture Flow</span>
          </button>
        </div>

        {viewMode === "network" && (
          <div className="skills-filter-tabs">
            <button
              type="button"
              className={`tab-pill ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
              </svg>
              <span>All Systems (Curated Core)</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`tab-pill ${activeTab === cat.id ? "active" : ""}`}
                style={{ "--accent": cat.color }}
                onClick={() => setActiveTab(cat.id)}
              >
                <CategoryIcon id={cat.id} size={13} />
                <span>{cat.label} ({cat.skills.length})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: Interactive Physics Canvas Network */}
      {viewMode === "network" && (
        <div className="skills-canvas-viewport">
          <canvas ref={canvasRef} className="skills-live-canvas" />

          {/* Clean Holographic HUD Inspector (Only visible when actively hovering) */}
          {hoveredNode && (
            <div className="skills-hud-inspector active" style={{ borderColor: hoveredNode.color }}>
              <div className="hud-badge" style={{ background: `${hoveredNode.color}22`, color: hoveredNode.color }}>
                ● Active In Production Workflows
              </div>
              <h4 className="hud-name">{hoveredNode.name}</h4>
              <div className="hud-category">{hoveredNode.category} &bull; {hoveredNode.role}</div>
              <div className="hud-metric">
                <span className="hud-label">Production Impact:</span> {hoveredNode.experience}
              </div>
            </div>
          )}

          <div className="skills-canvas-watermark">
            <span>DRAG &bull; THROW &bull; PULL-PUSH PHYSICS</span>
          </div>
        </div>
      )}

      {/* VIEW 2: Production Architecture Pipeline */}
      {viewMode === "pipeline" && (
        <div className="skills-pipeline-deck">
          <div className="pipeline-header-info">
            <h3>Enterprise ML &amp; GenAI Architecture Lifecycle</h3>
            <p>How Rakesh turns raw enterprise data into mission-critical production intelligence across 4 connected phases.</p>
          </div>

          <div className="pipeline-grid">
            {PIPELINE_STEPS.map((step, idx) => (
              <div key={step.stage} className="pipeline-card" style={{ "--stage-color": step.color }}>
                <div className="pipeline-connector-line">
                  <div className="pipeline-signal-pulse"></div>
                </div>
                <div className="pipeline-card-top">
                  <span className="pipeline-icon">
                    <StepIcon stepIndex={idx} size={16} />
                  </span>
                  <span className="pipeline-stage-tag">{step.stage}</span>
                </div>
                <h4 className="pipeline-card-title">{step.title}</h4>
                <p className="pipeline-card-detail">{step.detail}</p>
                <div className="pipeline-tools-list">
                  {step.tools.map(tool => (
                    <span key={tool} className="pipeline-tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture telemetry footer */}
          <div className="pipeline-footer-stats">
            <div className="p-stat">
              <span className="p-stat-val">100%</span>
              <span className="p-stat-lbl">HIPAA &amp; Risk Compliance</span>
            </div>
            <div className="p-stat">
              <span className="p-stat-val">&lt; 100ms</span>
              <span className="p-stat-lbl">Vector Search Latency</span>
            </div>
            <div className="p-stat">
              <span className="p-stat-val">Overnight</span>
              <span className="p-stat-lbl">Batch Refresh Windows</span>
            </div>
            <div className="p-stat">
              <span className="p-stat-val">Zero-Downtime</span>
              <span className="p-stat-lbl">Model Rollouts (EKS/AKS)</span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Quick Capabilities Grid (Guarantees immediate visibility across all screen sizes) */}
      <div className="skills-capabilities-ribbon">
        {CATEGORIES.map(c => (
          <div key={c.id} className="ribbon-cat-card" style={{ "--cat-color": c.color }}>
            <div className="ribbon-cat-head">
              <span className="r-icon">
                <CategoryIcon id={c.id} size={16} />
              </span>
              <div>
                <h5>{c.label}</h5>
                <span>{c.description}</span>
              </div>
            </div>
            <div className="ribbon-pills">
              {c.skills.slice(0, 6).map(s => (
                <span key={s.name} className="ribbon-pill">{s.name}</span>
              ))}
              {c.skills.length > 6 && (
                <span className="ribbon-pill more">+{c.skills.length - 6} more</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
