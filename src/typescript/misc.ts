/**
 * Turf MISC functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Takes a linestring, multi-linestring, multi-polygon, or polygon and returns points at all self-intersections.
 *
 * @param {Feature<LineString|MultiLineString|MultiPolygon|Polygon>} feature input feature
 * @returns {FeatureCollection<Point>} self-intersections
 * @example
 * var poly = turf.polygon([[
 *   [-12.034835, 8.901183],
 *   [-12.060413, 8.899826],
 *   [-12.03638, 8.873199],
 *   [-12.059383, 8.871418],
 *   [-12.034835, 8.901183]
 * ]]);
 *
 * var kinks = turf.kinks(poly);
 */
export function kinks(feature) {
    return turf.kinks(feature);
}

/**
 * Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon GeoJSON Polygon used as interior rings or holes.
 * @param {Feature<Polygon>} [mask] GeoJSON Polygon used as the exterior ring (if undefined, the world extent is used)
 * @returns {Feature<Polygon>} Masked Polygon (exterior ring with holes).
 * @example
 * var polygon = turf.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
 * var mask = turf.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);
 *
 * var masked = turf.mask(polygon, mask);
 */
export function mask(polygon,mask) {
    return turf.mask(polygon,mask);
}

/**
 * Takes a kinked polygon and returns a feature collection of polygons that have no kinks.
 * Uses [simplepolygon](https://github.com/mclaeysb/simplepolygon) internally.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon GeoJSON Polygon or MultiPolygon
 * @returns {FeatureCollection<Polygon>} Unkinked polygons
 * @example
 * var poly = turf.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);
 *
 * var result = turf.unkinkPolygon(poly);
 */
export function unkinkPolygon(polygon) {
    return turf.unkinkPolygon(polygon);
}

// http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
/**
 * Takes a FeatureCollection and returns a FeatureCollection with given number of features at random.
 *
 * @param {FeatureCollection} fcoll FeatureCollection of input features
 * @param {number} num number of features to select
 * @returns {FeatureCollection} a FeatureCollection with `n` features
 * @example
 * var points = turf.randomPoint(100, {bbox: [-80, 30, -60, 60]});
 *
 * var sample = turf.sample(points, 5);
 */
export function sample(fcoll, num) {
    return turf.sample(fcoll, num);
}

/**
 * Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
 *
 * @param {Feature<LineString>} line to be evaluated
 * @returns {boolean} true/false
 * @example
 * var clockwiseRing = turf.lineString([[0,0],[1,1],[1,0],[0,0]]);
 * var counterClockwiseRing = turf.lineString([[0,0],[1,0],[1,1],[0,0]]);
 *
 * turf.booleanClockwise(clockwiseRing)
 * //=true
 * turf.booleanClockwise(counterClockwiseRing)
 * //=false
 */
export function isClockwise(line) {
    return turf.booleanClockwise(line);
}
