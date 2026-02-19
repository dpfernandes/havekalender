import { useState } from "react";
import type { Lang } from "../types";

export function useCalendar() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [lang, setLang]   = useState<Lang>("da");

  const prevMonth  = () => setMonth((m) => (m + 11) % 12);
  const nextMonth  = () => setMonth((m) => (m + 1)  % 12);
  const toggleLang = () => setLang((l) => (l === "da" ? "en" : "da"));

  return { month, setMonth, prevMonth, nextMonth, lang, toggleLang };
}
