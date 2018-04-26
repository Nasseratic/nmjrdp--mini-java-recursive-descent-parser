const Parser = require("../Parser");
const Expression_ = require("./Expression_.parse");
const Term = require("./Term.parse");

class Expression extends Parser {
  constructor(lvl,tokens,parent) {
    super("Expression",lvl,tokens,parent);
    this.parseing();
  }
  parse() {
      new Term(0,this.tokens, this.node);
      new Expression_(0,this.tokens, this.node);
      return true;
  }
}

function print() {
  console.log('\t\tSystem.out.print("HAHA")');
}
module.exports = Expression;
