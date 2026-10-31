import type { ComponentType, ReactNode } from "react";

/** What the shell passes to a link component. */
export interface LinkProps {
  href: string;
  className?: string | undefined;
  children?: ReactNode;
  "aria-current"?: "page" | undefined;
  "aria-label"?: string | undefined;
}

/**
 * Draws every link of the header and footer. The shop passes one that opens
 * its own pages without a reload and leaves the site's pages to a plain link.
 */
export type LinkComponent = ComponentType<LinkProps>;

const external = (href: string) => /^https?:\/\//.test(href);

/** A plain `<a>`; an address on another host opens with rel="noopener". */
export function PlainLink({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} rel={external(href) ? "noopener" : undefined} {...rest}>
      {children}
    </a>
  );
}

/** How the «پشتیبانی آنلاین» controls open support. */
export interface SupportControl {
  /** The support page, "/support/" by default. */
  href?: string | undefined;
  /** Opens the chat instead: the control becomes a button. */
  onSupport?: (() => void) | undefined;
  /** Data attributes for the link, such as the site's data-support-chat. */
  attributes?: Readonly<Record<`data-${string}`, string>> | undefined;
}

export function SupportTrigger({
  support,
  className,
  children,
}: {
  support: SupportControl;
  className: string;
  children: ReactNode;
}) {
  if (support.onSupport) {
    return (
      <button type="button" className={className} onClick={support.onSupport}>
        {children}
      </button>
    );
  }
  const href = support.href ?? "/support/";
  return (
    <a
      href={href}
      className={className}
      rel={external(href) ? "noopener" : undefined}
      {...support.attributes}
    >
      {children}
    </a>
  );
}

/** Joins class names, leaving out the empty ones. */
export function cx(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
