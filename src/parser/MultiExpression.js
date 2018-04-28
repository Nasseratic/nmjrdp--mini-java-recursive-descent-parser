const Parser = require("../Parser");

module.exports = class MultiExpression extends Parser {
  constructor(lvl, tokens, parent) {
    super("Expression", lvl, tokens, parent);
    this.toPrint = [];
    this.parseing();
  }

  parse() {
    if (this.validateTokens(["RIGHT_ROUND_B"])) {
      // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
      return true;
    } else {
      if (this.validateTokens(["COMMA"])) {
        this.shift();
        this.toPrint.push(",");
        new Expression(0, this.tokens, this.node);
        new MultiExpression(this.level, this.tokens, this.node);
      } else {
        return false;
      }
    }
  }
  print() {
    this.logInline(this.toPrint);
    this.printChildren();
  }
};
