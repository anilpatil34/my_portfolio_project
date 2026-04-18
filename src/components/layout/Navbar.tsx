"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";
import { personalInfo } from "@/lib/data";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: isScrolled ? `blur(var(--glass-blur))` : "none",
          WebkitBackdropFilter: isScrolled ? `blur(var(--glass-blur))` : "none",
          borderBottom: isScrolled
            ? "1px solid var(--glass-border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">{personalInfo.firstName}</span>
              <span style={{ color: "var(--text-primary)" }}>
                {personalInfo.lastName}
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ background: "var(--gradient-primary)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2 rounded-lg"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle mobile menu"
                id="mobile-menu-toggle"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(6, 9, 24, 0.8)" }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden p-6 flex flex-col"
              style={{
                background: "var(--bg-primary)",
                borderLeft: "1px solid var(--border-color)",
              }}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg"
                  style={{
                    color: "var(--text-primary)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive =
                    activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="px-4 py-3 rounded-xl text-base font-medium transition-all"
                      style={{
                        color: isActive
                          ? "var(--accent-primary)"
                          : "var(--text-secondary)",
                        background: isActive
                          ? "rgba(255, 46, 140, 0.1)"
                          : "transparent",
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
