import type { MetadataRoute } from "next";
import { business } from "@/lib/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/portfolio", "/services", "/about", "/contact"].map((r) => ({ url: `${business.siteUrl}${r}/`, lastModified: new Date() }));
}
