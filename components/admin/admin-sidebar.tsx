"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  X,
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
  open,
  onClose,
}: {
  fullName: string | null;
  email: string;
  role: RoleName;
  /** Controls visibility below the `lg` breakpoint only. Ignored at `lg` and up — the sidebar is always visible there, matching the original desktop layout exactly. */
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        // Mobile/tablet (<lg): fixed off-canvas drawer, slides in from the left.
        "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 -translate-x-full flex-col border-r border-ink-100 bg-white transition-transform duration-200 ease-out",
        open && "translate-x-0",
        // Desktop (lg+): back to the original static, always-visible sidebar.
        "lg:static lg:z-auto lg:translate-x-0"
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 font-display text-sm font-bold text-white">
            OC
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">OTCICU Admin</p>
            <p className="text-xs text-ink-500">Content Dashboard</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-emerald-50 lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
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
