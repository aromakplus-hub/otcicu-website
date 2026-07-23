import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Access Restricted",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  inactive:
    "Your admin account has been deactivated. Contact a Super Admin if you believe this is a mistake.",
  not_configured:
    "The admin dashboard isn't connected to a database yet. An administrator needs to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY — see SETUP.md.",
};

export default async function AdminErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = (reason && messages[reason]) || "You don't have access to the admin dashboard.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-950 px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-xl">
        <ShieldAlert size={32} className="text-red-600" />
        <p className="font-display text-lg font-semibold text-ink-900">Access Restricted</p>
        <p className="text-sm leading-relaxed text-ink-500">{message}</p>
        <Link href="/admin/login" className="text-sm font-semibold text-emerald-700 hover:underline">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
