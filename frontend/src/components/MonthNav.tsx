import type { Lang } from "../types";
import type { Theme } from "../utils/theme";
import { MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { month: number; plantCount: number; harvestCount: number; lang: Lang; theme: Theme; onPrev: () => void; onNext: () => void; }

export function MonthNav({ month, plantCount, harvestCount, lang, theme, onPrev, onNext }: Props) {
  const monthName = (lang === "da" ? MONTHS_DA : MONTHS_EN)[month];
  const btn = { background: theme.bg.button, border: `1px solid ${theme.border.primary}`, borderRadius: 10, width: 40, height: 40, color: theme.text.secondary, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" } as const;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 16 }}>
      <button onClick={onPrev} style={btn}>‹</button>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: theme.text.primary, letterSpacing: "-1px" }}>{monthName}</div>
        <div style={{ fontSize: 12, color: theme.text.secondary, marginTop: 2 }}>
          🌿 {plantCount} {lang === "da" ? "at plante" : "to plant"} &nbsp;·&nbsp; 🌾 {harvestCount} {lang === "da" ? "at høste" : "to harvest"}
        </div>
      </div>
      <button onClick={onNext} style={btn}>›</button>
    </div>
  );
}
