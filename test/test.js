const fs = require('fs');
const expect = require('chai').expect;

const bitmapTest = require(__dirname + '/../index.js');
const transform = require(__dirname + '/../lib/transform');
const fileHandler = require(__dirname + '/../lib/fileHandler');
const dataHandler = require(__dirname + '/../lib/dataHandler');
const cmdHandler = require(__dirname + '/../lib/cmdHandler');

describe('fileHandler.read function', function() {
  it('should return the file as a buffer', function(done) {
    fileHandler.read(__dirname + '/../img/mario.bmp', function(data) {
      expect(Buffer.isBuffer(data)).to.eql(true);
      done();
    });
  });
});

describe('cmdHandler.js function', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', 'index.js', 'img/mario.bmp', 'inverse'];
  });
  afterEach(function() {
    process.argv = this.processBackup;
  });
  it('should have returned an array of parameters that were passed into the command line', function() {
    var argList = cmdHandler(process.argv);
    expect(argList[0]).to.equal('img/mario.bmp');
    expect(argList[1]).to.equal('inverse');
  });
});

describe('dataHandler.process function', function() {
  it('should populate bitmap object with properties', function(done) {
    fs.readFile(__dirname + '/../img/mario.bmp', function(err, data) {
      var bitmap = {};
      dataHandler.process(data, bitmap);
      expect(bitmap).to.have.property('colorDepth', 24);
      done();
    });
  });
});

describe('dataHandler.convertFromBuf function', function() {
  it('should return an array of rgba values', function() {
    var buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    var color = dataHandler.convertFromBuf(buf, 3);
    expect(color).to.be.an('array');
  });
});

describe('dataHandler.updateBuf function', function() {
  it('should return a valid buffer', function() {
    var buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    var bufCopy = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    var transformed = [
      [255, 255, 255],
      [255, 127, 255]
    ];
    dataHandler.updateBuf(buf, 3, transformed);
    expect(buf).to.not.eql(bufCopy);
  });
});

describe('fileHandler.exportNew function', function() {
  it('should have written a new file', function(done) {
    fs.exists(__dirname + '/../img/transformed.bmp');
    done();
  });
});
