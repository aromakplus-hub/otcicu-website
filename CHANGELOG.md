# CHANGELOG.md

All notable changes to this project, in reverse chronological order.

## Phase 1 – Foundation

### Added
- Supabase client infrastructure: `lib/supabase/{client,server,admin,middleware}.ts`
- Complete database schema across 6 migrations (`supabase/migrations/0001`–`0006`): roles/permissions/profiles, executives, gallery + gallery_categories, events, news, documents, media_library, announcements, settings, about_content, contact_messages, activity_logs
- Row Level Security on every table, with an editor-vs-publisher permission distinction (see `DATABASE.md`)
- Storage buckets for executives/gallery/events/news/documents/media, public-read + admin-write policies
- `supabase/seed.sql` (reference data only)
- Admin authentication: `/admin/login`, `/admin/error`, sign-out Server Action
- Protected admin shell: `app/admin/(dashboard)/layout.tsx`, `AdminSidebar`, dashboard placeholder page
- `.env.example`
- Hand-authored `types/database.types.ts` (stand-in until live `supabase gen types` is available)
- Dependencies added: `@supabase/supabase-js`, `@supabase/ssr`, `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `zod`, `server-only`

### Fixed
- **Infinite redirect loop**: the protected layout was initially placed at `app/admin/layout.tsx`, which would have also wrapped `/admin/login` — moved to `app/admin/(dashboard)/layout.tsx` via a route group so login/error pages render unprotected.
- **Public site outage risk**: the proxy (middleware) matcher initially covered the entire site, so any Supabase misconfiguration (including simply not having credentials yet, as in this environment) 500'd every page, public and admin alike. Narrowed the matcher to `/admin/:path*` only — the public site now has zero runtime dependency on Supabase.
- **Type errors from hand-authored Database type**: `types/database.types.ts` was initially missing the `Relationships` field (required per-table) and the `Views`/`Enums`/`CompositeTypes` keys (required at the schema level) that `@supabase/supabase-js`'s generic constraints expect — every table's Row type was silently resolving to `never`. Fixed by completing the shape to match `GenericSchema`.
- **Deprecated `middleware.ts` convention**: renamed to `proxy.ts` (Next.js 16.2.11 renamed the file convention; the old name still worked but emitted a build warning and is planned for removal). Added an explicit code comment on why this file is a UX convenience only, not the security boundary (see `ARCHITECTURE.md`).
- **Migration ordering bug (found via live Postgres execution, not just review)**: `current_user_role()`, `is_admin()`, and `is_super_admin()` were originally defined in migration 0001, but as SQL-language functions their bodies are validated against the catalog at `CREATE FUNCTION` time — and they reference `public.profiles`/`public.roles`, which don't exist until migration 0002. This failed immediately on a real `psql -f` run. Moved the three functions into 0002, directly after the tables they depend on.
- **Missing base table grants**: migrations only defined RLS *policies*, never the underlying `GRANT` to `anon`/`authenticated` on the `public` schema. On a real Supabase project this is unnecessary (Supabase's platform grants this automatically as part of project bootstrapping), but it meant the migrations weren't self-contained/reproducible outside a real Supabase project. Added explicit `ALTER DEFAULT PRIVILEGES` in migration 0001 plus a catch-all `GRANT` in new migration 0007, so the schema works identically against any plain Postgres instance.
- Pre-existing `npm audit` advisories (Next.js/postcss/sharp, unrelated to this phase's changes) patched via `npm audit fix --force`, landing on Next.js 16.2.11.

### Verification
- `tsc --noEmit`: 0 errors
- `eslint`: 0 errors, 0 warnings
- `next build`: 23 routes compiled successfully
- Production server smoke test: all public routes 200; `/admin` and `/admin/login` correctly redirect to `/admin/error` when Supabase isn't configured (307); `/admin/error` itself renders 200; public homepage confirmed unaffected
- **Live SQL verification** (installed real Postgres 16 locally, stubbed minimal `auth`/`storage` schemas, ran all 7 migrations + seed against a real database — not just static review):
  - All 7 migrations + `seed.sql` execute cleanly end-to-end, zero errors, from a fresh database
  - `handle_new_user()` trigger fires correctly on `auth.users` insert, creates a `profiles` row defaulted to `viewer` with the right `full_name`
  - Role promotion SQL from `SETUP.md` (viewer → super_admin) works as documented
  - `current_user_role()` / `is_admin()` / `can_publish()` / `is_super_admin()` return correct values across super_admin/editor/viewer/inactive scenarios
  - RLS proven, not assumed: an `editor` can INSERT a `draft` executive but is REJECTED (`new row violates row-level security policy`) attempting to INSERT one directly as `published`; an `administrator` succeeds at the same `published` insert
  - Anonymous (`anon` role) SELECT on `executives` returns only `published` rows, correctly hiding drafts
  - `log_activity()` RPC correctly writes an audit row with action/table/IP
  - **Not verified**: behavior against real Supabase Auth specifically (JWT claims, actual `auth.uid()` semantics, GoTrue email/password flows) — the stub `auth.uid()` was manually overridden per test rather than coming from a real session. This is real SQL/RLS logic verified against real Postgres, not a full Supabase emulation. Confirming against the live `otcicu-cms` project remains on the Live Verification Checklist.

---

## Previous work (pre-CMS, static site)

The public marketing site (Home, About, Executive Committee, Membership, Savings, Loans, News, Gallery, Contact, Apply) was built prior to this modernization programme, including real cooperative content (history, executive committee bios and photos, news articles, gallery images) supplied via a content-collection workbook. That work is unchanged by Phase 1 and is not re-described here — see the site itself and `lib/data/*.ts`.
