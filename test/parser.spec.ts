import { folderBasedTest } from "./fbt";
import { resolve } from "path";
import tokenizer from "../dist";

const ansiRegex = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
  ].join("|"),
  "g"
);

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
    const result = instance.parseAstDesugar(source);

    if (result == "<EMPTY>") throw new Error("Parsing error");

    return result;
  },
  ".ast.desugar"
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

    if (result) console.log(result);

    return result.replace(ansiRegex, "") || null;
  },
  ".syntax-error"
);
