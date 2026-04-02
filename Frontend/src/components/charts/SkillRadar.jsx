import React, { useRef, useEffect } from "react";

/**
 * SkillRadar — Monochrome Canvas radar chart.
 * White lines on black. No color except subtle white glow.
 */
const SkillRadar = ({ skills, size = 280 }) => {
  const canvasRef = useRef(null);

  const skillLabels = {
    python: "Python",
    javascript: "JavaScript",
    html_css: "HTML/CSS",
    sql: "SQL",
    problem_solving: "Problem Solving",
    ml_ai: "ML / AI",
    design: "Design",
    networking: "Networking",
    devops: "DevOps",
    communication: "Communication",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const padding = 55;
    const canvasSize = size + padding * 2;

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const radius = size / 2;

    const entries = Object.entries(skills).filter(([k]) => k in skillLabels);
    const n = entries.length;
    const step = (2 * Math.PI) / n;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Grid rings
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach((ring) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = i * step - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * ring;
        const y = cy + Math.sin(angle) * radius * ring;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 1.0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Axis lines
    entries.forEach((_, i) => {
      const angle = i * step - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Data fill
    ctx.beginPath();
    entries.forEach(([, v], i) => {
      const angle = i * step - Math.PI / 2;
      const x = cx + Math.cos(angle) * v * radius;
      const y = cy + Math.sin(angle) * v * radius;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Data points
    entries.forEach(([, v], i) => {
      const angle = i * step - Math.PI / 2;
      const x = cx + Math.cos(angle) * v * radius;
      const y = cy + Math.sin(angle) * v * radius;

      // Glow
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = v > 0.6 ? "#FFFFFF" : "#A1A1AA";
      ctx.fill();
    });

    // Labels
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    entries.forEach(([key, v], i) => {
      const angle = i * step - Math.PI / 2;
      const lr = radius + 32;
      const x = cx + Math.cos(angle) * lr;
      const y = cy + Math.sin(angle) * lr;

      ctx.font = "500 11px Inter, system-ui, sans-serif";
      ctx.fillStyle = v > 0.5 ? "#FFFFFF" : "#A1A1AA";
      ctx.fillText(skillLabels[key] || key, x, y);

      ctx.font = "400 9px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#71717A";
      ctx.fillText(`${Math.round(v * 100)}%`, x, y + 13);
    });
  }, [skills, size]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SkillRadar;
