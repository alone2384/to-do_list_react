import React, { useState, useEffect } from "react";

const themes = {
  light: {
    "--bg-dark": "#ffffff",
    "--bg-area": "#ffffff",
    "--text-light": "#1a1a1a",
    "--text-muted": "#666666",
    "--hover-bg": "#f0f0f0",
    "--active-bg": "#ff5722",
    "--p1-color": "#ff4d4d",
    "--p2-color": "#ffa64d",
    "--p3-color": "#4da6ff",
    "--p1-bg": "rgba(255, 77, 77, 0.1)",
    "--p2-bg": "rgba(255, 166, 77, 0.265)",
    "--p3-bg": "rgba(77, 166, 255, 0.12)",
    "--font-main": `"Segoe UI", "Inter", sans-serif`,
    "--taskplus": "#ff5722",
    "--menuBtn": "black",
  },
  dark: {
    "--bg-dark": "#262626",
    "--bg-area": "#1e1e1e",
    "--text-light": "#f0f0f0",
    "--text-muted": "#b3b3b3",
    "--hover-bg": "#333333",
    "--active-bg": "#ff5722",
    "--p1-color": "#ff4d4d",
    "--p2-color": "#ffa64d",
    "--p3-color": "#4da6ff",
    "--p1-bg": "rgba(209, 75, 75, 0.12)",
    "--p2-bg": "rgba(255, 166, 77, 0.12)",
    "--p3-bg": "rgba(77, 166, 255, 0.12)",
    "--font-main": `"Segoe UI", "Inter", sans-serif`,
    "--taskplus": "#ff5722",
    "--menuBtn": "white",
  },
  green: {
    "--bg-dark": "#e0f3eb",
    "--bg-area": "#d1e7dc",
    "--hover-bg": "#b4ddca",
    "--active-bg": "#0e9c73",
    "--text-light": "#111517",
    "--text-muted": "#4b5563",
    "--p1-color": "#dc2626",
    "--p2-color": "#d97706",
    "--p3-color": "#059669",
    "--p1-bg": "#fca5a5",
    "--p2-bg": "#fde68a",
    "--p3-bg": "#a7f3d0",
    "--font-main": `"Segoe UI", "Inter", sans-serif`,
    "--taskplus": "#000000",
    "--menuBtn": "#0e9c73",
  },
  forest: {
    "--bg-dark": "#1b1c1e",
    "--bg-area": "#232427",
    "--hover-bg": "#2e2f33",
    "--text-light": "#f5f5f7",
    "--text-muted": "#a0a4ab",
    "--active-bg": "#4b5bc1",
    "--p1-color": "#ff5c5c",
    "--p2-color": "#ffc266",
    "--p3-color": "#5cbfff",
    "--p1-bg": "rgba(255, 92, 92, 0.12)",
    "--p2-bg": "rgba(255, 194, 102, 0.12)",
    "--p3-bg": "rgba(92, 191, 255, 0.12)",
    "--font-main": `"Segoe UI", "Inter", sans-serif`,
    "--taskplus": "#4b5bc1",
    "--menuBtn": "#ffffff",
  },
};

const themeNames = ["light", "dark", "green", "forest"];

const ThemeToggle = () => {
  const [current, setCurrent] = useState(0);

  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  };

  const handleClick = () => {
    const next = (current + 1) % themeNames.length;
    setCurrent(next);
    localStorage.setItem("selectedTheme", next); // ✅ Save to localStorage
    applyTheme(themeNames[next]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    const index = savedTheme !== null ? parseInt(savedTheme) : 0;
    setCurrent(index); // ✅ Set the saved theme index
    applyTheme(themeNames[index]); // ✅ Apply it
  }, []);

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "var(--active-bg)",
        color: "var(--text-light)",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      Theme: {themeNames[current]}
    </button>
  );
};

export default ThemeToggle;
