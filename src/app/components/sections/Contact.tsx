"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/app/data/portfolio";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "tanmaywarke1227@gmail.com",
    href: "mailto:tanmaywarke1227@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 7888249506",
    href: "tel:+917888249506",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tanmay-warke-0278b2331",
    href: "https://www.linkedin.com/in/tanmay-warke-0278b2331/",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/tanmaywarke1227",
    href: "https://github.com/tanmaywarke1227",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-6xl mx-auto reading-zone">
        {/* Section label */}
        <motion.p
          className="text-section-label mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.p>

        <div className="section-divider mb-16" />

        {/* Statement */}
        <motion.h2
          className="text-section-title mb-16 max-w-3xl"
          style={{ color: "var(--foreground)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Let’s connect.
        </motion.h2>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Links */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-baseline justify-between py-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <span
                  className="text-sm uppercase tracking-wider"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-base transition-colors duration-300 group-hover:text-cyan-400"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {link.value}
                </span>
              </a>
            ))}

            {/* Resume link */}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span
                className="text-sm uppercase tracking-wider"
                style={{ color: "var(--foreground-dim)" }}
              >
                Resume
              </span>
              <span
                className="text-base transition-colors duration-300 group-hover:text-cyan-400"
                style={{ color: "var(--foreground-muted)" }}
              >
                Download PDF →
              </span>
            </Link>
          </motion.div>

          {/* Location & CTA */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-8">
              <p
                className="text-sm uppercase tracking-wider mb-2"
                style={{ color: "var(--foreground-dim)" }}
              >
                Location
              </p>
              <p
                className="text-lg"
                style={{ color: "var(--foreground-muted)" }}
              >
                Pune, Maharashtra, India
              </p>
            </div>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(portfolioData.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get in touch — compose an email in Gmail (opens in a new tab)"
              className="btn-primary inline-flex self-start"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
