import type { Metadata } from "next";
import { getToolMetadata, getToolJsonLd } from "@/app/lib/seo";

const TOOL_PATH = "/image/image_format";

export const metadata: Metadata = getToolMetadata(TOOL_PATH);

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getToolJsonLd(TOOL_PATH);

  return (
    <>
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd.breadcrumbJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd.toolJsonLd),
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
