import { readFileSync, existsSync, writeFileSync } from "fs";
import * as expect from "expect";
import * as glob from "glob";
import tokenizer from "../dist";
import { resolve } from "path";

const writeToFile = process.env.UPDATE_AST;

export function folderBasedTest(grep: string) {
  const unknowns = new Set<string>();

  function testFile(fileName: string) {
    it(fileName, async () => {
      let instance = await tokenizer();
      const content = readFileSync(fileName).toString();
      instance.parse(content);

      const tokens: string[] = [];
      let token: string;

      do {
        token = instance.eat();
        if (token.startsWith("Unknown(")) {
          unknowns.add(token.replace("Unknown(", '').replace(/\)$/, ''));
        }
        tokens.push(JSON.stringify(token));
      } while (token !== "EndOfFile");

      const result = tokens.join("\n");

      if (result !== null) {
        const compareToFileName = fileName + ".result";
        const compareFileExists = existsSync(compareToFileName);
        const compareTo = compareFileExists
          ? readFileSync(compareToFileName).toString()
          : "";
        if (writeToFile || !compareFileExists) {
          writeFileSync(compareToFileName, result);
        }
        expect(compareTo.trim().length > 0 || !compareFileExists).toEqual(true);
        expect(result.trim()).toEqual(compareTo.trim());
      }
    });
  }

  describe("File based tests: " + grep, () => {
    glob.sync(grep).map(testFile);
  });

  describe("Compares unknowns", () => {
    it("compares against golden file", () => {
      const result = Array.from(unknowns)
        .sort()
        .join("\n");

      if (result !== null) {
        const compareToFileName = resolve(
          __dirname,
          "fixtures/unknowns.result"
        );
        const compareFileExists = existsSync(compareToFileName);
        const compareTo = compareFileExists
          ? readFileSync(compareToFileName).toString()
          : "";
        if (writeToFile || !compareFileExists) {
          writeFileSync(compareToFileName, result);
        }
        expect(result.trim()).toEqual(compareTo.trim());
      }
    });
  });
}
