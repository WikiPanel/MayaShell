# Contributing to MayaShell

The rules are MayaSite's ([its CONTRIBUTING.md](https://github.com/WikiPanel/MayaSite/blob/main/CONTRIBUTING.md));
the ones that matter most here:

## Tasks, branches and commits

- No work happens without a task ID in [`docs/tasks.md`](docs/tasks.md):
  `P<phase>.<two digits>`, sub-tasks add a letter (`P1.02a`).
- Branch names start with the ID in lower case (`p1-04-footer-links`); commit
  messages and PR titles start with it (`P1.04 Add a footer link`).
- Commits, PRs, tags and releases are made under the project owner's Git
  identity (`WikiPanel`) only, with no `Co-Authored-By`, `Generated with ...`
  or similar trailer.
- Commit and tag times carry Tehran time, `+03:30`:

  ```bash
  d="$(TZ='IRST-03:30' date +%Y-%m-%dT%H:%M:%S)+03:30"
  GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" git commit -m "P1.04 Add a footer link"
  ```

- Everything in the repository is in English; Persian is only what visitors
  read. Personal tooling configuration stays out of the repository
  (`.git/info/exclude`), and nothing mentions a coding tool.

## Changing the shell

- The header and footer look exactly like MayaSite's. A visual change is made
  here first, released, and then installed by the site and the shop.
- Markup uses only the `shell-*` tokens of `theme.css` and Tailwind's own
  scales; every class name is a literal, so the consumers' Tailwind finds it.
- No browser API at import or render time, no new dependency, and the gzipped
  JavaScript stays under 6 KB (`npm test` checks it).

## Releases

Semantic versions: a change that needs the consumers to change their code is
a major version.

1. Set `version` in `package.json`, add the release to `CHANGELOG.md` and
   update `docs/tasks.md`; merge the PR with CI green.
2. On the merged `main`:

   ```bash
   npm ci && npm test && npm pack
   d="$(TZ='IRST-03:30' date +%Y-%m-%dT%H:%M:%S)+03:30"
   GIT_COMMITTER_DATE="$d" git tag -a v1.0.1 -m v1.0.1
   git push origin v1.0.1
   gh release create v1.0.1 wikipanel-maya-shell-1.0.1.tgz --title v1.0.1 --notes-file <the CHANGELOG section>
   ```

3. Tell the site and the shop the new URL:
   `https://github.com/WikiPanel/MayaShell/releases/download/v1.0.1/wikipanel-maya-shell-1.0.1.tgz`.
