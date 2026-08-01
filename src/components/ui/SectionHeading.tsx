import { AnimatedSection } from "./AnimatedSection";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <AnimatedSection direction="up" className={`mb-6 sm:mb-8 lg:mb-10 ${alignClass}`}>
      <span
        className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(124, 58, 237, 0.1)",
          color: "var(--accent-primary)",
          border: "1px solid rgba(124, 58, 237, 0.2)",
        }}
      >
        {label}
      </span>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-1 w-16 rounded-full mx-auto"
        style={{
          background: "var(--gradient-primary)",
          marginLeft: align === "left" ? 0 : undefined,
        }}
      />
    </AnimatedSection>
  );
}
