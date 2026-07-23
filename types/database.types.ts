/**
 * Hand-authored to mirror supabase/migrations/*.sql exactly.
 *
 * IMPORTANT: Once you have CLI access to the live `otcicu-cms` Supabase
 * project, regenerate this file for real via:
 *
 *   npx supabase gen types typescript --project-id <project-ref> > types/database.types.ts
 *
 * and diff it against this version — the hand-written version is only a
 * stand-in for local development/type-checking until then. Re-run codegen
 * again after every future migration.
 *
 * `Relationships` is intentionally left as `[]` on every table: this repo's
 * application code never uses Supabase's embedded-resource select syntax
 * (e.g. `.select("*, roles(name)")`), it calls the `current_user_role()` RPC
 * instead — so no foreign-key relationship metadata needs to be typed here.
 * Real codegen will fill this in automatically once available.
 */

export type ContentStatus = "draft" | "published" | "hidden" | "archived";
export type RoleName = "super_admin" | "administrator" | "editor" | "viewer";

type Timestamps = {
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      roles: {
        Row: { id: number; name: RoleName; description: string | null; created_at: string };
        Insert: { id?: number; name: RoleName; description?: string | null };
        Update: { name?: RoleName; description?: string | null };
        Relationships: [];
      };
      permissions: {
        Row: { id: number; key: string; description: string | null; created_at: string };
        Insert: { id?: number; key: string; description?: string | null };
        Update: { key?: string; description?: string | null };
        Relationships: [];
      };
      role_permissions: {
        Row: { role_id: number; permission_id: number };
        Insert: { role_id: number; permission_id: number };
        Update: { role_id?: number; permission_id?: number };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role_id: number;
          avatar_url: string | null;
          is_active: boolean;
        } & Timestamps;
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role_id: number;
          avatar_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          full_name?: string | null;
          role_id?: number;
          avatar_url?: string | null;
          is_active?: boolean;
        };
        Relationships: [];
      };
      executives: {
        Row: {
          id: string;
          full_name: string;
          position: string;
          biography: string | null;
          email: string | null;
          phone: string | null;
          photo_url: string | null;
          display_order: number;
          status: ContentStatus;
          created_by: string | null;
          deleted_at: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          full_name: string;
          position: string;
          biography?: string | null;
          email?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          display_order?: number;
          status?: ContentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["executives"]["Insert"]> & {
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      gallery_categories: {
        Row: { id: string; name: string; slug: string; created_at: string };
        Insert: { id?: string; name: string; slug: string };
        Update: { name?: string; slug?: string };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          cover_image_url: string | null;
          event_date: string | null;
          location: string | null;
          registration_link: string | null;
          status: ContentStatus;
          created_by: string | null;
          deleted_at: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          cover_image_url?: string | null;
          event_date?: string | null;
          location?: string | null;
          registration_link?: string | null;
          status?: ContentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]> & {
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      gallery: {
        Row: {
          id: string;
          image_url: string;
          caption: string | null;
          category_id: string | null;
          event_id: string | null;
          display_order: number;
          status: ContentStatus;
          created_by: string | null;
          deleted_at: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          image_url: string;
          caption?: string | null;
          category_id?: string | null;
          event_id?: string | null;
          display_order?: number;
          status?: ContentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["gallery"]["Insert"]> & {
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      news: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          featured_image_url: string | null;
          category: string | null;
          seo_title: string | null;
          meta_description: string | null;
          is_featured: boolean;
          status: ContentStatus;
          published_at: string | null;
          created_by: string | null;
          deleted_at: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          featured_image_url?: string | null;
          category?: string | null;
          seo_title?: string | null;
          meta_description?: string | null;
          is_featured?: boolean;
          status?: ContentStatus;
          published_at?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["news"]["Insert"]> & {
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          file_url: string;
          file_type: string;
          category: string;
          status: ContentStatus;
          created_by: string | null;
          deleted_at: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          file_url: string;
          file_type: string;
          category: string;
          status?: ContentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]> & {
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      media_library: {
        Row: {
          id: string;
          file_url: string;
          file_type: string;
          file_size: number | null;
          alt_text: string | null;
          module: string;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          file_url: string;
          file_type: string;
          file_size?: number | null;
          alt_text?: string | null;
          module: string;
          uploaded_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["media_library"]["Insert"]>;
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          message: string;
          is_pinned: boolean;
          starts_at: string;
          expires_at: string | null;
          status: ContentStatus;
          created_by: string | null;
        } & Timestamps;
        Insert: {
          id?: string;
          title: string;
          message: string;
          is_pinned?: boolean;
          starts_at?: string;
          expires_at?: string | null;
          status?: ContentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["announcements"]["Insert"]>;
        Relationships: [];
      };
      settings: {
        Row: {
          id: 1;
          site_name: string;
          logo_url: string | null;
          favicon_url: string | null;
          footer_text: string | null;
          copyright_text: string | null;
          primary_color: string;
          secondary_color: string;
          seo_default_title: string | null;
          seo_default_description: string | null;
          phone: string | null;
          email: string | null;
          whatsapp: string | null;
          office_address: string | null;
          google_maps_embed_url: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          x_url: string | null;
          youtube_url: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: never; // singleton row, seeded by migration — never inserted from the app
        Update: Partial<
          Omit<Database["public"]["Tables"]["settings"]["Row"], "id" | "updated_at">
        >;
        Relationships: [];
      };
      about_content: {
        Row: {
          id: 1;
          history: string | null;
          vision: string | null;
          mission: string | null;
          objectives: { title: string; description: string }[];
          chairmans_message: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: never; // singleton row, seeded by migration — never inserted from the app
        Update: Partial<
          Omit<Database["public"]["Tables"]["about_content"]["Row"], "id" | "updated_at">
        >;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: "new" | "read" | "archived";
          replied_at: string | null;
          created_at: string;
        };
        Insert: {
          full_name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
        };
        Update: { status?: "new" | "read" | "archived"; replied_at?: string | null };
        Relationships: [];
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          table_name: string;
          record_id: string | null;
          old_value: Record<string, unknown> | null;
          new_value: Record<string, unknown> | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: never; // written only via the log_activity() RPC
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_user_role: { Args: Record<string, never>; Returns: RoleName | null };
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_super_admin: { Args: Record<string, never>; Returns: boolean };
      can_publish: { Args: Record<string, never>; Returns: boolean };
      update_own_profile: {
        Args: { p_full_name?: string | null; p_avatar_url?: string | null };
        Returns: Database["public"]["Tables"]["profiles"]["Row"];
      };
      log_activity: {
        Args: {
          p_action: string;
          p_table_name: string;
          p_record_id: string | null;
          p_old_value?: Record<string, unknown> | null;
          p_new_value?: Record<string, unknown> | null;
          p_ip_address?: string | null;
        };
        Returns: void;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
