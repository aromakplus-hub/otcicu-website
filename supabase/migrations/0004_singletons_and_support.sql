-- ============================================================================
-- 0004: Singleton content tables + contact messages + activity log
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Site settings (single row, id is always 1)
-- ---------------------------------------------------------------------------
create table public.settings (
  id smallint primary key default 1,
  site_name text not null default 'OTITOLOJU C.I.C.U',
  logo_url text,
  favicon_url text,
  footer_text text,
  copyright_text text,
  primary_color text not null default '#0b6e4f',
  secondary_color text not null default '#c9a227',
  seo_default_title text,
  seo_default_description text,
  phone text,
  email text,
  whatsapp text,
  office_address text,
  google_maps_embed_url text,
  facebook_url text,
  instagram_url text,
  x_url text,
  youtube_url text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  constraint settings_singleton check (id = 1)
);

insert into public.settings (id) values (1);

create trigger set_settings_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- About page content (single row, id is always 1)
-- ---------------------------------------------------------------------------
create table public.about_content (
  id smallint primary key default 1,
  history text,
  vision text,
  mission text,
  objectives jsonb not null default '[]'::jsonb, -- array of { title, description }
  chairmans_message text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  constraint about_content_singleton check (id = 1)
);

insert into public.about_content (id) values (1);

create trigger set_about_content_updated_at
  before update on public.about_content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Contact form submissions
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

create index contact_messages_status_idx on public.contact_messages (status);

-- ---------------------------------------------------------------------------
-- Activity log (audit trail for every admin mutation)
-- ---------------------------------------------------------------------------
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id),
  action text not null,       -- e.g. 'executive.create', 'news.publish'
  table_name text not null,
  record_id uuid,
  old_value jsonb,
  new_value jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create index activity_logs_user_idx on public.activity_logs (user_id);
create index activity_logs_table_idx on public.activity_logs (table_name, record_id);
create index activity_logs_created_at_idx on public.activity_logs (created_at desc);
