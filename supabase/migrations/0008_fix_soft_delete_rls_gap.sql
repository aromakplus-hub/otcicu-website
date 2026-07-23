-- ============================================================================
-- 0008: Close soft-delete RLS gap
--
-- Found while designing Phase 2 Module 1 (Executives): the "admin update"
-- policies on every soft-deletable content table gate `status` transitions
-- behind can_publish(), but never gated `deleted_at` the same way. That
-- means an `editor` — who should only be able to create/edit drafts, never
-- delete — could currently soft-delete a row simply by UPDATE-ing
-- deleted_at, bypassing the "publisher delete" policy entirely (that policy
-- only covers hard DELETE, which editors were already correctly blocked
-- from).
--
-- Fix: the update WITH CHECK now also requires can_publish() whenever the
-- new row's deleted_at is being set to a non-null value. Restoring a row
-- (deleted_at going back to null) is NOT gated the same way — that's a
-- recovery action, not a destructive one, so leaving it to any admin role
-- is fine and matches how the rest of this schema treats reversible edits.
--
-- Applies to every table that has both `status` and `deleted_at`:
-- executives, events, gallery, news, documents.
-- (announcements has `status` but no `deleted_at`, so it's unaffected.)
-- ============================================================================

alter policy "executives admin update" on public.executives
  with check (
    public.is_admin()
    and (status in ('draft', 'hidden') or public.can_publish())
    and (deleted_at is null or public.can_publish())
  );

alter policy "events admin update" on public.events
  with check (
    public.is_admin()
    and (status in ('draft', 'hidden') or public.can_publish())
    and (deleted_at is null or public.can_publish())
  );

alter policy "gallery admin update" on public.gallery
  with check (
    public.is_admin()
    and (status in ('draft', 'hidden') or public.can_publish())
    and (deleted_at is null or public.can_publish())
  );

alter policy "news admin update" on public.news
  with check (
    public.is_admin()
    and (status in ('draft', 'hidden') or public.can_publish())
    and (deleted_at is null or public.can_publish())
  );

alter policy "documents admin update" on public.documents
  with check (
    public.is_admin()
    and (status in ('draft', 'hidden') or public.can_publish())
    and (deleted_at is null or public.can_publish())
  );
