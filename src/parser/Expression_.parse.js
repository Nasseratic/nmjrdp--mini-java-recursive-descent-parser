const Parser = require("../Parser");
const Term = require("./Term.parse");

class Expression_ extends Parser {
  constructor(lvl,tokens,parent) {
    super("Expression`",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
    if (symbols().indexOf(this.tokens[0].token) != -1) {
      new Term([0,this.tokens, this.node]);
      new Expression_([0,this.tokens, this.node]);
      return true;
    } else {
      return true;
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
