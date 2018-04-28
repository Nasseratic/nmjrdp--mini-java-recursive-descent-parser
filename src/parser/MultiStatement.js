const Parser = require("../Parser");

module.exports = class MultiStatement extends Parser {
  constructor(lvl,tokens,parent) {
      super("Multi Statement",lvl,tokens,parent);
      this.parseing();
  }

  parse() {
      // to handle if we reach to the closing curly bracket for "{" ( Statement )* "}"
      if (this.validateTokens(["RIGHT_CURLY_B"])) {
          // if true, mean we no addition new Multi Statement need
          return true;
      } else {
          new Statement(this.level, this.tokens, this.node);
          new MultiStatement(this.level, this.tokens, this.node);
          return true;
      }
  }
  print(){
    this.newLine();
    this.printChildren();  
  }
}

const Statement = require("./Statement.parse");