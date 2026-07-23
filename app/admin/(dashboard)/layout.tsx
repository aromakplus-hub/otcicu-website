import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/admin-shell";
import type { RoleName } from "@/types/database.types";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login/error pages render their own full-page layout without the shell.
  // middleware.ts already redirects unauthenticated requests before they'd
  // reach here for any other /admin route, but we still guard explicitly —
  // never trust a single layer alone for auth.
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, is_active")
    .eq("id", user.id)
    .single();

  if (!profile?.is_active) {
    redirect("/admin/error?reason=inactive");
  }

  const { data: role } = await supabase.rpc("current_user_role");

  return (
    <>
      <AdminShell fullName={profile.full_name} email={profile.email} role={(role as RoleName) ?? "viewer"}>
        {children}
      </AdminShell>
      <Toaster richColors position="top-right" />
    </>
  );
}
