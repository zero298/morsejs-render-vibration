/*jslint node:true browser:true */
/*global define, module */

// Support UMD
(function (root, factory) {
    "use strict";

    /*istanbul ignore next*/
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["morsejs"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node but not strict CommonJS
        module.exports = factory(require("morsejs"));
    } else {
        // Browser
        root.morsejsRenderVibration = factory(root.morsejs);
    }
}(this, function (morsejs) {
    "use strict";

    // Predefine our vars
    var exports,
        VIBRATE_SHORT,
        VIBRATE_LONG,
        VIBRATE_PADD;

    /**
     * Morse code web module
     * @module morsejs-render-vibration
     */
    exports = {};

    /**
     * Time to vibrate for a short signal
     * @memberof module:morsejs-render-vibration
     * @constant
     * @type {Number}
     * @default
     */
    VIBRATE_SHORT = 500;

    /**
     * Time to vibrate for a long signal
     * @memberof module:morsejs-render-vibration
     * @constant
     * @type {Number}
     * @default
     */
    VIBRATE_LONG = 1000;

    /**
     * Time to vibrate for a padding signal
     * @memberof module:morsejs-render-vibration
     * @constant
     * @type {Number}
     * @default
     */
    VIBRATE_PADD = 200;

    /**
     * Function to check if vibration is supported on device
     * @memberof module:morsejs-render-vibration
     * @returns {Boolean} Whether vibration is supported
     */
    function isVibrationSupported() {
        return ((typeof navigator !== "undefined") && (typeof navigator.vibrate === "function"));
    }

    /**
     * Function to generate an array that vibration can use for timing
     * @memberof module:morsejs-render-vibration
     * @param {Number[]} message The morse message to use
     * @returns {Number[]} An array of vibration timings
     * @throws Will throw an error if message is malformed
     */
    function generateVibrationArray(message) {
        var vibrationArr = [];
        message.forEach(function (signal, index, arr) {
            switch (signal) {
            case morsejs.signal.SHORT:
                vibrationArr.push(VIBRATE_SHORT);
                break;
            case morsejs.signal.LONG:
                vibrationArr.push(VIBRATE_LONG);
                break;
            case morsejs.signal.PADD:
                // I can't think of an instance where a message should start with padding
                if ((index - 1) < 0) {
                    throw "Malformed message, should not start with padding";
                }
                // Make sure we didn't just add a vibration stop
                if (arr[index - 1] !== morsejs.signal.PADD) {
                    vibrationArr.push(VIBRATE_PADD);
                }
                break;
            default:
                // Unknown signal
                throw "Malformed message, invalid signal in message";
            }
        });
        // Send back our new array with vibration timings
        return vibrationArr;
    }

    /**
     * Function to vibrate device in sequence with morse message
     * @memberof module:morsejs-render-vibration
     * @param {Number[]} message The morse message to use
     * @returns {Boolean} Whether vibration occured
     */
    function vibrateMorse(message) {
        var vibeArr,
            vibeResult = false;

        // Create an array of vibration timings
        vibeArr = generateVibrationArray(message);
        // Try to vibrate the device
        vibeResult = navigator.vibrate(vibeArr);

        // Return whether vibration worked
        return vibeResult;
    }

    // Export stuff
    exports.VIBRATE_SHORT = VIBRATE_SHORT;
    exports.VIBRATE_LONG = VIBRATE_LONG;
    exports.VIBRATE_PADD = VIBRATE_PADD;
    exports.isVibrationSupported = isVibrationSupported;
    exports.generateVibrationArray = generateVibrationArray;
    exports.vibrateMorse = vibrateMorse;

    // Return our module
    return exports;
}));