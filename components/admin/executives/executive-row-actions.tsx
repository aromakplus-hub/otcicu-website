"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/data-table/confirm-dialog";
import {
  deleteExecutive,
  setExecutiveStatus,
} from "@/app/admin/(dashboard)/executives/actions";
import type { ContentStatus } from "@/types/database.types";

export function ExecutiveRowActions({
  id,
  status,
  canPublish,
}: {
  id: string;
  status: ContentStatus;
  canPublish: boolean;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleToggleStatus() {
    const nextStatus = status === "published" ? "hidden" : "published";
    startTransition(async () => {
      const result = await setExecutiveStatus(id, nextStatus);
      if (result.success) {
        toast.success(nextStatus === "published" ? "Executive published." : "Executive unpublished.");
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteExecutive(id);
      setConfirmingDelete(false);
      if (result.success) {
        toast.success("Executive deleted.");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/admin/executives/${id}/edit`}
        aria-label="Edit"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Pencil size={15} />
      </Link>

      {canPublish && status !== "draft" && (
        <button
          type="button"
          onClick={handleToggleStatus}
          disabled={isPending}
          aria-label={status === "published" ? "Unpublish" : "Publish"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-emerald-50 hover:text-emerald-700"
        >
          {status === "published" ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}

      {canPublish && (
        <button
          type="button"
          onClick={() => setConfirmingDelete(true)}
          aria-label="Delete"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={15} />
        </button>
      )}

      <ConfirmDialog
        open={confirmingDelete}
        title="Delete this executive?"
        description="This removes them from the public site. This can be reversed by a Super Admin from the database if needed, but not from this screen."
        confirmLabel="Delete"
        tone="danger"
        isPending={isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
