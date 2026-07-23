import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { galleryItems } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";

const spanClass: Record<string, string> = {
  wide: "sm:col-span-2 aspect-[16/9]",
  tall: "sm:row-span-2 aspect-[3/4]",
  normal: "aspect-[4/3]",
};

export function GalleryPreview() {
  return (
    <section className="bg-emerald-50/50 py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Moments"
            title="Gallery"
            description="A look at the people and events behind the cooperative."
          />
          <Link href="/gallery" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            View Full Gallery <ArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {galleryItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative flex items-end overflow-hidden rounded-2xl",
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
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="absolute right-4 top-4 text-white/30" size={20} aria-hidden />
              )}
              <span
                className={cn(
                  "absolute inset-0",
                  item.photo && "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                )}
              />
              <p className="relative z-10 p-5 text-sm font-medium text-white/90">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
