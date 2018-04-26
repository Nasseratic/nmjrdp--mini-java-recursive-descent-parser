const Parser = require("../Parser");
const Expression = require("./Expression.parse");
class Statement extends Parser {
  constructor(lvl,tokens,parent) {
    super("Statement",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    // "System.out.println" "(" Expression ")" ";"
    if (
      this.tokens[0].type === "SYSTEM.OUT.PRINTLN" &&
      this.tokens[1].type === "LEFT_ROUND_B"
    ) {
      this.shift();
      this.shift();
      new Expression(0,this.tokens, this.node);
      if (
        this.tokens[0].type === "RIGHT_ROUND_B" &&
        this.tokens[1].type === "SEMICOLON"
      ) {
        this.shift();
        this.shift();
        return true;
      }
      this.errIndex = this.tokens[0].index;
      return true;
    }
    // Identifier "=" Expression ";"
    else if (this.tokens[0].type === "ID" && this.tokens[1].type === "EQUAL") {
      new Expression(0,this.tokens, this.node);
      if (this.tokens[0].type === "SEMICOLON") {
        this.tokens.shift();
        return true;
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    // Identifier "[" Expression "]" "=" Expression ";"
    else if ( this.validateTokens(["ID","RIGHT_SQUARE_B"])) {
      this.shift();
      this.shift();
      new Expression(this.tokens);
      if (this.validateTokens(["LEFT_SQUARE_B", "EQUAL"])) {
        this.shift();
        this.shift();
        new Expression(0,this.tokens,this.node)
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    return false;
  }
  print() {
    this.log(['System.out.print("HAHA")']);
  }
}
module.exports = Statement;
