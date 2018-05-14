/**
 * Turf COORDINATE MUTATION functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

 import * as turf from "@turf/turf";

/**
 * Removes redundant coordinates from any GeoJSON Geometry.
 *
 * @param {Geometry|Feature} feature Feature or Geometry
 * @param {Object} options Optional parameters
 * (mutate: allows GeoJSON input to be mutated if true)
 * @returns {Geometry|Feature} the cleaned input Feature/Geometry
 * @example
 * var line = geo.create.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
 * var multiPoint = geo.create.multiPoint([[0, 0], [0, 0], [2, 2]]);
 *
 * geo.coords.cleanCoords(line).geometry.coordinates;
 * //= [[0, 0], [0, 10]]
 *
 * geo.coords.cleanCoords(multiPoint).geometry.coordinates;
 * //= [[0, 0], [2, 2]]
 */
export function cleanCoords(feature: turf.Feature|turf.GeometryObject, options: {mutate: boolean}): turf.Feature|turf.GeometryObject {
    return turf.cleanCoords(feature, options);
}

/**
 * Takes input features and flips all of their coordinates from `[x, y]` to `[y, x]`.
 *
 * @param {GeoJSON} geojson input features
 * @param {Object} options Optional parameters
 *(mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {GeoJSON} a feature or set of features of the same type as `input` with flipped coordinates
 * @example
 * var serbia = geo.create.point([20.566406, 43.421008]);
 *
 * var saudiArabia = geo.coords.flip(serbia);
 */
export function flip(geojson: turf.AllGeoJSON, options: {mutate: boolean}): turf.AllGeoJSON {
    return turf.flip(geojson, options);
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = geo.create.featureCollection([
 *   geo.create.point([26, 37], {foo: 'bar'}),
 *   geo.create.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = geo.coords.getAll(features);
 * //= [[26, 37], [36, 53]]
 */
export function getAll(geojson: turf.AllGeoJSON): number[][] {
    return turf.coordAll(geojson);
}

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @param {Array<number>|Geometry<Point>|Feature<Point>} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var pt = geo.create.point([10, 10]);
 *
 * var coord = geo.coords.getFromPoint(pt);
 * //= [10, 10]
 */
export function getFromPoint(obj: number[]|turf.Point): number[] {
    return turf.getCoord(obj);
}

/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array of numbers
 *
 * @param {Array<number>|Geometry|Feature} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var poly = geo.create.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coord = geo.coords.getFromFeature(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
export function getFromFeature(obj: number[]|turf.GeometryObject|turf.Feature): Array<number> {
    return turf.getCoords(obj);
}

/**
 * Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (http://en.wikipedia.org/wiki/Shoelace_formula|Shoelace Formula).
 *
 * @param {GeoJSON} geojson input GeoJSON Polygon
 * @param {Object} options Optional parameters
 * (reverse: enable reverse winding,
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {GeoJSON} rewind Polygon
 * @example
 * var polygon = geo.create.polygon([[[121, -29], [138, -29], [138, -18], [121, -18], [121, -29]]]);
 *
 * var rewind = geo.coords.rewind(polygon);
 */
export function rewind(geojson: turf.AllGeoJSON, options: {reverse: boolean, mutate: boolean}): turf.AllGeoJSON {
    return turf.rewind(geojson, options);
}

/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * geo.coords.round(120.4321)
 * //=120
 *
 * geo.coords.round(120.4321, 2)
 * //=120.43
 */
export function round(num: number, precision: number): number {
    return turf.round(num, precision);
}

/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @param {GeoJSON} geojson any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} options Optional parameters
 * (precision: coordinate decimal precision,
 * coordinates: maximum number of coordinates (primarly used to remove z coordinates),
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = geo.create.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = geo.coords.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 */
export function truncate(geojson: turf.AllGeoJSON, options: {precision: number, maxCoords: number, mutate: boolean}): turf.AllGeoJSON {
    return turf.truncate(geojson, options);
}
