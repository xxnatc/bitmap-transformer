var index = require(__dirname + '/../index.js');
var dataHandler = require(__dirname + '/../lib/dataHandler.js');
var cmdHandler = require(__dirname + '/../lib/cmdHandler.js');
var fileHandler = require(__dirname + '/../lib/fileHandler.js');
var expect = require('chai').expect;

describe('test the cmdHandler.js read from index.js file', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', 'index.js', 'img/mario.bmp', 'inverse'];
  });

  afterEach(function() {
    process.argv = this.processBackup;
  });

  it('should have returned an array of same to parameters passing into index.js', function() {
    var argList = cmdHandler(process.argv);
    expect(argList[0]).to.equal('img/mario.bmp');
    expect(argList[1]).to.equal('inverse');
  });
});

describe('test the fileHandle.js to read data', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', 'index.js', 'img/mario.bmp', 'inverse'];
  });

  afterEach(function() {
    process.argv = this.processBackup;
  });

  it('should have returned 256 color in palette and 0 color in non-palette', function() {
    var argList = cmdHandler(process.argv);
    fileHandler.read(argList[0], function(data) {
      var numColor = data.readUInt32LE(46);
      if(numColor){
        console.log('palette');
        expect(numColor).to.equal(256);
      }else{
        console.log('non-palette');
        expect(numColor).to.equal(0);
      }
    });
  });
});

describe('test the fileHandle.js to read data', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', 'index.js', 'img/mario.bmp', 'inverse'];
  });

  afterEach(function() {
    process.argv = this.processBackup;
  });

  it('it should test the bmp file is palette or non-palette', function() {
    var argList = cmdHandler(process.argv);
    fileHandler.read(argList[0], function(data) {
      var numColor = data.readUInt32LE(46);
      if(numColor){
        console.log('palette');
        expect(numColor).to.equal(256);
      }else{
        console.log('non-palette');
        expect(numColor).to.equal(0);
      }
    });
  });
});

describe('test the dataHandle.js to process data', function() {
  beforeEach(function() {
    this.processBackup = process.argv;
    process.argv = ['node', 'index.js', 'img/mario.bmp', 'inverse'];
  });

  afterEach(function() {
    process.argv = this.processBackup;
  });
  it('it should have returned 1024 bytes image data for palette and 30000 bytes for non-palette data', function() {
    var argList = cmdHandler(process.argv);
    var bitmap = {};
    fileHandler.read(argList[0], function(data) {
      var numColor = data.readUInt32LE(46);
      var buf = dataHandler.process(data, bitmap);
      if(numColor){
        console.log('palette');
        expect(buf).to.equal(1024);
      }else{
        console.log('non-palette');
        expect(buf).to.equal(30000);
      }
    });
  });
});
