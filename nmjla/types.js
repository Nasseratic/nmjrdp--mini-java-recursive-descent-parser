module.exports = [
  {
    name: "M_COMMENTS",
    reg: /([^\"]\s*)(\/\*[^\*\/]*\*\/)(\s*[^\"])/g
  },
  {
    name: "S_COMMENTS",
    reg: /()(\/\/.*\n?)/g
  },
  {
    name: "SYSTEM.OUT.PRINTLN",
    reg: /System\.out\.println/g
  },
  {
    name: "STRING_LITERAL",
    reg: /()(\"(\\\"|[^\"])*\")/g
  },
  {
    name: "A_CHAR",
    // we can allow \n chars
    reg: /()(\'(\\.|[^\'])?\')/g
  },
  {
    name: "FLOAT_LITERAL",
    reg: /([ \*\/\-\+\=])(\d+\.\d+)/g
  },
  {
    name: "INTEGRAL_LITERAL",
    reg: /([ \*\/\-\+\=]|^)(\d+)/g
  },
];
