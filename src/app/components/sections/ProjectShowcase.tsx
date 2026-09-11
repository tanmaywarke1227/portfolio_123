"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";
import ProjectVisual from "@/app/components/ui/ProjectVisual";

export default function ProjectShowcase() {
  return <section id="projects" className="relative section-padding" aria-labelledby="projects-title">
    <div className="max-w-6xl mx-auto reading-zone">
      <div className="work-heading"><div><p className="text-section-label mb-5">Selected Work</p><h2 id="projects-title" className="text-section-title">Intelligence,<br />put into practice.</h2></div><p>Explore the systems, the decisions,<br />and the work behind them.</p></div>
      <div className="project-bento">
        {portfolioData.projects.filter(project => project.featured).map((project, index) => (
          <article key={project.slug} className="bento-project">
            <Link href={`/projects/${project.slug}`} className="bento-link" aria-label={`View case study: ${project.title}`}
              onPointerMove={event => {
                if (event.pointerType !== "mouse") return;
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
              }}>
              <div className="bento-meta"><span className="bento-number">{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span><ArrowUpRight className="bento-arrow" size={19} /></div>
              <div className="bento-visual"><ProjectVisual src={project.images[0]} title={project.title} category={project.category} number={String(index + 1).padStart(2, "0")} /></div>
              <div className="bento-copy"><span className="bento-status">{project.status}</span><h3>{project.title}</h3><p>{project.description}</p><ul className="bento-tech">{project.technologies.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul><div className="bento-footer"><span>View case study</span><ArrowUpRight size={16} /></div></div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>;
}
