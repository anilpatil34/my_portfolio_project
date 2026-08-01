"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export function MobileScrollSlider() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setActiveLabel(label);
      setTimeout(() => setActiveLabel(null), 1800);
    }
  };

  return (
    <aside
      aria-label="Mobile section navigation slider"
      className="fixed right-2 top-1/2 -translate-y-1/2 z-40 lg:hidden flex flex-col items-center gap-2.5 px-1.5 py-3 rounded-full backdrop-blur-md border shadow-xl transition-all duration-300"
      style={{
        background: "rgba(10, 14, 35, 0.75)",
        borderColor: "rgba(124, 58, 237, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 12px rgba(124, 58, 237, 0.15)",
      }}
    >
      {/* Sleek Vertical Section Dots Slider */}
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollToSection(sec.id, sec.label)}
            aria-label={`Go to ${sec.label} section`}
            className="relative p-1 flex items-center justify-center cursor-pointer touch-manipulation"
          >
            {/* Active glow pill */}
            {isActive && (
              <motion.div
                layoutId="mobile-slider-active-dot"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 0 8px var(--accent-primary)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {/* Dot */}
            <span
              className={`relative z-10 block rounded-full transition-all duration-300 ${
                isActive ? "w-2.5 h-2.5 bg-white" : "w-1.5 h-1.5 bg-slate-500 hover:bg-slate-300"
              }`}
            />
          </button>
        );
      })}

      {/* Label Toast on Tap */}
      <AnimatePresence>
        {activeLabel && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none"
            style={{
              background: "var(--gradient-primary)",
              color: "white",
            }}
          >
            {activeLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
