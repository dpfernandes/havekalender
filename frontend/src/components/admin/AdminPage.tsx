import { useState } from "react";
import type { Crop } from "../../types";
import { useAdminCrops } from "../../hooks/useAdminCrops";
import { CropForm } from "./CropForm";
import { DIFFICULTY_COLOR, DIFFICULTY_LABEL, CATEGORY_LABEL } from "../../utils/constants";

type View = "list" | "create" | "edit";

interface Props { onBack: () => void; }

const MONTHS_SHORT = ["J","F","M","A","M","J","J","A","S","O","N","D"];

function MonthDots({ months, color }: { months: number[]; color: string }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {MONTHS_SHORT.map((_, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: months.includes(i + 1) ? color : "#1e2a1a" }} />
      ))}
    </div>
  );
}

function DeleteConfirm({ crop, onConfirm, onCancel, deleting }: { crop: Crop; onConfirm: () => void; onCancel: () => void; deleting: boolean }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#0f1f0d", border: "1px solid #7c2d2d", borderRadius: 16, padding: 28, maxWidth: 400, width: "100%" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🗑️</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "#f87171", marginBottom: 8 }}>Delete crop?</div>
        <div style={{ fontSize: 14, color: "#9bb89a", marginBottom: 24, lineHeight: 1.6 }}>
          This will permanently delete <strong style={{ color: "#c8e6c4" }}>{crop.name_da} / {crop.name_en}</strong> from the database. This cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ background: "#0f1f0d", border: "1px solid #1e3a1a", borderRadius: 8, color: "#6b8f65", cursor: "pointer", padding: "9px 20px", fontSize: 13 }}>Cancel</button>
          <button onClick={onConfirm} disabled={deleting} style={{ background: "#3a0a0a", border: "1px solid #7c2d2d", borderRadius: 8, color: "#f87171", cursor: deleting ? "not-allowed" : "pointer", padding: "9px 20px", fontSize: 13, fontWeight: 600 }}>
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminPage({ onBack }: Props) {
  const { crops, loading, error, createCrop, updateCrop, deleteCrop } = useAdminCrops();

  const [view, setView]               = useState<View>("list");
  const [editCrop, setEditCrop]       = useState<Crop | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Crop | null>(null);
  const [deleting, setDeleting]       = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [search, setSearch]           = useState("");
  const [successMsg, setSuccessMsg]   = useState<string | null>(null);

  const filtered = crops.filter(c =>
    c.name_da.toLowerCase().includes(search.toLowerCase()) ||
    c.name_en.toLowerCase().includes(search.toLowerCase())
  );

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSave = async (data: Omit<Crop, "id">) => {
    if (editCrop) {
      await updateCrop(editCrop.id, data);
      showSuccess(`"${data.name_da}" updated.`);
    } else {
      await createCrop(data);
      showSuccess(`"${data.name_da}" added.`);
    }
    setView("list");
    setEditCrop(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true); setDeleteError(null);
    try {
      await deleteCrop(deleteTarget.id);
      showSuccess(`"${deleteTarget.name_da}" deleted.`);
      setDeleteTarget(null);
    } catch (e: unknown) {
      setDeleteError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeleting(false);
    }
  };

  // ── Form view ───────────────────────────────────────────────────────────────
  if (view === "create" || view === "edit") {
    return (
      <div style={{ minHeight: "100vh", background: "#060e05", paddingBottom: 60 }}>
        <div style={{ background: "linear-gradient(180deg,#0a1c08,#060e05)", borderBottom: "1px solid #1e3a1a", padding: "20px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => { setView("list"); setEditCrop(null); }} style={{ background: "none", border: "none", color: "#4a7c59", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>←</button>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#c8e6c4" }}>
              {view === "create" ? "Add new crop" : `Edit: ${editCrop?.name_da}`}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 24px" }}>
          <CropForm
            initial={editCrop}
            onSave={handleSave}
            onCancel={() => { setView("list"); setEditCrop(null); }}
          />
        </div>
      </div>
    );
  }

  // ── List view ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#060e05", paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,#0a1c08,#060e05)", borderBottom: "1px solid #1e3a1a", padding: "20px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onBack} style={{ background: "none", border: "none", color: "#4a7c59", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>←</button>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#c8e6c4" }}>⚙️ Crop Admin</div>
              <div style={{ fontSize: 11, color: "#3a5a38", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
                {crops.length} crops in database
              </div>
            </div>
          </div>
          <button onClick={() => { setEditCrop(null); setView("create"); }} style={{ background: "#2d5a3d", border: "1px solid #4a7c59", borderRadius: 8, color: "#c8e6c4", cursor: "pointer", padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>
            + Add crop
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 24px" }}>

        {/* Success toast */}
        {successMsg && (
          <div style={{ background: "#0f2a0d", border: "1px solid #4a7c59", borderRadius: 8, padding: "10px 16px", color: "#c8e6c4", fontSize: 13, marginBottom: 16 }}>
            ✅ {successMsg}
          </div>
        )}

        {/* Error */}
        {(error || deleteError) && (
          <div style={{ background: "#2a0a0a", border: "1px solid #7c2d2d", borderRadius: 8, padding: "10px 16px", color: "#f87171", fontSize: 13, marginBottom: 16 }}>
            {error ?? deleteError}
          </div>
        )}

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search crops…"
          style={{ width: "100%", background: "#0a1508", border: "1px solid #1e3a1a", borderRadius: 8, color: "#c8e6c4", padding: "9px 14px", fontSize: 13, outline: "none", marginBottom: 16 }}
        />

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { color: "#a78bfa", label: "Sow indoors" },
            { color: "#34d399", label: "Sow outdoors" },
            { color: "#60a5fa", label: "Transplant" },
            { color: "#f59e0b", label: "Harvest" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4a6b45" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#3a5a38", padding: "40px 0" }}>Loading…</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filtered.map(crop => (
              <div key={crop.id} style={{ background: "#0a1508", border: "1px solid #1a2d18", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>

                {/* Icon + Name */}
                <span style={{ fontSize: 22, minWidth: 30 }}>{crop.icon}</span>
                <div style={{ flex: "0 0 180px", minWidth: 0 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", color: "#c8e6c4", fontSize: 14, fontWeight: 600 }}>{crop.name_da}</div>
                  <div style={{ color: "#4a6b45", fontSize: 12, fontStyle: "italic" }}>{crop.name_en}</div>
                </div>

                {/* Badges */}
                <div style={{ flex: "0 0 120px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 10, color: "#6b8f65", background: "#1e2a1a", borderRadius: 20, padding: "2px 8px", width: "fit-content" }}>
                    {CATEGORY_LABEL[crop.category]["en"]}
                  </span>
                  <span style={{ fontSize: 10, color: DIFFICULTY_COLOR[crop.difficulty], background: DIFFICULTY_COLOR[crop.difficulty] + "1a", borderRadius: 20, padding: "2px 8px", width: "fit-content" }}>
                    {DIFFICULTY_LABEL[crop.difficulty]["en"]}
                  </span>
                </div>

                {/* Month dots */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <MonthDots months={crop.sow_indoor}  color="#a78bfa" />
                  <MonthDots months={crop.sow_outdoor} color="#34d399" />
                  <MonthDots months={crop.transplant}  color="#60a5fa" />
                  <MonthDots months={crop.harvest}     color="#f59e0b" />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => { setEditCrop(crop); setView("edit"); }}
                    style={{ background: "#0f1f0d", border: "1px solid #2d4a2a", borderRadius: 7, color: "#6b8f65", cursor: "pointer", padding: "6px 12px", fontSize: 12 }}
                  >✏️ Edit</button>
                  <button
                    onClick={() => setDeleteTarget(crop)}
                    style={{ background: "#1a0a0a", border: "1px solid #3a1a1a", borderRadius: 7, color: "#f87171", cursor: "pointer", padding: "6px 12px", fontSize: 12 }}
                  >🗑️ Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#3a5a38", padding: "40px 0" }}>No crops match your search.</div>
            )}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <DeleteConfirm
          crop={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => { setDeleteTarget(null); setDeleteError(null); }}
          deleting={deleting}
        />
      )}
    </div>
  );
}
