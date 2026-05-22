import * as React from "react";
import { Mail, Linkedin, Github, FileText, Check, Copy, ExternalLink, Cpu } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = React.useState<boolean>(false);
  const emailAddress = "vichruth.victorious@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pb-16 pt-12 text-zinc-500 font-sans" id="contact">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Contact CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-zinc-900">
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-sans text-3xl font-bold tracking-tight text-zinc-100">
              Let's talk specs.
            </h3>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Seeking research partnerships, Edge-AI consulting opportunities, or Machine Learning roles starting now. Reach out to coordinate live compiler benchmarks.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row gap-4 sm:justify-end">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 px-5 py-3.5 text-zinc-200 transition-all font-semibold text-xs active:scale-95 cursor-pointer shadow-sm relative group"
              id="footer-btn-email"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>Copy vichruth.victorious@gmail.com</span>
                  <Copy className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </>
              )}
            </button>

            {/* LinkedIn External Link */}
            <a
              href="https://linkedin.com/in/vichruthm9099"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-zinc-950 hover:bg-emerald-400 hover:text-zinc-950 px-5 py-3.5 transition-all font-semibold text-xs active:scale-95 shadow-sm"
              id="footer-link-linkedin"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4 text-xs">
          
          <div className="space-y-3.5 text-left">
            <h5 className="font-mono text-[10px] font-bold text-zinc-300 tracking-wider uppercase">Pipeline Node</h5>
            <ul className="space-y-2">
              <li>
                <a href="#experience" className="hover:text-zinc-300 transition-colors">Professional Experience</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-zinc-300 transition-colors">Project Portfolio</a>
              </li>
              <li>
                <a href="#specs" className="hover:text-zinc-300 transition-colors">Technical Specs</a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-zinc-300 transition-colors">Interactive Simulator</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5 text-left">
            <h5 className="font-mono text-[10px] font-bold text-zinc-300 tracking-wider uppercase">Direct Anchors</h5>
            <ul className="space-y-2">
              <li>
                <a href="https://linkedin.com/in/vichruthm9099" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="hover:text-zinc-300 transition-colors flex items-center gap-1">LinkedIn Profile <ExternalLink className="h-2.5 w-2.5 text-zinc-650" /></a>
              </li>
              <li>
                <a href="https://github.com/vichruth" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="hover:text-zinc-300 transition-colors flex items-center gap-1">GitHub Space <ExternalLink className="h-2.5 w-2.5 text-zinc-650" /></a>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5 text-left">
            <h5 className="font-mono text-[10px] font-bold text-zinc-300 tracking-wider uppercase">Core Specialty</h5>
            <div className="text-[11px] text-zinc-500 leading-relaxed max-w-xs">
              Optimizing heavyweight convolutional neural networks and state-of-the-art visual transformers for strict on-device embedded platforms.
            </div>
          </div>

          <div className="space-y-3.5 text-left">
            <h5 className="font-mono text-[10px] font-bold text-zinc-200 tracking-wider uppercase flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-emerald-400" /> Edge Engine Ready
            </h5>
            <div className="text-[11px] text-zinc-500 leading-relaxed max-w-xs">
              Natively quantizing deep weights from standard FP32 to low latency memory matrices (FP16 / INT8).
            </div>
          </div>

        </div>

        {/* Legal / Site Info Footnotes */}
        <div className="pt-8 border-t border-zinc-900 text-[11px] text-zinc-600 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="text-zinc-500">
              Copyright © 2026 Vichruth M. All rights reserved. Deployed with precision casting.
            </p>
            <p className="text-[10px] text-zinc-600">
              Optimized for resource-constrained clients on modern browsers. Zero tracking cookies, offline-first.
            </p>
          </div>
          
          <div className="flex gap-4 font-mono text-[10px] text-zinc-600">
            <span>PLATFORM: REACT + TSX</span>
            <span>MEM: INT8 READY</span>
            <span>SHIELDS: SECURE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
