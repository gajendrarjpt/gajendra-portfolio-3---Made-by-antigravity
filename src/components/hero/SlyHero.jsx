import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/portfolioData";
import Reveal from "../ui/Reveal";
export default function SlyHero() {
  return (
    <section id="home" className="hero shell" aria-labelledby="hero-title">
      <Reveal className="hero-kicker">
        <p className="eyebrow">Engineer & Creator</p>
        <span className="eyebrow muted">Pune, India</span>
      </Reveal>
      <Reveal className="hero-composition">
        <h1 id="hero-title">
          Gajendra
          <br />
          <span className="surname">
            Rajput<span className="name-period">.</span>
          </span>
        </h1>
        {profile.portrait && (
          <img
            className="hero-portrait"
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width="480"
            height="600"
          />
        )}
        <div className="hero-aside">
          <span className="creative-mark" aria-hidden="true">
            ✳
          </span>
          <p>
            Engineering roots.
            <br />A curious mind.
            <br />
            <span className="muted">Always making.</span>
          </p>
        </div>
      </Reveal>
      <Reveal className="hero-bottom" delay={0.08}>
        <p className="intro">
          I’m Gajendra, an engineer based in Pune. I build websites and explore
          practical uses of AI.
        </p>
        <div className="hero-links">
          <a className="button" href="#work">
            View selected work <ArrowDown size={18} />
          </a>
          <a className="text-link" href="#contact">
            Get in touch <ArrowUpRight size={18} />
          </a>
        </div>
      </Reveal>
      <div className="hero-footnote">
        <span>Thoughtfully built. Constantly curious.</span>
        <a href="#work" aria-label="Scroll to selected work">
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
