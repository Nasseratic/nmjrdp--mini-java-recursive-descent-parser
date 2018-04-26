const Parser = require("../Parser");
const Expression = require("./Expression_.parse");
const Expression_ = require("./Expression_.parse");
const Term = require("./Term.parse");

class MultiExpression extends Parser {
  constructor(lvl,tokens,parent) {
    super("Expression",lvl,tokens,parent);
    this.parseing();
  }

  parse() {
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
          // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
          return true;
      } else {
        if (this.validateTokens(["COMMA"])) {
            this.shift();
            new Expression(this.level, this.tokens, this.node);
            new MultiExpression(this.level, this.tokens, this.node);
        } else {
            return false;
        }
      }
  }
}

module.exports = MultiExpression;