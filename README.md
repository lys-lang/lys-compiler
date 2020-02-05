# lys-compiler

## Objective of this repository

Start [bootstraping the compiler](https://en.wikipedia.org/wiki/Bootstrapping_(compilers)).  

[Blog post](https://menduz.com/posts/2019.12.26)

## To build locally

Run `make build`, make sure to have at least Node.js 12 installed.

1. It first builds Lys to the [build](build) folder using `lys src/main.lys --wast`
2. It then uses `@zeit/ncc` to create a single file using [src/index.ts](src/index.ts)
3. Finally, it performs a [sanity test](test.js) using mocha.
