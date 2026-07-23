# ROADMAP.md

Forward-looking plan, one milestone at a time per the project's operating model. See `PROJECT_TRACKER.md` for granular status; this file explains *why* each phase is ordered where it is.

## Sequencing rationale

Phases 4–7 (Executives, Gallery, News, Events) come before Phases 8–10 (Documents, Contact/About CMS, Media Library) because:
- They map to content that's already live on the public site today via hardcoded `lib/data/*.ts` files — converting these to database-driven content delivers the most immediate value (this is the literal pain point that motivated the CMS in the first place).
- Building Executives first (Phase 4) establishes the CRUD + photo-upload pattern once; Gallery, News, and Events (Phases 5–7) then largely reuse that pattern rather than inventing a new one each time.

Phases 11–16 (User Management, Analytics, Settings, Audit Logs, Backup, Search) are polish/operational layers that depend on Phases 4–10 existing first (there's nothing to search, audit, or back up until there's content).

Phases 17–19 (Performance, Hardening, Final QA) close out the programme once functionality is complete, rather than being revisited after every phase — a stable target is needed before optimizing it.

## Upcoming phase previews

**Phase 4 — Executive Management**
CRUD screens under `/admin/executives`, Server Actions with Zod validation, photo upload directly to the `executives` Storage bucket from the browser client, `revalidatePath` on both the admin list and `/about/executive-committee`. No new schema — `executives` table and its RLS already exist.

**Phase 5 — Gallery Management**
Drag-and-drop multi-upload, category assignment (reusing `gallery_categories`), event assignment (reusing `events`, built alongside), reordering via `display_order`.

**Phase 6 — News CMS**
Draft/Published/Archived workflow (already modeled by `content_status`), slug auto-generation with uniqueness check, SEO fields already in the schema (`seo_title`, `meta_description`).

**Phase 7 — Events CMS**
Straightforward CRUD; the main new piece is date/location fields and the registration link, all already in the schema.

**Phase 8 — Document Library**
File upload to the `documents` bucket (pdf/docx only, enforced at bucket level already), category field already modeled.

**Phase 9 — Contact & About CMS**
Editable `settings` and `about_content` singleton rows — no list/detail pattern needed, just a single edit form per page, gated by `can_publish()` per `DATABASE.md`.

**Phase 10 — Media Library**
A unified browse/search view over everything already uploaded via Phases 4–9 (the `media_library` index table already exists to support this).

**Phase 11 — User & Role Management**
Super-admin-only screen to invite/deactivate admins and change roles — uses `lib/supabase/admin.ts` (service role) for the actual `auth.users` invite call, gated by an explicit `is_super_admin()` check in the Server Action before that privileged client is ever touched.

**Phase 12 — Dashboard Analytics**
Replace the placeholder "—" stat cards on `/admin` with real counts once Phases 4–7 exist to count.

**Phase 13 — Site Settings**
UI for the `settings` table fields not already covered by Phase 9 (logo/favicon upload, theme colors).

**Phase 14 — Audit Logs**
Read-only UI over `activity_logs` (already populated by every mutating action from Phase 4 onward via `log_activity()`), with filtering by table/user/date.

**Phase 15 — Backup & Restore**
CSV/JSON export per table; import deliberately scoped carefully (validate against the same Zod schemas used for manual entry, to avoid becoming a bulk RLS-bypass vector).

**Phase 16 — Search**
Cross-module search (executives/gallery/news/events); likely Postgres full-text search (`tsvector`) added as a migration once there's real content volume to justify it.

**Phase 17 — Performance Optimization**
Pagination on every list view, image optimization audit, caching strategy review.

**Phase 18 — Production Hardening**
Rate limiting, CSP headers, upload scanning — the items listed as "not yet hardened" in `SECURITY.md`.

**Phase 19 — Final QA & Deployment**
Full regression pass against the Live Verification Checklists accumulated from every prior phase.
