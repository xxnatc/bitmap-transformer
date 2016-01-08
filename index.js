const fs = require('fs');
fs.readFile(__dirname + '/img/non-palette-bitmap.bmp', function(err, data) {
  if (err) return console.log(err);
  detectPalette(data);
});

var bitmap = {};

var detectPalette = function(data) {
  var numColor = data.readUInt32LE(46);
  var pixelStart = data.readUInt32LE(10);
  bitmap.colorDepth = data.readUInt16LE(28);
  console.log(bitmap.colorDepth);
  if (numColor) {
    // palette
    console.log('palette');
    bitmap.buf = data.slice(pixelStart - numColor * 4, pixelStart);
    convertBuf();
  } else {
    // non-pa
    console.log('non-palette');
    bitmap.buf = data.slice(pixelStart);
    convertBuf();
  }
};

var convertBuf = function() {
  bitmap.rgba = [];
  var temp = [];
  for (var i = 0; i < bitmap.buf.length; i++) {
    temp.push(bitmap.buf.readUInt8(i));
    if (temp.length === bitmap.colorDepth / 8) {
      bitmap.rgba.push(temp);
      temp = [];
    }
  }
  console.log(bitmap.rgba.length);
};
