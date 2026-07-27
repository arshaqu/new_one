"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ---- Line-level diff (LCS) ----
// Same core approach version control systems like Git use to show
// what changed in a file.
function diffLines(original, modified) {
  const a = original.split("\n");
  const b = modified.split("\n");
  const m = a.length;
  const n = b.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (a[i] === b[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < m && j < n) {
    if (a[i] === b[j]) {
      result.push({ type: "unchanged", left: a[i], right: b[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "removed", left: a[i], right: null });
      i++;
    } else {
      result.push({ type: "added", left: null, right: b[j] });
      j++;
    }
  }

  while (i < m) {
    result.push({ type: "removed", left: a[i], right: null });
    i++;
  }

  while (j < n) {
    result.push({ type: "added", left: null, right: b[j] });
    j++;
  }

  return result;
}

// ---- Word-level diff (LCS over tokens) ----
// Used to highlight exactly which words changed inside a modified line.
function tokenize(str) {
  return str.split(/(\s+)/).filter((t) => t.length > 0);
}

function diffWords(a, b) {
  const aw = tokenize(a);
  const bw = tokenize(b);
  const m = aw.length;
  const n = bw.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (aw[i] === bw[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const left = [];
  const right = [];
  let i = 0;
  let j = 0;

  while (i < m && j < n) {
    if (aw[i] === bw[j]) {
      left.push({ text: aw[i], changed: false });
      right.push({ text: bw[j], changed: false });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      left.push({ text: aw[i], changed: true });
      i++;
    } else {
      right.push({ text: bw[j], changed: true });
      j++;
    }
  }

  while (i < m) {
    left.push({ text: aw[i], changed: true });
    i++;
  }

  while (j < n) {
    right.push({ text: bw[j], changed: true });
    j++;
  }

  return { left, right };
}

// ---- Build display rows ----
// Groups adjacent removed/added line blocks into "modified" pairs so
// changed lines can be word-diffed and aligned side by side, the way
// most diff tools present an edited line rather than a delete+insert.
function buildRows(original, modified) {
  const lineDiff = diffLines(original, modified);
  const rows = [];

  let leftNum = 0;
  let rightNum = 0;
  let i = 0;

  while (i < lineDiff.length) {
    const item = lineDiff[i];

    if (item.type === "unchanged") {
      leftNum++;
      rightNum++;
      rows.push({
        type: "unchanged",
        leftNum,
        rightNum,
        leftText: item.left,
        rightText: item.right,
      });
      i++;
      continue;
    }

    const removedBlock = [];
    while (i < lineDiff.length && lineDiff[i].type === "removed") {
      removedBlock.push(lineDiff[i].left);
      i++;
    }

    const addedBlock = [];
    while (i < lineDiff.length && lineDiff[i].type === "added") {
      addedBlock.push(lineDiff[i].right);
      i++;
    }

    const pairCount = Math.min(removedBlock.length, addedBlock.length);

    for (let p = 0; p < pairCount; p++) {
      leftNum++;
      rightNum++;
      rows.push({
        type: "modified",
        leftNum,
        rightNum,
        leftText: removedBlock[p],
        rightText: addedBlock[p],
        wordDiff: diffWords(removedBlock[p], addedBlock[p]),
      });
    }

    for (let p = pairCount; p < removedBlock.length; p++) {
      leftNum++;
      rows.push({
        type: "removed",
        leftNum,
        rightNum: null,
        leftText: removedBlock[p],
        rightText: null,
      });
    }

    for (let p = pairCount; p < addedBlock.length; p++) {
      rightNum++;
      rows.push({
        type: "added",
        leftNum: null,
        rightNum,
        leftText: null,
        rightText: addedBlock[p],
      });
    }
  }

  return rows;
}

const RED_BG = "rgba(239,68,68,0.14)";
const RED_WORD_BG = "rgba(239,68,68,0.45)";
const GREEN_BG = "rgba(34,197,94,0.14)";
const GREEN_WORD_BG = "rgba(34,197,94,0.45)";

function WordSpans({ tokens, color }) {
  return tokens.map((t, idx) =>
    t.changed ? (
      <span
        key={idx}
        style={{
          background: color === "red" ? RED_WORD_BG : GREEN_WORD_BG,
          borderRadius: 3,
          padding: "1px 0",
        }}
      >
        {t.text}
      </span>
    ) : (
      <span key={idx}>{t.text}</span>
    )
  );
}

export default function TextDiffCheckerPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [view, setView] = useState("Split");
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => {
    if (!original.trim() && !modified.trim()) return [];
    return buildRows(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    rows.forEach((row) => {
      if (row.type === "unchanged") unchanged++;
      if (row.type === "removed") removed++;
      if (row.type === "added") added++;
      if (row.type === "modified") {
        added++;
        removed++;
      }
    });

    return { added, removed, unchanged };
  }, [rows]);

  function copyDiff() {
    const lines = [];

    rows.forEach((row) => {
      if (row.type === "unchanged") lines.push(`  ${row.leftText}`);
      if (row.type === "removed") lines.push(`- ${row.leftText}`);
      if (row.type === "added") lines.push(`+ ${row.rightText}`);
      if (row.type === "modified") {
        lines.push(`- ${row.leftText}`);
        lines.push(`+ ${row.rightText}`);
      }
    });

    navigator.clipboard.writeText(lines.join("\n"));

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div
      className="min-h-screen py-8 px-5"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-xs text-muted">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>

          {" / "}

          <span>Text</span>

          {" / "}

          <span>Text Diff Checker</span>
        </div>

        <h1 className="text-3xl font-bold mt-4">Text Diff Checker</h1>

        <p className="text-muted mt-2 text-xs">
          Compare two texts side by side and see exactly what changed. Lines
          added, removed and unchanged are highlighted clearly.
        </p>

        <div className="mt-5 bg-card border rounded-xl p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Original</label>

              <textarea
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="Paste the original text…"
                className="w-full mt-3 bg-input rounded-lg p-3 text-sm min-h-[140px] outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Modified</label>

              <textarea
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                placeholder="Paste the modified text…"
                className="w-full mt-3 bg-input rounded-lg p-3 text-sm min-h-[140px] outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
            <div className="flex gap-4 text-xs">
              <span className="text-green-500 font-semibold">
                + {stats.added} added
              </span>

              <span className="text-red-500 font-semibold">
                - {stats.removed} removed
              </span>

              <span className="text-muted font-semibold">
                {stats.unchanged} unchanged
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-input rounded-lg p-1 flex text-xs">
                {["Split", "Unified"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setView(item)}
                    className="px-3 py-1.5 rounded-md"
                    style={{
                      background:
                        view === item ? "var(--card)" : "transparent",
                      fontWeight: view === item ? 600 : 400,
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={copyDiff}
                disabled={rows.length === 0}
                className="bg-input px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50"
              >
                {copied ? "Copied" : "Copy diff"}
              </button>
            </div>
          </div>

          {rows.length > 0 ? (
            view === "Split" ? (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <div className="grid sm:grid-cols-2 text-xs font-semibold text-muted bg-input px-3 py-2">
                  <span>Original</span>
                  <span className="pl-3">Modified</span>
                </div>

                <div className="grid sm:grid-cols-2">
                  <div className="border-r">
                    {rows.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex text-xs font-mono"
                        style={{
                          background:
                            row.type === "removed" || row.type === "modified"
                              ? RED_BG
                              : "transparent",
                        }}
                      >
                        <span className="w-8 shrink-0 text-right pr-2 py-1 text-muted select-none">
                          {row.leftNum ?? ""}
                        </span>

                        <span className="pr-3 py-1 whitespace-pre-wrap break-words">
                          {row.type === "removed" && "- "}
                          {row.type === "modified" && "- "}
                          {row.type === "modified" ? (
                            <WordSpans
                              tokens={row.wordDiff.left}
                              color="red"
                            />
                          ) : (
                            row.leftText
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    {rows.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex text-xs font-mono"
                        style={{
                          background:
                            row.type === "added" || row.type === "modified"
                              ? GREEN_BG
                              : "transparent",
                        }}
                      >
                        <span className="w-8 shrink-0 text-right pr-2 py-1 text-muted select-none">
                          {row.rightNum ?? ""}
                        </span>

                        <span className="pr-3 py-1 whitespace-pre-wrap break-words">
                          {row.type === "added" && "+ "}
                          {row.type === "modified" && "+ "}
                          {row.type === "modified" ? (
                            <WordSpans
                              tokens={row.wordDiff.right}
                              color="green"
                            />
                          ) : (
                            row.rightText
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 border rounded-lg overflow-hidden">
                {rows.map((row, idx) => (
                  <div key={idx}>
                    {(row.type === "removed" || row.type === "modified") && (
                      <div
                        className="flex text-xs font-mono"
                        style={{ background: RED_BG }}
                      >
                        <span className="w-8 shrink-0 text-right pr-2 py-1 text-muted select-none">
                          {row.leftNum}
                        </span>
                        <span className="pr-3 py-1 whitespace-pre-wrap break-words">
                          {"- "}
                          {row.type === "modified" ? (
                            <WordSpans
                              tokens={row.wordDiff.left}
                              color="red"
                            />
                          ) : (
                            row.leftText
                          )}
                        </span>
                      </div>
                    )}

                    {(row.type === "added" || row.type === "modified") && (
                      <div
                        className="flex text-xs font-mono"
                        style={{ background: GREEN_BG }}
                      >
                        <span className="w-8 shrink-0 text-right pr-2 py-1 text-muted select-none">
                          {row.rightNum}
                        </span>
                        <span className="pr-3 py-1 whitespace-pre-wrap break-words">
                          {"+ "}
                          {row.type === "modified" ? (
                            <WordSpans
                              tokens={row.wordDiff.right}
                              color="green"
                            />
                          ) : (
                            row.rightText
                          )}
                        </span>
                      </div>
                    )}

                    {row.type === "unchanged" && (
                      <div className="flex text-xs font-mono">
                        <span className="w-8 shrink-0 text-right pr-2 py-1 text-muted select-none">
                          {row.leftNum}
                        </span>
                        <span className="pr-3 py-1 whitespace-pre-wrap break-words">
                          {"  "}
                          {row.leftText}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="mt-4 text-center text-muted text-xs">
              Paste text on both sides to see the diff
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">How to Use</h2>

          <div className="mt-3 space-y-3 text-xs text-muted">
            <p>
              <b>1</b> Paste original text
            </p>
            <p className="ml-4">
              Add the original version of your text in the left box.
            </p>

            <p>
              <b>2</b> Paste modified text
            </p>
            <p className="ml-4">
              Add the updated version in the right box.
            </p>

            <p>
              <b>3</b> View the diff
            </p>
            <p className="ml-4">
              Changed lines and words are highlighted — red for removed,
              green for added.
            </p>

            <p>
              <b>4</b> Toggle view or copy
            </p>
            <p className="ml-4">
              Switch between split and unified view, or copy the diff as
              text.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">How It Works</h2>

          <p className="mt-2 text-xs text-muted leading-6">
            This tool compares two blocks of text line by line and
            highlights exactly what was added, removed, or unchanged
            between them — the same core technique version control systems
            like Git use to show what changed in a file. Within a changed
            line, it goes a level deeper and diffs the individual words so
            you can see precisely which part of the line was edited.
          </p>

          <h3 className="font-semibold text-sm mt-4">
            The Longest Common Subsequence approach
          </h3>

          <p className="mt-2 text-xs text-muted leading-6">
            Rather than naively comparing text line-by-line in fixed
            positions (which breaks the moment a single line is inserted or
            deleted, shifting everything after it), the diff algorithm
            finds the longest sequence of lines common to both texts, then
            reports everything else as an addition or deletion relative to
            that shared backbone — the same method Git and most diff tools
            use under the hood.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">Examples</h2>

          <div className="mt-3 space-y-4 text-xs text-muted">
            <div>
              <p className="font-semibold text-sm text-foreground">
                Comparing two drafts
              </p>
              <p className="mt-1 leading-6">
                Pasting an original paragraph and a revised version
                instantly highlights exactly which sentences were changed,
                added, or removed — without manually re-reading both
                versions side by side.
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm text-foreground">
                Checking a config file change
              </p>
              <p className="mt-1 leading-6">
                Comparing an old and new configuration file quickly reveals
                which specific lines changed, even if unrelated lines
                shifted position due to additions elsewhere in the file.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">Common Use Cases</h2>

          <ul className="mt-3 space-y-2 text-xs text-muted list-disc pl-4">
            <li>
              Comparing two versions of a document, contract, or article to
              spot exactly what changed
            </li>
            <li>
              Checking configuration or code file differences without a
              full version control setup
            </li>
            <li>
              Reviewing edits from a collaborator or editor to see
              precisely what they changed
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">Tips</h2>

          <ul className="mt-3 space-y-2 text-xs text-muted list-disc pl-4">
            <li>
              For very large files (1000+ lines), the comparison may run
              slightly slower since the underlying algorithm's complexity
              grows with input size — for huge files, consider comparing
              in smaller sections.
            </li>
            <li>
              The diff is line-based first, then word-based within changed
              lines — if two lines are entirely different rather than a
              small edit, they'll show as a straight removal and addition
              instead of word highlights.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}