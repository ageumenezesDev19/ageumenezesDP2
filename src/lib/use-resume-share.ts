import { useEffect, useRef } from "react";

const MIME = "application/pdf";

/**
 * macOS Safari implements the file share sheet too, so `canShare` alone sent
 * desktop users a "share this PDF" prompt when they had asked to download one.
 */
function isAppleTouchDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ claims to be a Mac; the touch points give it away.
  return /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/** Can this browser share an actual PDF file, and does it need to? */
function canSharePdf(fileName: string) {
  if (!isAppleTouchDevice() || !navigator.canShare) return false;
  try {
    const probe = new File([""], fileName, { type: MIME });
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}

/**
 * On iOS the `download` attribute is ignored — Safari just previews the PDF.
 * The native share sheet ("Save to Files") is reachable through the Web Share
 * API, but only if `share()` runs inside the click's transient activation:
 * awaiting a fetch first makes Safari throw NotAllowedError. So the file is
 * fetched ahead of time and the click handler stays synchronous.
 *
 * Everywhere else the anchor's own `download` already does the right thing.
 */
export function useResumeShare(resume: { url: string; fileName: string }) {
  const { url, fileName } = resume;
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    fileRef.current = null; // language changed: the cached file is the wrong one
    if (!canSharePdf(fileName)) return;

    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const blob = await response.blob();
        if (!cancelled) fileRef.current = new File([blob], fileName, { type: MIME });
      } catch {
        // Leave fileRef empty: the link still works as a normal download.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, fileName]);

  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    const file = fileRef.current;
    if (!file || !navigator.canShare?.({ files: [file] })) return;

    event.preventDefault();
    // `files` must be the only key here — iOS refuses the share otherwise.
    navigator.share({ files: [file] }).catch((error: unknown) => {
      const name = (error as { name?: string })?.name;
      if (name === "AbortError" || name === "NotAllowedError") return; // user dismissed
      window.location.href = url; // last resort: let the browser handle it
    });
  };
}
