# Changelog

Every release is a tag with its `npm pack` file attached to the GitHub
release.

## v1.0.2 — 2026-11-02

- «فروشگاه» (`/shop/`) joins the menu after «خانه», on the site and in the
  shop; it is marked on every shop page.
- Up to lg the menu is tighter (smaller gaps, no icon on the main button), so
  the six items still fit at 768 px.

## v1.0.1 — 2026-11-02

- The text sizes and corner radii are the shell's own (`text-shell-sm`,
  `-base`, `-xl`, `rounded-shell-xl`, `-2xl`, `-3xl` in `theme.css`), with
  Tailwind's default values, so a page whose theme clears Tailwind's text or
  radius scale (MayaShop) shows the shell as the site does. No change to the
  API or to the site's look.

## v1.0.0 — 2026-11-02

First release, the header and footer of MayaSite v1.0.21.

- `SiteHeader`: the logo, the menu (from tablet width up, compact up to lg),
  «پشتیبانی آنلاین» and the main button; a `<details>` menu on phones.
- `SiteFooter`: the logo and tagline, three link columns, the main and support
  buttons from sm up, the copyright line and the contact links.
- `Logo`, the site's links and contacts as data, `shopAction` and
  `panelAction`.
- Props for the main button (`action`), support (`support`: a link with data
  attributes, or a button with `onSupport`) and the link component
  (`linkComponent`).
- `theme.css` with the `shell-*` colours and shadows.
