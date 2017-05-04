import { GeoQueryInput } from "../types";
import { S2LatLngRect } from "nodes2ts";
export declare class S2Util {
    /**
     * An utility method to get a bounding box of latitude and longitude from a given GeoQueryRequest.
     *
     * @param geoQueryRequest
     *            It contains all of the necessary information to form a latitude and longitude box.
     *
     * */
    static getBoundingLatLngRect(geoQueryRequest: GeoQueryInput): S2LatLngRect;
}
