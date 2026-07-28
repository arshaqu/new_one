import { MetadataRoute } from "next";
import { toolCategories } from "./data/tools";

const SITE_URL = "https://yourdomain.com"; // TODO: replace with real domain

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolUrls: MetadataRoute.Sitemap = toolCategories.flatMap((cat) =>
    cat.children.map((child) => ({
      url: `${SITE_URL}${child.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...toolUrls,
  ];
}