const Parser = require("../Parser");

module.exports = class VarDeclaration extends Parser {
  constructor(lvl, tokens, parent) {
    super("Class Declaration", lvl, tokens, parent);
    this.toPrintBefore = [];
    this.toPrintAfter = [];
    this.parseing();
  }
  parse() {
    if (this.validateOr(["FLOAT","CHARACTER","STRING","BOOLEAN","INT"])) {
      this.toPrintBefore.push(this.tokens[0].token);
      this.shift();
      if(this.validateTokens(["LEFT_SQUARE_B","RIGHT_SQUARE_B"])){
        this.toPrintBefore.push("[]");
        this.cleanTo(2);
      }
      if(this.validateTokens(["ID","SEMICOLON"])){
        this.toPrintBefore.push(this.tokens[0].token+" ;");
        this.shift();
        this.shift();
        new VarDeclaration(this.level,this.tokens,this.node);
        return true;
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
