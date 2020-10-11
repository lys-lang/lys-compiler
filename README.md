# lys-compiler

## Objective of this repository

Start [bootstraping the compiler](https://en.wikipedia.org/wiki/Bootstrapping_(compilers)).  

[Blog post](https://menduz.com/posts/2019.12.26)

## Watch changes

There are two ways to watch this project:
1) watch the sources: `make watch`.
2) watch the sources + tests, run tests on changes: `make watch-tests`.

## Testing locally

Most of the testing is based on golden files, located in the folder [test/fixtures](test/fixtures). Those lys files are parsed and depending on the test some other files are emited and compared against the files in the file system; if it is different the test will fail.  

To update the golden files from a dry run, execute `make snapshot`.  
To update the golden files while watching execute `make only-snapshot`.  

> Note: to run `make only-snapshot` it is necessary to run `make watch` in parallel.

## How to build

Run `make build`, make sure to have at least Node.js 12 installed. It will install, compile and run the full test suite.