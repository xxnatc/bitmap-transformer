const transform = require(__dirname + '/lib/transform');
const fileHandler = require(__dirname + '/lib/fileHandler');
const dataHandler = require(__dirname + '/lib/dataHandler');
const cmdHandler = require(__dirname + '/lib/cmdHandler');

var bitmap = {};
var index = {};

index.handleTransform = function(data, type, param) {
  dataHandler.process(data, bitmap);
  bitmap.colors = dataHandler.convertFromBuf(bitmap.buf, bitmap.colorDepth / 8);
  console.log(bitmap.buf);
  bitmap.transformed = transform[type](bitmap.colors, param);
  dataHandler.updateBuf(bitmap.buf, bitmap.colorDepth / 8, bitmap.transformed);
  console.log(bitmap.buf);
  fileHandler.exportNew(bitmap.data);
};

index.init = function(list) {
  if (list) {
    fileHandler.read(list[0], function(data) {
      index.handleTransform(data, list[1], list[2]);
    });
  }
};

if (process.argv.length > 2) {
  var argList = cmdHandler(process.argv);
  index.init(argList);
} else {
  console.log('Please specify an image path');
}
