const os = require('os');
var osEndian = os.endianness();

var readUInt = function(bit) {  // custom function to account for both LE/BE
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
    } else {
      if (temp.length === 3) {
        colors.push(temp);
        temp = [];
      }
    }
  }
  return colors;
};

exports.updateBuf = function(buf, bytes, transformed) {
  console.log(buf);
  console.log(bytes);
  console.log(transformed);
  for (var i = 0; i < transformed.length; i++) {
    for (var j = 0; j < bytes; j++) {
      buf.writeUInt8(transformed[i][j], bytes * i + j);
    }
  }
  return buf;
};

exports.process = function(data, bitmap) {
  bitmap.data = data;
  var bitmapHeader = bitmap.data.slice(0, 4);
  var numColor = data[readUInt(32)](46);
  var pixelStart = data[readUInt(32)](10);
  var headerSize = data[readUInt(32)](14);
  var fileSize = data[readUInt(32)](2);

  if (numColor) { // palette BM file format
    console.log(numColor + '-color palette BM file format');
    bitmap.buf = data.slice(pixelStart - numColor * 4, pixelStart);
    bitmap.colorDepth = 32;
  } else if (headerSize === 64) { // BA file format
    console.log('Header size ' + headerSize + ' bytes');
    bitmap.colorDepth = data[readUInt(16)](28);
    console.log(bitmap.colorDepth + '-bit BA file format');
    console.log('Size of file ' + fileSize + ' bytes');
    bitmap.buf = data.slice(fileSize, pixelStart);
  } else { // non-palette BM file format
    bitmap.buf = data.slice(pixelStart);
    bitmap.colorDepth = data[readUInt(16)](28);
    console.log(bitmap.colorDepth + '-bit non-palette BM file format');
  }
  console.log('image size: ' + data[readUInt(32)](18) + ' x ' + data[readUInt(32)](22));
};
