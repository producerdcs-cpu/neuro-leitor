import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
}

interface Edge {
  from: number;
  to: number;
}

export default function BioneuralEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animRef = useRef<number>(0);
  const [metrics, setMetrics] = useState({
    activations: 0,
    latency: 12,
    throughput: 0,
    accuracy: 97.4,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = 320;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 28;
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 3 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;

    const edges: Edge[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 120) {
          edges.push({ from: i, to: j });
        }
      }
    }
    edgesRef.current = edges;

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.04;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      for (const e of edges) {
        const a = nodes[e.from];
        const b = nodes[e.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 140) continue;
        const alpha = 1 - dist / 140;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 245, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const n of nodes) {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${0.15 * glow})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, "#00f5ff");
        grad.addColorStop(1, "#bf00ff");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (frame % 60 === 0) {
        setMetrics({
          activations: Math.floor(80 + Math.random() * 40),
          latency: Math.floor(8 + Math.random() * 10),
          throughput: Math.floor(1200 + Math.random() * 400),
          accuracy: +(96.5 + Math.random() * 2.5).toFixed(1),
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-cyan-300 font-display tracking-wide">
            Motor Bioneural
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Rede neural animada — simulação de ativação em tempo real
          </p>
        </div>
        <Badge variant="success" className="animate-pulse-neon">
          <Activity className="h-3 w-3 mr-1" />
          Online
        </Badge>
      </div>

      <div className="card-glow overflow-hidden relative">
        <canvas ref={canvasRef} className="w-full block" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-400" />
          <span className="text-xs text-zinc-400 font-mono">Bioneural Core v1.0</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            icon: Zap,
            label: "Ativações/s",
            value: metrics.activations,
            unit: "",
            color: "text-cyan-400",
          },
          {
            icon: Cpu,
            label: "Latência",
            value: metrics.latency,
            unit: "ms",
            color: "text-purple-400",
          },
          {
            icon: Activity,
            label: "Throughput",
            value: metrics.throughput,
            unit: " tok/s",
            color: "text-green-400",
          },
          {
            icon: Brain,
            label: "Acurácia",
            value: metrics.accuracy,
            unit: "%",
            color: "text-pink-400",
          },
        ].map((m) => (
          <motion.div
            key={m.label}
            className="card-glow p-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
              <span className="text-xs text-zinc-500">{m.label}</span>
            </div>
            <p className={`text-xl font-bold font-mono ${m.color}`}>
              {m.value}
              <span className="text-sm font-normal text-zinc-500">{m.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <div className="card-glow p-4 space-y-3">
        <p className="text-sm font-medium text-zinc-300">Camadas ativas</p>
        {[
          { name: "Encoder Visual (ViT)", load: 72 },
          { name: "Encoder Áudio (Whisper-like)", load: 45 },
          { name: "Encoder Texto (Transformer)", load: 88 },
          { name: "Fusion Multimodal", load: 61 },
          { name: "Decoder / TTS", load: 33 },
        ].map((layer) => (
          <div key={layer.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">{layer.name}</span>
              <span className="text-cyan-400 font-mono">{layer.load}%</span>
            </div>
            <Progress value={layer.load} />
          </div>
        ))}
      </div>
    </div>
  );
}
