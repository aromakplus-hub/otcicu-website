"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/actions";
import type { RoleName } from "@/types/database.types";

/**
 * IMPORTANT: only add an entry here once that module's pages are fully
 * built, tested, and deployed — per the Phase 2 operating rule, a sidebar
 * link that 404s is treated as a bug, not an acceptable work-in-progress
 * state. See PROJECT_TRACKER.md for what's actually shipped.
 */
const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
];

export function AdminSidebar({
  fullName,
  email,
  role,
}: {
  fullName: string | null;
  email: string;
  role: RoleName;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-ink-100 bg-white">
      <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 font-display text-sm font-bold text-white">
          OC
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-ink-900">OTCICU Admin</p>
          <p className="text-xs text-ink-500">Content Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-emerald-700 text-white" : "text-ink-700 hover:bg-emerald-50"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-100 p-4">
        <div className="mb-3 flex flex-col gap-0.5">
          <p className="truncate text-sm font-semibold text-ink-900">{fullName || email}</p>
          <p className="text-xs capitalize text-ink-500">{role.replace("_", " ")}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
