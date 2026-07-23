import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/error"];

/**
 * Refreshes the Supabase auth session on every request and enforces that
 * /admin/* routes (other than the login/error pages) require an active,
 * non-hidden administrator session. Mirrors — but does not replace — the
 * database-level RLS checks; this is the route-level gate.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Fail loudly but gracefully: the admin dashboard is unusable without
    // Supabase configured, but this must never manifest as a raw unhandled
    // exception/500 page. See SETUP.md for how to set these.
    if (request.nextUrl.pathname !== "/admin/error") {
      const url = new URL("/admin/error", request.url);
      url.searchParams.set("reason", "not_configured");
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: do not run any logic between createServerClient and this call
  // — getUser() is what actually revalidates the token with Supabase Auth.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));

  if (isAdminRoute && !isPublicAdminPath && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Signed-in users shouldn't see the login page again.
  if (pathname.startsWith("/admin/login") && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}
