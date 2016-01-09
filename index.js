const transform = require(__dirname + '/lib/transform');
const fileHandler = require(__dirname + '/lib/fileHandler');
const dataHandler = require(__dirname + '/lib/dataHandler');

var bitmap = {};
var index = {};

index.detectPalette = function(data) {
  bitmap.data = data;
  var numColor = data.readUInt32LE(46);
  var pixelStart = data.readUInt32LE(10);
  if (numColor) {  // palette
    console.log(numColor + '-color palette');
    bitmap.buf = data.slice(pixelStart - numColor * 4, pixelStart);
    bitmap.colorDepth = 32;
  } else {  // non-palette
    bitmap.buf = data.slice(pixelStart);
    bitmap.colorDepth = data.readUInt16LE(28);
    console.log(bitmap.colorDepth + '-bit non-palette');
  }
};

index.handleTransform = function(data, type) {
  index.detectPalette(data);
  bitmap.colors = dataHandler.convertFromBuf(bitmap.buf, bitmap.colorDepth / 8);
  console.log(bitmap.buf);
  bitmap.transformed = transform[type](bitmap.colors);
  dataHandler.updateBuf(bitmap.buf, bitmap.colorDepth / 8, bitmap.transformed);
  console.log(bitmap.buf);
  fileHandler.exportNew(bitmap.data);
};

index.handleCli = function(argv) {
  if (argv[2] === 'help')
    return console.log('Color transform methods available: ' + Object.keys(transform).sort().join(', '));

  var transformType = argv[3] || 'inverse';
  if (!transform.hasOwnProperty(transformType))
    return console.log('Color transform method does not exist. Use "help" to see a list of methods.');

  fileHandler.read(argv[2].toLowerCase(), function(data) {
    index.handleTransform(data, transformType.toLowerCase());
  });
};

if (process.argv.length > 2) {
  index.handleCli(process.argv);
} else {
  console.log('Please specify an image path');
}
