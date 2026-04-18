"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { timelineData } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <SectionHeading
          label="Journey"
          title="Experience & Education"
          subtitle="A timeline of my professional journey and academic milestones."
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line" />

          {timelineData.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
