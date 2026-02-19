export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      crops: {
        Row: {
          id: number
          name_da: string
          name_en: string
          category: 'vegetable' | 'herb' | 'fruit'
          icon: string
          sow_indoor: number[]
          sow_outdoor: number[]
          transplant: number[]
          harvest: number[]
          difficulty: 'easy' | 'medium' | 'hard'
          care_note_da: string
          care_note_en: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          name_da: string
          name_en: string
          category: 'vegetable' | 'herb' | 'fruit'
          icon?: string
          sow_indoor?: number[]
          sow_outdoor?: number[]
          transplant?: number[]
          harvest?: number[]
          difficulty: 'easy' | 'medium' | 'hard'
          care_note_da?: string
          care_note_en?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          name_da?: string
          name_en?: string
          category?: 'vegetable' | 'herb' | 'fruit'
          icon?: string
          sow_indoor?: number[]
          sow_outdoor?: number[]
          transplant?: number[]
          harvest?: number[]
          difficulty?: 'easy' | 'medium' | 'hard'
          care_note_da?: string
          care_note_en?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
