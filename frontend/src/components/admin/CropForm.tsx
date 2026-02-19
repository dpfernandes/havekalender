import { useState, useEffect } from "react";
import type { Crop, Category, Difficulty } from "../../types";

type FormData = Omit<Crop, "id">;

const EMPTY: FormData = {
  name_da: "", name_en: "", category: "vegetable", icon: "",
  sow_indoor: [], sow_outdoor: [], transplant: [], harvest: [],
  difficulty: "easy", care_note_da: "", care_note_en: "",
};

const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface Props {
  initial?: Crop | null;
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

function MonthPicker({ label, value, onChange }: { label: string; value: number[]; onChange: (v: number[]) => void }) {
  const toggle = (m: number) =>
    onChange(value.includes(m) ? value.filter(x => x !== m) : [...value, m].sort((a, b) => a - b));
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {MONTHS_EN.map((name, i) => {
          const m = i + 1;
          const active = value.includes(m);
          return (
            <button key={m} type="button" onClick={() => toggle(m)} style={{
              padding: "4px 8px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontFamily: "monospace",
              background: active ? "#2d5a3d" : "#0f1f0d",
              border: active ? "1px solid #4a7c59" : "1px solid #1e3a1a",
              color: active ? "#c8e6c4" : "#4a6b45",
            }}>{name}</button>
          );
        })}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#0a1508", border: "1px solid #1e3a1a", borderRadius: 8,
  color: "#c8e6c4", padding: "8px 12px", fontSize: 13, fontFamily: "inherit", outline: "none",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, color: "#4a7c59", fontWeight: 600,
  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5,
};

export function CropForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm]     = useState<FormData>(initial ? { ...initial } : { ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState<string | null>(null);

  useEffect(() => { setForm(initial ? { ...initial } : { ...EMPTY }); }, [initial]);

  const set = (key: keyof FormData, value: unknown) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_da || !form.name_en) { setErr("Both Danish and English names are required."); return; }
    setSaving(true); setErr(null);
    try { await onSave(form); }
    catch (e: unknown) { setErr(e instanceof Error ? e.message : "Save failed."); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

      {err && (
        <div style={{ background: "#2a0a0a", border: "1px solid #7c2d2d", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: 13, marginBottom: 16 }}>
          {err}
        </div>
      )}

      {/* Names + Icon */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Navn (DA) *</label>
          <input style={inputStyle} value={form.name_da} onChange={e => set("name_da", e.target.value)} placeholder="Tomat" required />
        </div>
        <div>
          <label style={labelStyle}>Name (EN) *</label>
          <input style={inputStyle} value={form.name_en} onChange={e => set("name_en", e.target.value)} placeholder="Tomato" required />
        </div>
        <div>
          <label style={labelStyle}>Icon</label>
          <input style={inputStyle} value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="🍅" />
        </div>
      </div>

      {/* Category + Difficulty */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Category *</label>
          <select style={inputStyle} value={form.category} onChange={e => set("category", e.target.value as Category)}>
            <option value="vegetable">Vegetable / Grøntsag</option>
            <option value="herb">Herb / Krydderurt</option>
            <option value="fruit">Fruit / Frugt</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Difficulty *</label>
          <select style={inputStyle} value={form.difficulty} onChange={e => set("difficulty", e.target.value as Difficulty)}>
            <option value="easy">Easy / Let</option>
            <option value="medium">Medium / Middel</option>
            <option value="hard">Hard / Svær</option>
          </select>
        </div>
      </div>

      {/* Month pickers */}
      <MonthPicker label="Sow Indoors / Sår indendørs"  value={form.sow_indoor}  onChange={v => set("sow_indoor",  v)} />
      <MonthPicker label="Sow Outdoors / Sår udendørs"  value={form.sow_outdoor} onChange={v => set("sow_outdoor", v)} />
      <MonthPicker label="Transplant / Udplant"          value={form.transplant}  onChange={v => set("transplant",  v)} />
      <MonthPicker label="Harvest / Høst"                value={form.harvest}     onChange={v => set("harvest",     v)} />

      {/* Care notes */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Care note (DA)</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 64 }} value={form.care_note_da} onChange={e => set("care_note_da", e.target.value)} placeholder="Dansk plejebeskrivelse..." />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Care note (EN)</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 64 }} value={form.care_note_en} onChange={e => set("care_note_en", e.target.value)} placeholder="English care description..." />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ background: "#0f1f0d", border: "1px solid #1e3a1a", borderRadius: 8, color: "#6b8f65", cursor: "pointer", padding: "9px 20px", fontSize: 13 }}>
          Cancel
        </button>
        <button type="submit" disabled={saving} style={{ background: saving ? "#1a3a1a" : "#2d5a3d", border: "1px solid #4a7c59", borderRadius: 8, color: "#c8e6c4", cursor: saving ? "not-allowed" : "pointer", padding: "9px 20px", fontSize: 13, fontWeight: 600 }}>
          {saving ? "Saving…" : initial ? "Save changes" : "Add crop"}
        </button>
      </div>
    </form>
  );
}
