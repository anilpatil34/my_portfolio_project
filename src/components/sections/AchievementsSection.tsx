"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementsData } from "@/lib/data";

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative bg-grid">
      <div className="section-container">
        <SectionHeading
          label="Achievements"
          title="Certifications & Awards"
          subtitle="Recognition and milestones that mark my growth as a developer."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievementsData.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 group"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                }}
              >
                {achievement.icon}
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {achievement.title}
              </h3>
              <p
                className="text-sm font-medium mb-2"
                style={{ color: "var(--accent-tertiary)" }}
              >
                {achievement.issuer} • {achievement.date}
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {achievement.description}
              </p>

              {/* Link */}
              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300"
                  style={{ color: "var(--accent-primary)" }}
                >
                  View Certificate
                  <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
