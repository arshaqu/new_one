import type { Metadata } from "next";
import { toolCategories } from "./data/tools";
import HomeClient from "./HomeClient";


const SITE_URL = "https://yourdomain.com"; // TODO: replace with real domain
const SITE_NAME = "The Toolbox";
const SITE_DESCRIPTION =
  "Fast, free online tools for images, PDFs, JSON, and more — organized like drawers, not a search bar. No signup, no fluff.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Toolbox — Free Online Tools, No Signup Required",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "online tools",
    "free tools",
    "PDF merge",
    "image resize",
    "JSON formatter",
    "web utilities",
    "browser tools",
    "no signup tools",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "The Toolbox — Free Online Tools, No Signup Required",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // TODO: add a real 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: "The Toolbox — Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Toolbox — Free Online Tools, No Signup Required",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    // creator: "@yourhandle", // TODO if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export default function Page() {
  const totalTools = toolCategories.reduce(
    (sum, cat) => sum + cat.children.length,
    0
  );

  // WebSite schema — enables sitelinks search box eligibility in Google
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Organization schema — helps Google understand the publisher entity
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`, // TODO: add real logo to /public
  };

  // BreadcrumbList for the homepage itself
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  // ItemList of every tool as a SoftwareApplication — structured signal
  // per tool, useful for rich results and topical authority
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} — All Tools`,
    numberOfItems: totalTools,
    itemListElement: toolCategories.flatMap((cat, catIdx) =>
      cat.children.map((child, childIdx) => ({
        "@type": "ListItem",
        position: catIdx * 100 + childIdx + 1,
        item: {
          "@type": "SoftwareApplication",
          name: child.name,
          applicationCategory: cat.name,
          url: `${SITE_URL}${child.path}`,
          operatingSystem: "Any (Web-based)",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      }))
    ),
  };

  // FAQPage schema — swap in your real FAQ copy if you add a visible
  // FAQ section; Google requires the content to also be visible on-page
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is The Toolbox free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every tool on The Toolbox is free, runs in your browser, and requires no signup.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account or signup is required to use any tool on The Toolbox.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}