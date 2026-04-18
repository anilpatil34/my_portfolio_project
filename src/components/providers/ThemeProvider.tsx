"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      enableColorScheme={false}
      disableTransitionOnChange={false}
    >
      <div
        style={{
          visibility: mounted ? "visible" : "hidden",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.15s ease-in",
        }}
        suppressHydrationWarning
      >
        {children}
      </div>
    </NextThemesProvider>
  );
}

