# SETUP.md

## Prerequisites

- Node.js 20+
- A Supabase project (per the operating instructions, `otcicu-cms` already exists — if it doesn't yet, create one at supabase.com and substitute your own project ref throughout)
- The Supabase CLI (`npm install -g supabase`) for running migrations

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in from your Supabase project's **Settings > API** page:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon/public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>   # keep this secret — never commit it
NEXT_PUBLIC_SITE_URL=https://otitolojucicu.com
```

Without these, the public site works normally; `/admin/*` shows a "not configured" message rather than crashing (this is intentional — see `ARCHITECTURE.md`).

## 3. Run the database migrations

Link the CLI to your project once:

```bash
supabase link --project-ref <project-ref>
```

Then push the migrations:

```bash
supabase db push
```

This runs, in order:
1. `0001_extensions_and_helpers.sql`
2. `0002_roles_and_profiles.sql`
3. `0003_content_tables.sql`
4. `0004_singletons_and_support.sql`
5. `0005_rls_policies.sql`
6. `0006_storage_buckets.sql`
7. `0007_grants_safety_net.sql`

Verify in the Supabase Dashboard (Table Editor) that all tables listed in `DATABASE.md` now exist, and that Storage has the 6 buckets.

## 4. Seed reference data

```bash
supabase db execute -f supabase/seed.sql
```

(Or paste the file contents into the Dashboard's SQL Editor and run it.) This seeds gallery categories and the permission catalogue. It does **not** seed real site content — that migration happens in Phases 4–9.

## 5. Create your first Super Admin

1. Dashboard > Authentication > Users > **Add User** — create an account with your real email and a temporary password. This automatically creates a matching `profiles` row (via a trigger) defaulted to the `viewer` role.
2. Promote yourself to `super_admin` by running this in the SQL Editor:

   ```sql
   update public.profiles
   set role_id = (select id from public.roles where name = 'super_admin')
   where email = 'your-email@example.com';
   ```

3. Log in at `/admin/login` with that email + the temporary password you set.

## 6. Regenerate real TypeScript types

`types/database.types.ts` is currently hand-authored (see the comment at the top of that file) as a stand-in. Once your project is linked:

```bash
npx supabase gen types typescript --project-id <project-ref> > types/database.types.ts
```

Diff the output against the current file before committing — application code currently avoids Supabase's embedded-resource select syntax (e.g. `.select("*, roles(name)")`) specifically so it wouldn't break if the hand-authored `Relationships` metadata was ever incomplete; once real types are in, that's no longer a constraint and future code can use embedded selects freely if convenient.

## 7. Local development

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site, `http://localhost:3000/admin/login` for the dashboard.

## 8. Deploying (Vercel)

Per the current infrastructure notes, a Vercel deployment already exists for this project. Add the same three Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) plus `NEXT_PUBLIC_SITE_URL` in the Vercel project's **Settings > Environment Variables**, then redeploy (or push to the connected branch to trigger a deploy automatically).

**I cannot perform this step myself** — my sandbox has no network access to vercel.com or supabase.com and no credentials for either. Everything up to "push migrations and add env vars" is a manual, one-time action on your end; all code, schema, and configuration to make that action succeed is already written.
