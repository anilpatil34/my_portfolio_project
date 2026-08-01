import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anil Patil | Full Stack Developer — Portfolio",
  description:
    "Personal portfolio of Anil Patil, a full-stack developer specializing in Python, Django, React, Next.js, TypeScript, and modern web technologies. View projects, skills, and get in touch.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Anil Patil" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Anil Patil | Full Stack Developer",
    description:
      "Full-stack developer specializing in Python, Django, React, Next.js, TypeScript, and modern web technologies.",
    siteName: "Anil Patil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Patil | Full Stack Developer",
    description:
      "Full-stack developer specializing in Python, Django, React, Next.js, TypeScript, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
