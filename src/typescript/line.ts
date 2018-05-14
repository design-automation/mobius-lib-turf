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
 * @param {Object} options Optional parameters
 * (units: can be degrees, radians, miles, or kilometers)
 * @returns {Feature<Point>} Point `distance` `units` along the line
 * @example
 * var line = geo.create.lineString([[-83, 30], [-84, 36], [-78, 41]]);
 * var options = {units: 'miles'};
 *
 * var along = geo.line.along(line, 200, options);
 */
export function along(line: turf.LineString,distance: number,options: {units: turf.Units}): turf.Feature<turf.Point> {
    return turf.along(line,distance,options);
}

/**
 * Takes a LineString and returns a curved version
 * by applying a [Bezier spline](http://en.wikipedia.org/wiki/B%C3%A9zier_spline)
 * algorithm.
 *
 * The bezier spline implementation is by [Leszek Rybicki](http://leszek.rybicki.cc/).
 *
 * @param {Feature<LineString>} line input LineString
 * @param {Object} options Optional parameters
 * (resolution: time in milliseconds between points,
 * sharpness: a measure of how curvy the path should be between splines)
 * @returns {Feature<LineString>} curved line
 * @example
 * var line = geo.create.lineString([
 *   [-76.091308, 18.427501],
 *   [-76.695556, 18.729501],
 *   [-76.552734, 19.40443],
 *   [-74.61914, 19.134789],
 *   [-73.652343, 20.07657],
 *   [-73.157958, 20.210656]
 * ]);
 *
 * var curved = geo.line.bezierSpline(line);
 */
export function bezierSpline(line: turf.LineString,options: {resolution: number, sharpness: number}): turf.Feature<turf.LineString> {
    return turf.bezierSpline(line,options);
}

/**
 * Divides a LineString into chunks of a specified length.
 * If the line is shorter than the segment length then the original line is returned.
 *
 * @param {FeatureCollection|Geometry|Feature<LineString|MultiLineString>} lines the lines to split
 * @param {number} segmentLength how long to make each segment
 * @param {Object} options Optional parameters
 * (units: units can be degrees, radians, miles, or kilometers,
 * reverse: reverses coordinates to start the first chunked segment at the end)
 * @returns {FeatureCollection<LineString>} collection of line segments
 * @example
 * var line = geo.create.lineString([[-95, 40], [-93, 45], [-85, 50]]);
 *
 * var chunk = geo.line.chunk(line, 15, {units: 'miles'});
 */
export function chunk(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>|turf.Feature<turf.LineString|turf.MultiLineString>,segmentLength: number,options: {units: turf.Units, reverse: boolean}): turf.FeatureCollection<turf.LineString> {
    return turf.lineChunk(lines,segmentLength,options);
}

/**
 * Takes any LineString GeoJSON and returns the intersecting point(s).
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString
 * @returns {FeatureCollection<Point>} point(s) that intersect both
 * @example
 * var line1 = geo.create.lineString([[126, -11], [129, -21]]);
 * var line2 = geo.create.lineString([[123, -18], [131, -14]]);
 * var intersects = geo.line.intersect(line1, line2);
 */
export function intersect(line1: turf.FeatureCollection<turf.LineString>|turf.Feature<turf.LineString>,line2: turf.FeatureCollection<turf.LineString>|turf.Feature<turf.LineString>): turf.FeatureCollection<turf.Point> {
    return turf.lineIntersect(line1,line2);
}

/**
 * Takes a LineString and returns a LineString offset by the specified distance.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} line input GeoJSON
 * @param {number} distance distance to offset the line (can be of negative value)
 * @param {Object} options Optional parameters
 * (units:] can be degrees, radians, miles, kilometers, inches, yards, meters)
 * @returns {Feature<LineString|MultiLineString>} Line offset from the input line
 * @example
 * var line = geo.create.lineString([[-83, 30], [-84, 36], [-78, 41]], { "stroke": "#F00" });
 *
 * var offsetLine = geo.line.offset(line, 2, {units: 'miles'});
 */
export function offset(line: turf.Feature<turf.LineString|turf.MultiLineString>,distance: number,options: {units: turf.Units}): turf.Feature<turf.LineString|turf.MultiLineString> {
    return turf.lineOffset(line,distance,options);
}

/**
 * Takes any LineString or Polygon and returns the overlapping lines between both features.
 *
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString or Polygon
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString or Polygon
 * @param {Object} options Optional parameters
 * (tolerance: Tolerance distance to match overlapping line segments (in kilometers))
 * @returns {FeatureCollection<LineString>} lines(s) that are overlapping between both features
 * @example
 * var line1 = geo.create.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
 * var line2 = geo.create.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);
 *
 * var overlapping = geo.line.overlap(line1, line2);
 */
export function overlap(line1: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>,line2: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>,options: {tolerance: number}): turf.FeatureCollection<turf.LineString> {
    return turf.lineOverlap(line1,line2,options);
}

/**
 * Creates a FeatureCollection of 2-vertex LineString segments from a LineString or Polygon.
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|MultiPolygon|Polygon>} feature Polygon or LineString
 * @returns {FeatureCollection<LineString>} 2-vertex line segments
 * @example
 * var polygon = geo.create.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 * var segments = geo.line.segment(polygon);
 */
export function segment(feature: turf.FeatureCollection<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>|turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.LineString> {
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
 * var line = geo.create.lineString([
 *     [-77.031669, 38.878605],
 *     [-77.029609, 38.881946],
 *     [-77.020339, 38.884084],
 *     [-77.025661, 38.885821],
 *     [-77.021884, 38.889563],
 *     [-77.019824, 38.892368]
 * ]);
 * var start = geo.create.point([-77.029609, 38.881946]);
 * var stop = geo.create.point([-77.021884, 38.889563]);
 *
 * var sliced = geo.line.slice(start, stop, line);
 */
export function slice(startPt: turf.Point,stopPt: turf.Point,line: turf.Feature<turf.LineString>): turf.Feature<turf.LineString> {
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
 * @param {Object} options Optional parameters
 * (units: can be degrees, radians, miles, or kilometers)
 * @returns {Feature<LineString>} sliced line
 * @example
 * var line = geo.create.lineString([[7, 45], [9, 45], [14, 40], [14, 41]]);
 * var start = 12.5;
 * var stop = 25;
 * var sliced = geo.line.sliceAlong(line, start, stop, {units: 'miles'});
 */
export function sliceAlong(line: turf.Feature<turf.LineString>,startDist: number,stopDist: number,options: {units: turf.Units}): turf.Feature<turf.LineString> {
    return turf.lineSliceAlong(line,startDist,stopDist,options);
}

/**
 * Split a LineString by another GeoJSON Feature.
 *
 * @param {Feature<LineString>} line LineString Feature to split
 * @param {Feature<any>} splitter Feature used to split line
 * @returns {FeatureCollection<LineString>} Split LineStrings
 * @example
 * var line = geo.create.lineString([[120, -25], [145, -25]]);
 * var splitter = geo.create.lineString([[130, -15], [130, -35]]);
 *
 * var split = geo.line.split(line, splitter);
 */
export function split(line: turf.Feature<turf.LineString>,splitter: turf.Feature<turf.Point|turf.MultiPoint|turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.LineString> {
    return turf.lineSplit(line,splitter);
}
