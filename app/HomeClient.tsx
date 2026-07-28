"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toolCategories } from "./data/tools";
import search from "../assets/search.png";
import banner from "../assets/banner1.png";
import Image from "next/image";

// Accent colors stay fixed across light/dark — they're decoration, not
// surface/text colors, so they don't need to come from theme variables.
const DRAWER_ACCENTS = ["#FFB300", "#2BB3A3", "#FF6B4A", "#7C9CFF", "#E85D9E"];

// Colors the "Open" button cycles through.
const OPEN_BTN_COLORS = ["#FFB300", "#2BB3A3", "#FF6B4A", "#7C9CFF", "#E85D9E"];

// Placeholder news/updates feed for the right rail.
const NEWS_ITEMS = [
  {
    tag: "NEW",
    accent: "#2BB3A3",
    title: "Batch image resize",
    blurb: "Resize dozens of images at once, right in the browser.",
  },
  {
    tag: "UPDATE",
    accent: "#7C9CFF",
    title: "Faster PDF merge",
    blurb: "Merging large PDFs is now roughly 3x quicker.",
  },
  {
    tag: "NEW",
    accent: "#FF6B4A",
    title: "JSON formatter",
    blurb: "Paste messy JSON, get it validated and pretty-printed.",
  },
  {
    tag: "TIP",
    accent: "#FFB300",
    title: "Keyboard shortcuts",
    blurb: "Press \"/\" anywhere to jump straight to a tool.",
  },
  {
    tag: "UPDATE",
    accent: "#E85D9E",
    title: "Dark mode polish",
    blurb: "Cleaner contrast across every tool page in dark mode.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

export default function HomeClient() {
  const [active, setActive] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const allTools = useMemo(
    () =>
      toolCategories.flatMap((cat, catIndex) =>
        cat.children.map((child) => ({
          ...child,
          categoryName: cat.name,
          accent: DRAWER_ACCENTS[catIndex % DRAWER_ACCENTS.length],
        }))
      ),
    []
  );

  // Derive the tool shape once, from allTools itself, so featured/searchResults/
  // activeTools all share one consistent type instead of inferring `never[]`.
  type Tool = (typeof allTools)[number];

  // Client-only shuffle to avoid the server/client hydration mismatch.
  const [featured, setFeatured] = useState<Tool[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFeatured(shuffle(allTools).slice(0, 8));
    setMounted(true);
  }, [allTools]);

  // JS-driven color cycle for the "Open" buttons. This runs on a plain
  // setInterval and sets inline style directly, so it can't be silently
  // suppressed by prefers-reduced-motion, a stray !important in global
  // CSS, or any specificity fight — it always wins because it's applied
  // last, straight to the DOM via React on every tick.
  const [blinkIndex, setBlinkIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBlinkIndex((i) => (i + 1) % OPEN_BTN_COLORS.length);
    }, 700);
    return () => clearInterval(id);
  }, []);

  const totalTools = allTools.length;

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = trimmedQuery.toLowerCase();
    return allTools.filter((tool) => tool.name.toLowerCase().includes(q));
  }, [allTools, trimmedQuery, isSearching]);

  const activeTools =
    active !== null
      ? toolCategories[active].children.map((child) => ({
          ...child,
          categoryName: toolCategories[active].name,
          accent: DRAWER_ACCENTS[active % DRAWER_ACCENTS.length],
        }))
      : [];

  const gridTools = isSearching
    ? searchResults
    : active !== null
    ? activeTools
    : featured;

  const headline = isSearching
    ? `Results for "${trimmedQuery}"`
    : active !== null
    ? toolCategories[active].name
    : "From the bench";

  const subhead = isSearching
    ? `${searchResults.length} tool${searchResults.length === 1 ? "" : "s"} matched`
    : active !== null
    ? `${activeTools.length} tool${activeTools.length === 1 ? "" : "s"} in this drawer`
    : "A shuffle of tools worth trying first";

  return (
    <div
      className="min-h-screen font-[Inter,sans-serif]"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .tb-grid-bg {
          background-image:
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .tb-card {
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .tb-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -10px rgba(0,0,0,0.25);
        }
        .tb-tab { transition: color 0.15s ease; }
        .tb-tab:hover { color: #FFB300; }
        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 2px solid #FFB300;
          outline-offset: 2px;
        }
        .tb-open-btn {
          border: 1px solid rgba(255,255,255,0.3);
          transition: background-color 0.5s ease, box-shadow 0.5s ease, transform 0.2s ease;
        }
        .tb-open-btn:hover {
          transform: scale(1.08);
        }
        .tb-open-btn:active { transform: scale(0.95); }

        /* Softer pulse for category/nav buttons — a border glow, not a shadow ring,
           so a whole list of them doesn't look chaotic */
        @keyframes tb-pulse-soft {
          0%, 100% { border-color: var(--tb-pulse-color, rgba(255,179,0,0.15)); }
          50% { border-color: var(--tb-pulse-color, rgba(255,179,0,0.55)); }
        }
        .tb-pulse-soft {
          border-width: 1px;
          border-style: solid;
          animation: tb-pulse-soft 2.6s ease-in-out infinite;
        }
        .tb-pulse-soft:hover { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .tb-pulse-soft { animation: none; }
        }

        .tb-search-input::placeholder {
          color: var(--muted, #9aa0a6);
          opacity: 0.7;
        }
      `}</style>

      {/* HEADER — smaller badge, headline, subtext, search bar */}
      <header className="px-5 md:px-8 pt-7 pb-5 border-b border-card relative overflow-hidden">
        <div
          className="tb-grid-bg absolute inset-0 pointer-events-none"
          style={{ color: "var(--foreground)", opacity: 0.05 }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div
                className="inline-block px-2 py-0.5 mb-2.5 text-[9px] tracking-[0.16em] uppercase rounded-sm"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: "rgba(255,179,0,0.12)",
                  color: "#FFB300",
                  border: "1px solid rgba(255,179,0,0.35)",
                }}
              >
                {totalTools} tools · no signup
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                The Toolbox
              </h1>
              <p className="mt-1.5 text-[12px] text-muted">
                Fast, free, online tools — organized like drawers, not a search bar.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div
              style={{ border: "1px solid gray", borderRadius: "8px" }}
              className="w-full sm:w-72 md:w-80"
            >
              <div
                className="flex items-center gap-2 rounded-lg border border-card bg-card px-3 py-2"
                style={{ transition: "border-color 0.15s ease" }}
              >
                <Image src={search} alt="" width={15} height={15} />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the tool here ..."
                  className="tb-search-input flex-1 bg-transparent outline-none text-[12.5px]"
                  style={{ color: "var(--foreground)" }}
                  aria-label="Search tools by name"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-muted text-[12px] shrink-0"
                    style={{ cursor: "pointer" }}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BANNER */}
      <div className="">
        <div className="relative w-full overflow-hidden border border-card">
          <Image
            src={banner}
            alt="The Toolbox — browse free online utilities by category"
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-5 md:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* LEFT: DRAWER LIST */}
          <aside
            className="md:col-span-2 min-w-0"
            aria-label="Browse tool categories"
          >
            <nav className="rounded-lg overflow-hidden border border-card bg-card">
              <button
                onClick={() => {
                  setActive(null);
                  setQuery("");
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-[12px] font-medium border-b border-card ${
                  active !== null ? "tb-pulse-soft" : ""
                }`}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: active === null ? "#FFB300" : "var(--foreground)",
                  background:
                    active === null ? "rgba(255,179,0,0.08)" : "transparent",
                  cursor: "pointer",
                }}
                aria-current={active === null ? "true" : undefined}
              >
                <span>▦ All Categories</span>
                <span>{active === null ? "●" : ""}</span>
              </button>

              {toolCategories.map((cat, index) => {
                const accent = DRAWER_ACCENTS[index % DRAWER_ACCENTS.length];
                const isOpen = active === index;
                return (
                  <div key={cat.slug}>
                    <button
                      onClick={() => {
                        setActive(isOpen ? null : index);
                        setQuery("");
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left border-b border-card ${
                        !isOpen ? "tb-pulse-soft" : ""
                      }`}
                      style={
                        {
                          background: isOpen
                            ? "var(--background)"
                            : "transparent",
                          cursor: "pointer",
                          "--tb-pulse-color": isOpen
                            ? undefined
                            : `${accent}55`,
                        } as React.CSSProperties
                      }
                      aria-expanded={isOpen}
                    >
                      <span
                        className="w-1 self-stretch rounded-full shrink-0"
                        style={{ background: accent, opacity: isOpen ? 1 : 0.4 }}
                      />
                      <span className="flex-1 min-w-0">
                        <span
                          className="block text-[8px] tracking-[0.12em]"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: accent,
                          }}
                        >
                          T{String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="block text-[12.5px] mt-0.5 truncate"
                          style={{
                            color: "var(--foreground)",
                            opacity: isOpen ? 1 : 0.85,
                          }}
                        >
                          {cat.name}
                        </span>
                      </span>
                      <span className="text-muted text-[11px]">
                        {isOpen ? "⌃" : "›"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="bg-input">
                        {cat.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block pl-8 pr-3 py-1.5 text-[11px] text-muted hover:text-blue-400"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* CENTER: TOOL GRID */}
          <main className="md:col-span-7 min-w-0">
            {!isSearching && active !== null && (
              <div className="flex items-center gap-4 flex-wrap pb-3 mb-4 border-b border-card">
                {toolCategories[active].children.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className="tb-tab text-[10px] tracking-[0.06em] uppercase whitespace-nowrap text-muted"
                  >
                    {child.name}
                  </Link>
                ))}
                <button
                  onClick={() => setActive(null)}
                  className="tb-pulse-soft ml-auto px-2.5 py-1 rounded text-[10px] shrink-0 text-muted hover:bg-input"
                  style={
                    {
                      cursor: "pointer",
                      "--tb-pulse-color": "rgba(255,179,0,0.4)",
                    } as React.CSSProperties
                  }
                >
                  View all
                </button>
              </div>
            )}

            <div className="flex items-baseline justify-between mb-3">
              <div>
                <h2
                  className="text-base font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {headline}
                </h2>
                <p className="text-[11px] mt-0.5 text-muted">{subhead}</p>
              </div>
            </div>

            {!mounted ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-card bg-card h-[100px] animate-pulse"
                  />
                ))}
              </div>
            ) : gridTools.length === 0 ? (
              <div className="rounded-lg border border-card bg-card p-6 text-center">
                <p className="text-[12.5px] text-muted">
                  No tools match "{trimmedQuery}". Try a different word.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gridTools.map((tool, i) => (
                  <div
                    key={tool.path}
                    className="tb-card rounded-lg p-3.5 border border-card bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[9px] tracking-[0.12em]"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: tool.accent,
                        }}
                      >
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: tool.accent }}
                      />
                    </div>

                    <h3
                      className="font-bold text-[13px]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-[11px] mt-1 text-muted">
                      {tool.categoryName}
                    </p>

                    <Link
                      href={tool.path}
                      className="tb-open-btn inline-flex items-center gap-1 mt-3 px-2.5 py-1.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: OPEN_BTN_COLORS[blinkIndex],
                        color: "#f4f6f9",
                      }}
                    >
                      Explore the Page!!! <span aria-hidden>→</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* RIGHT: NEWS / UPDATES RAIL */}
          <aside className="md:col-span-3 min-w-0" aria-label="Product updates">
            <div className="rounded-lg border border-card bg-card overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-card">
                <h2
                  className="text-[13px] font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  What's new
                </h2>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#2BB3A3" }}
                />
              </div>

              <div>
                {NEWS_ITEMS.map((item, i) => (
                  <div
                    key={item.title}
                    className={`px-3.5 py-3 ${
                      i !== NEWS_ITEMS.length - 1 ? "border-b border-card" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded-sm text-[8px] tracking-[0.1em] uppercase"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: item.accent,
                          background: `${item.accent}1A`,
                          border: `1px solid ${item.accent}40`,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-[12.5px] font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] mt-1 text-muted leading-snug">
                      {item.blurb}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Small filler card under the feed so the rail doesn't feel top-heavy */}
            <div className="rounded-lg border border-card bg-card mt-4 p-3.5">
              <p
                className="text-[10px] tracking-[0.1em] uppercase mb-1.5"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#FFB300",
                }}
              >
                Suggest a tool
              </p>
              <p className="text-[11px] text-muted leading-snug">
                Missing something useful? Let us know and we'll add it to the bench.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}