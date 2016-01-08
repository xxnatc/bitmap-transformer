exports.inverse = function(colors) {
  return colors.map(function(array) {
    var temp = array;
    for (var i = 0; i < 3; i++) {
      temp[i] = 255 - array[i];
    }
    return temp;
  });
};
