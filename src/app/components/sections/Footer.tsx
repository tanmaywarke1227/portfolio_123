export default function Footer() {
  return (
    <footer className="section-padding" style={{ paddingTop: 0 }}>
      <div className="max-w-6xl mx-auto">
        <div className="section-divider mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span
              className="font-display text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              TW
            </span>
            <span style={{ color: "var(--foreground-dim)", fontSize: "0.8125rem" }}>
              Tanmay Warke
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/tanmay-warke-0278b2331/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-300 hover:text-cyan-400"
              style={{ color: "var(--foreground-dim)" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tanmaywarke1227"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-300 hover:text-cyan-400"
              style={{ color: "var(--foreground-dim)" }}
            >
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--foreground-dim)" }}>
            © {new Date().getFullYear()} — Built with curiosity and code.
          </p>
        </div>
      </div>
    </footer>
  );
}
