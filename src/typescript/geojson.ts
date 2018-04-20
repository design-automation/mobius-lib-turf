//  Interafecs for GeoJSON types

// The main geojson model
export interface IgjModel {
    // Properties
    type: "FeatureCollection";
    crs: IgjCrs;
    fetaures: IgjFeature[];
    // Methods
    toString(): string;
}
// Coordinate system
export interface IgjCrs {
    type: string;
    properties: {name: string;}
}
// Features
export interface IgjFeature {
    type: "Feature";
    id: number;
    geometry: (IgjPoint|IgjMultiPoint|IgjLineString|IgjMultiLineString|IgjPolygon|IgjMultiPolygon);
    properties?: Array<[string, any]>;
}
// Feature Types
export interface IgjPoint {
    type: "Point";
    coordinates: IgjCoord;
}
export interface IgjMultiPoint {
    type: "MultiPoint";
    coordinates: IgjCoord[];
}
export interface IgjLineString {
    type: "Line";
    coordinates: IgjCoord[];
}
export interface IgjMultiLineString {
    type: "MultiLine";
    coordinates: IgjCoord[][];
}
export interface IgjPolygon {
    type: "Polygon";
    coordinates: IgjCoord[][];
}
export interface IgjMultiPolygon {
    type: "MultiPolygon";
    coordinates: IgjCoord[][][];
}
// Coordinates
export type IgjCoord = [number, number];
