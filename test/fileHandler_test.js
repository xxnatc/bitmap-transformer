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
    fs.exists(__dirname + '/../img/transformed.bmp');
    done();
  });
});
