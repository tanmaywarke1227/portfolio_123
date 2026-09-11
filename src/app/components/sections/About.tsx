import { portfolioData } from "@/app/data/portfolio";

export default function About() {
  return <section id="about" aria-labelledby="about-title">
    <div id="system-study" className="system-study about-study">
      <div className="system-study-heading">
        <p className="text-section-label">About me</p>
        <h2 id="about-title">Intelligence meets<br />the physical world.</h2>
        <p>AI, software and hardware.<br />A connected approach to building.</p>
      </div>
      <div className="study-steps">
        <div className="study-step"><span>01 / BACKGROUND</span><h3>Curiosity, turned<br />into practice.</h3><p>{portfolioData.bio.split(". ")[0]}.</p></div>
        <div className="study-step"><span>02 / MY WORK</span><h3>From intelligent software<br />to physical systems.</h3><p>I build and experiment with intelligent systems across computer vision, automation, embedded technology and interactive software.</p></div>
        <div className="study-step"><span>03 / MY INTERESTS</span><h3>Exploring the<br />connections.</h3><p>I&apos;m drawn to the intersection of software intelligence and physical-world interaction.</p><div className="about-study-areas">{["Computer Vision", "AI Systems", "Automation", "Embedded / IoT", "Interactive Tech", "Research"].map(area => <span key={area}>{area}</span>)}</div></div>
      </div>
    </div>
  </section>;
}

