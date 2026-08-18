#!/usr/bin/env node
/**
 * Prints every docs/resume*.html to the matching public/*.pdf with headless
 * Chrome, so editing the HTML is the only step needed to refresh a resume.
 *
 * Chrome rather than a PDF library because the layouts are plain CSS and the
 * whole point of resume-ats.html is that Chrome's text output survives an ATS
 * parser — a different renderer would need re-verifying from scratch.
 *
 *   npm run resume
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const RESUMES = [
  ["docs/resume.html", "public/resume.pdf"],
  ["docs/resume-pt.html", "public/resume-pt.pdf"],
  ["docs/resume-ats.html", "public/resume-ats.pdf"],
];

const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!chrome) {
  console.error("No Chrome-based browser found. Looked in:");
  CHROME_CANDIDATES.forEach((path) => console.error(`  ${path}`));
  process.exit(1);
}

let failed = false;

for (const [source, target] of RESUMES) {
  const sourcePath = resolve(root, source);
  if (!existsSync(sourcePath)) {
    console.warn(`skip  ${source} (not found)`);
    continue;
  }

  try {
    execFileSync(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${resolve(root, target)}`,
        `file://${sourcePath}`,
      ],
      { stdio: "ignore" },
    );
    console.log(`ok    ${source} -> ${target}`);
  } catch {
    console.error(`fail  ${source}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
