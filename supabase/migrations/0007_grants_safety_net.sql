-- ============================================================================
-- 0007: Explicit catch-all grants (safety net)
--
-- Migration 0001 sets ALTER DEFAULT PRIVILEGES so that tables created by the
-- same role going forward are automatically granted to anon/authenticated.
-- Default privileges are scoped to the role that ran the ALTER statement,
-- so if Supabase's migration runner ever executes different migrations
-- under different roles, that could silently fail to apply to some tables.
--
-- This migration is an explicit, idempotent catch-all that doesn't depend
-- on role continuity: it grants directly on every table that exists by this
-- point, regardless of who created them. Safe to re-run.
-- ============================================================================

grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant execute on all functions in schema public to anon, authenticated;
