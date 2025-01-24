LYS := ./node_modules/.bin/lys


build: | clean lys-test lys-build only-test

clean:
	@(rm -rf build || true)
	@npm ci

lys-test:
	$(LYS) test/test.lys --test --no-optimize --wast --desugar

lys-build:
	$(LYS) src/main.lys --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar

watch:
	$(LYS) src/main.lys --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar --watch

only-test:
	@cd src; ../node_modules/.bin/ncc build index.ts -o ../dist
	@./node_modules/.bin/mocha -r ts-node/register test/\*\*/\*.spec.ts 2>&1

watch-tests:
	$(LYS) test/test.lys --test --wast --lib node_modules/lys/dist/utils/libs/env.js --desugar --watch

only-snapshot: export UPDATE_AST=true
only-snapshot: only-test

build-local:
	LYS=../lys/dist/bin.js $(MAKE) build

snapshot: export UPDATE_AST=true
snapshot: build

.PHONY: build
