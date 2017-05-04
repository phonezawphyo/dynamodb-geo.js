"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoDataManagerConfiguration_1 = require("../GeoDataManagerConfiguration");
var S2Manager_1 = require("../s2/S2Manager");
var GeohashRange = (function () {
    function GeohashRange(min, max) {
        this.rangeMin = min;
        this.rangeMax = max;
    }
    GeohashRange.prototype.tryMerge = function (range) {
        if (range.rangeMin - this.rangeMax <= GeoDataManagerConfiguration_1.GeoDataManagerConfiguration.MERGE_THRESHOLD
            && range.rangeMax - this.rangeMax > 0) {
            this.rangeMax = range.rangeMax;
            return true;
        }
        if (this.rangeMin - range.rangeMax <= GeoDataManagerConfiguration_1.GeoDataManagerConfiguration.MERGE_THRESHOLD
            && this.rangeMin - range.rangeMax > 0) {
            this.rangeMin = range.rangeMin;
            return true;
        }
        return false;
    };
    /*
     * Try to split the range to multiple ranges based on the hash key.
     *
     * e.g., for the following range:
     *
     * min: 123456789
     * max: 125678912
     *
     * when the hash key length is 3, we want to split the range to:
     *
     * 1
     * min: 123456789
     * max: 123999999
     *
     * 2
     * min: 124000000
     * max: 124999999
     *
     * 3
     * min: 125000000
     * max: 125678912
     *
     * For this range:
     *
     * min: -125678912
     * max: -123456789
     *
     * we want:
     *
     * 1
     * min: -125678912
     * max: -125000000
     *
     * 2
     * min: -124999999
     * max: -124000000
     *
     * 3
     * min: -123999999
     * max: -123456789
     */
    GeohashRange.prototype.trySplit = function (hashKeyLength) {
        var result = [];
        var minHashKey = S2Manager_1.S2Manager.generateHashKey(this.rangeMin, hashKeyLength);
        var maxHashKey = S2Manager_1.S2Manager.generateHashKey(this.rangeMax, hashKeyLength);
        var denominator = Math.pow(10, this.rangeMin.toString().length - minHashKey.toString().length);
        if (minHashKey == maxHashKey) {
            result.push(this);
        }
        else {
            for (var l = minHashKey; l <= maxHashKey; l++) {
                if (l > 0) {
                    result.push(new GeohashRange(l == minHashKey ? this.rangeMin : l * denominator, l == maxHashKey ? this.rangeMax : (l + 1) * denominator - 1));
                }
                else {
                    result.push(new GeohashRange(l == minHashKey ? this.rangeMin : (l - 1) * denominator + 1, l == maxHashKey ? this.rangeMax : l * denominator));
                }
            }
        }
        return result;
    };
    return GeohashRange;
}());
exports.GeohashRange = GeohashRange;
