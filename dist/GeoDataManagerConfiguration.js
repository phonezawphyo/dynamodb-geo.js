"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoDataManagerConfiguration = (function () {
    function GeoDataManagerConfiguration(dynamoDBClient, tableName) {
        this.hashKeyAttributeName = "hashKey";
        this.rangeKeyAttributeName = "rangeKey";
        this.geohashAttributeName = "geohash";
        this.geoJsonAttributeName = "geoJson";
        this.geohashIndexName = "geohash-index";
        this.hashKeyLength = 6;
        this.dynamoDBClient = dynamoDBClient;
        this.tableName = tableName;
    }
    return GeoDataManagerConfiguration;
}());
// Public constants
GeoDataManagerConfiguration.MERGE_THRESHOLD = 2;
exports.GeoDataManagerConfiguration = GeoDataManagerConfiguration;
