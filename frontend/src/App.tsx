import { useState, useEffect } from "react";
import type { Crop } from "./types";
import { useCalendar } from "./hooks/useCalendar";
import { useCrops } from "./hooks/useCrops";
import { useDarkMode } from "./hooks/useDarkMode";
import { getTheme } from "./utils/theme";
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
  const { crops, plant, harvest, loading, error } = useCrops(month);
  const { isDark, toggleDarkMode } = useDarkMode();
  const theme = getTheme(isDark);
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg.primary, color: theme.text.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
          <div style={{ fontSize: 18, fontFamily: "'Playfair Display',serif" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: theme.bg.primary, color: theme.text.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 400, padding: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <div style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>Error loading data</div>
          <div style={{ fontSize: 14, color: theme.text.secondary }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: theme.bg.primary, color: theme.text.primary, fontFamily: "'Georgia',serif", paddingBottom: 60, transition: "background 0.3s, color 0.3s" }}>
      <Header lang={lang} isDark={isDark} theme={theme} onToggleLang={toggleLang} onToggleDarkMode={toggleDarkMode} onAdminClick={() => setPage("admin")} />
      <MonthStrip crops={crops} currentMonth={month} lang={lang} onSelect={setMonth} theme={theme} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        <MonthNav month={month} plantCount={plant.length} harvestCount={harvest.length} lang={lang} onPrev={prevMonth} onNext={nextMonth} theme={theme} />
        <TipBanner month={month} lang={lang} theme={theme} />

        <div style={{ display: "flex", marginBottom: 20, background: theme.bg.tab, borderRadius: 10, padding: 4, border: `1px solid ${theme.border.primary}` }}>
          {(["plant", "harvest"] as Tab[]).map((tab) => {
            const active    = activeTab === tab;
            const isHarvest = tab === "harvest";
            const count     = tab === "plant" ? plant.length : harvest.length;
            const label     = tab === "plant"
              ? (lang === "da" ? `🌱 Planter (${count})` : `🌱 Plant (${count})`)
              : (lang === "da" ? `🌾 Høst (${count})`    : `🌾 Harvest (${count})`);
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, background: active ? (isHarvest ? theme.bg.harvestTab : theme.bg.tabActive) : "transparent",
                border: active ? (isHarvest ? `1px solid ${theme.border.harvestCard}` : `1px solid ${theme.border.secondary}`) : "1px solid transparent",
                borderRadius: 8, padding: "10px 16px", cursor: "pointer",
                color: active ? (isHarvest ? theme.text.harvest : theme.text.primary) : theme.text.tertiary,
                fontSize: 14, fontFamily: "'Playfair Display',serif", fontWeight: 600, transition: "all 0.2s",
              }}>{label}</button>
            );
          })}
        </div>

        {activeTab === "plant" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {plant.length === 0
              ? <div style={{ textAlign: "center", color: theme.text.tertiary, padding: "40px 0" }}>{lang === "da" ? "Ingen såning eller plantning denne måned." : "No sowing or planting this month."}</div>
              : plant.map(c => <CropCard key={c.id} crop={c} month={month} lang={lang} theme={theme} onClick={() => setSelectedCrop(c)} />)
            }
          </div>
        )}

        {activeTab === "harvest" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {harvest.length === 0
              ? <div style={{ textAlign: "center", color: theme.text.tertiary, padding: "40px 0" }}>{lang === "da" ? "Ingen høst denne måned." : "Nothing to harvest this month."}</div>
              : harvest.map(c => <HarvestCard key={c.id} crop={c} lang={lang} theme={theme} onClick={() => setSelectedCrop(c)} />)
            }
          </div>
        )}

        <Footer lang={lang} theme={theme} />
      </div>

      {selectedCrop && <CropDetail crop={selectedCrop} lang={lang} theme={theme} onClose={() => setSelectedCrop(null)} />}
    </div>
  );
}
