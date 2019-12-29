import { readFileSync, existsSync, writeFileSync } from "fs";
import * as expect from "expect";
import * as glob from "glob";
import { relative } from "path";


export const WRITE_TO_FILE = process.env.UPDATE_AST;


export function folderBasedTest(grep: string, fn: (source: string, filename: string) => Promise<string>, extension: string) {

  function testFile(fileName: string) {
    it(fileName, async () => {
      const content = readFileSync(fileName).toString();
      const result = await fn(content, relative(process.cwd(), fileName))

      if (result !== null) {
        const compareToFileName = fileName + extension;
        const compareFileExists = existsSync(compareToFileName);
        const compareTo = compareFileExists
          ? readFileSync(compareToFileName).toString()
          : "";
        if (WRITE_TO_FILE || !compareFileExists) {
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

}
