/**
 * Turf INTERPOLATION functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Takes a set of points and estimates their 'property' values on a grid using the [Inverse Distance Weighting (IDW) method](https://en.wikipedia.org/wiki/Inverse_distance_weighting).
 *
 * @param {FeatureCollection<Point>} points with known value
 * @param {number} cellSize the distance across each grid point
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.gridType='square'] defines the output format based on a Grid Type (options: 'square' | 'point' | 'hex' | 'triangle')
 * @param {string} [options.property='elevation'] the property name in `points` from which z-values will be pulled, zValue fallbacks to 3rd coordinate if no property exists.
 * @param {string} [options.units='kilometers'] used in calculating cellSize, can be degrees, radians, miles, or kilometers
 * @param {number} [options.weight=1] exponent regulating the distance-decay weighting
 * @returns {FeatureCollection<Point|Polygon>} grid of points or polygons with interpolated 'property'
 * @example
 * var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});
 *
 * // add a random property to each point
 * turf.featureEach(points, function(point) {
 *     point.properties.solRad = Math.random() * 50;
 * });
 * var options = {gridType: 'points', property: 'solRad', units: 'miles'};
 * var grid = turf.interpolate(points, 100, options);
 */
export function interpolate(points,cellSize,parameters) {
    return turf.interpolate(points,cellSize,parameters);
}

/**
 * Takes a grid FeatureCollection of Point features with z-values and an array of
 * value breaks and generates filled contour isobands.
 *
 * @param {FeatureCollection<Point>} pointGrid input points
 * @param {Array<number>} breaks where to draw contours
 * @param {Object} [options={}] options on output
 * @param {string} [options.zProperty='elevation'] the property name in `points` from which z-values will be pulled
 * @param {Object} [options.commonProperties={}] GeoJSON properties passed to ALL isobands
 * @param {Array<Object>} [options.breaksProperties=[]] GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks)
 * @returns {FeatureCollection<MultiPolygon>} a FeatureCollection of MultiPolygon features representing isobands
 */
export function isobands(pointGrid,breaks,parameters) {
    return turf.isobands(pointGrid,breaks,parameters);
}

/**
 * Takes a grid FeatureCollection of Point features with z-values and an array of
 * value breaks and generates [isolines](http://en.wikipedia.org/wiki/Isoline).
 *
 * @param {FeatureCollection<Point>} pointGrid input points
 * @param {Array<number>} breaks values of `zProperty` where to draw isolines
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.zProperty='elevation'] the property name in `points` from which z-values will be pulled
 * @param {Object} [options.commonProperties={}] GeoJSON properties passed to ALL isolines
 * @param {Array<Object>} [options.breaksProperties=[]] GeoJSON properties passed, in order, to the correspondent isoline;
 * the breaks array will define the order in which the isolines are created
 * @returns {FeatureCollection<MultiLineString>} a FeatureCollection of MultiLineString features representing isolines
 * @example
 * // create a grid of points with random z-values in their properties
 * var extent = [0, 30, 20, 50];
 * var cellWidth = 100;
 * var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'miles'});
 *
 * for (var i = 0; i < pointGrid.features.length; i++) {
 *     pointGrid.features[i].properties.temperature = Math.random() * 10;
 * }
 * var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * var lines = turf.isolines(pointGrid, breaks, {zProperty: 'temperature'});
 */
export function isolines(pointGrid,breaks,parameters) {
    return turf.isolines(pointGrid,breaks,parameters);
}

/**
 * Takes a triangular plane as a Polygon
 * and a Point within that triangle and returns the z-value
 * at that point. The Polygon should have properties `a`, `b`, and `c`
 * that define the values at its three corners. Alternatively, the z-values
 * of each triangle point can be provided by their respective 3rd coordinate
 * if their values are not provided as properties.
 *
 * @param {Coord} point the Point for which a z-value will be calculated
 * @param {Feature<Polygon>} triangle a Polygon feature with three vertices
 * @returns {number} the z-value for `interpolatedPoint`
 * @example
 * var point = turf.point([-75.3221, 39.529]);
 * // "a", "b", and "c" values represent the values of the coordinates in order.
 * var triangle = turf.polygon([[
 *   [-75.1221, 39.57],
 *   [-75.58, 39.18],
 *   [-75.97, 39.86],
 *   [-75.1221, 39.57]
 * ]], {
 *   "a": 11,
 *   "b": 122,
 *   "c": 44
 * });
 *
 * var zValue = turf.planepoint(point, triangle);
 * point.properties.zValue = zValue;
 */
export function planepoint(point,triangle) {
    return turf.planepoint(point,triangle);
}

/**
 * Takes a set of points and creates a
 * [Triangulated Irregular Network](http://en.wikipedia.org/wiki/Triangulated_irregular_network),
 * or a TIN for short, returned as a collection of Polygons. These are often used
 * for developing elevation contour maps or stepped heat visualizations.
 *
 * If an optional z-value property is provided then it is added as properties called `a`, `b`,
 * and `c` representing its value at each of the points that represent the corners of the
 * triangle.
 *
 * @param {FeatureCollection<Point>} points input points
 * @param {String} [z] name of the property from which to pull z values
 * This is optional: if not given, then there will be no extra data added to the derived triangles.
 * @returns {FeatureCollection<Polygon>} TIN output
 * @example
 * // generate some random point data
 * var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});
 *
 * // add a random property to each point between 0 and 9
 * for (var i = 0; i < points.features.length; i++) {
 *   points.features[i].properties.z = ~~(Math.random() * 9);
 * }
 * var tin = turf.tin(points, 'z');
 *
 * //addToMap
 * var addToMap = [tin, points]
 * for (var i = 0; i < tin.features.length; i++) {
 *   var properties  = tin.features[i].properties;
 *   properties.fill = '#' + properties.a + properties.b + properties.c;
 * }
 */
export function tin(points,name) {
    return turf.tin(points,name);
}
