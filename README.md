# the-world-is-vast (`twiv`)[![Build Status](https://travis-ci.org/gbranchaudrubenovitch/the-world-is-vast.svg?branch=master)](https://travis-ci.org/gbranchaudrubenovitch/the-world-is-vast)
Easily parse your VAST ad, get the media & call the tracking events in a browser

## Using `twiv`
* TODO!

## The VAST object exposed by `twiv`
`twiv` exposes just enough of the VAST model to allow you to quickly play the ad and confirm its view.

    // ... in your player js code
    var vast = twiv.parseFromString(vastStringSuppliedByYourAdServer);
    vast.ads[0].inline.impressionLinks.forEach(function(l) {
      console.log("impression pointing to: " + l);
    });

## TODO
* parse the media of a simple vast
* parse the companion ads and their tracking events
* more features... ("call all tracking events", "get vast from adserver", maybe "add companion ad to your dom"?)
* write a better readme with install instructions
