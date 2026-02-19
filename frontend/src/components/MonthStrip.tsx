import type { Crop, Lang } from "../types";
import type { Theme } from "../utils/theme";
import { getPlantCropsForMonth, getHarvestCropsForMonth, shortMonth } from "../utils/cropHelpers";
import { MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { crops: Crop[]; currentMonth: number; lang: Lang; theme: Theme; onSelect: (m: number) => void; }

export function MonthStrip({ crops, currentMonth, lang, theme, onSelect }: Props) {
  const labels = lang === "da" ? MONTHS_DA : MONTHS_EN;
  return (
    <div style={{ background: theme.gradient.header, borderBottom: `1px solid ${theme.border.primary}`, padding: "0 24px 4px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 4 }}>
        {Array.from({ length: 12 }, (_, i) => {
          const plant   = getPlantCropsForMonth(crops, i);
          const harvest = getHarvestCropsForMonth(crops, i);
          const active  = i === currentMonth;
          return (
            <button key={i} onClick={() => onSelect(i)} style={{ background: active ? theme.border.primary : "transparent", border: active ? `1px solid ${theme.border.secondary}` : "1px solid transparent", borderRadius: 10, padding: "8px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 52, transition: "all 0.2s" }}>
              <span style={{ fontSize: 11, fontFamily: "'Playfair Display',serif", color: active ? theme.text.primary : theme.text.secondary, fontWeight: active ? 700 : 400 }}>
                {shortMonth(labels, i)}
              </span>
              <div style={{ display: "flex", gap: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: plant.length   > 0 ? "#34d399" : theme.border.primary }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: harvest.length > 0 ? "#f59e0b" : theme.border.primary }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
