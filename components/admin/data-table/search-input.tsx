"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchInput({ placeholder = "Search…" }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.delete("page"); // reset to page 1 on a new search
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="font-ui h-10 w-full rounded-full border border-ink-300/70 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
      />
      {isPending && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-400">…</span>
      )}
    </form>
  );
}
