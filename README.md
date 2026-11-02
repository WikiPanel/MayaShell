# MayaShell

The Maya VPN site's header, footer, logo and theme as one small React
package, `@wikipanel/maya-shell`, so the site
([MayaSite](https://github.com/WikiPanel/MayaSite)) and the shop
(MayaShop) show the same frame. The site renders it to static HTML at build
time; the shop renders it in the browser.

- ESM with TypeScript types, no build step needed by the consumer.
- React 19 as a peer dependency; no other dependency. Icons and the logo are
  inline SVG. About 3 KB gzipped.
- Tailwind CSS v4 classes on its own `shell-*` tokens (`theme.css`), so it
  never collides with the page's theme.
- Touches no browser API on import or render: works with `renderToString`
  and in the browser.
- Right to left, with `header`, `nav` and `footer` landmarks and Persian
  labels. The phone menu is a `<details>`, so it works without JavaScript.

## Install

Every release is a tag (`v1.0.2`) with its `npm pack` file attached to the
GitHub release. No token is needed:

```bash
npm install https://github.com/WikiPanel/MayaShell/releases/download/v1.0.2/wikipanel-maya-shell-1.0.2.tgz
```

The lock file keeps the exact file and its hash. To update, install the next
release's URL. [`CHANGELOG.md`](CHANGELOG.md) lists what each one changes.

## Styles

Import the theme after your own (a later `--color-*: initial` would clear the
shell's colours) and let Tailwind scan the package:

```css
@import "tailwindcss";
@import "./your-theme.css";
@import "@wikipanel/maya-shell/theme.css";
@source "../node_modules/@wikipanel/maya-shell/dist";
```

The `@source` path is relative to the stylesheet. The page loads the Vazirmatn
font itself; the wordmark's position assumes it.

## Use

### The site (Astro, static HTML)

```astro
---
import { SiteHeader, SiteFooter } from "@wikipanel/maya-shell";
---
<SiteHeader
  currentPath={Astro.url.pathname}
  support={{ href: "/support/", attributes: { "data-support-chat": "" } }}
/>
<slot />
<SiteFooter support={{ href: "/support/" }} />
```

Without a `client:` directive Astro sends no JavaScript for them.

### The shop (React SPA)

```tsx
import { Link, useLocation } from "react-router";
import {
  SiteFooter,
  SiteHeader,
  panelAction,
  type LinkProps,
} from "@wikipanel/maya-shell";

// The shop's own pages open without a reload; the site's are full loads.
function ShopLink({ href, ...rest }: LinkProps) {
  return href.startsWith("/shop/") ? (
    <Link to={href.slice("/shop".length)} {...rest} />
  ) : (
    <a href={href} {...rest} />
  );
}

export function Frame({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const support = window.$crisp ? { onSupport: openChat } : {};
  return (
    <>
      <SiteHeader
        key={pathname}
        currentPath={`/shop${pathname}`}
        action={panelAction}
        support={support}
        linkComponent={ShopLink}
      />
      {children}
      <SiteFooter action={null} support={support} linkComponent={ShopLink} />
    </>
  );
}
```

`key={pathname}` closes the phone menu after an in-app navigation. Hiding the
frame inside the Telegram Mini App is the shop's own choice.

## API

### `SiteHeader`

| Prop            | Default      | Meaning                                                                                   |
| --------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `currentPath`   | `""`         | The page's full path; marks its menu item (`/` only on the home page).                    |
| `nav`           | `mainNav`    | The menu items.                                                                           |
| `homeHref`      | `"/"`        | Where the logo goes.                                                                      |
| `action`        | `shopAction` | The main button, `{ label, href, icon: "bag" \| "user" }`. The shop passes `panelAction`. |
| `support`       | `{}`         | `SupportControl`: how «پشتیبانی آنلاین» opens support.                                    |
| `linkComponent` | `PlainLink`  | Draws every link; receives `LinkProps`.                                                   |

### `SiteFooter`

| Prop            | Default             | Meaning                                                    |
| --------------- | ------------------- | ---------------------------------------------------------- |
| `columns`       | `footerColumns`     | The three link columns.                                    |
| `contacts`      | `contacts`          | `{ telegram, email, instagram }`; empty ones are left out. |
| `tagline`       | `tagline`           | The line under the logo.                                   |
| `homeHref`      | `"/"`               | Where the logo goes.                                       |
| `action`        | `shopAction`        | The footer's main button; `null` leaves it out.            |
| `support`       | `{}`                | As in the header.                                          |
| `linkComponent` | `PlainLink`         | As in the header.                                          |
| `since`         | `foundedYear`       | The copyright line's first year (۱۳۹۱).                    |
| `year`          | current Jalali year | Its last year; one year alone when both are the same.      |

### `SupportControl`

| Field        | Meaning                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| `href`       | The support page, `"/support/"` by default.                               |
| `onSupport`  | Opens the chat instead: the control becomes a `<button>`.                 |
| `attributes` | `data-*` attributes for the link, such as the site's `data-support-chat`. |

### Other exports

- `Logo` (`night` for a dark surface), `PlainLink` (an `<a>`; another host
  gets `rel="noopener"`), `jalaliYear()`.
- Data: `mainNav`, `footerColumns`, `contacts`, `tagline`, `foundedYear`,
  `shopAction`, `panelAction`. Every site address is relative (`/services/`), so a mirror
  domain keeps its visitors.
- Types: `SiteHeaderProps`, `SiteFooterProps`, `LogoProps`, `LinkProps`,
  `LinkComponent`, `SupportControl`, `HeaderAction`, `ShellLink`,
  `FooterColumn`, `Contacts`.

## Theme tokens

`theme.css` defines `--color-shell-*` (accent, its hover, strong, soft,
subtle and on-night shades, page, surface, surface border, ink, night and its
raised and border shades, and the text on night), `--shadow-shell-raised`
and `--shadow-shell-cta`, `--text-shell-sm`, `-base` and `-xl` with their
line heights, and `--radius-shell-xl`, `-2xl` and `-3xl`, with the site's
values. The markup uses no colour, text size or radius from Tailwind's own
scales, so a page whose theme clears them (`--text-*: initial`,
`--radius-*: initial`) still shows the shell as the site does; a test checks
it.

## Development

```bash
npm ci
npm test            # builds dist/ and renders every component in Node
npm run typecheck
npm run format:check
```

Releases: [`CONTRIBUTING.md`](CONTRIBUTING.md). Work items:
[`docs/tasks.md`](docs/tasks.md).

## Credits

The icons are from [Lucide](https://lucide.dev), under the ISC licence:

> Copyright (c) 2026 Lucide Icons and Contributors. Permission to use, copy,
> modify, and/or distribute this software for any purpose with or without fee
> is hereby granted, provided that the above copyright notice and this
> permission notice appear in all copies.
