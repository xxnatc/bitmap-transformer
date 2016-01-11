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
    for (var i = 0; i < 3; i++) {
      if (array[0]) {
        array[i] = (0.3 * array[i]) + 100;
      } else if (array[1]) {
        array[i] = (0.59 * array[i]) + 50;
      } else {
        array[i] = (0.11 * array[i]);
      }
    }
    return array;
  });
};

exports.noise = function(colors) {
  var rand = (0.5 - Math.random());
  return colors.map(function(array) {
    for (var i = 0; i < 3; i++) {
      array[i] = array[i] + rand;
      if (array[i] > 255) return 255;
    }
    return array;
  });
};
