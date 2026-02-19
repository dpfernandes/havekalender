import type { Crop, Lang } from "../types";

interface Props { crop: Crop; lang: Lang; onClick: () => void; }

export function HarvestCard({ crop, lang, onClick }: Props) {
  return (
    <div onClick={onClick}
      style={{ background: "#1a1400", border: "1px solid #3a2e00", borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}
      onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #a16207"; e.currentTarget.style.background = "#221c00"; }}
      onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid #3a2e00"; e.currentTarget.style.background = "#1a1400"; }}
    >
      <span style={{ fontSize: 28, minWidth: 36 }}>{crop.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", color: "#fde68a", fontSize: 15, fontWeight: 600 }}>{lang === "da" ? crop.name_da : crop.name_en}</span>
          <span style={{ color: "#78694a", fontSize: 12, fontStyle: "italic" }}>{lang === "da" ? crop.name_en : crop.name_da}</span>
        </div>
        <div style={{ marginTop: 5 }}>
          <span style={{ background: "#f59e0b1a", color: "#f59e0b", border: "1px solid #f59e0b44", borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>
            {lang === "da" ? "Klar til høst" : "Ready to harvest"}
          </span>
        </div>
      </div>
    </div>
  );
}
