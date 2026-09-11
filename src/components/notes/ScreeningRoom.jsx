import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "../../data/portfolioData";
import Reveal from "../ui/Reveal";
export default function ScreeningRoom() {
  return (
    <section
      id="work"
      className="work-section shell section"
      tabIndex={-1}
      aria-labelledby="work-title"
    >
      <Reveal className="section-heading">
        <p className="eyebrow">01 / Selected work</p>
        <h2 id="work-title">Curiosity, put to work.</h2>
        <p className="section-intro">
          A personal project, from an idea
          <br className="desktop-break" /> to something you can use.
        </p>
      </Reveal>
      {featuredProjects.map((project) => (
        <article className="project" key={project.id}>
          <Reveal>
            <a
              className="project-visual"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${project.name}, opens in a new tab`}
            >
              <div className="project-visual-heading">
                <span>{project.name}</span>
                <span className="project-visual-note">
                  A little care.
                  <br />A little intelligence.
                </span>
              </div>
              <div className="project-screenshot">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width="1270"
                  height="714"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="project-visit">
                Explore the app <ArrowUpRight size={19} />
              </span>
            </a>
          </Reveal>
          <Reveal className="project-details">
            <div>
              <p className="eyebrow muted">Independent project / AI & Web</p>
              <h3>{project.name}</h3>
            </div>
            <div className="project-description">
              <p>{project.description}</p>
              <p className="contribution">
                <span>My contribution</span> {project.contribution}
              </p>
              <p className="project-tech">
                React · Vite · Tailwind CSS · Gemini API
              </p>
            </div>
            <div className="project-links">
              <a
                className="text-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit project <ArrowUpRight size={17} />
              </a>
              <a
                className="text-link muted"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                View source <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
        </article>
      ))}
    </section>
  );
}
