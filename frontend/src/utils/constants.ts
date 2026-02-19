import type { ActionType, Difficulty, Category } from "../types";

export const MONTHS_DA = ["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"];
export const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const MONTH_TIPS: { da: string; en: string }[] = [
  { da: "Planlæg din have på papir. Bestil frø nu.", en: "Plan your garden on paper. Order seeds now." },
  { da: "Start porre og peberfrugter indendørs.", en: "Start leeks and peppers indoors." },
  { da: "Tomater og kål kan starte indendørs nu.", en: "Tomatoes and cabbage can start indoors now." },
  { da: "De første direkte såninger er mulige ude.", en: "First direct sowings outside are now possible." },
  { da: "Travleste måned — plant ud efter last frost.", en: "Busiest month — plant out after last frost." },
  { da: "Sommerens første høst nærmer sig.", en: "The first summer harvest is approaching." },
  { da: "Fuld høstsæson. Vand regelmæssigt.", en: "Full harvest season. Water regularly." },
  { da: "Høst og konserver. Sæt efterårskål ud.", en: "Harvest and preserve. Plant autumn crops." },
  { da: "Efterårssæson. Ryd og kompostér.", en: "Autumn season. Clear and compost." },
  { da: "Høst rodfrugt. Plant løg og hvidløg.", en: "Harvest root veg. Plant bulbs and garlic." },
  { da: "Sæsonen slutter. Forbered jordbunden.", en: "Season ending. Prepare the soil." },
  { da: "Hvil til haven. Planlæg næste år.", en: "Rest for the garden. Plan for next year." },
];

export const ACTION_META: Record<ActionType, { label_da: string; label_en: string; color: string }> = {
  sow_indoor:  { label_da: "Sår indendørs", label_en: "Sow indoors",  color: "#a78bfa" },
  sow_outdoor: { label_da: "Sår udendørs",  label_en: "Sow outdoors", color: "#34d399" },
  transplant:  { label_da: "Udplant",        label_en: "Transplant",   color: "#60a5fa" },
  harvest:     { label_da: "Høst",           label_en: "Harvest",      color: "#f59e0b" },
};

export const ALL_ACTIONS: ActionType[] = ["sow_indoor", "sow_outdoor", "transplant", "harvest"];

export const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  easy: "#4ade80", medium: "#fbbf24", hard: "#f87171",
};

export const DIFFICULTY_LABEL: Record<Difficulty, { da: string; en: string }> = {
  easy:   { da: "Let",    en: "Easy"   },
  medium: { da: "Middel", en: "Medium" },
  hard:   { da: "Svær",   en: "Hard"   },
};

export const CATEGORY_LABEL: Record<Category, { da: string; en: string }> = {
  vegetable: { da: "Grøntsag",   en: "Vegetable" },
  herb:      { da: "Krydderurt", en: "Herb"       },
  fruit:     { da: "Frugt",      en: "Fruit"      },
};
