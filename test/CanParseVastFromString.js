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

  it('should crash if non-vast xml is passed', () => {
    should.Throw(() => twiv.parseFromString("<SomeDoc></SomeDoc>"), Error, "This string is not a VAST file.");
  });

  it('should return something given a valid xml', () => {
    twiv.parseFromString('<VAST></VAST>').should.not.be.null;
  });

  it('should read the Ads', () => {
    var vast = twiv.parseFromString('<VAST><Ad></Ad><Ad></Ad></VAST>');
    vast.ads.should.have.length(2);
  });

  it('should read the InLine', () => {
    var vast = twiv.parseFromString('<VAST><Ad><InLine></InLine></Ad></VAST>');
    vast.ads[0].inline.should.not.be.null;
  });

  it('should read & trim the impression links', () => {
    var vast = twiv.parseFromString('<VAST><Ad><InLine><Impression><![CDATA[some-url1]]></Impression><Impression>\n  <![CDATA[some-url&with_spaces  ]]></Impression></InLine></Ad></VAST>');
    vast.ads[0].inline.impressionLinks.should.have.length(2).and.contain("some-url1").and.contain("some-url&with_spaces");
  });
});
