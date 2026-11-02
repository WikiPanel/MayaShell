# Changelog

Every release is a tag with its `npm pack` file attached to the GitHub
release.

## v1.0.2 — 2026-11-02

- Below 370 px the header's main button drops its icon and some padding, so
  the header fits phones down to 320 px wide; it overflowed by 27 px there.
  From 370 px up nothing changes.

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
