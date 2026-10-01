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
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          content: string | null
          cover_image: string | null
          images: string[] | null
          technologies: string[] | null
          demo_url: string | null
          repo_url: string | null
          status: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
          featured: boolean
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string
          content?: string | null
          cover_image?: string | null
          images?: string[] | null
          technologies?: string[] | null
          demo_url?: string | null
          repo_url?: string | null
          status?: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
          featured?: boolean
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          content?: string | null
          cover_image?: string | null
          images?: string[] | null
          technologies?: string[] | null
          demo_url?: string | null
          repo_url?: string | null
          status?: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
          featured?: boolean
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          role: string
          company: string
          company_url: string | null
          location: string | null
          start_date: string
          end_date: string | null
          description: string[] | null
          logo: string | null
          technologies: string[] | null
          language: string
          created_at: string
        }
        Insert: {
          id?: string
          role: string
          company: string
          company_url?: string | null
          location?: string | null
          start_date: string
          end_date?: string | null
          description?: string[] | null
          logo?: string | null
          technologies?: string[] | null
          language?: string
          created_at?: string
        }
        Update: {
          id?: string
          role?: string
          company?: string
          company_url?: string | null
          location?: string | null
          start_date?: string
          end_date?: string | null
          description?: string[] | null
          logo?: string | null
          technologies?: string[] | null
          language?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          content?: string
          read?: boolean
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          color: string
          logo: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string
          color?: string
          logo?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          color?: string
          logo?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          language: string
          full_name: string
          headline: string
          summary: string
          location: string | null
          email: string | null
          phone: string | null
          website: string | null
          linkedin: string | null
          github: string | null
          education: Json
          spoken_languages: Json
          soft_skills: string[]
          interests: string[]
          updated_at: string
        }
        Insert: {
          language: string
          full_name?: string
          headline?: string
          summary?: string
          location?: string | null
          email?: string | null
          phone?: string | null
          website?: string | null
          linkedin?: string | null
          github?: string | null
          education?: Json
          spoken_languages?: Json
          soft_skills?: string[]
          interests?: string[]
          updated_at?: string
        }
        Update: {
          language?: string
          full_name?: string
          headline?: string
          summary?: string
          location?: string | null
          email?: string | null
          phone?: string | null
          website?: string | null
          linkedin?: string | null
          github?: string | null
          education?: Json
          spoken_languages?: Json
          soft_skills?: string[]
          interests?: string[]
          updated_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string | null
          updated_at?: string
        }
      }
    }
  }
}
