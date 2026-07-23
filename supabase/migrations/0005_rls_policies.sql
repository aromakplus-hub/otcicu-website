-- ============================================================================
-- 0005: Row Level Security policies for content tables
--
-- Pattern used throughout:
--   - Public (anon + authenticated): can SELECT only rows with
--     status = 'published' and deleted_at is null.
--   - Any admin role (editor, administrator, super_admin): can SELECT
--     everything, including drafts/hidden, for the dashboard.
--   - INSERT/UPDATE: any admin role, but only administrator/super_admin
--     ("publishers") may set status to 'published' or 'archived' — an
--     editor's work is saved as 'draft' or 'hidden' until a publisher signs
--     off. This encodes the role descriptions from migration 0002.
--   - Hard DELETE (and soft-delete via deleted_at): publisher roles only.
-- ============================================================================

create or replace function public.can_publish()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('super_admin', 'administrator');
$$;

-- ---------------------------------------------------------------------------
-- Executives
-- ---------------------------------------------------------------------------
alter table public.executives enable row level security;

create policy "executives public read" on public.executives
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

create policy "executives admin read all" on public.executives
  for select to authenticated using (public.is_admin());

create policy "executives admin insert" on public.executives
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "executives admin update" on public.executives
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "executives publisher delete" on public.executives
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Gallery categories (reference data — any admin manages, no status concept)
-- ---------------------------------------------------------------------------
alter table public.gallery_categories enable row level security;

create policy "gallery_categories public read" on public.gallery_categories
  for select to anon, authenticated using (true);

create policy "gallery_categories admin write" on public.gallery_categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
alter table public.events enable row level security;

create policy "events public read" on public.events
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

create policy "events admin read all" on public.events
  for select to authenticated using (public.is_admin());

create policy "events admin insert" on public.events
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "events admin update" on public.events
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "events publisher delete" on public.events
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Gallery
-- ---------------------------------------------------------------------------
alter table public.gallery enable row level security;

create policy "gallery public read" on public.gallery
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

create policy "gallery admin read all" on public.gallery
  for select to authenticated using (public.is_admin());

create policy "gallery admin insert" on public.gallery
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "gallery admin update" on public.gallery
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "gallery publisher delete" on public.gallery
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- News
-- ---------------------------------------------------------------------------
alter table public.news enable row level security;

create policy "news public read" on public.news
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

create policy "news admin read all" on public.news
  for select to authenticated using (public.is_admin());

create policy "news admin insert" on public.news
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "news admin update" on public.news
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "news publisher delete" on public.news
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Documents
-- ---------------------------------------------------------------------------
alter table public.documents enable row level security;

create policy "documents public read" on public.documents
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

create policy "documents admin read all" on public.documents
  for select to authenticated using (public.is_admin());

create policy "documents admin insert" on public.documents
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "documents admin update" on public.documents
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "documents publisher delete" on public.documents
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Media library (any admin manages; it's just an index over Storage)
-- ---------------------------------------------------------------------------
alter table public.media_library enable row level security;

create policy "media_library admin read" on public.media_library
  for select to authenticated using (public.is_admin());

create policy "media_library admin write" on public.media_library
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Announcements
-- ---------------------------------------------------------------------------
alter table public.announcements enable row level security;

create policy "announcements public read" on public.announcements
  for select to anon, authenticated
  using (
    status = 'published'
    and starts_at <= now()
    and (expires_at is null or expires_at > now())
  );

create policy "announcements admin read all" on public.announcements
  for select to authenticated using (public.is_admin());

create policy "announcements admin insert" on public.announcements
  for insert to authenticated
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "announcements admin update" on public.announcements
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status in ('draft', 'hidden') or public.can_publish()));

create policy "announcements publisher delete" on public.announcements
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Settings & About content (sitewide/business-facing — publisher-gated writes)
-- ---------------------------------------------------------------------------
alter table public.settings enable row level security;
alter table public.about_content enable row level security;

create policy "settings public read" on public.settings
  for select to anon, authenticated using (true);

create policy "settings publisher update" on public.settings
  for update to authenticated using (public.can_publish()) with check (public.can_publish());

create policy "about_content public read" on public.about_content
  for select to anon, authenticated using (true);

create policy "about_content publisher update" on public.about_content
  for update to authenticated using (public.can_publish()) with check (public.can_publish());

-- ---------------------------------------------------------------------------
-- Contact messages: anyone can submit; only admins can read/manage.
-- ---------------------------------------------------------------------------
alter table public.contact_messages enable row level security;

create policy "contact_messages public insert" on public.contact_messages
  for insert to anon, authenticated with check (true);

create policy "contact_messages admin read" on public.contact_messages
  for select to authenticated using (public.is_admin());

create policy "contact_messages admin update" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "contact_messages publisher delete" on public.contact_messages
  for delete to authenticated using (public.can_publish());

-- ---------------------------------------------------------------------------
-- Activity logs: append-only audit trail. Inserted by SECURITY DEFINER RPCs
-- (see log_activity below), never directly by client code. Readable by
-- admins only; nobody may update or delete a log entry.
-- ---------------------------------------------------------------------------
alter table public.activity_logs enable row level security;

create policy "activity_logs admin read" on public.activity_logs
  for select to authenticated using (public.is_admin());

create or replace function public.log_activity(
  p_action text,
  p_table_name text,
  p_record_id uuid,
  p_old_value jsonb default null,
  p_new_value jsonb default null,
  p_ip_address text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.activity_logs (user_id, action, table_name, record_id, old_value, new_value, ip_address)
  values (auth.uid(), p_action, p_table_name, p_record_id, p_old_value, p_new_value, p_ip_address);
end;
$$;

revoke all on function public.log_activity from public;
grant execute on function public.log_activity to authenticated;
