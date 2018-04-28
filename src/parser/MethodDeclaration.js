const Parser = require("../Parser");

module.exports = class MethodDeclaration extends Parser {
  constructor(lvl, tokens, parent) {
    super("Class Declaration", lvl, tokens, parent);
    this.toPrintBefore = [];
    this.toPrintAfter = [];
    this.parseing();
  }
  parse() {
    if (this.validateOr(["PUBLIC", "PRIVATE", "PROTECTED"])) {
      let types = ["FLOAT", "CHARACTER", "STRING", "BOOLEAN", "INT"];
      this.toPrintBefore.push(this.tokens[0].token);
      this.shift();
      if (this.validateOr(types)) {
        this.toPrintBefore.push(this.tokens[0].token);
        this.shift();
        if (this.validateTokens(["ID", "LEFT_ROUND_B"])) {
          this.toPrintBefore.push(this.tokens[0].token + " (");
          this.cleanTo(2);
          if (this.validateOr(types)) {
            this.toPrintBefore.push(this.tokens[0].token);
            this.shift();
            if (this.validateTokens(["ID"])) {
              this.toPrintBefore.push(this.tokens[0].token);
              this.shift();
              while (this.validateTokens(["COMMA"])) {
                this.toPrintBefore.push(",");
                this.shift();
                if (this.validateOr(types)) {
                  this.toPrintBefore.push(this.tokens[0].token);
                  this.shift();
                  if (this.validateTokens(["ID"])) {
                    this.toPrintBefore.push(this.tokens[0].token);
                    this.shift();
                  } else {
                    return false;
                  }
                }
              }
            } else {
              return false;
            }
          }
          if (this.validateTokens(["RIGHT_ROUND_B", "LEFT_CURLY_B"])) {
            this.toPrintBefore.push(this.tokens[0].token);
            this.shift();
            new VarDeclaration(this.level, this.tokens, this.node);
            new MultiStatment(this.level, this.tokens, this.node);
            if (this.validateTokens(["RETURN"])) {
              this.toPrintBefore.push(this.tokens[0].token);
              this.shift();
              new Expression(0,this.tokens,this.node);
              if (this.validateTokens(["RIGHT_CURLY_B"])) {
                this.toPrintBefore.push(this.tokens[0].token);
                this.shift();
                new MethodDeclaration(this.level, this.tokens, this.node);
                return true;
              }
            }
            return false;
          }
        }
      }
      return false;
    }
    return true;
  }
  print() {
    this.log(this.toPrintBefore);
    this.printChildren();
    this.log(this.toPrintAfter);
  }
};

const VarDeclaration = require("./VarDeclaration");
const MultiStatment = require("./MultiStatement");
const Expression = require("./Expression.parse");
