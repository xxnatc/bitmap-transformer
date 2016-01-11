const transform = require(__dirname + '/../lib/transform');
const expect = require('chai').expect;

describe('Color transform:', function() {
  describe('inverse', function() {
    it('should inverse each of RGB values', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[255, 255, 255, 1], [0, 0, 0, 1], [181, 146, 201, 0.2]];
      expect(transform.inverse(colors)).to.eql(results);
    });
  });

  describe('grayscale', function() {
    it('should take average of RGB values', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 255, 255, 1], [79, 79, 79, 0.2]];
      expect(transform.grayscale(colors)).to.eql(results);
    });
  });

  describe('lightness', function() {
    it('should take average between most and least prominent RGB values', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 255, 255, 1], [82, 82, 82, 0.2]];
      expect(transform.lightness(colors)).to.eql(results);
    });
  });

  describe('luminosity', function() {
    it('should calculate gray value using formula', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 255, 255, 1], [98, 98, 98, 0.2]];
      expect(transform.luminosity(colors)).to.eql(results);
    });
  });

  describe('redscale', function() {
    it('should default to double R value', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [254, 255, 255, 1], [148, 109, 54, 0.2]];
      expect(transform.redscale(colors)).to.eql(results);
    });
    it('scale R value with mutliplier', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [253, 255, 255, 1], [222, 109, 54, 0.2]];
      expect(transform.redscale(colors, 3)).to.eql(results);
    });
  });

  describe('greenscale', function() {
    it('should default to double G value', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 254, 255, 1], [74, 218, 54, 0.2]];
      expect(transform.greenscale(colors)).to.eql(results);
    });
    it('scale G value with mutliplier', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 252, 255, 1], [74, 180, 54, 0.2]];
      expect(transform.greenscale(colors, 4)).to.eql(results);
    });
  });

  describe('bluescale', function() {
    it('should default to double B value', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 255, 254, 1], [74, 109, 108, 0.2]];
      expect(transform.bluescale(colors)).to.eql(results);
    });
    it('scale B value with mutliplier', function() {
      var colors = [[0, 0, 0, 1], [255, 255, 255, 1], [74, 109, 54, 0.2]];
      var results = [[0, 0, 0, 1], [255, 255, 72, 1], [74, 109, 30, 0.2]];
      expect(transform.bluescale(colors, 5.3)).to.eql(results);
    });
  });
});
