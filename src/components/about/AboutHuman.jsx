import { ArrowUpRight } from "lucide-react";
import { profile } from "../../data/portfolioData";
import Reveal from "../ui/Reveal";
export default function AboutHuman() {
  return (
    <section
      id="about"
      className="about-section section"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <div className="shell about-grid">
        <Reveal>
          <p className="eyebrow">02 / A bit about me</p>
          <div className="about-caption">
            Built on engineering.
            <br />
            Driven by curiosity.
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <h2 id="about-title">
            I like understanding
            <br />
            how things work.
            <br />
            <span className="muted">Then making them better.</span>
          </h2>
          <div className="about-paragraphs">
            <p>
              My background is in engineering, where solving problems means
              looking closely, asking good questions, and following through. I
              bring that same approach to the websites I build and the AI tools
              I explore.
            </p>
            <p>
              I’m a Senior Network Engineer at PHN Technology. My experience
              spans network support, administration, and enterprise
              infrastructure — keeping the systems people rely on running well.
            </p>
          </div>
          <a
            className="text-link"
            href={profile.resume.url}
            target="_blank"
            rel="noreferrer"
          >
            More about my experience <ArrowUpRight size={18} />
            <span className="link-note">Résumé, PDF</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
