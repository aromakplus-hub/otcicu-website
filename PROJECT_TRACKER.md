# OTCICU Website Modernization — Project Tracker

**This file is the source of truth for project status.** Read this before starting any new milestone. Never rely on conversation memory across sessions — if it isn't written here (or in the other governance docs), assume it isn't known.

Last updated: Phase 1 completion.

---

## Phase Status

- [x] **Phase 1 – Foundation** ✅ *(this milestone)*
- [ ] Phase 2 – Authentication *(see note below)*
- [ ] Phase 3 – Database *(see note below)*
- [ ] Phase 4 – Executive Management
- [ ] Phase 5 – Gallery Management
- [ ] Phase 6 – News CMS
- [ ] Phase 7 – Events CMS
- [ ] Phase 8 – Document Library
- [ ] Phase 9 – Contact & About CMS
- [ ] Phase 10 – Media Library
- [ ] Phase 11 – User & Role Management
- [ ] Phase 12 – Dashboard Analytics
- [ ] Phase 13 – Site Settings
- [ ] Phase 14 – Audit Logs
- [ ] Phase 15 – Backup & Restore
- [ ] Phase 16 – Search
- [ ] Phase 17 – Performance Optimization
- [ ] Phase 18 – Production Hardening
- [ ] Phase 19 – Final QA & Deployment

> **Scope note on Phases 1–3:** the "Current Instruction" for this milestone explicitly asked Phase 1 to deliver the complete database schema, RLS policies, storage buckets, and authentication architecture all at once. That work is done (see below) and substantially covers what Phases 2 and 3 describe. I'm leaving Phases 2 and 3 unchecked rather than assuming — they likely represent *deeper* work (e.g. Phase 2: forgot-password/reset-password flows, session-timeout policy; Phase 3: populating real content into the tables, views/materialized views if needed). Confirm whether to mark them complete now or keep them as later polish items.

---

## Phase 1 – Foundation: What Was Delivered

### Database
- 7 migrations in `supabase/migrations/`, numbered and idempotent-safe — **executed against a real Postgres 16 instance during this milestone, not just reviewed** (see verification section below and `CHANGELOG.md` for the two real bugs this caught):
  1. Extensions + helper functions (`set_updated_at()`) + base schema grants
  2. `roles`, `permissions`, `role_permissions`, `profiles` (extends `auth.users`) + role-check functions (`current_user_role()`, `is_admin()`, `is_super_admin()`)
  3. Content tables: `executives`, `gallery_categories`, `events`, `gallery`, `news`, `documents`, `media_library`, `announcements`
  4. Singletons + support: `settings`, `about_content`, `contact_messages`, `activity_logs`
  5. RLS policies for every content table (editor-vs-publisher distinction — see `DATABASE.md`)
  6. Storage buckets: `executives`, `gallery`, `events`, `news`, `documents`, `media`
  7. Grants safety net (catch-all, in case default privileges from migration 1 don't apply)
- `supabase/seed.sql` — reference data only (gallery categories, permission catalogue). Real content migration from `lib/data/*.ts` into these tables is deliberately deferred to Phases 4–9.

### Authentication
- `/admin/login` — email/password sign-in (Server Action, `useActionState`)
- `/admin/error` — friendly error page (deactivated account, or Supabase not configured)
- `proxy.ts` (Next.js 16's renamed `middleware.ts`) — redirects unauthenticated `/admin/*` requests to login; scoped to `/admin/:path*` only (see `ARCHITECTURE.md` for why it must never run on public routes)
- `app/admin/(dashboard)/layout.tsx` — independent server-side session check (defense in depth, not reliant on the proxy alone)
- New users default to the `viewer` role (read-only) via `handle_new_user()` trigger — nobody gets write access just by having an account

### Admin shell
- `AdminSidebar` with nav placeholders for every future module (Executives, Gallery, News, Events, Documents, Announcements, Messages, Settings) — links 404 until their phase lands, which is expected and will resolve module-by-module
- Dashboard home shows placeholder stat cards (real counts arrive with each module)

### Infrastructure
- `.env.example` documents all required env vars
- `types/database.types.ts` — hand-authored Supabase types (see header comment: replace with real `supabase gen types` output once the live project is reachable)

---

## Known Placeholders / Manual Steps Required

1. **Real Supabase credentials** — `.env.local` needs `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` from the `otcicu-cms` project. Until set, `/admin/*` shows a clear "not configured" message rather than crashing (public site is entirely unaffected either way).
2. **Migrations must be run** against the live Supabase project — see `SETUP.md`.
3. **First super_admin** must be created manually — see the instructions at the bottom of `supabase/seed.sql`.
4. **Real database types** — regenerate `types/database.types.ts` via the Supabase CLI once the project is reachable, and diff against the hand-authored version.
5. Sidebar links to not-yet-built modules will 404 until their respective phase — expected, not a bug.

---

## What Phase 4 (Executive Management) Will Build On Top Of This

- The `executives` table + RLS policies already exist — Phase 4 is purely the CRUD UI + Server Actions + photo upload wiring, no new schema needed.
- Once live, `lib/data/executive-committee.ts` (currently hardcoded) gets replaced by a query against the `executives` table, and the public `/about/executive-committee` page becomes fully dynamic.
