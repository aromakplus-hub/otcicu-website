# ARCHITECTURE.md

## Overview

The public marketing site (Home, About, Membership, Savings, Loans, News, Gallery, Contact, Apply) and the admin CMS live in the **same Next.js App Router project**, sharing the design system, but are architecturally decoupled:

- The public site currently reads content from `lib/data/*.ts` (hardcoded). As each CMS phase lands, the corresponding public page is switched to read from Supabase instead — one module at a time, never all at once.
- The admin dashboard (`/admin/*`) is entirely new, reads/writes Supabase directly.

**This decoupling is deliberate**: a Supabase outage, misconfiguration, or bug in the admin dashboard must never take down the public website. See "Blast radius" below.

## Folder structure

```
app/
  layout.tsx           — root layout: html/body, fonts, JSON-LD schema ONLY.
                         Deliberately does NOT render Header/Footer (see
                         "Public chrome must not leak into /admin" below).
  (public)/
    layout.tsx           — renders Header + <main id="main-content"> + Footer,
                           scoped to this route group only
    page.tsx, about/, apply/, contact/, gallery/, loans/, membership/,
    news/, savings/       — every public marketing page (unchanged content
                           from Phase 1, just relocated into this group)
  admin/
    login/            — public (unauthenticated) login page + Server Action
    error/             — public error page (deactivated account / not configured)
    (dashboard)/        — route group; layout.tsx here enforces auth server-side
      layout.tsx        — the ONLY place the AdminShell renders
      page.tsx           — dashboard home
      (executives/, gallery/, news/, etc. — added phase by phase)
  robots.ts, sitemap.ts, icon.png, apple-icon.png, favicon.ico
                         — metadata routes; stay at app/ root (Next.js
                           convention), unaffected by route groups
components/
  admin/               — admin-only UI (sidebar, shell, login form, data-table primitives)
  ui/, shared/, sections/, forms/, layout/  — existing public-site components, untouched
lib/
  supabase/
    client.ts           — browser client (anon key)
    server.ts            — server client (anon key + session cookie; respects RLS)
    admin.ts             — service-role client (bypasses RLS; server-only; used sparingly)
    middleware.ts         — session refresh + /admin route guard logic
  data/                — existing hardcoded public-site content (unchanged for now)
supabase/
  migrations/            — numbered SQL migrations, source of truth for schema
  seed.sql                — reference/lookup data only
types/
  database.types.ts       — hand-authored Supabase types (see file header)
proxy.ts                  — Next.js 16 "proxy" (formerly middleware.ts)
```

## Public chrome must not leak into /admin

Found via a real screenshot (not caught by review): the root layout unconditionally rendered `Header`/`Footer` around `{children}`, which means every `/admin/*` route got the public site's navigation and footer stacked around its own `AdminShell` — since Phase 1, just not visually obvious until an unrelated mobile-layout fix made the dashboard's own content render correctly enough to notice the duplication.

Fixed by moving all public pages into an `app/(public)/` route group with their own layout that owns `Header`/`Footer`; the root layout now only contains what's genuinely universal (`html`/`body`, fonts, the JSON-LD schema). This is the same category of mistake as the original "proxy runs on every route" bug from Phase 1 (see below) — a concern that should have been scoped to one part of the app ended up applying globally by default, because Next.js layouts nest and apply to everything under them unless deliberately scoped with a route group. **The general lesson, stated once so it doesn't need re-learning per phase**: anything added to `app/layout.tsx` applies to `/admin/*` too, whether that's intended or not — always ask "does this belong on every route, or just the public ones?" before adding to the root layout, rather than after.

## Why a route group for `/admin`

`app/admin/(dashboard)/layout.tsx` — NOT `app/admin/layout.tsx` — enforces the auth check. If the protected layout lived directly at `app/admin/layout.tsx`, it would also wrap `/admin/login` and `/admin/error`, and since that layout redirects to `/admin/login` when there's no session, an unauthenticated visit to the login page itself would infinite-loop-redirect to itself. The `(dashboard)` route group (which doesn't affect the URL) scopes the protected layout to only the pages that actually need it.

## Auth: defense in depth, not a single gate

There are three independent layers, and **losing any one of them should not create a security hole**:

