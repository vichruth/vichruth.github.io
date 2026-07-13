import { Code2, BrainCircuit, Cpu, Network, CheckCircle2 } from "lucide-react";
import { skillCategories } from "../data";
import SectionHeading from "./SectionHeading";

export default function SpecsBento() {
  // Direct mapping of icon string to Lucide React component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="h-5 w-5 text-emerald-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="h-5 w-5 text-purple-400" />;
      case "Cpu":
        return <Cpu className="h-5 w-5 text-blue-400" />;
      case "Network":
        return <Network className="h-5 w-5 text-amber-400" />;
      default:
        return <Code2 className="h-5 w-5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6" id="specs-bento-container">
      <SectionHeading
        layer="03"
        layerName="Tech Specs"
        title="The toolchain."
        gradientWord="toolchain"
        description="Languages, deep learning frameworks, and embedded platform libraries — the granular breakdown, tuned for edge execution."
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
        
        {/* Core AI/ML Skill Card - Large Span (8 cols) */}
        <div className="md:col-span-8 rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all" />
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-900/30">
                {getIcon("BrainCircuit")}
              </div>
              <div>
                <h5 className="font-sans text-lg font-bold text-zinc-200">
                  {skillCategories[1].title}
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-purple-400 font-bold">Deep Learning Models & CV</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories[1].skills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-3.5 rounded-xl border border-zinc-900/60 bg-zinc-950 hover:bg-zinc-900/20 transition-all"
                  id={`skill-ai-${index}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-sans font-semibold text-xs text-zinc-300">{skill.name}</span>
                    {skill.vibe && (
                      <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-purple-950/40 text-purple-400 border border-purple-900/30 font-bold uppercase">
                        {skill.vibe}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-[10px] text-zinc-500 leading-normal">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages Card - Sleeker Accent Column (4 cols) */}
        <div className="md:col-span-4 rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/30">
                {getIcon("Code2")}
              </div>
              <div>
                <h5 className="font-sans text-lg font-bold text-zinc-200">
                  {skillCategories[0].title}
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Execution Stack</span>
              </div>
            </div>

            <div className="space-y-4">
              {skillCategories[0].skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-3 rounded-xl border border-zinc-900/60 bg-zinc-950 hover:bg-zinc-900/20 transition-all"
                  id={`skill-lang-${index}`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-sans font-semibold text-xs text-zinc-200">{skill.name}</span>
                    <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase">{skill.vibe}</span>
                  </div>
                  <p className="font-sans text-[10px] text-zinc-500 leading-normal">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900 font-sans text-[11px] text-zinc-600 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/70" /> High proficiency in Python & C++ low-level logic.
          </div>
        </div>

        {/* Tooling and Libraries Card (6 cols) */}
        <div className="md:col-span-6 rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/30">
                {getIcon("Cpu")}
              </div>
              <div>
                <h5 className="font-sans text-lg font-bold text-zinc-200">
                  {skillCategories[2].title}
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-blue-400 font-bold">Data, Vision & OS Engine</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillCategories[2].skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-xl border border-zinc-900/50 bg-zinc-950 hover:bg-zinc-900/15 transition-all"
                  id={`skill-tool-${index}`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="font-sans font-semibold text-xs text-zinc-300">{skill.name}</strong>
                    {skill.vibe && (
                      <span className="font-mono text-[7.5px] px-1 py-0.2 rounded bg-blue-950/40 text-blue-400 font-semibold">{skill.vibe}</span>
                    )}
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500">{skill.context}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Web Backends Card (6 cols) */}
        <div className="md:col-span-6 rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-all" />
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/30">
                {getIcon("Network")}
              </div>
              <div>
                <h5 className="font-sans text-lg font-bold text-zinc-200">
                  {skillCategories[3].title}
                </h5>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold">API & Framework Infrastructure</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillCategories[3].skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-xl border border-zinc-900/50 bg-zinc-950 hover:bg-zinc-900/15 transition-all"
                  id={`skill-framework-${index}`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="font-sans font-semibold text-xs text-zinc-300">{skill.name}</strong>
                    <span className="font-mono text-[7.5px] px-1 py-0.2 rounded bg-amber-950/40 text-amber-400 font-semibold">{skill.vibe}</span>
                  </div>
                  <span className="font-sans text-[10px] text-zinc-500">{skill.context}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-zinc-900 font-mono text-[10px] text-zinc-600">
            * Serves complex neural inferences on edge servers via lightweight REST models.
          </div>
        </div>

      </div>
    </div>
  );
}
