import {
  mainNav,
  shopAction,
  type HeaderAction,
  type ShellLink,
} from "./data.js";
import {
  CloseIcon,
  HeadphonesIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserIcon,
} from "./icons.js";
import {
  PlainLink,
  SupportTrigger,
  type LinkComponent,
  type SupportControl,
} from "./links.js";
import { Logo } from "./Logo.js";

export interface SiteHeaderProps {
  /** The page's path, to mark the menu item it belongs to. */
  currentPath?: string | undefined;
  nav?: readonly ShellLink[] | undefined;
  homeHref?: string | undefined;
  /** The main button: «خرید اشتراک» by default, «پنل کاربری» in the shop. */
  action?: HeaderAction | undefined;
  support?: SupportControl | undefined;
  linkComponent?: LinkComponent | undefined;
}

const actionIcons = { bag: ShoppingBagIcon, user: UserIcon };

/**
 * The site's header. The menu shows from tablet width up; up to lg it is
 * compact and the support control gives way (the menu has «پشتیبانی»), and up
 * to xl that control shows only its icon. Phones get a menu button: a
 * <details>, so it works without JavaScript.
 */
export function SiteHeader({
  currentPath = "",
  nav = mainNav,
  homeHref = "/",
  action = shopAction,
  support = {},
  linkComponent: Link = PlainLink,
}: SiteHeaderProps) {
  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  const ActionIcon = actionIcons[action.icon ?? "bag"];

  return (
    <header className="sticky top-0 z-40 border-b border-shell-surface-border/80 bg-shell-page/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-[74rem] items-center gap-3 px-4 sm:px-6 lg:gap-6">
        <Link href={homeHref} className="shrink-0">
          <Logo />
          <span className="sr-only">، صفحه اصلی</span>
        </Link>

        <nav aria-label="منوی اصلی" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-shell-xl px-2 py-2 text-shell-sm font-medium whitespace-nowrap text-shell-ink-secondary transition-colors hover:bg-shell-accent-subtle hover:text-shell-accent aria-[current=page]:bg-shell-accent-soft aria-[current=page]:font-bold aria-[current=page]:text-shell-accent-strong lg:px-3.5 lg:text-[0.95rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <SupportTrigger
            support={support}
            className="hidden min-h-11 cursor-pointer items-center gap-2 rounded-shell-xl px-3 font-medium whitespace-nowrap text-shell-ink-secondary hover:text-shell-accent sm:inline-flex md:hidden lg:inline-flex"
          >
            <HeadphonesIcon size={19} />
            <span className="lg:max-xl:sr-only">پشتیبانی آنلاین</span>
          </SupportTrigger>
          <Link
            href={action.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-shell-2xl bg-shell-accent px-4 max-[370px]:px-3 text-[0.95rem] font-bold whitespace-nowrap text-shell-on-accent shadow-shell-cta transition-colors duration-200 hover:bg-shell-accent-hover lg:px-5"
          >
            <ActionIcon size={18} className="max-[370px]:hidden" />
            {action.label}
          </Link>

          <details className="group relative md:hidden">
            <summary
              aria-label="منو"
              className="flex size-11 cursor-pointer list-none items-center justify-center rounded-shell-xl border border-shell-surface-border bg-shell-surface text-shell-ink [&::-webkit-details-marker]:hidden"
            >
              <span className="group-open:hidden">
                <MenuIcon size={22} />
              </span>
              <span className="hidden group-open:block">
                <CloseIcon size={22} />
              </span>
            </summary>
            <nav
              aria-label="منوی موبایل"
              className="absolute end-0 top-14 w-64 rounded-shell-3xl border border-shell-surface-border bg-shell-surface p-2 shadow-shell-raised"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex min-h-12 items-center rounded-shell-2xl px-4 font-medium text-shell-ink-secondary hover:bg-shell-accent-subtle aria-[current=page]:bg-shell-accent-soft aria-[current=page]:font-bold aria-[current=page]:text-shell-accent-strong"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-shell-surface-border pt-1 sm:hidden">
                  <SupportTrigger
                    support={support}
                    className="flex min-h-12 w-full cursor-pointer items-center gap-2 rounded-shell-2xl px-4 font-medium text-shell-accent hover:bg-shell-accent-subtle"
                  >
                    <HeadphonesIcon size={19} />
                    پشتیبانی آنلاین
                  </SupportTrigger>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
