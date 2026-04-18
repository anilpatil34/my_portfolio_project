"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBar } from "@/components/ui/SkillBar";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { skillsData } from "@/lib/data";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <SectionHeading
          label="Skills"
          title="My Tech Stack"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        {/* Category Tabs */}
        <AnimatedSection direction="up" className="mb-12">
          <div
            className="flex justify-center gap-2 p-1.5 rounded-2xl max-w-md mx-auto"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            {skillsData.map((category, i) => (
              <button
                key={category.title}
                onClick={() => setActiveTab(i)}
                className="relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 cursor-pointer flex-1"
                style={{
                  color:
                    activeTab === i
                      ? "white"
                      : "var(--text-secondary)",
                }}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.title}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {skillsData[activeTab].skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              level={skill.level}
              delay={i * 0.08}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
