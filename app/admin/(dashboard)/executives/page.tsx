import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database.types";
import { SearchInput } from "@/components/admin/data-table/search-input";
import { SortableHeader } from "@/components/admin/data-table/sortable-header";
import { StatusBadge } from "@/components/admin/data-table/status-badge";
import { Pagination } from "@/components/admin/data-table/pagination";
import { EmptyState, ErrorState } from "@/components/admin/data-table/states";
import { ExecutiveRowActions } from "@/components/admin/executives/executive-row-actions";

export const metadata: Metadata = {
  title: "Executives",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 10;
const SORTABLE_COLUMNS = ["full_name", "position", "display_order", "created_at"] as const;
type SortColumn = (typeof SORTABLE_COLUMNS)[number];

function isSortColumn(value: string): value is SortColumn {
  return (SORTABLE_COLUMNS as readonly string[]).includes(value);
}

const VALID_STATUSES: ContentStatus[] = ["draft", "published", "hidden", "archived"];
function isContentStatus(value: string): value is ContentStatus {
  return (VALID_STATUSES as string[]).includes(value);
}

export default async function ExecutivesListPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    sort?: string;
    order?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const q = params.q?.trim() ?? "";
  const statusFilter = params.status ?? "all";
  const sort: SortColumn = isSortColumn(params.sort ?? "") ? (params.sort as SortColumn) : "display_order";
  const order: "asc" | "desc" = params.order === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(params.page) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: role } = await supabase.rpc("current_user_role");
  const canPublish = role === "administrator" || role === "super_admin";

  let query = supabase
    .from("executives")
    .select("*", { count: "exact" })
    .is("deleted_at", null);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,position.ilike.%${q}%`);
  }
  if (statusFilter !== "all" && isContentStatus(statusFilter)) {
    query = query.eq("status", statusFilter);
  }

  const { data: executives, count, error } = await query
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  function buildHref(overrides: Record<string, string>) {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (statusFilter !== "all") next.set("status", statusFilter);
    next.set("sort", sort);
    next.set("order", order);
    next.set("page", String(page));
    Object.entries(overrides).forEach(([k, v]) => next.set(k, v));
    return `/admin/executives?${next.toString()}`;
  }

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Executives</h1>
          <p className="mt-1 text-sm text-ink-500">
            Manage the Executive Committee shown on the public site.
          </p>
        </div>
        <Link
          href="/admin/executives/new"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          <Plus size={16} /> Add Executive
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput placeholder="Search by name or position…" />
        <div className="flex gap-2">
          {["all", "draft", "published", "hidden"].map((s) => (
            <Link
              key={s}
              href={buildHref({ status: s, page: "1" })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-ink-600 ring-1 ring-inset ring-ink-200 hover:bg-emerald-50"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorState message={error.message} />
      ) : !executives || executives.length === 0 ? (
        <EmptyState
          title={q || statusFilter !== "all" ? "No executives match your filters" : "No executives yet"}
          description={
            q || statusFilter !== "all"
              ? "Try a different search term or clear the status filter."
              : "Add your first Executive Committee member to get started."
          }
          action={
            !q && statusFilter === "all" ? (
              <Link
                href="/admin/executives/new"
                className="mt-2 text-sm font-semibold text-emerald-700 hover:underline"
              >
                Add Executive
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50">
              <tr>
                <th className="w-16 px-4 py-3" />
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Name"
                    sortKey="full_name"
                    currentSort={sort}
                    currentOrder={order}
                    buildHref={(s, o) => buildHref({ sort: s, order: o, page: "1" })}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Position"
                    sortKey="position"
                    currentSort={sort}
                    currentOrder={order}
                    buildHref={(s, o) => buildHref({ sort: s, order: o, page: "1" })}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Order"
                    sortKey="display_order"
                    currentSort={sort}
                    currentOrder={order}
                    buildHref={(s, o) => buildHref({ sort: s, order: o, page: "1" })}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.06em] text-ink-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.06em] text-ink-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {executives.map((exec) => (
                <tr key={exec.id} className="hover:bg-emerald-50/30">
                  <td className="px-4 py-3">
                    <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-emerald-50 text-emerald-700">
                      {exec.photo_url ? (
                        <Image src={exec.photo_url} alt="" fill sizes="40px" className="object-cover" />
                      ) : (
                        <User size={16} />
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">{exec.full_name}</td>
                  <td className="px-4 py-3 text-ink-600">{exec.position}</td>
                  <td className="px-4 py-3 text-ink-500">{exec.display_order}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={exec.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ExecutiveRowActions id={exec.id} status={exec.status} canPublish={canPublish} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 pb-4">
            <Pagination page={page} totalPages={totalPages} buildHref={(p) => buildHref({ page: String(p) })} />
          </div>
        </div>
      )}
    </div>
  );
}
