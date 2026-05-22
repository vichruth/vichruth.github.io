import { MapPin, Calendar, Briefcase, Zap, BadgeHelp } from "lucide-react";
import { experiences } from "../data";

export default function ExperienceTimeline() {
  return (
    <div className="space-y-8" id="experience-timeline-container">
      {/* Visual Header */}
      <div className="flex flex-col space-y-2 max-w-xl">
        <span className="font-semibold text-xs tracking-widest text-emerald-400 uppercase">
          Chronological Ingress
        </span>
        <h3 className="font-sans text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          Professional Log
        </h3>
        <p className="font-sans text-sm text-zinc-500">
          A review of research posts, industry internships, and product deployments translating AI logic into edge parameters.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-zinc-900 pl-6 sm:pl-8 space-y-12 py-4" id="timeline-scroll-axis">
        {experiences.map((exp) => (
          <div 
            key={exp.id} 
            className="relative group pr-0 transition-all rounded-3xl"
            id={`experience-node-${exp.id}`}
          >
            {/* Pulsing point icon on axis */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center transition-colors group-hover:border-emerald-400">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-emerald-400 transition-colors" />
            </div>

            {/* Content Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Details Column (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/40 px-2.5 py-0.5 rounded-full inline-block">
                  {exp.type}
                </span>
                
                <h4 className="font-sans text-xl font-bold text-zinc-200 tracking-tight group-hover:text-zinc-100 transition-colors">
                  {exp.company}
                </h4>
                
                <p className="font-sans text-sm text-zinc-400 font-medium leading-relaxed">
                  {exp.role}
                </p>

                <div className="flex flex-col space-y-1 pt-1.5 text-[11px] font-sans text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-600" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-600" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Middle Description Paragraph Bullet Column (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">
                  Responsibilities & Gains
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-400 leading-relaxed">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <span className="text-[10px] text-emerald-500 mt-1">■</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies used chips */}
                <div className="flex flex-wrap gap-1 pt-3">
                  {exp.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="font-mono text-[9px] text-zinc-500 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Performance Highlight Card (3 cols) */}
              <div className="lg:col-span-3 flex items-start lg:justify-end">
                {exp.highlightMetric && (
                  <div className="w-full lg:max-w-[200px] rounded-2xl border border-zinc-900 bg-zinc-900/20 p-4 flex flex-col justify-between hover:border-zinc-800 transition-all shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                       <Zap className="h-4 w-4 text-emerald-400" />
                       <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">Telemetry KPI</span>
                    </div>
                    <div>
                      <strong className="font-mono text-xl font-bold text-zinc-100 tracking-tight block">
                        {exp.highlightMetric.value}
                      </strong>
                      <span className="font-sans text-[10px] text-zinc-500 mt-1 block font-medium">
                        {exp.highlightMetric.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
