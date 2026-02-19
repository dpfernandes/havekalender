import type { Lang } from "../types";
import type { Theme } from "../utils/theme";
import { MONTH_TIPS, MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { month: number; lang: Lang; theme: Theme; }

export function TipBanner({ month, lang, theme }: Props) {
  const tip = MONTH_TIPS[month];
  const monthName = (lang === "da" ? MONTHS_DA : MONTHS_EN)[month];
  return (
    <div style={{ background: theme.bg.card, border: `1px solid ${theme.border.secondary}`, borderLeft: `3px solid ${theme.border.secondary}`, borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: theme.text.secondary, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
        {lang === "da" ? `Tip til ${monthName}` : `Tip for ${monthName}`}
      </div>
      <div style={{ fontSize: 14, color: theme.text.primary, lineHeight: 1.6 }}>
        {lang === "da" ? tip.da : tip.en}
      </div>
    </div>
  );
}
