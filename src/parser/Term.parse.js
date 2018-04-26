const Parser = require("../Parser");

class Term extends Parser {
  constructor(lvl,tokens,parent) {
    super("Term",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    if (
      this.tokens[0].type === "SYSTEM.OUT.PRINTLN" &&
      this.tokens[1].type === "LEFT_ROUND_B"
    ) {
      return true;
    } else if (false) {
      return true;
    }
  }
  print() {
    this.log(['System.out.print("HAHA")']);
  }
}

module.exports = Term;
