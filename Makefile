build:
	@(rm -rf build || true)
	./node_modules/.bin/lys test/test.lys --test --no-optimize
	./node_modules/.bin/lys src/main.lys --no-optimize --wast --lib node_modules/lys/dist/utils/libs/env.js
	@cd src; ../node_modules/.bin/ncc build index.ts -o ../dist
	@./node_modules/.bin/mocha -r ts-node/register test/\*\*/\*.spec.ts

snapshot: export UPDATE_AST=true
snapshot: build

full:
	@npm install
	@$(MAKE) build

.PHONY: build
