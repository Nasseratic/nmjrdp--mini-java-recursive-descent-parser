const fs = require('fs');

function getFileContent(srcPath, callback) { 
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
        }
    );
}

function saveFile(savPath , data ) { 
    fs.writeFile (savPath, data, function(err) {
        if (err) throw err;
        console.log('complete');
    });
}

module.exports =  {
    getFileContent,
    saveFile
}