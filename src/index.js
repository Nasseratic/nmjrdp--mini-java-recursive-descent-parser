const LA = require("../nmjla"); 
const MainClass = require("./parser/MainClass.parse")
const ClassDeclaration = require("./parser/ClassDeclaration");

// Tree Modle
const newNode = require('./TreeModel');

LA("TESTCASES/1.text").then( tokens => {
  tokens = tokens.filter(i => i.type !== "EOL");
  let root = newNode({id:"ROOT"});
  new MainClass(0,tokens,root).print();
  new ClassDeclaration(0,tokens,root).print();
});