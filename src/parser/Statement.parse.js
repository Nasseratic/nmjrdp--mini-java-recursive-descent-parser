const Node = require("../TreeModel");
class Statement {
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
    return true;
  }
  
}

function print(){
  console.log("\t\tSystem.out.print(\"HAHA\")");
}
module.exports = Statement; 