# morsejs-render-svg

[![Build Status](https://travis-ci.org/zero298/morsejs-render-vibration.svg?branch=master)](https://travis-ci.org/zero298/morsejs-render-vibration)
[![Inline docs](http://inch-ci.org/github/zero298/morsejs-render-vibration.svg?branch=master)](http://inch-ci.org/github/zero298/morsejs-render-vibration)

A plugin for [morsejs](https://github.com/zero298/morsejs) to vibrate a device in timing with a morse code message using the HTML [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API).

## Installation

### Dependency

```bash
npm install --save morsejs-render-vibration
```

## Usage

```javascript
var morsejs = require("morsejs"),
    morsejsRenderVibration = require("morsejs-render-vibration"),
    translatedMessage = morsejs.translate("hello");

/* 
 * Be sure to check that vibration is supported before 
 * you start tring to vibrate the device
 */
if(morsejsRenderVibration.isVibrationSupported()){
    morsejsRenderVibration.vibrateMorse(translatedMessage);
}
```
