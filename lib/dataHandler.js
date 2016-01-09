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
  console.log(colors.length);
  return colors;
};

exports.updateBuf = function(buf, bytes, transformed) {
  for (var i = 0; i < transformed.length; i++) {
    for (var j = 0; j < bytes; j++) {
      buf.writeUInt8(transformed[i][j], bytes * i + j);
    }
  }
};
