"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // matches the bucket's own limit (migration 0006)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function PhotoUpload({
  name,
  initialUrl,
}: {
  name: string;
  initialUrl?: string | null;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please choose a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("executives")
        .upload(path, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("executives").getPublicUrl(path);
      setPreviewUrl(data.publicUrl);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={previewUrl ?? ""} />

      {previewUrl ? (
        <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-emerald-50">
          <Image src={previewUrl} alt="" fill sizes="128px" className="object-cover" />
          <button
            type="button"
            onClick={() => setPreviewUrl(null)}
            aria-label="Remove photo"
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-ink-200 text-ink-500 hover:border-emerald-400 hover:text-emerald-700",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
          <span className="text-xs font-medium">{uploading ? "Uploading…" : "Upload photo"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-fit text-xs font-semibold text-emerald-700 hover:underline"
        >
          Replace photo
        </button>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
      <p className="text-xs text-ink-400">JPEG, PNG, or WebP — up to 5 MB.</p>
    </div>
  );
}
