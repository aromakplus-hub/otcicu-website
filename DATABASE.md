# DATABASE.md

Source of truth: `supabase/migrations/*.sql`. This file is a human-readable map of that schema — if the two ever disagree, the SQL wins and this file needs updating.

## Entity overview

```
auth.users (Supabase-managed)
  └── profiles (1:1)  ──→ roles (many:1)
                              └── role_permissions (many:many) ──→ permissions

executives (standalone)
events ──→ gallery (1:many, nullable)
gallery_categories ──→ gallery (1:many, nullable)
news (standalone)
documents (standalone)
media_library (standalone index over Storage)
announcements (standalone)
settings (singleton, id always 1)
about_content (singleton, id always 1)
contact_messages (standalone)
activity_logs (append-only, references profiles)
```

## Tables

| Table | Purpose | Soft delete? | Status field? |
|---|---|---|---|
| `roles` | Fixed role catalogue | no | no |
| `permissions` | Fine-grained permission catalogue (seeded, not yet enforced in app code) | no | no |
| `role_permissions` | Role ↔ permission junction | no | no |
| `profiles` | Extends `auth.users`; `is_active` flag | no (use `is_active`) | no |
| `executives` | Executive committee members | yes (`deleted_at`) | yes (`content_status`) |
| `gallery_categories` | Gallery filter categories | no | no |
| `events` | Events (also referenced by gallery) | yes | yes |
| `gallery` | Gallery images | yes | yes |
| `news` | News articles | yes | yes |
| `documents` | PDF/DOCX library (constitution, circulars, forms, reports, minutes) | yes | yes |
| `media_library` | Searchable index over every upload | no | no |
| `announcements` | Site-wide banners/notices with pin + expiry | no | yes |
| `settings` | Singleton site settings (logo, colors, contact info, socials) | n/a | n/a |
| `about_content` | Singleton About page content (history, vision, mission, objectives, chairman's message) | n/a | n/a |
| `contact_messages` | Contact form inbox | no | `new`/`read`/`archived` (not the shared enum) |
| `activity_logs` | Audit trail, append-only | n/a | n/a |

## `content_status` enum

```
'draft' | 'published' | 'hidden' | 'archived'
```

Used by every content table (executives, events, gallery, news, documents, announcements). Public read policies filter to `status = 'published'` (and `deleted_at is null` where applicable); the admin dashboard can see all four states.

## Role model & the editor/publisher distinction

Four roles: `super_admin`, `administrator`, `editor`, `viewer`.

Two SQL helper predicates encode the write rules everywhere, rather than repeating role-name checks in every policy:

- **`is_admin()`** → true for `editor`, `administrator`, `super_admin`. Gate for "can write content at all."
- **`can_publish()`** → true for `administrator`, `super_admin` only. Gate for "can set status to `published`/`archived`, and can hard-delete."

Concretely: an `editor` can INSERT/UPDATE a row, but the `WITH CHECK` clause on every content table rejects the write unless `status IN ('draft', 'hidden')` *unless* `can_publish()` is also true. So an editor's work is always saved as a draft (or hidden) until an administrator/super_admin flips it to published — this is a database-enforced approval workflow, not just a UI convention.

`viewer` gets none of the write policies at all — read-only, matching the role's name.

## RLS pattern (repeated per content table)

```sql
-- Public: anyone (including anon/unauthenticated) sees only published, non-deleted rows
create policy "<table> public read" ... using (status = 'published' and deleted_at is null);

-- Admin dashboard: any admin role sees everything, including drafts
create policy "<table> admin read all" ... using (public.is_admin());

-- Insert/update: any admin role, but publishing requires can_publish()
create policy "<table> admin insert" ... with check (public.is_admin() and (status in ('draft','hidden') or public.can_publish()));
create policy "<table> admin update" ... using (public.is_admin()) with check (...\ same as insert);

-- Delete: publisher roles only
create policy "<table> publisher delete" ... using (public.can_publish());
```

`settings` and `about_content` deviate slightly: public read is unconditional (no `status` concept — the site always needs this to render), but **writes require `can_publish()`**, not just `is_admin()` — these are sitewide/business-facing fields, so an editor cannot change them unilaterally.

## Key functions (all `SECURITY DEFINER`, `search_path` pinned)

| Function | Purpose |
|---|---|
| `current_user_role()` | Returns the caller's role name, or `null` |
| `is_admin()` | editor/administrator/super_admin |
| `can_publish()` | administrator/super_admin |
| `is_super_admin()` | super_admin only |
| `handle_new_user()` | Trigger: creates a `profiles` row (defaulted to `viewer`) whenever a new `auth.users` row appears |
| `update_own_profile(full_name, avatar_url)` | Whitelisted self-service profile edit — deliberately the *only* way a non-super_admin can UPDATE their own `profiles` row, since a raw RLS policy for "update yourself but not your own role" is fragile (see `SECURITY.md`) |
| `log_activity(action, table_name, record_id, old_value, new_value, ip_address)` | The only way rows are written to `activity_logs` — never inserted directly by client code |

## Storage buckets

| Bucket | Max size | Allowed MIME types |
|---|---|---|
| `executives` | 5 MB | jpeg, png, webp |
| `gallery` | 8 MB | jpeg, png, webp |
| `events` | 8 MB | jpeg, png, webp |
| `news` | 8 MB | jpeg, png, webp |
| `documents` | 20 MB | pdf, docx |
| `media` | 8 MB | jpeg, png, webp |

All public-read; writes (insert/update) require `is_admin()`; deletes require `can_publish()`.

## Migration 0007: grants safety net

Migrations only define RLS *policies* — on a real Supabase project, the base `GRANT` of table privileges to `anon`/`authenticated` on the `public` schema happens automatically as part of project bootstrapping (this is standard Supabase behavior; RLS, not GRANT/REVOKE, is meant to be the actual access-control layer). Migration 0001 adds `ALTER DEFAULT PRIVILEGES` so this isn't silently relied upon, and migration 0007 adds an explicit catch-all `GRANT` after all tables exist, in case default privileges didn't apply due to a role mismatch across migration execution. Both are idempotent and harmless to re-run against a real Supabase project.

## Live verification status

Unlike most of this project (which can only be statically reviewed until a real Supabase project is reachable), the schema itself **has been executed against a real Postgres 16 instance** — not just read. This caught two real bugs before they could hit production: a function-definition ordering error, and the missing-grants issue above. See `CHANGELOG.md` for the full list of what was concretely tested (trigger behavior, role-check functions across all four roles, RLS enforcement of the editor/publisher split, anonymous read scoping, and the audit-log RPC).

**Not covered by this testing**: real Supabase Auth semantics (GoTrue, JWT claim shape, actual session-based `auth.uid()`) — the test harness stubbed `auth.uid()` manually per scenario rather than going through a real login. That remains a Live Verification Checklist item against the actual `otcicu-cms` project.

## Not yet done (tracked in `PROJECT_TRACKER.md`)

- `role_permissions` is seeded with a permission catalogue but not yet consulted by any RLS policy or application check — the four coarse role predicates (`is_admin`/`can_publish`/`is_super_admin`) are sufficient for now. Wiring up fine-grained per-permission checks is a Phase 11 (User & Role Management) concern if/when the four fixed roles stop being granular enough.
- No seed data for actual site content (executives, gallery, news, etc.) — deliberately deferred to Phases 4–9 so it's migrated once, from the real `lib/data/*.ts` files, not seeded twice.
