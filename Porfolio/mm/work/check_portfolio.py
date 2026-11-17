from html.parser import HTMLParser
from pathlib import Path
import re, sys

root = Path("outputs")
html = (root / "index.html").read_text(encoding="utf-8-sig")
css = (root / "style.css").read_text(encoding="utf-8-sig")
js = (root / "script.js").read_text(encoding="utf-8-sig")

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.hrefs = []
        self.labels = []
        self.controls = []
        self.buttons = []
        self.landmarks = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: self.ids.append(a["id"])
        if "href" in a: self.hrefs.append(a["href"])
        if "for" in a: self.labels.append(a["for"])
        if "aria-controls" in a: self.controls.append(a["aria-controls"])
        if tag == "button": self.buttons.append(a)
        if tag in ("header", "nav", "main", "footer"): self.landmarks.add(tag)

p = Page()
p.feed(html)
ids = set(p.ids)
duplicate_ids = sorted(x for x in ids if p.ids.count(x) > 1)
broken_anchors = sorted({x[1:] for x in p.hrefs if x.startswith("#") and x[1:] not in ids})
missing_label_targets = sorted(set(p.labels) - ids)
missing_control_targets = sorted(set(p.controls) - ids)
local_links = [x for x in p.hrefs if x and not x.startswith(("#", "http:", "https:", "mailto:", "tel:"))]
missing_local = [x for x in local_links if not (root / x.split("#")[0]).exists()]
missing_files = [x for x in ("style.css", "script.js") if not (root / x).exists()]
responsive = all(token in css for token in ("@media(max-width:980px)", "@media(max-width:700px)", "@media(max-width:390px)", "prefers-reduced-motion"))
print("HTML IDs:", len(ids), "| duplicate IDs:", duplicate_ids)
print("Broken section links:", broken_anchors)
print("Missing label targets:", missing_label_targets)
print("Missing aria-controls targets:", missing_control_targets)
print("Missing local file references:", missing_local, "| required files:", missing_files)
print("Semantic landmarks:", sorted(p.landmarks))
print("Responsive breakpoints and reduced motion:", "present" if responsive else "missing")
print("Interactive buttons:", len(p.buttons), "| missing type:", sum(1 for b in p.buttons if "type" not in b), "| unnamed buttons:", sum(1 for b in p.buttons if not (b.get("aria-label") or b.get("title"))))
print("External links in initial HTML:", [x for x in p.hrefs if x.startswith(("http:", "https:"))])
if duplicate_ids or broken_anchors or missing_label_targets or missing_control_targets or missing_local or missing_files or not responsive:
    sys.exit(1)
