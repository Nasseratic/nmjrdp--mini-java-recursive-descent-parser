const Parser = require("../Parser");

class Factor extends Parser{
  constructor(lvl,tokens,parent) {
    super("Factor",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    if (true) {
      return true;
    } else if (false) {
      return true;
    }
  }
  print() {
    this.log(['System.out.print("HAHA")']);
  }
}

module.exports = Factor;

function symbols() {
  return ["&&", "||", "==", "!=", ">", "<", "<=", ">=", "+", "-", "*", "/"];
}
