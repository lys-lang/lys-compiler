import { folderBasedTest } from "./fbt";
import { resolve } from "path";
import tokenizer from "../dist";

folderBasedTest(
  resolve(__dirname, "./fixtures/") + "/**/*.lys",
  async source => {
    const instance = await tokenizer();
    const result = instance.parseAst(source);

    if (result == "<EMPTY>") throw new Error("Parsing error");

    return result;
  },
  ".ast"
);

folderBasedTest(
  resolve(__dirname, "./fixtures/") + "/**/*.lys",
  async source => {
    const instance = await tokenizer();
    const result = instance.parseAndEmitAst(source);

    if (result == "") throw new Error("Parsing error");

    return result;
  },
  ".lys.ast-2"
);


folderBasedTest(
  resolve(__dirname, "./fixtures/") + "/**/*.lys",
  async (source, fileName) => {
    const instance = await tokenizer();
    const result = instance.parseAndEmitErrors(fileName, fileName, source);

    return result || null;
  },
  ".syntax-error"
);
