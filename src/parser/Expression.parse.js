const Node = require("../TreeModel");
const Expression_ = require("./Expression_.parse");
const Term = require("./Term.parse");

class Expression {
  constructor(tokens,parent){
    this.tokens = tokens;
    this.parent = parent;
    this.node = Node(this);
    if(this.parse()){
      this.parent.addChild(this.node);
      this.print = print.bind(this);
      this.parse = true;
    }else{
      this.print = () => console.error("Error Parse Statment");
      this.parse = false;
    }
  }
  parse(){
    if(this.tokens[0].type){
      new Term(this.tokens,this.node);
      new Expression_(this.tokens,this.node);      
      return true;
    }else if( false ){
      return true;
    }
  }
  
}

function print(){
  console.log("\t\tSystem.out.print(\"HAHA\")");
}
module.exports = Expression; 