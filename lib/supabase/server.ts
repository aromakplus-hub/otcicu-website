import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Supabase client for use in Server Components, Server Actions, and Route
 * Handlers. Uses the anon key + the caller's session cookie, so Row Level
 * Security still applies exactly as it does for the browser client — this
 * is NOT a service-role/admin client.
 *
 * Must be created fresh per request (cookies() is request-scoped), so call
 * this at the top of each Server Component / Action rather than caching it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component during render, where
            // cookies cannot be set. This is safe to ignore as long as
            // middleware.ts is also refreshing the session (see middleware.ts).
          }
        },
      },
    }
  );
}
