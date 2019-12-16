build:
	(rm -rf build || true)
	./node_modules/.bin/lys src/test.lys --test
	./node_modules/.bin/lys src/main.lys --wast
	./node_modules/.bin/ncc build src/index.ts -o dist
	./node_modules/.bin/mocha test.js

.PHONY: build
