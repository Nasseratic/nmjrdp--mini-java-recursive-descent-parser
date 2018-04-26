const Parser = require("../Parser");
const Statement = require("./Statement.parse");

class MainClass extends Parser {
  constructor(lvl,tokens,parent) {
    super("Main", lvl,tokens,parent);
    this.ids = [];
    this.parseing();
  }
  parse() {
    let first = [
      "CLASS",
      "ID",
      "LEFT_CURLY_B",
      "PUBLIC",
      "STATIC",
      "VOID",
      "MAIN",
      "LEFT_ROUND_B",
      "STRING",
      "LEFT_SQUARE_B",
      "RIGHT_SQUARE_B",
      "ID",
      "RIGHT_ROUND_B",
      "LEFT_CURLY_B"
    ];
    if (this.validateTokens(first)) {
      this.ids.push(this.tokens[1]);
      this.ids.push(this.tokens[11]);
      this.cleanTo(first.length);
      new Statement(2, this.tokens, this.node);
      if (this.validateTokens(["RIGHT_CURLY_B", "RIGHT_CURLY_B"])) {
        this.cleanTo(2);
        return true;
      }
      return true;
    } else return false;
  }

  print() {
    this.log([
      `\nclass ${
        this.ids[0].token
      } {\n\n\tpublic static void main ( String [] ${this.ids[1].token} ) {\n\t`
    ]);
    this.node.children.forEach(child => {
      if (child.model && child.model.print) {
        child.model.print();
      }
    });
    this.log(["\n\t}\n}"]);
  }
}

module.exports = MainClass;
