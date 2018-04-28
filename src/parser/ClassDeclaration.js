const Parser = require("../Parser");
const VarDeclaration = require("./VarDeclaration");

module.exports = class ClassDeclaration extends Parser {
  constructor(lvl, tokens, parent) {
    super("Class Declaration", lvl, tokens, parent);
    this.toPrintBefore = [];
    this.toPrintAfter = [];
    this.parseing();
  }
  parse() {
    if (this.tokens.length < 1) {
      return true;
    } else if (this.validateTokens(["CLASS", "ID"])) {
      this.toPrintBefore.push("class " + this.tokens[1].token);
      this.cleanTo(3);
      if (this.validateTokens(["EXTENDS"])) {
        this.toPrintBefore.push("extends");
        this.shift();
        if (this.validateTokens(["ID"])) {
          this.toPrintBefore.push("extends");
          this.shift();
        } else {
          return false;
        }
      }
      if (this.validateTokens(["LEFT_CURLY_B"])) {
        this.toPrintBefore.push("{");
        this.shift();
        new VarDeclaration(this.level, this.tokens, this.node);
        return true;
      }
    }
    return false;
  }
  print() {
    this.log(this.toPrintBefore);
    this.printChildren();
    this.log(this.toPrintAfter);
  }
};
