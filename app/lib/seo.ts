import type { Metadata } from "next";
import { toolCategories } from "@/app/data/tools";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
export const SITE_NAME = "The Toolbox";

export function findToolByPath(path: string) {
  for (const cat of toolCategories) {
    const tool = cat.children.find((c) => c.path === path);
    if (tool) return { tool, category: cat };
  }
  return null;
}

export function getToolMetadata(path: string): Metadata {
  const found = findToolByPath(path);
  if (!found) return {};

  const { tool, category } = found;
  const title = `${tool.name} — Free Online Tool`;

  // Weave the primary keyword into the description naturally instead of
  // just repeating the tool name — helps snippet relevance in search results
  const primaryKeyword = tool.keywords?.[0] ?? tool.name.toLowerCase();
  const description = `${tool.name} — ${primaryKeyword} for free. Part of our ${category.name} toolset. Fast, accurate, no signup required.`;

  const url = `${SITE_URL}${tool.path}`;

  return {
    title,
    description,
    keywords: tool.keywords ?? [tool.name, category.name],
    alternates: { canonical: tool.path },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getToolJsonLd(path: string) {
  const found = findToolByPath(path);
  if (!found) return null;

  const { tool, category } = found;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${SITE_URL}/?category=${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `${SITE_URL}${tool.path}`,
      },
    ],
  };

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: category.name,
    operatingSystem: "Any (Web-based)",
    url: `${SITE_URL}${tool.path}`,
    keywords: tool.keywords?.join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return { breadcrumbJsonLd, toolJsonLd };
}