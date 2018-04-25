const Node = require("../TreeModel");
const Statement = require("./Statement.parse");

class MainClass {
  constructor(tokens,parent){
    this.tokens = tokens;
    this.parent = parent;
    this.node = Node(this);
    this.ids = [];
    if(this.parse()){
      this.parent.addChild(this.node);
      this.print = print.bind(this);
      this.parse = true;
    }else{
      this.print = () => console.error("Error Parse Main Class");
      this.parse = false;
    }
  }
  parse(){
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
    if (first.join(",") == this.tokens.slice(0,first.length).map(i=>i.type).join(",")) {
      this.ids.push(this.tokens[1]);
      this.ids.push(this.tokens[11]);
      this.tokens = this.tokens.slice(first.length,this.tokens.length);
      new Statement(this.tokens,this.node);
      if(this.tokens.map(i=>i.type).slice(0,2).join(',')=="RIGHT_CURLY_B,RIGHT_CURLY_B"){
        this.tokens = this.tokens.slice(2,this.tokens.length);
        return true;
      } 
      // return true;
    } else return false;

  }
}

function print(){
  console.log(`class ${this.ids[0].token} {\n\n\tpublic static void main ( String [] ${this.ids[1].token} ) {\n\t`);
  this.node.children.forEach( child =>{
    if(child.model&&child.model.print){
      child.model.print();
    }
  });
  console.log("\n\t}\n}");
}

module.exports= MainClass