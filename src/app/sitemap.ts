import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
