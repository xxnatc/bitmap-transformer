const fs = require('fs');
const expect = require('chai').expect;

const fileHandler = require(__dirname + '/../lib/fileHandler');

describe('fileHandler.read function', function() {
  it('should return the file as a buffer', function(done) {
    fileHandler.read(__dirname + '/../img/mario.bmp', function(data) {
      expect(Buffer.isBuffer(data)).to.eql(true);
      done();
    });
  });
});

describe('fileHandler.exportNew function', function() {
  it('should have written a new file', function(done) {
    var buf;
    var readFile = function(callback) {
      fs.readFile(__dirname + '/../img/fireflower.bmp', function(err, data) {
        if (err) expect(true).to.eql(false);
        buf = data;
        fileHandler.exportNew(data, callback);
      });
    };
    var exportTest = function() {
      fs.readFile(__dirname + '/../img/transformed.bmp', function(err, data) {
        if (err) expect(true).to.eql(false);
        expect(data).to.eql(buf);
        done();
      });
    };
    readFile(exportTest);
  });
});
