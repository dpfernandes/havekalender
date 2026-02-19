import type { Crop, Lang } from "../types";
import { getPlantCropsForMonth, getHarvestCropsForMonth, shortMonth } from "../utils/cropHelpers";
import { MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { crops: Crop[]; currentMonth: number; lang: Lang; onSelect: (m: number) => void; }

export function MonthStrip({ crops, currentMonth, lang, onSelect }: Props) {
  const labels = lang === "da" ? MONTHS_DA : MONTHS_EN;
  return (
    <div style={{ background: "linear-gradient(180deg,#0a1c08,#060e05)", borderBottom: "1px solid #1e3a1a", padding: "0 24px 4px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 4 }}>
        {Array.from({ length: 12 }, (_, i) => {
          const plant   = getPlantCropsForMonth(crops, i);
          const harvest = getHarvestCropsForMonth(crops, i);
          const active  = i === currentMonth;
          return (
            <button key={i} onClick={() => onSelect(i)} style={{ background: active ? "#1e3a1a" : "transparent", border: active ? "1px solid #4a7c59" : "1px solid transparent", borderRadius: 10, padding: "8px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 52 }}>
              <span style={{ fontSize: 11, fontFamily: "'Playfair Display',serif", color: active ? "#c8e6c4" : "#4a6b45", fontWeight: active ? 700 : 400 }}>
                {shortMonth(labels, i)}
              </span>
              <div style={{ display: "flex", gap: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: plant.length   > 0 ? "#34d399" : "#1e2a1a" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: harvest.length > 0 ? "#f59e0b" : "#1e2a1a" }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
