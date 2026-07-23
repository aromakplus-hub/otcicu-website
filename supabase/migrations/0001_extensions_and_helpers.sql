-- ============================================================================
-- 0001: Extensions and shared helpers
--
-- NOTE: current_user_role() / is_admin() / is_super_admin() are NOT defined
-- here even though they're conceptually "helpers" — they reference
-- public.profiles and public.roles, and Postgres validates SQL-language
-- function bodies against the catalog at CREATE FUNCTION time (unlike some
-- other checks that only happen at call time). Defining them before those
-- tables exist fails immediately. They're defined in migration 0002, right
-- after the tables they depend on.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Base privileges for anon/authenticated on the public schema.
--
-- On a real Supabase project this is already done automatically as part of
-- project bootstrapping (Supabase's platform grants schema usage + table
-- privileges to anon/authenticated/service_role, and expects RLS — not
-- GRANT/REVOKE — to be the actual access-control layer on top of that).
--
-- It's included explicitly here anyway so these migrations are
-- self-contained and reproducible against any plain Postgres instance
-- (e.g. for local testing outside the Supabase CLI), rather than silently
-- depending on tribal knowledge about what Supabase sets up for you.
-- Re-running this is harmless (idempotent) even on a real Supabase project.
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
alter default privileges in schema public grant all on tables to anon, authenticated;
alter default privileges in schema public grant all on sequences to anon, authenticated;
alter default privileges in schema public grant execute on functions to anon, authenticated;

-- Generic "updated_at" trigger, attached to every mutable table below.
-- No table dependency, so this one is safe to define here.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
