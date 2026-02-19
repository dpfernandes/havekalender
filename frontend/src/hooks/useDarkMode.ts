import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDark));
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return { isDark, toggleDarkMode };
}
