import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * SECURITY NOTE (see SECURITY.md "Defense in Depth"):
 * This proxy (formerly "middleware") is a convenience redirect only — it
 * exists so a signed-out visitor is bounced to /admin/login before ever
 * rendering a page, rather than seeing a flash of protected UI. It is
 * intentionally NOT the actual security boundary.
 *
 * Proxy/middleware-bypass CVEs (e.g. CVE-2025-29927, CVE-2025-66478) have
 * shown that relying on this layer alone for auth is unsafe — a crafted
 * request can skip it. Every admin Server Component and Server Action in
 * this app therefore re-checks `supabase.auth.getUser()` independently
 * (see app/admin/(dashboard)/layout.tsx), and every table additionally
 * enforces Row Level Security at the database layer regardless of what any
 * application-layer check does or doesn't catch. Losing this proxy file
 * entirely would degrade UX, not security.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run on /admin routes. The public site has no dependency on
     * Supabase session state at all, so it must never be affected if the
     * Supabase client fails to initialize (missing/invalid env vars, a
     * Supabase outage, etc.) — narrowing the matcher keeps that failure
     * mode contained to the admin dashboard instead of taking down the
     * entire public website.
     */
    "/admin/:path*",
  ],
};
