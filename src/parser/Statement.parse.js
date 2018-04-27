const Parser = require("../Parser");
const Expression = require("./Expression.parse");
const MultiStatement = require("./MultiStatement");

class Statement extends Parser {
  constructor(lvl,tokens,parent) {
    super("Statement",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    // "System.out.println" "(" Expression ")" ";"
    if (this.tokens[0].type === "SYSTEM.OUT.PRINTLN" && this.tokens[1].type === "LEFT_ROUND_B") {
      this.shift();
      this.shift();
      new Expression(0,this.tokens, this.node);
      if (this.tokens[0].type === "RIGHT_ROUND_B" && this.tokens[1].type === "SEMICOLON") {
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
    // "if" "(" Expression ")" Statement "else" Statement   -abdallah-dawood-
    else if ( this.validateTokens(["IF","LEFT_ROUND_B"])) {
      this.shift();
      this.shift();
      new Expression(this.tokens);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        this.shift();
        new Statement(0,this.tokens,this.node);
        if (this.validateTokens(["ELSE"])) {
          this.shift();
          new Statement(0,this.tokens,this.node);
          return true;
        }
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    // "if" "(" Expression ")" Statement              -abdallah-dawood-
    else if (this.validateTokens(["IF", "LEFT_ROUND_B"])) {
      this.shift();
      this.shift();
      new Expression(0, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        this.shift();
        new Statement(0, this.tokens, this.node);
        return true;
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    //  "while" "(" Expression ")" Statement          -abdullah-dawood
    else if (this.validateTokens(["WHILE", "LEFT_ROUND_B"])) {
      this.shift();
      this.shift();
      new Expression(0, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        this.shift();
        new Statement(0, this.tokens, this.node);
        return true;
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    // "{" ( Statement )* "}"
    else if (this.validateTokens(["LEFT_CURLY_B"])) {
      this.shift();
      new MultiStatement(0, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_CURLY_B"])) {
        this.shift()
        return true;
      }
      this.errIndex = this.tokens[0].index;
      return false;
    }
    // ends
    this.errIndex = this.tokens[0].index;
    return false;
  }
  print() {
    this.log(['System.out.print("HAHA")']);
  }
}
module.exports = Statement;
