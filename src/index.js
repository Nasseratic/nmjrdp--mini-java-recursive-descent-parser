const LA = require("../nmjla"); 
const MainClass = require("./parser/MainClass.parse")

// Tree Modle
const newNode = require('./TreeModel');

LA("TESTCASES/TESTCASE1_STMT_1.txt").then( tokens => {
  tokens = tokens.filter(i => i.type !== "EOL");
  let root = newNode({id:"ROOT"});
  console.log(tokens);
  new MainClass(0,tokens,root).print();  
});