1. **`proxy.ts`** — redirects unauthenticated requests to `/admin/*` before rendering. Convenience/UX only. Scoped narrowly to `/admin/:path*` (see below for why).
2. **`app/admin/(dashboard)/layout.tsx`** — every Server Component under the dashboard re-checks `supabase.auth.getUser()` independently of the proxy.
3. **Row Level Security** — every table enforces its own access rules at the database layer regardless of what the application code does. Even a hypothetical bug that let an unauthenticated request reach a Server Action would still hit RLS and be rejected.

This matters concretely: Next.js's middleware/proxy layer has had real bypass vulnerabilities (CVE-2025-29927, CVE-2025-66478). The architectural response to that class of bug is to never treat the proxy as the actual security boundary — hence layers 2 and 3 existing independently of it. See `SECURITY.md`.

## Why the proxy matcher is scoped to `/admin/:path*` only

Early in Phase 1, the proxy's matcher covered the entire site (all routes except static assets). This caused **the entire public site to 500** whenever Supabase env vars were unset or Supabase was unreachable, because every single request — including the homepage — triggered a Supabase client call inside the proxy.

Fixed by scoping the matcher to `/admin/:path*` only. **Rationale**: the public site has zero dependency on Supabase session state; only the admin dashboard does. Narrowing the blast radius of a Supabase-layer failure to "admin dashboard is down" instead of "entire public website is down" is a correctness requirement, not an optimization. Any future middleware/proxy logic that needs to run site-wide (e.g. analytics, geolocation) must be added as a *separate*, independently-failing concern — never bundled into the same function as the admin auth check.

## Roles model

Four fixed roles (`super_admin`, `administrator`, `editor`, `viewer`), stored in a `roles` lookup table and referenced from `profiles.role_id`. Encoded in SQL helper functions rather than scattered `if` checks in application code:

- `is_admin()` — true for `editor`, `administrator`, `super_admin` (i.e. anyone who can touch content at all)
- `can_publish()` — true for `administrator`, `super_admin` only (matches the spec: "Editor: can create and edit content; cannot publish or delete")
- `is_super_admin()` — true for `super_admin` only (user management, role changes)

New signups default to `viewer` via a database trigger (`handle_new_user()`) — nobody gets write access just by having an `auth.users` row.

## Data flow for a typical CRUD module (Phase 4+ pattern)

1. Server Component fetches via `lib/supabase/server.ts` (respects RLS) — no separate "API layer" needed; Supabase + RLS *is* the API layer.
2. Mutations go through Server Actions co-located with the feature (e.g. `app/admin/(dashboard)/executives/actions.ts`), which:
   - Re-validate input with Zod
   - Call `supabase.rpc('log_activity', ...)` after a successful mutation
   - `revalidatePath()` both the admin list page and the corresponding public page
3. File uploads go directly to Supabase Storage from the browser using a signed upload (via the browser client), then the resulting public URL is saved to the relevant table — the service-role client (`lib/supabase/admin.ts`) is deliberately NOT used for routine uploads, only for genuinely privileged operations (see that file's own doc comment).

**This pattern is now proven, not just planned** — Phase 2 Module 1 (Executives) implements exactly this, plus a reusable set of list-page primitives (`components/admin/data-table/*`: search, sort, pagination, status badge, empty/error/loading states, confirm dialog) that every subsequent module (News, Events, Gallery, Documents, Announcements) is expected to reuse rather than reimplement. A module that duplicates one of these instead of importing it should be treated as a review finding, not a stylistic choice.

## Public pages that read live CMS data become dynamic, by design

`/about/executive-committee` was previously statically prerendered (`○` in the build output). Once it reads from Supabase via `getPublishedExecutives()`, it necessarily becomes server-rendered per request (`ƒ` in the build output) — a page can't be both "prerendered once at build time" and "reflects live database edits." This is an accepted, deliberate tradeoff for every public page a future module connects to real data (News, Events, Gallery will follow the same pattern). It does not reintroduce the "public site depends on Supabase" risk from earlier in the project: the fallback-to-hardcoded-content pattern in `lib/data/get-executives.ts` (try/catch around the Supabase call, falling back on any error, missing config, or empty result) means the page still renders correctly even if Supabase is completely unreachable — confirmed by actually killing Supabase connectivity in testing, not just asserted. Every future public-facing data fetcher should follow this same fallback shape.

## What is intentionally NOT built yet

- Any actual CRUD UI beyond the dashboard shell (Phases 4–10)
- Forgot-password / reset-password flow (tracked as a Phase 2 candidate)
- Fine-grained `role_permissions` enforcement in application code (the table exists; only the four coarse role checks are wired up so far — see `PROJECT_TRACKER.md`)
