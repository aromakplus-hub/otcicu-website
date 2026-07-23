-- ============================================================================
-- 0003: Content tables
-- ============================================================================

create type public.content_status as enum ('draft', 'published', 'hidden', 'archived');

-- ---------------------------------------------------------------------------
-- Executives
-- ---------------------------------------------------------------------------
create table public.executives (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  "position" text not null,
  biography text,
  email text,
  phone text,
  photo_url text,
  display_order integer not null default 0,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index executives_status_idx on public.executives (status) where deleted_at is null;
create index executives_display_order_idx on public.executives (display_order);

create trigger set_executives_updated_at
  before update on public.executives
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Gallery
-- ---------------------------------------------------------------------------
create table public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_image_url text,
  event_date timestamptz,
  location text,
  registration_link text,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index events_status_idx on public.events (status) where deleted_at is null;
create index events_event_date_idx on public.events (event_date);

create trigger set_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  category_id uuid references public.gallery_categories (id) on delete set null,
  event_id uuid references public.events (id) on delete set null,
  display_order integer not null default 0,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index gallery_status_idx on public.gallery (status) where deleted_at is null;
create index gallery_category_idx on public.gallery (category_id);
create index gallery_display_order_idx on public.gallery (display_order);

create trigger set_gallery_updated_at
  before update on public.gallery
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- News
-- ---------------------------------------------------------------------------
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  featured_image_url text,
  category text,
  seo_title text,
  meta_description text,
  is_featured boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index news_status_idx on public.news (status) where deleted_at is null;
create index news_slug_idx on public.news (slug);
create index news_published_at_idx on public.news (published_at desc);

create trigger set_news_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Documents (constitution, circulars, forms, reports, minutes)
-- ---------------------------------------------------------------------------
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  file_type text not null, -- 'pdf' | 'docx'
  category text not null,  -- 'constitution' | 'circular' | 'form' | 'report' | 'minutes'
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index documents_status_idx on public.documents (status) where deleted_at is null;
create index documents_category_idx on public.documents (category);

create trigger set_documents_updated_at
  before update on public.documents
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Media library (searchable index over everything uploaded to Storage)
-- ---------------------------------------------------------------------------
create table public.media_library (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_type text not null,
  file_size bigint,
  alt_text text,
  module text not null, -- 'executives' | 'gallery' | 'news' | 'events' | 'documents'
  uploaded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create index media_library_module_idx on public.media_library (module);

-- ---------------------------------------------------------------------------
-- Announcements
-- ---------------------------------------------------------------------------
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  is_pinned boolean not null default false,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index announcements_status_idx on public.announcements (status);
create index announcements_pinned_idx on public.announcements (is_pinned);

create trigger set_announcements_updated_at
  before update on public.announcements
  for each row execute function public.set_updated_at();
