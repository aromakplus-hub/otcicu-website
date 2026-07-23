import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Service-role Supabase client. BYPASSES Row Level Security entirely.
 *
 * The `server-only` import above makes it a build error to import this file
 * from any Client Component, so the service role key can never end up in a
 * browser bundle.
 *
 * Use ONLY for operations that legitimately require elevated privileges and
 * are already gated by an explicit role check in the calling Server Action
 * or Route Handler, e.g.:
 *   - Super Admin user management (inviting/removing admin users)
 *   - Writing activity_logs entries
 *   - Admin-triggered bulk imports
 *
 * Do NOT use this as a shortcut to avoid writing an RLS policy. If a policy
 * is hard to express, that's a signal to model the access rule properly
 * rather than to bypass it here.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
