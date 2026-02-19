import type { Crop, Lang } from "../types";
import { getActionsForCrop } from "../utils/cropHelpers";
import { DIFFICULTY_LABEL } from "../utils/constants";

interface Props { crop: Crop; month: number; lang: Lang; onClick: () => void; }

export function CropCard({ crop, month, lang, onClick }: Props) {
  const actions = getActionsForCrop(crop, month);
  return (
    <div onClick={onClick}
      style={{ background: "#0f1f0d", border: "1px solid #1e3a1a", borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}
      onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #4a7c59"; e.currentTarget.style.background = "#142918"; }}
      onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid #1e3a1a"; e.currentTarget.style.background = "#0f1f0d"; }}
    >
      <span style={{ fontSize: 28, minWidth: 36 }}>{crop.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", color: "#c8e6c4", fontSize: 15, fontWeight: 600 }}>{lang === "da" ? crop.name_da : crop.name_en}</span>
          <span style={{ color: "#4a6b45", fontSize: 12, fontStyle: "italic" }}>{lang === "da" ? crop.name_en : crop.name_da}</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
          {actions.map((a) => (
            <span key={a.type} style={{ background: a.color + "1a", color: a.color, border: `1px solid ${a.color}44`, borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>
              {lang === "da" ? a.label_da : a.label_en}
            </span>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#3a5a38", flexShrink: 0 }}>{DIFFICULTY_LABEL[crop.difficulty][lang]}</div>
    </div>
  );
}
