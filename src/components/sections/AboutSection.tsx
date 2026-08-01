"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { aboutData } from "@/lib/data";
import { Code2, Rocket, Users, Coffee } from "lucide-react";

const statIcons = [Code2, Rocket, Users, Coffee];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-grid">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Passionate About Building Things That Matter"
          subtitle="Get to know me, my journey, and what drives me as a developer."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Text & Core Strengths */}
          <AnimatedSection direction="left" className="flex flex-col h-full justify-between space-y-6">
            <div className="space-y-5">
              {aboutData.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Highlights / Focus Card */}
            <div
              className="glass-card p-6 rounded-2xl"
              style={{ borderLeft: "3px solid var(--accent-primary)" }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--accent-tertiary)" }}>
                Core Focus & Strengths
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
                  Full Stack Development
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-secondary)" }} />
                  UI/UX & Micro-interactions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-tertiary)" }} />
                  API Architecture & DBs
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
                  Performance & SEO
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Stats & Decorative */}
          <AnimatedSection direction="right">
            <StaggerContainer className="grid grid-cols-2 gap-4">
              {aboutData.stats.map((stat, i) => {
                const Icon = statIcons[i % statIcons.length];
                return (
                  <StaggerItem key={stat.label}>
                    <div className="glass-card p-6 text-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{
                          background: "rgba(124, 58, 237, 0.1)",
                          border: "1px solid rgba(124, 58, 237, 0.2)",
                        }}
                      >
                        <Icon
                          size={22}
                          style={{ color: "var(--accent-primary)" }}
                        />
                      </div>
                      <h4
                        className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
                      >
                        {stat.value}
                      </h4>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Philosophy / Approach Section */}
            <div
              className="mt-6 glass-card p-6 sm:p-8"
              style={{
                borderTop: "2px solid var(--accent-primary)",
              }}
            >
              <h4
                className="text-lg font-semibold mb-5 gradient-text"
              >
                My Approach
              </h4>
              <div className="space-y-5">
                {[
                  {
                    icon: "✦",
                    title: "Clean & Scalable Code",
                    desc: "Writing maintainable, well-documented code that stands the test of time — because great software is built on a solid foundation.",
                  },
                  {
                    icon: "◈",
                    title: "User-First Design",
                    desc: "Every pixel serves a purpose. I focus on intuitive interfaces and seamless experiences that delight users and drive engagement.",
                  },
                  {
                    icon: "⟡",
                    title: "Continuous Growth",
                    desc: "Technology never stands still, and neither do I. I embrace new tools, frameworks, and methodologies to stay at the cutting edge.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start group">
                    <span
                      className="text-lg mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-125"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <h5
                        className="text-sm font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </h5>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
