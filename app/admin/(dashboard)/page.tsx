import type { Metadata } from "next";
import { Users, Image as ImageIcon, Newspaper, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// Real counts are wired up once each content module exists (Phases 4-7).
// Shown as "—" rather than 0 so it's visibly a placeholder, not real data.
const stats = [
  { label: "Executives", icon: Users },
  { label: "Gallery Images", icon: ImageIcon },
  { label: "Published News", icon: Newspaper },
  { label: "Events", icon: CalendarDays },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">
          Foundation phase complete — content modules will appear here as each is built.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-ink-900">—</p>
              <p className="text-xs text-ink-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
        You&rsquo;re signed in and the database/auth foundation is live. Executive, Gallery, News,
        and Events management screens are built in the next milestones — see{" "}
        <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">PROJECT_TRACKER.md</code> in the
        repo root for status.
      </div>
    </div>
  );
}
