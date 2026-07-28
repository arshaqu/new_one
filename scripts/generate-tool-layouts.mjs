import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, "..", "app");

const toolsPath = path.join(APP_DIR, "data", "tools.js");
const { toolCategories } = await import(pathToFileURL(toolsPath).href);

const PAGE_EXTENSIONS = [".tsx", ".jsx", ".js"];

let created = 0;
let skippedNoPage = 0;
let skippedNoFolder = 0;

for (const cat of toolCategories) {
  for (const tool of cat.children) {
    const relDir = tool.path.replace(/^\//, "");
    const dirPath = path.join(APP_DIR, ...relDir.split("/"));
    const layoutPath = path.join(dirPath, "layout.tsx");

    if (!fs.existsSync(dirPath)) {
      console.warn(`❌ Folder missing entirely: app/${relDir}`);
      skippedNoFolder++;
      continue;
    }

    const foundPageExt = PAGE_EXTENSIONS.find((ext) =>
      fs.existsSync(path.join(dirPath, `page${ext}`))
    );

    if (!foundPageExt) {
      const contents = fs.readdirSync(dirPath);
      console.warn(
        `⚠️  No page file in app/${relDir} — contents: [${contents.join(", ") || "empty"}]`
      );
      skippedNoPage++;
      continue;
    }

    const layoutContent = `import type { Metadata } from "next";
import { getToolMetadata, getToolJsonLd } from "@/app/lib/seo";

const TOOL_PATH = "${tool.path}";

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
`;

    fs.writeFileSync(layoutPath, layoutContent, "utf8");
    console.log(`✅ ${tool.path} → layout.tsx`);
    created++;
  }
}

console.log(
  `\nDone. Created ${created}. Folder missing: ${skippedNoFolder}. Folder exists but no page file: ${skippedNoPage}.`
);