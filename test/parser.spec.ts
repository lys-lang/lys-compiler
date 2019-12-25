import { folderBasedTest, WRITE_TO_FILE } from "./fbt";
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
