import * as React from "react";
import { Terminal, Cpu, FileCode2, Gauge, Shield, Layers, Copy, Check, Github, ExternalLink } from "lucide-react";
import { projects } from "../data";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>(projects[0].id);
  const [copied, setCopied] = React.useState<boolean>(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("Computer") || category.includes("Vision")) {
      return <Cpu className="h-4 w-4 text-purple-400" />;
    }
    if (category.includes("Generative") || category.includes("Privacy")) {
      return <Shield className="h-4 w-4 text-emerald-400" />;
    }
    if (category.includes("Telemetry") || category.includes("Prediction")) {
      return <Gauge className="h-4 w-4 text-blue-400" />;
    }
    return <Layers className="h-4 w-4 text-amber-400" />;
  };

  return (
    <div className="space-y-8" id="projects-container-root">
      {/* Intro */}
      <div className="flex flex-col space-y-2 md:max-w-xl">
        <span className="font-semibold text-xs tracking-widest text-emerald-400 uppercase">
          Autonomous Developments & Systems
        </span>
        <h3 className="font-sans text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          The Engineering Lineup
        </h3>
        <p className="font-sans text-sm text-zinc-500">
          Click on any project to inspect its mechanical architecture, optimization metrics, and localized source-code snippets.
        </p>
      </div>

      {/* Horizontal Tabs selector */}
      <div className="flex overflow-x-auto pb-3 gap-2 scrollbar-none border-b border-zinc-900" id="projects-horizontal-tabs">
        {projects.map((p) => {
          const isActive = p.id === selectedProjectId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProjectId(p.id);
                setCopied(false);
              }}
              className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-zinc-100 border-zinc-100 text-zinc-950 shadow-md"
                  : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
              }`}
              id={`project-tab-${p.id}`}
            >
              {getCategoryIcon(p.category)}
              {p.title}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Info + Code IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 focus-within:ring-0">
        
        {/* Project details card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/40 px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {selectedProject.category}
                </span>
                <h4 className="font-sans text-2xl font-bold text-zinc-100 tracking-tight">
                  {selectedProject.title}
                </h4>
                <p className="font-sans text-xs text-zinc-400 font-medium mt-1 leading-relaxed">
                  {selectedProject.subtitle}
                </p>
                <p className="font-sans text-sm text-zinc-500 mt-3 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Hardware / Engine Metrics Row */}
              <div className="grid grid-cols-3 gap-2.5 bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                {selectedProject.metrics.map((met, i) => (
                  <div key={i} className="text-left">
                    <span className="font-sans text-[10px] text-zinc-500 block leading-tight">{met.label}</span>
                    <strong className="font-mono text-xs font-bold text-zinc-200 mt-1 block">
                      {met.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Bullets List */}
              <div className="space-y-3.5 pt-2">
                <h5 className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-widest">
                  Key Accomplishments
                </h5>
                <ul className="space-y-2 text-zinc-400 text-xs">
                  {selectedProject.points.map((p, index) => (
                    <li key={index} className="flex items-start space-x-2.5 leading-relaxed">
                      <span className="text-[10px] text-emerald-500 mt-1">■</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] font-semibold text-zinc-400 px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800/60 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              {(selectedProject.githubUrl || selectedProject.demoUrl) && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 px-3 py-1.5 text-zinc-200 transition-all font-semibold text-[11px] active:scale-95"
                    >
                      <Github className="h-3.5 w-3.5" /> View Code
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 px-3 py-1.5 transition-all font-semibold text-[11px] active:scale-95"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Simulated Code Inspector (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl h-[420px]">
          
          {/* Header Bar */}
          <div className="flex h-11 items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4">
            <div className="flex items-center space-x-2">
              {/* Window buttons */}
              <div className="flex space-x-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/40" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/40" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/40" />
              </div>
              <span className="hidden sm:inline-block h-4 w-px bg-zinc-900" />
              {/* Tab Title */}
              <div className="flex items-center space-x-1 font-mono text-[11px] text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800/40">
                <FileCode2 className="h-3.5 w-3.5 text-blue-400" />
                <span>{selectedProject.codeHighlight?.filename || "statistics_model.json"}</span>
              </div>
            </div>

            {selectedProject.codeHighlight && (
              <button
                onClick={() => handleCopyCode(selectedProject.codeHighlight!.code)}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/60 px-3 py-1 text-zinc-400 hover:text-zinc-200 transition-all font-sans text-[11px] font-semibold cursor-pointer"
                id="btn-copy-code"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Code Window Body */}
          <div data-lenis-prevent className="flex-1 overflow-auto bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed relative scrollbar-thin">
            {/* Ambient terminal label */}
            <div className="absolute right-4 bottom-4 flex items-center space-x-1 text-[10px] text-zinc-700 pointer-events-none">
              <Terminal className="h-3 w-3" />
              <span>SOURCE INSPECTOR</span>
            </div>

            <AnimatePresence mode="wait">
              {selectedProject.codeHighlight ? (
                <motion.pre
                  key={`${selectedProject.id}-code`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-left text-zinc-300 relative select-text"
                >
                  <code>
                    {selectedProject.codeHighlight.code
                      .split("\n")
                      .map((line, idx) => (
                        <div key={idx} className="flex">
                          <span className="w-8 shrink-0 select-none text-right pr-3 text-zinc-700 text-[10px]">{idx + 1}</span>
                          <span className="whitespace-pre">{line || " "}</span>
                        </div>
                      ))}
                  </code>
                </motion.pre>
              ) : (
                <motion.div
                  key={`${selectedProject.id}-no-code`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-zinc-600 font-sans space-y-2"
                >
                  <Cpu className="h-8 w-8 text-zinc-700 animate-pulse" />
                  <span className="font-semibold text-xs text-zinc-400 font-mono">MODEL STRUCT SPEC READY</span>
                  <p className="text-[10px] text-zinc-500 max-w-sm text-center">
                    This module utilizes {selectedProject.title}'s highly-calibrated modeling vectors ({selectedProject.techStack.join(", ")}). Statistical weights and expanding classification matrix parameters are stored in secured edge databases.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
