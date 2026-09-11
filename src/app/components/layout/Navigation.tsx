"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track the last section crossing the reading line, including very tall projects.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = "home";
      for (const item of NAV_ITEMS) {
        const id = item.href.slice(1);
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * .35) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [pathname]);
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMenuOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav className={`nav-floating ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display text-sm font-semibold tracking-wide"
          style={{ color: "var(--foreground)" }}
        >
          TW
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`nav-link ${pathname === "/" && activeSection === item.href.replace("#", "") ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ padding: "0.625rem 1.5rem", fontSize: "0.8125rem" }}
          >
            Resume
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-navigation" inert={!menuOpen} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={`/${item.href}`}
            onClick={(e) => handleNavClick(e, item.href)}
            className="mobile-menu-link"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: "1rem" }}
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </Link>
      </div>
    </>
  );
}


