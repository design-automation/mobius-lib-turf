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
 * var poly = geo.create.polygon([[
 *   [-12.034835, 8.901183],
 *   [-12.060413, 8.899826],
 *   [-12.03638, 8.873199],
 *   [-12.059383, 8.871418],
 *   [-12.034835, 8.901183]
 * ]]);
 *
 * var kinks = geo.misc.kinks(poly);
 */
export function kinks(feature: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Point> {
    return turf.kinks(feature);
}

/**
 * Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon1 GeoJSON Polygon used as interior rings or holes.
 * @param {Feature<Polygon>} polygon2 GeoJSON Polygon used as the exterior ring (if undefined, the world extent is used)
 * @returns {Feature<Polygon>} Masked Polygon (exterior ring with holes).
 * @example
 * var polygon = geo.create.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
 * var mask = geo.create.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);
 *
 * var masked = geo.misc.mask(polygon, mask);
 */
export function mask(polygon1: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|turf.Feature<turf.Polygon|turf.MultiPolygon>,polygon2: turf.Feature<turf.Polygon>): turf.Feature<turf.Polygon> {
    return turf.mask(polygon1,polygon2);
}

/**
 * Takes a kinked polygon and returns a feature collection of polygons that have no kinks.
 * Uses [simplepolygon](https://github.com/mclaeysb/simplepolygon) internally.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon GeoJSON Polygon or MultiPolygon
 * @returns {FeatureCollection<Polygon>} Unkinked polygons
 * @example
 * var poly = geo.create.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);
 *
 * var result = geo.misc.unkinkPolygon(poly);
 */
export function unkinkPolygon(polygon: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
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
 * var points = geo.random.point(100, {bbox: [-80, 30, -60, 60]});
 *
 * var sample = geo.misc.sample(points, 5);
 */
export function sample(fcoll: turf.FeatureCollection<turf.GeometryObject>, num: number): turf.FeatureCollection<turf.GeometryObject> {
    return turf.sample(fcoll, num);
}

/**
 * Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
 *
 * @param {Feature<LineString>} line to be evaluated
 * @returns {boolean} true/false
 * @example
 * var clockwiseRing = geo.create.lineString([[0,0],[1,1],[1,0],[0,0]]);
 * var counterClockwiseRing = geo.create.lineString([[0,0],[1,0],[1,1],[0,0]]);
 *
 * geo.misc.isClockwise(clockwiseRing)
 * //=true
 * geo.misc.isClockwise(counterClockwiseRing)
 * //=false
 */
export function isClockwise(line: turf.Feature<turf.LineString>): boolean {
    return turf.booleanClockwise(line);
}
