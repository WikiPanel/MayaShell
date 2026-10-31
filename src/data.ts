// The site's links and contact details as data, so a page can pass changed
// copies to the header and footer or show them its own way. Every site
// address is relative, so each mirror domain keeps its visitors.

export interface ShellLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: readonly ShellLink[];
}

/** The header's main button: buying on the site, the customer panel in the shop. */
export interface HeaderAction {
  label: string;
  href: string;
  icon?: "bag" | "user";
}

/** Contact links in the footer; one that is empty or missing is left out. */
export interface Contacts {
  telegram?: string;
  email?: string;
  instagram?: string;
}

export const mainNav: readonly ShellLink[] = [
  { label: "خانه", href: "/" },
  { label: "سرویس‌ها", href: "/services/" },
  { label: "راهنمای اتصال", href: "/guides/" },
  { label: "سوالات متداول", href: "/faq/" },
  { label: "پشتیبانی", href: "/support/" },
];

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "سرویس‌ها",
    links: [
      { label: "اشتراک اکو", href: "/services/eco/" },
      { label: "اشتراک پلاس", href: "/services/plus/" },
      { label: "اشتراک پرمیوم", href: "/services/premium/" },
      { label: "مقایسه سرویس‌ها", href: "/services/" },
    ],
  },
  {
    title: "راهنمای اتصال",
    links: [
      { label: "اندروید", href: "/guides/android/" },
      { label: "آیفون و آیپد", href: "/guides/ios/" },
      { label: "ویندوز", href: "/guides/windows/" },
      { label: "مک", href: "/guides/macos/" },
      { label: "اندروید تی‌وی", href: "/guides/android-tv/" },
      { label: "لینوکس", href: "/guides/linux/" },
    ],
  },
  {
    title: "مایا",
    links: [
      { label: "درباره ما", href: "/about/" },
      { label: "سوالات متداول", href: "/faq/" },
      { label: "پشتیبانی", href: "/support/" },
      { label: "حریم خصوصی", href: "/privacy/" },
      { label: "قوانین و مقررات", href: "/terms/" },
    ],
  },
];

export const contacts: Contacts = {
  telegram: "https://t.me/MayaVPNSupportBot",
  email: "mayavpn.sup@gmail.com",
};

export const tagline =
  "اتصال امن، سریع و پایدار روی همه دستگاه‌ها؛ با تحویل آنی، کاربر نامحدود و پشتیبانی آنلاین.";

/** The site's main button, the default. */
export const shopAction: HeaderAction = {
  label: "خرید اشتراک",
  href: "/shop/",
  icon: "bag",
};

/** The shop's main button. */
export const panelAction: HeaderAction = {
  label: "پنل کاربری",
  href: "/shop/me",
  icon: "user",
};
