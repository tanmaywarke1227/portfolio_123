"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Layers3, Minus } from "lucide-react";
import GlobalThreeD from "@/app/components/three/GlobalThreeD";

export default function Hero() {
  const [expanded, setExpanded] = useState(false);

  return <section id="home" className="processor-hero">
    <GlobalThreeD expanded={expanded} />
    <div className="hero-atmosphere" aria-hidden="true" />
    <div className="processor-hero-layout">
      <div className="processor-hero-copy">
        <div className="hero-introduction">
          <a className="hero-portrait" href="#about" aria-label="Get to know Tanmay Warke"
            onPointerMove={event => {
              if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--portrait-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 6}deg`);
              event.currentTarget.style.setProperty("--portrait-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 6}deg`);
            }}
            onPointerLeave={event => {
              event.currentTarget.style.setProperty("--portrait-x", "0deg");
              event.currentTarget.style.setProperty("--portrait-y", "0deg");
            }}>
            <Image src="/images/tanmay-portrait.jpeg" alt="Portrait of Tanmay Warke" width={2048} height={2048} sizes="(max-width: 380px) 160px, (max-width: 899px) 176px, 220px" preload />
            <span className="portrait-link-hint" aria-hidden="true">About me <ArrowUpRight size={14} /></span>
          </a>
          <p className="text-section-label hero-identity">AI/ML Engineer <span>&amp;</span><br />Software Engineer</p>
        </div>
        <h1 className="text-hero">TANMAY<span className="hero-outline">WARKE</span></h1>
        <p className="text-body-large mt-8 mb-10">I build intelligent systems where AI, computer vision, software and hardware meet.</p>
        <div className="flex flex-wrap gap-4"><a href="#projects" className="btn-primary">Explore my work <ArrowUpRight size={16} /></a><Link href="/resume.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">Resume ↗</Link></div>
      </div>
      <div id="processor-stage" className="processor-stage">
        <div className="processor-stage-top"><span>FORM / FUNCTION / INTELLIGENCE</span><span className="stage-cross">+</span></div>
        <div className="processor-callout"><span className="callout-line" />{expanded ? "Layers revealed" : "Anatomy of a system"}</div>
        <div className="processor-stage-bottom"><div><p>COMPUTATIONAL ASSEMBLY</p><span>Interactive concept study</span></div><button type="button" className="assembly-toggle" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <Minus size={16} /> : <Layers3 size={16} />}{expanded ? "Assemble" : "Explore layers"}</button></div>
        <p className="assembly-caption" aria-live="polite">{expanded ? "Substrate · silicon · interface — separated for inspection." : "Move your pointer to inspect. Scroll to reveal the layers."}</p>
      </div>
    </div>
    <a href="#about" className="hero-next"><ArrowDown size={15} /><span>Scroll to get to know me</span></a>
  </section>;
}

