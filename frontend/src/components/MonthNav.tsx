import type { Lang } from "../types";
import { MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { month: number; plantCount: number; harvestCount: number; lang: Lang; onPrev: () => void; onNext: () => void; }

export function MonthNav({ month, plantCount, harvestCount, lang, onPrev, onNext }: Props) {
  const monthName = (lang === "da" ? MONTHS_DA : MONTHS_EN)[month];
  const btn = { background: "#0f1f0d", border: "1px solid #1e3a1a", borderRadius: 10, width: 40, height: 40, color: "#4a7c59", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" } as const;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 16 }}>
      <button onClick={onPrev} style={btn}>‹</button>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#e8f5e4", letterSpacing: "-1px" }}>{monthName}</div>
        <div style={{ fontSize: 12, color: "#4a6b45", marginTop: 2 }}>
          🌿 {plantCount} {lang === "da" ? "at plante" : "to plant"} &nbsp;·&nbsp; 🌾 {harvestCount} {lang === "da" ? "at høste" : "to harvest"}
        </div>
      </div>
      <button onClick={onNext} style={btn}>›</button>
    </div>
  );
}
