import type { Crop, Lang, ActionType } from "../types";
import type { Theme } from "../utils/theme";
import { YearBar } from "./YearBar";
import { ACTION_META, ALL_ACTIONS, CATEGORY_LABEL, DIFFICULTY_COLOR, DIFFICULTY_LABEL, MONTHS_DA, MONTHS_EN } from "../utils/constants";

interface Props { crop: Crop; lang: Lang; theme: Theme; onClose: () => void; }

const DETAIL_ACTIONS: ActionType[] = ["sow_indoor", "sow_outdoor", "transplant", "harvest"];

export function CropDetail({ crop, lang, theme, onClose }: Props) {
  const months = lang === "da" ? MONTHS_DA : MONTHS_EN;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg.card, border: `1px solid ${theme.border.secondary}`, borderRadius: 16, padding: 28, maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 40 }}>{crop.icon}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: theme.text.primary, fontWeight: 700 }}>{lang === "da" ? crop.name_da : crop.name_en}</div>
            <div style={{ fontSize: 14, color: theme.text.secondary, fontStyle: "italic" }}>{lang === "da" ? crop.name_en : crop.name_da}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${theme.border.secondary}`, borderRadius: 8, color: theme.text.secondary, cursor: "pointer", padding: "4px 10px", fontSize: 16 }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ background: theme.bg.tab, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: theme.text.primary, border: `1px solid ${theme.border.secondary}` }}>{CATEGORY_LABEL[crop.category][lang]}</span>
          <span style={{ background: DIFFICULTY_COLOR[crop.difficulty] + "22", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: DIFFICULTY_COLOR[crop.difficulty], border: `1px solid ${DIFFICULTY_COLOR[crop.difficulty]}44` }}>{DIFFICULTY_LABEL[crop.difficulty][lang]}</span>
        </div>

        <p style={{ color: theme.text.primary, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{lang === "da" ? crop.care_note_da : crop.care_note_en}</p>

        <div style={{ marginBottom: 8, fontSize: 12, color: theme.text.secondary, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {lang === "da" ? "Årskalender" : "Year at a glance"}
        </div>
        <YearBar crop={crop} lang={lang} theme={theme} />

        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          {ALL_ACTIONS.map((key) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: theme.text.secondary }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: ACTION_META[key].color }} />
              {lang === "da" ? ACTION_META[key].label_da : ACTION_META[key].label_en}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {DETAIL_ACTIONS.filter((key) => crop[key].length > 0).map((key) => (
            <div key={key} style={{ background: theme.bg.secondary, borderRadius: 10, padding: "12px 14px", border: `1px solid ${ACTION_META[key].color}33` }}>
              <div style={{ fontSize: 11, color: ACTION_META[key].color, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {lang === "da" ? ACTION_META[key].label_da : ACTION_META[key].label_en}
              </div>
              <div style={{ fontSize: 13, color: theme.text.primary }}>
                {crop[key].map((m) => months[m - 1]).join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
