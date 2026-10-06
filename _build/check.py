import os, re, sys
from html.parser import HTMLParser
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pages = sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))
ids = {}
for p in pages:
    ids[p] = set(re.findall(r'\sid="([^"]+)"', open(os.path.join(ROOT, p), encoding="utf-8").read()))
problems = []
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr","use","path","circle","rect","g"}
class P(HTMLParser):
    def __init__(s): super().__init__(); s.stack=[]; s.errs=[]
    def handle_starttag(s, t, a):
        if t in VOID or t in ("svg","symbol","defs") and False: return
        if t in VOID: return
        s.stack.append((t, s.getpos()))
    def handle_startendtag(s, t, a): pass
    def handle_endtag(s, t):
        if t in VOID: return
        if s.stack and s.stack[-1][0] == t: s.stack.pop(); return
        # find
        for i in range(len(s.stack)-1, -1, -1):
            if s.stack[i][0] == t:
                s.errs.append("unclosed %s before </%s> at %s" % ([x[0] for x in s.stack[i+1:]], t, s.getpos())); del s.stack[i:]; return
        s.errs.append("stray </%s> at %s" % (t, s.getpos()))
for p in pages:
    html = open(os.path.join(ROOT, p), encoding="utf-8").read()
    if "http-equiv=\"refresh\"" in html: 
        continue
    parser = P(); parser.feed(html)
    for e in parser.errs[:5]: problems.append("%s: %s" % (p, e))
    leftover = [x for x in parser.stack if x[0] not in ("html","body","head","p","li","dt","dd","option")]
    if leftover: problems.append("%s: unclosed at EOF %s" % (p, leftover[:5]))
    for attr, url in re.findall(r'(?<![-\w])(href|src)="([^"]*)"', re.sub(r"<!--.*?-->", "", html, flags=re.S)):
        if not url or url.startswith(("http:", "https:", "mailto:", "data:", "tel:")): continue
        if url.startswith("#"):
            a = url[1:]
            if a and a not in ids[p] and a != "top": problems.append("%s: missing in-page anchor %s" % (p, url))
            continue
        path, _, anchor = url.partition("#")
        path = path.split("?")[0]
        if path in ("", "./", "/"): target = "index.html"
        else: target = path.lstrip("/")
        if path == "" and url.startswith("?"): target = p
        full = os.path.join(ROOT, target)
        if not os.path.exists(full): problems.append("%s: broken %s=%s" % (p, attr, url)); continue
        if anchor and target.endswith(".html") and anchor not in ids.get(target, set()): problems.append("%s: missing anchor %s in %s" % (p, anchor, target))
print("checked %d pages" % len(pages))
print("\n".join(problems) if problems else "NO PROBLEMS")
