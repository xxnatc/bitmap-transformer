exports.inverse = function(colors) {
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = 255 - array[i];
    }
    return array;
  });
};

var fillGray = function(gray, array) {
  return [gray, gray, gray].concat(array.slice(3));
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

exports.scatterbrain = function(colors) {
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = 255 - (Math.random() * array[i]);
    }
    return array;
  });
};

exports.sepiaish = function(colors) {
  return colors.map(function(array) {
    var r = array[0];
    var g = array[1];
    var b = array[2];
    array[0] = Math.round(0.393 * r + 0.769 * g + 0.189 * b);
    array[1] = Math.round(0.349 * r + 0.686 * g + 0.168 * b);
    array[2] = Math.round(0.272 * r + 0.534 * g + 0.131 * b);
    return array.map(function(value) {
      return Math.min(255, value);
    });
  });
};

exports.noise = function(colors) {
  return colors.map(function(array) {
    var rand = Math.floor(Math.random() * 64 - 32);
    for (var i = 0; i < 3; i++) {
      array[i] = array[i] + rand;
      if (array[i] > 255) array[i] = 255;
      if (array[i] < 0) array[i] = 255;
    }
    return array;
  });
};

exports.addredscale = function(colors, add) {
  add = add || 10;
  return colors.map(function(array) {
    array[0] = array[0] + add;
    if (array[0] > 255) {
      array[0] = 255;
    }
    return array;
  });
};

exports.addgreenscale = function(colors, add) {
  add = add || 10;
  return colors.map(function(array) {
    array[1] = array[1] + add;
    if (array[1] > 255) {
      array[1] = 255;
    }
    return array;
  });
};

exports.addbluescale = function(colors, add) {
  add = add || 10;
  return colors.map(function(array) {
    array[2] = array[2] + add;
    if (array[2] > 255) {
      array[2] = 255;
    }
    return array;
  });
};
