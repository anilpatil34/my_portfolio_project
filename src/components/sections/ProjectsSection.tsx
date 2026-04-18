"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectsData } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-grid">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          subtitle="A selection of projects that showcase my skills and passion for building."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
