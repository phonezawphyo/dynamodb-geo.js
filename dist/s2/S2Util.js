"use strict";
/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var nodes2ts_1 = require("nodes2ts");
var S2Util = (function () {
    function S2Util() {
    }
    /**
     * An utility method to get a bounding box of latitude and longitude from a given GeoQueryRequest.
     *
     * @param geoQueryRequest
     *            It contains all of the necessary information to form a latitude and longitude box.
     *
     * */
    S2Util.getBoundingLatLngRect = function (geoQueryRequest) {
        if (geoQueryRequest.hasOwnProperty('MinPoint')) {
            var queryRectangleRequest = geoQueryRequest;
            var minPoint = queryRectangleRequest.MinPoint;
            var maxPoint = queryRectangleRequest.MaxPoint;
            var latLngRect = null;
            if (minPoint != null && maxPoint != null) {
                var minLatLng = nodes2ts_1.S2LatLng.fromDegrees(minPoint.latitude, minPoint.longitude);
                var maxLatLng = nodes2ts_1.S2LatLng.fromDegrees(maxPoint.latitude, maxPoint.longitude);
                latLngRect = nodes2ts_1.S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
            }
            return latLngRect;
        }
        else if (geoQueryRequest.hasOwnProperty('Radius')) {
            var queryRadiusRequest = geoQueryRequest;
            var centerPoint = queryRadiusRequest.CenterPoint;
            var radiusInMeter = queryRadiusRequest.RadiusInMeter;
            var centerLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude, centerPoint.longitude);
            var latReferenceUnit = centerPoint.latitude > 0.0 ? -1.0 : 1.0;
            var latReferenceLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude + latReferenceUnit, centerPoint.longitude);
            var lngReferenceUnit = centerPoint.longitude > 0.0 ? -1.0 : 1.0;
            var lngReferenceLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude, centerPoint.longitude
                + lngReferenceUnit);
            var latForRadius = radiusInMeter / centerLatLng.getEarthDistance(latReferenceLatLng).toNumber();
            var lngForRadius = radiusInMeter / centerLatLng.getEarthDistance(lngReferenceLatLng).toNumber();
            var minLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude - latForRadius, centerPoint.longitude - lngForRadius);
            var maxLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude + latForRadius, centerPoint.longitude + lngForRadius);
            return nodes2ts_1.S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
        }
        return null;
    };
    return S2Util;
}());
exports.S2Util = S2Util;
