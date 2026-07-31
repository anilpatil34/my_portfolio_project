"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { personalInfo } from "@/lib/data";
import { SOCIAL_LINKS } from "@/lib/constants";

/* Custom brand SVG icons */
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    from_name?: string;
    from_email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [touched, setTouched] = useState<{
    from_name?: boolean;
    from_email?: boolean;
    phone?: boolean;
    message?: boolean;
  }>({});

  const validateField = (name: string, value: string): string => {
    const trimmed = value.trim();
    if (name === "from_name") {
      if (!trimmed) return "Full name is required";
      if (trimmed.length < 2) return "Name must be at least 2 characters";
      if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Name should contain letters only";
    }
    if (name === "from_email") {
      if (!trimmed) return "Email address is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
    }
    if (name === "phone") {
      if (!trimmed) return "Mobile number is required";
      const phoneDigits = trimmed.replace(/\D/g, "");
      if (phoneDigits.length < 10) return "Please enter a valid 10-digit mobile number";
      if (phoneDigits.length > 15) return "Mobile number is too long";
    }
    if (name === "message") {
      if (!trimmed) return "Message is required";
      if (trimmed.length < 10) return "Message must be at least 10 characters long";
    }
    return "";
  };

  const handleBlur = (field: "from_name" | "from_email" | "phone" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (
    field: "from_name" | "from_email" | "phone" | "message",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      from_name: true,
      from_email: true,
      phone: true,
      message: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const nameErr = validateField("from_name", formData.from_name);
    const emailErr = validateField("from_email", formData.from_email);
    const phoneErr = validateField("phone", formData.phone);
    const msgErr = validateField("message", formData.message);

    const newErrors = {
      from_name: nameErr,
      from_email: emailErr,
      phone: phoneErr,
      message: msgErr,
    };

    setErrors(newErrors);

    if (nameErr || emailErr || phoneErr || msgErr) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ from_name: "", from_email: "", phone: "", message: "" });
      setTouched({});
      setErrors({});
      setTimeout(() => setStatus("idle"), 7000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message"
      );
      setTimeout(() => setStatus("idle"), 7000);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project idea, a position to fill, or just want to say hi? My inbox is always open!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              <div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Get In Touch
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  I&apos;m always interested in hearing about new
                  projects and opportunities. Whether you have a question or
                  just want to say hi, feel free to reach out!
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: personalInfo.phone,
                    href: `tel:${personalInfo.phone}`,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: personalInfo.location,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(124, 58, 237, 0.1)",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                      }}
                    >
                      <item.icon
                        size={20}
                        style={{ color: "var(--accent-primary)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Find me on
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: GithubIcon, href: SOCIAL_LINKS.github, label: "GitHub" },
                    {
                      icon: LinkedinIcon,
                      href: SOCIAL_LINKS.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: XIcon,
                      href: SOCIAL_LINKS.twitter,
                      label: "Twitter",
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--accent-primary)";
                        e.currentTarget.style.color = "var(--accent-primary)";
                        e.currentTarget.style.boxShadow =
                          "var(--shadow-glow)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--border-color)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Contact Form */}
          <AnimatedSection direction="right">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card p-8 space-y-6"
              style={{ cursor: "default" }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.from_name}
                  onChange={(e) => handleChange("from_name", e.target.value)}
                  onBlur={() => handleBlur("from_name")}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                  style={{
                    background: "var(--bg-secondary)",
                    border: touched.from_name && errors.from_name
                      ? "1px solid rgba(239, 68, 68, 0.8)"
                      : touched.from_name && !errors.from_name
                      ? "1px solid rgba(16, 185, 129, 0.5)"
                      : "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                {touched.from_name && errors.from_name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs mt-1.5 flex items-center gap-1 font-medium"
                    style={{ color: "#ef4444" }}
                  >
                    <AlertCircle size={13} />
                    {errors.from_name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.from_email}
                  onChange={(e) => handleChange("from_email", e.target.value)}
                  onBlur={() => handleBlur("from_email")}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                  style={{
                    background: "var(--bg-secondary)",
                    border: touched.from_email && errors.from_email
                      ? "1px solid rgba(239, 68, 68, 0.8)"
                      : touched.from_email && !errors.from_email
                      ? "1px solid rgba(16, 185, 129, 0.5)"
                      : "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                {touched.from_email && errors.from_email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs mt-1.5 flex items-center gap-1 font-medium"
                    style={{ color: "#ef4444" }}
                  >
                    <AlertCircle size={13} />
                    {errors.from_email}
                  </motion.p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Mobile Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                  style={{
                    background: "var(--bg-secondary)",
                    border: touched.phone && errors.phone
                      ? "1px solid rgba(239, 68, 68, 0.8)"
                      : touched.phone && !errors.phone
                      ? "1px solid rgba(16, 185, 129, 0.5)"
                      : "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                {touched.phone && errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs mt-1.5 flex items-center gap-1 font-medium"
                    style={{ color: "#ef4444" }}
                  >
                    <AlertCircle size={13} />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none focus:ring-2"
                  style={{
                    background: "var(--bg-secondary)",
                    border: touched.message && errors.message
                      ? "1px solid rgba(239, 68, 68, 0.8)"
                      : touched.message && !errors.message
                      ? "1px solid rgba(16, 185, 129, 0.5)"
                      : "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                {touched.message && errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs mt-1.5 flex items-center gap-1 font-medium"
                    style={{ color: "#ef4444" }}
                  >
                    <AlertCircle size={13} />
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full justify-center disabled:opacity-60"
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex items-center gap-3 text-sm font-semibold p-4 rounded-xl shadow-lg"
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    color: "#10b981",
                  }}
                >
                  <CheckCircle size={20} className="shrink-0 text-emerald-400" />
                  <span>Message sent successfully! Thank you for reaching out. I&apos;ll get back to you soon.</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium p-3 rounded-xl"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={16} />
                  {errorMessage || "Failed to send message. Please try again or email me directly."}
                </motion.div>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
