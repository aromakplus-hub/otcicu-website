"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { RoleName } from "@/types/database.types";

export function AdminShell({
  fullName,
  email,
  role,
  children,
}: {
  fullName: string | null;
  email: string;
  role: RoleName;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-emerald-50/30 lg:flex">
      {/* Mobile/tablet top bar — hidden entirely at lg and up, where the
          static sidebar from the original desktop layout is used instead. */}
      <div className="flex items-center justify-between border-b border-ink-100 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-display text-xs font-bold text-white">
            OC
          </span>
          <p className="font-display text-sm font-semibold text-ink-900">OTCICU Admin</p>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-emerald-50"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Backdrop — mobile/tablet only, shown while the drawer is open. */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <AdminSidebar
        fullName={fullName}
        email={email}
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* min-w-0 is required here: without it, a flex child won't shrink
          below its content's intrinsic width, which is exactly the bug
          being fixed — a wide table/card grid inside could otherwise force
          this column wider than the viewport again even with the sidebar
          itself now behaving correctly. */}
      <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
