import * as React from "react";

/**
 * Unified section header with the site's neural-network identity:
 * every section is a "layer" of the network. A small synapse glyph,
 * a mono layer label (LAYER 02 · PROJECTS), a display title with an
 * optional gradient word, and a description.
 */

interface SectionHeadingProps {
  layer: string; // e.g. "02"
  layerName: string; // e.g. "PROJECTS"
  title: string;
  /** Word(s) inside `title` to render with the synapse gradient. */
  gradientWord?: string;
  description?: string;
  className?: string;
}

function SynapseGlyph() {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true" className="shrink-0">
      <line x1="4" y1="7" x2="17" y2="3" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
      <line x1="4" y1="7" x2="17" y2="11" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
      <line x1="17" y1="3" x2="30" y2="7" stroke="rgba(34,211,238,0.45)" strokeWidth="1" />
      <line x1="17" y1="11" x2="30" y2="7" stroke="rgba(34,211,238,0.45)" strokeWidth="1" />
      <circle cx="4" cy="7" r="2.4" fill="#34d399" />
      <circle cx="17" cy="3" r="2" fill="rgba(52,211,153,0.7)" />
      <circle cx="17" cy="11" r="2" fill="rgba(52,211,153,0.7)" />
      <circle cx="30" cy="7" r="2.4" fill="#22d3ee" />
    </svg>
  );
}

export default function SectionHeading({
  layer,
  layerName,
  title,
  gradientWord,
  description,
  className = "",
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!gradientWord || !title.includes(gradientWord)) return title;
    const [before, after] = title.split(gradientWord);
    return (
      <>
        {before}
        <span className="text-gradient-synapse">{gradientWord}</span>
        {after}
      </>
    );
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <SynapseGlyph />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
          Layer {layer} <span className="text-zinc-600">·</span>{" "}
          <span className="text-zinc-400">{layerName}</span>
        </span>
        <span className="hidden sm:block h-px flex-1 max-w-[160px] bg-gradient-to-r from-emerald-500/30 to-transparent" />
      </div>
      <h3 className="font-display text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {renderTitle()}
      </h3>
      {description && (
        <p className="font-sans text-sm text-zinc-500 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
