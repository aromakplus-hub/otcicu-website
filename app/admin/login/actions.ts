"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string } | null;

export async function signIn(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Enter both your email and password." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Don't reveal whether the email exists — same generic message either way.
    return { error: "Incorrect email or password." };
  }

  // Confirm the account is an active admin profile before letting them in.
  // (RLS also enforces this on every subsequent query — this is just an
  // early, friendlier check at the login gate itself.)
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_active")
    .eq("id", data.user.id)
    .single();

  if (!profile?.is_active) {
    await supabase.auth.signOut();
    redirect("/admin/error?reason=inactive");
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}
