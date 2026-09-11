import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile, socials } from "../../data/portfolioData";
import Reveal from "../ui/Reveal";
export default function ContactBridge() {
  const [status, setStatus] = useState("");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied");
    } catch {
      setStatus(
        "Couldn’t copy. Please select the email address or use the email link.",
      );
    }
    timer.current = setTimeout(() => setStatus(""), 5000);
  }
  return (
    <section
      id="contact"
      className="contact-section shell section"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <Reveal>
        <p className="eyebrow">03 / Get in touch</p>
        <div className="contact-heading">
          <h2 id="contact-title">
            Good things start
            <br />
            with a <span>hello.</span>
          </h2>
          <ArrowUpRight className="contact-arrow" aria-hidden="true" />
        </div>
        <div className="contact-bottom">
          <div className="contact-message">
            <p>
              Have a project in mind, an interesting idea,
              <br className="desktop-break" /> or just want to connect? I’d love
              to hear from you.
            </p>
            <div className="email-row">
              <a className="email-link" href={socials.email.url}>
                {profile.email}
              </a>
              <button
                className="icon-button copy-button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {status === "Email copied" ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            <p className="copy-status" role="status">
              {status}
            </p>
          </div>
          <div className="social-links">
            {[socials.linkedin, socials.github].map((social) => (
              <a
                className="text-link"
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
