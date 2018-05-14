/**
 * Turf HELPER functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
 import * as turf from "@turf/turf";

/**
 * Creates a circular arc, of a circle of the given radius and center point, between bearing1 and bearing2;
 * 0 bearing is North of center point, positive clockwise.
 *
 * @param {Coord} center center point
 * @param {number} radius radius of the circle
 * @param {number} bearing1 angle, in decimal degrees, of the first radius of the arc
 * @param {number} bearing2 angle, in decimal degrees, of the second radius of the arc
 * @param {Object} options Optional parameters
 * (steps: number of steps,
 * units: "miles", "kilometers", "degrees", or "radians")
 * @returns {Feature<LineString>} line arc
 * @example
 * var center = geo.create.point([-75, 40]);
 * var radius = 5;
 * var bearing1 = 25;
 * var bearing2 = 47;
 *
 * var arc = geo.create.arc(center, radius, bearing1, bearing2);
 */
export function arc(center: turf.Point, radius: number, bearing1: number, bearing2: number, options: {steps: number,units: turf.Units}): turf.Feature<turf.LineString> {
    return turf.lineArc(center, radius, bearing1, bearing2, options);
}

/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = geo.create.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = geo.create.bbox(line);
 * var bboxPolygon = geo.bbox.polygon(bbox);
 */
export function bbox(geojson: turf.AllGeoJSON): turf.BBox {
    return turf.bbox(geojson);
}

/**
 * Takes a Point and calculates the circle polygon given a radius in degrees, radians, miles, or kilometers; and steps for precision.
 *
 * @param {Feature<Point>|number[]} center center point
 * @param {number} radius radius of the circle
 * @param {Object} options Optional parameters
 * (steps: number of steps,
 * units: "miles", "kilometers", "degrees", or "radians",
 * properties: an object to use as feature's properties)
 * @returns {Feature<Polygon>} circle polygon
 * @example
 * var center = [-75.343, 39.984];
 * var radius = 5;
 * var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
 * var circle = geo.create.circle(center, radius, options);
 */
export function circle(center: turf.Point, radius: number, options: {steps: number,units: turf.Units,properties: object}): turf.Feature<turf.Polygon> {
    return turf.circle(center, radius, options);
}

/**
 * Takes one or more Feature|Features and creates a FeatureCollection.
 *
 * @param {Feature[]} features input features
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = geo.create.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = geo.create.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = geo.create.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = geo.create.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
export function fColl(features: Array<turf.Feature>, options: {bbox: turf.BBox,id: string|number}): turf.FeatureCollection {
    return turf.featureCollection(features, options);
}

/**
 * Wraps a GeoJSON Geometry in a GeoJSON Feature.
 *
 * @param {Geometry} geometry input geometry
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = geo.create.feature(geometry);
 *
 * //=feature
 */
export function feature(geometry: turf.Geometry, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature {
    return turf.feature(geometry, properties, options);
}

/**
 * Creates a Feature<GeometryCollection> based on a
 * coordinate array. Properties can be added optionally.
 *
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = geo.create.geometryCollection([pt, line]);
 *
 * //=collection
 */
export function gColl(geometries: Array<turf.Geometries>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.GeometryCollection> {
    return turf.geometryCollection(geometries, properties, options);
}

/**
 * Creates a LineString Feature from an Array of Positions.
 *
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = geo.create.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = geo.create.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
export function lineString(coordinates: Array<Array<number>>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.LineString> {
    return turf.lineString(coordinates, properties, options);
}

/**
 * Creates a Feature<MultiLineString> based on a
 * coordinate array. Properties can be added optionally.
 * Throws an error if no coordinates are passed.
 *
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @example
 * var multiLine = geo.create.mLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
export function mLinestring(coordinates: Array<Array<Array<number>>>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.MultiLineString> {
    return turf.multiLineString(coordinates, properties, options);
}

/**
 * Creates a Feature<MultiPoint> based on a
 * coordinate array. Properties can be added optionally.
 * Throws an error if no coordinates are passed.
 *
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @example
 * var multiPt = geo.create.mPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
export function mPoint(coordinates: Array<Array<number>>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.MultiPoint> {
    return turf.multiPoint(coordinates, properties, options);
}

/**
 * Creates a Feature<MultiPolygon> based on a
 * coordinate array. Properties can be added optionally.
 * Throws an error if no coordinates are passed.
 *
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @example
 * var multiPoly = geo.create.mPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
export function mPolygon(coordinates: Array<Array<Array<Array<number>>>>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.MultiPolygon> {
    return turf.multiPolygon(coordinates, properties, options);
}

/**
 * Creates a Point Feature from a Position.
 *
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = geo.create.point([-75.343, 39.984]);
 *
 * //=point
 */
export function point(coordinates: Array<number>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.Point> {
    return turf.point(coordinates, properties, options);
}

/**
 * Creates a Polygon Feature from an Array of LinearRings.
 *
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = geo.create.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
export function polygon(coordinates: Array<Array<Array<number>>>, properties: object, options: {bbox: turf.BBox,id: string|number}): turf.Feature<turf.Polygon> {
    return turf.polygon(coordinates, properties, options);
}

/**
 * Creates a circular sector of a circle of given radius and center Point,
 * between (clockwise) bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
 *
 * @param {Coord} center center point
 * @param {number} radius radius of the circle
 * @param {number} bearing1 angle, in decimal degrees, of the first radius of the sector
 * @param {number} bearing2 angle, in decimal degrees, of the second radius of the sector
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians",
 * steps: number of steps)
 * @returns {Feature<Polygon>} sector polygon
 * @example
 * var center = geo.create.point([-75, 40]);
 * var radius = 5;
 * var bearing1 = 25;
 * var bearing2 = 45;
 *
 * var sector = geo.create.sector(center, radius, bearing1, bearing2);
 *
 * //addToMap
 * var addToMap = [center, sector];
 */
export function sector(center: turf.Point, radius: number, bearing1: number, bearing2: number, options: {units: turf.Units, steps: number}): turf.Feature<turf.Polygon> {
    return turf.sector(center, radius, bearing1, bearing2, options);
}
