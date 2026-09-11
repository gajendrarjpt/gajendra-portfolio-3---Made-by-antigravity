import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { profile } from "../../data/portfolioData";
const links = ["Work", "About", "Contact"];
export default function SlyNav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (breakpoint.matches) dialog.current?.close();
    };
    breakpoint.addEventListener("change", closeOnDesktop);
    return () => breakpoint.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function navigate(event, section) {
    event.preventDefault();
    dialog.current.close();
    requestAnimationFrame(() => {
      const target = document.getElementById(section);
      history.pushState(null, "", `#${section}`);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView();
    });
  }
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const controls = [...dialog.current.querySelectorAll("a[href], button")];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <>
      <header className="site-header">
        <div className="shell nav-inner">
          <a
            className="wordmark"
            href="#home"
            aria-label="Gajendra Rajput, home"
          >
            gajendra<span aria-hidden="true">.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="resume-nav"
              href={profile.resume.url}
              target="_blank"
              rel="noreferrer"
            >
              Résumé <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button theme-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-button menu-trigger"
              ref={trigger}
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                dialog.current.showModal();
                setOpen(true);
              }}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Navigation"
        onKeyDown={trapFocus}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="menu-content">
          <div className="menu-top">
            <span className="wordmark">
              gajendra<span>.</span>
            </span>
            <button
              className="icon-button"
              autoFocus
              aria-label="Close navigation"
              onClick={() => dialog.current.close()}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((label, i) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={(e) => navigate(e, label.toLowerCase())}
              >
                <span className="eyebrow">0{i + 1}</span>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <a
            className="text-link"
            href={profile.resume.url}
            target="_blank"
            rel="noreferrer"
          >
            Read my résumé <ArrowUpRight size={18} />
          </a>
          <p className="menu-note">
            Engineer & Creator
            <br />
            Pune, India
          </p>
        </div>
      </dialog>
    </>
  );
}
