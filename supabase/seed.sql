-- ============================================================================
-- Seed script — reference/lookup data only.
--
-- Roles are already seeded by migration 0002_roles_and_profiles.sql.
-- Actual site content (executives, gallery, news, events, settings, about
-- text) is intentionally NOT seeded here — it will be migrated from the
-- current hardcoded lib/data/*.ts files into these tables in Phases 4-9,
-- so the CMS launches already populated with your real content rather than
-- empty. Seeding it twice would just create duplicates to clean up later.
--
-- Run with: supabase db execute -f supabase/seed.sql
-- (or paste into the Supabase SQL Editor)
-- ============================================================================

insert into public.gallery_categories (name, slug) values
  ('History', 'history'),
  ('Meetings', 'meetings'),
  ('Awards', 'awards'),
  ('Office', 'office'),
  ('Services', 'services'),
  ('Community', 'community'),
  ('Training', 'training'),
  ('Membership', 'membership')
on conflict (name) do nothing;

-- Permission catalogue (referenced by role_permissions in a future phase
-- once the User Management UI needs fine-grained checks beyond the four
-- fixed roles; the role-level checks in 0005 are sufficient for now).
insert into public.permissions (key, description) values
  ('executives.manage', 'Create, edit, publish, and delete executives'),
  ('gallery.manage', 'Upload, edit, publish, and delete gallery images'),
  ('news.manage', 'Create, edit, publish, and delete news articles'),
  ('events.manage', 'Create, edit, publish, and delete events'),
  ('documents.manage', 'Upload, edit, publish, and delete documents'),
  ('settings.manage', 'Edit site settings and About page content'),
  ('users.manage', 'Invite, edit, and deactivate admin users')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Creating the first super_admin (manual step — see SETUP.md):
--
-- 1. In the Supabase Dashboard: Authentication > Users > Add User, create
--    an account with your email + a temporary password. This automatically
--    creates a matching row in public.profiles via the handle_new_user()
--    trigger, defaulted to the 'viewer' role.
--
-- 2. Promote that account to super_admin by running:
--
--      update public.profiles
--      set role_id = (select id from public.roles where name = 'super_admin')
--      where email = 'your-email@example.com';
--
-- Do this for exactly one account to start; use the (future) User
-- Management screen to invite additional admins after that.
-- ---------------------------------------------------------------------------
