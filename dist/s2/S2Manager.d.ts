/// <reference types="long" />
import { S2CellUnion, S2LatLngRect } from "nodes2ts";
import { GeoPoint } from "../types";
export declare class S2Manager {
    static findCellIds(latLngRect: S2LatLngRect): S2CellUnion;
    private static containsGeodataToFind(c, latLngRect);
    private static processQueue(queue, cellIds, latLngRect);
    private static processChildren(parent, latLngRect, queue, cellIds);
    static generateGeohash(geoPoint: GeoPoint): Long;
    static generateHashKey(geohash: number, hashKeyLength: number): number;
}
