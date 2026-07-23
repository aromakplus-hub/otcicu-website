-- ============================================================================
-- One-time content migration: real Executive Committee data
--
-- This migrates the content currently hardcoded in
-- lib/data/executive-committee.ts into the database, so the admin CMS has
-- something real to manage from day one instead of an empty table.
--
-- Run ONCE, after migrations 0001-0008 have been applied:
--   supabase db execute -f supabase/seed_executives.sql
-- (or paste into the Supabase SQL Editor)
--
-- Photos are NOT included here — photo_url is left NULL. After running
-- this, go to /admin/executives, edit each person, and use the Photo
-- Upload widget to attach their real photo (the files already exist at
-- public/images/committee/*.jpg in the repo; re-upload them through the
-- admin UI so they end up in Supabase Storage where the CMS expects them).
--
-- Safe to run only once — running it twice will create duplicate rows,
-- since there's no unique constraint on full_name (two different real
-- people could coincidentally share a name). If you need to re-run it,
-- delete the previously-seeded rows first.
-- ============================================================================

insert into public.executives (full_name, "position", biography, display_order, status) values
  ('Alhaji Abdulahi Kolawole Oyeyemi', 'Union President (Chairman)',
   'Founder and Union President of OTITOLOJU CICU LTD. He has provided visionary leadership since the cooperative''s establishment in 2013, promoting transparency, non-interest financial services, and sustainable economic growth for members.',
   1, 'published'),

  ('Lady Evang. A. A. Oke', 'Vice President',
   'Supports the President in providing strategic leadership and ensuring the effective administration of the cooperative. She is committed to member welfare and organizational development.',
   2, 'published'),

  ('Mrs. Abosede Felix', 'General Secretary',
   'Oversees the cooperative''s records, correspondence, and official documentation, ensuring efficient communication and proper record-keeping.',
   3, 'published'),

  ('Elder Idowu Kayode Olarinde', 'Assistant Secretary',
   'Assists the General Secretary in administrative responsibilities and supports the coordination of meetings and cooperative activities.',
   4, 'published'),

  ('Mr. Abdulhammed Olalekan Imran', 'Treasurer',
   'Manages the cooperative''s treasury functions, ensuring accountability, proper financial records, and prudent management of members'' funds.',
   5, 'published'),

  ('Prince Raheem Komolafe', 'Financial Secretary',
   'Responsible for maintaining financial records, monitoring members'' financial transactions, and supporting the cooperative''s financial administration.',
   6, 'published'),

  ('Mr. Rasaq Ogundele', 'Chief Whip',
   'Serves as the Chief Whip, promoting discipline, orderliness, and cooperation during meetings and official activities of the cooperative.',
   7, 'published'),

  ('Hon. Waheed Bukola Afolabi', 'Executive Committee Member',
   'Contributes to policy formulation and supports the growth and development of the cooperative as a member of the Executive Committee.',
   8, 'published'),

  ('Mrs. Rukayat Ololade Oyeyemi', 'Cooperative Manager / Executive Committee Member',
   'Serves as the Cooperative Manager and an Executive Committee Member, contributing to the day-to-day administration of the cooperative and supporting decision-making that promotes members'' welfare and organizational progress.',
   9, 'published');
