exports.addredscale= function(colors,add) {
  return colors.map(function(array) {
    array[0] = array[0] + add;
    if(array[0] > 255){
      array[0] = 255;
    }
    return array;
  });
};

exports.addgreenscale= function(colors,add) {
  return colors.map(function(array) {
    array[1] = array[1] + add;
    (array[1]>255)?255:array[1];
    return array;
  });
};

exports.addbluescale= function(colors,add) {
  return colors.map(function(array) {
    array[2] = array[2] + add;
    (array[2]>255)?255:array[2];
    return array;
  });
};
