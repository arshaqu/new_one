"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") as Theme | null;

    let initialTheme: Theme;

    if (savedTheme === "light" || savedTheme === "dark") {
      initialTheme = savedTheme;
    } else {
      initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    setTheme(initialTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);

    localStorage.setItem("theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);

    localStorage.setItem("theme", nextTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-lg border border-zinc-700 bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 transition-all duration-200"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}