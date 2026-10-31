import {
  contacts as defaultContacts,
  footerColumns,
  shopAction,
  tagline as defaultTagline,
  type Contacts,
  type FooterColumn,
  type HeaderAction,
} from "./data.js";
import { jalaliYear } from "./format.js";
import { CameraIcon, HeadphonesIcon, MailIcon, SendIcon } from "./icons.js";
import {
  PlainLink,
  SupportTrigger,
  type LinkComponent,
  type SupportControl,
} from "./links.js";
import { Logo } from "./Logo.js";

export interface SiteFooterProps {
  columns?: readonly FooterColumn[] | undefined;
  contacts?: Contacts | undefined;
  tagline?: string | undefined;
  homeHref?: string | undefined;
  /** The footer's main button, shown from sm up; null leaves it out. */
  action?: HeaderAction | null | undefined;
  support?: SupportControl | undefined;
  linkComponent?: LinkComponent | undefined;
  /** The copyright year; the current Jalali year by default. */
  year?: string | undefined;
}

const iconLink =
  "flex size-10 items-center justify-center rounded-xl border border-shell-night-border hover:bg-shell-night-raised hover:text-shell-on-night";

/**
 * The site's footer: the logo and tagline, three link columns that stay side
 * by side on phones, and the contact links. Its two buttons show from sm up;
 * on phones the header's button and the chat bubble offer both.
 */
export function SiteFooter({
  columns = footerColumns,
  contacts = defaultContacts,
  tagline = defaultTagline,
  homeHref = "/",
  action = shopAction,
  support = {},
  linkComponent: Link = PlainLink,
  year = jalaliYear(),
}: SiteFooterProps) {
  const { telegram, email, instagram } = contacts;

  return (
    <footer className="bg-shell-night text-shell-on-night-secondary">
      <div className="mx-auto grid w-full max-w-[74rem] gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Link href={homeHref} className="inline-block">
            <Logo night />
            <span className="sr-only">، صفحه اصلی</span>
          </Link>
          <p className="mt-4 text-[0.95rem] leading-8 text-shell-on-night-muted">
            {tagline}
          </p>
          <div className="mt-5 hidden flex-wrap gap-3 sm:flex">
            {action && (
              <Link
                href={action.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-shell-on-night px-5 text-[0.95rem] font-bold whitespace-nowrap text-shell-night transition-colors duration-200 hover:bg-shell-accent-soft"
              >
                {action.label}
              </Link>
            )}
            <SupportTrigger
              support={support}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-shell-night-border px-5 text-[0.95rem] font-bold whitespace-nowrap text-shell-on-night transition-colors duration-200 hover:bg-shell-night-raised"
            >
              <HeadphonesIcon size={18} />
              پشتیبانی آنلاین
            </SupportTrigger>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-8">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-bold text-shell-on-night sm:text-base">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-1 text-sm sm:mt-4 sm:space-y-1.5 sm:text-[0.95rem]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 hover:text-shell-on-night"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-shell-night-border">
        <div className="mx-auto flex w-full max-w-[74rem] flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-shell-on-night-muted sm:flex-row sm:px-6">
          <p>{`© ${year} مایا وی‌پی‌ان. همه حقوق محفوظ است.`}</p>
          {(telegram || instagram || email) && (
            <ul className="flex items-center gap-2">
              {telegram && (
                <li>
                  <a
                    href={telegram}
                    rel="noopener"
                    aria-label="پشتیبانی در تلگرام"
                    className={iconLink}
                  >
                    <SendIcon size={18} />
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    rel="noopener"
                    aria-label="اینستاگرام مایا"
                    className={iconLink}
                  >
                    <CameraIcon size={18} />
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    aria-label="ایمیل پشتیبانی"
                    className={iconLink}
                  >
                    <MailIcon size={18} />
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
