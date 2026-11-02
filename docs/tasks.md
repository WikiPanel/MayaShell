# Tasks

Every change has a task ID here before it starts; branches, commits and PRs
carry it ([`CONTRIBUTING.md`](../CONTRIBUTING.md)). MayaSite tracks the same
work as its task P2.06.

## Index

| ID    | Title                                        | Status | Done       |
| ----- | -------------------------------------------- | ------ | ---------- |
| P1.01 | Repository, package and release process      | done   | 2026-10-31 |
| P1.02 | Header, footer, logo and theme from MayaSite | done   | 2026-10-31 |
| P1.03 | Release v1.0.0 with its tarball              | done   | 2026-11-02 |

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
