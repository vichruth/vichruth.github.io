import { BookOpen, GraduationCap, Award, Calendar, Milestone, ShieldCheck } from "lucide-react";
import { educations, awards } from "../data";
import SectionHeading from "./SectionHeading";

export default function EducationAwards() {
  return (
    <div className="space-y-10" id="education-awards-section">
      <SectionHeading
        layer="05"
        layerName="Education & Honors"
        title="Credentials & recognition."
        gradientWord="recognition"
        description="B.Tech at VIT Vellore, a first-author IEEE paper pending publication, a patent under review, and a trail of competition results."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Left Column: Education (6 cols) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-xs tracking-widest text-emerald-400 uppercase">
            Intellectual Assets
          </span>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-400" /> Academic Credentials
          </h3>
        </div>

        <div className="space-y-6">
          {educations.map((edu) => (
            <div 
              key={edu.id}
              className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 hover:border-zinc-800 transition-all shadow-md relative overflow-hidden group"
              id={`edu-card-${edu.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1.5">
                  <h4 className="font-sans text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {edu.institution}
                  </h4>
                  <p className="font-sans text-xs text-zinc-400 leading-normal font-medium">
                    {edu.degree}
                  </p>
                </div>
                
                {/* Huge Grade Box */}
                <div className="text-right p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 shrink-0 select-none">
                  <span className="font-mono text-[9px] text-zinc-500 block leading-none mb-0.5">{edu.gradeLabel}</span>
                  <strong className="font-mono text-base font-bold text-emerald-400 leading-none">
                    {edu.grade}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10.5px] font-sans text-zinc-500 mb-4 bg-zinc-900/10 py-1 px-2.5 rounded-md border border-zinc-900/40 w-fit">
                <Calendar className="h-3.5 w-3.5 text-zinc-600" /> {edu.period}
                <span className="h-2 w-px bg-zinc-800" />
                <span className="text-zinc-400">{edu.location}</span>
              </div>

              <ul className="space-y-2 text-zinc-400 text-xs">
                {edu.details.map((bullet, idx) => (
                  <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                    <span className="text-[10px] text-emerald-500 mt-1">■</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Awards & Patents (6 cols) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-xs tracking-widest text-emerald-400 uppercase">
            Distinction Log
          </span>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" /> Honors & Patents
          </h3>
        </div>

        <div className="space-y-4">
          {awards.map((awr) => (
            <div 
              key={awr.id}
              className="rounded-2xl border border-zinc-900 bg-zinc-950 p-5 hover:border-zinc-800 transition-all flex items-start gap-4 shadow-sm relative overflow-hidden group"
              id={`award-card-${awr.id}`}
            >
              {awr.badge && (
                <div className="absolute top-2 right-4 text-[8px] font-mono font-bold tracking-wider text-emerald-400/80 bg-emerald-950/20 border border-emerald-900/45 px-2 py-0.5 rounded">
                  {awr.badge}
                </div>
              )}

              <div className="p-3 bg-zinc-900/60 border border-zinc-850 rounded-xl group-hover:border-emerald-500/40 transition-colors shrink-0">
                {awr.id === "patent" ? (
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                ) : (
                  <Milestone className="h-5 w-5 text-emerald-400" />
                )}
              </div>

              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] text-zinc-550 block font-bold tracking-widest">
                  {awr.date}
                </span>
                <h4 className="font-sans text-base font-bold text-zinc-200">
                  {awr.title}
                </h4>
                <p className="font-sans text-xs text-zinc-400 font-medium">
                  {awr.sub}
                </p>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed pt-1 max-w-sm">
                  {awr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
}
