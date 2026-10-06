#!/usr/bin/env python3
"""Generates the site: edit _build/src (EN text + data-es Spanish), then run `python3 _build/build.py`.
The root *.html files and assets/js/i18n-es.js are build output — do not edit them by hand."""
import json, os, re, sys, html

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
OUT = os.path.dirname(HERE)
VERSION = "19.4"
SITE = "https://1cellhealth.com/"

ES = {}
WARN = []


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def i18n(fragment, ns):
    """Turn data-es / data-es-ph / data-es-aria into data-i18n keys and collect ES strings."""
    counters = {"t": 0, "p": 0, "a": 0}

    def make(kind, attr_out):
        def repl(m):
            counters[kind] += 1
            key = "%s.%s%d" % (ns, "" if kind == "t" else kind, counters[kind])
            ES[key] = html.unescape(m.group(1)) if kind != "t" else m.group(1)
            return '%s="%s"' % (attr_out, key)
        return repl

    fragment = re.sub(r'data-es-ph="([^"]*)"', make("p", "data-i18n-ph"), fragment)
    fragment = re.sub(r'data-es-aria="([^"]*)"', make("a", "data-i18n-aria"), fragment)
    fragment = re.sub(r'data-es="([^"]*)"', make("t", "data-i18n"), fragment)
    return fragment


def front_matter(src):
    m = re.match(r"\s*<!--(.*?)-->", src, re.S)
    meta = {}
    if m:
        for line in m.group(1).strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        src = src[m.end():]
    return meta, src


partials = {}
for name in os.listdir(os.path.join(SRC, "partials")):
    if name.endswith(".html"):
        key = name[:-5]
        partials[key] = i18n(read(os.path.join(SRC, "partials", name)), "c-" + key)

pages = sorted(n for n in os.listdir(os.path.join(SRC, "pages")) if n.endswith(".html"))
built = []
sitemap = []
for name in pages:
    meta, body = front_matter(read(os.path.join(SRC, "pages", name)))
    out_name = meta.get("file", name)
    slug = meta.get("slug", out_name[:-5])

    if meta.get("layout") == "redirect":
        target = meta["to"]
        doc = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>%(title)s</title>
<meta name="robots" content="noindex" />
<link rel="canonical" href="%(site)s%(target_clean)s" />
<meta http-equiv="refresh" content="0; url=%(target)s" />
<script>location.replace("%(target)s" + location.hash);</script>
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;color:#0B1613}a{color:#0B5A54}</style>
</head>
<body><p>This page has moved to <a href="%(target)s">%(target)s</a>.</p></body>
</html>
""" % {"title": meta.get("title", "1CELL Health"), "target": target, "site": SITE, "target_clean": target.split("#")[0]}
        with open(os.path.join(OUT, out_name), "w", encoding="utf-8") as f:
            f.write(doc)
        built.append(out_name)
        continue

    body = i18n(body, slug)
    title = meta.get("title", "1CELL Health")
    title_es = meta.get("title_es", title)
    ES[slug + ".title"] = title_es
    desc = meta.get("description", "")
    canonical = SITE + ("" if out_name == "index.html" else out_name)
    og_image = SITE + meta.get("og_image", "assets/img/product-family.jpg")
    base = '<base href="/" />\n' if meta.get("base") == "root" else ""
    robots = '<meta name="robots" content="noindex" />\n' if meta.get("noindex") else ""

    head = partials["head"]
    head = (head.replace("{{TITLE}}", html.escape(title, quote=False))
                .replace("{{TITLE_KEY}}", slug + ".title")
                .replace("{{DESC}}", html.escape(desc))
                .replace("{{CANONICAL}}", canonical)
                .replace("{{OG_IMAGE}}", og_image)
                .replace("{{BASE}}", base)
                .replace("{{ROBOTS}}", robots)
                .replace("{{PRELOAD}}", meta.get("preload", ""))
                .replace("{{V}}", VERSION))

    header = partials["header"]
    nav = meta.get("nav")
    if nav:
        header = header.replace('class="nav__link" data-nav="%s"' % nav,
                                'class="nav__link is-current" data-nav="%s" aria-current="page"' % nav)
        header = header.replace('class="drawer__group" data-nav="%s"' % nav,
                                'class="drawer__group is-current" data-nav="%s" open' % nav)
        header = header.replace('data-nav-cta="%s" href' % nav, 'data-nav-cta="%s" aria-current="page" href' % nav)

    extra_overlays = ""
    for extra in [x.strip() for x in meta.get("overlays", "").split(",") if x.strip()]:
        extra_overlays += partials[extra]

    doc = (head
           + '<body class="%s">\n' % meta.get("body_class", "page-" + slug)
           + partials["sprite"]
           + '<a class="skip" href="#main" data-i18n="c-skip">Skip to content</a>\n'
           + partials["topbar"]
           + header
           + '<main id="main">\n' + body.strip() + "\n</main>\n"
           + partials["footer"]
           + partials["overlays"]
           + extra_overlays
           + partials["scripts"].replace("{{V}}", VERSION)
           + "</body>\n</html>\n")
    ES["c-skip"] = "Saltar al contenido"

    if meta.get("root_links"):
        # served for any missing path (incl. nested ones), so every local URL must be root-absolute
        doc = re.sub(r'(href|src)="\./"', r'\1="/"', doc)
        doc = re.sub(r'(href|src)="(?!https?:|#|/|mailto:|data:|tel:)([^"]+)"', r'\1="/\2"', doc)

    with open(os.path.join(OUT, out_name), "w", encoding="utf-8") as f:
        f.write(doc)
    built.append(out_name)
    if not meta.get("noindex"):
        sitemap.append(canonical)

    # --- checks -----------------------------------------------------------
    for m in re.finditer(r'data-i18n="([^"]+)"', doc):
        if m.group(1) not in ES:
            WARN.append("%s: missing ES for %s" % (out_name, m.group(1)))
    ids = re.findall(r'\sid="([^"]+)"', doc)
    dup = {i for i in ids if ids.count(i) > 1}
    if dup:
        WARN.append("%s: duplicate ids %s" % (out_name, sorted(dup)))
    if "data-es" in doc:
        WARN.append("%s: unprocessed data-es attribute" % out_name)

with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    for url in sorted(sitemap, key=lambda u: (u != SITE, u)):
        f.write("  <url><loc>%s</loc></url>\n" % url)
    f.write("</urlset>\n")
with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as f:
    f.write("User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n" % SITE)

js = ("/* 1CELL HEALTH — Spanish dictionary (generated). Keys map to data-i18n attributes. */\n"
      "window.I18N_ES=" + json.dumps(ES, ensure_ascii=False, sort_keys=True, indent=0) + ";\n")
with open(os.path.join(OUT, "assets/js/i18n-es.js"), "w", encoding="utf-8") as f:
    f.write(js)

print("built %d pages: %s" % (len(built), ", ".join(built)))
print("ES strings: %d" % len(ES))
for w in WARN:
    print("WARN", w)
