const os = require('os');
var osEndian = os.endianness();

var readUInt = function(bit) { // custom function to account for both LE/BE
  return 'readUInt' + bit + osEndian;
};

exports.convertFromBuf = function(buf, bytes) {
  var colors = [];
  var temp = [];
  for (var i = 0; i < buf.length; i++) {
    temp.push(buf.readUInt8(i));
    if (temp.length === bytes) {
      colors.push(temp);
      temp = [];
    }
  }
  return colors;
};

exports.updateBuf = function(buf, bytes, transformed) {
  for (var i = 0; i < transformed.length; i++) {
    for (var j = 0; j < bytes; j++) {
      buf.writeUInt8(transformed[i][j], bytes * i + j);
    }
  }
};

exports.process = function(data, bitmap) {
  bitmap.data = data;
  var numColor = data[readUInt(32)](46);
  var pixelStart = data[readUInt(32)](10);
  if (numColor) { // palette
    console.log(numColor + '-color palette');
    bitmap.buf = data.slice(pixelStart - numColor * 4, pixelStart);
    bitmap.colorDepth = 32;
  } else { // non-palette
    bitmap.buf = data.slice(pixelStart);
    bitmap.colorDepth = data[readUInt(16)](28);
    console.log(bitmap.colorDepth + '-bit non-palette');
  }
  console.log('image size: ' + data[readUInt(32)](18) + ' x ' + data[readUInt(32)](22));
};
