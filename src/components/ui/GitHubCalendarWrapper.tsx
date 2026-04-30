"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);



export function GitHubCalendarWrapper() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  // Cores que combinam com o design system minimalista
  const themeConfig = {
    light: ["#F3F4F6", "#C7D2FE", "#818CF8", "#4F46E5", "#3730A3"],
    dark: ["#1F2937", "#312E81", "#4338CA", "#6366F1", "#818CF8"],
  };

  return (
    <div className="w-full p-8 rounded-2xl bg-surface-2 border border-border mt-12 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-sm font-medium text-text uppercase tracking-widest mb-1">
            Contribuições no GitHub
          </h3>
          <p className="text-xs text-text-secondary">Atividade pública nos últimos 12 meses</p>
        </div>
        <a 
          href="https://github.com/renatojuniordw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-medium text-text-secondary hover:text-text transition-colors"
        >
          @renatojuniordw
        </a>
      </div>
      <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
        <GitHubCalendar
          username="renatojuniordw"
          colorScheme={currentTheme}
          theme={themeConfig}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
          labels={{
            totalCount: "{{count}} contribuições no último ano",
          }}
        />
      </div>
    </div>
  );
}
