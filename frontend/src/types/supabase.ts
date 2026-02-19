export type Json = number | string | boolean | null | Json[] | { [key: string]: Json };

export interface Database {
  public: {
    Tables: {
      crops: {
        Row: {
          id: number;
          name_da: string;
          name_en: string;
          category: string;
          icon: string;
          sow_indoor: number[];
          sow_outdoor: number[];
          transplant: number[];
          harvest: number[];
          difficulty: string;
          care_note_da: string;
          care_note_en: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["crops"]["Row"], "id" | "created_at" | "updated_at"> & { id?: number };
        Update: Partial<Omit<Database["public"]["Tables"]["crops"]["Row"], "id">>;
      };
    };
  };
}
