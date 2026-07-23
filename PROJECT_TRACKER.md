# OTCICU Website Modernization — Project Tracker

**This file is the source of truth for project status.** Read this before starting any new milestone. Never rely on conversation memory across sessions — if it isn't written here (or in the other governance docs), assume it isn't known.

Last updated: Phase 1 completion + first live deployment confirmation.

**Live URL:** https://otcicu-website.vercel.app/ (confirmed working — see "Deployment Status" below)

---

## Deployment Status

**Deployed:** GitHub repo connected to Vercel; live at **https://otcicu-website.vercel.app/**

**Confirmed working (fetched and verified directly, 23 Jul):**
- Public site fully live: homepage, About, Executive Committee, Membership, Savings, Loans, News (+ all 3 articles), Gallery, Contact — all real content, navigation, footer, and social links rendering correctly
- Gallery images serving correctly via `next/image` from the 6 real photos
- `/admin` correctly shows "Access Restricted — not configured" (307 → 200) instead of crashing, confirming the narrow-blast-radius proxy fix holds in real production, not just locally

**Still pending (blocks admin dashboard access):**
1. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables, then redeploy
2. Run the 7 migrations + `seed.sql` against the real `otcicu-cms` Supabase project (see `SETUP.md`)
3. Create + promote the first `super_admin` account
4. Confirm login → dashboard actually works end-to-end (Live Verification Checklist below)

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
5. ~~Sidebar links to not-yet-built modules will 404~~ — **RESOLVED (Phase 2 operating rule change)**: the 7 links to unbuilt modules were removed from `AdminSidebar` entirely rather than left to 404. Each link is added back only once its module is fully built, tested, and live-verified. See the Phase 2 section below.
6. ~~Live domain~~ — **RESOLVED**: confirmed as **otitolojucicu.com**. Updated everywhere it appeared (`app/layout.tsx` metadataBase, `app/sitemap.ts`, `app/robots.ts`, `.env.example`, `SETUP.md`), rebuilt, and verified at runtime that `/robots.txt` and `/sitemap.xml` actually serve the new domain. Still outstanding: point real DNS at Vercel and add `otitolojucicu.com` as a custom domain in the Vercel project settings — the app-level config is done, the domain-registration/DNS side is not something I can do.

---

## What Phase 4 (Executive Management) Will Build On Top Of This

- The `executives` table + RLS policies already exist — Phase 4 is purely the CRUD UI + Server Actions + photo upload wiring, no new schema needed.
- Once live, `lib/data/executive-committee.ts` (currently hardcoded) gets replaced by a query against the `executives` table, and the public `/about/executive-committee` page becomes fully dynamic.

---

# Phase 2: CMS Modules

Operating under a stricter rule than Phase 1: **no sidebar navigation for a module until it is fully built, statically verified, AND live-verified by you against the real Supabase project.** A 404 or a not-yet-functional page behind a visible menu item is treated as a bug, not acceptable work-in-progress.

## Phase 2 Progress

- [x] Infrastructure Complete (Phase 1)
- [~] **Executives** — code-complete, statically verified, RLS logic proven against real Postgres. **Pending your live verification against the real Supabase project before the sidebar link is added or this is marked done.**
- [ ] News
- [ ] Events
- [ ] Gallery
- [ ] Documents
- [ ] Announcements
- [ ] Messages
- [ ] Settings

## Module 1: Executives — Details

**Purpose**: Full CRUD management of the Executive Committee, replacing the hardcoded `lib/data/executive-committee.ts` as the source of truth for the public `/about/executive-committee` page.

**Architecture**: Server-rendered list page (search/sort/filter/pagination via URL params, no client-side data-fetching library needed), one shared form component for both create and edit, Server Actions for all mutations, direct-to-Storage browser upload for photos.

**Database tables used**: `executives` (existing from Phase 1 — no schema change needed).

**Files created**:
- `supabase/migrations/0008_fix_soft_delete_rls_gap.sql` — see "Bug found" below
- `supabase/seed_executives.sql` — one-time migration of the 9 real executives into the database (text data only; photos added via the new admin UI afterward)
- `lib/validations/executive.ts` — shared Zod schema
- `lib/data/get-executives.ts` — public-page data fetcher with resilient fallback
- `app/admin/(dashboard)/executives/{page.tsx, actions.ts, new/page.tsx, [id]/edit/page.tsx}`
- `components/admin/executives/{executive-form.tsx, photo-upload.tsx, executive-row-actions.tsx}`
- `components/admin/data-table/{status-badge.tsx, pagination.tsx, search-input.tsx, sortable-header.tsx, states.tsx, confirm-dialog.tsx}` — **reusable**, every future module reuses these rather than rebuilding them

**Files modified**:
- `app/about/executive-committee/page.tsx` — now reads from Supabase via `getPublishedExecutives()`, with a fallback to the original hardcoded content, **confirmed working live** when Supabase is unreachable. This page is now server-rendered per-request (previously static) since it must reflect live CMS edits.
- `components/admin/admin-sidebar.tsx` — removed all 7 links to not-yet-built modules
- `app/admin/(dashboard)/layout.tsx` — added `<Toaster />` for toast notifications

**Permissions** (enforced at both the UI layer and the database RLS layer):
- **Viewer**: no access (not included in `is_admin()`)
- **Editor**: create, edit, save as draft/hidden — cannot publish, cannot delete (button hidden in UI; also blocked by RLS if attempted directly via API)
- **Administrator / Super Admin**: full control — create, edit, publish/unpublish, delete

**Bug found and fixed during this module** (live-tested against real Postgres, not just reviewed): Phase 1's RLS policies gated `status` transitions behind `can_publish()` but never gated `deleted_at` the same way — an editor could have soft-deleted a row via UPDATE, completely bypassing the delete restriction. Fixed in migration `0008`; confirmed: editor's delete attempt now correctly rejected (`ERROR: new row violates row-level security policy`), administrator's succeeds.

**Testing completed**: `tsc`, `eslint`, `next build` all clean. All 8 migrations + the executives seed script run cleanly against a real local Postgres instance. RLS enforcement (editor blocked from publishing/deleting, administrator succeeds, anonymous read scoped to published-only) re-confirmed after the fix. Production server smoke test: public site unaffected; new `/admin/executives/*` routes present and correctly gate behind auth. Public Executive Committee page confirmed to render correctly via its fallback path when Supabase is unreachable.

**Deployment status**: code-complete, not yet deployed. Waiting on you to pull, deploy, run migration `0008` + `seed_executives.sql` against the real Supabase project, and complete the Live Verification Checklist (see `CHANGELOG.md`) before this module is marked done and the sidebar link is added.

**Known limitations**:
- Seeded executives have `photo_url = NULL` — upload each one manually via the new admin UI after seeding (doubles as your first real test of the Photo Upload widget)
- No bulk reordering UI — `display_order` is edited one row at a time via the edit form; fine for ~9 people, worth revisiting if the committee grows much larger
- No "restore a deleted executive" screen — a Super Admin can clear `deleted_at` directly in the Supabase dashboard; no admin UI for it yet
