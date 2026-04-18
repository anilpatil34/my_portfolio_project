"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { aboutData, personalInfo } from "@/lib/data";
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image & Text */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              {/* Profile Section */}
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl blur-md bg-gradient-to-tr from-purple-600 to-blue-500 opacity-50 shadow-lg" />
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl z-10"
                    style={{ border: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    {personalInfo.name}
                  </h3>
                  <p className="text-base sm:text-lg font-medium gradient-text">
                    {personalInfo.title}
                  </p>
                </div>
              </div>

              {/* Bio Paragraphs */}
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

              {/* Download CV button */}
              <div className="pt-4">
                <a
                  href={personalInfo.resumeUrl}
                  className="btn-primary"
                  download
                >
                  Download Resume
                </a>
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
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
