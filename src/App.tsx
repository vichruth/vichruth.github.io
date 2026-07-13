import * as React from "react";
import { ChevronDown, Cpu, Code, Brain, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Reveal from "./components/Reveal";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import SpecsBento from "./components/SpecsBento";
import InteractiveEdgeStudio from "./components/InteractiveEdgeStudio";
import EducationAwards from "./components/EducationAwards";
import Footer from "./components/Footer";
import NeuralNetworkBackground from "./components/NeuralNetworkBackground";
import SectionHeading from "./components/SectionHeading";

export default function App() {
  const heroRef = React.useRef<HTMLElement>(null);

  // Parallax: hero content drifts up and fades as it scrolls out of view.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400 selection:text-zinc-950">

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Apple-style sticky Glass Navbar */}
      <Navbar />

      {/* Hero: Unveiling Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden px-6 pt-16 pb-12"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <NeuralNetworkBackground />
        </motion.div>

        {/* Deep ambient grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Cinematic glow blobs */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-26 right-12 -z-10 h-72 w-72 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

        {/* Empty top height to push center down */}
        <div />

        {/* Content Box */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto max-w-7xl w-full text-center space-y-8 z-10"
        >

          {/* Open-to-work Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto inline-flex items-center space-x-2.5 rounded-full border border-emerald-900/60 bg-emerald-950/20 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              OPEN TO WORK · ML / CV RESEARCH · EDGE AI · AI AUTOMATION
            </span>
          </motion.div>

          {/* Name Display */}
          <div className="space-y-3.5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Vichruth M.
            </motion.h1>

            {/* Apple style product line */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mx-auto max-w-3xl font-sans text-xl font-semibold tracking-tight text-zinc-400 sm:text-2xl"
            >
              I make heavyweight AI models run on hardware that has{" "}
              <span className="text-gradient-synapse">no business running them</span>.
            </motion.h2>
          </div>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto max-w-2xl font-sans text-sm md:text-base text-zinc-500 leading-relaxed font-medium"
          >
            CSE undergrad at VIT Vellore with research internships at two national institutes (NIT Trichy, IIIT Kottayam), a first-author paper pending publication in an IEEE journal, and a live 24/7 production automation system for a real client. Most of my work happens inside a 6GB VRAM budget — my GPU and I have trust issues, but a working relationship.
          </motion.p>

          {/* Inline Specs Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2 font-mono text-[11px] tracking-wider text-zinc-400 select-none"
          >
            <div className="flex items-center space-x-1.5">
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              <span>&lt;6GB VRAM BUDGET</span>
            </div>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Code className="h-3.5 w-3.5 text-purple-400" />
              <span>IEEE PAPER PENDING</span>
            </div>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Brain className="h-3.5 w-3.5 text-blue-400" />
              <span>100% OFFLINE ON A PI</span>
            </div>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>24/7 PROD AUTOMATION</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll CTA Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="mx-auto flex flex-col items-center justify-center text-zinc-600 mt-12 z-10"
        >
          <span className="font-sans text-[10px] tracking-widest font-semibold uppercase mb-1">Scroll to inspect specs</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-emerald-400" />
        </motion.div>

      </section>

      {/* Spacing divider */}
      <div className="h-12 w-full border-t border-zinc-900 bg-zinc-950" />

      {/* Section: Professional Log (Experience) */}
      <section id="experience" className="bg-zinc-950 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <ExperienceTimeline />
          </Reveal>
        </div>
      </section>

      {/* Section: The Engineering Lineup (Projects) */}
      <section id="projects" className="bg-zinc-950 py-20 px-6 border-t border-zinc-900/60">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Projects />
          </Reveal>
        </div>
      </section>

      {/* Section: Technical Specifications (Bento Grid) */}
      <section id="specs" className="bg-zinc-950 py-20 px-6 border-t border-zinc-900/60">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SpecsBento />
          </Reveal>
        </div>
      </section>

      {/* Section: Interactive EdgeAI Studio Sandbox */}
      <section id="simulator" className="bg-zinc-950 py-20 px-6 border-t border-zinc-900/60 bg-[radial-gradient(#1f293708_1px,transparent_1px)] bg-[size:2rem_2rem]">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8">
            <SectionHeading
              layer="04"
              layerName="Edge Simulator"
              title="Try the trade-offs yourself."
              gradientWord="trade-offs"
              description="Interact with precision sliders and architecture metrics to feel the quantization trade-offs I work with daily — latency, memory, and accuracy under a hard hardware budget."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <InteractiveEdgeStudio />
          </Reveal>
        </div>
      </section>

      {/* Section: Education, Achievements & Honors */}
      <section id="education" className="bg-zinc-950 py-20 px-6 border-t border-zinc-900/60">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <EducationAwards />
          </Reveal>
        </div>
      </section>

      {/* Footer and Contact Handles */}
      <Footer />

    </div>
  );
}
