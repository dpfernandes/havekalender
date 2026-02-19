import type { Lang } from "../types";
import { MONTH_TIPS, MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { month: number; lang: Lang; }

export function TipBanner({ month, lang }: Props) {
  const tip = MONTH_TIPS[month];
  const monthName = (lang === "da" ? MONTHS_DA : MONTHS_EN)[month];
  return (
    <div style={{ background: "linear-gradient(135deg,#0f2a0d,#0a1c08)", border: "1px solid #2d4a2a", borderLeft: "3px solid #4a7c59", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: "#4a7c59", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
        {lang === "da" ? `Tip til ${monthName}` : `Tip for ${monthName}`}
      </div>
      <div style={{ fontSize: 14, color: "#a0c8a0", lineHeight: 1.6 }}>
        {lang === "da" ? tip.da : tip.en}
      </div>
    </div>
  );
}
