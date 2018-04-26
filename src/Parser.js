const newNode = require("./TreeModel");

class Parser {
  constructor( scope, level ,tokens, parent) {
    this.scope = scope;
    this.level = level;
    this.tokens = tokens;
    this.errIndex = tokens[0].index;
    this.parent = parent;
    this.node = newNode(this);
  }

  shift() {
    return this.tokens.shift();
  }
  cleanTo(index) {
    this.tokens = this.tokens.slice(index, this.tokens.length);
  }

  err() {
    console.error(
      "\t".repeat(this.level),
      "Error while parsing " + this.scope + " ",
      this.errIndex ? "at index:" + this.errIndex : ""
    );
  }
  parseing(){
    if (this.parse()) {
      this.parent.addChild(this.node);
      this.parse = true;
    } else {
      this.print = this.err;
      this.parse = false;
    }
  }

  validateTokens(array){
    return array.join("") == this.tokens.slice(0,array.length).map(i=>i.type).join("");
  }
  log(args){
    args = args.map( ele => ele.split("").map( a => a== "\n" ? "\n"+"\t".repeat(this.level) : a ).join("") );
    console.log("\t".repeat(this.level),...args)
  }
  
}

module.exports = Parser;
