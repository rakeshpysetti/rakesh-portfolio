"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    let animId;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Camera & 3D projection parameters
    const FOV = 520;
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    // Mouse tracking & gravitational interaction
    let mouseX = W * 0.5;
    let mouseY = H * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isHovering = false;

    // Scroll tracking for latent space warp
    let lastScrollY = window.scrollY || 0;
    let scrollVelocity = 0;

    // Color palette for high-dimensional ML latent space
    const PALETTE = [
      { r: 240, g: 136, b: 62,  hex: "#F0883E", name: "amber" },   // Schwab Risk Amber
      { r: 88,  g: 166, b: 255, hex: "#58A6FF", name: "cyan" },    // GenAI Cyan
      { r: 63,  g: 185, b: 80,  hex: "#3FB950", name: "emerald" }, // Clinical Emerald
      { r: 163, g: 113, b: 247, hex: "#A371F7", name: "violet" },  // Deep Neural Violet
      { r: 255, g: 255, b: 255, hex: "#FFFFFF", name: "starlight" }// Synaptic Photon White
    ];

    // 220 3D Tensor Nodes
    const NODE_COUNT = 210;
    const nodes = [];

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        // Distributed in a broad 3D volume
        nodes.push({
          x: (Math.random() - 0.5) * (W * 1.6),
          y: (Math.random() - 0.5) * (H * 1.6),
          z: Math.random() * 1400 - 200,
          ox: 0, // original offset
          oy: 0,
          baseRadius: Math.random() * 2.2 + 0.8,
          color: col,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.006 + Math.random() * 0.01,
          driftRadius: 15 + Math.random() * 35,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.025,
          alpha: 0.4 + Math.random() * 0.5,
          // Synaptic burst pulse
          burstAlpha: 0,
        });
      }
    }

    // Active Data Photons traveling along synaptic connections
    const MAX_PHOTONS = 26;
    const photons = [];

    function spawnPhoton(fromNode, toNode) {
      if (photons.length >= MAX_PHOTONS) return;
      photons.push({
        from: fromNode,
        to: toNode,
        progress: 0,
        speed: 0.018 + Math.random() * 0.022,
        color: fromNode.color,
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    initNodes();

    // Event listeners
    const onMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isHovering = true;
      // Tilt angles
      targetRotY = ((e.clientX / W) - 0.5) * 0.35;
      targetRotX = -((e.clientY / H) - 0.5) * 0.28;
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY || 0;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Accelerate forward warp velocity on scroll
      scrollVelocity += Math.abs(delta) * 0.22;
      if (scrollVelocity > 45) scrollVelocity = 45;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    let t = 0;

    function render() {
      t += 0.02;

      // Smooth camera rotation & mouse lerp
      rotX += (targetRotX - rotX) * 0.04;
      rotY += (targetRotY - rotY) * 0.04;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Decay scroll velocity
      scrollVelocity *= 0.92;
      if (scrollVelocity < 0.01) scrollVelocity = 0;

      // 1. Clear deep canvas background (Pure Obsidian #06080E with high-contrast depth)
      ctx.fillStyle = "#06080E";
      ctx.fillRect(0, 0, W, H);

      // 2. Volumetric Bioluminescent Aurora Plasma Layer (Radial harmonics)
      const cx = W * 0.5;
      const cy = H * 0.5;

      // Aurora 1: Solar Gold / Amber in top-right
      const a1X = W * 0.85 + Math.sin(t * 0.6) * 60;
      const a1Y = H * 0.15 + Math.cos(t * 0.5) * 50;
      const grad1 = ctx.createRadialGradient(a1X, a1Y, 40, a1X, a1Y, Math.max(W * 0.45, 420));
      grad1.addColorStop(0, "rgba(240, 136, 62, 0.14)");
      grad1.addColorStop(0.5, "rgba(240, 136, 62, 0.035)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, W, H);

      // Aurora 2: Electric Cyan in mid-left
      const a2X = W * 0.12 + Math.cos(t * 0.7) * 70;
      const a2Y = H * 0.55 + Math.sin(t * 0.8) * 60;
      const grad2 = ctx.createRadialGradient(a2X, a2Y, 50, a2X, a2Y, Math.max(W * 0.48, 440));
      grad2.addColorStop(0, "rgba(88, 166, 255, 0.12)");
      grad2.addColorStop(0.5, "rgba(88, 166, 255, 0.03)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      // Aurora 3: Deep Neural Violet in bottom-center
      const a3X = W * 0.5 + Math.sin(t * 0.5) * 80;
      const a3Y = H * 0.88 + Math.cos(t * 0.6) * 50;
      const grad3 = ctx.createRadialGradient(a3X, a3Y, 60, a3X, a3Y, Math.max(W * 0.5, 460));
      grad3.addColorStop(0, "rgba(163, 113, 247, 0.10)");
      grad3.addColorStop(0.5, "rgba(163, 113, 247, 0.025)");
      grad3.addColorStop(1, "transparent");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, W, H);

      // Aurora 4: Interactive Cursor Spotlight Glow
      if (isHovering) {
        const cGlow = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 320);
        cGlow.addColorStop(0, "rgba(240, 136, 62, 0.09)");
        cGlow.addColorStop(0.4, "rgba(88, 166, 255, 0.04)");
        cGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cGlow;
        ctx.fillRect(0, 0, W, H);
      }

      // Subtle Perspective Matrix Grid Lines (Deep Background)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSpacing = 90;
      for (let x = (t * 8) % gridSpacing; x < W; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 3. Project 3D Tensor Nodes into 2D Screen Space
      const projected = [];
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Harmonic organic drift
        n.driftAngle += n.driftSpeed;
        const driftX = Math.cos(n.driftAngle) * n.driftRadius;
        const driftY = Math.sin(n.driftAngle * 1.3) * (n.driftRadius * 0.7);

        // Latent space warp forward drift + scroll acceleration
        n.z -= 0.65 + scrollVelocity * 1.2;
        if (n.z < -FOV + 40) {
          n.z += 1400; // recycle back into deep horizon
          n.x = (Math.random() - 0.5) * (W * 1.6);
          n.y = (Math.random() - 0.5) * (H * 1.6);
        }

        const wx = n.x + driftX;
        const wy = n.y + driftY;
        const wz = n.z;

        // 3D rotation matrix
        // 1. Rotate around Y
        const rx1 = wx * cosY - wz * sinY;
        const rz1 = wx * sinY + wz * cosY;
        // 2. Rotate around X
        const ry2 = wy * cosX - rz1 * sinX;
        const rz2 = wy * sinX + rz1 * cosX;

        // 3D Perspective Projection
        const zDist = rz2 + FOV;
        if (zDist <= 10) continue;

        const scale = FOV / zDist;
        let screenX = cx + rx1 * scale;
        let screenY = cy + ry2 * scale;

        // Interactive Cursor Gravitational Vortex
        if (isHovering) {
          const dx = screenX - mouseX;
          const dy = screenY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const vortexRadius = 180;
          if (dist < vortexRadius && dist > 1) {
            const force = (1 - dist / vortexRadius) * 48 * scale;
            screenX += (dx / dist) * force;
            screenY += (dy / dist) * force;
            n.burstAlpha = Math.min(n.burstAlpha + 0.08, 0.8);
          }
        }

        // Decay burst alpha
        n.burstAlpha *= 0.94;

        // Twinkle factor
        const twinkle = Math.sin(t * n.pulseSpeed * 25 + n.phase) * 0.35 + 0.65;
        const depthAlpha = Math.max(0, Math.min(1, 1 - (rz2 / 1200)));
        const finalAlpha = Math.min(1, (n.alpha * depthAlpha * twinkle) + n.burstAlpha);

        projected.push({
          node: n,
          sx: screenX,
          sy: screenY,
          scale: scale,
          depth: rz2,
          alpha: finalAlpha,
          radius: Math.max(0.7, n.baseRadius * scale * (1 + n.burstAlpha * 0.8)),
          color: n.color
        });
      }

      // Sort by depth (far to near) for realistic 3D depth compositing
      projected.sort((a, b) => b.depth - a.depth);

      // 4. Draw Synaptic Tensor Connections (Filaments)
      const MAX_DIST = 115;
      const projLen = projected.length;

      for (let i = 0; i < projLen; i++) {
        const p1 = projected[i];
        if (p1.sx < -80 || p1.sx > W + 80 || p1.sy < -80 || p1.sy > H + 80) continue;

        let connectionsCount = 0;
        for (let j = i + 1; j < projLen && connectionsCount < 3; j++) {
          const p2 = projected[j];
          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxAdaptiveDist = MAX_DIST * Math.min(p1.scale, p2.scale) * 1.5;

          if (dist < maxAdaptiveDist) {
            connectionsCount++;
            const lineAlpha = (1 - dist / maxAdaptiveDist) * Math.min(p1.alpha, p2.alpha) * 0.45;

            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.6, 1.3 * p1.scale);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();

            // Chance to spawn a traveling photon
            if (Math.random() < 0.003 && dist > 30) {
              spawnPhoton(p1, p2);
            }
          }
        }
      }

      // 5. Update & Draw Traveling Data Photons
      for (let i = photons.length - 1; i >= 0; i--) {
        const ph = photons[i];
        ph.progress += ph.speed;

        if (ph.progress >= 1) {
          photons.splice(i, 1);
          continue;
        }

        const px = ph.from.sx + (ph.to.sx - ph.from.sx) * ph.progress;
        const py = ph.from.sy + (ph.to.sy - ph.from.sy) * ph.progress;
        const pScale = (ph.from.scale + ph.to.scale) * 0.5;

        // Photon core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pScale})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.2 * pScale, 0, Math.PI * 2);
        ctx.fill();

        // Photon glow halo
        ctx.fillStyle = `rgba(${ph.color.r}, ${ph.color.g}, ${ph.color.b}, ${0.5 * pScale})`;
        ctx.beginPath();
        ctx.arc(px, py, 5.5 * pScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Draw 3D Tensor Nodes (Luminous Cores + Soft Chromatic Halos)
      for (let i = 0; i < projLen; i++) {
        const p = projected[i];
        if (p.sx < -20 || p.sx > W + 20 || p.sy < -20 || p.sy > H + 20) continue;

        const col = p.color;

        // Soft outer bokeh halo
        if (p.radius > 1.3) {
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${p.alpha * 0.28})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.radius * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Mid vibrant glow
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Bright nucleus
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.6, p.radius * 0.75), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="luxury-bg-wrapper">
      {/* 1. Hardware Accelerated High-Dimensional Tensor & Aurora Canvas */}
      <canvas ref={canvasRef} className="tensor-field-canvas" />

      {/* 2. Studio Film Grain Overlay for Velvet Cinematic Texture */}
      <div className="cinematic-grain-overlay"></div>

      {/* 3. Deep Vignette Frame for High Focus */}
      <div className="cinematic-vignette-overlay"></div>
    </div>
  );
}
