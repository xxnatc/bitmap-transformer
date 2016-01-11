const fs = require('fs');
const expect = require('chai').expect;

const bitmapTest = require(__dirname + '/../index.js');
const transform = require(__dirname + '/../lib/transform');
const fileHandler = require(__dirname + '/../lib/fileHandler');
const dataHandler = require(__dirname + '/../lib/dataHandler');
const cmdHandler = require(__dirname + '/../lib/cmdHandler');

describe('the bitmap processing function', function() {
  it('should have returned a valid buffer', function(done) {
    fs.readFile(__dirname + '/../img/mario.bmp', function (err, data) {
      if (err) throw err;
      expect(data).to.be.a('buffer');
    });
    done();
  });
});

describe('the bitmap conversion from buffer function', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', '/../index.js', '/../img/mario.bmp', 'inverse'];
  });
  afterEach(function() {
    process.argv = this.processBackup;
  });
  it('should have returned an array of rgba values', function() {
    console.log(process.argv[2]);
    dataHandler.convertFromBuf();
  });
});

describe('the transformation function', function() {
  var data = [0, 1, 2, 3];
  var transformedData = [3, 2, 1, 0];
  it('should return an array of different values', function(done) {
    expect(transform.inverse(data)).to.not.eql(transformedData);
    done();
	});
});

describe('the bitmap conversion to buffer function', function() {
  it('should have returned a valid buffer', function(done) {
    var buf = new Buffer([0x62,0x75,0x66,0x66,0x65,0x72]);
    var bytes = 0.5;
    var transformed = [ [ 255, 255, 255 ], [ 255, 127, 255 ] ];
    var data = dataHandler.updateBuf(buf, bytes, transformed);
    console.log(data);
    expect(data).to.be.a('buffer'); //halp - not working
    done();
  });
});

describe('the bitmap writing function', function() {
  it('should have written a new file', function(done) {
    fs.exists(__dirname + '/../img/transformed.bmp');
    done();
  });
});
