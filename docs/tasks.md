# Tasks

Every change has a task ID here before it starts; branches, commits and PRs
carry it ([`CONTRIBUTING.md`](../CONTRIBUTING.md)). MayaSite tracks the same
work as its task P2.06.

## Index

| ID    | Title                                        | Status  | Done       |
| ----- | -------------------------------------------- | ------- | ---------- |
| P1.01 | Repository, package and release process      | done    | 2026-10-31 |
| P1.02 | Header, footer, logo and theme from MayaSite | done    | 2026-10-31 |
| P1.03 | Release v1.0.0 with its tarball              | done    | 2026-11-02 |
| P1.04 | Text sizes and radii of the shell's own      | done    | 2026-11-02 |
| P1.05 | «فروشگاه» in the menu                        | dropped |            |
| P1.06 | Header fits 320 px phones                    | done    | 2026-11-02 |
| P1.07 | Logo in line with the menu                   | done    | 2026-11-02 |

## Phase 1 — First release

### P1.01 Repository, package and release process

- Public repository, as the owner decided on 2026-10-31: MayaShop's servers
  and builds have no GitHub token, so they install a release's tarball by URL.
- `@wikipanel/maya-shell`: ESM and types built by `tsc`, React 19 as a peer
  dependency, no other dependency. CI checks formatting, types, the tests and
  the package contents.

### P1.02 Header, footer, logo and theme from MayaSite

- The header and footer of MayaSite v1.0.21 as React components, on `shell-*`
  tokens so they never collide with the page's theme.
- What MayaShop asked for on 2026-10-31: relative site links, a prop for the
  main button (the shop's «پنل کاربری»), a link component prop, a support
  control that can be a button, a phone menu without JavaScript, no browser
  API on import or render, a few kilobytes.
- Tests render every component in Node and check the props and the size.

### P1.03 Release v1.0.0 with its tarball

- Tag `v1.0.0` and a GitHub release with `wikipanel-maya-shell-1.0.0.tgz`.

### P1.04 Text sizes and radii of the shell's own

- Asked by MayaShop (2026-11-02): its theme clears Tailwind's text and radius
  scales, so `text-sm`, `text-base` and `rounded-*` were missing or
  different in the shop. `theme.css` adds `--text-shell-sm`, `-base` and
  `-xl` (with Tailwind's unitless line heights) and `--radius-shell-xl`,
  `-2xl` and `-3xl` with Tailwind's values, the markup uses them, and a test
  fails on any colour, text size or radius class from Tailwind's own scales.
  Released as v1.0.1.

### P1.05 «فروشگاه» in the menu

- Dropped (owner, 2026-11-02): the header's «خرید اشتراک» button already
  opens the shop. PR #3 was closed without a release.

### P1.06 Header fits 320 px phones

- At 320 px the header was 27 px wider than the screen, so every page
  scrolled sideways. Below 370 px the main button now hides its icon and
  uses `px-3`; measured on MayaSite at 320, 340, 359, 360, 375 and 768 px
  with no overflow (31 px to spare at 360 px). Released as v1.0.2.

### P1.07 Logo in line with the menu

- The owner saw the header's logo sit higher than the menu (2026-11-02).
  The logo's link was a block holding a line of text, so a line box with
  room for descenders hung under the logo: on MayaSite at 1024 px the link
  was 47.6 px tall, the logo 36 px at its top, and the logo's middle 5.8 px
  above the header's. The link is now a flex box as tall as the logo, so the
  logo is centred like the menu.
