/*jslint node:true*/
/*global morsejs, morsejsRenderVibration, describe, it, expect, pending */

"use strict";

describe("Test vibration rendering", function () {
    it("Checks to make sure that vibration support can be detected", function () {
        /*
         * I'm really at a loss on how to unit test a feature 
         * detection function.  I mean, in order to know that 
         * it's working, you'd have to use feature detection.
         * So you just end up chasing your tail.
         */
        var actual = morsejsRenderVibration.isVibrationSupported(),
            expected = ((typeof navigator !== "undefined") && (typeof navigator.vibrate === "function"));
        expect(actual).toEqual(expected);
    });

    it("Checks structure of vibration array", function () {
        var testMessageString = "test",
            testMessageMorse = morsejs.translate(testMessageString),
            actual = morsejsRenderVibration.generateVibrationArray(testMessageMorse),
            expected = [
                morsejsRenderVibration.VIBRATE_LONG,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_SHORT,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_SHORT,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_SHORT,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_SHORT,
                morsejsRenderVibration.VIBRATE_PADD,
                morsejsRenderVibration.VIBRATE_LONG
            ];
        expect(actual).toEqual(expected);
    });

    it("Checks handling of message that starts with padding", function () {
        expect(function () {
            morsejsRenderVibration.generateVibrationArray([
                morsejs.signal.PADD,
                morsejs.signal.SHORT,
                morsejs.signal.LONG
            ]);
        }).toThrow();
    });

    it("Checks handling of invalid signal in message", function () {
        expect(function () {
            morsejsRenderVibration.generateVibrationArray([1, 2, 3]);
        }).toThrow();
    });

    it("Checks to see if vibration works", function () {
        var testMessageString = "sos",
            testMessageMorse = morsejs.translate(testMessageString),
            actual,
            expected = true;

        // We can't test for vibration if vibration is unsupported
        if (morsejsRenderVibration.isVibrationSupported()) {
            actual = morsejsRenderVibration.vibrateMorse(testMessageMorse);
            expect(actual).toEqual(expected);
        } else {
            console.log("Cannot test vibration on this device");
            pending();
        }
    });
});