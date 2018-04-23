const rw = require("./rw");
// set of regexps to match reserved words
const reservedWords = require("./reservedWords");
// set of regexps to match operations
const operations = require("./operations");
// set of regexps to match types ( string int ..)
const types = require("./types");
// regexp for ids
const id = /[a-zA-z]\w*/g;

// array to collect all tokens

// helper function
const splitAt = index => x => [x.slice(0, index), x.slice(index)];
module.exports = path =>
  new Promise((resolve, reject) => {
    rw.getFileContent(path, str => {
      let allTokens = [];
      // collect types
      types.forEach(e => {
        while ((match = e.reg.exec(str))) {
          let matched = match[2] ? match[2].toString() : match.toString();
          allTokens.push({ index: match.index, type: e.name, token: matched });
          str = splitAt(match.index)(str);
          str[1] = str[1].replace(matched, " ".repeat(matched.length));
          str = str.join("");
        }
      });

      // collect reserved words
      reservedWords.all.forEach(e => {
        while ((match = e.reg.exec(str))) {
          allTokens.push({
            index: match.index,
            type: e.name,
            token: match[2].toString()
          });
        }
      });

      // collect operations
      operations.forEach(e => {
        while ((match = e.reg.exec(str))) {
          allTokens.push({
            index: match.index,
            type: e.name,
            token: match.toString()
          });
        }
      });

      // collect ids
      while ((match = id.exec(str))) {
        if (
          new RegExp(reservedWords.sum, "g").exec(match.toString()).index != 1
        ) {
          allTokens.push({
            index: match.index,
            type: "ID",
            token: match[0].toString()
          });
        }
      }

      allTokens.sort((a, b) => a.index - b.index);
      
      resolve(allTokens);
      
      rw.saveFile(
        "RESULTS/" + path.split("/")[1],
        allTokens.map(e => "< " + e.type + " > : -" + e.token + "-").join("\n")
      );
    });
  });
