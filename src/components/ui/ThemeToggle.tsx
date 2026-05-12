"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ size = 18 }: { size?: number }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  if (!mounted) {
    return (
      <div
        className="p-2 rounded-full"
        style={{ width: size + 16, height: size + 16 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 hover:bg-surface-1 rounded-full transition-colors text-text"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}
