"use client";

import { useState, useEffect, useRef } from "react";

const ERAS = [
  {
    id: "schwab",
    num: "01",
    tag: "FINANCIAL RISK & GENAI",
    company: "Charles Schwab",
    period: "2024 – Present",
    role: "AI/ML Engineer",
    location: "USA",
    current: true,
    color: "#F0883E",
    headline: "Protecting portfolio decisions where accuracy isn't optional.",
    subtext: "Architected overnight risk-scoring pipelines on Snowflake Streams and PyTorch time-series models, paired with LLM vector intelligence for regulatory documents.",
    metrics: [
      { val: "Overnight", label: "BATCH REFRESH WINDOW", desc: "Optimized feature engineering pipelines to eliminate stale risk signals." },
      { val: "< 100ms", label: "VECTOR RETRIEVAL", desc: "Sub-second semantic search with Pinecone, FAISS & Amazon Bedrock." },
      { val: "Zero-Drift", label: "GUARDRAILED SERVING", desc: "Containerized EKS rollout with strict automated rollback triggers." }
    ],
    stack: ["PyTorch", "Snowflake Streams", "Databricks", "LangChain", "Pinecone", "Amazon Bedrock", "Docker", "EKS"],
    bullets: [
      "Developed Python-based risk-scoring pipelines using Pandas, NumPy, SciPy, and Snowflake Streams, optimizing feature engineering and model refresh workflows to operate within overnight batch processing windows.",
      "Performed data preprocessing, feature engineering, and feature validation to resolve stale-signal issues and improve the quality and reliability of portfolio and advisor recommendation outputs.",
      "Built and evaluated machine learning models using Scikit-learn, XGBoost, LightGBM, PyTorch, and TensorFlow, applying classification, regression, clustering, and anomaly-detection techniques to financial datasets.",
      "Conducted model evaluation, hyperparameter tuning, and cross-validation, comparing performance metrics and optimizing models to produce reliable predictions for financial forecasting and decision-support workflows.",
      "Developed time-series forecasting models using PyTorch and TensorFlow, incorporating historical financial data and feature engineering to generate predictive signals for portfolio and planning teams.",
      "Designed scalable ML data workflows using Databricks, Apache Spark, Delta Lake, Snowflake, Snowpipe, and Unity Catalog, supporting feature preparation, data consistency, and repeatable model training.",
      "Implemented vector search and document intelligence using Pinecone, FAISS, OpenSearch, Hugging Face, Transformers, and OpenAI API, supporting semantic retrieval and grounded analysis of research and regulatory documents.",
      "Applied Generative AI techniques, including prompt engineering, chunking, reranking, and output guardrails, to improve the quality and relevance of AI-generated responses for internal research and financial workflows.",
      "Deployed and monitored ML workloads using Docker, Amazon EKS, Amazon SageMaker, GitHub Actions, and Amazon CloudWatch, establishing repeatable deployment, monitoring, rollback, and model-promotion workflows.",
      "Developed LLM-based research workflows using LangChain, LangGraph, LlamaIndex, and Amazon Bedrock, while incorporating explainability, privacy, model-risk, and fairness considerations into production AI/ML releases."
    ]
  },
  {
    id: "commonspirit",
    num: "02",
    tag: "CLINICAL PREDICTION & HIPAA",
    company: "CommonSpirit Health",
    period: "2021 – 2023",
    role: "AI/ML Engineer",
    location: "Hyderabad, India",
    current: false,
    color: "#3FB950",
    headline: "Predicting clinical risk across distributed healthcare networks.",
    subtext: "Engineered HIPAA-aligned ML pipelines on Azure to forecast 30-day readmissions and patient length-of-stay while actively counteracting false-positive drift.",
    metrics: [
      { val: "100%", label: "HIPAA COMPLIANCE", desc: "Deidentified EHR streaming features via PostgreSQL & Azure Blob Storage." },
      { val: "30-Day", label: "READMISSION HORIZON", desc: "Supervised models with class-imbalance tuning for clinical alerts." },
      { val: "Multi-Site", label: "CONTINUOUS OBSERVABILITY", desc: "Automated model drift tracking across clinical locations via Azure Monitor." }
    ],
    stack: ["Azure Machine Learning", "AKS", "Python NLP", "PostgreSQL", "Kafka", "Scikit-learn", "Azure Functions"],
    bullets: [
      "Built HIPAA-aligned ML feature pipelines using SQL, PostgreSQL, and Azure Blob Storage, preparing deidentified EHR data and aligning clinical labels for readmission, length-of-stay, and no-show prediction models.",
      "Developed and trained supervised machine learning models in Azure Machine Learning, applying data preprocessing, feature selection, class-imbalance handling, and model evaluation to improve clinical risk predictions.",
      "Applied NLP techniques for healthcare document processing and semantic search, using Python NLP libraries and Azure Machine Learning to support patient interaction and care-management workflows.",
      "Implemented clustering and anomaly detection workflows to identify patterns and unusual behavior in clinical datasets, supporting analysis of patient and encounter information.",
      "Developed repeatable ML training and deployment pipelines using Azure Machine Learning, Azure Functions, and Azure Kubernetes Service (AKS) to support model workflows across healthcare environments.",
      "Implemented model and dataset versioning, monitoring, and drift checks using Azure Machine Learning and Azure Monitor, helping maintain consistent model performance across clinical sites.",
      "Built data pipelines using PostgreSQL and Kafka to move and prepare clinical data for ML workflows, improving data quality and reliability for downstream model training and predictions.",
      "Troubleshot model performance and data-quality issues, including label alignment, encounter timestamps, deidentification gaps, and false positives in no-show predictions, improving the reliability of clinical risk scores."
    ]
  },
  {
    id: "servicenow",
    num: "03",
    tag: "ENTERPRISE INCIDENT INTELLIGENCE",
    company: "ServiceNow",
    period: "2018 – 2021",
    role: "AI/ML Engineer",
    location: "Hyderabad, India",
    current: false,
    color: "#58A6FF",
    headline: "Automating enterprise incident triage at global SaaS scale.",
    subtext: "Built semantic embedding similarity pipelines, semi-supervised classification for sparse labels, and low-latency Python REST APIs on Google Cloud Run.",
    metrics: [
      { val: "Millions", label: "INDEXED SUPPORT RECORDS", desc: "Vector similarity search and clustering for recurring platform issue triage." },
      { val: "Semi-Supervised", label: "PSEUDO-LABELING", desc: "Overcame limited manual annotations with threshold-based classification." },
      { val: "Serverless", label: "MICROSERVICE INFERENCE", desc: "Python REST APIs running on Cloud Run and BigQuery platform data." }
    ],
    stack: ["Google Cloud Run", "BigQuery", "Python", "Embeddings", "Clustering", "Cloud Storage", "REST APIs"],
    bullets: [
      "Developed Python-based machine learning pipelines for incident routing and categorization, performing data preprocessing, feature engineering, and preparing structured datasets for model development.",
      "Applied supervised and semi-supervised learning techniques, including pseudo-labeling and threshold-based classification, to support ML workflows with limited labeled incident data.",
      "Implemented embedding-based similarity search to compare incident descriptions with historical records and identify related incidents.",
      "Applied clustering techniques to historical incident data to group similar issues, identify recurring patterns, and support incident categorization and troubleshooting.",
      "Prepared and transformed ML datasets and features using BigQuery and Cloud Storage, supporting machine-learning workflows and analysis of historical platform data.",
      "Built and integrated Python REST APIs and lightweight ML services using Cloud Run, connecting machine-learning functionality with platform applications.",
      "Used Python, SQL, Linux, Git, and GCP services to develop, maintain, and troubleshoot ML-related workflows."
    ]
  }
];

