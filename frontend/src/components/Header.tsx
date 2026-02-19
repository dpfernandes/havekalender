import type { Lang } from "../types";
import type { Theme } from "../utils/theme";

interface Props {
  lang: Lang;
  isDark: boolean;
  theme: Theme;
  onToggleLang: () => void;
  onToggleDarkMode: () => void;
  onAdminClick: () => void;
}

export function Header({ lang, isDark, theme, onToggleLang, onToggleDarkMode, onAdminClick }: Props) {
  return (
    <div style={{ background: theme.gradient.header, borderBottom: `1px solid ${theme.border.primary}`, padding: "20px 24px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: theme.text.title }}>
            🌱 HaveKalender
          </div>
          <div style={{ fontSize: 11, color: theme.text.tertiary, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>
            {lang === "da" ? "Haveguide til Danmark" : "Garden Guide for Denmark"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={onToggleDarkMode} style={{ background: theme.bg.button, border: `1px solid ${theme.border.secondary}`, borderRadius: 8, color: theme.text.secondary, cursor: "pointer", padding: "6px 14px", fontSize: 13, fontFamily: "monospace", transition: "all 0.2s" }}
            title={isDark ? (lang === "da" ? "Lys tilstand" : "Light mode") : (lang === "da" ? "Mørk tilstand" : "Dark mode")}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button onClick={onToggleLang} style={{ background: theme.bg.button, border: `1px solid ${theme.border.secondary}`, borderRadius: 8, color: theme.text.secondary, cursor: "pointer", padding: "6px 14px", fontSize: 13, fontFamily: "monospace" }}>
            {lang === "da" ? "🇬🇧 EN" : "🇩🇰 DA"}
          </button>
          <button onClick={onAdminClick} style={{ background: theme.bg.button, border: `1px solid ${theme.border.secondary}`, borderRadius: 8, color: theme.text.secondary, cursor: "pointer", padding: "6px 14px", fontSize: 13, fontFamily: "monospace" }}
            title={lang === "da" ? "Admin" : "Admin"}
          >
            ⚙️ Admin
          </button>
        </div>
      </div>
    </div>
  );
}
