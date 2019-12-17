declare var require: any;
const getBytes = require("utf8-bytes");
const wasmModule = require("../build/main");
import { readString, writeStringToHeap } from "lys/dist/utils/execution";

export async function tokenizer() {
  const instance = await wasmModule.default();

  function eat(): string {
    const offset = instance.exports.eat();
    return readString(instance.exports.memory.buffer, offset);
  }

  function parse(data: string) {
    instance.exports.parse(writeStringToHeap(instance, data));
  }

  return {
    parse,
    eat
  };
}

export default tokenizer;
