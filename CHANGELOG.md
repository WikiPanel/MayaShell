# Changelog

Every release is a tag with its `npm pack` file attached to the GitHub
release.

## v1.0.0 — 2026-10-31

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
