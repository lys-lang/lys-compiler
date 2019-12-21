import tokenizer from "../dist";

function mustEqual(a, b) {
  if (a != b) {
    throw new Error(`${a} did not equal ${b}`);
  }
}

describe("sanity tests", () => {
  let instance = null;

  it("creates the instance", async () => {
    instance = await tokenizer();
  });

  it("unitinialized yields error token", () => {
    mustEqual(instance.eat(), "LexerNotInitialized")
  })

  it("test empty strings", () => {
    instance.startLexer("");
    mustEqual(instance.eat(), "EndOfFile")
  });

  it("whitespaces and identifiers", () => {
    instance.startLexer("asd   AA a");
    mustEqual(instance.eat(), "Identifier(asd)")
    mustEqual(instance.eat(), "Whitespace(   )")
    mustEqual(instance.eat(), "Identifier(AA)")
    mustEqual(instance.eat(), "Whitespace( )")
    mustEqual(instance.eat(), "Identifier(a)")

    mustEqual(instance.eat(), "EndOfFile")
    mustEqual(instance.eat(), "EndOfFile")
    mustEqual(instance.eat(), "EndOfFile")
    mustEqual(instance.eat(), "EndOfFile")
  });
});
