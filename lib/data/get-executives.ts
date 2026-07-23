import { createClient } from "@/lib/supabase/server";
import { executiveCommittee as hardcodedExecutiveCommittee } from "@/lib/data/executive-committee";
import type { Profile } from "@/components/shared/profile-card";

function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words
    .filter((w) => !/^(mr|mrs|ms|dr|chief|alhaji|alhaja|prince|princess|elder|hon|lady|evang)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || name[0]?.toUpperCase() || "?";
}

/**
 * Reads published executives directly from Supabase (respecting RLS — this
 * is the same anon-permission read any site visitor gets). Falls back to
 * the original hardcoded `lib/data/executive-committee.ts` content if:
 *   - Supabase isn't configured yet (env vars unset — this sandbox/local dev)
 *   - The query errors for any reason (network, RLS misconfiguration, etc.)
 *   - The table is simply empty (not yet seeded — see supabase/seed_executives.sql)
 *
 * This is a deliberate resilience choice matching ARCHITECTURE.md's "the
 * public site must never break due to a Supabase issue" principle — a CMS
 * outage should never take down the Executive Committee page.
 */
export async function getPublishedExecutives(): Promise<Profile[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("executives")
      .select("full_name, position, biography, photo_url")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return hardcodedExecutiveCommittee;
    }

    return data.map((row) => ({
      name: row.full_name,
      role: row.position,
      bio: row.biography ?? "",
      initials: initialsFromName(row.full_name),
      photo: row.photo_url ?? undefined,
    }));
  } catch {
    return hardcodedExecutiveCommittee;
  }
}
