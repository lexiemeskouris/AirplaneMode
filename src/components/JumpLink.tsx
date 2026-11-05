import { useEffect, useState, type ReactNode } from "react";
import { jumpTo } from "@/lib/anchors";

/**
 * A tag, highlight or contents chip that scrolls to its part of the page.
 * With nothing to point at it renders as plain text, so a tag with no match
 * still shows, it just does not pretend to be a link.
 */
export function JumpLink({
  to,
  className,
  linkClassName,
  children,
}: {
  to?: string | undefined;
  className: string;
  linkClassName?: string | undefined;
  children: ReactNode;
}) {
  if (!to) return <span className={className}>{children}</span>;
  return (
    <a
      href={`#${to}`}
      onClick={(e) => jumpTo(e, to)}
      className={`${className} ${linkClassName ?? ""} cursor-pointer`}
    >
      {children}
    </a>
  );
}

/** Appears once you are a screen down, and takes you back to the tags. */
export function BackToTop() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }}
      className={`fixed bottom-5 right-5 z-40 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-lg transition-all ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      &uarr; Top
    </button>
  );
}