export default function ExperienceVisualizer() {
  const [activeEra, setActiveEra] = useState("schwab");
  const [modalOpen, setModalOpen] = useState(false);
  const canvasRef = useRef(null);

  const era = ERAS.find(e => e.id === activeEra) || ERAS[0];

  // Abstract generative canvas visual representing the active domain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = canvas.parentElement.clientWidth || 600;
    let H = 340;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let t = 0;
    const color = era.color;

    function render() {
      ctx.clearRect(0, 0, W, H);
      t += 0.02;

      // 1. Draw abstract flowing harmonic waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const baseFreq = 0.006 + w * 0.003;
        const amp = 35 + w * 18;
        const phase = t * (0.8 + w * 0.4);

        for (let x = 0; x <= W; x += 6) {
          const y = H * 0.5 + Math.sin(x * baseFreq + phase) * amp * Math.cos(x * 0.002 + t * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.18 + w * 0.15;
        ctx.lineWidth = 1.5 + w * 0.8;
        ctx.stroke();
      }

      // 2. Draw floating data pulse beacons
      for (let p = 0; p < 6; p++) {
        const px = ((t * 40 + p * (W / 5)) % (W + 60)) - 30;
        const py = H * 0.5 + Math.sin(px * 0.006 + t) * 45;
        
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
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
  }, [activeEra]);

  return (
    <div className="cinematic-exp-container">
      {/* 1. Chapter Switcher Navigation */}
      <div className="cinematic-nav-strip">
        {ERAS.map(item => {
          const isActive = item.id === activeEra;
          return (
            <button
              key={item.id}
              type="button"
              className={`cinematic-tab-btn ${isActive ? "active" : ""}`}
              style={{ "--era-color": item.color }}
              onClick={() => setActiveEra(item.id)}
            >
              <span className="era-num">{item.num}</span>
              <div className="era-label-block">
                <span className="era-tag">{item.tag}</span>
                <span className="era-company">
                  {item.company}
                  {item.current && <span className="era-live-pulse">● Active</span>}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Main Cinematic Spotlight Card */}
      <div className="cinematic-stage" style={{ "--era-color": era.color }}>
        <div className="cinematic-stage-grid">
          {/* Left Column: Bold Editorial Content */}
          <div className="cinematic-text-col">
            <div className="cinematic-meta-row">
              <span className="c-company">{era.company}</span>
              <span className="c-sep">/</span>
              <span className="c-role">{era.role}</span>
              <span className="c-sep">/</span>
              <span className="c-period">{era.period} &bull; {era.location}</span>
            </div>

            <h3 className="cinematic-headline">{era.headline}</h3>
            <p className="cinematic-subtext">{era.subtext}</p>

            {/* Core Stack Pills */}
            <div className="cinematic-tech-pills">
              {era.stack.map(tech => (
                <span key={tech} className="c-pill">{tech}</span>
              ))}
            </div>

            {/* Clean Audit Logs Trigger */}
            <button
              type="button"
              className="cinematic-audit-trigger"
              onClick={() => setModalOpen(true)}
            >
              <span>↗ View Full Engineering Audit ({era.bullets.length} Log Entries)</span>
            </button>
          </div>

          {/* Right Column: Abstract Domain Generative Waveform Canvas */}
          <div className="cinematic-visual-col">
            <div className="generative-canvas-wrap">
              <canvas ref={canvasRef} className="generative-waveform-canvas" />
              <div className="canvas-domain-badge">
                <span className="c-badge-dot"></span>
                <span>REAL-TIME DOMAIN SIGNAL &bull; {era.tag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Three Large Impact Telemetry Metrics */}
        <div className="cinematic-metrics-strip">
          {era.metrics.map((m, idx) => (
            <div key={m.label} className="cinematic-metric-card">
              <div className="metric-header">
                <span className="m-index">0{idx + 1}</span>
                <span className="m-label">{m.label}</span>
              </div>
              <div className="metric-large-val" style={{ color: era.color }}>{m.val}</div>
              <p className="metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sleek Minimalist Modal for Technical Logs */}
      {modalOpen && (
        <div className="cinematic-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="cinematic-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-era-tag" style={{ color: era.color }}>{era.tag}</span>
                <h3 className="modal-title">{era.company} &mdash; Engineering Logs</h3>
                <span className="modal-subtitle">{era.role} &bull; {era.period}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-bullet-list">
              {era.bullets.map((bullet, i) => (
                <div key={i} className="modal-bullet-row">
                  <span className="m-bullet-num" style={{ color: era.color }}>0{i + 1}</span>
                  <p className="m-bullet-text">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setModalOpen(false)}
              >
                Close Audit Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
