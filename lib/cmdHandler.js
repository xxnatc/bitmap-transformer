const transform = require(__dirname + '/transform');

module.exports = function(argv) {
  if (argv[2] === 'help')
    return console.log('Color transform methods available: ' + Object.keys(transform).sort().join(', '));

  var transformType = argv[3] || 'inverse';
  transformType = transformType.toLowerCase();
  var param;
  if (transformType.includes('=')) {
    param = transformType.split('=')[1];
    transformType = transformType.split('=')[0];
  }
  if (!transform.hasOwnProperty(transformType))
    return console.log('Color transform method does not exist. Use "help" to see a list of methods.');

  return [argv[2].toLowerCase(), transformType, param];
};
