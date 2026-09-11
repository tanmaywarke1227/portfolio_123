"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/app/data/portfolio";

export default function Experience() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-6xl mx-auto reading-zone">
        {/* Section label */}
        <motion.p
          className="text-section-label mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.p>

        <div className="section-divider mb-12" />

        {portfolioData.experience.map((exp, expIndex) => (
          <div key={exp.company} className={expIndex > 0 ? "mt-20" : ""}>
            {/* Company header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2
                className="text-section-title mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {exp.company}
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <span style={{ color: "var(--foreground-muted)" }}>
                  {exp.position}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--foreground-dim)",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "var(--foreground-dim)" }}>
                  {exp.location}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--foreground-dim)",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "var(--foreground-dim)" }}>
                  {exp.duration}
                </span>
              </div>

              {/* IEEE project name */}
              {"project" in exp && exp.project && (
                <p
                  className="mt-3 text-sm italic"
                  style={{ color: "var(--accent-cyan)", opacity: 0.8 }}
                >
                  {exp.project}
                </p>
              )}
            </motion.div>

            {/* Modules grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: "var(--border-subtle)" }}
            >
              {exp.modules.map((mod, index) => {
                const moduleKey = `${exp.company}-${mod.id}`;
                return (
                  <motion.div
                    key={moduleKey}
                    className="exp-module"
                    style={{ background: "var(--background)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    onClick={() =>
                      setActiveModule(
                        activeModule === moduleKey ? null : moduleKey
                      )
                    }
                    onMouseEnter={() => setActiveModule(moduleKey)}
                    onMouseLeave={() => setActiveModule(null)}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="exp-module-number">{mod.id}</span>
                      <h3
                        className="font-display text-base font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {mod.title}
                      </h3>
                    </div>

                    <AnimatePresence>
                      {activeModule === moduleKey && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 space-y-2">
                            {mod.areas.map((area) => (
                              <p
                                key={area}
                                className="text-sm"
                                style={{ color: "var(--foreground-muted)" }}
                              >
                                {area}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}