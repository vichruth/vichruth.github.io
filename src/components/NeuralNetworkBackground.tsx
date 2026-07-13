import { useEffect, useRef } from "react";

/**
 * Signature hero background: a living neural network.
 * - Nodes drift slowly; edges form between close nodes.
 * - The cursor acts as a "stimulus": nearby nodes lean toward it and
 *   their synapses brighten.
 * - Signal pulses (activations) periodically fire and travel along
 *   currently-active edges with a cyan glow.
 * - Honors prefers-reduced-motion by rendering a single static frame.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0..1 — parallax-ish visual depth (size + alpha)
}

interface Pulse {
  from: Node;
  to: Node;
  t: number; // 0..1 progress along the edge
  speed: number;
}

const EMERALD = "52, 211, 153";
const CYAN = "34, 211, 238";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let rafId = 0;
    let lastFire = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const CONNECT_DIST = 170;
    const MOUSE_RADIUS = 220;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const init = () => {
      const count = width < 768 ? 45 : 110;
      nodes = [];
      pulses = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1 + depth * 1.8,
          depth,
        });
      }
    };

    const step = (node: Node) => {
      node.x += node.vx;
      node.y += node.vy;

      // Gentle attraction toward the cursor for nearby nodes.
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const pull = (1 - dist / MOUSE_RADIUS) * 0.02;
          node.x += (dx / dist) * pull * 14;
          node.y += (dy / dist) * pull * 14;
        }
      }

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      node.x = Math.min(Math.max(node.x, 0), width);
      node.y = Math.min(Math.max(node.y, 0), height);
    };

    const drawFrame = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const activeEdges: Array<[Node, Node, number]> = [];

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reducedMotion) step(a);

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const closeness = 1 - dist / CONNECT_DIST;

            // Synapses near the cursor glow brighter.
            let boost = 0;
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x;
              const my = (a.y + b.y) / 2 - mouse.y;
              const md = Math.hypot(mx, my);
              if (md < MOUSE_RADIUS) boost = (1 - md / MOUSE_RADIUS) * 0.35;
            }

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${EMERALD}, ${0.16 * closeness + boost})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            activeEdges.push([a, b, closeness]);
          }
        }

        // Node body — deeper nodes are smaller & dimmer.
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${EMERALD}, ${0.25 + a.depth * 0.45})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        // Fire a new activation pulse every ~700ms along a random live edge.
        if (now - lastFire > 700 && activeEdges.length > 0 && pulses.length < 7) {
          const [from, to] = activeEdges[Math.floor(Math.random() * activeEdges.length)];
          pulses.push({ from, to, t: 0, speed: 0.012 + Math.random() * 0.015 });
          lastFire = now;
        }

        // Draw traveling activations with a soft cyan glow.
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          p.t += p.speed;
          const x = p.from.x + (p.to.x - p.from.x) * p.t;
          const y = p.from.y + (p.to.y - p.from.y) * p.t;
          const fade = Math.sin(Math.PI * Math.min(p.t, 1)); // ease in/out

          const glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
          glow.addColorStop(0, `rgba(${CYAN}, ${0.85 * fade})`);
          glow.addColorStop(1, `rgba(${CYAN}, 0)`);
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fade})`;
          ctx.fill();
        }
      }
    };

    const animate = (now: number) => {
      drawFrame(now);
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    resize();
    if (reducedMotion) {
      drawFrame(0); // single static frame
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-70"
    />
  );
}
