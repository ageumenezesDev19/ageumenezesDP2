import { useEffect, useRef } from "react";

const FILE_NAME = "Ageu-Menezes-Resume.pdf";
const MIME = "application/pdf";

/** Can this browser share an actual PDF file (iOS Safari, Android Chrome)? */
function canSharePdf() {
  if (typeof navigator === "undefined" || !navigator.canShare) return false;
  try {
    const probe = new File([""], FILE_NAME, { type: MIME });
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
 * Desktop browsers fall through to the anchor's normal download behaviour.
 */
export function useResumeShare(resumeUrl: string) {
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    if (!canSharePdf()) return;

    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(resumeUrl);
        if (!response.ok) return;
        const blob = await response.blob();
        if (!cancelled) fileRef.current = new File([blob], FILE_NAME, { type: MIME });
      } catch {
        // Leave fileRef empty: the link still works as a normal download.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resumeUrl]);

  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    const file = fileRef.current;
    if (!file || !navigator.canShare?.({ files: [file] })) return;

    event.preventDefault();
    // `files` must be the only key here — iOS refuses the share otherwise.
    navigator.share({ files: [file] }).catch((error: unknown) => {
      const name = (error as { name?: string })?.name;
      if (name === "AbortError" || name === "NotAllowedError") return; // user dismissed
      window.location.href = resumeUrl; // last resort: let the browser handle it
    });
  };
}
