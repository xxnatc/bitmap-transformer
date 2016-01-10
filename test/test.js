const fs = require('fs');
const expect = require('chai').expect;

const bitmapTest = require(__dirname + '/../index.js');
const transform = require(__dirname + '/../lib/transform');
const fileHandler = require(__dirname + '/../lib/fileHandler');
const dataHandler = require(__dirname + '/../lib/dataHandler');
const cmdHandler = require(__dirname + '/../lib/cmdHandler');

describe('the bitmap writing function', function() {
  it('should have written a new file', function() {
    expect(fs.existsSync(__dirname + '/../img/transformed.bmp')).to.eql(true);
  });
});
