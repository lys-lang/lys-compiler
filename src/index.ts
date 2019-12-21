declare var require: any;
const wasmModule = require("../build/main");
import { readStringFromHeap, writeStringToHeap } from "lys/dist/utils/execution";

export async function tokenizer() {
  const instance = await wasmModule.default();

  function eat(): string {
    return readStringFromHeap(instance, instance.exports.eat());
  }

  function startLexer(data: string) {
    instance.exports.startLexer(writeStringToHeap(instance, data));
  }

  return {
    startLexer,
    eat
  };
}

export default tokenizer;
