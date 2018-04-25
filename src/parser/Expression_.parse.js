const Node = require("../TreeModel");

class Expression_ {
  constructor(tokens, parent) {
    this.tokens = tokens;
    this.parent = parent;
    this.node = Node(this);
    if (this.parse()) {
      this.parent.addChild(this.node);
      this.print = print.bind(this);
      this.parse = true;
    } else {
      this.print = () => console.error("Error Parse Statment");
      this.parse = false;
    }
  }
  parse() {
    if ( symbols().indexOf(this.tokens[0].token)  ) {
      return true;
    } else if (false) {
      return true;
    }
  }
}

function print() {
  console.log('\t\tSystem.out.print("HAHA")');
}
module.exports = Expression_;



function symbols(){
  return [
    "&&",
    "||",
    "==",
    "!=",
    ">",
    "<",
    "<=",
    ">=",
    "+",
    "-",
    "*",
    "/"
  ];
}