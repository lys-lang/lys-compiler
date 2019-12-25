import { folderBasedTest, WRITE_TO_FILE } from "./fbt";
import { resolve } from "path";
import * as expect from "expect";
import tokenizer from "../dist";
import { existsSync, readFileSync, writeFileSync } from "fs";

const unknowns = new Set<string>();

folderBasedTest(
  resolve(__dirname, "./fixtures/") + "/**/*.lys",
  async source => {
    let instance = await tokenizer();

    instance.startLexer(source);

    const tokens: string[] = [];
    let token: string;

    do {
      token = instance.eat();
      if (token.startsWith("Unknown(")) {
        unknowns.add(token.replace("Unknown(", "").replace(/\)$/, ""));
      }
      tokens.push(JSON.stringify(token));
    } while (token !== "EndOfFile");

    return tokens.join("\n");
  },
  ".result"
);

describe("Compares unknowns", () => {
  it("compares against golden file", () => {
    const result = Array.from(unknowns)
      .sort()
      .join("\n");

    if (result !== null) {
      const compareToFileName = resolve(__dirname, "fixtures/unknowns.result");
      const compareFileExists = existsSync(compareToFileName);
      const compareTo = compareFileExists
        ? readFileSync(compareToFileName).toString()
        : "";
      if (WRITE_TO_FILE || !compareFileExists) {
        writeFileSync(compareToFileName, result);
      }
      expect(result.trim()).toEqual(compareTo.trim());
    }
  });
});
