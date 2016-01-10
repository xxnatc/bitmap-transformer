exports.inverse = function(colors) {
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = 255 - array[i];
    }
    return array;
  });
};

exports.scatterbrain = function(colors) {
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = 255 - (Math.random() * array[i]);
    }
    return array;
  });
};

var fillGray = function(gray, array) {
  return [gray, gray, gray].concat(array.slice(array.length));
};

exports.grayscale = function(colors) {
  return colors.map(function(array) {
    var gray = (array[0] + array[1] + array[2]) / 3;
    return fillGray(gray, array);
  });
};

exports.lightness = function(colors) {
  return colors.map(function(array) {
    var gray = Math.round((Math.max(array[0], array[1], array[2]) + Math.min(array[0], array[1], array[2])) / 2);
    return fillGray(gray, array);
  });
};

exports.luminosity = function(colors) {
  return colors.map(function(array) {
    var gray = Math.round(0.2125 * array[0] + 0.7154 * array[1] + 0.0721 * array[2]);
    return fillGray(gray, array);
  });
};

var colorscale = function(colors, scaler, colorIndex) {
  scaler = Number(scaler) || 2;
  return colors.map(function(array) {
    array[colorIndex] = Math.round(array[colorIndex] * scaler) % 256;
    return array;
  });
};

exports.redscale = function(colors, scaler) {
  return colorscale(colors, scaler, 0);
};

exports.greenscale = function(colors, scaler) {
  return colorscale(colors, scaler, 1);
};

exports.bluescale = function(colors, scaler) {
  return colorscale(colors, scaler, 2);
};
