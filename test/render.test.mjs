// Renders the built package to HTML in Node, as the site does at build time:
// importing it must not need a browser, and the props must do what the
// README says.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { gzipSync } from "node:zlib";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import {
  Logo,
  SiteFooter,
  SiteHeader,
  footerColumns,
  mainNav,
  panelAction,
} from "../dist/index.js";

const html = (component, props = {}) => renderToString(h(component, props));
const count = (text, part) => text.split(part).length - 1;

describe("importing", () => {
  it("needs no browser", () => {
    assert.equal(typeof globalThis.window, "undefined");
  });
});

describe("SiteHeader", () => {
  it("draws the site's menu twice (desktop and phone) and the buy button", () => {
    const out = html(SiteHeader);
    for (const item of mainNav) {
      assert.equal(count(out, `href="${item.href}"`) >= 2, true, item.href);
    }
    assert.match(out, /href="\/shop\/"[^>]*>.*خرید اشتراک/);
    assert.match(out, /<details/);
    assert.doesNotMatch(out, /<script/);
  });

  it("holds the logo in a flex box, in line with the menu", () => {
    assert.match(html(SiteHeader), /<a href="\/" class="flex shrink-0">/);
  });

  it("marks only the current section", () => {
    const out = html(SiteHeader, { currentPath: "/services/eco/" });
    assert.equal(count(out, 'aria-current="page"'), 2);
    assert.match(out, /href="\/services\/" aria-current="page"/);
  });

  it("marks home only on the home page", () => {
    assert.equal(
      count(html(SiteHeader, { currentPath: "/" }), 'aria-current="page"'),
      2,
    );
    assert.equal(
      count(
        html(SiteHeader, { currentPath: "/shop/me" }),
        'aria-current="page"',
      ),
      0,
    );
  });

  it("takes the shop's panel button", () => {
    const out = html(SiteHeader, { action: panelAction });
    assert.match(out, /href="\/shop\/me"[^>]*>.*پنل کاربری/);
    assert.doesNotMatch(out, /خرید اشتراک/);
  });

  it("links to support, with the page's data attributes", () => {
    const out = html(SiteHeader, {
      support: { href: "/support/", attributes: { "data-support-chat": "" } },
    });
    assert.equal(count(out, 'data-support-chat=""'), 2);
    assert.doesNotMatch(out, /<button/);
  });

  it("turns support into a button when the page opens the chat", () => {
    const out = html(SiteHeader, { support: { onSupport: () => {} } });
    assert.equal(count(out, '<button type="button"'), 2);
  });

  it("draws every link with the given link component", () => {
    const Link = ({ href, children, ...rest }) =>
      h("a", { href, "data-router": "", ...rest }, children);
    const out = html(SiteHeader, { linkComponent: Link });
    // the logo, the menu twice and the main button
    assert.equal(count(out, "data-router"), 1 + mainNav.length * 2 + 1);
  });

  it("opens addresses on other hosts with rel=noopener", () => {
    const out = html(SiteHeader, {
      action: { label: "خرید اشتراک", href: "https://shop.example/" },
    });
    assert.match(out, /href="https:\/\/shop.example\/" rel="noopener"/);
  });
});

describe("SiteFooter", () => {
  it("draws every column link and the contacts", () => {
    const out = html(SiteFooter);
    for (const column of footerColumns) {
      for (const link of column.links) {
        assert.ok(out.includes(`href="${link.href}"`), link.href);
      }
    }
    assert.match(out, /href="https:\/\/t.me\/MayaVPNSupportBot"/);
    assert.match(out, /href="mailto:mayavpn.sup@gmail.com"/);
    assert.doesNotMatch(out, /اینستاگرام/);
  });

  it("writes the years since ۱۳۹۰ in Persian digits", () => {
    assert.match(html(SiteFooter), /© ۱۳۹۰–[۰-۹]{4} مایا وی‌پی‌ان/);
    assert.match(html(SiteFooter, { year: "۱۴۰۶" }), /© ۱۳۹۰–۱۴۰۶ /);
    assert.match(
      html(SiteFooter, { since: "۱۴۰۶", year: "۱۴۰۶" }),
      /© ۱۴۰۶ مایا/,
    );
  });

  it("leaves the main button out when asked", () => {
    assert.doesNotMatch(html(SiteFooter, { action: null }), /خرید اشتراک/);
  });

  it("leaves out empty contacts", () => {
    const out = html(SiteFooter, {
      contacts: { email: "a@b.c", telegram: "" },
    });
    assert.doesNotMatch(out, /t\.me/);
    assert.match(out, /mailto:a@b.c/);
  });
});

describe("Logo", () => {
  it("keeps the wordmark left to right", () => {
    assert.match(html(Logo), /dir="ltr"[^>]*>Maya<span[^>]*>VPN/);
  });
});

const dist = new URL("../dist/", import.meta.url);
const code = readdirSync(dist)
  .filter((name) => name.endsWith(".js"))
  .map((name) => readFileSync(new URL(name, dist)))
  .reduce((all, part) => Buffer.concat([all, part]), Buffer.alloc(0));

describe("size", () => {
  it("stays a few kilobytes", () => {
    const kb = gzipSync(code).length / 1024;
    assert.ok(kb < 6, `${kb.toFixed(1)} KB gzipped`);
  });
});

describe("classes", () => {
  // A page's theme may clear Tailwind's colour, text and radius scales, so
  // the shell uses its own shell-* tokens for all three.
  it("use no colour, text size or radius from Tailwind's own scales", () => {
    const scale =
      /(?<![\w-])(?:[a-z0-9-]+:)*(?:text-(?:xs|sm|base|lg|[0-9]?xl)|rounded-(?:xs|sm|md|lg|[0-9]?xl)|(?:bg|text|border|fill|stroke)-(?:white|black|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d+)?)(?![\w-])/g;
    assert.deepEqual(code.toString().match(scale) ?? [], []);
  });
});
