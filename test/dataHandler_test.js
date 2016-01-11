const fs = require('fs');
const expect = require('chai').expect;

const dataHandler = require(__dirname + '/../lib/dataHandler');

describe('dataHandler.process function', function() {
  it('should populate bitmap object with properties', function(done) {
    fs.readFile(__dirname + '/../img/mario.bmp', function(err, data) {
      if (err) expect(true).to.eql(false);
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
