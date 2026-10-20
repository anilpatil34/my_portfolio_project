"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectsData } from "@/lib/data";

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    triggerPause();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    triggerPause();
  };

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    triggerPause();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff < -40) {
      handleNext();
    } else if (diff > 40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="relative bg-grid">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          subtitle="A selection of projects that showcase my skills and passion for building."
        />

        {/* Desktop View: Responsive Grid */}
        <div className="max-md:hidden grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile View: 1-Project Horizontal Auto-Slider */}
        <div className="md:hidden max-w-md mx-auto px-1">
          {/* Active Card Container with Touch Swipe & Hover Pause */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-[460px] overflow-hidden select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={projectsData[currentIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProjectCard
                  project={projectsData[currentIndex]}
                  index={currentIndex}
                  disableAnimation={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls & Navigation */}
          <div className="mt-4 flex items-center justify-between px-2">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--accent-primary)",
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots & Counter */}
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="text-xs font-bold tracking-wider"
                style={{ color: "var(--accent-tertiary)" }}
              >
                Project 0{currentIndex + 1} / 0{projectsData.length}
              </span>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {projectsData.map((project, idx) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      triggerPause();
                    }}
                    aria-label={`Show project ${idx + 1}`}
                    className="relative p-1 focus:outline-none cursor-pointer"
                  >
                    {currentIndex === idx ? (
                      <motion.div
                        layoutId="active-mobile-single-proj-dot"
                        className="w-6 h-2 rounded-full"
                        style={{ background: "var(--gradient-primary)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    ) : (
                      <div
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ background: "rgba(148, 163, 184, 0.4)" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--accent-primary)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
