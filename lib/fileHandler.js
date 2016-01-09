const fs = require('fs');

exports.read = function(pathname, callback) {
  if (!pathname.endsWith('.bmp') && !pathname.endsWith('.dib'))
    return console.log('Please use a file with bitmap file extension');

  fs.readFile(pathname, function(err, data) {
    if (err) return console.log(err);
    callback(data);
  });
};

exports.exportNew = function(data) {
  fs.writeFile(__dirname + '/../img/transformed.bmp', data);
};
