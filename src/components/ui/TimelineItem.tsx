"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import type { TimelineEntry } from "@/lib/data";

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;
  const isEducation = entry.type === "education";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-start gap-8 mb-12 ${
        isLeft
          ? "md:flex-row md:text-right"
          : "md:flex-row-reverse md:text-left"
      } flex-row text-left`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"} pl-12 md:pl-0`}>
        <div className="glass-card p-6">
          {/* Date badge */}
          <div
            className={`flex items-center gap-2 mb-3 text-xs font-semibold ${
              isLeft ? "md:justify-end" : "md:justify-start"
            }`}
            style={{ color: "var(--accent-primary)" }}
          >
            <Calendar size={14} />
            <span>{entry.startDate} — {entry.endDate}</span>
          </div>

          <h3
            className="text-lg font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {entry.title}
          </h3>

          <div
            className={`flex items-center gap-2 mb-3 text-sm ${
              isLeft ? "md:justify-end" : "md:justify-start"
            }`}
            style={{ color: "var(--accent-tertiary)" }}
          >
            <span className="font-medium">{entry.organization}</span>
            <span style={{ color: "var(--text-tertiary)" }}>•</span>
            <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
              <MapPin size={12} />
              {entry.location}
            </span>
          </div>

          <p
            className="text-sm mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {entry.description}
          </p>

          <ul className="space-y-1.5">
            {entry.highlights.map((highlight, i) => (
              <li
                key={i}
                className={`text-xs flex items-start gap-2 ${
                  isLeft ? "md:justify-end" : "md:justify-start"
                }`}
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent-primary)" }}>▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center dot */}
      <div
        className="absolute left-0 md:left-1/2 top-6 w-10 h-10 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2"
        style={{
          background: "var(--bg-primary)",
          border: "2px solid var(--accent-secondary)",
          boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
        }}
      >
        {isEducation ? (
          <GraduationCap size={18} style={{ color: "var(--accent-tertiary)" }} />
        ) : (
          <Briefcase size={18} style={{ color: "var(--accent-primary)" }} />
        )}
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
