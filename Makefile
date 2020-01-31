build: | clean lys-test lys-build only-test

clean:
	@(rm -rf build || true)
	@npm ci

lys-test:
	./node_modules/.bin/lys test/test.lys --test --no-optimize --wast --desugar

lys-build:
	./node_modules/.bin/lys src/main.lys --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar

watch:
	./node_modules/.bin/lys src/main.lys --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar --watch

only-test:
	@cd src; ../node_modules/.bin/ncc build index.ts -o ../dist
	@./node_modules/.bin/mocha -r ts-node/register test/\*\*/\*.spec.ts 2>&1

watch-tests:
	./node_modules/.bin/lys test/test.lys --test --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar --watch

only-snapshot: export UPDATE_AST=true
only-snapshot: only-test

snapshot: export UPDATE_AST=true
snapshot: build

.PHONY: build
