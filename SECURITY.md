# SECURITY.md

## Defense in depth (read this first)

Three independent layers protect `/admin/*`. **No single layer is trusted alone** — this is a direct response to real-world proxy/middleware bypass vulnerabilities in Next.js (CVE-2025-29927, CVE-2025-66478), where relying on the edge middleware layer as *the* auth boundary turned out to be unsafe because a crafted request could skip it entirely.

1. **`proxy.ts`** (Next's renamed `middleware.ts`) — redirects an unauthenticated visitor to `/admin/login` before a protected page even renders. This is a UX nicety. If this file were deleted entirely, nothing would become exploitable — layers 2 and 3 below still hold.
2. **`app/admin/(dashboard)/layout.tsx`** — calls `supabase.auth.getUser()` again, independently, server-side, for every request under the dashboard. This is real request-scoped verification, not cached/trusted state from the proxy.
3. **Row Level Security** — every table's policies are evaluated by Postgres itself on every query, regardless of what any application code did or didn't check. Even in a hypothetical scenario where both layers above were bypassed, an unauthorized request still cannot read or write rows it shouldn't.

## Row Level Security

RLS is enabled on every table in `public`. Full policy-by-policy detail is in `DATABASE.md`; the summary:

- Public (including fully unauthenticated `anon`) can only ever read `status = 'published'` rows.
- Any authenticated admin role can read everything (needed for the dashboard to show drafts).
- Write access is gated by two SQL predicates (`is_admin()`, `can_publish()`) rather than ad-hoc role-name string comparisons scattered across policies — one place to audit, one place to change.
- Hard deletes require `can_publish()` (administrator/super_admin), never an editor.

**Lesson learned (Phase 2, migration 0008)**: gating one column of a row (`status`) is not the same as gating the row's *effective* state. The original policies correctly blocked an editor from setting `status = 'published'` directly, but didn't consider that `deleted_at` was an equally privileged transition being left ungated on the very same UPDATE statement. This was caught by writing an actual adversarial test (log in as editor, try to soft-delete, expect rejection) against a real Postgres instance rather than only reading the policy SQL and reasoning about it. **Every future module's RLS should get the same treatment**: for each "only publishers can do X" rule, explicitly test every column/action that could achieve X's effect, not just the obviously-named one.

## Service-role key handling

`lib/supabase/admin.ts` wraps the Supabase **service role key**, which bypasses RLS entirely. Two safeguards:

1. It imports the `server-only` package at the top of the file. This makes it a **build-time error** — not just a lint warning — to import this file from any Client Component, so the key can never end up in a browser bundle.
2. It is documented as last-resort: the file's own comment explicitly says not to reach for it just because writing a correct RLS policy is inconvenient. Every current use case in this phase (there are none yet — it exists for future privileged operations like user invitation) must still be gated by an explicit role check in the calling Server Action.

The key itself lives only in environment variables (`SUPABASE_SERVICE_ROLE_KEY`), never committed — `.env.example` documents the variable name with an empty value, and `.gitignore` already excludes `.env*`.

## Why self-profile-editing goes through an RPC, not a raw UPDATE policy

An earlier draft of the `profiles` RLS had a policy letting a user `UPDATE` their own row, with a `WITH CHECK` clause attempting to block them from also changing their own `role_id` (self-promotion) via a subquery comparing against the stored value. This is a fragile pattern — subqueries inside `WITH CHECK` evaluate against visible state in ways that are easy to get subtly wrong, and getting it wrong here means a user can grant themselves `super_admin`.

Fixed by removing that policy entirely. There is now **no** RLS policy allowing any non-`super_admin` to `UPDATE` `profiles` directly at all. Self-service edits (display name, avatar) go through `update_own_profile(full_name, avatar_url)` — a `SECURITY DEFINER` function with an explicit, whitelisted parameter list. It is structurally impossible to pass a `role_id` through it, because the function signature doesn't accept one.

**General principle for future phases**: when a self-service update needs to touch a table that also has privileged columns, prefer a whitelisted RPC over a clever RLS `WITH CHECK` expression.

## Input validation

- Server Actions (login today; every future CRUD action) validate input before touching the database. Zod is installed for this from Phase 1 onward.
- Storage buckets enforce file-size limits and allowed MIME types at the bucket level (`supabase/migrations/0006_storage_buckets.sql`) as a first line of defense; application-level validation (file type/size checks before upload) is required in every upload UI built in later phases — bucket-level limits are a backstop, not a substitute.

## Audit trail

`activity_logs` is append-only: RLS grants `SELECT` to admins and grants nothing else — no `UPDATE`, no `DELETE` policy exists for any role, including `super_admin`. The only way a row is ever inserted is through the `log_activity()` RPC, which every future mutating Server Action is expected to call after a successful write. This is intentionally tamper-resistant: even a compromised admin account cannot rewrite history, only add to it.

## Auth account lifecycle

- New Supabase Auth signups default to the `viewer` role (read-only) via the `handle_new_user()` trigger — there is no path by which simply having an account grants write access.
- Deactivating an account: set `profiles.is_active = false`. This is checked explicitly at login (immediate sign-out + redirect to a clear error) and is also implicitly enforced everywhere else, since `is_admin()`/`can_publish()`/`current_user_role()` all filter on `is_active = true`.
- There is no password-reset flow yet — tracked as a Phase 2 candidate in `PROJECT_TRACKER.md`. Until it exists, a locked-out admin needs a Super Admin (or direct Supabase Dashboard access) to reset their password.

## What's explicitly NOT hardened yet (tracked, not forgotten)

- Rate limiting on the login form (brute-force protection) — Supabase Auth has some built-in throttling, but no additional application-level rate limiting has been added.
- CSRF: Next.js Server Actions have built-in CSRF protection (origin-checking) as of the Next.js version this project uses; no additional CSRF tokens have been added on top, since that protection is already the framework default here.
- Content Security Policy headers — not yet configured.
- File upload virus/malware scanning — bucket-level MIME/size limits exist; no scanning layer yet.
