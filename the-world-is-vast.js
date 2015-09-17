this.twiv = {};
this.twiv.privateHelpers = {};
var twiv = this.twiv;

twiv.parseFromString = function (vastString) {
  var vastDom = twiv.privateHelpers.parseXmlString(vastString);
  if (vastDom.documentElement.nodeName !== "VAST") {
    throw new Error("This string is not a VAST file.");
  }

  return {
    ads: twiv.privateHelpers.ads(vastDom)
  };
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

twiv.privateHelpers.ads = function (vastRoot) {
  var rawAds = vastRoot.getElementsByTagName('Ad');
  return [].map.call(rawAds, function (ad) {
    return {
      inline: twiv.privateHelpers.inline(ad)
    };
  });
};

twiv.privateHelpers.inline = function (adRoot) {
  var inlineRoot = adRoot.getElementsByTagName('InLine')[0];
  if (!inlineRoot) {
    return null;
  }

  return {
    impressionLinks: twiv.privateHelpers.impressionLinks(inlineRoot)
  };
};

twiv.privateHelpers.impressionLinks = function (inlineRoot) {
  var rawImpressionLinks = inlineRoot.getElementsByTagName("Impression");
  return [].map.call(rawImpressionLinks, function(impressionLink) {
    return impressionLink.textContent.trim();
  });
};
