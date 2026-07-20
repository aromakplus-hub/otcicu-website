import type { MetadataRoute } from "next";
import { newsItems } from "@/lib/data/news";

const baseUrl = "https://otitolojucicu.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/executive-committee",
    "/membership",
    "/savings",
    "/loans",
    "/news",
    "/gallery",
    "/contact",
    "/apply",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const newsRoutes = newsItems.map((item) => ({
    url: `${baseUrl}/news/${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes];
}
