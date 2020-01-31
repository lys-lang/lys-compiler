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

const filesWithErrors = new Set<string>()
const filesWithSyntaxErrors = new Set<string>()

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
  async (source, fileName) => {
    const instance = await tokenizer();
    const result = instance.parseAndEmitDesugar(fileName, fileName, source);

    if (result == "<EMPTY>") throw new Error("Parsing error");

    if (!fileName.includes("/syntaxerrors/") && result && result.includes("/* ERROR: ")) {
      filesWithErrors.add(fileName)
    }

    return result;
  },
  ".ast.desugar-lys"
);

folderBasedTest(
  resolve(__dirname, "./fixtures/") + "/**/*.lys",
  async (source, fileName) => {
    const instance = await tokenizer();
    const result = instance.parseAndEmitAst(fileName, fileName, source);

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

    if (result && !fileName.includes("/syntaxerrors/")) {
      filesWithSyntaxErrors.add(fileName)
    }

    return result.replace(ansiRegex, "") || null;
  },
  ".syntax-error"
);

describe("Files with errors", () => {
  it("Files outside /syntaxerrors/ must no have any CodeNode error", async() => {
    if (filesWithErrors.size) {
      throw new Error("The following files have errors:\n" + Array.from(filesWithErrors).map($ => '    - ' + $).join('\n'))
    }
  })

  it("Files outside /syntaxerrors/ must no have any syntax error", async() => {
    if (filesWithSyntaxErrors.size) {
      throw new Error("The following files have parsing syntax errors:\n" + Array.from(filesWithSyntaxErrors).map($ => '    - ' + $).join('\n'))
    }
  })
})