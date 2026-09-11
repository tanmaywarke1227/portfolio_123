"use client";

import { portfolioData } from "@/app/data/portfolio";
import { dataWorkflows, systemFlows, evidenceCaptions } from "@/app/data/case-studies";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectVisual from "@/app/components/ui/ProjectVisual";
import Footer from "@/app/components/sections/Footer";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const index = portfolioData.projects.findIndex((project) => project.slug === params.slug);
  const project = portfolioData.projects[index];
  if (!project) return <main className="case-not-found"><p className="text-section-label">Project unavailable</p><h1 className="text-section-title">This case study does not exist.</h1><Link href="/#projects" className="btn-outline">Explore all projects</Link></main>;
  const workflow = dataWorkflows[project.slug];
  const sourceLinks = [
    { label: "githubBackend" in project ? "GitHub · Frontend" : "View on GitHub", href: project.github },
    ...("githubBackend" in project && project.githubBackend ? [{ label: "GitHub · Backend", href: project.githubBackend }] : []),
  ].filter(link => link.href && link.href !== "#");
  const next = portfolioData.projects[(index + 1) % portfolioData.projects.length];
  const contents = ["Overview", "Problem", "My Role", "System / Architecture", ...(workflow ? ["Data & Analytics Workflow"] : []), "Development / Implementation", "Testing / Evaluation", "Results / Status", "Visual Evidence", "Key Learnings"];
  const anchor = (label: string) => `case-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return <>
    <main className="case-page">
      <header className="case-header max-w-6xl mx-auto">
        <Link href="/#projects" className="case-back">← All projects</Link>
        <div className="case-eyebrow"><p className="text-section-label">Case Study / {String(index + 1).padStart(2, "0")}</p><span>{project.category}</span></div>
        <h1>{project.title}</h1><p className="text-body-large max-w-3xl">{project.description}</p>
        <div className="flex flex-wrap gap-3 mt-8">{sourceLinks.map(link => <a key={link.href} href={link.href} className="btn-outline" target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
        <dl className="case-meta"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Core technologies</dt><dd>{project.technologies.slice(0, 4).join(" · ")}</dd></div></dl>
        <ProjectVisual src={project.images[0]} title={project.title} category={project.category} number={String(index + 1).padStart(2, "0")} />
      </header>
      <div className="case-body max-w-6xl mx-auto">
        <aside className="case-contents"><p className="text-section-label mb-5">In this case study</p><nav aria-label="Case study contents">{contents.map((label, i) => <a key={label} href={`#${anchor(label)}`}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>)}</nav></aside>
        <article className="case-story">
          <section id={anchor("Overview")}><p className="text-section-label">The context</p><h2>Project Overview</h2><p>{project.overview}</p></section>
          <section id={anchor("Problem")}><h2>Problem</h2><p>{project.challenge}</p></section>
          <section id={anchor("My Role")}><h2>My Role</h2><p>{project.architecture.myRole}</p></section>
          <section id={anchor("System / Architecture")}><h2>System / Architecture</h2><p>{project.architecture.approach}</p><ol className="system-flow" aria-label="High-level system architecture">{systemFlows[project.slug]?.map((step, i) => <li key={step}><span>{step}</span>{i < systemFlows[project.slug].length - 1 && <ArrowRight size={18} aria-hidden="true" />}</li>)}</ol><h3>Engineering challenges</h3><ul className="case-list">{project.architecture.technicalChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></section>
          {workflow && <section id={anchor("Data & Analytics Workflow")} className="analytics-section"><p className="text-section-label">Data in practice</p><h2>Data &amp; Analytics Workflow</h2><ol className="analytics-workflow">{workflow.map((step, i) => <li key={step.title}><span className="analytics-index">{String(i + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p><span className="analytics-tools">{step.tools}</span></div></li>)}</ol></section>}
          <section id={anchor("Development / Implementation")}><h2>Development / Implementation</h2><p>{project.solution}</p><ul className="case-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
          <section id={anchor("Testing / Evaluation")}><h2>Testing / Evaluation</h2><p>{project.architecture.testing}</p></section>
          <section id={anchor("Results / Status")}><p className="text-section-label">{project.status}</p><h2>Results / Status</h2><p>{project.architecture.outcome}</p></section>
          <section id={anchor("Visual Evidence")}><h2>Screenshots / Visual Evidence</h2>{project.images.length ? <div className="case-gallery">{project.images.map((src, i) => <figure key={src}><ProjectVisual src={src} title={evidenceCaptions[src] || `${project.title} — project evidence ${i + 1}`} category={project.category} number={String(i + 1).padStart(2, "0")} /><figcaption>{evidenceCaptions[src] || `Project evidence / ${String(i + 1).padStart(2, "0")}`}</figcaption></figure>)}</div> : <p className="evidence-note">Project screenshots and visual documentation will be added here.</p>}</section>
          <section id={anchor("Key Learnings")}><h2>Key Learnings</h2><p>{project.architecture.learnings}</p></section>
          <section><h2>Built with</h2><ul className="work-tech">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><div className="flex flex-wrap gap-4 mt-8">{sourceLinks.map(link => <a key={link.href} href={link.href} className="btn-outline" target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} /></a>)}{project.liveDemo && project.liveDemo !== "#" && <a href={project.liveDemo} className="btn-primary" target="_blank" rel="noopener noreferrer">Live project <ArrowUpRight size={16} /></a>}</div></section>
        </article>
      </div>
      <Link className="next-case max-w-6xl mx-auto" href={`/projects/${next.slug}`}><span className="text-section-label">Next case study</span><span>{next.title}<ArrowUpRight /></span></Link>
    </main>
    <Footer />
  </>;
}


