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
 * @param {Geometry|Feature} geojson Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated
 * @returns {Geometry|Feature} the cleaned input Feature/Geometry
 * @example
 * var line = turf.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
 * var multiPoint = turf.multiPoint([[0, 0], [0, 0], [2, 2]]);
 *
 * turf.cleanCoords(line).geometry.coordinates;
 * //= [[0, 0], [0, 10]]
 *
 * turf.cleanCoords(multiPoint).geometry.coordinates;
 * //= [[0, 0], [2, 2]]
 */
export function cleanCoords(geojson, parameters) {
    return turf.cleanCoords(geojson, parameters);
}

/**
 * Takes input features and flips all of their coordinates from `[x, y]` to `[y, x]`.
 *
 * @param {GeoJSON} geojson input features
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} a feature or set of features of the same type as `input` with flipped coordinates
 * @example
 * var serbia = turf.point([20.566406, 43.421008]);
 *
 * var saudiArabia = turf.flip(serbia);
 */
export function flip(geojson, parameters) {
    return turf.flip(geojson, parameters);
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
export function getAll(geojson) {
    return turf.coordAll(geojson);
}

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @param {Array<number>|Geometry<Point>|Feature<Point>} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
export function getFromPoint(obj) {
    return turf.getCoord(obj);
}

/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array of numbers
 *
 * @param {Array<number>|Geometry|Feature} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coord = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
export function getFromFeature(obj) {
    return turf.getCoords(obj);
}

/**
 * Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (http://en.wikipedia.org/wiki/Shoelace_formula|Shoelace Formula).
 *
 * @param {GeoJSON} geojson input GeoJSON Polygon
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.reverse=false] enable reverse winding
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} rewind Polygon
 * @example
 * var polygon = turf.polygon([[[121, -29], [138, -29], [138, -18], [121, -18], [121, -29]]]);
 *
 * var rewind = turf.rewind(polygon);
 */
export function rewind(geojson, parameters) {
    return turf.rewind(geojson, parameters);
}

/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
export function round(num, precision) {
    return turf.round(num, precision);
}

/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @param {GeoJSON} geojson any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.precision=6] coordinate decimal precision
 * @param {number} [options.coordinates=3] maximum number of coordinates (primarly used to remove z coordinates)
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = turf.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = turf.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 *
 * //addToMap
 * var addToMap = [truncated];
 */
export function truncate(geojson, parameters) {
    return turf.truncate(geojson, parameters);
}
