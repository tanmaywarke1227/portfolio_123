"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { BrainCircuit, Database, Code2, Orbit, Cpu, Wrench, Pause, Play, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

const categories = [
  { key: "aiMl", label: "AI / ML", icon: BrainCircuit, related: ["data", "web", "embedded"] },
  { key: "data", label: "Data", icon: Database, related: ["aiMl", "web"] },
  { key: "web", label: "Web", icon: Code2, related: ["data", "threeD", "aiMl"] },
  { key: "threeD", label: "3D / Creative", icon: Orbit, related: ["web", "tools"] },
  { key: "embedded", label: "Embedded / IoT", icon: Cpu, related: ["aiMl", "tools"] },
  { key: "tools", label: "Tools", icon: Wrench, related: ["web", "embedded", "threeD"] },
] as const;

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { margin: "100px" });
  const selected = active === null ? null : categories[active];
  const stopped = paused || active !== null || !inView;

  return (
    <section id="skills" className="relative section-padding" aria-labelledby="stack-title">
      <div className="max-w-6xl mx-auto reading-zone">
        <div className="stack-heading">
          <div><p className="text-section-label mb-4">Technical Stack</p><h2 id="stack-title" className="text-section-title">A connected toolkit.</h2></div>
          <p>Six disciplines. A focused set of tools.<br />Explore how they work together.</p>
        </div>
        <div ref={panelRef} className="stack-panel" data-paused={stopped} onKeyDown={(event) => { if (event.key === "Escape") setActive(null); }}>
          <div className="stack-orbit" aria-label="Explore skill categories">
            <div className="stack-ring stack-ring-inner" aria-hidden="true" />
            <div className="stack-center" aria-hidden="true"><span>ENGINEERING</span><strong>STACK</strong><span>06 DISCIPLINES</span></div>
            <div className="stack-rotor">
              {categories.map((category, index) => {
                const angle = index * Math.PI / 3 - Math.PI / 2;
                const Icon = category.icon;
                const related = selected?.related.some((key) => key === category.key);
                return (
                  <div key={category.key} className="stack-position" style={{ "--node-x": `${50 + 39 * Math.cos(angle)}%`, "--node-y": `${50 + 39 * Math.sin(angle)}%` } as CSSProperties}>
                    <button type="button" className="stack-node" data-active={active === index} data-related={related || false} aria-expanded={active === index} aria-controls="stack-details" onClick={() => setActive(active === index ? null : index)}>
                      <Icon size={21} strokeWidth={1.4} /><span>{category.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
            <button type="button" className="stack-play" onClick={() => setPaused(!paused)} aria-pressed={paused}>
              {paused ? <Play size={13} /> : <Pause size={13} />} {paused ? "Resume orbit" : "Pause orbit"}
            </button>
          </div>
          <div className="stack-details" id="stack-details" aria-live="polite">
            <div className="stack-detail-heading"><span className="text-section-label">{selected ? "Selected discipline" : "Explore the stack"}</span>{selected && <button type="button" aria-label="Return to orbital overview" onClick={() => setActive(null)}><X size={18} /></button>}</div>
            {selected ? <>
              <h3>{selected.label}</h3>
              <ul className="stack-technologies">{portfolioData.skills[selected.key].map((skill) => <li key={skill}>{skill}</li>)}</ul>
              <p className="text-section-label mt-8 mb-3">Works with</p>
              <div className="stack-related">{categories.filter((category) => selected.related.some((key) => key === category.key)).map((category) => <button type="button" key={category.key} onClick={() => setActive(categories.indexOf(category))}>{category.label}<ArrowUpRight size={13} /></button>)}</div>
            </> : <>
              <h3>From data<br />to interaction.</h3>
              <p className="stack-intro">Select a discipline to explore its core technologies and connections.</p>
              <div className="stack-index">{categories.map((category, index) => <button type="button" key={category.key} onClick={() => setActive(index)}><span>0{index + 1}</span>{category.label}<ArrowUpRight size={15} /></button>)}</div>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}
