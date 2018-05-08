/**
 * Turf line functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Takes a LineString and returns a Point at a specified distance along the line.
 *
 * @param {Feature<LineString>} line input line
 * @param {number} distance distance along the line
 * @param {Object} [options] Optional parameters
 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
 * @returns {Feature<Point>} Point `distance` `units` along the line
 * @example
 * var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
 * var options = {units: 'miles'};
 *
 * var along = turf.along(line, 200, options);
 */
export function along(line,distance,parameters) {
    return turf.along(line,distance,parameters);
}

/**
 * Takes a LineString and returns a curved version
 * by applying a [Bezier spline](http://en.wikipedia.org/wiki/B%C3%A9zier_spline)
 * algorithm.
 *
 * The bezier spline implementation is by [Leszek Rybicki](http://leszek.rybicki.cc/).
 *
 * @param {Feature<LineString>} line input LineString
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.resolution=10000] time in milliseconds between points
 * @param {number} [options.sharpness=0.85] a measure of how curvy the path should be between splines
 * @returns {Feature<LineString>} curved line
 * @example
 * var line = turf.lineString([
 *   [-76.091308, 18.427501],
 *   [-76.695556, 18.729501],
 *   [-76.552734, 19.40443],
 *   [-74.61914, 19.134789],
 *   [-73.652343, 20.07657],
 *   [-73.157958, 20.210656]
 * ]);
 *
 * var curved = turf.bezierSpline(line);
 */
export function bezierSpline(line,parameters) {
    return turf.bezierSpline(line,parameters);
}

/**
 * Divides a LineString into chunks of a specified length.
 * If the line is shorter than the segment length then the original line is returned.
 *
 * @param {FeatureCollection|Geometry|Feature<LineString|MultiLineString>} lines the lines to split
 * @param {number} segmentLength how long to make each segment
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] units can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.reverse=false] reverses coordinates to start the first chunked segment at the end
 * @returns {FeatureCollection<LineString>} collection of line segments
 * @example
 * var line = turf.lineString([[-95, 40], [-93, 45], [-85, 50]]);
 *
 * var chunk = turf.lineChunk(line, 15, {units: 'miles'});
 */
export function chunk(lines,segmentLength,parameters) {
    return turf.lineChunk(lines,segmentLength,parameters);
}

/**
 * Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString or Polygon
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString or Polygon
 * @returns {FeatureCollection<Point>} point(s) that intersect both
 * @example
 * var line1 = turf.lineString([[126, -11], [129, -21]]);
 * var line2 = turf.lineString([[123, -18], [131, -14]]);
 * var intersects = turf.lineIntersect(line1, line2);
 */
export function intersect(line1,line2) {
    return turf.lineIntersect(line1,line2);
}

/**
 * Takes a LineString and returns a LineString offset by the specified distance.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} line input GeoJSON
 * @param {number} distance distance to offset the line (can be of negative value)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, kilometers, inches, yards, meters
 * @returns {Feature<LineString|MultiLineString>} Line offset from the input line
 * @example
 * var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]], { "stroke": "#F00" });
 *
 * var offsetLine = turf.lineOffset(line, 2, {units: 'miles'});
 */
export function offset(line,distance,parameters) {
    return turf.lineOffset(line,distance,parameters);
}

/**
 * Takes any LineString or Polygon and returns the overlapping lines between both features.
 *
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString or Polygon
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString or Polygon
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.tolerance=0] Tolerance distance to match overlapping line segments (in kilometers)
 * @returns {FeatureCollection<LineString>} lines(s) that are overlapping between both features
 * @example
 * var line1 = turf.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
 * var line2 = turf.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);
 *
 * var overlapping = turf.lineOverlap(line1, line2);
 */
export function overlap(line1,line2,parameters) {
    return turf.lineOverlap(line1,line2,parameters);
}

/**
 * Creates a FeatureCollection of 2-vertex LineString segments from a LineString or Polygon.
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|MultiPolygon|Polygon>} feature Polygon or LineString
 * @returns {FeatureCollection<LineString>} 2-vertex line segments
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 * var segments = turf.lineSegment(polygon);
 */
export function segment(feature) {
    return turf.lineSegment(feature);
}

/**
 * Takes aLineString, a start Point, and a stop point
 * and returns a subsection of the line in-between those points.
 * The start & stop points don't need to fall exactly on the line.
 *
 * This can be useful for extracting only the part of a route between waypoints.
 *
 * @param {Coord} startPt starting point
 * @param {Coord} stopPt stopping point
 * @param {Feature<LineString>|LineString} line line to slice
 * @returns {Feature<LineString>} sliced line
 * @example
 * var line = turf.lineString([
 *     [-77.031669, 38.878605],
 *     [-77.029609, 38.881946],
 *     [-77.020339, 38.884084],
 *     [-77.025661, 38.885821],
 *     [-77.021884, 38.889563],
 *     [-77.019824, 38.892368]
 * ]);
 * var start = turf.point([-77.029609, 38.881946]);
 * var stop = turf.point([-77.021884, 38.889563]);
 *
 * var sliced = turf.lineSlice(start, stop, line);
 */
export function slice(startPt,stopPt,line) {
    return turf.lineSlice(startPt,stopPt,line);
}

/**
 * Takes a LineString, a specified distance along the line to a start Point,
 * and a specified  distance along the line to a stop point
 * and returns a subsection of the line in-between those points.
 *
 * This can be useful for extracting only the part of a route between two distances.
 *
 * @param {Feature<LineString>|LineString} line input line
 * @param {number} startDist distance along the line to starting point
 * @param {number} stopDist distance along the line to ending point
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {Feature<LineString>} sliced line
 * @example
 * var line = turf.lineString([[7, 45], [9, 45], [14, 40], [14, 41]]);
 * var start = 12.5;
 * var stop = 25;
 * var sliced = turf.lineSliceAlong(line, start, stop, {units: 'miles'});
 */
export function sliceAlong(line,startDist,stopDist,parameters) {
    return turf.lineSliceAlong(line,startDist,stopDist,parameters);
}

/**
 * Split a LineString by another GeoJSON Feature.
 *
 * @param {Feature<LineString>} line LineString Feature to split
 * @param {Feature<any>} splitter Feature used to split line
 * @returns {FeatureCollection<LineString>} Split LineStrings
 * @example
 * var line = turf.lineString([[120, -25], [145, -25]]);
 * var splitter = turf.lineString([[130, -15], [130, -35]]);
 *
 * var split = turf.lineSplit(line, splitter);
 */
export function split(line,splitter) {
    return turf.lineSplit(line,splitter);
}