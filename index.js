const fs = require('fs');
const transform = require(__dirname + '/lib/transform');

fs.readFile(__dirname + '/img/mario.bmp', function(err, data) {
  if (err) return console.log(err);
  handleTransform(data);
});

var bitmap = {};

var handleTransform = function(data) {
  detectPalette(data);
  convertFromBuf();
  colorTransform();
  convertToBuf();
  writeNewFile();
};

var detectPalette = function(data) {
  bitmap.data = data;
  var numColor = data.readUInt32LE(46);
  var pixelStart = data.readUInt32LE(10);
  if (numColor) {
    // palette
    console.log('palette');
    bitmap.buf = data.slice(pixelStart - numColor * 4, pixelStart);
    bitmap.colorDepth = 32;
  } else {
    // non-pa
    console.log('non-palette');
    bitmap.buf = data.slice(pixelStart);
    bitmap.colorDepth = data.readUInt16LE(28);
  }
};

var colorTransform = function(type) {
  bitmap.transformed = transform.inverse(bitmap.colors);
};
var convertFromBuf = function() {
  console.log(bitmap.buf);
  bitmap.colors = [];
  var temp = [];
  for (var i = 0; i < bitmap.buf.length; i++) {
    temp.push(bitmap.buf.readUInt8(i));
    if (temp.length === bitmap.colorDepth / 8) {
      bitmap.colors.push(temp);
      temp = [];
    }
  }
  console.log(bitmap.colors.length);
};

var convertToBuf = function() {
  for (var i = 0; i < bitmap.transformed.length; i++) {
    for (var j = 0; j < bitmap.transformed[i].length; j++) {
      bitmap.buf.writeUInt8(bitmap.transformed[i][j], bitmap.transformed[i].length * i + j);
    }
  }
  console.log(bitmap.buf);
};

var writeNewFile = function() {
  fs.writeFile(__dirname + '/img/transformed.bmp', bitmap.data);
};
