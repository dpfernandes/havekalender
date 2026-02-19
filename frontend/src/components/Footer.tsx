import type { Lang } from "../types";
import type { Theme } from "../utils/theme";
import { ACTION_META, ALL_ACTIONS } from "../utils/constants";

interface Props { lang: Lang; theme: Theme; }

export function Footer({ lang, theme }: Props) {
  return (
    <div style={{ marginTop: 36, paddingTop: 20, borderTop: `1px solid ${theme.border.primary}` }}>
      <div style={{ fontSize: 11, color: theme.text.tertiary, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        {lang === "da" ? "Forklaring" : "Legend"}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {ALL_ACTIONS.map((key) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.text.secondary }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: ACTION_META[key].color }} />
            {lang === "da" ? ACTION_META[key].label_da : ACTION_META[key].label_en}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px", background: theme.bg.tab, borderRadius: 10, border: `1px solid ${theme.border.primary}` }}>
        <div style={{ fontSize: 11, color: theme.text.tertiary, lineHeight: 1.6 }}>
          {lang === "da"
            ? "Data tilpasset Danmarks klima (Köppen-Geiger Cfb: C = tempereret, f = fuldt humidt, b = varm sommer under 22°C). Tidspunkter er vejledende — juster efter din lokale mikroklima."
            : "Data calibrated for Denmark's climate (Köppen-Geiger Cfb: C = temperate, f = fully humid, b = warm summer below 22°C). Timings are indicative — adjust for your local microclimate."}
        </div>
      </div>
    </div>
  );
}
