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

  parseing(){
    this.parent.addChild(this.node);
    if (this.parse()) {
      this.parse = true;
    } else {
      this.print = this.err;
      this.parse = false;
    }
  }

  validateTokens(array){
    return array.join("") == this.tokens.slice(0,array.length).map(i=>i.type).join("");
  }
  validateOr(array){
    return array.indexOf(this.tokens[0].type) !== -1;
  }
  printChildren(){
    this.node.children.forEach(child =>{
      if(child.model.print)
        child.model.print();
    });
  }
  log(args){
    args = args.map( ele => ele.split("").map( a => a== "\n" ? "\n"+"\t".repeat(this.level) : a ).join("") );
    process.stdout.write(["\t".repeat(this.level),...args].join(" "));
  }
  logInline(args){
    process.stdout.write(args.join(" "))
  }
  newLine(){
    process.stdout.write("\n");    
  }
  err() {
    console.error(
      `${"\t".repeat(this.level)}Parsing Error unexpected token: ${this.tokens[0].token}\n${"\t".repeat(this.level)}can't parse ${this.scope.toLowerCase()} at index ${this.errIndex}` 
    );
  }
  
}

module.exports = Parser;
