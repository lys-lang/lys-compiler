import { folderBasedTest } from "./fbt";
import { resolve } from "path";

folderBasedTest(resolve(__dirname, "./fixtures/") + "**/*.lys");
