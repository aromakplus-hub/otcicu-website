"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryItems, galleryCategories } from "@/lib/data/gallery";
import { Lightbox } from "@/components/gallery/lightbox";

const spanClass: Record<string, string> = {
  wide: "sm:col-span-2 aspect-[16/9]",
  tall: "sm:row-span-2 aspect-[3/4]",
  normal: "aspect-[4/3]",
};

export function GalleryGrid() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => galleryItems.filter((item) => (category === "All" ? true : item.category === category)),
    [category]
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "font-ui rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === cat
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-ink-700 hover:bg-emerald-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative flex items-end overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
              !item.photo && "bg-gradient-to-br from-emerald-700 to-emerald-900",
              spanClass[item.span ?? "normal"]
            )}
          >
            {item.photo ? (
              <Image
                src={item.photo}
                alt={item.caption}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <ImageIcon className="absolute right-4 top-4 text-white/30" size={20} aria-hidden />
            )}
            <span
              className={cn(
                "absolute inset-0 transition-colors",
                item.photo
                  ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80"
                  : "bg-black/0 group-hover:bg-black/10"
              )}
            />
            <p className="relative z-10 p-5 text-sm font-medium text-white/90">{item.caption}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-ink-200 p-10 text-center text-sm text-ink-500">
          No images in this category yet.
        </p>
      )}

      {activeIndex !== null && (
        <Lightbox
          items={filtered}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  );
}
