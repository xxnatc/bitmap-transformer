const expect = require('chai').expect;

const cmdHandler = require(__dirname + '/../lib/cmdHandler');

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
