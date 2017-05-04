export declare class GeohashRange {
    rangeMin: number;
    rangeMax: number;
    constructor(min: any, max: any);
    tryMerge(range: GeohashRange): boolean;
    trySplit(hashKeyLength: any): GeohashRange[];
}
