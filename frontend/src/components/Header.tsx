import type { Lang } from "../types";

interface Props {
  lang: Lang;
  onToggleLang: () => void;
  onAdminClick: () => void;
}

export function Header({ lang, onToggleLang, onAdminClick }: Props) {
  return (
    <div style={{ background: "linear-gradient(180deg,#0a1c08,#060e05)", borderBottom: "1px solid #1e3a1a", padding: "20px 24px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#c8e6c4" }}>
            🌱 HaveKalender
          </div>
          <div style={{ fontSize: 11, color: "#3a5a38", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>
            {lang === "da" ? "Haveguide til Danmark" : "Garden Guide for Denmark"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={onToggleLang} style={{ background: "#0f1f0d", border: "1px solid #2d4a2a", borderRadius: 8, color: "#6b8f65", cursor: "pointer", padding: "6px 14px", fontSize: 13, fontFamily: "monospace" }}>
            {lang === "da" ? "🇬🇧 EN" : "🇩🇰 DA"}
          </button>
          <button onClick={onAdminClick} style={{ background: "#0f1f0d", border: "1px solid #2d4a2a", borderRadius: 8, color: "#6b8f65", cursor: "pointer", padding: "6px 14px", fontSize: 13, fontFamily: "monospace" }}
            title={lang === "da" ? "Admin" : "Admin"}
          >
            ⚙️ Admin
          </button>
        </div>
      </div>
    </div>
  );
}
