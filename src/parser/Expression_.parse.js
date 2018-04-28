const Parser = require("../Parser");

class Expression_ extends Parser {
  constructor(lvl, tokens, parent) {
    super("Expression`", lvl, tokens, parent);
    this.toPrintBefore = [];
    this.toPrintAfter = [];
    this.parseing();
  }
  parse() {
    if (symbols().indexOf(this.tokens[0].token) != -1) {
      //( "&&" | "||" | "==" | "!=" | ">" | "<" | "<=" | ">="| "+" | "-" | "*" | "/" ) Expression Expression_

      this.toPrintBefore.push(this.tokens[0].token);
      this.shift();
      if (this.validateTokens(["EQUAL"])) {
        this.toPrintBefore.push(this.tokens[0].token);
        this.shift();
      }
      new Expression(this.level, this.tokens, this.node);
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["LEFT_SQUARE_B"])) {
      //  "[" Expression "]" Expression_
      this.toPrintBefore.push(this.tokens[0].toeken);
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_SQUARE_B"])) {
        this.toPrintAfter.push(this.tokens[0].token);
        this.shift();
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
      return false;
    } else if (this.validateTokens(["DOT", "ID", "LEFT_ROUND_B"])) {
      this.toPrintBefore.push("." + this.tokens[1].token + "(");
      // "." Identifier "(" (Expression ( "," Expression)*)? ")" Expression_
      this.shift();
      this.shift();
      this.shift();
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
        this.toPrintBefore.push(")");
        this.shift();
        return true;
      } else {
        new Expression(this.level, this.tokens, this.node);
        new MultiExpression(this.level, this.tokens, this.node);
        if (this.validateTokens(["RIGHT_ROUND_B"])) {
          this.toPrintAfter.push(")");
          // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
          this.shift();
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }
  print() {
    this.logInline(this.toPrintBefore);
    this.printChildren();
    this.logInline(this.toPrintAfter);
  }
}
module.exports = Expression_;

function symbols() {
  return ["&&", "||", "==", "!=", ">", "<", "<=", ">=", "+", "-", "*", "/", "="];
}

const MultiExpression = require("./MultiExpression");
const Expression = require("./Expression.parse");