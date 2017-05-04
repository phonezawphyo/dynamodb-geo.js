import { DynamoDB } from "aws-sdk";
export declare class GeoDataManagerConfiguration {
    static MERGE_THRESHOLD: number;
    tableName: string;
    hashKeyAttributeName: string;
    rangeKeyAttributeName: string;
    geohashAttributeName: string;
    geoJsonAttributeName: string;
    geohashIndexName: string;
    hashKeyLength: number;
    longitudeFirst: true;
    consistentRead: false;
    dynamoDBClient: DynamoDB;
    constructor(dynamoDBClient: any, tableName: string);
}
