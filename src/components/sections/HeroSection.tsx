"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ExternalLink, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orb */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent-primary), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, var(--accent-secondary), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "var(--accent-primary)",
              left: `${15 + i * 15}%`,
              top: `${20 + ((i * 37) % 60)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glowing border ring */}
              <motion.div
                className="absolute -inset-1 rounded-full opacity-70"
                style={{ background: "var(--gradient-primary)" }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Outer glow */}
              <motion.div
                className="absolute -inset-3 rounded-full blur-xl opacity-30"
                style={{ background: "var(--gradient-primary)" }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden"
                style={{
                  border: "4px solid var(--bg-primary)",
                }}
              >
                <Image
                  src="/images/profile.png"
                  alt={`${personalInfo.name} - Profile Photo`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="text-center lg:text-left flex-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                  color: "var(--accent-tertiary)",
                }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              <span style={{ color: "var(--text-primary)" }}>Hi, I&apos;m </span>
              <span className="gradient-text">{personalInfo.firstName}</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5"
            >
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                {personalInfo.title}
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg max-w-xl mb-8"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => handleScroll("projects")}
                className="btn-primary"
              >
                <ExternalLink size={18} />
                View Projects
              </button>
              <button
                onClick={() => handleScroll("contact")}
                className="btn-outline"
              >
                <Send size={18} />
                Contact Me
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => handleScroll("about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            style={{ color: "var(--text-tertiary)" }}
            aria-label="Scroll down"
          >
            <span className="text-xs">Scroll Down</span>
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
