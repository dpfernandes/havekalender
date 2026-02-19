import type { Crop, Lang } from "../types";
import type { Theme } from "../utils/theme";
import { timelineCellColor } from "../utils/cropHelpers";
import { MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { crop: Crop; lang: Lang; theme: Theme; }

export function YearBar({ crop, lang, theme }: Props) {
  const labels = lang === "da" ? MONTHS_DA : MONTHS_EN;
  return (
    <div style={{ display: "flex", gap: 2, marginTop: 8 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ height: 28, background: timelineCellColor(crop, i), borderRadius: 4, border: `1px solid ${theme.border.secondary}` }} title={labels[i]} />
          <div style={{ fontSize: 9, color: theme.text.secondary, marginTop: 2, fontFamily: "monospace" }}>{labels[i].slice(0, 1)}</div>
        </div>
      ))}
    </div>
  );
}
