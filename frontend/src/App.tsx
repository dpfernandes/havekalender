import { useState, useEffect } from "react";
import type { Crop } from "./types";
import { useCalendar } from "./hooks/useCalendar";
import { useCrops } from "./hooks/useCrops";
import { Header } from "./components/Header";
import { MonthStrip } from "./components/MonthStrip";
import { MonthNav } from "./components/MonthNav";
import { TipBanner } from "./components/TipBanner";
import { CropCard } from "./components/CropCard";
import { HarvestCard } from "./components/HarvestCard";
import { CropDetail } from "./components/CropDetail";
import { Footer } from "./components/Footer";
import { AdminPage } from "./components/admin/AdminPage";

type Tab  = "plant" | "harvest";
type Page = "calendar" | "admin";

export default function App() {
  const { month, setMonth, prevMonth, nextMonth, lang, toggleLang } = useCalendar();
  const { crops, plant, harvest } = useCrops(month);
  const [activeTab, setActiveTab]       = useState<Tab>("plant");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [page, setPage]                 = useState<Page>("calendar");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  if (page === "admin") {
    return <AdminPage onBack={() => setPage("calendar")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060e05", color: "#c8e6c4", fontFamily: "'Georgia',serif", paddingBottom: 60 }}>
      <Header lang={lang} onToggleLang={toggleLang} onAdminClick={() => setPage("admin")} />
      <MonthStrip crops={crops} currentMonth={month} lang={lang} onSelect={setMonth} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        <MonthNav month={month} plantCount={plant.length} harvestCount={harvest.length} lang={lang} onPrev={prevMonth} onNext={nextMonth} />
        <TipBanner month={month} lang={lang} />

        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: 20, background: "#0a1508", borderRadius: 10, padding: 4, border: "1px solid #1e3a1a" }}>
          {(["plant", "harvest"] as Tab[]).map((tab) => {
            const active    = activeTab === tab;
            const isHarvest = tab === "harvest";
            const count     = tab === "plant" ? plant.length : harvest.length;
            const label     = tab === "plant"
              ? (lang === "da" ? `🌱 Planter (${count})` : `🌱 Plant (${count})`)
              : (lang === "da" ? `🌾 Høst (${count})`    : `🌾 Harvest (${count})`);
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, background: active ? (isHarvest ? "#2a1e00" : "#0f2a0d") : "transparent",
                border: active ? (isHarvest ? "1px solid #3a2e00" : "1px solid #2d4a2a") : "1px solid transparent",
                borderRadius: 8, padding: "10px 16px", cursor: "pointer",
                color: active ? (isHarvest ? "#fde68a" : "#c8e6c4") : "#3a5a38",
                fontSize: 14, fontFamily: "'Playfair Display',serif", fontWeight: 600, transition: "all 0.2s",
              }}>{label}</button>
            );
          })}
        </div>

        {activeTab === "plant" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {plant.length === 0
              ? <div style={{ textAlign: "center", color: "#2d4a2a", padding: "40px 0" }}>{lang === "da" ? "Ingen såning eller plantning denne måned." : "No sowing or planting this month."}</div>
              : plant.map(c => <CropCard key={c.id} crop={c} month={month} lang={lang} onClick={() => setSelectedCrop(c)} />)
            }
          </div>
        )}

        {activeTab === "harvest" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {harvest.length === 0
              ? <div style={{ textAlign: "center", color: "#3a2e00", padding: "40px 0" }}>{lang === "da" ? "Ingen høst denne måned." : "Nothing to harvest this month."}</div>
              : harvest.map(c => <HarvestCard key={c.id} crop={c} lang={lang} onClick={() => setSelectedCrop(c)} />)
            }
          </div>
        )}

        <Footer lang={lang} />
      </div>

      {selectedCrop && <CropDetail crop={selectedCrop} lang={lang} onClose={() => setSelectedCrop(null)} />}
    </div>
  );
}
