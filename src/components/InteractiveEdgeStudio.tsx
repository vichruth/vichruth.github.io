import * as React from "react";
import { Cpu, Zap, Activity, HardDrive, ShieldAlert, BadgeCheck, Sliders, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ModelConfig {
  name: string;
  type: string;
  baseSizeGB: number; // in FP32
  baseAccuracy: number; // in %
  baseFPS: number; // in 1080p
  description: string;
}

const MODELS: ModelConfig[] = [
  {
    name: "TransReID (Pedestrian Identification)",
    type: "Computer Vision / Transformer",
    baseSizeGB: 11.4,
    baseAccuracy: 95.8,
    baseFPS: 18,
    description: "SOTA TransReID architecture deployed for surveillance tracking under edge nodes (IIIT Kottayam focus)."
  },
  {
    name: "NeuroLog (Multimodal Search)",
    type: "Zero-Shot Video Encoder",
    baseSizeGB: 10.2,
    baseAccuracy: 92.1,
    baseFPS: 24,
    description: "Temporal vision pipeline using CLIP embeddings and a local FAISS database (6GB hardware constraint)."
  },
  {
    name: "CodeT5 (Low-Parameter Bug Fixer)",
    type: "Transformer Code Assistant",
    baseSizeGB: 5.8,
    baseAccuracy: 89.2,
    baseFPS: 45,
    description: "Fine-tuned code repair system running in local inference using PEFT / LoRA (VIT Research)."
  },
  {
    name: "NIKI-LAUDA-AI (Telemetry LSTM)",
    type: "Time-Series Neural Predictor",
    baseSizeGB: 2.1,
    baseAccuracy: 97.4,
    baseFPS: 502,
    description: "Continuous PyTorch LSTM evaluating 50Hz binary C-struct telemetry packets in high-frequency loops."
  }
];

export default function InteractiveEdgeStudio() {
  const [selectedModel, setSelectedModel] = React.useState<ModelConfig>(MODELS[0]);
  const [precision, setPrecision] = React.useState<"FP32" | "FP16" | "INT8">("FP16");
  const [hardwareVram, setHardwareVram] = React.useState<number>(6); // Default matching NeuroLog limit
  const [resolution, setResolution] = React.useState<"224px" | "512px" | "1080p">("512px");
  const [isCompiling, setIsCompiling] = React.useState<boolean>(false);
  const [runsActive, setRunsActive] = React.useState<boolean>(true);
  const [jitterTime, setJitterTime] = React.useState<number>(0);

  // Simulated continuous performance oscillation (real telemetry loop feel!)
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runsActive) {
      interval = setInterval(() => {
        setJitterTime((prev) => (prev + 1) % 100);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [runsActive]);

  // Calculations
  const precisionMultiplier = precision === "FP32" ? 1.0 : precision === "FP16" ? 0.48 : 0.23;
  const resolutionMultiplier = resolution === "224px" ? 0.35 : resolution === "512px" ? 0.75 : 1.5;

  // Compute actual size
  const rawSize = selectedModel.baseSizeGB * precisionMultiplier * (resolution === "1080p" ? 1.15 : resolution === "512px" ? 0.95 : 0.75);
  const finalSize = Math.max(0.6, parseFloat(rawSize.toFixed(2)));

  // OOM State
  const isOutOfMemory = finalSize > hardwareVram;

  // Compute performance factors
  const speedDivider = precisionMultiplier * resolutionMultiplier;
  const baseFPSMultiplier = precision === "FP32" ? 1.0 : precision === "FP16" ? 2.1 : 3.8;
  const resolutionSpeedMult = resolution === "224px" ? 2.8 : resolution === "512px" ? 1.2 : 0.6;
  
  const rawFPS = isOutOfMemory ? 0 : selectedModel.baseFPS * baseFPSMultiplier * resolutionSpeedMult;
  const jitterVal = rawFPS > 0 ? (Math.sin(jitterTime) * (rawFPS * 0.02)) : 0;
  const finalFPS = rawFPS > 0 ? Math.max(1, Math.round(rawFPS + jitterVal)) : 0;

  const latencyMs = finalFPS > 0 ? parseFloat((1000 / finalFPS).toFixed(1)) : 0;

  // Compute accuracy loss
  const accuracyLoss = precision === "FP32" ? 0.0 : precision === "FP16" ? -0.15 : -1.65;
  const finalAccuracy = isOutOfMemory ? 0 : Math.max(10, parseFloat((selectedModel.baseAccuracy + accuracyLoss).toFixed(1)));

  // Compilation trigger
  const triggerCompilation = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all shadow-2xl relative overflow-hidden" id="edge-studio-root">
      {/* Radiant ambient glow in corner */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-900 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-950/40 border border-emerald-900/30 px-3 py-1 mb-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOutOfMemory ? "bg-red-400" : "bg-emerald-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOutOfMemory ? "bg-red-500" : "bg-emerald-500"}`}></span>
            </span>
            <span className="font-mono text-[9px] font-semibold text-emerald-400 tracking-wider">
              {isOutOfMemory ? "CRITICAL: OOM WARNING" : "EDGE DEVICE STABLE"}
            </span>
          </div>
          <h3 className="font-sans text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" /> Edge AI Optimization Studio
          </h3>
          <p className="font-sans text-sm text-zinc-500 mt-1 max-w-xl">
            Simulate precision quantization, resolution scaling, and local memory budgets. Experience how Vichruth balances hardware boundaries to prevent out-of-memory errors natively.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setPrecision("FP16");
              setHardwareVram(6);
              setResolution("512px");
            }}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-900 bg-zinc-900/40 px-3 py-1.5 font-mono text-[11px] text-zinc-400 hover:text-zinc-200 transition-all active:scale-95 cursor-pointer"
            title="Reset to default NeuroLog 6GB settings"
            id="sim-btn-reset"
          >
            <RotateCcw className="h-3 w-3" /> Reset 6GB Baseline
          </button>
          
          <button
            onClick={triggerCompilation}
            disabled={isCompiling}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 px-4.5 py-1.5 font-sans font-semibold text-xs text-zinc-950 transition-all active:scale-95 cursor-pointer"
            id="sim-btn-compile"
          >
            <Play className={`h-3.5 w-3.5 ${isCompiling ? "animate-spin" : ""}`} /> 
            {isCompiling ? "Compiling Layers..." : "Compile to Edge Device"}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <h4 className="font-mono text-xs font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-2 mb-2">
            <Sliders className="h-3.5 w-3.5 text-zinc-500" /> Controls & Inputs
          </h4>

          {/* Model Selector */}
          <div>
            <label className="block font-sans text-xs font-medium text-zinc-400 mb-2">
              Select Neural Network Task
            </label>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedModel(m)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col justify-start relative overflow-hidden cursor-pointer ${
                    selectedModel.name === m.name
                      ? "border-emerald-500/70 bg-emerald-950/10 text-emerald-100"
                      : "border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 text-zinc-400"
                  }`}
                  id={`model-select-${m.name.split(' ')[0]}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-sans font-semibold text-xs tracking-tight">{m.name}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/60">{m.type.split('/')[0]}</span>
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500 mt-1 lines-clamp-1">{m.description}</span>
                  {selectedModel.name === m.name && (
                    <div className="absolute right-0 bottom-0 top-0 w-1 bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-900" />

          {/* Quantization Level (Precision) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-sans text-xs font-medium text-zinc-400">
                Precision Casting (Quantization)
              </label>
              <span className="font-mono text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-900/40">
                {precision === "FP32" ? "Double Memory" : precision === "FP16" ? "48% Compression" : "77% Tiny Quantization"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["FP32", "FP16", "INT8"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPrecision(p)}
                  className={`p-2.5 rounded-lg border font-mono text-xs font-semibold tracking-wider text-center transition-all cursor-pointer ${
                    precision === p
                      ? "border-emerald-400 bg-emerald-950/20 text-emerald-400"
                      : "border-zinc-950 bg-zinc-900/40 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300"
                  }`}
                  id={`precision-select-${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Target Resolution Scaling */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-sans text-xs font-medium text-zinc-400">
                Input Matrix Dimension Scaling
              </label>
              <span className="font-mono text-[10px] text-zinc-500">
                {resolution === "224px" ? "224 x 224 (Dense CV)" : resolution === "512px" ? "512 x 512 (Balanced Model)" : "1080p Stream (Heavy Pixel Dense)"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "224px", label: "224x224" },
                { value: "512px", label: "512x512" },
                { value: "1080p", label: "1080p Stream" }
              ].map((res) => (
                <button
                  key={res.value}
                  onClick={() => setResolution(res.value as any)}
                  className={`p-2 rounded-lg border font-sans text-xs transition-all cursor-pointer ${
                    resolution === res.value
                      ? "border-blue-400 bg-blue-950/20 text-blue-400"
                      : "border-zinc-950 bg-zinc-900/40 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300"
                  }`}
                  id={`resolution-select-${res.value}`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>

          {/* VRAM Limit */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-sans text-xs font-medium text-zinc-400">
                Edge Board Hardware VRAM Limit
              </label>
              <span className="font-mono text-xs font-semibold text-zinc-300">
                {hardwareVram} GB RAM
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={16}
              step={1}
              value={hardwareVram}
              onChange={(e) => setHardwareVram(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer text-emerald-500 h-1.5 rounded-lg bg-zinc-900"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
              <span>2GB (TinyML Node)</span>
              <span>6GB (Vichruth Baseline)</span>
              <span>16GB (Pro Edge AI Jetson)</span>
            </div>
          </div>

        </div>

        {/* Console / Diagnostics Grid Output */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-mono text-xs font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-2 mb-2">
              <Activity className="h-3.5 w-3.5 text-zinc-500" /> Hardware Telemetry & KPIs
            </h4>

            {/* Performance KPIs Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* VRAM Footprint Gauge */}
              <div className={`p-4 rounded-xl border ${isOutOfMemory ? "border-red-900/60 bg-red-950/5 text-red-100" : "border-zinc-900 bg-zinc-900/20"}`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-xs text-zinc-500 flex items-center gap-1">
                    <HardDrive className="h-3.5 w-3.5 text-zinc-400" /> Memory Footprint
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/40">VRAM</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className={`font-mono text-2xl font-bold ${isOutOfMemory ? "text-red-400" : "text-zinc-100"}`}>
                    {finalSize}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">GB</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${isOutOfMemory ? "bg-red-500" : "bg-emerald-500"}`} 
                    style={{ width: `${Math.min(100, (finalSize / hardwareVram) * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-zinc-600 mt-1 block">
                  Budget: {hardwareVram} GB
                </span>
              </div>

              {/* Real-time speed FPS */}
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-xs text-zinc-500 flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-emerald-400" /> Frame Rate (Inference)
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/40">FPS</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-mono text-2xl font-bold text-emerald-400">
                    {finalFPS}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">itr/sec</span>
                </div>
                <span className="font-sans text-[10px] text-zinc-400 mt-2 block">
                  Simulated Latency: <strong className="font-mono text-zinc-200">{latencyMs} ms</strong>
                </span>
              </div>

              {/* Engine Accuracy */}
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-xs text-zinc-500 flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-blue-400" /> Relative Accuracy
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/40">mAP</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-mono text-2xl font-bold text-blue-400">
                    {finalAccuracy}%
                  </span>
                </div>
                <span className="font-sans text-[10px] text-zinc-400 mt-2 block overflow-hidden text-ellipsis whitespace-nowrap">
                  Accuracy Loss: <strong className="font-mono text-zinc-200">{accuracyLoss === 0 ? "None" : `${accuracyLoss}%`}</strong>
                </span>
              </div>

              {/* Device Temperature */}
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-xs text-zinc-500">Device Thermal State</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-900">Core TEMP</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className={`font-mono text-2xl font-bold ${
                    finalFPS > 300 ? "text-orange-400" : finalFPS > 40 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {isOutOfMemory ? "28.1" : (34.0 + (finalFPS * 0.08) + (precision === "FP32" ? 5 : 0)).toFixed(1)}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">°C</span>
                </div>
                <span className="font-sans text-[10px] text-zinc-400 mt-2 block">
                  Status: <strong className="text-zinc-200">{finalFPS > 200 ? "Active Cooling High" : "Passive Fan Stable"}</strong>
                </span>
              </div>
            </div>

            {/* Simulated Live Frame Feed Output (Aesthetic Sandbox UI) */}
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 font-mono text-[11px] h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-zinc-900 px-2 py-0.5 rounded text-[9px] text-zinc-500 border border-zinc-800/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> INTERACTIVE STREAM FEED
              </div>

              <AnimatePresence mode="wait">
                {isOutOfMemory ? (
                  <motion.div
                    key="oom-err"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-red-400 space-y-1.5"
                  >
                    <ShieldAlert className="h-8 w-8 text-red-500 animate-bounce" />
                    <span className="font-bold tracking-wider text-xs">SIGKILL: OUT_OF_MEMORY EXCEPTION</span>
                    <span className="text-[10px] text-zinc-500 text-center max-w-sm">Model weights ({finalSize} GB) exceeds total edge platform memory limit allocation ({hardwareVram} GB). Apply Quantization or scale back resolution inputs.</span>
                  </motion.div>
                ) : isCompiling ? (
                  <motion.div
                    key="compiling"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-2"
                  >
                    <div className="h-5 w-5 rounded-full border-t border-r border-emerald-400 animate-spin" />
                    <span>Allocating memory pages and loading model weights into VRAM...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="feed-active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full text-zinc-400 text-left relative"
                  >
                    <div className="space-y-1">
                      <div className="text-zinc-500">// Terminal Local Ingestion Loop</div>
                      <div className="text-emerald-500">
                        {selectedModel.name === "TransReID (Pedestrian Identification)" && (
                          <span>&gt; Ingesting Frame feed [{resolution}]... Detected Pedestrian ID: TransReID-1054 with precision score: 0.941</span>
                        )}
                        {selectedModel.name === "NeuroLog (Multimodal Search)" && (
                          <span>&gt; Mapping frame features [FAISS Vector Engine]... Queries resolved in {(85 + (jitterVal) * 0.2).toFixed(1)}ms with cosine distance: 0.812</span>
                        )}
                        {selectedModel.name === "CodeT5 (Low-Parameter Bug Fixer)" && (
                          <span>&gt; Parsing abstract syntax tree (AST)... Tokenizing lines finished. Syntax Bug Found in models/lora.py Line 45!</span>
                        )}
                        {selectedModel.name === "NIKI-LAUDA-AI (Telemetry LSTM)" && (
                          <span>&gt; Streaming UDP Binary struct socket... Tyre Wear Degm coeff: 4.8124 | Slip angle target matching: [Active Track]</span>
                        )}
                      </div>
                      
                      <div className="text-zinc-600 mt-1 flex gap-2">
                        <span>[CUDA Devices: Active]</span>
                        <span>[Precision: {precision}]</span>
                        <span>[FPS: {finalFPS}]</span>
                        <span>[Tubes: Normal]</span>
                      </div>
                    </div>

                    <div className="flex border-t border-zinc-900 pt-2 text-[10px] text-zinc-500 justify-between">
                      <span>Weights Loaded Successfully at FP16</span>
                      <span className="text-zinc-400 hover:text-white transition-all cursor-pointer hover:underline" onClick={() => setRunsActive(!runsActive)}>
                        {runsActive ? "■ PAUSE TELEMETRY" : "▶ RESUME TELEMETRY"}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <p className="text-[11px] font-sans text-zinc-600 mt-4 italic text-center">
            How this matches Vichruth's expertise: Vichruth fine-tunes low-parameter models (PEFT) and quantizes neural weights so bulky transformer algorithms run comfortably inside edge microcontrollers and limited VRAM budgets.
          </p>
        </div>

      </div>
    </div>
  );
}
