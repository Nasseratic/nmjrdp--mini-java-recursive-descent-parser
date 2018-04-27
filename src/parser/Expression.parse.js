const Parser = require("../Parser");
const Expression_ = require("./Expression_.parse");
const MultiExpression = require("./MultiExpression");
const Term = require("./Term.parse");

class Expression extends Parser {
  constructor(lvl,tokens,parent) {
    super("Expression",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    if (this.validateTokens(["INTEGRAL_LITERAL"])) {                    // <INTEGER_LITERAL> Expr_
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["FLOAT_LITERAL"])) {                // <FLOAT_LITERAL> Expr_
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["TRUE"])) {                         // "true" Expr_
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["FALSE"])) {                        // "false" Expr_
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["IDENTIFIER"])) {                   // <IDENTIFIER> Expr_
      this.shift();
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["THIS"])) {                         // "this" Expr_
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["NOT"])) {                          // "!" Expr_
      this.shift();
      new Expression(this.level, this.tokens, this.node);      
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["LEFT_ROUND_B"])) {                 // "(" Expr ")" Expr_
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
    } else if (this.validateTokens(["NEW"])) {  // "new" ("int" | "float" | "String" | "char" | "boolean" ) "[" Expression "]"
      this.shift();
      if (this.validateTokens(["INT"]) || this.validateTokens(["FLOAT"]) || this.validateTokens(["STRING"]) ||
          this.validateTokens(["CHAR"]) || this.validateTokens(["BOOLEAN"])) {
            this.shift();
            if (this.validateTokens(["LEFT_SQUARE_B"])) {
              this.shift();
              new Expression(this.level, this.tokens, this.node);
              if (this.validateTokens(["RIGHT_SQUARE_B"])) {
                this.shift();
                new Expression_(this.level, this.tokens, this.node);
                return true;
              }
            }
          }
    } else if (this.validateTokens(["NEW", "IDENTIFIER", "LEFT_ROUND_B"])) { // "new" Identifier "(" (Expression ( "," Expression)*)? ")"
      this.shift();
      this.shift();
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      new MultiExpression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
        this.shift();
        return true;
      }
    }
    //new Term(0,this.tokens, this.node);
    //new Expression_(0,this.tokens, this.node);
    //return true;
    return false;
  }
  print() {
    this.log(['System.out.print("HAHA")']);
  }
}

module.exports = Expression;
