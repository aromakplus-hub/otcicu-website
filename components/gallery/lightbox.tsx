"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/lib/data/gallery";

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const item = items[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/90 p-6"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + items.length) % items.length);
        }}
        aria-label="Previous image"
        className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        className="relative flex aspect-[4/3] w-full max-w-2xl flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.photo ? (
          <>
            <Image
              src={item.photo}
              alt={item.caption}
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-10">
              <p className="relative font-display text-base font-semibold text-white">{item.caption}</p>
              <span className="relative mt-1 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-emerald-50/80">
                {item.category}
              </span>
            </div>
          </>
        ) : (
          <>
            <ImageIcon className="text-white/40" size={40} aria-hidden />
            <p className="font-display text-lg font-semibold text-white">{item.caption}</p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-emerald-50/80">
              {item.category}
            </span>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % items.length);
        }}
        aria-label="Next image"
        className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
