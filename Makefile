serve:
	python -m SimpleHTTPServer
.PHONY: serve

add: out/main.js out/index.html
	ipfs add --pin=false -wr out/* assets
.PHONY: add

out/:
	mkdir -p out/

out/main.js: main.js out/
	yarn run -s babel --minified main.js | yarn run -s uglifyjs --rename > out/main.js

out/index.html: index.html out/
	yarn run html-minifier --collapse-whitespace --remove-comments --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true index.html -o out/index.html
