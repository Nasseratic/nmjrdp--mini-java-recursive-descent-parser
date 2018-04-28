const Parser = require("../Parser");

class Expression extends Parser {
  constructor(lvl, tokens, parent) {
    super("Expression", lvl, tokens, parent);
    this.toPrintBefore=[];
    this.toPrintAfter=[];
    this.parseing();
  }
  parse() {
    if (this.validateOr(["INTEGRAL_LITERAL","FLOAT_LITERAL","TRUE","FALSE","THIS", "ID"])) {
      this.toPrintBefore.push(this.tokens[0].token);
      this.shift();
      if (this.validateTokens(["DOT", "LENGTH"])) {
        this.toPrintBefore.push(this.tokens[0].token, this.tokens[1].token);
        this.shift();this.shift();
      }
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["NOT"])) {
      // "!" Expr_
      this.toPrintBefore.push("!");
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      new Expression_(this.level, this.tokens, this.node);
      return true;
    } else if (this.validateTokens(["LEFT_ROUND_B"])) {
      // "(" Expr ")" Expr_
      this.toPrintBefore.push("(");
      this.shift();
      new Expression(this.level, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        this.toPrintAfter.push(")");
        this.shift();
        new Expression_(this.level, this.tokens, this.node);
        return true;
      }
    } else if (this.validateTokens(["NEW", "ID", "LEFT_ROUND_B"])) {
      // "new" Identifier "(" (Expression ( "," Expression)*)? ")" _Expr
      this.toPrintBefore.push(" new "+this.tokens[1].token+"(");
      this.shift();
      this.shift();
      this.shift();
      if (this.validateTokens(["RIGHT_ROUND_B"])) {
        // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
        this.toPrintBefore.push(")");
        this.shift();
        new Expression_(0, this.tokens, this.node);
        return true;
      } else {
        new Expression(this.level, this.tokens, this.node);
        new MultiExpression(this.level, this.tokens, this.node);
        if (this.validateTokens(["RIGHT_ROUND_B"])) {
          this.toPrintAfter.push(")");          
          // this means that we reach to the closing bracket for "(" ("," Expression)* ")"
          this.shift();
          new Expression_(0, this.tokens, this.node);
          return true;
        }
      }
      return false;
    } else if (this.validateTokens(["NEW"])) {
      // "new" ("int" | "float" | "String" | "char" | "boolean" ) "[" Expression "]"
      this.toPrintBefore.push(" new ");
      this.shift();
      if (this.validateOr(["INT", "FLOAT", "STRING", "CHAR", "BOOLEAN"])) {
        this.toPrintBefore.push(this.tokens[0].token);
        this.shift();
        if (this.validateTokens(["LEFT_SQUARE_B"])) {
          this.toPrintBefore.push("[");
          this.shift();
          new Expression(this.level, this.tokens, this.node);
          if (this.validateTokens(["RIGHT_SQUARE_B"])) {
            this.toPrintAfter.push("]");          
            this.shift();
            new Expression_(this.level, this.tokens, this.node);
            return true;
          }
        }
      }
    
    
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

module.exports = Expression;

const MultiExpression = require("./MultiExpression");
const Expression_ = require("./Expression_.parse");
