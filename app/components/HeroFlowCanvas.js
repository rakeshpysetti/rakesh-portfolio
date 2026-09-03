"use client";

import { useEffect, useRef } from "react";

export default function HeroFlowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, dpr;
    const flows = [];
    const NUM_FLOWS = 4;
    const DOTS_PER_FLOW = 18;

    function cubicBezier(t, p0, p1, p2, p3) {
      const u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    }

    function initFlows() {
      flows.length = 0;
      const cfgs = [
        { y: 0.3, curve: 0.12, color: "rgba(240, 136, 62,", speed: 0.0012 },
        { y: 0.45, curve: -0.08, color: "rgba(88, 166, 255,", speed: 0.0015 },
        { y: 0.6, curve: 0.15, color: "rgba(63, 185, 80,", speed: 0.001 },
        { y: 0.72, curve: -0.1, color: "rgba(240, 136, 62,", speed: 0.0013 },
      ];

      for (let f = 0; f < NUM_FLOWS; f++) {
        const c = cfgs[f];
        const baseY = H * c.y;
        const curveAmt = H * c.curve;
        const flow = {
          p0: { x: -50, y: baseY + (Math.random() - 0.5) * 30 },
          p1: { x: W * 0.3, y: baseY + curveAmt },
          p2: { x: W * 0.7, y: baseY - curveAmt * 0.6 },
          p3: { x: W + 50, y: baseY + (Math.random() - 0.5) * 20 },
          color: c.color,
          speed: c.speed,
          dots: [],
        };
        for (let d = 0; d < DOTS_PER_FLOW; d++) {
          flow.dots.push({
            t: Math.random(),
            speed: c.speed * (0.7 + Math.random() * 0.6),
            r: 1.5 + Math.random() * 2.5,
            noiseAmp: 4 + Math.random() * 12,
            alpha: 0.15 + Math.random() * 0.35,
            phase: Math.random() * Math.PI * 2,
          });
        }
        flows.push(flow);
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initFlows();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (const flow of flows) {
        ctx.strokeStyle = flow.color + "0.04)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(flow.p0.x, flow.p0.y);
        ctx.bezierCurveTo(flow.p1.x, flow.p1.y, flow.p2.x, flow.p2.y, flow.p3.x, flow.p3.y);
        ctx.stroke();

        for (const dot of flow.dots) {
          dot.t += dot.speed;
          if (dot.t > 1) dot.t -= 1;
          const x = cubicBezier(dot.t, flow.p0.x, flow.p1.x, flow.p2.x, flow.p3.x);
          const y = cubicBezier(dot.t, flow.p0.y, flow.p1.y, flow.p2.y, flow.p3.y);
          const nf = 1 - dot.t * dot.t;
          const noiseY = Math.sin(Date.now() * 0.002 + dot.phase) * dot.noiseAmp * nf;
          const noiseX = Math.cos(Date.now() * 0.0015 + dot.phase * 1.3) * dot.noiseAmp * 0.5 * nf;
          const fx = x + noiseX;
          const fy = y + noiseY;
          const sm = 0.7 + dot.t * 0.5;
          const alpha = dot.alpha * (0.5 + dot.t * 0.5);

          ctx.fillStyle = flow.color + alpha + ")";
          ctx.beginPath();
          ctx.arc(fx, fy, dot.r * sm, 0, Math.PI * 2);
          ctx.fill();

          if (dot.t > 0.6) {
            ctx.fillStyle = flow.color + (alpha * 0.15) + ")";
            ctx.beginPath();
            ctx.arc(fx, fy, dot.r * sm * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-flow-canvas" />;
}
