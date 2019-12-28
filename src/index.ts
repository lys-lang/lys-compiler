declare var require: any;
const wasmModule = require("../build/main");
import { readStringFromHeap, writeStringToHeap } from "lys/dist/utils/execution";

export async function tokenizer() {
  const instance = await wasmModule.default();

  function eat(): string {
    return readStringFromHeap(instance, instance.exports.eat());
  }

  function parseAst(source: string): string {
    return readStringFromHeap(instance, instance.exports.parseAst(writeStringToHeap(instance, source)));
  }

  function parseAndEmit(source: string): string {
    return readStringFromHeap(instance, instance.exports.parseAndEmit(writeStringToHeap(instance, source)));
  }

  function parseAndEmitAst(source: string): string {
    return readStringFromHeap(instance, instance.exports.parseAndEmitAst(writeStringToHeap(instance, source)));
  }

  function startLexer(data: string) {
    instance.exports.startLexer(writeStringToHeap(instance, data));
  }

  return {
    startLexer,
    parseAndEmit,
    parseAndEmitAst,
    parseAst,
    eat
  };
}

export default tokenizer;
