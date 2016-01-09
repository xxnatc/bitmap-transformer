exports.inverse = function(colors) {
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = 255 - array[i];
    }
    return array;
  });
};

exports.grayscaleAvg = function(colors) {
  return colors.map(function(array) {
    var gray = (array[0] + array[1] + array[2]) / 3;
    return [gray, gray, gray].concat(array.slice(array.length));
  });
};

exports.grayscaleLightness = function(colors) {
  return colors.map(function(array) {
    var gray = (Math.max(array[0], array[1], array[2]) + Math.min(array[0], array[1], array[2])) / 2;
    return [gray, gray, gray].concat(array.slice(array.length));
  });
};

exports.grayscaleLuminosity = function(colors) {
  return colors.map(function(array) {
    var gray = 0.2125 * array[0] + 0.7154 * array[1] + 0.0721 * array[2];
    return [gray, gray, gray].concat(array.slice(array.length));
  });
};
