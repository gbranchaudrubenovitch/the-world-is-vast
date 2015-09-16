this.twiv = {};
this.twiv.privateHelpers = {};
var twiv = this.twiv;

twiv.parseFromString = function (vastString) {
  var vastDom = twiv.privateHelpers.parseXmlString(vastString);
  return "vast is parsed! Update your test to catch this hardcoded string.";
};

twiv.privateHelpers.parseXmlString = function (xmlString) {
  if (!window.DOMParser) {
    throw new Error("Your browser needs to support DOMParser. It does not. Everything more recent than IE 8 should work.");
  }
  var dom = new window.DOMParser().parseFromString(xmlString, "application/xml");
  if (dom.documentElement.nodeName == "parsererror") {
    throw new Error("String is not valid XML.", dom);
  }
  return dom;
};
