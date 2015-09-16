var should = require('chai').should();
var twiv = require("../the-world-is-vast").twiv;
var DOMParser = require('xmldom').DOMParser;

describe('twiv parser', () => {
  beforeEach(() => global.window = {
    DOMParser: DOMParser
  });

  it('should exist', function () {
    should.exist(twiv.parseFromString);
  });

  it('should crash if browser does not support DOMParser', () => {
    global.window.DOMParser = null;
    should.Throw(() => twiv.parseFromString("some vast"), Error, "Your browser needs to support DOMParser");
  });

  it('should crash if invalid xml is passed', () => {
    should.Throw(() => twiv.parseFromString('someInvalidXml>'), Error);
  });

  it('should return something given a valid xml', () => {
    twiv.parseFromString('<VAST></VAST>').should.not.be.null;
  });
});