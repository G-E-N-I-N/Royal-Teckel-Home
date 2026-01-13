export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            dogs: {
                Row: {
                    _id: string
                    age_months: number
                    breed: string
                    created_at: string
                    description_en: string | null
                    description_fr: string | null
                    gender: Database["public"]["Enums"]["dog_gender"]
                    image_url: string | null
                    is_featured: boolean | null
                    name: string
                    price: number
                    size: Database["public"]["Enums"]["dog_size"]
                    status: Database["public"]["Enums"]["dog_status"]
                    updated_at: string
                }
                Insert: {
                    age_months: number
                    breed: string
                    description_en?: string | null
                    description_fr?: string | null
                    gender: Database["public"]["Enums"]["dog_gender"]
                    image_url?: string | null
                    is_featured?: boolean | null
                    name: string
                    price: number
                    size: Database["public"]["Enums"]["dog_size"]
                    status?: Database["public"]["Enums"]["dog_status"]
                }
                Update: {
                    age_months?: number
                    breed?: string
                    description_en?: string | null
                    description_fr?: string | null
                    gender?: Database["public"]["Enums"]["dog_gender"]
                    image_url?: string | null
                    is_featured?: boolean | null
                    name?: string
                    price?: number
                    size?: Database["public"]["Enums"]["dog_size"]
                    status?: Database["public"]["Enums"]["dog_status"]
                }
                Relationships: []
            }

            profiles: {
                Row: {
                    _id: string
                    user_id: string
                    full_name: string | null
                    email: string
                    password: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    user_id: string
                    full_name?: string | null
                }
                Update: {
                    full_name?: string | null
                }
                Relationships: []
            }

            user_roles: {
                Row: {
                    _id: string
                    user_id: string
                    role: Database["public"]["Enums"]["app_role"]
                }
                Insert: {
                    user_id: string
                    role: Database["public"]["Enums"]["app_role"]
                }
                Update: {
                    role?: Database["public"]["Enums"]["app_role"]
                }
                Relationships: []
            }
        }

        Views: {
            [_ in never]: never
        }

        Functions: {
            [_ in never]: never
        }

        Enums: {
            app_role: "admin" | "user"
            dog_gender: "male" | "female"
            dog_size: "small" | "medium" | "large"
            dog_status: "available" | "reserved" | "sold"
        }

        CompositeTypes: {
            [_ in never]: never
        }
    }
}


type DatabaseWithoutInternals = Database
type DefaultSchema = DatabaseWithoutInternals["public"]

export type Tables<
    TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Row"]

export type TablesInsert<
    TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Insert"]

export type TablesUpdate<
    TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Update"]

export type Enums<
    EnumName extends keyof DefaultSchema["Enums"]
> = DefaultSchema["Enums"][EnumName]

export type CompositeTypes<
    CompositeTypeName extends keyof DefaultSchema["CompositeTypes"]
> = DefaultSchema["CompositeTypes"][CompositeTypeName]

export const Constants = {
    public: {
        Enums: {
            app_role: ["admin", "user"],
            dog_gender: ["male", "female"],
            dog_size: ["small", "medium", "large"],
            dog_status: ["available", "reserved", "sold"],
        },
    },
} as const
