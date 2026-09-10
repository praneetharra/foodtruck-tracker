#!/usr/bin/env bash
# Stamp a fresh version onto every asset URL in index.html, the inline build
# marker, and APP_BUILD in app.js — so browsers can't serve a stale mix.
#
# Run before committing whenever you've edited anything in assets/:
#
#   ./bump.sh && git add -A && git commit -m "..." && git push origin main
#
set -euo pipefail
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
python3 - "$V" <<'PY'
import sys, re
v = sys.argv[1]

s = open('index.html').read()
s = re.sub(r'href="assets/styles\.css(\?v=[0-9]+)?"',
           'href="assets/styles.css?v=%s"' % v, s)
s = re.sub(r'src="assets/([a-z]+)\.js(\?v=[0-9]+)?"',
           lambda m: 'src="assets/%s.js?v=%s"' % (m.group(1), v), s)
s = re.sub(r'window\.FT_HTML_BUILD="[0-9]*"',
           'window.FT_HTML_BUILD="%s"' % v, s)
open('index.html', 'w').write(s)

a = open('assets/app.js').read()
a = re.sub(r'const APP_BUILD = "[0-9]*"',
           'const APP_BUILD = "%s"' % v, a)
open('assets/app.js', 'w').write(a)

print("Stamped build %s into index.html and app.js" % v)
PY
