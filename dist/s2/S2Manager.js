"use strict";
/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var nodes2ts_1 = require("nodes2ts");
var S2Manager = (function () {
    function S2Manager() {
    }
    S2Manager.findCellIds = function (latLngRect) {
        var queue = [];
        var cellIds = [];
        for (var c = nodes2ts_1.S2CellId.begin(0); !c.equals(nodes2ts_1.S2CellId.end(0)); c = c.next()) {
            if (S2Manager.containsGeodataToFind(c, latLngRect)) {
                queue.push(c);
            }
        }
        S2Manager.processQueue(queue, cellIds, latLngRect);
        if (cellIds.length > 0) {
            var cellUnion = new nodes2ts_1.S2CellUnion();
            cellUnion.initRawCellIds(cellIds); // This normalize the cells.
            return cellUnion;
        }
        return null;
    };
    S2Manager.containsGeodataToFind = function (c, latLngRect) {
        if (latLngRect != null) {
            return latLngRect.intersects(new nodes2ts_1.S2Cell(c));
        }
        return false;
    };
    S2Manager.processQueue = function (queue, cellIds, latLngRect) {
        var c = queue.pop();
        do {
            if (!c.isValid()) {
                break;
            }
            this.processChildren(c, latLngRect, queue, cellIds);
        } while (c = queue.pop());
    };
    S2Manager.processChildren = function (parent, latLngRect, queue, cellIds) {
        var children = [];
        for (var c = parent.childBegin(); !c.equals(parent.childEnd()); c = c.next()) {
            if (this.containsGeodataToFind(c, latLngRect)) {
                children.push(c);
            }
        }
        /*
         * TODO: Need to update the strategy!
         *
         * Current strategy:
         * 1 or 2 cells contain cellIdToFind: Traverse the children of the cell.
         * 3 cells contain cellIdToFind: Add 3 cells for result.
         * 4 cells contain cellIdToFind: Add the parent for result.
         *
         * ** All non-leaf cells contain 4 child cells.
         */
        if (children.length == 1 || children.length == 2) {
            children.forEach(function (child) {
                if (child.isLeaf()) {
                    cellIds.push(child);
                }
                else {
                    queue.push(child);
                }
            });
        }
        else if (children.length == 3) {
            cellIds.push.apply(cellIds, children);
        }
        else if (children.length == 4) {
            cellIds.push(parent);
        }
        else {
            throw new Error('Invalid number of children');
        }
    };
    S2Manager.generateGeohash = function (geoPoint) {
        var latLng = nodes2ts_1.S2LatLng.fromDegrees(geoPoint.latitude, geoPoint.longitude);
        var cell = nodes2ts_1.S2Cell.fromLatLng(latLng);
        var cellId = cell.id;
        return cellId.id;
    };
    S2Manager.generateHashKey = function (geohash, hashKeyLength) {
        if (geohash < 0) {
            // Counteract "-" at beginning of geohash.
            hashKeyLength++;
        }
        var geohashString = geohash.toString(10);
        var denominator = Math.pow(10, geohashString.length - hashKeyLength);
        return geohash / denominator;
    };
    return S2Manager;
}());
exports.S2Manager = S2Manager;
