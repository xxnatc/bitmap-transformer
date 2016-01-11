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

  it('should have returned an array of same to parameters passing into index.js', function() {
    var argList = cmdHandler(process.argv);
    fileHandler.read(argList[0], function(data) {
      var numColor = data.readUInt32LE(46);
      if(numColor){
        expect(numColor).to.equal(256);
        console.log('palette');
      }else{
        expect(numColor).to.equal(0);
        console.log('non-palette');
      }
    });

  });
});
