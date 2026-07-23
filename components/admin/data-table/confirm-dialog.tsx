"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  tone = "danger",
  isPending,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  tone?: "danger" | "default";
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-900/50 p-6"
      onClick={onCancel}
    >
      <div
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          {tone === "danger" && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle size={18} />
            </span>
          )}
          <div>
            <p id="confirm-dialog-title" className="font-display text-base font-semibold text-ink-900">
              {title}
            </p>
            <p className="mt-1 text-sm text-ink-500">{description}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button ref={cancelRef} type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={tone === "danger" ? "primary" : "primary"}
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
            className={tone === "danger" ? "bg-red-600 hover:bg-red-700" : undefined}
          >
            {isPending ? "Please wait…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
