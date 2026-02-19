export type Lang = "da" | "en";
export type Category = "vegetable" | "herb" | "fruit";
export type Difficulty = "easy" | "medium" | "hard";
export type ActionType = "sow_indoor" | "sow_outdoor" | "transplant" | "harvest";

export interface Crop {
  id: number;
  name_da: string;
  name_en: string;
  category: Category;
  icon: string;
  sow_indoor: number[];
  sow_outdoor: number[];
  transplant: number[];
  harvest: number[];
  difficulty: Difficulty;
  care_note_da: string;
  care_note_en: string;
}

export interface CropAction {
  type: ActionType;
  label_da: string;
  label_en: string;
  color: string;
}
