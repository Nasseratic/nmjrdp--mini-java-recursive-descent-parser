const Parser = require("../Parser");
const Expression = require("./Expression_.parse");
const MultiExpression = require("./MultiExpression");
const Term = require("./Term.parse");

class Expression_ extends Parser {
  constructor(lvl,tokens,parent) {
    super("Expression`",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    if (symbols().indexOf(this.tokens[0].token) != -1) {
      if (this.validateTokens([this.tokens[0].type])) { //( "&&" | "||" | "==" | "!=" | ">" | "<" | "<=" | ">="| "+" | "-" | "*" | "/" ) Expression Expression_
        this.shift();
        new Expression(this.level, this.tokens, this.node);
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
      /*
      new Term([0,this.tokens, this.node]);
      new Expression_([0,this.tokens, this.node]);
      return true;*/
    } else if (this.validateTokens(["LEFT_SQUARE_B"])) { //  "[" Expression "]" Expression_
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_SQUARE_B"])) {
        this.shift();
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
    } else if (this.validateTokens(["DOT", "LENGTH"])) { // "." "length" Expression_
      this.shift();
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
    } else if (this.validateTokens(["DOT", "IDENTIFIER", "LEFT_ROUND_B"])) { // "." Identifier "(" (Expression ( "," Expression)*)? ")" Expression_
      this.shift();
      this.shift();
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      new MultiExpression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
        this.shift();
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
    }
  }
  print() {
   this.log(['System.out.print("HAHA")']);
  }
}
module.exports = Expression_;

function symbols() {
  return ["&&", "||", "==", "!=", ">", "<", "<=", ">=", "+", "-", "*", "/"];
}
