build:
	@(rm -rf build || true)
	./node_modules/.bin/lys test/test.lys --test
	./node_modules/.bin/lys src/main.lys --wast
	@cd src; ../node_modules/.bin/ncc build index.ts -o ../dist
	@./node_modules/.bin/mocha -r ts-node/register test/\*\*/\*.spec.ts

snapshot: export UPDATE_AST=true
snapshot: build

full:
	@npm install
	@$(MAKE) build

.PHONY: build
