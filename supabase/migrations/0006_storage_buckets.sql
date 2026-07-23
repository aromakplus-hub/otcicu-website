-- ============================================================================
-- 0006: Storage buckets
--
-- All buckets are public-read (so <Image> tags and public pages can load
-- files directly by URL) but writes are restricted to authenticated admins.
-- Each bucket enforces a file-size limit and an allowed MIME type list at
-- the bucket level as a first line of defense, in addition to the app-level
-- validation described in SECURITY.md.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('executives', 'executives', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('gallery',    'gallery',    true, 8388608, array['image/jpeg', 'image/png', 'image/webp']),
  ('events',     'events',     true, 8388608, array['image/jpeg', 'image/png', 'image/webp']),
  ('news',       'news',       true, 8388608, array['image/jpeg', 'image/png', 'image/webp']),
  ('documents',  'documents',  true, 20971520, array['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('media',      'media',      true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Public read on every object in every one of these buckets.
create policy "public read all site buckets" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('executives', 'gallery', 'events', 'news', 'documents', 'media'));

-- Writes (upload/replace/delete) restricted to admin roles (editor+).
create policy "admins can upload to site buckets" on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('executives', 'gallery', 'events', 'news', 'documents', 'media')
    and public.is_admin()
  );

create policy "admins can update site bucket objects" on storage.objects
  for update to authenticated
  using (
    bucket_id in ('executives', 'gallery', 'events', 'news', 'documents', 'media')
    and public.is_admin()
  );

create policy "publishers can delete site bucket objects" on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('executives', 'gallery', 'events', 'news', 'documents', 'media')
    and public.can_publish()
  );
