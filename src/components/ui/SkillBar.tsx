"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface SkillBarProps {
  name: string;
  icon: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, icon, level, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(level), delay * 1000 + 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </span>
        </div>
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--accent-primary)" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </motion.div>
  );
}
