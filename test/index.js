/*jslint node:true*/
/*global morsejs, morsejsRenderVibration, describe, it, expect */

"use strict";

describe("Test vibration rendering", function () {
    it("Checks to make sure that vibration support can be detected", function () {
        var actual = morsejsRenderVibration.isVibrationSupported(),
            expected = true;
        expect(actual).toEqual(expected);
    });

    it("Checks structure of vibration array", function () {
        var testMessageString = "r",
            testMessageMorse = morsejs.translate(testMessageString),
            actual = morsejsRenderVibration.generateVibrationArray(testMessageMorse),
            expected = [
                morsejsRenderVibration.VIBRATE_SHORT,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_LONG,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_SHORT
            ];
        expect(actual).toEqual(expected);
    });

    it("Checks to see if vibration works", function () {
        var testMessageString = "sos",
            testMessageMorse = morsejs.translate(testMessageString),
            actual = morsejsRenderVibration.vibrateMorse(testMessageMorse),
            expected = true;
        expect(actual).toEqual(expected);
    });
});