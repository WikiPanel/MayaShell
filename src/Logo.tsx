import { cx } from "./links.js";

export interface LogoProps {
  /** Light colours, for a night surface such as the footer. */
  night?: boolean | undefined;
  className?: string | undefined;
}

/**
 * The mark and the «MayaVPN» wordmark. Vazirmatn's line box is sized for
 * Persian, so its Latin capitals sit 0.125em above the middle of the line;
 * `top-[0.125em]` centres them on the mark.
 */
export function Logo({ night = false, className }: LogoProps) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-9 shrink-0">
        <rect width="32" height="32" rx="10" className="fill-shell-accent" />
        <path
          d="M10.8 20.05V11.95l5.2 5.2 5.2-5.2v8.1"
          fill="none"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-shell-on-accent"
        />
      </svg>
      <span
        dir="ltr"
        className={cx(
          "relative top-[0.125em] text-shell-xl font-extrabold tracking-tight",
          night ? "text-shell-on-night" : "text-shell-ink",
        )}
      >
        Maya
        <span
          className={night ? "text-shell-accent-on-night" : "text-shell-accent"}
        >
          VPN
        </span>
      </span>
    </span>
  );
}
