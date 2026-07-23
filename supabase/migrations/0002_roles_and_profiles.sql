-- ============================================================================
-- 0002: Roles, permissions, and profiles
-- ============================================================================

create table public.roles (
  id smallint primary key generated always as identity,
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

comment on table public.roles is
  'Fixed role catalogue: super_admin, administrator, editor, viewer.';

create table public.permissions (
  id smallint primary key generated always as identity,
  key text not null unique, -- e.g. 'executives.create', 'news.publish'
  description text,
  created_at timestamptz not null default now()
);

create table public.role_permissions (
  role_id smallint not null references public.roles (id) on delete cascade,
  permission_id smallint not null references public.permissions (id) on delete cascade,
  primary key (role_id, permission_id)
);

-- Profiles extend auth.users 1:1. Row is created automatically by the
-- trigger below whenever a new user is added in Supabase Auth (i.e. whenever
-- an admin is invited).
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role_id smallint not null references public.roles (id),
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- New Supabase Auth users default to the 'viewer' role until a super_admin
-- promotes them — nobody gets write access just by signing up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  viewer_role_id smallint;
begin
  select id into viewer_role_id from public.roles where name = 'viewer';

  insert into public.profiles (id, email, full_name, role_id)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    viewer_role_id
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Role-check helper functions — defined here (not in 0001) because these are
-- SQL-language functions, and Postgres validates their bodies against the
-- catalog at CREATE FUNCTION time. They reference profiles/roles, which now
-- exist as of this migration.
-- ---------------------------------------------------------------------------

-- Returns the role name (e.g. 'super_admin') of the currently authenticated
-- user, or null if unauthenticated / no profile row exists yet.
-- SECURITY DEFINER so it can read `profiles`/`roles` even from within an RLS
-- policy on another table without causing recursive policy evaluation.
create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select r.name
  from public.profiles p
  join public.roles r on r.id = p.role_id
  where p.id = auth.uid()
    and p.is_active = true;
$$;

-- Convenience predicate: is the current user an active admin of any kind
-- (super_admin, administrator, or editor — i.e. anyone who can write
-- content). Viewers are read-only and excluded.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('super_admin', 'administrator', 'editor');
$$;

-- Stricter predicate for destructive/user-management actions.
create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() = 'super_admin';
$$;

-- ---------------------------------------------------------------------------
-- RLS: roles / permissions / role_permissions / profiles
-- ---------------------------------------------------------------------------

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.profiles enable row level security;

-- Roles/permissions are reference data: any authenticated admin can read
-- them (needed to render role pickers in the UI); only super_admin writes.
create policy "roles readable by admins" on public.roles
  for select to authenticated using (public.is_admin());

create policy "roles writable by super_admin" on public.roles
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

create policy "permissions readable by admins" on public.permissions
  for select to authenticated using (public.is_admin());

create policy "permissions writable by super_admin" on public.permissions
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

create policy "role_permissions readable by admins" on public.role_permissions
  for select to authenticated using (public.is_admin());

create policy "role_permissions writable by super_admin" on public.role_permissions
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- Profiles: everyone can read their own profile (needed for the admin shell
-- to show "who am I / what role"); admins can read all profiles (needed for
-- a User Management screen); only super_admin can change anyone's role or
-- deactivate an account; a user may update their own name/avatar only.
create policy "users can read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

create policy "admins can read all profiles" on public.profiles
  for select to authenticated using (public.is_admin());

create policy "super_admin manages all profiles" on public.profiles
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- Ordinary users cannot UPDATE the profiles table directly at all (no policy
-- grants it), which would otherwise require a fragile RLS check to stop
-- someone slipping a new role_id into their own UPDATE. Instead, self-service
-- edits (display name, avatar) go through this whitelisted RPC.
create or replace function public.update_own_profile(
  p_full_name text default null,
  p_avatar_url text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.profiles;
begin
  update public.profiles
  set
    full_name = coalesce(p_full_name, full_name),
    avatar_url = coalesce(p_avatar_url, avatar_url)
  where id = auth.uid()
  returning * into result;

  return result;
end;
$$;

revoke all on function public.update_own_profile from public;
grant execute on function public.update_own_profile to authenticated;

-- Seed the fixed role catalogue.
insert into public.roles (name, description) values
  ('super_admin', 'Full access, including user management and destructive actions'),
  ('administrator', 'Full content management access, no user management'),
  ('editor', 'Can create and edit content; cannot publish or delete'),
  ('viewer', 'Read-only access to the admin dashboard');
