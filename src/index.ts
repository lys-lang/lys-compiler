declare var require: any;
const wasmModule = require("../build/main");
import {
  readStringFromHeap,
  writeStringToHeap
} from "lys/dist/utils/execution";

export async function tokenizer() {
  const instance = await wasmModule.default();

  function eat(): string {
    return readStringFromHeap(instance, instance.exports.eat());
  }

  function parseAst(source: string): string {
    return readStringFromHeap(
      instance,
      instance.exports.parseAst(writeStringToHeap(instance, source))
    );
  }

  function parseAstDesugar(source: string): string {
    return readStringFromHeap(
      instance,
      instance.exports.parseAstDesugar(writeStringToHeap(instance, source))
    );
  }

  function parseAndEmitAst(
    moduleName: string,
    path: string,
    source: string
  ): string {
    return readStringFromHeap(
      instance,
      instance.exports.parseAndEmitAst(
        writeStringToHeap(instance, moduleName),
        writeStringToHeap(instance, path),
        writeStringToHeap(instance, source)
      )
    );
  }

  function parseAndEmitErrors(
    moduleName: string,
    path: string,
    source: string
  ): string {
    return readStringFromHeap(
      instance,
      instance.exports.parseAndEmitErrors(
        writeStringToHeap(instance, moduleName),
        writeStringToHeap(instance, path),
        writeStringToHeap(instance, source)
      )
    );
  }

  function parseAndEmitDesugar(
    moduleName: string,
    path: string,
    source: string
  ): string {
    return readStringFromHeap(
      instance,
      instance.exports.parseAndEmitDesugar(
        writeStringToHeap(instance, moduleName),
        writeStringToHeap(instance, path),
        writeStringToHeap(instance, source)
      )
    );
  }

  function startLexer(data: string) {
    instance.exports.startLexer(writeStringToHeap(instance, data));
  }

  return {
    startLexer,
    parseAndEmitAst,
    parseAndEmitErrors,
    parseAndEmitDesugar,
    parseAst,
    parseAstDesugar,
    eat
  };
}

export default tokenizer;
